import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';
import Jimp from 'jimp';
import dotProp from 'dot-prop';

import { firebase, firestore, storage, getDateFromTimestamp } from 'common/utils';
import { PageMode } from 'config/system.config';
import {
  SUBCOLLECTION_NAMES,
  getEmployeeSubCollection,
  updateEmployeeSalary,
  updateEmployeeDepartment,
  updateEmployeeJobTitle
} from './employee-subcollections.service';

const collectionName = 'employees';

const getRawBase64 = (base64) => base64.replace(/^data:image\/[a-z]+;base64,/, '');

// Create image thumbnail with 64x64 size using Jimp
const createThumbBase64 = async (rawBase64) => {
  const thumbJimp = await Jimp.read(Buffer.from(rawBase64, 'base64'));
  return thumbJimp.resize(64, 64).getBase64Async(Jimp.MIME_JPEG);
};

const saveEmployeePicture = async (picture, date) => {
  // Create thumb image from employee picture
  const rawBase64 = getRawBase64(picture.base64);
  const thumbPictureBase64 = await createThumbBase64(rawBase64);
  const rawThumbPictureBase64 = getRawBase64(thumbPictureBase64);

  // Generate filename for picture using hire date and uuid and
  // create file metadata including the content type
  const filename = `${moment(date).format('YYYY-MM-DD')}_${uuidv4()}`;
  // Set storage location to store file with its filename
  const pictureRef = storage.child(`images/employee/${filename}`);
  const thumbPictureRef = storage.child(`images/employee/${filename}_thumb`);
  const metadata = { contentType: 'image/jpeg' };
  // Upload picture using base64 image and
  // return snapshot to retrieve image fullpath from storage
  const pictureSnapshot = await pictureRef.putString(rawBase64, 'base64', metadata);
  await thumbPictureRef.putString(rawThumbPictureBase64, 'base64', metadata);
  const { metadata: { fullPath } } = pictureSnapshot;
  return fullPath;
};

const createEmployeeDocument = async (employee) => {
  try {
    const {
      hireDate,
      firstName,
      lastName,
      middleInitial,
      birthDate,
      gender,
      currentAddress,
      homeAddress,
      phones,
      emails,
      salary,
      jobTitle: { id: jobTitleId },
      department: { id: departmentId },
      picture
    } = employee;

    // Save employee picture to firebase storage and return fullpath
    const pictureFullPath = picture ? await saveEmployeePicture(picture, hireDate) : null;
    // Generate new doc and id, for parent employee,
    // Salary subcollection, department subcollection, and title subcollection
    const employeeDocRef = firestore.collection(collectionName).doc();
    const salaryDocRef = firestore
      .collection(collectionName)
      .doc(employeeDocRef.id)
      .collection('salary')
      .doc();
    const departmentDocRef = firestore
      .collection(collectionName)
      .doc(employeeDocRef.id)
      .collection('department')
      .doc();
    const jobTitleDocRef = firestore
      .collection(collectionName)
      .doc(employeeDocRef.id)
      .collection('title')
      .doc();
    const newEmployee = {
      isActive: true,
      hireDate: {
        date: hireDate,
        shortDate: moment(hireDate).format('MM-DD')
      },
      personalInfo: {
        firstName,
        lastName,
        middleInitial,
        birthDate: {
          date: birthDate,
          shortDate: moment(birthDate).format('MM-DD')
        },
        gender,
        currentAddress,
        homeAddress,
        phones,
        emails,
        picture: pictureFullPath
      },
      // For sorting pagination
      pageKey: {
        fullName: `${firstName}_${middleInitial}_${lastName}_${employeeDocRef.id}`,
        hireDate: `${moment(hireDate).format('YYYY-MM-DD')}_${employeeDocRef.id}`
      }
    };

    // Get firebase current time
    const dateFrom = firebase.firestore.FieldValue.serverTimestamp();
    // Initialise batch and batch data creation in firestore
    const batch = firestore.batch();
    batch.set(employeeDocRef, newEmployee);
    batch.set(salaryDocRef, { salary, dateFrom });
    batch.set(departmentDocRef, { departmentId, dateFrom });
    batch.set(jobTitleDocRef, { titleId: jobTitleId, dateFrom });
    await batch.commit();
  } catch (error) {
    throw error.message;
  }
};

const updateEmployeeDocument = async (newEmployee, currentEmployee) => {
  try {
    const {
      hireDate,
      firstName,
      lastName,
      middleInitial,
      birthDate,
      gender,
      currentAddress,
      homeAddress,
      phones,
      emails,
      salary,
      department: { id: departmentId },
      jobTitle: { id: jobTitleId },
      picture
    } = newEmployee;

    const {
      id,
      personalInfo: { currentPicture },
      salary: currentSalary,
      department: currentDepartment,
      jobTitle: currentJobTitle
    } = currentEmployee;

    const currentDate = moment();
    const currentSalaryDateFrom = getDateFromTimestamp(currentSalary.dateFrom);
    const currentDepartmentDateFrom = getDateFromTimestamp(currentDepartment.dateFrom);
    const currentJobTitleDateFrom = getDateFromTimestamp(currentJobTitle.dateFrom);

    // Check if picture is untouched, if touched then upload new picture to storage
    const isPictureUntouched = dotProp.get(picture, 'isUntouched', false);
    let pictureFullPath = currentPicture;
    if (!isPictureUntouched) {
      // Save employee picture to firebase storage and return fullpath
      pictureFullPath = picture ? await saveEmployeePicture(picture, hireDate) : null;
    }
    // Get employee doc to update
    const employeeDocRef = firestore.collection(collectionName).doc(id);
    const updateEmployee = {
      isActive: true,
      hireDate: {
        date: hireDate,
        shortDate: moment(hireDate).format('MM-DD')
      },
      personalInfo: {
        firstName,
        lastName,
        middleInitial,
        birthDate: {
          date: birthDate,
          shortDate: moment(birthDate).format('MM-DD')
        },
        gender,
        currentAddress,
        homeAddress,
        phones,
        emails,
        picture: pictureFullPath
      },
      // For sorting pagination
      pageKey: {
        fullName: `${firstName}_${middleInitial}_${lastName}_${id}`,
        hireDate: `${moment(hireDate).format('YYYY-MM-DD')}_${id}`
      }
    };

    // Initialise batch and batch data creation in firestore
    const batch = firestore.batch();

    batch.update(employeeDocRef, updateEmployee);

    // Update salary if salary value is changed and not equal to current salary.
    // Check if current salary has same date as today.
    // If true then just update current salary with new value,
    // else add date to to current salary and create new doc for new salary.
    if (currentSalary.salary !== salary) {
      if (currentDate.isSame(currentSalaryDateFrom, 'date')) {
        const { ref, data } = updateEmployeeSalary(employeeDocRef, currentSalary.id, salary, false);
        batch.update(ref, data);
      } else {
        const {
          currentSalaryUpdate,
          newSalaryUpdate
        } = updateEmployeeSalary(employeeDocRef, currentSalary.id, salary);
        batch.update(currentSalaryUpdate.ref, currentSalaryUpdate.data);
        batch.set(newSalaryUpdate.ref, newSalaryUpdate.data);
      }
    }

    if (currentDepartment.departmentId !== departmentId) {
      if (currentDate.isSame(currentDepartmentDateFrom, 'date')) {
        const { ref, data } = updateEmployeeDepartment(
          employeeDocRef, currentDepartment.id, departmentId, false
        );
        batch.update(ref, data);
      } else {
        const {
          currentDepartmentUpdate,
          newDepartmentUpdate
        } = updateEmployeeDepartment(employeeDocRef, currentDepartment.id, departmentId);
        batch.update(currentDepartmentUpdate.ref, currentDepartmentUpdate.data);
        batch.set(newDepartmentUpdate.ref, newDepartmentUpdate.data);
      }
    }

    if (currentJobTitle.titleId !== jobTitleId) {
      if (currentDate.isSame(currentJobTitleDateFrom, 'date')) {
        const { ref, data } = updateEmployeeJobTitle(
          employeeDocRef, currentJobTitle.id, jobTitleId, false
        );
        batch.update(ref, data);
      } else {
        const {
          currentJobTitleUpdate,
          newJobTitleUpdate
        } = updateEmployeeJobTitle(employeeDocRef, currentJobTitle.id, jobTitleId);
        batch.update(currentJobTitleUpdate.ref, currentJobTitleUpdate.data);
        batch.set(newJobTitleUpdate.ref, newJobTitleUpdate.data);
      }
    }

    await batch.commit();
  } catch (error) {
    throw error.message;
  }
};

const generateEmployeeRows = async (snapshots) => {
  const results = await Promise.all(snapshots.docs.map(async (snapshot) => {
    const employeeDocRef = firestore.collection(collectionName).doc(snapshot.id)
    const data = snapshot.data();
    const { hireDate, createdAt } = data;
    const { birthDate, firstName, middleInitial, lastName, picture } = data.personalInfo;

    const salary = (await getEmployeeSubCollection(employeeDocRef, SUBCOLLECTION_NAMES.salary, 1))[0];
    const department = (await getEmployeeSubCollection(employeeDocRef, SUBCOLLECTION_NAMES.department, 1))[0];
    const jobTitle = (await getEmployeeSubCollection(employeeDocRef, SUBCOLLECTION_NAMES.jobTitle, 1))[0];
    const thumb = picture ? await storage.child(`${picture}_thumb`).getDownloadURL() : undefined;

    return ({
      ...data,
      id: snapshot.id,
      personalInfo: {
        ...data.personalInfo,
        fullName: `${firstName} ${middleInitial} ${lastName}`,
        birthDate: { ...birthDate, date: getDateFromTimestamp(birthDate.date).format('MMM DD, YYYY') },
        thumb
      },
      salary,
      department,
      jobTitle,
      hireDate: { ...hireDate, date: getDateFromTimestamp(hireDate.date).format('MMM DD, YYYY') },
      createdAt: createdAt ? getDateFromTimestamp(createdAt).format('MMM DD, YYYY') : moment().format('MMM DD, YYYY')
    });
  }));

  return results;
};

const getPageEmployees = async (cursor, isActive = true, sortBy = 'asc') => {
  const pageSize = 10;
  const field = dotProp.get(cursor, 'field', 'pageKey.fullName');
  let snapshots;

  try {
    switch (cursor?.mode) {
      case PageMode.NEXT:
        snapshots = await firestore
          .collection(collectionName)
          .where('isActive', '==', isActive)
          .orderBy(field, sortBy)
          .startAfter(cursor.pageKey)
          .limit(pageSize)
          .get();
        break;
      case PageMode.PREVIOUS:
        snapshots = await firestore
          .collection(collectionName)
          .where('isActive', '==', isActive)
          .orderBy(field, sortBy)
          .endBefore(cursor.pageKey)
          .limit(pageSize)
          .get();
        break;
      default:
        snapshots = await firestore
          .collection(collectionName)
          .where('isActive', '==', isActive)
          .orderBy(field, sortBy)
          .limit(pageSize)
          .get();
        break;
    }

    return await generateEmployeeRows(snapshots);
  } catch (error) {
    throw error.message;
  }
};

const getEmployeesByKeyword = async (keyword, isActive = true) => {
  try {
    const snapshots = await firestore
      .collection(collectionName)
      .where('isActive', '==', isActive)
      .where('personalInfo.firstName', '>=', keyword)
      .get();

    return await generateEmployeeRows(snapshots);
  } catch (error) {
    throw error.message;
  }
};

const getNewlyHiredEmployee = async () => {
  try {
    const snapshots = await firestore
      .collection(collectionName)
      .where('isActive', '==', true)
      .orderBy('hireDate.date', 'desc')
      .limit(1)
      .get();

    const employees = await Promise.all(snapshots.docs.map(async (snapshot) => {
      const employeeDocRef = firestore.collection(collectionName).doc(snapshot.id)
      const data = snapshot.data();
      const { hireDate } = data;
      const { firstName, middleInitial, lastName, picture } = data.personalInfo;
  
      const department = (await getEmployeeSubCollection(employeeDocRef, SUBCOLLECTION_NAMES.department, 1))[0];
      const jobTitle = (await getEmployeeSubCollection(employeeDocRef, SUBCOLLECTION_NAMES.jobTitle, 1))[0];
      const pictureUrl = picture ? await storage.child(picture).getDownloadURL() : undefined;
  
      return ({
        ...data,
        id: snapshot.id,
        personalInfo: {
          ...data.personalInfo,
          fullName: `${firstName} ${middleInitial} ${lastName}`,
          pictureUrl
        },
        department,
        jobTitle,
        hireDate: { ...hireDate, date: getDateFromTimestamp(hireDate.date).format('MMM DD, YYYY') },
      });
    }));

    return employees.length ? employees[0] : null;
  } catch (error) {
    throw error.message;
  }
}

const getEmployeeById = async (id) => {
  try {
    const employeeDocRef = firestore.collection(collectionName).doc(id);
    const snapshot = await employeeDocRef.get();

    if (!snapshot.exists) { return undefined; }

    const data = snapshot.data();
    const { hireDate, createdAt } = data;
    const { birthDate, firstName, middleInitial, lastName, picture } = data.personalInfo;

    const salary = await getEmployeeSubCollection(employeeDocRef, SUBCOLLECTION_NAMES.salary);
    const department = await getEmployeeSubCollection(employeeDocRef, SUBCOLLECTION_NAMES.department);
    const jobTitle = await getEmployeeSubCollection(employeeDocRef, SUBCOLLECTION_NAMES.jobTitle);
    const employeePicture = picture ? await storage.child(`${picture}`).getDownloadURL() : undefined;

    return ({
      ...data,
      id: snapshot.id,
      personalInfo: {
        ...data.personalInfo,
        fullName: `${firstName} ${middleInitial} ${lastName}`,
        birthDate: { ...birthDate, date: getDateFromTimestamp(birthDate.date).format('MMM DD, YYYY') },
        picture: employeePicture,
        currentPicture: picture
      },
      salary: { ...salary[0], history: salary },
      department: { ...department[0], history: department },
      jobTitle: { ...jobTitle[0], history: jobTitle },
      hireDate: { ...hireDate, date: getDateFromTimestamp(hireDate.date).format('MMM DD, YYYY') },
      createdAt: createdAt ? getDateFromTimestamp(createdAt).format('MMM DD, YYYY') : moment().format('MMM DD, YYYY')
    });
  } catch (error) {
    throw error.message;
  }
};

const getEmployeesCollectionCount = async (isActive) => {
  const snapshot = await firestore.collection(collectionName).where('isActive', '==', isActive).get();
  return snapshot.size;
};

export {
  createEmployeeDocument,
  updateEmployeeDocument,
  getPageEmployees,
  getNewlyHiredEmployee,
  getEmployeesByKeyword,
  getEmployeeById,
  getEmployeesCollectionCount,
};

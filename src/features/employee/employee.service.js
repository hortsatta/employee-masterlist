import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';
import Jimp from 'jimp';
import dotProp from 'dot-prop';

import { firebase, firestore, storage, getDateFromTimestamp } from 'common/utils';
import { PAGE_MODE } from 'config/system.config';

const collectionName = 'employees';

const getRawBase64 = (base64) => base64.replace(/^data:image\/[a-z]+;base64,/, '');

// Create image thumbnail with 64x64 size using Jimp
const createThumbBase64 = async (rawBase64) => {
  const thumbJimp = await Jimp.read(Buffer.from(rawBase64, 'base64'));
  return thumbJimp.resize(64, 64).getBase64Async(Jimp.MIME_JPEG);
};

const getEmployeeSalary = async (employeeId, limit) => {
  const salaryCollectionName = 'salary'
  const ref = await firestore
    .collection(collectionName)
    .doc(employeeId)
    .collection(salaryCollectionName)
    .orderBy('createdAt', 'desc');

  const refWithLimit = limit ? ref.limit(limit) : ref
  const snapshots = await refWithLimit.get();

  return snapshots.docs.map((snapshot) => ({ id: snapshot.id, ...snapshot.data() }));
};

const getEmployeeDepartment = async (employeeId, limit) => {
  const deptCollectionName = 'department'
  const ref = firestore
    .collection(collectionName)
    .doc(employeeId)
    .collection(deptCollectionName)
    .orderBy('createdAt', 'desc');

  const refWithLimit = limit ? ref.limit(limit) : ref
  const snapshots = await refWithLimit.get();

  return snapshots.docs.map((snapshot) => ({ id: snapshot.id, ...snapshot.data() }));
};

const getEmployeeJobTitle = async (employeeId, limit) => {
  const jobTitleCollectionName = 'title'
  const ref = firestore
    .collection(collectionName)
    .doc(employeeId)
    .collection(jobTitleCollectionName)
    .orderBy('createdAt', 'desc');

  const refWithLimit = limit ? ref.limit(limit) : ref
  const snapshots = await refWithLimit.get();

  return snapshots.docs.map((snapshot) => ({ id: snapshot.id, ...snapshot.data() }));
};

const updateEmployeeSalary = (employeeRef, currentSalaryId, newSalary, isNew = true) => {
  const serverDate = firebase.firestore.FieldValue.serverTimestamp();
  const salaryCollectionName = 'salary';

  if (isNew) {
    const currentSalaryDocRef = employeeRef.collection(salaryCollectionName).doc(currentSalaryId);
    const newSalaryDocRef = employeeRef.collection(salaryCollectionName).doc();
    const currentSalaryUpdate = { ref: currentSalaryDocRef, data: { dateTo: serverDate } };
    const newSalaryUpdate = { ref: newSalaryDocRef, data: { dateFrom: serverDate, salary: newSalary } };
    return { currentSalaryUpdate, newSalaryUpdate };
  }

  const currentSalaryDocRef = employeeRef.collection(salaryCollectionName).doc(currentSalaryId);
  return { ref: currentSalaryDocRef, data: { salary: newSalary } }
};

const updateEmployeeDepartment = (employeeRef, currentDepartmentId, newDepartmentId, isNew = true) => {
  const serverDate = firebase.firestore.FieldValue.serverTimestamp();
  const departmentCollectionName = 'department';

  if (isNew) {
    const currentDepartmentDocRef = employeeRef.collection(departmentCollectionName).doc(currentDepartmentId);
    const newDepartmentDocRef = employeeRef.collection(departmentCollectionName).doc();
    const currentDepartmentUpdate = { ref: currentDepartmentDocRef, data: { dateTo: serverDate } };
    const newDepartmentUpdate = { ref: newDepartmentDocRef, data: { dateFrom: serverDate, departmentId: newDepartmentId } };
    return { currentDepartmentUpdate, newDepartmentUpdate };
  }

  const currentDepartmentDocRef = employeeRef.collection(departmentCollectionName).doc(currentDepartmentId);
  return { ref: currentDepartmentDocRef, data: { departmentId: newDepartmentId } }
}

const updateEmployeeJobTitle = (employeeRef, currentJobTitleId, newJobTitletId, isNew = true) => {
  const serverDate = firebase.firestore.FieldValue.serverTimestamp();
  const jobTitleCollectionName = 'title';

  if (isNew) {
    const currentJobTitleDocRef = employeeRef.collection(jobTitleCollectionName).doc(currentJobTitleId);
    const newJobTitleDocRef = employeeRef.collection(jobTitleCollectionName).doc();
    const currentJobTitleUpdate = { ref: currentJobTitleDocRef, data: { dateTo: serverDate } };
    const newJobTitleUpdate = { ref: newJobTitleDocRef, data: { dateFrom: serverDate, titleId: newJobTitletId } };
    return { currentJobTitleUpdate, newJobTitleUpdate };
  }

  const currentJobTitleDocRef = employeeRef.collection(jobTitleCollectionName).doc(currentJobTitleId);
  return { ref: currentJobTitleDocRef, data: { titleId: newJobTitletId } }
}

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
      salary: currentSalary,
      department: currentDepartment,
      jobTitle: currentJobTitle
    } = currentEmployee;

    const currentDate = moment()

    const currentSalaryDateFrom = getDateFromTimestamp(currentSalary.dateFrom);
    const currentDepartmentDateFrom = getDateFromTimestamp(currentDepartment.dateFrom);
    const currentJobTitleDateFrom = getDateFromTimestamp(currentJobTitle.dateFrom);
    console.log(currentDate.isSame(currentSalaryDateFrom, 'date'));

    // Check if picture is untouched, if touched then upload new picture to storage
    const isPictureUntouched = dotProp.get(picture, 'isUntouched', false);
    let pictureFullPath = null;
    if (isPictureUntouched) {
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
    }

    // Initialise batch and batch data creation in firestore
    const batch = firestore.batch();

    batch.update(employeeDocRef, updateEmployee);

    // Update salary if salary value is changed and not equal to current salary.
    // Check if current salary has same date as today. If true then just update current salary with new value,
    // else add date to to current salary and create new doc for new salary.
    if (currentSalary.salary !== salary) {
      if (currentDate.isSame(currentSalaryDateFrom, 'date')) {
        const { ref, data } = updateEmployeeSalary(employeeDocRef, currentSalary.id, salary, false);
        batch.update(ref, data);
      } else {
        const { currentSalaryUpdate, newSalaryUpdate } = updateEmployeeSalary(employeeDocRef, currentSalary.id, salary);
        batch.update(currentSalaryUpdate.ref, currentSalaryUpdate.data);
        batch.set(newSalaryUpdate.ref, newSalaryUpdate.data);
      }
    }

    if (currentDepartment.departmentId !== departmentId) {
      if (currentDate.isSame(currentDepartmentDateFrom, 'date')) {
        const { ref, data } = updateEmployeeDepartment(employeeDocRef, currentDepartment.id, departmentId, false);
        batch.update(ref, data);
      } else {
        const { currentDepartmentUpdate, newDepartmentUpdate } = updateEmployeeDepartment(employeeDocRef, currentDepartment.id, departmentId);
        batch.update(currentDepartmentUpdate.ref, currentDepartmentUpdate.data);
        batch.set(newDepartmentUpdate.ref, newDepartmentUpdate.data);
      }
    }

    if (currentJobTitle.titleId !== jobTitleId) {
      if (currentDate.isSame(currentDepartmentDateFrom, 'date')) {
        const { ref, data } = updateEmployeeJobTitle(employeeDocRef, currentJobTitle.id, jobTitleId, false);
        batch.update(ref, data);
      } else {
        const { currentJobTitleUpdate, newJobTitleUpdate } = updateEmployeeJobTitle(employeeDocRef, currentJobTitle.id, jobTitleId);
        batch.update(currentJobTitleUpdate.ref, currentJobTitleUpdate.data);
        batch.set(newJobTitleUpdate.ref, newJobTitleUpdate.data);
      }
    }

    await batch.commit();
  } catch (error) {
    throw error.message;
  }
};

const getPageEmployees = async (cursor, isActive = true, sortBy = 'asc') => {
  const pageSize = 3;
  const field = dotProp.get(cursor, 'field', 'pageKey.fullName')
  let snapshots;

  try {
    switch (cursor?.mode) {
      case PAGE_MODE.next:
        snapshots = await firestore
          .collection(collectionName)
          .where('isActive', '==', isActive)
          .orderBy(field, sortBy)
          .startAfter(cursor.pageKey)
          .limit(pageSize)
          .get();
        break;
      case PAGE_MODE.previous:
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

    const results = await Promise.all(snapshots.docs.map(async (snapshot) => {
      const data = snapshot.data();
      const { hireDate, createdAt } = data;
      const { birthDate, firstName, middleInitial, lastName, picture } = data.personalInfo;
    
      const salary = (await getEmployeeSalary(snapshot.id, 1))[0];
      const department = (await getEmployeeDepartment(snapshot.id, 1))[0];
      const jobTitle = (await getEmployeeJobTitle(snapshot.id, 1))[0];
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
        createdAt: getDateFromTimestamp(createdAt).format('MMM DD, YYYY')
      });
    }));
    return results;
  } catch (error) {
    throw error.message;
  }
};

const getEmployeeById = async (id) => {
  const snapshot = await firestore.collection(collectionName).doc(id).get();

  if (!snapshot.exists) { return undefined; }

  try {
    const data = snapshot.data();
    const { hireDate, createdAt } = data;
    const { birthDate, firstName, middleInitial, lastName, picture } = data.personalInfo;

    const [currentSalary, ...prevSalaries] = await getEmployeeSalary(snapshot.id);
    const [currentDeparment, ...prevDepartments] = await getEmployeeDepartment(snapshot.id);
    const [currentJobTitle, ...prevJobTitles] = await getEmployeeJobTitle(snapshot.id);
    const employeePicture = picture ? await storage.child(`${picture}`).getDownloadURL() : undefined;

    return ({
      ...data,
      id: snapshot.id,
      personalInfo: {
        ...data.personalInfo,
        fullName: `${firstName} ${middleInitial} ${lastName}`,
        birthDate: { ...birthDate, date: getDateFromTimestamp(birthDate.date).format('MMM DD, YYYY') },
        picture: employeePicture
      },
      salary: { ...currentSalary, history: prevSalaries },
      department: { ...currentDeparment, history: prevDepartments },
      jobTitle: { ...currentJobTitle, history: prevJobTitles },
      hireDate: { ...hireDate, date: getDateFromTimestamp(hireDate.date).format('MMM DD, YYYY') },
      createdAt: getDateFromTimestamp(createdAt).format('MMM DD, YYYY')
    });
  } catch (error) {
    throw error.message;
  }
}

const getEmployeesCollectionCount = async (isActive) => {
  const snapshot = await firestore.collection(collectionName).where('isActive', '==', isActive).get();
  return snapshot.size;
};

export {
  createEmployeeDocument,
  updateEmployeeDocument,
  getPageEmployees,
  getEmployeeById,
  getEmployeesCollectionCount
};

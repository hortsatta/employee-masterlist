import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';
import Jimp from 'jimp';
import dotProp from 'dot-prop';

import { firebase, firestore, storage, getDateFromTimestamp } from 'common/utils';
import { PAGE_MODE } from 'config/system.config';
import { getDepartmentById } from 'features/department/department.service';
import { getJobTitleById } from 'features/job-title/job-title.service';

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

const getEmployeeSalary = async (employeeId) => {
  const salaryCollectionName = 'salary'
  const salarySnapshots = await firestore
    .collection(collectionName)
    .doc(employeeId)
    .collection(salaryCollectionName)
    .orderBy('createdAt', 'desc')
    .limit(1)
    .get();

  return salarySnapshots.docs.map((snapshot) => snapshot.data())[0];
};

const getEmployeeDepartment = async (employeeId) => {
  const deptCollectionName = 'department'
  const departmentSnapshots = await firestore
    .collection(collectionName)
    .doc(employeeId)
    .collection(deptCollectionName)
    .orderBy('createdAt', 'desc')
    .limit(1)
    .get();

  const { departmentId } = departmentSnapshots.docs.map((snapshot) => snapshot.data())[0];
  return await getDepartmentById(departmentId);
};

const getEmployeeJobTitle = async (employeeId) => {
  const jobTitleCollectionName = 'title'
  const jobTitleSnapshots = await firestore
    .collection(collectionName)
    .doc(employeeId)
    .collection(jobTitleCollectionName)
    .orderBy('createdAt', 'desc')
    .limit(1)
    .get();

  const { titleId } = jobTitleSnapshots.docs.map((snapshot) => snapshot.data())[0];
  return await getJobTitleById(titleId);
};

const getPageEmployees = async (cursor, isActive = true, sortBy = 'asc') => {
  const pageSize = 3; console.log(cursor, isActive, sortBy)
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
    
      const salary = await getEmployeeSalary(snapshot.id);
      const department = await getEmployeeDepartment(snapshot.id);
      const jobTitle = await getEmployeeJobTitle(snapshot.id);
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

    const salary = await getEmployeeSalary(snapshot.id);
    const department = await getEmployeeDepartment(snapshot.id);
    const jobTitle = await getEmployeeJobTitle(snapshot.id);
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
      salary,
      department,
      jobTitle,
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
  getPageEmployees,
  getEmployeeById,
  getEmployeesCollectionCount
};

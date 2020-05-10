import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';
import Jimp from 'jimp';

import { firebase, firestore, storage } from 'common/utils';

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
    const pictureFullPath = await saveEmployeePicture(picture, hireDate);
    // Generate new doc and id, for parent employee,
    // Salary subcollection, department subcollection, and title subcollection
    const employeeDocRef = firestore.collection('employees').doc();
    const salaryDocRef = firestore
      .collection('employees')
      .doc(employeeDocRef.id)
      .collection('salary')
      .doc();
    const departmentDocRef = firestore
      .collection('employees')
      .doc(employeeDocRef.id)
      .collection('department')
      .doc();
    const jobTitleDocRef = firestore
      .collection('employees')
      .doc(employeeDocRef.id)
      .collection('title')
      .doc();
    const newEmployee = {
      hireDate,
      personalInfo: {
        firstName,
        lastName,
        middleInitial,
        birthDate,
        gender,
        currentAddress,
        homeAddress,
        phones,
        emails,
        picture: pictureFullPath,
        isActive: true
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

export { createEmployeeDocument };

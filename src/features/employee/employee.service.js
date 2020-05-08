import { firebase, firestore } from 'common/utils';

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
      department: { id: departmentId }
    } = employee;

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
        emails
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

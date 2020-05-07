import { firestore } from 'common/utils';

const createEmployeeDocument = (employee) => {
  try {
    const { hireDate, personalInfo } = employee;
    const employeeDocRef = firestore.collection('employees').doc();
    console.log('employeeDocRef', employeeDocRef);
    // await employeeDocRef.set({hireDate, personalInfo})

    
  } catch (error) {
    throw error.message;
  }
};

export { createEmployeeDocument };


// +employees
//     id
//     -personalInfo
//       firstName
//       lastName
//       middleInitial
//       gender
//       birthDate
//       ^phones
//       currentAddress
//       homeAddress
//       ^emails
//     hireDate
//     createdAt
//     +salary
//       id
//       salary
//       dateFrom
//       dateTo
//       createdAt
//     +title
//       id
//       titleId
//       dateFrom
//       dateTo
//       createdAt
//     +department
//       id
//       departmentId
//       dateFrom
//       dateTo
//       createdAt

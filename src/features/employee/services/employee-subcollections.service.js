import { firebase, firestore } from 'common/utils';

const COLLECTION_NAMES = {
  employees: 'employees',
  salary: 'salary',
  department: 'department',
  jobTitle: 'title'
};

const getEmployeeSalary = async (employeeId, limit) => {
  const ref = await firestore
    .collection(COLLECTION_NAMES.employees)
    .doc(employeeId)
    .collection(COLLECTION_NAMES.salary)
    .orderBy('createdAt', 'desc');

  const refWithLimit = limit ? ref.limit(limit) : ref;
  const snapshots = await refWithLimit.get();

  return snapshots.docs.map((snapshot) => ({ id: snapshot.id, ...snapshot.data() }));
};

const getEmployeeDepartment = async (employeeId, limit) => {
  const ref = firestore
    .collection(COLLECTION_NAMES.employees)
    .doc(employeeId)
    .collection(COLLECTION_NAMES.department)
    .orderBy('createdAt', 'desc');

  const refWithLimit = limit ? ref.limit(limit) : ref;
  const snapshots = await refWithLimit.get();

  return snapshots.docs.map((snapshot) => ({ id: snapshot.id, ...snapshot.data() }));
};

const getEmployeeJobTitle = async (employeeId, limit) => {
  const ref = firestore
    .collection(COLLECTION_NAMES.employees)
    .doc(employeeId)
    .collection(COLLECTION_NAMES.jobTitle)
    .orderBy('createdAt', 'desc');

  const refWithLimit = limit ? ref.limit(limit) : ref;
  const snapshots = await refWithLimit.get();

  return snapshots.docs.map((snapshot) => ({ id: snapshot.id, ...snapshot.data() }));
};

const updateEmployeeSalary = (employeeRef, currentSalaryId, newSalary, isNew = true) => {
  const serverDate = firebase.firestore.FieldValue.serverTimestamp();

  if (isNew) {
    const currentSalaryDocRef = employeeRef
      .collection(COLLECTION_NAMES.salary).doc(currentSalaryId);
    const newSalaryDocRef = employeeRef.collection(COLLECTION_NAMES.salary).doc();
    const currentSalaryUpdate = { ref: currentSalaryDocRef, data: { dateTo: serverDate } };
    const newSalaryUpdate = {
      ref: newSalaryDocRef, data: { dateFrom: serverDate, salary: newSalary } };

    return { currentSalaryUpdate, newSalaryUpdate };
  }

  const currentSalaryDocRef = employeeRef.collection(COLLECTION_NAMES.salary).doc(currentSalaryId);
  return { ref: currentSalaryDocRef, data: { salary: newSalary } };
};

const updateEmployeeDepartment = (
  employeeRef,
  currentDepartmentId,
  newDepartmentId,
  isNew = true
) => {
  const serverDate = firebase.firestore.FieldValue.serverTimestamp();

  if (isNew) {
    const currentDepartmentDocRef = employeeRef
      .collection(COLLECTION_NAMES.department).doc(currentDepartmentId);
    const newDepartmentDocRef = employeeRef.collection(COLLECTION_NAMES.department).doc();
    const currentDepartmentUpdate = { ref: currentDepartmentDocRef, data: { dateTo: serverDate } };
    const newDepartmentUpdate = {
      ref: newDepartmentDocRef, data: { dateFrom: serverDate, departmentId: newDepartmentId } };

    return { currentDepartmentUpdate, newDepartmentUpdate };
  }

  const currentDepartmentDocRef = employeeRef
    .collection(COLLECTION_NAMES.department).doc(currentDepartmentId);
  return { ref: currentDepartmentDocRef, data: { departmentId: newDepartmentId } };
};

const updateEmployeeJobTitle = (employeeRef, currentJobTitleId, newJobTitletId, isNew = true) => {
  const serverDate = firebase.firestore.FieldValue.serverTimestamp();

  if (isNew) {
    const currentJobTitleDocRef = employeeRef
      .collection(COLLECTION_NAMES.jobTitle).doc(currentJobTitleId);
    const newJobTitleDocRef = employeeRef.collection(COLLECTION_NAMES.jobTitle).doc();
    const currentJobTitleUpdate = { ref: currentJobTitleDocRef, data: { dateTo: serverDate } };
    const newJobTitleUpdate = {
      ref: newJobTitleDocRef, data: { dateFrom: serverDate, titleId: newJobTitletId } };

    return { currentJobTitleUpdate, newJobTitleUpdate };
  }

  const currentJobTitleDocRef = employeeRef
    .collection(COLLECTION_NAMES.jobTitle).doc(currentJobTitleId);
  return { ref: currentJobTitleDocRef, data: { titleId: newJobTitletId } };
};

export {
  getEmployeeSalary,
  getEmployeeDepartment,
  getEmployeeJobTitle,
  updateEmployeeSalary,
  updateEmployeeDepartment,
  updateEmployeeJobTitle
};

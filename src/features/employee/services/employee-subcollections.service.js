import { firebase, getDateFromTimestamp } from 'common/utils';

const SUBCOLLECTION_NAMES = {
  salary: 'salary',
  department: 'department',
  jobTitle: 'title'
};

const getSubCollectionData = async (ref, limit) => {
  const refWithLimit = limit ? ref.limit(limit) : ref;
  const snapshots = await refWithLimit.get();

  return snapshots.docs.map((snapshot) => {
    const { dateFrom, dateTo, ...otherData } = snapshot.data();
    return {
      id: snapshot.id,
      dateFrom: getDateFromTimestamp(dateFrom).format('MMM DD, YYYY'),
      dateTo: dateTo ? getDateFromTimestamp(dateTo).format('MMM DD, YYYY') : undefined,
      ...otherData
    };
  });
};

const getEmployeeSubCollection = (employeeDocRef, subCollectionName, limit) => {
  const ref = employeeDocRef
    .collection(subCollectionName)
    .orderBy('createdAt', 'desc');

  return getSubCollectionData(ref, limit);
};

const updateEmployeeSalary = (employeeRef, currentSalaryId, newSalary, isNew = true) => {
  const serverDate = firebase.firestore.FieldValue.serverTimestamp();

  if (isNew) {
    const currentSalaryDocRef = employeeRef
      .collection(SUBCOLLECTION_NAMES.salary).doc(currentSalaryId);
    const newSalaryDocRef = employeeRef.collection(SUBCOLLECTION_NAMES.salary).doc();
    const currentSalaryUpdate = { ref: currentSalaryDocRef, data: { dateTo: serverDate } };
    const newSalaryUpdate = {
      ref: newSalaryDocRef, data: { dateFrom: serverDate, salary: newSalary } };

    return { currentSalaryUpdate, newSalaryUpdate };
  }

  const currentSalaryDocRef = employeeRef.collection(SUBCOLLECTION_NAMES.salary).doc(currentSalaryId);
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
      .collection(SUBCOLLECTION_NAMES.department).doc(currentDepartmentId);
    const newDepartmentDocRef = employeeRef.collection(SUBCOLLECTION_NAMES.department).doc();
    const currentDepartmentUpdate = { ref: currentDepartmentDocRef, data: { dateTo: serverDate } };
    const newDepartmentUpdate = {
      ref: newDepartmentDocRef, data: { dateFrom: serverDate, departmentId: newDepartmentId } };

    return { currentDepartmentUpdate, newDepartmentUpdate };
  }

  const currentDepartmentDocRef = employeeRef
    .collection(SUBCOLLECTION_NAMES.department).doc(currentDepartmentId);
  return { ref: currentDepartmentDocRef, data: { departmentId: newDepartmentId } };
};

const updateEmployeeJobTitle = (employeeRef, currentJobTitleId, newJobTitletId, isNew = true) => {
  const serverDate = firebase.firestore.FieldValue.serverTimestamp();

  if (isNew) {
    const currentJobTitleDocRef = employeeRef
      .collection(SUBCOLLECTION_NAMES.jobTitle).doc(currentJobTitleId);
    const newJobTitleDocRef = employeeRef.collection(SUBCOLLECTION_NAMES.jobTitle).doc();
    const currentJobTitleUpdate = { ref: currentJobTitleDocRef, data: { dateTo: serverDate } };
    const newJobTitleUpdate = {
      ref: newJobTitleDocRef, data: { dateFrom: serverDate, titleId: newJobTitletId } };

    return { currentJobTitleUpdate, newJobTitleUpdate };
  }

  const currentJobTitleDocRef = employeeRef
    .collection(SUBCOLLECTION_NAMES.jobTitle).doc(currentJobTitleId);
  return { ref: currentJobTitleDocRef, data: { titleId: newJobTitletId } };
};

export {
  SUBCOLLECTION_NAMES,
  getEmployeeSubCollection,
  updateEmployeeSalary,
  updateEmployeeDepartment,
  updateEmployeeJobTitle
};

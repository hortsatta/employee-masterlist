import { firestore } from 'common/utils';

const getJobTitlesByDepartmentIds = async (ids, isActive = true) => {
  try {
    const snapshots = await firestore
      .collection('titles')
      .where('departmentId', 'in', [...ids])
      .where('isActive', '==', isActive)
      .get();

    return snapshots.docs.map((snapshot) => ({ ...snapshot.data(), id: snapshot.id }));
  } catch (error) {
    throw error.message;
  }
};

export { getJobTitlesByDepartmentIds };

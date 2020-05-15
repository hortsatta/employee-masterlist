import { firestore, getDateFromTimestamp } from 'common/utils';

const collectionName = 'titles';

const getJobTitlesByDepartmentIds = async (ids, isActive = true) => {
  try {
    const snapshots = await firestore
      .collection(collectionName)
      .where('departmentId', 'in', [...ids])
      .where('isActive', '==', isActive)
      .get();

    return snapshots.docs.map((snapshot) => {
      const { createdAt, ...data } = snapshot.data();
      return {
        ...data,
        id: snapshot.id,
        createdAt: getDateFromTimestamp(createdAt)
      };
    });
  } catch (error) {
    throw error.message;
  }
};

const getJobTitleById = async (id) => {
  try {
    const snapshot = await firestore
      .collection(collectionName)
      .doc(id)
      .get();

    const { createdAt, ...data } = snapshot.data();

    return {
      ...data,
      id: snapshot.id,
      createdAt: getDateFromTimestamp(createdAt)
    };
  } catch (error) {
    throw error.message;
  }
};

export { getJobTitlesByDepartmentIds, getJobTitleById };

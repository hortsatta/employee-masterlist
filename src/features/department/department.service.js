import { firestore, getDateFromTimestamp } from 'common/utils';

const collectionName = 'departments';

const getAllDepartments = async (isActive = true) => {
  try {
    const snapshots = await firestore
      .collection(collectionName)
      .where('isActive', '==', isActive)
      .orderBy('name')
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

const getDepartmentById = async (id) => {
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

export { getAllDepartments, getDepartmentById };

import { firestore } from 'common/utils';

const getAllDepartments = async (isActive = true) => {
  try {
    const snapshots = await firestore
      .collection('departments')
      .where('isActive', '==', isActive)
      .orderBy('name')
      .get();

    return snapshots.docs.map((snapshot) => ({ ...snapshot.data(), id: snapshot.id }));
  } catch (error) {
    throw error.message;
  }
};

export { getAllDepartments };

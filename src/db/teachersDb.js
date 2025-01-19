import { db } from "../firebase/firebase";
import { setDoc, doc, getDocs, collection } from "firebase/firestore";

export const getTeachersDB = async (userId) => {
  const resp = await getDocs(collection(db, `users/${userId}/teachers/`));
  const arr = resp.docs.reduce((obj, el) => {
    obj[el.data().id] = el.data();
    return obj;
  }, {});
  return arr;
};

export const addTeacherDb = async (userId, teacher) => {
  setDoc(doc(db, `users/${userId}/teachers/${teacher.id}`), teacher);
};

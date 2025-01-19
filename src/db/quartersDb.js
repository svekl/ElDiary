import { db } from "../firebase/firebase";
import { setDoc, doc, getDoc } from "firebase/firestore";

export const getQuartersDB = async (userId, currentYear) => {
  const resp = await getDoc(doc(db, `users/${userId}/quarters/${currentYear}`));
  if (resp.exists()) {
    return resp.data();
  } else {
    console.log("Учебные четверти отсутствуют");
    return {};
  }
};

export const addQuartersDb = async (userId, currentYear, data) => {
  try {
    setDoc(doc(db, `users/${userId}/quarters/${currentYear}`), data);
  } catch (er) {
    throw new Error(er.message);
  }
};

export const isCreateQuarterDB = async (userId, currentYear) => {
  const resp = await getDoc(doc(db, `users/${userId}/quarters/${currentYear}`));
  return resp.exists();
};

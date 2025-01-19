import { db } from "../firebase/firebase";
import { setDoc, doc, getDoc, updateDoc } from "firebase/firestore";

export const settingsInit = async (userId) => {
  setDoc(doc(db, `users/${userId}/settings/${userId}`), {
    displayHomeWork: 1,
  });
};

export const getSettingsDB = async (userId) => {
  const resp = await getDoc(doc(db, `users/${userId}/settings/${userId}`));
  if (resp.exists()) {
    return resp.data();
  } else {
    throw new Error("настройки отсутствуют");
  }
};

export const updateSettingsDB = async (userId, data) => {
  const resp = await getDoc(doc(db, `users/${userId}/settings/${userId}`));
  if (resp.exists()) {
    updateDoc(doc(db, `users/${userId}/settings/${userId}`), data);
  } else {
    throw new Error("Настройки не найдены");
  }
};

import { db } from "../firebase/firebase";
import { setDoc, doc, getDoc } from "firebase/firestore";

export const getWeeklySheduleDB = async (userId, currentYear) => {
  const resp = await getDoc(
    doc(db, `users/${userId}/weeklyShedule/${currentYear}`)
  );
  if (resp.exists()) {
    return resp.data();
  } else {
    return {};
  }
};
export const isCreateWeeklySheduleDB = async (userId, currentYear) => {
  const resp = await getDoc(
    doc(db, `users/${userId}/weeklyShedule/${currentYear}`)
  );
  return resp.exists();
};

export const addWeeklyScheduleDB = async (userId, data) => {
  try {
    setDoc(doc(db, `users/${userId}/weeklyShedule/${data.year}`), data);
  } catch (er) {
    throw new Error(er.message);
  }
};

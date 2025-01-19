import { db } from "../firebase/firebase";
import { setDoc, doc, getDoc, updateDoc } from "firebase/firestore";

export const getHomeworksDB = async (userId, currentYear) => {
  const resp = await getDoc(doc(db, `users/${userId}/homework/${currentYear}`));
  if (resp.exists()) {
    return resp.data();
  } else {
    console.log("домашние работы отсутствуют");
    return {};
  }
};

export const addHomeworkDB = async (userId, data, currentStudyYear) => {
  const resp = await getDoc(
    doc(db, `users/${userId}/homework/${currentStudyYear}`)
  );
  if (resp.exists()) {
    updateDoc(doc(db, `users/${userId}/homework/${currentStudyYear}`), {
      [data.id]: data,
    });
  } else {
    setDoc(doc(db, `users/${userId}/homework/${currentStudyYear}`), {
      [data.id]: data,
    });
  }
};
export const updateHomeworkDB = async (userId, currentStudyYear, homework) => {
  const resp = await getDoc(
    doc(db, `users/${userId}/homework/${currentStudyYear}`)
  );
  if (resp.exists()) {
    updateDoc(doc(db, `users/${userId}/homework/${currentStudyYear}`), {
      [homework.id]: homework,
    });
  } else {
    throw new Error("Домашней работы для обновления не найдено");
  }
};

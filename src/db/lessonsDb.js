import { db } from "../firebase/firebase";
import { setDoc, doc, collection, getDocs } from "firebase/firestore";

import shortid from "shortid";

const lessonsList = [
  "Русский язык",
  "Математика",
  "Литература",
  "История",
  "География",
  "Биология",
  "Английский язык",
  "Труды",
];

export const lessonsInit = async (userId) => {
  lessonsList.forEach((el) => {
    const lessonId = shortid.generate();
    setDoc(doc(db, `users/${userId}/lessons/${lessonId}`), {
      lessonId,
      title: el,
      teachers: [],
      cabinets: [],
    });
  });
};

export const getLessonsDB = async (userId) => {
  const resp = await getDocs(collection(db, `users/${userId}/lessons/`));

  const arr = resp.docs.reduce((obj, el) => {
    obj[el.data().lessonId] = el.data();
    return obj;
  }, {});

  return arr;
};

export const addLessonDB = async (userId, lesson) => {
  setDoc(doc(db, `users/${userId}/lessons/${lesson.lessonId}`), lesson);
};

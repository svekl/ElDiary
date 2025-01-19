import { db } from "../firebase/firebase";
import { setDoc, doc, getDoc, updateDoc } from "firebase/firestore";

export const dailySchedInit = async (userId, currentYear) => {
  setDoc(doc(db, `users/${userId}/dailyShedules/${currentYear}`), {});
};

export const getDailyShedulesDB = async (userId, currentYear) => {
  const resp = await getDoc(
    doc(db, `users/${userId}/dailyShedules/${currentYear}`)
  );
  if (resp.exists()) {
    return resp.data();
  } else {
    console.log("ежедневные расписания отсутствуют");
    return {};
  }
};

export const addDailySchedulesDB = async (userId, data, currentStudyYear) => {
  const resp = await getDoc(
    doc(db, `users/${userId}/dailyShedules/${currentStudyYear}`)
  );
  if (resp.exists()) {
    updateDoc(
      doc(db, `users/${userId}/dailyShedules/${currentStudyYear}`),
      data
    );
  } else {
    setDoc(doc(db, `users/${userId}/dailyShedules/${currentStudyYear}`), data);
  }
};

export const updateDailyScheduleLessonDB = async (
  userId,
  data,
  currentStudyYear
) => {
  const resp = await getDoc(
    doc(db, `users/${userId}/dailyShedules/${currentStudyYear}`)
  );
  if (resp.exists()) {
    let updateKey;
    if (data.updateKey === "lesson") {
      updateKey = `${data.date}.lessonsList.${data.number}`;
    } else {
      updateKey = `${data.date}.lessonsList.${data.number}.${data.updateKey}`;
    }

    updateDoc(doc(db, `users/${userId}/dailyShedules/${currentStudyYear}`), {
      [updateKey]: data.updateValue,
    });
  } else {
    throw new Error("Документ отсутствует");
  }
};

export const updateDailyScheduleDayDB = async (
  userId,
  data,
  currentStudyYear
) => {
  const resp = await getDoc(
    doc(db, `users/${userId}/dailyShedules/${currentStudyYear}`)
  );
  if (resp.exists()) {
    updateDoc(doc(db, `users/${userId}/dailyShedules/${currentStudyYear}`), {
      [`${data.date}.${data.updateKey}`]: data.updateValue,
    });
  } else {
    throw new Error("Документ отсутствует");
  }
};

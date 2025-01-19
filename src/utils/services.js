import moment from "moment/min/moment-with-locales.min";
import shortid from "shortid";
import { LESSONS } from "./constants";

export const buildTask = (lessonItem) => {
  const taskArr = [];
  lessonItem?.forEach((element) => {
    taskArr.push(
      `${element.task ? "упр. " : ""}${element.task || ""}${
        element.page ? " стр. " : ""
      }${element.page || ""} ${element.notes || ""}`
    );
  });
  return taskArr.join(", ");
};

export const renderDiaryTitle = (currentDateMoment) => {
  return `Неделя с ${currentDateMoment
    .clone()
    .startOf("week")
    .format("DD MMMM")} по ${currentDateMoment
    .clone()
    .endOf("week")
    .format("DD MMMM YYYY")} года`;
};

export const findCurrentStudyYear = (currentDateMoment) => {
  return currentDateMoment.isBefore(
    moment(`${currentDateMoment.format("YYYY")}-09-01`)
  )
    ? Number(currentDateMoment.format("YYYY")) - 1
    : Number(currentDateMoment.format("YYYY"));
};

export function getWeekDaysInStore(currentDateMoment, schedules) {
  const startWeekDate = currentDateMoment.clone().startOf("week");
  const endWeekDate = currentDateMoment.clone().endOf("week");
  return Object.keys(schedules).filter((el) =>
    moment(el).isBetween(startWeekDate.clone().subtract(1, "days"), endWeekDate)
  );
}
export function filteredSchedules(schedules, datesForfilter) {
  return Object.keys(schedules)
    .filter((key) => datesForfilter.includes(key))
    .reduce((obj, key) => {
      obj[key] = schedules[key];
      return obj;
    }, {});
}

export const findMissingDates = (currentDateMoment, schedules) => {
  const findingDates = getWeekDaysInStore(currentDateMoment, schedules);
  if (findingDates.length !== 7) {
    const missingDates = [];
    const startWeekDate = currentDateMoment.clone().startOf("week");
    const endWeekDate = currentDateMoment.clone().endOf("week");
    while (startWeekDate.isBefore(endWeekDate)) {
      if (!findingDates.includes(startWeekDate.format("YYYY-MM-DD"))) {
        missingDates.push(startWeekDate.format("YYYY-MM-DD"));
      }
      startWeekDate.add(1, "days");
    }
    return missingDates;
  }
  return [];
};

export function findDayInWeeklyShedule(dateStr, weeklySchedule) {
  const dayOfWeek = moment(dateStr).day();
  if (weeklySchedule && dayOfWeek) {
    return weeklySchedule.schedule[dayOfWeek - 1];
  }
  return [];
}

export function checkWeeklySchedule(
  currentDateMoment,
  schedules,
  weeklySchedule,
  dispatch,
  action,
  userId
) {
  const missingDates = findMissingDates(currentDateMoment, schedules);
  if (missingDates.length) {
    const newScheduleItems = missingDates.reduce((sheduleItems, date) => {
      let lessonsList = {};
      // if (weeklySchedule.schedule) {
      //   lessonsList = findDayInWeeklyShedule(date, weeklySchedule).map(
      //     (lesson) => ({ ...lesson, homework: null, grade: null })
      //   );\
      if (weeklySchedule.schedule) {
        lessonsList = findDayInWeeklyShedule(date, weeklySchedule).reduce(
          (lessonsList, lesson, number) => {
            lessonsList[number] = { ...lesson, homework: null, grade: null };
            return lessonsList;
          },
          {}
        );
      } else {
        lessonsList = {
          0: LESSONS.DAILY_LESSON_ITEM,
        };
      }
      sheduleItems[date] = {
        id: shortid.generate(),
        date,
        lessonsList,
        notes: null,
        vacation: false,
        holiday: false,
      };
      return sheduleItems;
    }, {});

    missingDates.map((date) => findDayInWeeklyShedule(date));
    const currentStudyYear = findCurrentStudyYear(currentDateMoment);
    dispatch(
      action({ userId, schedulesList: newScheduleItems, currentStudyYear })
    );
  }
}

export const toChangeDate = (count, setter, step, dateMoment) => {
  if (count > 0) {
    setter(dateMoment.clone().add(step, "days"));
  } else {
    setter(dateMoment.clone().subtract(step, "days"));
  }
};

export const findTeacherForSelectLesson = (
  lessons,
  selectLessonId,
  teachers
) => {
  const teachersThisLesson = lessons[selectLessonId].teachers;
  if (!teachersThisLesson.length) {
    return Object.values(teachers)
      .filter((teacher) => teacher.teachingLessons.includes(selectLessonId))
      .reduce((arr, teacher) => [...arr, teacher.id], []);
  } else {
    return teachersThisLesson;
  }
};

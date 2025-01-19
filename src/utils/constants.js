export const SETTINGS = {
  CURRENT_HOMEWORK: 0,
  NEXT_HOMEWORK: 1,
};

export const LESSONS = {
  LESSONS_LIST: [
    "Русский язык",
    "Математика",
    "Литература",
    "История",
    "География",
    "Биология",
    "Английский язык",
    "Труды",
  ],
  DAILY_LESSON_ITEM: {
    lessonId: null,
    homework: null,
    grade: null,
    teacherId: null,
    cabinet: null,
  },
};

export const CONTENT = {
  LOAD_MES: "Загрузка...",
  ER404_MES: "Ведутся технические работы, скоро все будет работать",
  ADD_LESSON_ER_TITLE: "Название урока обязательно к заполению!",
  ADD_LESSON_ER_AVAIL:
    "Введенное название урока уже существует! Выберите другое",
  ADD_TEACHER_ER_NAME: "Имя учителя обязательно к заполению!",
  ADD_TEACHER_ER_LESSON:
    "Уроки, которые ведет учитель обязательны к заполнению!",
  ADD_TEACHER_ER_AVAIL: "Такой учитель уже существует!",
  QUARTERS: {
    ERR_DATES: "Ошибка! Проверьте правильность введенных дат",
    ERR_DATE_START: "Начальная дата введена неверно!",
    ERR_DATE_END: "Конечная дата введена неверно!",
    ERR_DATE_PERIOD: "Начальная дата больше, чем конечная дата!",
  },
};

export const WEEKLY_SCHEDULE = {
  DAY_OF_WEEK: [
    "Понедельник",
    "Вторник",
    "Среда",
    "Четверг",
    "Пятница",
    "Суббота",
  ],
  EMPTY_LIST: [
    [{ lessonId: null, cabinet: null, teacherId: null }],
    [{ lessonId: null, cabinet: null, teacherId: null }],
    [{ lessonId: null, cabinet: null, teacherId: null }],
    [{ lessonId: null, cabinet: null, teacherId: null }],
    [{ lessonId: null, cabinet: null, teacherId: null }],
    [{ lessonId: null, cabinet: null, teacherId: null }],
  ],
};

export const MENU_CARDS = {
  HOMEWORK_ID: 1,
  DIARY_ID: 2,
  SCHEDULE_ID: 3,
  GRADES_ID: 4,
  TEACHERS_ID: 5,
  RINGS_ID: 6,
  LESSONS_ID: 7,
  NOTES_ID: 8,
};

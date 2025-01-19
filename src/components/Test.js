import { useEffect, useState } from "react";
import moment from "moment/min/moment-with-locales.min";

function Test() {
  moment.locale("ru");
  const currentDate = moment("2024-09-02");
  // console.log(currentDate.format("DD MMMM YYYY")); 01 сентября 2024
  // console.log(currentDate.format("dddd")); воскресенье
  // console.log(currentDate.add("days", 1)); //добавить 1 день
  // console.log(currentDate.format("DD MMMM YYYY"));
  // console.log(currentDate.startOf("week")); начало недели где есть текущая дата

  const [displayDate, setDisplayData] = useState(
    currentDate.clone().add(1, "days")
  );

  const [displayDayForHomework, setDisplayDayForHomework] = useState(null);
  const [diaryWeek, setDiaryWeek] = useState([]);
  const [lessons] = useState([
    { id: 1, title: "Русский", teachers: [null] },
    { id: 2, title: "Математика", teachers: [null] },
    { id: 3, title: "Литература", teachers: [null] },
  ]);
  const [teachers, setTeachers] = useState([
    {
      id: 1,
      name: "Иванова Мария Михайловна",
      tel: "(905)123-22-33",
      teachingLessons: [1, 3],
    },
    {
      id: 2,
      name: "Петрова Лилия Григорьевна",
      tel: "(905)111-22-33",
      teachingLessons: [2],
    },
  ]);
  const [shedules, setShedules] = useState([
    {
      id: 1,
      date: moment("2024-09-02"),
      lessonsList: [
        {
          lessonId: 2,
          homework: {
            id: 1,
            task: null,
            page: null,
            notes: "qwerty",
            isDone: false,
          },
          teacherId: 2,
        },
        {
          lessonId: 1,
          homework: {
            id: 2,
            task: "10",
            page: "15",
            notes: "qwerty",
            isDone: false,
          },
          teacherId: 1,
        },
      ],
      notes: "qwerty",
      vacation: false,
      holiday: false,
    },
    {
      id: 2,
      date: moment("2024-09-03"), //date.getDay() возвращает день недели от 0 - вс до 6 - сб
      lessonsList: [
        {
          lessonId: null,
          homework: null,
          teacherId: null,
        },
        {
          lessonId: 1,
          homework: [{ id: 2, task: "10", page: "15", notes: "qwerty" }],
          isDone: false,
          mark: null,
          teacherId: 1,
        },
      ],
      notes: "asdfg",
      vacation: false,
      holiday: false,
    },
    {
      id: 3,
      date: moment("2024-09-04"), //date.getDay() возвращает день недели от 0 - вс до 6 - сб
      lessonsList: [
        {
          lessonId: 1,
          homework: null,
          teacherId: 1,
        },
        {
          lessonId: 1,
          homework: {
            id: 2,
            task: "10",
            page: "15",
            notes: "qwerty",
            isDone: false,
          },
          teacherId: 1,
        },
      ],
      notes: "asdfg",
      vacation: false,
      holiday: false,
    },
  ]);
  const [lessonShedule, setLessonShedule] = useState({
    0: [],
    1: [2, 1],
    2: [null, 1],
    3: null,
    4: [3, 2, 1],
    5: [1, 2, 3],
    6: null,
  }); //созержит lessonId

  const findDiaryWeek = (date) => {
    const startWeek = date.clone().startOf("week");
    const endWeek = date.clone().endOf("week");
    return shedules.filter((el) =>
      el.date.isBetween(startWeek.subtract(1, "days"), endWeek)
    );
  };
  //получить массив с 6 днями дневника

  useEffect(
    () => {
      //если они пустые, нужно добавить записи в расписание на текущую неделю в зависимости от заданного расписания уроков
      setDisplayDayForHomework(
        shedules.find((el) => el.date.isSame(displayDate))
      );
      setDiaryWeek(findDiaryWeek(currentDate));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const findLessonTitle = (lessonId) => {
    if (!lessonId) return "Урока нет";
    const findingLesson = lessons.find((lesson) => lesson.id === lessonId);
    return findingLesson.title;
  };

  const lessonItemRender = (lessonItem) => {
    if (!lessonItem.lessonId) {
      return "Урока нет";
    } else {
      return `${findLessonTitle(lessonItem.lessonId)}: ${
        lessonItem.homework.task ? "упр." : ""
      } ${lessonItem.homework.task || ""} 
         ${lessonItem.homework.page ? "стр." : ""} ${
        lessonItem.homework.page || ""
      } ${lessonItem.homework.notes}`;
    }
  };

  return (
    <div className="App">
      <h1>Электронный дневник</h1>

      <h2>Сегодня {currentDate.format("dddd, DD MMMM YYYY")}</h2>
      <h3>Домашнее задание на {displayDate.format("dddd")}:</h3>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
          alignItems: "center",
          gap: "35px",
        }}
      >
        <button
          onClick={() => {
            const prevDay = displayDate.clone().subtract(1, "days");
            return setDisplayData(prevDay);
          }}
        >
          Предыдущий день
        </button>
        <div>
          {displayDayForHomework
            ? displayDayForHomework.lessonsList.map((el, ind) => {
                return (
                  <p key={ind}>
                    {ind + 1}. {lessonItemRender(el)}
                  </p>
                );
              })
            : "отдыхаем"}

          <div>Заметки на день: {displayDayForHomework?.notes || "нет"}</div>
        </div>
        <button
          onClick={() => {
            return setDisplayData(displayDate.clone().add(1, "days"));
          }}
        >
          Следующий день
        </button>
      </div>
      <div>
        <h2>Дневник на текущую неделю</h2>
        <div>
          {diaryWeek?.map((el, ind) => {
            return <h3 key={ind}>{el?.date.format("dddd, DD MMMM YYYY")}</h3>;
          })}
        </div>
      </div>
    </div>
  );
}

export default Test;

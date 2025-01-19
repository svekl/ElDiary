import { useState } from "react";
import { useSelector } from "react-redux";
import { findTeacherForSelectLesson } from "../../utils/services";

const ScheduleRowCreate = ({ lessonInfo, index }) => {
  const lessons = useSelector((state) => state.lessons.lessons);
  const teachers = useSelector((state) => state.teachers.teachersList);

  const [lessonId, setLessonId] = useState(null);
  const [cabinet, setCabinet] = useState(null);
  const [teacherId, setTeacherId] = useState(null);

  return (
    <>
      <div className="diary__cell">{index + 1}.</div>
      <div className="diary__cell">
        <label htmlFor="selectLesson"></label>
        <select
          value={lessonId}
          onChange={(ev) => {
            setLessonId(Number(ev.target.value));
          }}
          name="selectLesson"
          id="selectLesson"
        >
          <option value={null}>Выберите урок</option>
          {Object.values(lessons).map((lesson) => (
            <option value={lesson.lessonId} key={lesson.lessonId}>
              {lesson.title}
            </option>
          ))}
        </select>
      </div>
      <div className="diary__cell">
        <input
          type="number"
          placeholder="Введите кабинет"
          onChange={(ev) => {
            setCabinet(Number(ev.target.value));
          }}
        />
      </div>
      <div className="diary__cell">
        {lessonId &&
          (findTeacherForSelectLesson(lessons, lessonId, teachers).length ? (
            <select
              value={teacherId}
              onChange={(ev) => {
                setTeacherId(Number(ev.target.value));
              }}
              id="selectTeacher"
            >
              <option value={null}>Выберите учителя</option>
              {findTeacherForSelectLesson(lessons, lessonId, teachers).map(
                (teacherId) => {
                  return (
                    <option value={teacherId} key={teacherId}>
                      {teachers[teacherId].name}
                    </option>
                  );
                }
              )}{" "}
            </select>
          ) : (
            <div>Учителей для выбранного урока не найдено</div>
          ))}
      </div>
    </>
  );
};

export default ScheduleRowCreate;

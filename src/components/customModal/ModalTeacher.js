import React, { useEffect, useState } from "react";
import {
  openCloseModal,
  saveModalData,
  setModify,
} from "../../store/slices/contentSlice";
import { useSelector, useDispatch } from "react-redux";
import { addTeacherThunk } from "../../store/slices/teachersSlice";
import shortid from "shortid";
import { CONTENT } from "../../utils/constants";

export const ModalTeacher = () => {
  const lessons = useSelector((state) => state.lessons.lessons);
  const modify = useSelector((state) => state.content.openModal.modify);
  const modalData = useSelector((state) => state.content.openModal.modalData);
  const userId = useSelector((state) => state.user.id);
  const teachers = useSelector((state) => state.teachers.teachersList);
  const [teacherName, setTeacherName] = useState(null);
  const [lessonsIdList, setLessonsIdList] = useState([]);
  const [tel, setTel] = useState(null);
  const [birthdate, setBirthdate] = useState(null);
  const [tempName, setTempName] = useState(null);
  const [error, setError] = useState(null);

  const errorName = CONTENT.ADD_TEACHER_ER_NAME;
  const errorLesson = CONTENT.ADD_TEACHER_ER_LESSON;
  const errorAvail = CONTENT.ADD_TEACHER_ER_AVAIL;

  const dispatch = useDispatch();

  const toCloseAndRefreshData = () => {
    setError(null);
    setLessonsIdList(null);
    setTeacherName(null);
    setTel(null);
    setBirthdate(null);
    dispatch(saveModalData({}));
    dispatch(setModify(false));
    dispatch(openCloseModal({ teacherModal: false }));
  };
  const checkValues = () => {
    if (!teacherName) {
      setError(errorName);
      return false;
    } else if (!lessonsIdList.length) {
      setError(errorLesson);
      return false;
    } else {
      const avaiTeacherName = Object.values(teachers).filter(
        (teacher) => teacher.name.toLowerCase() === teacherName.toLowerCase()
      );
      if (!avaiTeacherName.length) {
        return true;
      } else {
        if (modify && tempName.toLowerCase() === teacherName.toLowerCase()) {
          return true;
        } else {
          setError(errorAvail);
          return false;
        }
      }
    }
  };
  const addTeacherToList = () => {
    if (checkValues()) {
      const id = modify ? modalData.teacher.id : shortid.generate();
      const teacher = {
        id: id,
        name: teacherName,
        tel: tel,
        birthdate: birthdate,
        teachingLessons: lessonsIdList,
      };
      dispatch(addTeacherThunk({ userId, teacher }));
      toCloseAndRefreshData();
    }
  };

  useEffect(() => {
    if (modify) {
      setTeacherName(modalData.teacher.name);
      setTempName(modalData.teacher.name);
      setTel(modalData.teacher.tel);
      setBirthdate(modalData.teacher.birthdate);
      setLessonsIdList(modalData.teacher.teachingLessons);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="modal-content">
      <div className="modal-content-box modal-content-box-center">
        <h3>{modify ? "Изменить" : "Добавить"} учителя:</h3>
        <input
          className="modal-content-input"
          type="text"
          placeholder="Введите ФИО учителя"
          value={teacherName || ""}
          onChange={(ev) => {
            setTeacherName(ev.target.value);
            setError(null);
          }}
        />
        <input
          className="modal-content-input"
          type="date"
          placeholder="Введите день рождения"
          value={birthdate || ""}
          onChange={(ev) => {
            setBirthdate(ev.target.value);
          }}
        />
        <input
          className="modal-content-input"
          type="tel"
          placeholder="Введите телефон"
          value={tel || ""}
          onChange={(ev) => {
            setTel(ev.target.value);
          }}
        />
        <h4>Выберите уроки, которые ведет учитель:</h4>
        <div className="modal-content-choice">
          {Object.values(lessons).map((lesson) => (
            <div key={lesson.lessonId}>
              <input
                className="modal-content-radio"
                type="checkbox"
                name="selectLesson"
                value={lesson.lessonId}
                id={`lesson${lesson.lessonId}`}
                checked={lessonsIdList.includes(lesson.lessonId)}
                onChange={(ev) => {
                  setLessonsIdList(
                    lessonsIdList.includes(ev.target.value)
                      ? lessonsIdList.filter((el) => el !== ev.target.value)
                      : [...lessonsIdList, ev.target.value]
                  );
                  setError(null);
                }}
              />
              <label htmlFor={`lesson${lesson.lessonId}`}>{lesson.title}</label>
            </div>
          ))}
        </div>
      </div>

      <div className="modal-content-error">{error}</div>

      <button
        className="modal-submit-button"
        onClick={() => {
          addTeacherToList();
        }}
      >
        {modify ? "Сохранить изменения" : "Добавить учителя"}
      </button>
    </div>
  );
};

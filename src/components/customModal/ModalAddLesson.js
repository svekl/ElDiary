import React, { useEffect, useState } from "react";
import { openCloseModal, editModalData } from "../../store/slices/contentSlice";
import { useSelector, useDispatch } from "react-redux";
import { updateDailyScheduleLessonThunk } from "../../store/slices/dailySchedulesSlice";
import moment from "moment/min/moment-with-locales.min";
import { findCurrentStudyYear } from "../../utils/services";

export const ModalAddLesson = () => {
  const lessons = useSelector((state) => state.lessons.lessons);
  const teachers = useSelector((state) => state.teachers.teachersList);
  const modalData = useSelector((state) => state.content.openModal.modalData);
  const modify = useSelector((state) => state.content.openModal.modify);
  const createMode = useSelector((state) => state.content.openModal.createMode);
  const editMode = useSelector((state) => state.content.openModal.editMode);
  const userId = useSelector((state) => state.user.id);
  const [selectLessonId, setSelectLessonId] = useState(null);
  const [selectTeacher, setSelectTeacher] = useState(null);
  const [selectCabinet, setSelectCabinet] = useState(null);
  const [error, setError] = useState(false);

  const dispatch = useDispatch();

  const toCloseAndRefreshData = () => {
    setError(false);
    setSelectLessonId(null);
    setSelectTeacher(null);
    setSelectCabinet(null);
    if (modify) {
      dispatch(openCloseModal({ lessonModal: false, editDayModal: true }));
    } else {
      dispatch(openCloseModal({ lessonModal: false }));
    }
  };

  const addLessonToShedule = () => {
    if (!createMode && !editMode) {
      if (!selectLessonId) {
        setError(true);
        return;
      } else {
        dispatch(
          updateDailyScheduleLessonThunk({
            userId,
            data: {
              date: modalData.date,
              number: modalData.number,
              updateKey: "lesson",
              updateValue: {
                lessonId: selectLessonId,
                homework: null,
                grade: null,
                teacherId: selectTeacher || null,
                cabinet: selectCabinet || null,
              },
            },
            currentStudyYear: findCurrentStudyYear(moment(modalData.date)),
          })
        );
        toCloseAndRefreshData();
      }
    }
    if (createMode || editMode) {
      dispatch(
        editModalData({
          selectLessonId: selectLessonId,
          selectTeacher: selectTeacher,
          selectCabinet: selectCabinet,
        })
      );
    }
    toCloseAndRefreshData();
  };

  const findTeacherForSelectLesson = () => {
    return Object.values(teachers)
      .filter((teacher) => teacher.teachingLessons.includes(selectLessonId))
      .reduce((arr, teacher) => [...arr, teacher.id], []);
  };
  const contentItemCount = (itemsArr) => {
    if (itemsArr.length <= 1) {
      return "modal-content-choice-single";
    }
    return "";
  };
  useEffect(() => {
    if (modify || editMode) {
      setSelectLessonId(modalData.lessonId);
      setSelectTeacher(modalData.teacherId);
      setSelectCabinet(modalData.cabinet);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="modal-content">
      <h3>{modify ? "Изменить" : "Добавить"} урок:</h3>
      <div className="modal-content-choice">
        {Object.values(lessons).map((lesson) => (
          <div
            key={lesson.lessonId}
            className={contentItemCount(Object.values(lessons))}
          >
            <input
              className="modal-content-radio"
              type="radio"
              name="selectLesson"
              value={lesson.lessonId}
              id={`lesson${lesson.lessonId}`}
              checked={selectLessonId === lesson.lessonId}
              onChange={(el) => {
                setSelectLessonId(el.target.value);
                setError(false);
              }}
            />
            <label htmlFor={`lesson${lesson.lessonId}`}>{lesson.title}</label>
          </div>
        ))}
      </div>

      {selectLessonId && (
        <>
          <h3>Учитель:</h3>
          <div className="modal-content-choice">
            {findTeacherForSelectLesson().length ? (
              findTeacherForSelectLesson().map((teacherId) => (
                <div
                  key={teacherId}
                  className={contentItemCount(findTeacherForSelectLesson())}
                >
                  <input
                    className="modal-content-radio"
                    type="radio"
                    name="selectTeacher"
                    value={teacherId}
                    id={`teacher${teacherId}`}
                    checked={selectTeacher === teacherId}
                    onChange={(el) => {
                      setSelectTeacher(el.target.value);
                    }}
                  />
                  <label htmlFor={`teacher${teacherId}`}>
                    {teachers[teacherId].name}
                  </label>
                </div>
              ))
            ) : (
              <div className={contentItemCount(findTeacherForSelectLesson())}>
                Учителей для этого урока не найдено
              </div>
            )}
          </div>

          <h3>Кабинет:</h3>
          <div className="modal-content-choice">
            {lessons[selectLessonId].cabinets.length ? (
              lessons[selectLessonId].cabinets.map((classItem, ind) => (
                <div
                  key={ind}
                  className={contentItemCount(lessons[selectLessonId].cabinets)}
                >
                  <input
                    className="modal-content-radio"
                    type="radio"
                    name="selectClass"
                    value={classItem}
                    id={`class${classItem}`}
                    checked={selectCabinet === classItem}
                    onChange={(el) => {
                      setSelectCabinet(Number(el.target.value));
                    }}
                  />
                  <label htmlFor={`class${classItem}`}>{classItem}</label>
                </div>
              ))
            ) : (
              <div
                className={contentItemCount(lessons[selectLessonId].cabinets)}
              >
                Кабинетов для этого урока не найдено
              </div>
            )}
          </div>
        </>
      )}
      {error && <div className="modal-content-error">Урок не выбран!</div>}

      <button
        className="modal-submit-button"
        onClick={() => {
          addLessonToShedule();
        }}
      >
        {modify ? "Сохранить изменения" : "Добавить урок"}
      </button>
    </div>
  );
};

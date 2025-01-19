import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { openCloseModal, saveModalData } from "../../store/slices/contentSlice";

export const ModalLessonInfo = () => {
  const modalData = useSelector((state) => state.content.openModal.modalData);
  const teacher = useSelector(
    (state) => state.teachers.teachersList[modalData.lesson.teacherId]
  );
  const dispatch = useDispatch();
  const toClose = () => {
    dispatch(openCloseModal({ lessonInfoModal: false }));
    dispatch(saveModalData({}));
  };

  return (
    <div className="modal-content">
      <div className="modal-content-choice modal-content-choice-grade">
        <div className="modal-content-choice-item">
          <span>Урок:</span> {modalData.title}
        </div>
        <div className="modal-content-choice-item">
          <span>Кабинет: </span>
          {modalData.lesson.cabinet || "Не записан"}
        </div>
        <div className="modal-content-choice-item">
          <span>Учитель: </span>
          {teacher ? teacher.name : "Не записан"}
        </div>
      </div>

      <button
        className="modal-submit-button"
        onClick={() => {
          toClose();
        }}
      >
        Ок
      </button>
    </div>
  );
};

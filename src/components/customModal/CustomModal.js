import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { ReactComponent as CloseIcon } from "../../assets/icons/close.svg";
import { useDispatch, useSelector } from "react-redux";
import { ModalAddLesson } from "./ModalAddLesson";
import { ModalAddHomework } from "./ModalAddHomework";
import { ModalAddGrade } from "./ModalAddGrade";
import {
  openCloseModal,
  saveModalData,
  setCreate,
  setEditMode,
  setModify,
} from "../../store/slices/contentSlice";
import { ModalAddNotes } from "./ModalAddNotes";
import { ModalModifyDay } from "./ModalModifyDay";
import { ModalTeacher } from "./ModalTeacher";
import { ModalLesson } from "./ModalLesson";
import { ModalLessonInfo } from "./ModalLessonInfo";
import { ModalQuarter } from "./ModalQuarter";

export const CustomModal = ({ data }) => {
  const modalList = useSelector((state) => state.content.openModal.modalList);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const toFindContent = () => {
    const entries = Object.entries(modalList);
    let comp;
    if (entries.filter((el) => el[1] === true).length === 1) {
      comp = entries.filter((el) => el[1] === true)[0][0];
    }
    switch (comp) {
      case "lessonModal":
        return <ModalAddLesson />;
      case "homeWorkModal":
        return <ModalAddHomework />;
      case "gradeModal":
        return <ModalAddGrade />;
      case "notesModal":
        return <ModalAddNotes />;
      case "editDayModal":
        return <ModalModifyDay />;
      case "teacherModal":
        return <ModalTeacher />;
      case "lessonListModal":
        return <ModalLesson />;
      case "lessonInfoModal":
        return <ModalLessonInfo />;
      case "quarterModal":
        return <ModalQuarter />;
      default:
        return null;
    }
  };
  const payload = () => {
    const entries = Object.entries(modalList);
    let comp;
    if (entries.filter((el) => el[1] === true).length === 1) {
      comp = entries.filter((el) => el[1] === true)[0][0];
    }
    const payload = {};
    payload[comp] = false;
    return payload;
  };

  const isOpen = () => {
    const entries = Object.entries(modalList);
    if (entries.filter((el) => el[1] === true).length === 1) {
      setOpen(true);
    } else if (!entries.filter((el) => el[1] === true).length) {
      setOpen(false);
    } else {
      console.log("ошибка! открытых модалок больше 1");
    }
  };

  const onClose = () => {
    dispatch(openCloseModal(payload()));
    dispatch(setModify(false));
    dispatch(setEditMode(false));
    dispatch(setCreate(false));
    dispatch(saveModalData({}));
  };

  useEffect(() => {
    isOpen();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modalList]);

  return (
    <div>
      <Modal
        isOpen={open}
        overlayClassName={"modal-overlay"}
        className="modal-box"
        ariaHideApp={false}
        closeTimeoutMS={100}
        onRequestClose={() => {
          onClose();
        }}
      >
        <button className="modal-close-button" onClick={() => onClose()}>
          <CloseIcon />
        </button>

        {toFindContent()}
      </Modal>
    </div>
  );
};

import React, { useEffect, useState } from "react";
import {
  openCloseModal,
  saveModalData,
  setModify,
} from "../../store/slices/contentSlice";
import { useSelector, useDispatch } from "react-redux";
import { addLessonThunk } from "../../store/slices/lessonsSlice";
import del from "../../assets/icons/delete.svg";
import shortid from "shortid";
import { CONTENT } from "../../utils/constants";

export const ModalLesson = () => {
  const modify = useSelector((state) => state.content.openModal.modify);
  const modalData = useSelector((state) => state.content.openModal.modalData);
  const userId = useSelector((state) => state.user.id);
  const lessons = useSelector((state) => state.lessons.lessons);
  const [title, setTitle] = useState(null);
  const [cabinet, setCabinet] = useState(null);
  const [cabinets, setCabinets] = useState([]);
  const [tempTitle, setTempTitle] = useState(null);
  const [error, setError] = useState(null);

  const errorTitle = CONTENT.ADD_LESSON_ER_TITLE;
  const errorAvail = CONTENT.ADD_LESSON_ER_AVAIL;

  const dispatch = useDispatch();

  const addCabinetinList = () => {
    if (cabinet) {
      setCabinets([...cabinets, cabinet]);
      setCabinet(null);
    }
  };

  const delCabinets = () => {
    setCabinets([]);
  };

  const toCloseAndRefreshData = () => {
    setError(null);
    setTitle(null);
    setCabinets([]);
    setCabinet(null);
    dispatch(saveModalData({}));
    dispatch(setModify(false));
    dispatch(openCloseModal({ lessonListModal: false }));
  };
  const checkValues = () => {
    if (!title) {
      setError(errorTitle);
      return false;
    } else {
      const availLessonTitle = Object.values(lessons).filter(
        (lesson) => lesson.title.toLowerCase() === title.toLowerCase()
      );
      if (!availLessonTitle.length) {
        return true;
      } else {
        if (modify && tempTitle.toLowerCase() === title.toLowerCase()) {
          return true;
        } else {
          setError(errorAvail);
          return false;
        }
      }
    }
  };
  const addLessonToList = () => {
    if (checkValues()) {
      const id = modify ? modalData.lesson.lessonId : shortid.generate();
      const cabinetList = cabinet ? [...cabinets, cabinet] : [...cabinets];
      const lesson = {
        lessonId: id,
        title,
        cabinets: cabinetList,
      };
      dispatch(addLessonThunk({ userId, lesson }));
      toCloseAndRefreshData();
    }
  };

  useEffect(() => {
    if (modify) {
      setTitle(modalData.lesson.title);
      setTempTitle(modalData.lesson.title);
      setCabinets(modalData.lesson.cabinets);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="modal-content">
      <h3>{modify ? "Изменить" : "Добавить"} урок:</h3>

      <div className="lessons__modal">
        <input
          className="modal-content-input"
          type="text"
          placeholder="Введите название урока"
          value={title || ""}
          onChange={(ev) => {
            setTitle(ev.target.value);
            setError(null);
          }}
        />
        {!!cabinets.length && (
          <div className="lessons__modal-box">
            <div>Выбранные кабинеты: {cabinets.join(", ")}</div>
            <img
              className="diary__icons"
              src={del}
              alt="удалить"
              onClick={() => {
                delCabinets();
              }}
            />
          </div>
        )}
        <input
          className="modal-content-input"
          type="number"
          placeholder="Введите кабинеты"
          value={cabinet || ""}
          onChange={(ev) => {
            setCabinet(Number(ev.target.value));
          }}
        />
        <button
          className="modal-submit-button modal-button"
          disabled={!cabinet}
          onClick={() => {
            addCabinetinList();
          }}
        >
          Добавить еще кабинет
        </button>
      </div>

      <div className="modal-content-error">{error}</div>

      <button
        className="modal-submit-button"
        onClick={() => {
          addLessonToList();
        }}
      >
        {modify ? "Сохранить изменения" : "Добавить урок"}
      </button>
    </div>
  );
};

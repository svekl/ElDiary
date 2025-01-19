import React, { useState, useEffect } from "react";
import edit from "../../assets/icons/edit-pen.svg";
import del from "../../assets/icons/delete.svg";
import { useDispatch, useSelector } from "react-redux";
import { addHomeworkThunk } from "../../store/slices/homeworksSlice";
import { openCloseModal, saveModalData } from "../../store/slices/contentSlice";
import shortid from "shortid";
import { findCurrentStudyYear } from "../../utils/services";
import moment from "moment/min/moment-with-locales.min";

export const ModalAddHomework = () => {
  const [error, setError] = useState(false);
  const [task, setTask] = useState("");
  const [page, setPage] = useState("");
  const [note, setNote] = useState("");
  const [homeworkData, setHomeworkData] = useState([]);
  const [editHW, setEditHW] = useState(false);
  const dispatch = useDispatch();
  const modalData = useSelector((state) => state.content.openModal.modalData);
  const modify = useSelector((state) => state.content.openModal.modify);
  const userId = useSelector((state) => state.user.id);

  const addAnotherHW = () => {
    if (task || page || note) {
      setHomeworkData([
        ...homeworkData,
        { task: task, page: page, notes: note },
      ]);
      setTask("");
      setPage("");
      setNote("");
    } else {
      setError(true);
    }
  };

  const toCloseAndRefreshData = () => {
    setHomeworkData([]);
    setError(false);
    setTask("");
    setPage("");
    setNote("");
    if (modify) {
      dispatch(openCloseModal({ homeWorkModal: false, editDayModal: true }));
    } else {
      dispatch(openCloseModal({ homeWorkModal: false }));
    }
  };

  const saveHomework = () => {
    if (!task && !page && !note && !homeworkData.length) {
      setError(true);
    } else {
      let hw;
      const homeworkId = shortid.generate();
      if (task || page || note) {
        hw = [...homeworkData, { task: task, page: page, notes: note }];
      } else {
        hw = homeworkData;
      }
      const homework = { id: homeworkId, homework: hw, isDone: false };
      const currentStudyYear = findCurrentStudyYear(moment(modalData.date));
      const data = {
        updateKey: "homework",
        date: modalData.date,
        number: modalData.number,
        updateValue: homeworkId,
      };
      dispatch(
        addHomeworkThunk({ userId, homework, currentStudyYear, data, dispatch })
      );
      toCloseAndRefreshData();
    }
  };

  const editHomeWork = (ind) => {
    const newHW = [...homeworkData];
    newHW[ind] = { task: task, page: page, notes: note };
    return newHW;
  };

  const delHomework = (ind) => {
    setHomeworkData(homeworkData.filter((el, index) => index !== ind));
  };

  useEffect(() => {
    if (modify) {
      setHomeworkData(modalData.homework);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="modal-content">
      <h3>Добавить домашнее задание:</h3>
      <div>
        {homeworkData.map((hw, ind) => (
          <div key={ind}>
            <div>
              {hw.task ? "упр. " : ""}
              {hw.task || ""}
              {hw.page ? " стр. " : ""}
              {hw.page || ""} {hw.notes || ""}
              {","}
            </div>
            {modify && (
              <>
                <img
                  className="diary__icons"
                  src={edit}
                  alt="изменить"
                  onClick={() => {
                    setEditHW(true);
                    dispatch(
                      saveModalData({ ...modalData, editHwNumber: ind })
                    );
                    setTask(hw.task || "");
                    setPage(hw.page || "");
                    setNote(hw.notes || "");
                  }}
                />
                <img
                  className="diary__icons"
                  src={del}
                  alt="удалить"
                  onClick={() => {
                    delHomework(ind);
                  }}
                />
              </>
            )}
          </div>
        ))}
      </div>

      <div className="modal-content-box">
        <div className="modal-content__input-hw">
          <label htmlFor="taskInput">Упражнение:</label>
          <input
            className="modal-content-input"
            type="text"
            id="taskInput"
            value={task}
            onChange={(el) => {
              setTask(el.target.value);
              setError(false);
            }}
          />
        </div>
        <div className="modal-content__input-hw">
          <label>Страницы:</label>
          <input
            className="modal-content-input"
            type="text"
            value={page}
            onChange={(el) => {
              setPage(el.target.value);
              setError(false);
            }}
          />
        </div>
        <div className="modal-content__input-hw">
          <label>Заметки:</label>
          <input
            className="modal-content-input"
            type="text"
            value={note}
            onChange={(el) => {
              setNote(el.target.value);
              setError(false);
            }}
          />
        </div>
        {editHW ? (
          <button
            className="modal-submit-button modal-button"
            onClick={() => {
              setEditHW(false);
              setHomeworkData(editHomeWork(modalData.editHwNumber));
              setTask("");
              setPage("");
              setNote("");
            }}
          >
            Сохранить изменения
          </button>
        ) : (
          <button
            className="modal-submit-button modal-button"
            onClick={() => {
              addAnotherHW();
            }}
          >
            Добавить еще задание
          </button>
        )}
      </div>

      {error && (
        <div className="modal-content-error">Домашнее задание не введено!</div>
      )}

      <button
        className="modal-submit-button"
        disabled={editHW}
        onClick={() => saveHomework()}
      >
        Сохранить домашнее задание
      </button>
    </div>
  );
};

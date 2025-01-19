import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateDailyScheduleLessonThunk } from "../../store/slices/dailySchedulesSlice";
import { openCloseModal } from "../../store/slices/contentSlice";
import { findCurrentStudyYear } from "../../utils/services";
import moment from "moment/min/moment-with-locales.min";

export const ModalAddGrade = () => {
  const [radioValue, setRadioValue] = useState("");
  const [error, setError] = useState(false);
  const modalData = useSelector((state) => state.content.openModal.modalData);
  const modify = useSelector((state) => state.content.openModal.modify);
  const userId = useSelector((state) => state.user.id);
  const dispatch = useDispatch();

  const toCloseAndRefreshData = () => {
    setRadioValue("");
    setError(false);
    if (modify) {
      dispatch(openCloseModal({ gradeModal: false, editDayModal: true }));
    } else {
      dispatch(openCloseModal({ gradeModal: false }));
    }
  };

  const saveGrade = () => {
    if (!radioValue) {
      setError(true);
    } else {
      const currentStudyYear = findCurrentStudyYear(moment(modalData.date));
      dispatch(
        updateDailyScheduleLessonThunk({
          userId,
          data: {
            date: modalData.date,
            number: modalData.number,
            updateValue: Number(radioValue),
            updateKey: "grade",
          },
          currentStudyYear,
        })
      );
      toCloseAndRefreshData();
    }
  };
  useEffect(() => {
    if (modify) {
      setRadioValue(String(modalData.grade));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="modal-content">
      <h3>{modify ? "Изменить оценку" : "Добавить оценку"}</h3>

      <div className="modal-content-choice modal-content-choice-grade">
        <div className="modal-content-choice-item">
          <input
            className="modal-content-radio"
            type="radio"
            name="grade"
            value="5"
            id="gradeChoice1"
            checked={radioValue === "5"}
            onChange={(el) => {
              setRadioValue(el.target.value);
              setError(false);
            }}
          />
          <label htmlFor="gradeChoice1">5</label>
        </div>
        <div className="modal-content-choice-item">
          <input
            className="modal-content-radio"
            type="radio"
            name="grade"
            value="4"
            id="gradeChoice2"
            checked={radioValue === "4"}
            onChange={(el) => {
              setRadioValue(el.target.value);
              setError(false);
            }}
          />
          <label htmlFor="gradeChoice2">4</label>
        </div>
        <div className="modal-content-choice-item">
          <input
            className="modal-content-radio"
            type="radio"
            name="grade"
            value="3"
            id="gradeChoice3"
            checked={radioValue === "3"}
            onChange={(el) => {
              setRadioValue(el.target.value);
              setError(false);
            }}
          />
          <label htmlFor="gradeChoice3">3</label>
        </div>
        <div className="modal-content-choice-item">
          <input
            className="modal-content-radio"
            type="radio"
            name="grade"
            value="2"
            id="gradeChoice4"
            checked={radioValue === "2"}
            onChange={(el) => {
              setRadioValue(el.target.value);
              setError(false);
            }}
          />
          <label htmlFor="gradeChoice4">2</label>
        </div>
      </div>

      {error && <div className="modal-content-error">Оценка не выбрана!</div>}

      <button
        className="modal-submit-button"
        onClick={() => {
          saveGrade();
        }}
      >
        {modify ? "Сохранить изменения" : "Добавить оценку"}
      </button>
    </div>
  );
};

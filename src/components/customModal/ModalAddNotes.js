import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateDailyScheduleDayThunk } from "../../store/slices/dailySchedulesSlice";
import { openCloseModal } from "../../store/slices/contentSlice";
import moment from "moment/min/moment-with-locales.min";
import { findCurrentStudyYear } from "../../utils/services";

export const ModalAddNotes = ({ isOpen, onClose }) => {
  const [note, setNote] = useState("");
  const [error, setError] = useState(false);
  const modalData = useSelector((state) => state.content.openModal.modalData);
  const modify = useSelector((state) => state.content.openModal.modify);
  const userId = useSelector((state) => state.user.id);
  const dispatch = useDispatch();

  const toCloseAndRefreshData = () => {
    setNote("");
    setError(false);
    if (modify) {
      dispatch(openCloseModal({ notesModal: false, editDayModal: true }));
    } else {
      dispatch(openCloseModal({ notesModal: false }));
    }
  };

  const saveNote = () => {
    if (!note) {
      setError(true);
    } else {
      dispatch(
        updateDailyScheduleDayThunk({
          userId,
          data: { date: modalData.date, updateKey: "notes", updateValue: note },
          currentStudyYear: findCurrentStudyYear(moment(modalData.date)),
        })
      );
      toCloseAndRefreshData();
    }
  };
  useEffect(() => {
    if (modify) {
      setNote(modalData.note);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="modal-content">
      <h3>{modify ? "Изменить заметку" : "Добавить заметку"}</h3>

      <div className="modal-content__inputBox">
        <input
          className="modal-content-input"
          type="text"
          value={note}
          placeholder="Введите запись"
          onChange={(el) => {
            setNote(el.target.value);
            setError(false);
          }}
        />
      </div>

      {error && <div className="modal-content-error">Заметка пустая!</div>}

      <button
        className="modal-submit-button"
        onClick={() => {
          saveNote();
        }}
      >
        {modify ? "Сохранить изменения" : "Сохранить запись"}
      </button>
    </div>
  );
};

import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import TableDayDiary from "../tables/TableDayDiary";
import {
  openCloseModal,
  setModify,
  saveModalData,
} from "../../store/slices/contentSlice";
import { useDispatch } from "react-redux";

export const ModalModifyDay = () => {
  const { date } = useSelector((state) => state.content.openModal.modalData);
  const editDay = useSelector(
    (state) => state.dailySchedules.schedulesList[date]
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setModify(true));
  });

  return (
    <div className="modal-content">
      <h3>Внести изменения:</h3>
      <TableDayDiary day={editDay} modify={true} />
      <button
        className="modal-submit-button"
        onClick={() => {
          dispatch(openCloseModal({ editDayModal: false }));
          dispatch(setModify(false));
          dispatch(
            saveModalData({
              date: "",
              number: null,
            })
          );
        }}
      >
        Готово
      </button>
    </div>
  );
};

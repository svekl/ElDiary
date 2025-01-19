import add from "../../assets/icons/circle-plus.svg";
import edit from "../../assets/icons/edit-pen.svg";
import del from "../../assets/icons/delete.svg";
import moment from "moment/min/moment-with-locales.min";
import TableDayRow from "./TableDayRow";
import TableDayRowEdit from "./TableDayRowEdit";
import { useDispatch, useSelector } from "react-redux";
import { openCloseModal, saveModalData } from "../../store/slices/contentSlice";
import {
  updateDailyScheduleDayThunk,
  updateDailyScheduleLessonThunk,
} from "../../store/slices/dailySchedulesSlice";
import { findCurrentStudyYear } from "../../utils/services";
import { LESSONS } from "../../utils/constants";

const TableDayDiary = ({ day, modify }) => {
  const userId = useSelector((state) => state.user.id);
  const dispatch = useDispatch();
  const delNote = () => {
    dispatch(
      updateDailyScheduleDayThunk({
        userId,
        data: { date: day.date, updateKey: "notes", updateValue: null },
        currentStudyYear: findCurrentStudyYear(moment(day.date)),
      })
    );
  };
  const addNewLessonArea = () => {
    dispatch(
      updateDailyScheduleLessonThunk({
        userId,
        data: {
          date: day.date,
          number: Object.keys(day.lessonsList).length,
          updateKey: "lesson",
          updateValue: LESSONS.DAILY_LESSON_ITEM,
        },
        currentStudyYear: findCurrentStudyYear(moment(day.date)),
      })
    );
  };

  return (
    <div className="diary__day">
      <div className="diary__title-box">
        <h3 className="diary__title">
          {moment(day?.date).format("dddd, DD MMMM")}
        </h3>
        {!modify && (
          <img
            className="diary__icons"
            src={edit}
            alt="редактировать"
            onClick={() => {
              dispatch(openCloseModal({ editDayModal: true }));
              dispatch(saveModalData({ date: day.date, number: null }));
            }}
          />
        )}
      </div>

      <div className="diary__table">
        <div className="diary__cell table__cell-title"></div>
        <div className="diary__cell table__cell-title">Предмет</div>
        <div className="diary__cell table__cell-title">Домашнее задание</div>
        <div className="diary__cell table__cell-title">Оценка</div>
        {Object.keys(day.lessonsList)
          .sort()
          .map((key) => {
            return modify ? (
              <TableDayRowEdit
                currentNumber={+key}
                lessonItem={day.lessonsList[key]}
                key={key}
                sheduleDate={day.date}
              />
            ) : (
              <TableDayRow
                currentNumber={+key}
                lessonItem={day.lessonsList[key]}
                key={key}
                sheduleDate={day.date}
              />
            );
          })}

        <div className="diary__cell-long">
          <div className="diary__notes">Заметки: </div>

          {day?.notes ? (
            <div className="modal-content__edit-cell-notes">
              <p>{day.notes}</p>
              {modify && (
                <div className="modal-content__edit-cell-icons">
                  <img
                    className="diary__icons edit-icon"
                    src={edit}
                    alt="редактировать"
                    onClick={() => {
                      dispatch(
                        openCloseModal({
                          editDayModal: false,
                          notesModal: true,
                        })
                      );
                      dispatch(
                        saveModalData({
                          date: day.date,
                          number: null,
                          note: day.notes,
                        })
                      );
                    }}
                  />
                  <img
                    className="diary__icons"
                    src={del}
                    alt="удалить"
                    onClick={() => {
                      delNote();
                    }}
                  />
                </div>
              )}
            </div>
          ) : (
            <img
              className="diary__icons"
              src={add}
              alt="добавить"
              onClick={() => {
                dispatch(
                  openCloseModal({ notesModal: true, editDayModal: false })
                );
                dispatch(saveModalData({ date: day.date, number: null }));
              }}
            />
          )}
        </div>
      </div>
      {modify && (
        <div className="buttons-group">
          <button
            className="modal-submit-button modal-button"
            onClick={() => addNewLessonArea()}
          >
            Добавить еще урок
          </button>

          <button
            className="modal-submit-button modal-button"
            onClick={() => {
              dispatch(
                updateDailyScheduleDayThunk({
                  userId,
                  data: {
                    date: day.date,
                    updateKey: "holiday",
                    updateValue: !day.holiday,
                  },
                  currentStudyYear: findCurrentStudyYear(moment(day.date)),
                })
              );
            }}
          >
            {day.holiday ? "Отменить выходной" : "Не учимся!"}
          </button>

          <button
            className="modal-submit-button modal-button"
            onClick={() => {
              dispatch(
                updateDailyScheduleDayThunk({
                  userId,
                  data: {
                    date: day.date,
                    updateKey: "vacation",
                    updateValue: !day.vacation,
                  },
                  currentStudyYear: findCurrentStudyYear(moment(day.date)),
                })
              );
            }}
          >
            {day.vacation ? "Отменить каникулы" : "Каникулы!!!"}
          </button>
        </div>
      )}
    </div>
  );
};
export default TableDayDiary;

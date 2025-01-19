import { buildTask, findCurrentStudyYear } from "../../utils/services";
import { useSelector, useDispatch } from "react-redux";
import add from "../../assets/icons/circle-plus.svg";
import edit from "../../assets/icons/edit-pen.svg";
import del from "../../assets/icons/delete.svg";
import { openCloseModal, saveModalData } from "../../store/slices/contentSlice";
import { updateDailyScheduleLessonThunk } from "../../store/slices/dailySchedulesSlice";
import moment from "moment/min/moment-with-locales.min";
import { LESSONS } from "../../utils/constants";

const TableDayRowEdit = ({ currentNumber, lessonItem, sheduleDate }) => {
  const { lessons } = useSelector((state) => state.lessons);
  const homework = useSelector(
    (state) => state.homeworks.homeworksList[lessonItem.homework]
  );
  const userId = useSelector((state) => state.user.id);
  const dispatch = useDispatch();

  const delLesson = () => {
    dispatch(
      updateDailyScheduleLessonThunk({
        userId,
        data: {
          date: sheduleDate,
          number: currentNumber,
          updateKey: "lesson",
          updateValue: LESSONS.DAILY_LESSON_ITEM,
        },
        currentStudyYear: findCurrentStudyYear(moment(sheduleDate)),
      })
    );
  };

  const delHomeWork = () => {
    dispatch(
      updateDailyScheduleLessonThunk({
        userId,
        data: {
          date: sheduleDate,
          number: currentNumber,
          updateKey: "homework",
          updateValue: null,
        },
        currentStudyYear: findCurrentStudyYear(moment(sheduleDate)),
      })
    );
  };

  const delGrade = () => {
    dispatch(
      updateDailyScheduleLessonThunk({
        userId,
        data: {
          date: sheduleDate,
          number: currentNumber,
          updateKey: "grade",
          updateValue: null,
        },
        currentStudyYear: findCurrentStudyYear(moment(sheduleDate)),
      })
    );
  };

  return (
    <>
      <div className="diary__cell">{currentNumber + 1}.</div>
      <div className="diary__cell">
        {!lessonItem.lessonId ? (
          <img
            className="diary__icons"
            src={add}
            alt="добавить"
            onClick={() => {
              dispatch(
                openCloseModal({ lessonModal: true, editDayModal: false })
              );
              dispatch(
                saveModalData({ date: sheduleDate, number: currentNumber })
              );
            }}
          />
        ) : (
          <div className="modal-content__edit-cell">
            {lessons[lessonItem.lessonId]?.title}
            <div className="modal-content__edit-cell-icons">
              <img
                className="diary__icons edit-icon"
                src={edit}
                alt="изменить"
                onClick={() => {
                  dispatch(
                    openCloseModal({ lessonModal: true, editDayModal: false })
                  );

                  dispatch(
                    saveModalData({
                      date: sheduleDate,
                      number: currentNumber,
                      ...lessonItem,
                    })
                  );
                }}
              />
              <img
                className="diary__icons"
                src={del}
                alt="удалить"
                onClick={() => {
                  delLesson();
                }}
              />
            </div>
          </div>
        )}
      </div>
      <div className="diary__cell table__cell-task">
        {!lessonItem.lessonId ? (
          ""
        ) : !lessonItem.homework ? (
          <img
            className="diary__icons"
            src={add}
            alt="добавить"
            onClick={() => {
              dispatch(
                openCloseModal({ homeWorkModal: true, editDayModal: false })
              );
              dispatch(
                saveModalData({
                  date: sheduleDate,
                  number: currentNumber,
                  homework: [],
                })
              );
            }}
          />
        ) : (
          <div className="modal-content__edit-cell">
            {buildTask(homework.homework)}
            <div className="modal-content__edit-cell-icons">
              <img
                className="diary__icons edit-icon"
                src={edit}
                alt="изменить"
                onClick={() => {
                  dispatch(
                    openCloseModal({ homeWorkModal: true, editDayModal: false })
                  );

                  dispatch(
                    saveModalData({
                      date: sheduleDate,
                      number: currentNumber,
                      homework: homework.homework,
                    })
                  );
                }}
              />
              <img
                className="diary__icons"
                src={del}
                alt="удалить"
                onClick={() => {
                  delHomeWork();
                }}
              />
            </div>
          </div>
        )}
      </div>
      <div className="diary__cell">
        {!lessonItem.lessonId ? (
          ""
        ) : !lessonItem.grade ? (
          <img
            className="diary__icons"
            src={add}
            alt="добавить"
            onClick={() => {
              dispatch(
                openCloseModal({ gradeModal: true, editDayModal: false })
              );
              dispatch(
                saveModalData({
                  date: sheduleDate,
                  number: currentNumber,
                })
              );
            }}
          />
        ) : (
          <div className="modal-content__edit-cell">
            <div>{lessonItem.grade}</div>
            <div className="modal-content__edit-cell-icons">
              <img
                className="diary__icons edit-icon"
                src={edit}
                alt="изменить"
                onClick={() => {
                  dispatch(
                    openCloseModal({ gradeModal: true, editDayModal: false })
                  );
                  dispatch(
                    saveModalData({
                      date: sheduleDate,
                      number: currentNumber,
                      grade: lessonItem.grade,
                    })
                  );
                }}
              />
              <img
                className="diary__icons"
                src={del}
                alt="удалить"
                onClick={() => {
                  delGrade();
                }}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default TableDayRowEdit;

import { buildTask } from "../../utils/services";
import { useSelector, useDispatch } from "react-redux";
import add from "../../assets/icons/circle-plus.svg";
import { openCloseModal, saveModalData } from "../../store/slices/contentSlice";

const TableDayRow = ({ currentNumber, lessonItem, sheduleDate }) => {
  const { lessons } = useSelector((state) => state.lessons);
  const homework = useSelector(
    (state) => state.homeworks.homeworksList[lessonItem.homework]
  );
  const dispatch = useDispatch();

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
              dispatch(openCloseModal({ lessonModal: true }));
              dispatch(
                saveModalData({ date: sheduleDate, number: currentNumber })
              );
            }}
          />
        ) : (
          <p
            onClick={() => {
              dispatch(openCloseModal({ lessonInfoModal: true }));
              dispatch(
                saveModalData({
                  lesson: lessonItem,
                  title: lessons[lessonItem.lessonId]?.title,
                })
              );
            }}
          >
            {lessons[lessonItem.lessonId]?.title}
          </p>
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
              dispatch(openCloseModal({ homeWorkModal: true }));
              dispatch(
                saveModalData({ date: sheduleDate, number: currentNumber })
              );
            }}
          />
        ) : homework ? (
          buildTask(homework.homework)
        ) : (
          "Сохранение..."
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
              dispatch(openCloseModal({ gradeModal: true }));
              dispatch(
                saveModalData({ date: sheduleDate, number: currentNumber })
              );
            }}
          />
        ) : (
          <div>{lessonItem.grade}</div>
        )}
      </div>
    </>
  );
};

export default TableDayRow;

import { updateHomeworkThunk } from "../../store/slices/homeworksSlice";
import { buildTask, findCurrentStudyYear } from "../../utils/services";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import moment from "moment/min/moment-with-locales.min";

const TableHomeworkRow = ({ currentNumber, lessonItem }) => {
  const { lessons } = useSelector((state) => state.lessons);
  const homework = useSelector(
    (state) => state.homeworks.homeworksList[lessonItem.homework]
  );
  const userId = useSelector((state) => state.user.id);
  const currentStudyYear = findCurrentStudyYear(moment());
  const dispatch = useDispatch();

  const isAttenshion = () => {
    if (lessonItem.lessonId && homework && !homework.isDone)
      return "table__cell-attent";
    else {
      return "";
    }
  };

  return (
    <>
      <div className={`table__cell ${isAttenshion()}`}>
        {currentNumber + 1}.
      </div>
      <div className={`table__cell ${isAttenshion()}`}>
        {!lessonItem.lessonId
          ? "Урока нет"
          : lessons[lessonItem.lessonId]?.title}
      </div>
      <div className={`table__cell table__cell-task ${isAttenshion()}`}>
        {!lessonItem.lessonId
          ? ""
          : homework
          ? buildTask(homework.homework)
          : ""}
      </div>
      <div className={`table__cell ${isAttenshion()}`}>
        <input
          type="checkbox"
          checked={
            !lessonItem.lessonId ? false : homework ? homework.isDone : false
          }
          onChange={() => {
            dispatch(
              updateHomeworkThunk({
                userId,
                currentStudyYear,
                homework: { ...homework, isDone: !homework.isDone },
              })
            );
          }}
          disabled={!lessonItem.lessonId || !homework}
        />
      </div>
    </>
  );
};

export default TableHomeworkRow;

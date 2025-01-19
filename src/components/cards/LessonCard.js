import { useDispatch, useSelector } from "react-redux";
import {
  saveModalData,
  setModify,
  openCloseModal,
} from "../../store/slices/contentSlice";

const LessonCard = ({ lesson }) => {
  const teachers = useSelector((state) => state.teachers.teachersList);
  const { title, cabinets, lessonId } = lesson;
  const dispatch = useDispatch();
  const teachersForLesson = Object.values(teachers)
    .filter((teacher) => teacher.teachingLessons.includes(lessonId))
    .reduce((arr, teacher) => [...arr, teacher.id], []);

  return (
    <div className="card teachers__card">
      <div className="card__block">
        <h3 className="card__title">{title}</h3>
      </div>

      <div className="lessons__block">
        <h3 className="card__title lessons__title">Учителя:</h3>
        <ul>
          {teachersForLesson.length
            ? teachersForLesson.map((teacherId) => (
                <li key={teacherId}>{teachers[teacherId].name}</li>
              ))
            : "Учителей для этого урока не найдено"}
        </ul>
      </div>

      <div className="lessons__block">
        <h3 className="card__title lessons__title">Кабинет:</h3>
        <ul>
          {cabinets.length
            ? cabinets.join(", ")
            : "Кабинетов для этого урока не записано"}
        </ul>
      </div>

      <button
        className="modal-submit-button"
        onClick={() => {
          dispatch(saveModalData({ lesson }));
          dispatch(setModify(true));
          dispatch(openCloseModal({ lessonListModal: true }));
        }}
      >
        Изменить урок
      </button>
    </div>
  );
};

export default LessonCard;

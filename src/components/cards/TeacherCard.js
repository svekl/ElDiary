import { useDispatch, useSelector } from "react-redux";
import {
  saveModalData,
  setModify,
  openCloseModal,
} from "../../store/slices/contentSlice";

const TeacherCard = ({ teacher }) => {
  const { name, tel, birthdate, teachingLessons } = teacher;
  const lessons = useSelector((state) => state.lessons.lessons);
  const dispatch = useDispatch();

  return (
    <div className="card teachers__card">
      <div className="card__block">
        <h3 className="card__title">{name}</h3>
        <ul>
          {birthdate && <li>Дата рождения: {birthdate}</li>}
          {tel && <li>Телефон: {tel}</li>}
        </ul>
      </div>
      <div className="card__block">
        <h3 className="card__title card__title-lessons">Преподает:</h3>
        <ul>
          {teachingLessons.length
            ? teachingLessons.map((lessonId, ind) => (
                <li key={ind}>{lessons[lessonId].title}</li>
              ))
            : ""}
        </ul>
      </div>

      <button
        className="modal-submit-button"
        onClick={() => {
          dispatch(saveModalData({ teacher }));
          dispatch(setModify(true));
          dispatch(openCloseModal({ teacherModal: true }));
        }}
      >
        Изменить данные учителя
      </button>
    </div>
  );
};

export default TeacherCard;

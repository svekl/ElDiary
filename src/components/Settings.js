import MenuCardBox from "./cards/MenuCardBox";
import SettingDisplayHW from "./blocks/SettingDisplayHW";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { openCloseModal } from "../store/slices/contentSlice";
import { CustomModal } from "./customModal/CustomModal";

const Settings = () => {
  const titleCardId = 5;
  const dispatch = useDispatch();

  return (
    <main>
      <section className="title">
        <div className="container title-container">
          <h2>Настройки</h2>
        </div>
      </section>

      <section className="settings">
        <div className="container settings__box">
          <SettingDisplayHW />
          <div className="settings__item">
            <h3 className="settings__title">Расписание на учебный год</h3>
            <Link to="/scheduleCreate" className="modal-submit-button">
              Добавить на новый учебный год
            </Link>
            <Link
              to="/weekShedule"
              state="/settings"
              className="modal-submit-button"
            >
              Изменить текущее
            </Link>
          </div>
          <div className="settings__item">
            <h3 className="settings__title">Учителя</h3>
            <button
              className="modal-submit-button"
              onClick={() => {
                dispatch(openCloseModal({ teacherModal: true }));
              }}
            >
              Добавить нового учителя
            </button>
            <Link to="/teachers" className="modal-submit-button">
              Список учителей
            </Link>
          </div>
          <div className="settings__item">
            <h3 className="settings__title">Уроки</h3>
            <button
              className="modal-submit-button"
              onClick={() => {
                dispatch(openCloseModal({ lessonListModal: true }));
              }}
            >
              Добавить урок
            </button>
            <Link to="/lessons" className="modal-submit-button">
              Список уроков
            </Link>
          </div>
          <div className="settings__item">
            <h3 className="settings__title">Расписание звонков</h3>
            <button className="modal-submit-button">Добавить </button>
            <button className="modal-submit-button">Изменить </button>
          </div>
          <div className="settings__item">
            <h3 className="settings__title">Даты учебных четвертей</h3>
            <button
              className="modal-submit-button"
              onClick={() => {
                dispatch(openCloseModal({ quarterModal: true }));
              }}
            >
              Добавить
            </button>
            <Link to="/quarters" className="modal-submit-button">
              Просмотреть
            </Link>
          </div>
        </div>
        <CustomModal />
      </section>

      <MenuCardBox titleCardId={titleCardId} classMenu={"buttons"} />
    </main>
  );
};

export default Settings;

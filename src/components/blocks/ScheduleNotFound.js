import { Link } from "react-router-dom";

const ScheduleNotFound = () => {
  return (
    <div className="schedule__message">
      <h3>Расписание за выбранный период не найдено</h3>
      <Link to="/scheduleCreate" className="modal-submit-button">
        Создать расписание
      </Link>
    </div>
  );
};
export default ScheduleNotFound;

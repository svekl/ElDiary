import TableHomeworkRow from "./TableHomeworkRow";

const TableHomework = ({ displaySchedule, editIsDone }) => {
  return (
    <div className="table">
      <div className="table__cell table__cell-title"></div>
      <div className="table__cell table__cell-title">Предмет</div>
      <div className="table__cell table__cell-title">Домашнее задание</div>
      <div className="table__cell table__cell-title">Готово</div>
      {Object.keys(displaySchedule.lessonsList)
        .sort()
        .map((key) => (
          <TableHomeworkRow
            currentNumber={+key}
            lessonItem={displaySchedule.lessonsList[key]}
            key={key}
          />
        ))}
      <div className="table__cell table__notes">
        <span className="table__cell-notes">Заметки:</span>{" "}
        {displaySchedule?.notes}
      </div>
    </div>
  );
};
export default TableHomework;

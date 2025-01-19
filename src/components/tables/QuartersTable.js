import QuartersRow from "./QuartersRow";

const QuartersTable = ({ quarters }) => {
  return (
    <div className="quarters__table">
      <div className="quarters__cell table__cell-title">Четверть</div>
      <div className="quarters__cell table__cell-title">Начало</div>
      <div className="quarters__cell table__cell-title">Конец</div>

      {Object.keys(quarters)
        .sort()
        .map((key, ind) => (
          <QuartersRow key={key} quarterDate={quarters[key]} number={key} />
        ))}
    </div>
  );
};
export default QuartersTable;

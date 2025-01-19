import moment from "moment/min/moment-with-locales.min";

const QuartersRow = ({ quarterDate, number }) => {
  moment.locale("ru");
  return (
    <>
      <div className="quarters__cell">{number}.</div>
      <div className="quarters__cell">
        {quarterDate.start
          ? moment(quarterDate.start).format("DD MMMM YYYY")
          : "Дата не записана"}
      </div>
      <div className="quarters__cell">
        {quarterDate.end
          ? moment(quarterDate.end).format("DD MMMM YYYY")
          : "Дата не записана"}
      </div>
    </>
  );
};
export default QuartersRow;

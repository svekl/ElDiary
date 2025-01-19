import { useEffect, useState } from "react";
import moment from "moment/min/moment-with-locales.min";
import useEffectAfterMount from "../../utils/useEffectAfterMount";
import { CONTENT } from "../../utils/constants";

const QuartersInput = ({
  setQuarter,
  number,
  period,
  setError,
  edit,
  start,
  end,
}) => {
  const [quarterStart, setQuarterStart] = useState("");
  const [quarterEnd, setQuarterEnd] = useState("");
  const [errorStart, setErrorStart] = useState(null);
  const [errorEnd, setErrorEnd] = useState(null);
  const studyYearDateStart = moment(`${period}-08-31`);
  const studyYearDateEnd = moment(`${period + 1}-06-01`);

  const errorText = CONTENT.QUARTERS.ERR_DATES;
  const errorDateStart = CONTENT.QUARTERS.ERR_DATE_START;
  const errorDateEnd = CONTENT.QUARTERS.ERR_DATE_END;
  const errorPeriod = CONTENT.QUARTERS.ERR_DATE_PERIOD;

  const validDate = (dates) => {
    setError(null);
    setErrorStart(null);
    setErrorEnd(null);
    const dateMomentSt = moment(dates.start);
    const dateMomentE = moment(dates.end);
    if (
      !dateMomentSt.isBetween(studyYearDateStart, studyYearDateEnd) &&
      dates.start !== ""
    ) {
      setErrorStart(errorDateStart);
      setError(errorText);
    } else if (
      !dateMomentE.isBetween(studyYearDateStart, studyYearDateEnd) &&
      dates.end !== ""
    ) {
      setErrorEnd(errorDateEnd);
      setError(errorText);
    } else if (dateMomentE.isBefore(dateMomentSt) && dates.end !== "") {
      setErrorStart(errorPeriod);
      setError(errorText);
    } else {
      setQuarter(dates);
    }
  };
  useEffectAfterMount(() => {
    validDate({ start: quarterStart, end: quarterEnd });
  }, [period]);
  useEffect(() => {
    if (edit) {
      setQuarterStart(start);
      setQuarterEnd(end);
    }
  }, []);

  return (
    <div className="modal-content__dateBox">
      <label>{number} четверть</label>
      <input
        className={
          errorStart
            ? "modal-content-input invalid-date"
            : "modal-content-input"
        }
        type="date"
        min={`${period}-09-01`}
        max={`${period + 1}-06-01`}
        value={quarterStart}
        onChange={(ev) => {
          setQuarterStart(ev.target.value);
          validDate({ start: ev.target.value, end: quarterEnd });
        }}
      />

      <input
        className={
          errorEnd ? "modal-content-input invalid-date" : "modal-content-input"
        }
        type="date"
        min={`${period}-09-01`}
        max={`${period + 1}-06-01`}
        value={quarterEnd}
        onChange={(ev) => {
          setQuarterEnd(ev.target.value);
          validDate({ start: quarterStart, end: ev.target.value });
        }}
      />
      {errorStart && (
        <div style={{ gridColumn: "1 / -1", textAlign: "center" }}>
          {errorStart}
        </div>
      )}
      {errorEnd && (
        <div style={{ gridColumn: "1 / -1", textAlign: "center" }}>
          {errorEnd}
        </div>
      )}
    </div>
  );
};
export default QuartersInput;

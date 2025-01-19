import React, { useEffect, useState } from "react";
import {
  openCloseModal,
  saveModalData,
  setCreate,
  setEditMode,
} from "../../store/slices/contentSlice";
import { useSelector, useDispatch } from "react-redux";
import { CONTENT } from "../../utils/constants";
import QuartersInput from "../blocks/QuartersInput";
import { addQuartersThunk } from "../../store/slices/quartersSlice";
import { findCurrentStudyYear } from "../../utils/services";
import moment from "moment/min/moment-with-locales.min";
import SetPeriod from "../blocks/SetPeriod";
import { isCreateQuarterDB } from "../../db/quartersDb";

export const ModalQuarter = () => {
  const edit = useSelector((state) => state.content.openModal.editMode);
  const createMode = useSelector((state) => state.content.openModal.createMode);
  const tempPeriod = useSelector(
    (state) => state.content.openModal.modalData.date
  );
  const quarters = useSelector((state) => state.quarters.quartersList);
  const userId = useSelector((state) => state.user.id);
  const currentYear = findCurrentStudyYear(moment());
  const [period, setPeriod] = useState(currentYear);
  const [quarter1, setQuarter1] = useState({});
  const [quarter2, setQuarter2] = useState({});
  const [quarter3, setQuarter3] = useState({});
  const [quarter4, setQuarter4] = useState({});
  const arrQuarters = [setQuarter1, setQuarter2, setQuarter3, setQuarter4];
  const [checkAvail, setCheckAvail] = useState(null);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const errorText = CONTENT.QUARTERS.ERR_DATES;

  const changePeriod = (e) => {
    setPeriod(Number(e.target.value));
  };

  const toClose = () => {
    dispatch(openCloseModal({ quarterModal: false }));
    dispatch(setEditMode(false));
    dispatch(setCreate(false));
    dispatch(saveModalData({}));
  };

  const toRefreshData = () => {
    setError(null);
    arrQuarters.map((setQuarter) => setQuarter(null));
    dispatch(saveModalData({}));
  };

  const validQuarterDates = () => {
    if (
      moment(quarter2.start).isBefore(moment(quarter1.end)) ||
      moment(quarter3.start).isBefore(moment(quarter2.end)) ||
      moment(quarter4.start).isBefore(moment(quarter3.end))
    ) {
      setError(errorText);
      return false;
    }
    return true;
  };

  const addQuarter = () => {
    if (validQuarterDates()) {
      const data = {
        1: quarter1,
        2: quarter2,
        3: quarter3,
        4: quarter4,
      };
      dispatch(addQuartersThunk({ userId, currentYear: period, data }));
      toClose();
      toRefreshData();
    }
  };

  useEffect(() => {
    isCreateQuarterDB(userId, period).then((data) => setCheckAvail(data));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [period]);

  useEffect(() => {
    if (edit) {
      setQuarter1(quarters[1]);
      setQuarter2(quarters[2]);
      setQuarter3(quarters[3]);
      setQuarter4(quarters[4]);
    }
    if (createMode || edit) {
      setPeriod(tempPeriod);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="modal-content">
      <div className="modal-content-box modal-content-box-center">
        <h3>{edit ? "Изменить" : "Добавить"} четверти </h3>
        {edit && (
          <h3>
            {period} - {period + 1}{" "}
          </h3>
        )}
        {!edit && (
          <SetPeriod
            period={period}
            changePeriod={changePeriod}
            currentStudyYear={currentYear}
            className={"modal-content__period"}
          />
        )}
        {checkAvail && !edit ? (
          <div className="quarters__attent">
            Четверти для выбранного периода уже созданы!
          </div>
        ) : (
          arrQuarters.map((setQuarter, ind) => {
            return (
              <QuartersInput
                setQuarter={setQuarter}
                number={ind + 1}
                key={ind}
                period={period}
                setError={setError}
                edit={edit}
                start={edit ? quarters[ind + 1].start : ""}
                end={edit ? quarters[ind + 1].end : ""}
              />
            );
          })
        )}
      </div>

      <div className="modal-content-error">{error}</div>

      {(!checkAvail || edit) && (
        <button
          className="modal-submit-button"
          disabled={error}
          onClick={() => {
            addQuarter();
          }}
        >
          {edit ? "Сохранить изменения" : "Сохранить"}
        </button>
      )}
    </div>
  );
};

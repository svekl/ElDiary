import MenuCardBox from "./cards/MenuCardBox";
import PageTitle from "./blocks/PageTitle";
import ScheduleActions from "./blocks/ScheduleActions";

import moment from "moment/min/moment-with-locales.min";
import { findCurrentStudyYear } from "../utils/services";

import { useEffect, useState } from "react";

import { isCreateWeeklySheduleDB } from "../db/weeklyScheduleDb";
import { useDispatch, useSelector } from "react-redux";
import { getWeeklySchedule } from "../store/slices/weeklyScheduleSlice";
import { MENU_CARDS } from "../utils/constants";
import SetPeriod from "./blocks/SetPeriod";

const ScheduleCreate = () => {
  const titleCardId = MENU_CARDS.SCHEDULE_ID;
  const userId = useSelector((state) => state.user.id);
  const dispatch = useDispatch();
  const currentDate = moment();
  const currentStudyYear = findCurrentStudyYear(currentDate);

  const [period, setPeriod] = useState(currentStudyYear);
  const changePeriod = (e) => {
    setPeriod(Number(e.target.value));
  };
  const [checkAvail, setCheckAvail] = useState(null);

  useEffect(() => {
    isCreateWeeklySheduleDB(userId, period).then((data) => setCheckAvail(data));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [period]);
  useEffect(() => {
    return () => {
      // Для поддержания актуального недельного расписания в сторе
      dispatch(
        getWeeklySchedule({
          userId,
          currentYear: currentStudyYear,
        })
      );
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main>
      <PageTitle titleCardId={titleCardId} />
      <section className="schedule">
        <div className="container diary-container">
          <div className="schedule__header">
            <h2 className="diary__title">Создать новое учебное расписание</h2>
            <SetPeriod
              period={period}
              changePeriod={changePeriod}
              currentStudyYear={currentStudyYear}
              className={"schedule__setting"}
            />
            {checkAvail ? (
              <div className="schedule__attent">
                Расписание для выбранного периода создано!
              </div>
            ) : (
              <ScheduleActions period={period} setCheckAvail={setCheckAvail} />
            )}
          </div>
        </div>
      </section>

      <MenuCardBox titleCardId={titleCardId} classMenu={"buttons"} />
    </main>
  );
};

export default ScheduleCreate;

import { useEffect, useState } from "react";
import moment from "moment/min/moment-with-locales.min";
import TableHomework from "./tables/TableHomework";
import arrowLeft from "../assets/icons/arrow-left.svg";
import arrowRight from "../assets/icons/arrow-right.svg";
import { useSelector } from "react-redux";
import MenuCardBox from "./cards/MenuCardBox";
import PageTitle from "./blocks/PageTitle";
import Loading from "./blocks/Loading";
import { toChangeDate } from "../utils/services";
import { checkWeeklySchedule } from "../utils/services";
import { useDispatch } from "react-redux";
import { addDailySchedulesThunk } from "../store/slices/dailySchedulesSlice";
import { LESSONS, MENU_CARDS } from "../utils/constants";

function Homework() {
  moment.locale("ru");
  const currentDate = moment();
  const titleCardId = MENU_CARDS.HOMEWORK_ID;

  const selectDisplay = useSelector(
    (state) => state.settings.settings.displayHomeWork
  );
  const [displayDate, setDisplayDate] = useState(currentDate);

  const loadingWeeklySchedule = useSelector(
    (state) => state.weeklySchedule.loading
  );
  const loadingDailySchedules = useSelector(
    (state) => state.dailySchedules.loading
  );
  const loadingSettings = useSelector((state) => state.settings.loading);

  const userId = useSelector((state) => state.user.id);
  const weeklySchedule = useSelector(
    (state) => state.weeklySchedule.scheduleForWeek
  );
  const schedules = useSelector((state) => state.dailySchedules.schedulesList);
  const displaySchedule = useSelector(
    (state) =>
      state.dailySchedules.schedulesList[displayDate.format("YYYY-MM-DD")]
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (!loadingWeeklySchedule && !loadingDailySchedules) {
      checkWeeklySchedule(
        displayDate,
        schedules,
        weeklySchedule,
        dispatch,
        addDailySchedulesThunk,
        userId
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [displayDate, loadingWeeklySchedule, loadingDailySchedules]);

  useEffect(() => {
    setDisplayDate(currentDate.clone().add(selectDisplay, "days"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadingSettings]);

  return (
    <main>
      <PageTitle titleCardId={titleCardId} />
      <section className="homework">
        <div className="container homework-container">
          {loadingWeeklySchedule || loadingSettings || loadingDailySchedules ? (
            <Loading />
          ) : (
            <>
              <h3 className="homework__title">
                Домашнее задание на {displayDate.format("dddd")}
                {displayDate.format(" DD MMMM")}
              </h3>

              <div className="homework__area">
                <div className="homework__icons">
                  <img
                    className="icons"
                    src={arrowLeft}
                    alt="left"
                    onClick={() => {
                      toChangeDate(-1, setDisplayDate, 1, displayDate);
                    }}
                  />
                </div>
                <TableHomework
                  displaySchedule={
                    displaySchedule || {
                      lessonsList: { 0: LESSONS.DAILY_LESSON_ITEM },
                    }
                  }
                />
                <div className="homework__icons">
                  <img
                    className="icons"
                    src={arrowRight}
                    alt="right"
                    onClick={() => {
                      toChangeDate(1, setDisplayDate, 1, displayDate);
                    }}
                  />
                </div>
              </div>
            </>
          )}
        </div>
      </section>
      <MenuCardBox titleCardId={titleCardId} classMenu={"buttons"} />
    </main>
  );
}

export default Homework;

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

function Grades() {
  moment.locale("ru");
  const currentDate = moment();
  const titleCardId = MENU_CARDS.GRADES_ID;

  const loadingDailySchedules = useSelector(
    (state) => state.dailySchedules.loading
  );

  const schedules = useSelector((state) => state.dailySchedules.schedulesList);

  return (
    <main>
      <PageTitle titleCardId={titleCardId} />
      <section className="homework">
        <div className="container homework-container">
          {loadingDailySchedules ? (
            <Loading />
          ) : (
            <>
              <h3 className="homework__title">Оценки</h3>

              <div className="homework__area"></div>
            </>
          )}
        </div>
      </section>
      <MenuCardBox titleCardId={titleCardId} classMenu={"buttons"} />
    </main>
  );
}

export default Grades;

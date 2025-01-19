import MenuCardBox from "./cards/MenuCardBox";
import PageTitle from "./blocks/PageTitle";
import ScheduleView from "./blocks/ScheduleView";
import ScheduleActions from "./blocks/ScheduleActions";
import { useSelector } from "react-redux";
import moment from "moment/min/moment-with-locales.min";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  addWeeklySchedule,
  getWeeklySchedule,
} from "../store/slices/weeklyScheduleSlice";
import Loading from "./blocks/Loading";
import useEffectAfterMount from "../utils/useEffectAfterMount";
import { MENU_CARDS } from "../utils/constants";
import { findCurrentStudyYear } from "../utils/services";
import StudyYear from "./blocks/StudyYear";

const Schedule = () => {
  const titleCardId = MENU_CARDS.SCHEDULE_ID;
  const location = useLocation();
  const currentDate = moment();
  const [currentStudyYear, setCurrentYear] = useState(
    findCurrentStudyYear(currentDate)
  );
  const loadingWeeklySchedule = useSelector(
    (state) => state.weeklySchedule.loading
  );
  const userId = useSelector((state) => state.user.id);
  const schedule = useSelector((state) => state.weeklySchedule.scheduleForWeek);
  const isCreate = Object.keys(schedule).length > 0 ? true : false;
  const [editSchedule, setEditSchedule] = useState(false);
  const dispatch = useDispatch();
  const buttonText = "расписание";

  useEffect(() => {
    if (location.state === "/settings") {
      setEditSchedule(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    return () => {
      // Для поддержания актуального недельного расписания в сторе
      dispatch(
        getWeeklySchedule({
          userId,
          currentYear: findCurrentStudyYear(currentDate),
        })
      );
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffectAfterMount(() => {
    dispatch(
      addWeeklySchedule({ loading: true, error: null, scheduleForWeek: {} })
    );
    dispatch(
      getWeeklySchedule({
        userId,
        currentYear: currentStudyYear,
      })
    );
  }, [currentStudyYear]);

  return (
    <main>
      <PageTitle titleCardId={titleCardId} />
      <section className="schedule">
        <div className="container diary-container">
          <StudyYear
            currentStudyYear={currentStudyYear}
            setCurrentYear={setCurrentYear}
            edit={editSchedule}
            setEdit={setEditSchedule}
            isCreate={isCreate}
            text={buttonText}
          />

          {loadingWeeklySchedule ? (
            <Loading />
          ) : editSchedule ? (
            <ScheduleActions
              scheduleForEdit={schedule.schedule}
              period={currentStudyYear}
              setEditSchedule={setEditSchedule}
              editSchedule={editSchedule}
            />
          ) : (
            <ScheduleView schedule={schedule} isCreate={isCreate} />
          )}
        </div>
      </section>

      <MenuCardBox titleCardId={titleCardId} classMenu={"buttons"} />
    </main>
  );
};

export default Schedule;

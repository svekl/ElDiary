import { useEffect, useState } from "react";
import moment from "moment/min/moment-with-locales.min";
import { useDispatch, useSelector } from "react-redux";
import MenuCardBox from "./cards/MenuCardBox";
import PageTitle from "./blocks/PageTitle";
import Loading from "./blocks/Loading";
import { findCurrentStudyYear } from "../utils/services";
import { MENU_CARDS } from "../utils/constants";
import StudyYear from "./blocks/StudyYear";
import QuartersTable from "./tables/QuartersTable";
import { CustomModal } from "./customModal/CustomModal";
import {
  openCloseModal,
  saveModalData,
  setCreate,
  setEditMode,
} from "../store/slices/contentSlice";
import { getQuartersThunk } from "../store/slices/quartersSlice";
import useEffectAfterMount from "../utils/useEffectAfterMount";

function Quarters() {
  const [currentStudyYear, setCurrentYear] = useState(
    findCurrentStudyYear(moment())
  );
  const titleCardId = MENU_CARDS.GRADES_ID;
  const loadingQuaterts = useSelector((state) => state.quarters.loading);
  const quarters = useSelector((state) => state.quarters.quartersList);
  const isCreate = Object.keys(quarters).length > 0;
  const editQuarters = useSelector((state) => state.content.openModal.editMode);
  const userId = useSelector((state) => state.user.id);

  // const [editQuarters, setEditQuarters] = useState(false);
  const dispatch = useDispatch();
  const buttonText = "четверти";
  const setEditQuarters = (bool) => dispatch(setEditMode(bool));

  useEffect(() => {
    if (editQuarters) {
      dispatch(openCloseModal({ quarterModal: true }));
      // dispatch(setEditMode(true));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editQuarters]);
  useEffectAfterMount(() => {
    dispatch(getQuartersThunk({ userId, currentYear: currentStudyYear }));
  }, [currentStudyYear]);

  // Для поддержиная актуальности четвертей в сторе:
  useEffect(() => {
    return () => {
      dispatch(
        getQuartersThunk({
          userId,
          currentYear: findCurrentStudyYear(moment()),
        })
      );
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main>
      <PageTitle titleCardId={titleCardId} />
      <section className="quarters">
        <div className="container homework-container">
          {loadingQuaterts ? (
            <Loading />
          ) : (
            <>
              <StudyYear
                currentStudyYear={currentStudyYear}
                setCurrentYear={setCurrentYear}
                edit={editQuarters}
                setEdit={setEditQuarters}
                isCreate={isCreate}
                text={buttonText}
              />

              <div className="homework__area">
                {isCreate ? (
                  <QuartersTable quarters={quarters} />
                ) : (
                  <div className="schedule__message">
                    <h3>На выбранный учебный год четверти не добавлены</h3>
                    <button
                      className="modal-submit-button"
                      onClick={() => {
                        dispatch(openCloseModal({ quarterModal: true }));
                        dispatch(saveModalData({ date: currentStudyYear }));
                        dispatch(setCreate(true));
                      }}
                    >
                      Добавить
                    </button>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
        <CustomModal />
      </section>
      <MenuCardBox titleCardId={titleCardId} classMenu={"buttons"} />
    </main>
  );
}

export default Quarters;

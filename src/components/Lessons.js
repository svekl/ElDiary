import { useDispatch, useSelector } from "react-redux";
import { openCloseModal } from "../store/slices/contentSlice";
import MenuCardBox from "./cards/MenuCardBox";
import LessonCard from "./cards/LessonCard";
import { CustomModal } from "./customModal/CustomModal";
import Loading from "./blocks/Loading";

function Lessons() {
  const titleCardId = 5;
  const lessonsList = useSelector((state) => state.lessons.lessons);
  const loadingLessons = useSelector((state) => state.lessons.loading);
  const dispatch = useDispatch();

  return (
    <main>
      <section className="title">
        <div className="container title-container">
          <h2>Уроки</h2>
        </div>
      </section>

      <section className="teachers">
        <div className="container teachers__container">
          {loadingLessons ? (
            <Loading />
          ) : (
            <>
              <div className="teachers__area">
                {Object.values(lessonsList).map((lesson, ind) => (
                  <LessonCard lesson={lesson} key={ind} />
                ))}
              </div>
              <button
                className="modal-submit-button"
                onClick={() => {
                  dispatch(openCloseModal({ lessonListModal: true }));
                }}
              >
                Добавить новый урок
              </button>
            </>
          )}
        </div>
        <CustomModal />
      </section>

      <MenuCardBox titleCardId={titleCardId} classMenu={"buttons"} />
    </main>
  );
}

export default Lessons;

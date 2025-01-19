import { useDispatch, useSelector } from "react-redux";
import { openCloseModal } from "../store/slices/contentSlice";
import MenuCardBox from "./cards/MenuCardBox";
import PageTitle from "./blocks/PageTitle";
import TeacherCard from "./cards/TeacherCard";
import { CustomModal } from "./customModal/CustomModal";
import Loading from "./blocks/Loading";
import { MENU_CARDS } from "../utils/constants";

function Teachers() {
  const titleCardId = MENU_CARDS.TEACHERS_ID;

  const teachersList = useSelector((state) => state.teachers.teachersList);
  const loadingTeachers = useSelector((state) => state.teachers.loading);
  const dispatch = useDispatch();

  return (
    <main>
      <PageTitle titleCardId={titleCardId} />

      <section className="teachers">
        <div className="container teachers__container">
          {loadingTeachers ? (
            <Loading />
          ) : (
            <>
              <div className="teachers__area">
                {Object.values(teachersList).map((teacher) => (
                  <TeacherCard teacher={teacher} key={teacher.id} />
                ))}
              </div>
              <button
                className="modal-submit-button"
                onClick={() => {
                  dispatch(openCloseModal({ teacherModal: true }));
                }}
              >
                Добавить нового учителя
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

export default Teachers;

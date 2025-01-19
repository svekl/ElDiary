import { createSlice } from "@reduxjs/toolkit";
import { MENU_CARDS } from "../../utils/constants";

const contentSlice = createSlice({
  name: "content",
  initialState: {
    menuButtons: [
      {
        id: MENU_CARDS.HOMEWORK_ID,
        icon: {
          path: require("../../assets/icons/ic-homework.svg").default,
          alt: "домашка",
        },
        title: "Домашняя работа",
        text: "Здесь ты увидишь свою домашку и сможешь отметить то, что уже выполнено",
        link: "/",
      },
      {
        id: MENU_CARDS.DIARY_ID,
        icon: {
          path: require("../../assets/icons/ic-book.svg").default,
          alt: "дневник",
        },
        title: "Дневник",
        text: "Здесь ты можешь просмотреть дневник, записать в него домашнее задание и поставить свои оценки",
        link: "/diary",
      },
      {
        id: MENU_CARDS.SCHEDULE_ID,
        icon: {
          path: require("../../assets/icons/ic-dino.svg").default,
          alt: "расписание",
        },
        title: "Расписание уроков",
        text: "Здесь твое расписание на неделю",
        link: "/weekShedule",
      },
      {
        id: MENU_CARDS.GRADES_ID,
        icon: {
          path: require("../../assets/icons/grade.svg").default,
          alt: "оценки",
        },
        title: "Итоговые оценки",
        text: "Если ты выставляешь в свой дневник оценки, то тут найдешь свои оценки, которые могут получиться в четверти",
        link: "/grades",
      },
      {
        id: MENU_CARDS.TEACHERS_ID,
        icon: {
          path: require("../../assets/icons/ic-tech.svg").default,
          alt: "учителя",
        },
        title: "Учителя",
        text: "Здесь ты можешь просмотреть и записать информацию о твоих учителях",
        link: "/teachers",
      },
      {
        id: MENU_CARDS.RINGS_ID,

        icon: {
          path: require("../../assets/icons/ic-hands.svg").default,
          alt: "расписание звонков",
        },
        title: "Расписание звонков",
        text: "Здесь отображается расписание твоих звонков",
        link: "/rings",
      },

      {
        id: MENU_CARDS.NOTES_ID,
        icon: {
          path: require("../../assets/icons/ic-pencil.svg").default,
          alt: "блокнот",
        },
        title: "Блокнот",
        text: "Здесь ты можешь хранить свои записи",
        link: "/note",
      },
    ],
    openModal: {
      modalList: {
        lessonModal: false,
        homeWorkModal: false,
        gradeModal: false,
        notesModal: false,
        editDayModal: false,
        teacherModal: false,
        lessonListModal: false,
        lessonInfoModal: false,
        quarterModal: false,
      },
      modalData: {
        date: "",
        number: null,
      },
      modify: false,
      createMode: false,
      editMode: false,
    },
  },
  reducers: {
    addMenuButton: (state, action) => {
      state.push(action.payload);
    },
    openCloseModal: (state, action) => {
      Object.assign(state.openModal.modalList, action.payload);
    },
    saveModalData: (state, action) => {
      return {
        ...state,
        openModal: { ...state.openModal, modalData: action.payload },
      };
    },
    editModalData: (state, action) => {
      return {
        ...state,
        openModal: {
          ...state.openModal,
          modalData: { ...state.openModal.modalData, ...action.payload },
        },
      };
    },
    setModify: (state, action) => {
      return {
        ...state,
        openModal: { ...state.openModal, modify: action.payload },
      };
    },
    setCreate: (state, action) => {
      return {
        ...state,
        openModal: { ...state.openModal, createMode: action.payload },
      };
    },
    setEditMode: (state, action) => {
      return {
        ...state,
        openModal: { ...state.openModal, editMode: action.payload },
      };
    },
  },
  //   редьюсеры для thunk функций
  //   extraReducers: (builder) => {
  //     builder.addCase(createUserThunk.fulfilled, (state, action) => {
  //       return (state = action.payload);
  //     });
  //     builder.addCase(loginThunk.fulfilled, (state, action) => {
  //       return (state = action.payload);
  //     });
  //   },
});
export const {
  addMenuButton,
  openCloseModal,
  saveModalData,
  editModalData,
  setModify,
  setCreate,
  setEditMode,
} = contentSlice.actions;
export const contentReducer = contentSlice.reducer;

import { useDispatch, useSelector } from "react-redux";
import { updateSettingsThunk } from "../../store/slices/settingSlice";
import { SETTINGS } from "../../utils/constants";

const SettingDisplayHW = () => {
  const currentHW = SETTINGS.CURRENT_HOMEWORK;
  const nextHW = SETTINGS.NEXT_HOMEWORK;
  const userSelect = useSelector(
    (state) => state.settings.settings.displayHomeWork
  );
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.user.id);

  const changeDisplayHW = (el) => {
    const data = { displayHomeWork: Number(el.target.value) };
    dispatch(updateSettingsThunk({ userId, data }));
  };

  return (
    <div className="settings__item">
      <h3 className="settings__title">Отображать домашнее задание:</h3>
      <div>
        <input
          type="radio"
          id="currentHW"
          name="homework"
          value={currentHW}
          checked={Number(currentHW) === userSelect}
          onChange={(el) => {
            changeDisplayHW(el);
          }}
        />
        <label htmlFor="currentHW">На текущий день</label>
      </div>
      <div>
        <input
          type="radio"
          id="nextHW"
          name="homework"
          value={nextHW}
          checked={Number(nextHW) === userSelect}
          onChange={(el) => {
            changeDisplayHW(el);
          }}
        />
        <label htmlFor="nextHW">На завтрашний день</label>
      </div>
    </div>
  );
};

export default SettingDisplayHW;

import { Link } from "react-router-dom";
const MenuCard = ({ card, menuMode, setMenuMode }) => {
  const { title, text, icon, link } = card;

  const closeMenu = () => {
    if (menuMode) setMenuMode(false);
  };
  return (
    <Link
      to={link}
      className={menuMode ? "card-menu card" : "card"}
      onClick={() => {
        closeMenu();
      }}
    >
      <div className={menuMode ? "card-menu__pic" : "card__pic"}>
        <img className="card__img" src={icon.path} alt={icon.alt} />
      </div>
      <div className="card__title">{title}</div>
      <div className="card__about">{text}</div>
    </Link>
  );
};

export default MenuCard;

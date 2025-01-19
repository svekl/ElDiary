import { useSelector } from "react-redux";

const PageTitle = ({ titleCardId }) => {
  const titleCard = useSelector((state) =>
    state.content.menuButtons.find((el) => el.id === titleCardId)
  );

  return (
    <section className="title">
      <div className="container title-container">
        <div className="card card-title card-title-icon">
          <img
            className="card__img"
            src={titleCard.icon.path}
            alt={titleCard.icon.alt}
          />
        </div>
        <h2>{titleCard.title}</h2>
      </div>
    </section>
  );
};
export default PageTitle;

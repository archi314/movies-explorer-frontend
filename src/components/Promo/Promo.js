import "./Promo.css";
import promoLogo from "../../images/globus_logo.png";
import NavTab from "../NavTab/NavTab";

function Promo() {
  return (
    <section className="promo">
      <div className="promo__container">
        <div>
          <h1 className="promo__title">
            Учебный проект студента факультета Веб&nbsp;-&nbsp;разработки.
          </h1>
          <p className="promo__subtitle">
            Листайте ниже, чтобы узнать больше про этот проект и его создателя.
          </p>
          <NavTab />
        </div>
        <img className="promo__logo" src={promoLogo} alt="лого-глобус" />
      </div>
    </section>
  );
}

export default Promo;

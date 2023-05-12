import "./NavTab.css";
import { Link } from "react-scroll";

function NavTab() {
  return (
    <p className="nav-tab__link">
      <Link to="about-project" className="nav-tab__phrase">
        Узнать больше
      </Link>
    </p>
  );
}

export default NavTab;

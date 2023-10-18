import { useState } from "react";
import { NavLink, Link } from "react-router-dom";

import hamburger from "../../assets/icons/hamburger.png";
import logo from "../../assets/icons/logo.png";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPersonWalkingArrowRight } from "@fortawesome/free-solid-svg-icons"

const Navbar = (props) => {
  const [showNavbar, setShowNavbar] = useState(false);

  const handleShowNavbar = () => {
    setShowNavbar(!showNavbar);
  };

  return (
    <nav className="navbar">
      <div className="containerNavBar">
        <div>
          <NavLink to="/dash">
          <img className="logo"
            src={logo}
            alt="AFM"
          />
          </NavLink>
        </div>
        <div onClick={handleShowNavbar}>
          <img src={hamburger} className="menu-icon" alt="fireSpot" />
        </div>
        
        <div className={`nav-elements  ${showNavbar && "active"}`}>
          <ul>
          <li>
          <Link to="/dash/applications"><h1>My Applications</h1></Link>
            </li>
            <li>
            <Link to="/dash/applications/new"><h1>Create Application</h1></Link>
            </li>
            <li>
            <button
            className="icon-button-logout"
            title="Logout"
            onClick={props.onSelectLogout}
            >
              <FontAwesomeIcon icon={faPersonWalkingArrowRight} size="xs" />
          </button>
            </li>
          </ul>
          
        </div>
        
      </div>
      
    </nav>
  );
};

export default Navbar;

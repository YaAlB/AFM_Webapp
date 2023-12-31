import { useState } from "react";
import { Link } from "react-router-dom";
import hamburger from "../../assets/icons/hamburger.png";
import logo from "../../assets/icons/logo.png";

const Navbar = () => {
  const [showNavbar, setShowNavbar] = useState(false);

  const handleShowNavbar = () => {
    setShowNavbar(!showNavbar);
  };

  return (
    <nav className="navbar">
      <div className="containerNavBar">
        <div>
          <Link to="/">
          <img className="logo"
            src={logo}
            alt="AFM"
          />
          </Link>
        </div>
        <div onClick={handleShowNavbar}>
          <img src={hamburger} className="menu-icon" alt="fireSpot" />
        </div>
        
        <div className={`nav-elements  ${showNavbar && "active"}`}>
          <ul>
            <li>
              <Link to="/aboutus"><h1>Why AFM</h1></Link>
            </li>
            <li>
              <Link to="/services"><h2>Services</h2></Link>
            </li>
            <li>
            <Link className="button-signin button-margin" to="/auth/login">Sign In</Link>
            <Link className="button-signup button-margin" to="/auth/signup">Sign Up</Link>
            </li>
            
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;



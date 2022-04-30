import React from "react";
import { Link } from "react-router-dom";
import logo from "../logo.png";

const Navbar = () => {
  return (
    <nav>
      <div className='nav-center'>
        <Link to={"/"}>
          <img src={logo} alt='Logo' className='nav-logo' />
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;

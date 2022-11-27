import { ReactComponent as WhiteLogo } from "../assets/images/cognira-logo-white.svg";
import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <div>
      <Link to="/">
        <WhiteLogo
          style={{
            width: "50px ",
            marginLeft: "120px ",
            marginTop: "30px ",
          }}
        />
      </Link>
    </div>
  );
}

export default Header;

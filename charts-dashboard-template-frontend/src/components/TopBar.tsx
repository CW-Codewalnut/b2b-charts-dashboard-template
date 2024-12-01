import React from "react";
import logoSrc from "../assets/codewalnut_logo.svg";
import "./TopBar.css";

interface TopBarProps {
  onClick: () => void;
}

const TopBar: React.FC<TopBarProps> = ({ onClick }) => {
  return (
    <div className="top-bar">
      <img src={logoSrc} alt="Logo" className="logo" />
      <button className="doc-button" onClick={onClick}>
        {"View Documentation/Blog"}
      </button>
    </div>
  );
};

export default TopBar;

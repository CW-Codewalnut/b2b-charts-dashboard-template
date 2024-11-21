import React from "react";
import logoSrc from "../assets/codewalnut_logo.svg";
import "./TopBar.css";

interface TopBarProps {
  onToggleView: () => void;
  showDocumentation: boolean;
}

const TopBar: React.FC<TopBarProps> = ({ onToggleView, showDocumentation }) => {
  return (
    <div className="top-bar">
      <img src={logoSrc} alt="Logo" className="logo" />
      <button className="doc-button" onClick={onToggleView}>
        {showDocumentation ? "View Charts" : "View Documentation"}
      </button>
    </div>
  );
};

export default TopBar;

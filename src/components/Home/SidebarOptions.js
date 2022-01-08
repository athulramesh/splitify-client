import React from "react";
import "../../styles/Home/SidebarOptions.css";

function SidebarOptions({ title, Icon }) {
  return (
    <div className="sidebarOption">
      {Icon && <Icon className="sidebarOptions__icon" />}
      {Icon ? <h3>{title}</h3> : <p>{title}</p>}
    </div>
  );
}

export default SidebarOptions;

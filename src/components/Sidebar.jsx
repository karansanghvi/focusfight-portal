import React from "react";
import "../assets/style.css";

const Sidebar = ({ collapsed, onSectionChange }) => {
  return (
    <aside className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
      <h2>FocusFight</h2>
      <nav>
        <ul>
          <li onClick={() => onSectionChange("home")}>Home</li>
          <li onClick={() => onSectionChange("users")}>Users</li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;

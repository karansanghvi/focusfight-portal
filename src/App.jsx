import React, { useState } from "react"
import "./assets/style.css";
import Sidebar from "./components/Sidebar";
import Users from "./components/Users";

function App() {
 
  const [collapsed, setCollapsed] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
 
  return (
    <>
     <div className="app">
      <Sidebar collapsed={collapsed} onSectionChange={setActiveSection} />
      <main className="main-content">
        <button className="toggle-btn" onClick={() => setCollapsed(!collapsed)}>
          {collapsed ? '☰' : '✖'}
        </button>

        {/* Main Content */}
        {activeSection === "home" && (
          <div id="home">
            <h1>Welcome To FocusFight</h1>
            <p>This is the content are beside the sidebar</p>
          </div>
        )}

        {activeSection === "users" && (
          <Users/>
        )}
      </main>
     </div>
    </>
  )
}

export default App

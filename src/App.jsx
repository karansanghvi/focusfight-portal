import React, { useState } from "react"
import "./assets/style.css";
import Sidebar from "./components/Sidebar";

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
          <div id="users">
            <h1>Users</h1>
            <hr/>

            <div className="btn-container">
              <button className="primaryBtn" type="submit">Download Sheet</button>
            </div>

            <table className="user-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Email Address</th>
                  <th>Phone Number</th>
                  <th>Password</th>
                  <th>Remember Me</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>user@example.com</td>
                  <td>1234567890</td>
                  <td>********</td>
                  <td>
                    <input type="checkbox" checked readOnly />
                  </td>
                  <td>
                    <button className="action-btn">Edit</button>
                    <button className="action-btn delete">Delete</button>
                  </td>
                </tr>
                {/* Add more rows dynamically if needed */}
              </tbody>
            </table>            
          </div>
        )}
      </main>
     </div>
    </>
  )
}

export default App

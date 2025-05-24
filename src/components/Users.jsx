import React, { useEffect, useState } from 'react'
import axios from 'axios'

const USERS_PER_PAGE = 20

function Users() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    console.log("Fetching users from the API")
    axios.get('http://localhost:5000/api/users')
      .then(res => {
        console.log("Users fetched successfully:", res.data);
        setUsers(res.data)
        setLoading(false)
      })
      .catch(err => {
        console.error('Failed to fetch users', err)
        setLoading(false)   
      })
  }, [])

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      axios.delete(`http://localhost:5000/api/users/${id}`)
        .then(res => {
          alert(res.data.message)
          // Remove deleted user from the state to update UI
          setUsers(users.filter(user => user.id !== id))
        })
        .catch(err => {
          console.error('Failed to delete user', err)
          alert('Failed to delete user. Please try again.')
        })
    }
  }

  // Calculate total pages
  const totalPages = Math.ceil(users.length / USERS_PER_PAGE)

  // Get users for current page
  const startIndex = (currentPage - 1) * USERS_PER_PAGE
  const currentUsers = users.slice(startIndex, startIndex + USERS_PER_PAGE)

  // Handlers for pagination
  const handlePrevPage = () => {
    setCurrentPage((page) => Math.max(page - 1, 1))
  }

  const handleNextPage = () => {
    setCurrentPage((page) => Math.min(page + 1, totalPages))
  }

  return (
    <div id="users" style={{ maxWidth: '100%'}}>
      <h1>Users</h1>
      <hr style={{ marginBottom: "20px" }} />

      {/* <div className="btn-container" style={{ marginBottom: 12 }}>
        <button className="primaryBtn" type="submit">Download Sheet</button>
      </div> */}

      {loading ? (
        <p>Loading users...</p>
      ) : (
        <>
          <div style={{
            maxHeight: '400px', // fixed height for scrollbar
            overflowY: 'auto',
            border: '1px solid #ccc',
            borderRadius: 8,
          }}>
            <table className="user-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Email Address</th>
                  <th>Phone Number</th>
                  <th>Password</th>
                  <th>Created At</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {currentUsers.map((user, index) => (
                  <tr key={user.id || index} style={{ borderBottom: '1px solid #eee' }}>
                    <td>{user.id}</td>
                    <td>{user.email}</td>
                    <td>{user.phone}</td>
                    <td>{'*'.repeat(8)}</td>
                    <td>{new Date(user.created_at).toLocaleString()}</td>
                    <td>
                      <button 
                        className="action-btn delete"
                        onClick={() => handleDelete(user.id)}
                        >Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination controls */}
          {totalPages > 1 && (
            <div
              style={{
                marginTop: 12,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: 8,
                userSelect: 'none',
              }}
            >
              <button onClick={handlePrevPage} disabled={currentPage === 1}>
                Prev
              </button>
              <span>
                Page {currentPage} of {totalPages}
              </span>
              <button onClick={handleNextPage} disabled={currentPage === totalPages}>
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default Users

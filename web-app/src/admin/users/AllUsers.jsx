import { useEffect, useState } from "react"
import { fetchUsers, updateRoles, toggleBlock } from "../services/adminUser.service"

export default function AllUsers() {
  const [users, setUsers] = useState([])

  const load = async () => {
    const data = await fetchUsers()
    setUsers(data)
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      load()
    }, 0);
    return () => clearTimeout(timer);
  }, [])

  const toggleRole = async (user, role) => {
    await updateRoles(user._id, {
      ...user.roles,
      [role]: !user.roles[role],
    })
    load()
  }

  return (
    <div>
      <h1>All Users</h1>

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Email</th>
            <th>Roles</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {users.map((u) => (
            <tr key={u._id}>
              <td>{u.email}</td>

              <td>
                {Object.keys(u.roles).map((r) =>
                  u.roles[r] ? <span key={r}>{r} </span> : null
                )}
              </td>

              <td>{u.isBlocked ? "Blocked" : "Active"}</td>

              <td>
                <button onClick={() => toggleRole(u, "mentor")}>
                  Toggle Mentor
                </button>{" "}
                <button onClick={() => toggleRole(u, "admin")}>
                  Toggle Admin
                </button>{" "}
                <button onClick={() => toggleBlock(u._id)}>
                  {u.isBlocked ? "Unblock" : "Block"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

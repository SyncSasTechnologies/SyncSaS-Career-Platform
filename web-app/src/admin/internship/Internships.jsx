import { useEffect, useState } from "react"
import {
  fetchInternships,
  approveInternship,
  rejectInternship,
  archiveInternship,
} from "../services/adminInternship.service"

export default function AdminInternships() {
  const [internships, setInternships] = useState([])

  const load = async () => {
    const data = await fetchInternships()
    setInternships(data || [])
  }

  useEffect(() => {
    load()
  }, [])

  const action = async (fn, id) => {
    await fn(id)
    load()
  }

  const actionWithRemarks = async (fn, id) => {
    const remarks = prompt("Admin remarks (optional)")
    await fn(id, remarks)
    load()
  }

  const statusColor = {
    draft: "gray",
    submitted: "orange",
    approved: "green",
    rejected: "red",
    archived: "black",
  }

  return (
    <div>
      <h1>Internships (Admin)</h1>

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Title</th>
            <th>Mentor UID</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {internships.map((i) => (
            <tr key={i._id}>
              <td>{i.title}</td>
              <td>{i.mentorUid || "—"}</td>

              <td style={{ color: statusColor[i.status] }}>
                {i.status}
              </td>

              <td>
                {i.status === "submitted" && (
                  <>
                    <button
                      onClick={() =>
                        actionWithRemarks(approveInternship, i._id)
                      }
                    >
                      Approve
                    </button>{" "}
                    <button
                      onClick={() =>
                        actionWithRemarks(rejectInternship, i._id)
                      }
                    >
                      Reject
                    </button>
                  </>
                )}

                {i.status === "approved" && (
                  <button
                    onClick={() => action(archiveInternship, i._id)}
                  >
                    Archive
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

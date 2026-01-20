import { useEffect, useState } from "react"
import {
  fetchEnrollments,
  issueCertificate,
} from "../services/adminEnrollment.service"

export default function AdminEnrollments() {
  const [enrollments, setEnrollments] = useState([])

  useEffect(() => {
    const load = async () => {
      setEnrollments(await fetchEnrollments())
    }
    load()
  }, [])

  const load = async () => {
    setEnrollments(await fetchEnrollments())
  }

  const handleIssue = async (id, type) => {
    await issueCertificate({ enrollmentId: id, type })
    load()
  }

  return (
    <div>
      <h1>Enrollments & Certificates</h1>

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>User UID</th>
            <th>Internship</th>
            <th>Status</th>
            <th>Certificate</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {enrollments.map((e) => (
            <tr key={e._id}>
              <td>{e.userUid}</td>
              <td>{e.internshipId}</td>
              <td>{e.status}</td>
              <td>
                {e.certificate?.issued
                  ? e.certificate.certificateId
                  : "Not issued"}
              </td>
              <td>
                {!e.certificate?.issued && (
                  <>
                    <button onClick={() => handleIssue(e._id, "joining")}>
                      Joining Letter
                    </button>{" "}
                    <button onClick={() => handleIssue(e._id, "completion")}>
                      Completion
                    </button>{" "}
                    <button onClick={() => handleIssue(e._id, "performance")}>
                      Performance
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

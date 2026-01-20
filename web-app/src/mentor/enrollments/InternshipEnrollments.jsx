import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { fetchEnrollments } from "../services/mentorEnrollment.service"

export default function InternshipEnrollments() {
  const { internshipId } = useParams()
  const [enrollments, setEnrollments] = useState([])

  useEffect(() => {
    const load = async () => {
      const data = await fetchEnrollments(internshipId)
      setEnrollments(data)
    }
    load()
  }, [internshipId])

  return (
    <div>
      <h2>Enrolled Interns</h2>

      {enrollments.length === 0 && <p>No enrollments yet.</p>}

      {enrollments.map((e) => (
        <div
          key={e._id}
          style={{
            border: "1px solid #ccc",
            padding: "12px",
            marginBottom: "10px",
          }}
        >
          <p><strong>User UID:</strong> {e.userUid}</p>
          <p><strong>Status:</strong> {e.status}</p>
          <p><strong>Progress:</strong> {e.completionPercentage || 0}%</p>

          <h4>Internship Profile</h4>
          <p>Education: {e.profile?.education}</p>
          <p>College: {e.profile?.college}</p>
          <p>Degree: {e.profile?.degree}</p>
          <p>Year: {e.profile?.year}</p>
          <p>Skills: {e.profile?.skills?.join(", ")}</p>

          <h4>Certificate</h4>
          <p>
            {e.certificate?.issued
              ? `Issued (${e.certificate.type})`
              : "Not issued"}
          </p>
        </div>
      ))}
    </div>
  )
}

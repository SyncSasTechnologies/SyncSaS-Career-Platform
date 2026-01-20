import { useEffect, useState } from "react"
import {
  fetchMyInternships,
  submitInternship,
} from "../services/mentorInternship.service"

export default function MyInternships() {
  const [list, setList] = useState([])

  useEffect(() => {
    const load = async () => {
      setList(await fetchMyInternships())
    }
    load()
  }, [])

  const load = async () => {
    setList(await fetchMyInternships())
  }

  const submit = async (id) => {
    await submitInternship(id)
    load()
  }

  return (
    <div>
      <h2>My Internships</h2>

      {list.map((i) => (
        <div key={i._id} style={{ border: "1px solid #ccc", padding: 10, marginBottom: 10 }}>
          <h4>{i.title}</h4>
          <p>Status: {i.status}</p>

          {i.status === "draft" && (
            <button onClick={() => submit(i._id)}>
              Submit for Approval
            </button>
          )}
          <a href={`/mentor/enrollments/${i._id}`}>
  View Enrollments
</a>
<a href={`/mentor/analytics/${i._id}`}>View Analytics</a>

        </div>
      ))}
    </div>
  )
}

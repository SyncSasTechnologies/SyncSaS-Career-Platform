import { useEffect, useState } from "react"
import {
  fetchRecommendations,
  approveRecommendation,
} from "../services/adminRecommendation.service"

export default function Recommendations() {
  const [list, setList] = useState([])

  useEffect(() => {
    load()
  }, [])

  const load = async () => {
    setList(await fetchRecommendations())
  }

  const approve = async (id) => {
    await approveRecommendation(id)
    load()
  }

  return (
    <div>
      <h1>Mentor Certificate Recommendations</h1>

      {list.map((r) => (
        <div
          key={r._id}
          style={{ border: "1px solid #ccc", padding: 12, marginBottom: 10 }}
        >
          <p><strong>User UID:</strong> {r.userUid}</p>
          <p><strong>Internship:</strong> {r.internshipId}</p>
          <p><strong>Type:</strong> {r.certificate.recommendationType}</p>
          <p><strong>Remarks:</strong> {r.certificate.remarks}</p>

          <button onClick={() => approve(r._id)}>
            Approve & Issue Certificate
          </button>
        </div>
      ))}
    </div>
  )
}

import "../styles/public-pages.css"

export default function InternshipCertificate() {
  return (
    <div className="internship-page">
      <div className="page-container">
        <div className="page-header">
          <div>
            <h1 className="page-title">Certificate Center</h1>
            <p className="page-subtitle">Preview your certificate and track eligibility.</p>
          </div>
          <div className="actions">
            <button className="btn ghost">Share</button>
            <button className="btn primary" disabled>Download PDF</button>
          </div>
        </div>

        <div className="two-column">
          <div className="section">
            <div className="certificate-preview">
              <p className="card-text">Certificate of Completion</p>
              <h2 className="certificate-title">SyncSaS LMS & Career Platform</h2>
              <div className="certificate-name">Faizan Sheikh</div>
              <p className="card-text">has successfully completed</p>
              <h3 className="card-title">Full Stack Web Development Internship</h3>
              <p className="card-text">Issued on: January 29, 2026</p>
              <p className="card-text">Certificate ID: SSC-INT-2026-001</p>
            </div>
          </div>

          <div className="section">
            <h3 className="card-title">Eligibility Checklist</h3>
            <ul className="list">
              <li>Complete all Level 1 tasks</li>
              <li>Complete all Level 2 tasks</li>
              <li>Final capstone approved by mentor</li>
              <li>Minimum performance score 80%</li>
            </ul>

            <div className="notice" style={{ marginTop: 16 }}>
              You are 2 steps away from unlocking the certificate.
            </div>

            <div className="actions" style={{ marginTop: 16 }}>
              <button className="btn primary">View Progress</button>
              <button className="btn secondary">Request Review</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

import React from "react";

function ProposalCard({ proposal, onHire, onReject }) {
  return (
    <div className="card">
      <div className="card-header">
        <div
          className="avatar"
          style={{ backgroundColor: proposal.color }}
        >
          {proposal.avatar}
        </div>

        <div className="info">
          <h3>{proposal.name}</h3>
          <p>{proposal.role}</p>
        </div>

        <div className="price">${proposal.price}</div>
      </div>

      <p className="message">{proposal.message}</p>

      <div className="actions">
        {proposal.status === "hired" ? (
          <span className="badge hired">Hired</span>
        ) : proposal.status === "rejected" ? (
          <span className="badge rejected">Rejected</span>
        ) : (
          <>
            <button className="btn hire" onClick={onHire}>
              Hire
            </button>
            <button className="btn reject" onClick={onReject}>
              Reject
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default ProposalCard;

import React, { useState } from "react";
import proposalsData from "../data/proposals";
import ProposalCard from "../components/ProposalCard";

function ProposalsPage() {
  const [proposals, setProposals] = useState(proposalsData);

  const handleHire = (id) => {
    setProposals(
      proposals.map((p) =>
        p.id === id ? { ...p, status: "hired" } : p
      )
    );
  };

  const handleReject = (id) => {
    setProposals(
      proposals.map((p) =>
        p.id === id ? { ...p, status: "rejected" } : p
      )
    );
  };

  return (
    <div className="container">
      <h1>Gig Proposals List</h1>
      <p className="subtitle">
        Review freelancer proposals for the <b>"Website Design"</b> gig
      </p>

      <div className="grid">
        {proposals.map((proposal) => (
          <ProposalCard
            key={proposal.id}
            proposal={proposal}
            onHire={() => handleHire(proposal.id)}
            onReject={() => handleReject(proposal.id)}
          />
        ))}
      </div>
    </div>
  );
}

export default ProposalsPage;

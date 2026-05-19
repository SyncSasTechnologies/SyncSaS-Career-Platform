import { useState } from "react";

function ProposalForm() {
  const [price, setPrice] = useState("");
  const [coverLetter, setCoverLetter] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!price || !coverLetter) {
      alert("Please fill all fields");
      return;
    }

    console.log("Proposal Submitted:", {
      price,
      coverLetter,
    });

    alert("Proposal submitted successfully!");
  };

  return (
    <div style={{ maxWidth: "400px", margin: "40px auto" }}>
      <h2>Submit Proposal</h2>

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "12px" }}>
          <label>Proposed Price</label><br />
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            style={{ width: "100%", padding: "8px" }}
          />
        </div>

        <div style={{ marginBottom: "12px" }}>
          <label>Cover Letter</label><br />
          <textarea
            rows="5"
            value={coverLetter}
            onChange={(e) => setCoverLetter(e.target.value)}
            style={{ width: "100%", padding: "8px" }}
          />
        </div>

        <button type="submit">Submit Proposal</button>
      </form>
    </div>
  );
}

export default ProposalForm;

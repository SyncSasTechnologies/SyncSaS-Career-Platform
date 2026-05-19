const GigCard = ({ gig }) => {
  return (
    <div style={{ border: "1px solid #ddd", padding: "16px", marginBottom: "12px" }}>
      <h3>{gig.title}</h3>
      <p>{gig.description}</p>
      <p><strong>Category:</strong> {gig.category}</p>
      <p><strong>Budget:</strong> ₹{gig.budget}</p>
      <p><strong>Experience:</strong> {gig.experience}</p>
    </div>
  );
};

export default GigCard;

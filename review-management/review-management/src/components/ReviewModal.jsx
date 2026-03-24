export default function ReviewModal() {
  return (
    <div className="modal">
      <div className="modal-header">
        <h3>Add Review</h3>
        <span className="close">×</span>
      </div>

      <p className="modal-label">Rate your experience:</p>
      <div className="stars big">⭐⭐⭐⭐⭐</div>

      <textarea placeholder="Write your review..." />

      <div className="modal-actions">
        <button className="primary-btn">Submit Review</button>
        <button className="secondary-btn">Cancel</button>
      </div>
    </div>
  );
}

function getInitials(name) {
  return name
    .split(" ")
    .map(word => word[0])
    .join("")
    .toUpperCase();
}

export default function ReviewCard({ name, role, review, date }) {
  return (
    <div className="review-card">
      <div className="review-left">
        <div className="avatar-initials">
          {getInitials(name)}
          <span className="online-dot"></span>
        </div>

        <div className="review-info">
          <h3>{name}</h3>
          <p className="role">{role}</p>
          <div className="stars">⭐⭐⭐⭐⭐</div>
          <p className="review-text">{review}</p>
        </div>
      </div>

      <div className="review-right">
        <span className="date">{date}</span>
        <span className="verified">✔ Verified Project</span>
      </div>
    </div>
  );
}

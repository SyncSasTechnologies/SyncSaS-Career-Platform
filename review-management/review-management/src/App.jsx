import StatsCard from "./components/StatsCard";
import ReviewCard from "./components/ReviewCard";
import ReviewModal from "./components/ReviewModal";
import "./App.css";

export default function App() {
  return (
    <div className="page">
      <h1 className="title">Review Management</h1>

      {/* ===== Stats Section ===== */}
      <div className="stats">
        <StatsCard icon="⭐" value="4.5" label="Average Rating" />
        <StatsCard icon="💬" value="120" label="Total Reviews" />
        <StatsCard icon="💼" value="85" label="Completed Projects" />
      </div>

      {/* ===== Reviews Header ===== */}
      <div className="reviews-header">
        <h2>Client Reviews</h2>
        <button className="primary-btn">Add Review</button>
      </div>

      {/* ===== Review Cards ===== */}
      <ReviewCard
        name="Rahul Sharma"
        role="Website Development"
        review="Excellent work, very professional."
        date="12 Jan 2026"
      />

      <ReviewCard
        name="Anita Verma"
        role="Mobile App UI"
        review="Good communication and timely delivery."
        date="05 Jan 2026"
      />

      <ReviewCard
        name="Suresh Patel"
        role="SEO Optimization"
        review="Great experience, will hire again!"
        date="28 Dec 2025"
      />

      {/* ===== Load More ===== */}
      <button className="load-btn">Load More</button>

      {/* ===== Add Review Modal ===== */}
      <ReviewModal />
    </div>
  );
}

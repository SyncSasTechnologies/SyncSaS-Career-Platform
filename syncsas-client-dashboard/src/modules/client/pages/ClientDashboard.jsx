import "./ClientDashboard.css";

function ClientDashboard() {
  return (
    <div className="dashboard-container">
      <h1>Client Dashboard</h1>
      <p className="welcome">Welcome back, Client</p>

      <div className="cards">
        <div className="card">
          <h2>4</h2>
          <p>Total Gigs Posted</p>
        </div>

        <div className="card">
          <h2>2</h2>
          <p>Active Hires</p>
        </div>

        <div className="card">
          <h2>5</h2>
          <p>Completed Projects</p>
        </div>

        <div className="card">
          <h2>1</h2>
          <p>Pending Reviews</p>
        </div>
      </div>
    </div>
  );
}

export default ClientDashboard;

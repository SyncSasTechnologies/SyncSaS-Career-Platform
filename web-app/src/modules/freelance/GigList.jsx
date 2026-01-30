import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

// TODO: will be Replaced with API call
const mockGigs = [
  { id: 1, title: 'Web Design for Startup', price: 500, description: 'Design a modern website for a tech startup.' },
  { id: 2, title: 'Mobile App UI/UX', price: 800, description: 'Create UI/UX for a cross-platform mobile app.' },
  { id: 3, title: 'Logo & Branding', price: 200, description: 'Develop a logo and branding kit for a new business.' },
];

const GigList = () => {
  const [gigs, setGigs] = useState([]);

  useEffect(() => {
    // will be Replaced with API call
    setGigs(mockGigs);
  }, []);

  return (
    <div>
      <h2>Available Gigs</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
        {gigs.map(gig => (
          <div key={gig.id} style={{ border: '1px solid #ccc', padding: '1rem', width: '250px' }}>
            <h3>{gig.title}</h3>
            <p>{gig.description}</p>
            <p><strong>Budget:</strong> ${gig.price}</p>
            <Link to={`/freelance/gigs/${gig.id}`}>View Details</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GigList;

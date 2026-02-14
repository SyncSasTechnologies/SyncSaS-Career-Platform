import React from 'react';
import { useParams, Link } from 'react-router-dom';

// TODO: Replace with API call
const mockGigs = [
  { id: 1, title: 'Web Design for Startup', price: 500, description: 'Design a modern website for a tech startup.' },
  { id: 2, title: 'Mobile App UI/UX', price: 800, description: 'Create UI/UX for a cross-platform mobile app.' },
  { id: 3, title: 'Logo & Branding', price: 200, description: 'Develop a logo and branding kit for a new business.' },
  { id: 4, title: 'Content Writing', price: 300, description: 'Write engaging content for blogs and websites.' },
  { id: 5, title: 'Digital Marketing', price: 600, description: 'Plan and execute digital marketing campaigns.' },
  
];

const GigDetail = () => {
  const { id } = useParams();
  const gig = mockGigs.find(g => g.id === Number(id));

  if (!gig) return <div>Gig not found.</div>;

  return (
    <div>
      <h2>{gig.title}</h2>
      <p>{gig.description}</p>
      <p><strong>Budget:</strong> ${gig.price}</p>
      <Link to="/freelance/gigs">Back to Gigs</Link>
    </div>
  );
};

export default GigDetail;

import React from 'react';
import { useNavigate } from 'react-router-dom';

const FreelanceHome = () => {
    const navigate = useNavigate();

    const handleViewGigs = () => {
        navigate('/freelance/gigs');
    };

    return (
        <div style={{ textAlign: 'center', marginTop: '4rem' }}>
            <h2>Freelance Home</h2>
            <button onClick={handleViewGigs} style={{ padding: '0.75rem 2rem', fontSize: '1rem' }}>
                View Gigs
            </button>
        </div>
    );
};

export default FreelanceHome;
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/resources-library.css';

const ResourcesLibrary = () => {
  const [loading, setLoading] = useState(true);
  const [resources, setResources] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Mock resources data - replace with actual API call
    const mockResources = [
      {
        id: 1,
        title: 'Introduction to React Hooks',
        category: 'Frontend',
        type: 'Video',
        duration: '45 mins',
        difficulty: 'Beginner',
        url: '#',
        thumbnail: '🎥',
        description: 'Learn the fundamentals of React Hooks including useState, useEffect, and custom hooks.',
        tags: ['React', 'JavaScript', 'Hooks']
      },
      {
        id: 2,
        title: 'RESTful API Design Best Practices',
        category: 'Backend',
        type: 'Article',
        duration: '15 mins',
        difficulty: 'Intermediate',
        url: '#',
        thumbnail: '📄',
        description: 'Comprehensive guide to designing scalable and maintainable RESTful APIs.',
        tags: ['API', 'Backend', 'REST']
      },
      {
        id: 3,
        title: 'Node.js & Express Crash Course',
        category: 'Backend',
        type: 'Video',
        duration: '2 hours',
        difficulty: 'Beginner',
        url: '#',
        thumbnail: '🎥',
        description: 'Complete tutorial covering Node.js fundamentals and Express framework.',
        tags: ['Node.js', 'Express', 'Backend']
      },
      {
        id: 4,
        title: 'Git & GitHub Workflow Guide',
        category: 'Tools',
        type: 'Documentation',
        duration: '30 mins',
        difficulty: 'Beginner',
        url: '#',
        thumbnail: '📚',
        description: 'Master version control with Git and collaboration on GitHub.',
        tags: ['Git', 'GitHub', 'Version Control']
      },
      {
        id: 5,
        title: 'Database Design Fundamentals',
        category: 'Database',
        type: 'Video',
        duration: '1 hour',
        difficulty: 'Intermediate',
        url: '#',
        thumbnail: '🎥',
        description: 'Learn how to design efficient database schemas and relationships.',
        tags: ['Database', 'SQL', 'Design']
      },
      {
        id: 6,
        title: 'MongoDB Cheat Sheet',
        category: 'Database',
        type: 'Cheatsheet',
        duration: '5 mins',
        difficulty: 'All Levels',
        url: '#',
        thumbnail: '📋',
        description: 'Quick reference for MongoDB commands and operations.',
        tags: ['MongoDB', 'NoSQL', 'Database']
      },
      {
        id: 7,
        title: 'CSS Grid & Flexbox Mastery',
        category: 'Frontend',
        type: 'Tutorial',
        duration: '1.5 hours',
        difficulty: 'Intermediate',
        url: '#',
        thumbnail: '💻',
        description: 'Comprehensive guide to modern CSS layout techniques.',
        tags: ['CSS', 'Layout', 'Frontend']
      },
      {
        id: 8,
        title: 'Authentication & Authorization Guide',
        category: 'Security',
        type: 'Article',
        duration: '20 mins',
        difficulty: 'Advanced',
        url: '#',
        thumbnail: '📄',
        description: 'Deep dive into JWT, OAuth, and session-based authentication.',
        tags: ['Security', 'Auth', 'JWT']
      },
      {
        id: 9,
        title: 'Testing with Jest & React Testing Library',
        category: 'Testing',
        type: 'Video',
        duration: '1 hour',
        difficulty: 'Intermediate',
        url: '#',
        thumbnail: '🎥',
        description: 'Learn to write effective unit and integration tests for React apps.',
        tags: ['Testing', 'Jest', 'React']
      },
      {
        id: 10,
        title: 'Docker Basics for Developers',
        category: 'DevOps',
        type: 'Tutorial',
        duration: '45 mins',
        difficulty: 'Beginner',
        url: '#',
        thumbnail: '💻',
        description: 'Get started with containerization using Docker.',
        tags: ['Docker', 'DevOps', 'Containers']
      }
    ];

    setResources(mockResources);
    setLoading(false);
  }, []);

  const categories = ['all', 'Frontend', 'Backend', 'Database', 'Tools', 'Security', 'Testing', 'DevOps'];

  const filteredResources = resources.filter(resource => {
    const matchesCategory = selectedCategory === 'all' || resource.category === selectedCategory;
    const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         resource.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  if (loading) {
    return (
      <div className="resources-library-page">
        <div className="loading">Loading resources...</div>
      </div>
    );
  }

  return (
    <div className="resources-library-page">
      <div className="page-container">
        {/* Header */}
        <div className="page-header">
          <div>
            <h1>Resources Library</h1>
            <p>Curated learning materials to help you succeed in your internship</p>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="filters-section">
          <div className="search-bar">
            <svg className="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.35-4.35"></path>
            </svg>
            <input
              type="text"
              placeholder="Search resources, topics, or tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="category-filters">
            {categories.map(category => (
              <button
                key={category}
                className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category)}
              >
                {category === 'all' ? 'All Resources' : category}
              </button>
            ))}
          </div>
        </div>

        {/* Resources Count */}
        <div className="results-info">
          <p>Showing {filteredResources.length} resource{filteredResources.length !== 1 ? 's' : ''}</p>
        </div>

        {/* Resources Grid */}
        {filteredResources.length > 0 ? (
          <div className="resources-grid">
            {filteredResources.map(resource => (
              <div key={resource.id} className="resource-card">
                <div className="resource-thumbnail">
                  <span className="thumbnail-icon">{resource.thumbnail}</span>
                  <span className="resource-type-badge">{resource.type}</span>
                </div>
                <div className="resource-content">
                  <div className="resource-header">
                    <h3>{resource.title}</h3>
                    <span className={`difficulty-badge ${resource.difficulty.toLowerCase().replace(' ', '-')}`}>
                      {resource.difficulty}
                    </span>
                  </div>
                  <p className="resource-description">{resource.description}</p>
                  <div className="resource-meta">
                    <span className="meta-item">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <circle cx="12" cy="12" r="10"></circle>
                        <polyline points="12 6 12 12 16 14"></polyline>
                      </svg>
                      {resource.duration}
                    </span>
                    <span className="meta-item">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                        <circle cx="12" cy="7" r="4"></circle>
                      </svg>
                      {resource.category}
                    </span>
                  </div>
                  <div className="resource-tags">
                    {resource.tags.map((tag, index) => (
                      <span key={index} className="tag">{tag}</span>
                    ))}
                  </div>
                  <div className="resource-actions">
                    <a href={resource.url} className="btn btn-primary" target="_blank" rel="noopener noreferrer">
                      View Resource
                    </a>
                    <button className="btn-icon" title="Bookmark">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path d="m19 21-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <div className="empty-icon">📚</div>
            <h3>No resources found</h3>
            <p>Try adjusting your search or filter criteria</p>
          </div>
        )}

        {/* Additional Resources Section */}
        <div className="additional-resources">
          <h2>Need More Help?</h2>
          <div className="help-cards">
            <div className="help-card">
              <div className="help-icon">💬</div>
              <h3>Ask Your Mentor</h3>
              <p>Get personalized guidance from your assigned mentor</p>
              <Link to="/intern/mentor" className="help-link">Contact Mentor →</Link>
            </div>
            <div className="help-card">
              <div className="help-icon">👥</div>
              <h3>Join Community</h3>
              <p>Connect with fellow interns and share knowledge</p>
              <Link to="/intern/community" className="help-link">Join Discussion →</Link>
            </div>
            <div className="help-card">
              <div className="help-icon">❓</div>
              <h3>FAQ & Support</h3>
              <p>Find answers to common questions</p>
              <Link to="/intern/help" className="help-link">View FAQ →</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResourcesLibrary;

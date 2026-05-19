import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import '../styles/task-submission.css';

const TaskSubmissionPage = () => {
  const { taskId } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    description: '',
    githubUrl: '',
    liveUrl: '',
    notes: ''
  });
  const [files, setFiles] = useState([]);

  useEffect(() => {
    // Mock task data - replace with actual API call
    const mockTask = {
      id: taskId,
      title: 'Build a RESTful API',
      description: 'Create a RESTful API using Node.js and Express. The API should include CRUD operations for a resource of your choice.',
      requirements: [
        'Use Node.js and Express framework',
        'Implement at least 5 RESTful endpoints',
        'Add input validation',
        'Include error handling',
        'Write API documentation',
        'Deploy to a cloud platform'
      ],
      points: 100,
      deadline: '2026-02-15',
      acceptedFileTypes: ['.zip', '.pdf', '.docx', '.txt'],
      maxFileSize: '50MB',
      submissionGuidelines: [
        'Include source code (as .zip file)',
        'Provide GitHub repository link',
        'Include deployment link if applicable',
        'Add README with setup instructions'
      ]
    };

    setTask(mockTask);
    setLoading(false);
  }, [taskId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles(prev => [...prev, ...selectedFiles]);
  };

  const removeFile = (index) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    // Simulate submission
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Mock submission - replace with actual API call
    console.log('Submitting task:', {
      taskId,
      formData,
      files: files.map(f => f.name)
    });

    setSubmitting(false);
    setSubmitted(true);
  };

  if (loading) {
    return (
      <div className="task-submission-page">
        <div className="loading">Loading task details...</div>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="task-submission-page">
        <div className="submission-success">
          <div className="success-icon">✓</div>
          <h1>Task Submitted Successfully!</h1>
          <p>Your submission has been received and will be reviewed by your mentor.</p>
          <div className="success-actions">
            <Link to="/intern/tasks" className="btn btn-primary">
              Back to Tasks
            </Link>
            <Link to="/internships" className="btn btn-secondary">
              Go to Dashboard
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="task-submission-page">
      <div className="page-container">
        <div className="breadcrumb">
          <Link to="/intern/tasks">Tasks</Link>
          <span>/</span>
          <span>Submit Task</span>
        </div>

        <div className="submission-layout">
          {/* Task Details Sidebar */}
          <aside className="task-details-sidebar">
            <div className="sidebar-card">
              <h3>{task.title}</h3>
              <div className="task-meta">
                <div className="meta-item">
                  <span className="label">Points:</span>
                  <span className="value">{task.points}</span>
                </div>
                <div className="meta-item">
                  <span className="label">Deadline:</span>
                  <span className="value">{new Date(task.deadline).toLocaleDateString()}</span>
                </div>
              </div>
            </div>

            <div className="sidebar-card">
              <h4>Requirements</h4>
              <ul className="requirements-list">
                {task.requirements.map((req, index) => (
                  <li key={index}>{req}</li>
                ))}
              </ul>
            </div>

            <div className="sidebar-card">
              <h4>Submission Guidelines</h4>
              <ul className="guidelines-list">
                {task.submissionGuidelines.map((guideline, index) => (
                  <li key={index}>{guideline}</li>
                ))}
              </ul>
            </div>

            <div className="sidebar-card">
              <h4>File Requirements</h4>
              <p className="file-info">
                <strong>Accepted:</strong> {task.acceptedFileTypes.join(', ')}
              </p>
              <p className="file-info">
                <strong>Max Size:</strong> {task.maxFileSize}
              </p>
            </div>
          </aside>

          {/* Submission Form */}
          <main className="submission-form-container">
            <h1>Submit Your Work</h1>
            <p className="form-description">
              Please fill out the form below to submit your task. Make sure all requirements are met before submitting.
            </p>

            <form onSubmit={handleSubmit} className="submission-form">
              {/* Description */}
              <div className="form-group">
                <label htmlFor="description">
                  Description <span className="required">*</span>
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Describe what you've built and how you approached the task..."
                  rows="6"
                  required
                />
                <span className="help-text">
                  Explain your approach, challenges faced, and solutions implemented
                </span>
              </div>

              {/* GitHub URL */}
              <div className="form-group">
                <label htmlFor="githubUrl">
                  GitHub Repository URL <span className="required">*</span>
                </label>
                <input
                  type="url"
                  id="githubUrl"
                  name="githubUrl"
                  value={formData.githubUrl}
                  onChange={handleInputChange}
                  placeholder="https://github.com/username/repository"
                  required
                />
              </div>

              {/* Live URL */}
              <div className="form-group">
                <label htmlFor="liveUrl">
                  Live Deployment URL (Optional)
                </label>
                <input
                  type="url"
                  id="liveUrl"
                  name="liveUrl"
                  value={formData.liveUrl}
                  onChange={handleInputChange}
                  placeholder="https://your-project.herokuapp.com"
                />
                <span className="help-text">
                  If you've deployed your project, include the live URL
                </span>
              </div>

              {/* File Upload */}
              <div className="form-group">
                <label htmlFor="files">
                  Upload Files (Optional)
                </label>
                <div className="file-upload-area">
                  <input
                    type="file"
                    id="files"
                    onChange={handleFileChange}
                    multiple
                    accept={task.acceptedFileTypes.join(',')}
                  />
                  <label htmlFor="files" className="file-upload-label">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                      <polyline points="17 8 12 3 7 8"></polyline>
                      <line x1="12" y1="3" x2="12" y2="15"></line>
                    </svg>
                    <span>Click to upload or drag and drop</span>
                    <span className="file-types">{task.acceptedFileTypes.join(', ')} (Max {task.maxFileSize})</span>
                  </label>
                </div>

                {/* Uploaded Files List */}
                {files.length > 0 && (
                  <div className="uploaded-files">
                    <h4>Uploaded Files:</h4>
                    <ul>
                      {files.map((file, index) => (
                        <li key={index} className="file-item">
                          <span className="file-name">{file.name}</span>
                          <span className="file-size">({(file.size / 1024).toFixed(2)} KB)</span>
                          <button
                            type="button"
                            onClick={() => removeFile(index)}
                            className="remove-file"
                          >
                            ×
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Additional Notes */}
              <div className="form-group">
                <label htmlFor="notes">
                  Additional Notes (Optional)
                </label>
                <textarea
                  id="notes"
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  placeholder="Any additional information you'd like to share with your mentor..."
                  rows="4"
                />
              </div>

              {/* Terms */}
              <div className="form-group checkbox-group">
                <label>
                  <input type="checkbox" required />
                  <span>
                    I confirm that this is my original work and adheres to the task requirements
                  </span>
                </label>
              </div>

              {/* Submit Buttons */}
              <div className="form-actions">
                <button
                  type="button"
                  onClick={() => navigate(-1)}
                  className="btn btn-secondary"
                  disabled={submitting}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={submitting}
                >
                  {submitting ? 'Submitting...' : 'Submit Task'}
                </button>
              </div>
            </form>
          </main>
        </div>
      </div>
    </div>
  );
};

export default TaskSubmissionPage;

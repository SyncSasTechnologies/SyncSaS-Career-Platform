import React, { useState, useEffect } from 'react';
import '../styles/internship-settings.css';

const InternshipSettings = () => {
  const [loading, setLoading] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Profile Settings
  const [profileSettings, setProfileSettings] = useState({
    displayName: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 234 567 8900',
    bio: 'Passionate full-stack developer with a keen interest in building scalable web applications.',
    location: 'San Francisco, CA',
    linkedIn: 'https://linkedin.com/in/johndoe',
    github: 'https://github.com/johndoe',
    portfolio: 'https://johndoe.dev'
  });

  // Notification Settings
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    taskReminders: true,
    feedbackAlerts: true,
    weeklyDigest: true,
    mentorMessages: true,
    achievementUpdates: false,
    communityUpdates: false
  });

  // Privacy Settings
  const [privacySettings, setPrivacySettings] = useState({
    profileVisibility: 'public', // public, private, mentors
    showProgress: true,
    showAchievements: true,
    showRanking: false
  });

  // Preference Settings
  const [preferenceSettings, setPreferenceSettings] = useState({
    theme: 'light', // light, dark, auto
    language: 'en',
    timezone: 'America/New_York',
    dateFormat: 'MM/DD/YYYY'
  });

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileSettings(prev => ({ ...prev, [name]: value }));
  };

  const handleNotificationToggle = (key) => {
    setNotificationSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handlePrivacyChange = (key, value) => {
    setPrivacySettings(prev => ({ ...prev, [key]: value }));
  };

  const handlePreferenceChange = (e) => {
    const { name, value } = e.target;
    setPreferenceSettings(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveSettings = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSaveSuccess(false);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    console.log('Saving settings:', {
      profileSettings,
      notificationSettings,
      privacySettings,
      preferenceSettings
    });

    setLoading(false);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  return (
    <div className="internship-settings-page">
      <div className="page-container">
        {/* Header */}
        <div className="page-header">
          <div>
            <h1>Internship Settings</h1>
            <p>Manage your profile, notifications, and preferences</p>
          </div>
          {saveSuccess && (
            <div className="save-success">
              ✓ Settings saved successfully
            </div>
          )}
        </div>

        <form onSubmit={handleSaveSettings}>
          <div className="settings-grid">
            {/* Profile Settings */}
            <div className="settings-card">
              <h2>Profile Information</h2>
              <p className="section-description">Update your personal information and social links</p>

              <div className="form-group">
                <label htmlFor="displayName">Display Name</label>
                <input
                  type="text"
                  id="displayName"
                  name="displayName"
                  value={profileSettings.displayName}
                  onChange={handleProfileChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={profileSettings.email}
                  onChange={handleProfileChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="phone">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={profileSettings.phone}
                  onChange={handleProfileChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="location">Location</label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={profileSettings.location}
                  onChange={handleProfileChange}
                  placeholder="City, State/Country"
                />
              </div>

              <div className="form-group">
                <label htmlFor="bio">Bio</label>
                <textarea
                  id="bio"
                  name="bio"
                  value={profileSettings.bio}
                  onChange={handleProfileChange}
                  rows="4"
                  placeholder="Tell us about yourself..."
                />
              </div>

              <div className="form-group">
                <label htmlFor="linkedIn">LinkedIn Profile</label>
                <input
                  type="url"
                  id="linkedIn"
                  name="linkedIn"
                  value={profileSettings.linkedIn}
                  onChange={handleProfileChange}
                  placeholder="https://linkedin.com/in/username"
                />
              </div>

              <div className="form-group">
                <label htmlFor="github">GitHub Profile</label>
                <input
                  type="url"
                  id="github"
                  name="github"
                  value={profileSettings.github}
                  onChange={handleProfileChange}
                  placeholder="https://github.com/username"
                />
              </div>

              <div className="form-group">
                <label htmlFor="portfolio">Portfolio Website</label>
                <input
                  type="url"
                  id="portfolio"
                  name="portfolio"
                  value={profileSettings.portfolio}
                  onChange={handleProfileChange}
                  placeholder="https://yourwebsite.com"
                />
              </div>
            </div>

            {/* Notification Settings */}
            <div className="settings-card">
              <h2>Notifications</h2>
              <p className="section-description">Choose what notifications you want to receive</p>

              <div className="toggle-list">
                <div className="toggle-item">
                  <div className="toggle-info">
                    <h4>Email Notifications</h4>
                    <p>Receive notifications via email</p>
                  </div>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={notificationSettings.emailNotifications}
                      onChange={() => handleNotificationToggle('emailNotifications')}
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </div>

                <div className="toggle-item">
                  <div className="toggle-info">
                    <h4>Task Reminders</h4>
                    <p>Get reminders about upcoming task deadlines</p>
                  </div>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={notificationSettings.taskReminders}
                      onChange={() => handleNotificationToggle('taskReminders')}
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </div>

                <div className="toggle-item">
                  <div className="toggle-info">
                    <h4>Feedback Alerts</h4>
                    <p>Be notified when your mentor provides feedback</p>
                  </div>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={notificationSettings.feedbackAlerts}
                      onChange={() => handleNotificationToggle('feedbackAlerts')}
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </div>

                <div className="toggle-item">
                  <div className="toggle-info">
                    <h4>Weekly Digest</h4>
                    <p>Receive a weekly summary of your progress</p>
                  </div>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={notificationSettings.weeklyDigest}
                      onChange={() => handleNotificationToggle('weeklyDigest')}
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </div>

                <div className="toggle-item">
                  <div className="toggle-info">
                    <h4>Mentor Messages</h4>
                    <p>Get notified about messages from your mentor</p>
                  </div>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={notificationSettings.mentorMessages}
                      onChange={() => handleNotificationToggle('mentorMessages')}
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </div>

                <div className="toggle-item">
                  <div className="toggle-info">
                    <h4>Achievement Updates</h4>
                    <p>Celebrate when you unlock new achievements</p>
                  </div>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={notificationSettings.achievementUpdates}
                      onChange={() => handleNotificationToggle('achievementUpdates')}
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </div>

                <div className="toggle-item">
                  <div className="toggle-info">
                    <h4>Community Updates</h4>
                    <p>Stay informed about community discussions</p>
                  </div>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={notificationSettings.communityUpdates}
                      onChange={() => handleNotificationToggle('communityUpdates')}
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </div>
              </div>
            </div>

            {/* Privacy Settings */}
            <div className="settings-card">
              <h2>Privacy</h2>
              <p className="section-description">Control who can see your information</p>

              <div className="form-group">
                <label htmlFor="profileVisibility">Profile Visibility</label>
                <select
                  id="profileVisibility"
                  value={privacySettings.profileVisibility}
                  onChange={(e) => handlePrivacyChange('profileVisibility', e.target.value)}
                >
                  <option value="public">Public - Visible to everyone</option>
                  <option value="mentors">Mentors Only - Visible to mentors and admins</option>
                  <option value="private">Private - Only visible to you</option>
                </select>
              </div>

              <div className="toggle-list">
                <div className="toggle-item">
                  <div className="toggle-info">
                    <h4>Show Progress</h4>
                    <p>Allow others to see your task completion progress</p>
                  </div>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={privacySettings.showProgress}
                      onChange={() => handlePrivacyChange('showProgress', !privacySettings.showProgress)}
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </div>

                <div className="toggle-item">
                  <div className="toggle-info">
                    <h4>Show Achievements</h4>
                    <p>Display your earned achievements on your profile</p>
                  </div>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={privacySettings.showAchievements}
                      onChange={() => handlePrivacyChange('showAchievements', !privacySettings.showAchievements)}
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </div>

                <div className="toggle-item">
                  <div className="toggle-info">
                    <h4>Show Ranking</h4>
                    <p>Include your rank in the leaderboard</p>
                  </div>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={privacySettings.showRanking}
                      onChange={() => handlePrivacyChange('showRanking', !privacySettings.showRanking)}
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </div>
              </div>
            </div>

            {/* Preferences */}
            <div className="settings-card">
              <h2>Preferences</h2>
              <p className="section-description">Customize your experience</p>

              <div className="form-group">
                <label htmlFor="theme">Theme</label>
                <select
                  id="theme"
                  name="theme"
                  value={preferenceSettings.theme}
                  onChange={handlePreferenceChange}
                >
                  <option value="light">Light</option>
                  <option value="dark">Dark</option>
                  <option value="auto">Auto (System)</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="language">Language</label>
                <select
                  id="language"
                  name="language"
                  value={preferenceSettings.language}
                  onChange={handlePreferenceChange}
                >
                  <option value="en">English</option>
                  <option value="es">Español</option>
                  <option value="fr">Français</option>
                  <option value="de">Deutsch</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="timezone">Timezone</label>
                <select
                  id="timezone"
                  name="timezone"
                  value={preferenceSettings.timezone}
                  onChange={handlePreferenceChange}
                >
                  <option value="America/New_York">Eastern Time (ET)</option>
                  <option value="America/Chicago">Central Time (CT)</option>
                  <option value="America/Denver">Mountain Time (MT)</option>
                  <option value="America/Los_Angeles">Pacific Time (PT)</option>
                  <option value="Europe/London">London (GMT)</option>
                  <option value="Asia/Kolkata">India (IST)</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="dateFormat">Date Format</label>
                <select
                  id="dateFormat"
                  name="dateFormat"
                  value={preferenceSettings.dateFormat}
                  onChange={handlePreferenceChange}
                >
                  <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                  <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                  <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                </select>
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="settings-actions">
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Saving...' : 'Save All Changes'}
            </button>
            <button type="button" className="btn btn-secondary">
              Reset to Defaults
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InternshipSettings;

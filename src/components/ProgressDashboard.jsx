import React from 'react';
import './ProgressDashboard.css';

const ProgressDashboard = ({ subjectMastery, totalStudyTime, streak }) => {
  const subjects = [
    { key: 'mathematics', name: 'Mathematics', icon: '📊', color: '#4f46e5' },
    { key: 'science', name: 'Science', icon: '🔬', color: '#10b981' },
    { key: 'history', name: 'History', icon: '📚', color: '#f59e0b' },
    { key: 'language', name: 'Language', icon: '🗣️', color: '#ec4899' }
  ];

  const overallProgress = Object.values(subjectMastery).reduce((a, b) => a + b, 0) / Object.keys(subjectMastery).length;

  const getProgressLevel = (score) => {
    if (score >= 80) return 'Excellent';
    if (score >= 60) return 'Good';
    if (score >= 40) return 'Progressing';
    return 'Getting Started';
  };

  const getProgressColor = (score) => {
    if (score >= 80) return 'var(--success)';
    if (score >= 60) return 'var(--primary-color)';
    if (score >= 40) return 'var(--warning)';
    return 'var(--text-secondary)';
  };

  return (
    <div className="progress-dashboard" role="region" aria-label="Learning progress dashboard">
      <div className="dashboard-header">
        <h2>Your Learning Progress</h2>
        <p className="dashboard-subtitle">Track your mastery across subjects</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon" aria-hidden="true">📈</div>
          <div className="stat-content">
            <div className="stat-label">Overall Progress</div>
            <div className="stat-value">{Math.round(overallProgress)}%</div>
            <div className="stat-sublabel">{getProgressLevel(overallProgress)}</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" aria-hidden="true">⏱️</div>
          <div className="stat-content">
            <div className="stat-label">Study Time</div>
            <div className="stat-value">{totalStudyTime}h</div>
            <div className="stat-sublabel">Total hours</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" aria-hidden="true">🔥</div>
          <div className="stat-content">
            <div className="stat-label">Study Streak</div>
            <div className="stat-value">{streak}</div>
            <div className="stat-sublabel">Days in a row</div>
          </div>
        </div>
      </div>

      <div className="subjects-progress">
        <h3>Subject Mastery</h3>
        {subjects.map(subject => {
          const score = subjectMastery[subject.key] || 0;
          return (
            <div key={subject.key} className="subject-item">
              <div className="subject-header">
                <div className="subject-info">
                  <span className="subject-icon" aria-hidden="true">{subject.icon}</span>
                  <span className="subject-name">{subject.name}</span>
                </div>
                <div className="subject-score" style={{ color: getProgressColor(score) }}>
                  {score}%
                </div>
              </div>
              <div className="progress-bar-container" role="progressbar" aria-valuenow={score} aria-valuemin="0" aria-valuemax="100" aria-label={`${subject.name} progress: ${score}%`}>
                <div 
                  className="progress-bar-fill" 
                  style={{ 
                    width: `${score}%`,
                    background: subject.color
                  }}
                >
                  <span className="sr-only">{score}% complete</span>
                </div>
              </div>
              <div className="subject-level">{getProgressLevel(score)}</div>
            </div>
          );
        })}
      </div>

      <div className="achievements">
        <h3>Recent Achievements</h3>
        <div className="achievements-grid">
          {overallProgress >= 25 && (
            <div className="achievement-badge" title="Completed 25% overall progress">
              <span className="badge-icon" aria-hidden="true">🌟</span>
              <span className="badge-label">Getting Started</span>
            </div>
          )}
          {overallProgress >= 50 && (
            <div className="achievement-badge" title="Completed 50% overall progress">
              <span className="badge-icon" aria-hidden="true">⭐</span>
              <span className="badge-label">Halfway There</span>
            </div>
          )}
          {streak >= 3 && (
            <div className="achievement-badge" title="3 day study streak">
              <span className="badge-icon" aria-hidden="true">🔥</span>
              <span className="badge-label">On Fire</span>
            </div>
          )}
          {totalStudyTime >= 5 && (
            <div className="achievement-badge" title="5 hours of study time">
              <span className="badge-icon" aria-hidden="true">📚</span>
              <span className="badge-label">Dedicated Learner</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProgressDashboard;

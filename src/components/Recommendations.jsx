import React from 'react';
import './Recommendations.css';

const Recommendations = ({ recommendations, onSelectRecommendation }) => {
  const getPriorityClass = (priority) => {
    switch(priority) {
      case 'high': return 'priority-high';
      case 'medium': return 'priority-medium';
      case 'low': return 'priority-low';
      default: return '';
    }
  };

  const getPriorityLabel = (priority) => {
    switch(priority) {
      case 'high': return 'High Priority';
      case 'medium': return 'Recommended';
      case 'low': return 'Optional';
      default: return '';
    }
  };

  return (
    <div className="recommendations" role="region" aria-label="Study recommendations">
      <div className="recommendations-header">
        <h2>Personalized Recommendations</h2>
        <p className="recommendations-subtitle">Tailored suggestions for your learning journey</p>
      </div>

      {recommendations.length === 0 ? (
        <div className="no-recommendations">
          <div className="no-rec-icon" aria-hidden="true">💡</div>
          <p>Keep studying to get personalized recommendations!</p>
        </div>
      ) : (
        <div className="recommendations-list">
          {recommendations.map((rec, index) => (
            <div 
              key={index} 
              className={`recommendation-card ${getPriorityClass(rec.priority)}`}
              role="article"
              aria-label={`Recommendation: ${rec.title}`}
            >
              <div className="rec-header">
                <span className="rec-icon" aria-hidden="true">{rec.icon}</span>
                <div className="rec-priority-badge" aria-label={`Priority: ${rec.priority}`}>
                  {getPriorityLabel(rec.priority)}
                </div>
              </div>
              
              <h3 className="rec-title">{rec.title}</h3>
              <p className="rec-description">{rec.description}</p>
              
              <button
                className="rec-action-button"
                onClick={() => onSelectRecommendation(rec)}
                aria-label={`Start studying ${rec.subject}`}
              >
                Start Learning
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Recommendations;

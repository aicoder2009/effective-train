import React, { useState, useEffect } from 'react';
import ChatInterface from './components/ChatInterface';
import ProgressDashboard from './components/ProgressDashboard';
import Recommendations from './components/Recommendations';
import { generateAIResponse, detectLearningPace } from './utils/aiLogic';
import { generateRecommendations } from './utils/recommendations';
import './App.css';

function App() {
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [currentSubject, setCurrentSubject] = useState(null);
  const [subjectMastery, setSubjectMastery] = useState({
    mathematics: 45,
    science: 62,
    history: 38,
    language: 55
  });
  const [totalStudyTime, setTotalStudyTime] = useState(7.5);
  const [streak, setStreak] = useState(5);
  const [recentActivity, setRecentActivity] = useState(['science', 'mathematics', 'language']);
  const [learningPace, setLearningPace] = useState('beginner');

  useEffect(() => {
    // Detect learning pace based on conversation and mastery
    const pace = detectLearningPace(messages, subjectMastery);
    setLearningPace(pace);
  }, [messages, subjectMastery]);

  const handleMessageSent = async (message) => {
    const timestamp = new Date().toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });

    // Add user message
    const userMessage = {
      text: message,
      sender: 'user',
      timestamp
    };
    setMessages(prev => [...prev, userMessage]);

    // Simulate AI typing
    setIsTyping(true);

    // Detect subject from message
    const lowerMessage = message.toLowerCase();
    let detectedSubject = currentSubject;
    
    if (lowerMessage.includes('math') || lowerMessage.includes('algebra') || lowerMessage.includes('geometry')) {
      detectedSubject = 'mathematics';
    } else if (lowerMessage.includes('science') || lowerMessage.includes('physics') || lowerMessage.includes('chemistry')) {
      detectedSubject = 'science';
    } else if (lowerMessage.includes('history')) {
      detectedSubject = 'history';
    } else if (lowerMessage.includes('language') || lowerMessage.includes('english') || lowerMessage.includes('spanish')) {
      detectedSubject = 'language';
    }

    if (detectedSubject && detectedSubject !== currentSubject) {
      setCurrentSubject(detectedSubject);
      
      // Update recent activity
      setRecentActivity(prev => {
        const updated = [detectedSubject, ...prev.filter(s => s !== detectedSubject)];
        return updated.slice(0, 5);
      });

      // Simulate progress increase
      setSubjectMastery(prev => ({
        ...prev,
        [detectedSubject]: Math.min(100, prev[detectedSubject] + Math.random() * 3)
      }));

      // Increment study time
      setTotalStudyTime(prev => prev + 0.1);
    }

    // Generate AI response
    setTimeout(() => {
      const aiResponse = generateAIResponse(message, {
        subject: detectedSubject,
        learningPace,
        conversationHistory: messages
      });

      const aiMessage = {
        text: aiResponse,
        sender: 'ai',
        timestamp: new Date().toLocaleTimeString('en-US', { 
          hour: '2-digit', 
          minute: '2-digit' 
        })
      };

      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const handleSelectRecommendation = (recommendation) => {
    const subject = recommendation.subject;
    setCurrentSubject(subject);
    
    // Simulate starting a study session for the recommended subject
    const message = `I'd like to learn more about ${subject}`;
    handleMessageSent(message);
  };

  const recommendations = generateRecommendations(subjectMastery, recentActivity);

  return (
    <div className="app">
      <a href="#main-content" className="skip-to-main">
        Skip to main content
      </a>
      
      <header className="app-header" role="banner">
        <div className="header-content">
          <h1 className="app-title">
            <span className="app-icon" aria-hidden="true">🎓</span>
            AI Study Buddy
          </h1>
          <p className="app-tagline">Your Personalized Learning Companion</p>
        </div>
      </header>

      <main id="main-content" className="app-main" role="main">
        <div className="main-layout">
          <div className="chat-section">
            <ChatInterface
              messages={messages}
              onMessageSent={handleMessageSent}
              isTyping={isTyping}
            />
          </div>

          <div className="sidebar">
            <div className="sidebar-section">
              <ProgressDashboard
                subjectMastery={subjectMastery}
                totalStudyTime={totalStudyTime}
                streak={streak}
              />
            </div>

            <div className="sidebar-section">
              <Recommendations
                recommendations={recommendations}
                onSelectRecommendation={handleSelectRecommendation}
              />
            </div>
          </div>
        </div>
      </main>

      <footer className="app-footer" role="contentinfo">
        <p>&copy; 2024 AI Study Buddy. Empowering learners everywhere.</p>
      </footer>
    </div>
  );
}

export default App;

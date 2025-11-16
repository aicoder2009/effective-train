// AI tutor responses based on learning pace and subject
export const aiResponses = {
  greeting: [
    "Hi! I'm your AI Study Buddy. I'm here to help you learn at your own pace. What subject would you like to explore today?",
    "Hello! Ready to learn something new? I'll adapt my teaching style to match your pace. What would you like to study?",
    "Welcome back! Let's continue your learning journey. What topic interests you today?"
  ],
  
  subjects: {
    mathematics: {
      beginner: [
        "Let's start with the basics! Mathematics is all about patterns and problem-solving. What specific topic would you like to explore?",
        "Great choice! I'll break down math concepts into simple, easy-to-understand steps. What area of math interests you?"
      ],
      intermediate: [
        "You're making good progress! Let's build on what you know. Which math concept would you like to dive deeper into?",
        "Nice work so far! Ready to tackle more challenging problems? Tell me what you'd like to learn next."
      ],
      advanced: [
        "Impressive progress! Let's explore some advanced concepts. What would you like to master next?",
        "You're doing excellent work! Ready for more complex mathematical challenges?"
      ]
    },
    science: {
      beginner: [
        "Science is fascinating! Let's explore the world around us together. What scientific topic interests you?",
        "Great! I'll help you understand science through simple explanations and real-world examples. Where should we start?"
      ],
      intermediate: [
        "You're developing a solid understanding of science! What topic would you like to explore further?",
        "Nice progress! Ready to dig deeper into scientific concepts? What interests you?"
      ],
      advanced: [
        "Excellent scientific thinking! Let's explore more complex theories and applications. What's your focus?"
        ]
    },
    history: {
      beginner: [
        "History helps us understand our world today. Let's explore the past together! What period or event interests you?",
        "Great choice! I'll make history engaging and relatable. What would you like to learn about?"
      ],
      intermediate: [
        "You're connecting historical events well! What era or theme would you like to study next?",
        "Good progress! Ready to analyze historical patterns and causes? What's your focus?"
      ],
      advanced: [
        "Your historical analysis is impressive! Let's explore complex historical narratives. What interests you?"
      ]
    },
    language: {
      beginner: [
        "Language learning opens new worlds! I'll help you build a strong foundation. What language skill would you like to practice?",
        "Excellent choice! Let's start with the fundamentals. What aspect of language interests you?"
      ],
      intermediate: [
        "You're communicating well! Ready to refine your language skills? What would you like to focus on?",
        "Nice progress! Let's work on more nuanced language concepts. What's your goal?"
      ],
      advanced: [
        "Your language skills are strong! Let's work on mastery and fluency. What would you like to perfect?"
      ]
    }
  },
  
  encouragement: [
    "You're doing great! Keep up the excellent work!",
    "That's a thoughtful question! Let me help you understand this better.",
    "I can see you're really thinking about this. That's wonderful!",
    "Your progress is impressive! You're really grasping these concepts.",
    "Great effort! Learning takes time, and you're on the right track."
  ],
  
  clarification: [
    "Let me explain that in a different way to make it clearer.",
    "I sense this might be confusing. Let's break it down step by step.",
    "No worries if that wasn't clear! Let me try explaining it another way.",
    "That's a complex topic. Let me simplify it for you."
  ]
};

// Generate adaptive AI response based on context
export const generateAIResponse = (userMessage, context = {}) => {
  const message = userMessage.toLowerCase();
  const { subject, learningPace = 'beginner', conversationHistory = [] } = context;
  
  // Greeting detection
  if (conversationHistory.length === 0 || 
      message.match(/^(hi|hello|hey|greetings)/)) {
    return getRandomResponse(aiResponses.greeting);
  }
  
  // Subject detection and response
  if (message.includes('math') || message.includes('algebra') || message.includes('geometry')) {
    return getRandomResponse(aiResponses.subjects.mathematics[learningPace]);
  }
  
  if (message.includes('science') || message.includes('physics') || message.includes('chemistry') || message.includes('biology')) {
    return getRandomResponse(aiResponses.subjects.science[learningPace]);
  }
  
  if (message.includes('history') || message.includes('historical')) {
    return getRandomResponse(aiResponses.subjects.history[learningPace]);
  }
  
  if (message.includes('language') || message.includes('english') || message.includes('spanish') || message.includes('french')) {
    return getRandomResponse(aiResponses.subjects.language[learningPace]);
  }
  
  // Question marks indicate need for clarification
  if (message.includes('?') || message.includes('confused') || message.includes('don\'t understand')) {
    const clarification = getRandomResponse(aiResponses.clarification);
    const detailed = getDetailedExplanation(subject, learningPace);
    return `${clarification}\n\n${detailed}`;
  }
  
  // Default encouraging response with subject-specific content
  const encouragement = getRandomResponse(aiResponses.encouragement);
  const subjectResponse = subject && aiResponses.subjects[subject] 
    ? getRandomResponse(aiResponses.subjects[subject][learningPace])
    : "I'm here to help you with any subject. What would you like to learn about?";
  
  return `${encouragement}\n\n${subjectResponse}`;
};

const getRandomResponse = (responses) => {
  return responses[Math.floor(Math.random() * responses.length)];
};

const getDetailedExplanation = (subject, pace) => {
  const explanations = {
    mathematics: {
      beginner: "Let's start with concrete examples. For instance, if we're learning addition, think about adding apples: 2 apples + 3 apples = 5 apples. We can apply this same logic to numbers!",
      intermediate: "Let's connect concepts you already know. Think about how patterns work in everyday life, then apply that same thinking to this problem.",
      advanced: "Consider the underlying principles. How does this concept relate to theories you've already mastered? What patterns do you notice?"
    },
    science: {
      beginner: "Let's relate this to something you see every day. Science explains the world around you - from why the sky is blue to how plants grow!",
      intermediate: "Think about the cause and effect relationships. What happens when we change one variable? How does this connect to other scientific principles?",
      advanced: "Let's analyze the methodology and implications. What experimental evidence supports this theory? How might we test these hypotheses?"
    }
  };
  
  return explanations[subject]?.[pace] || "Let's work through this together, one step at a time. What specific part would you like me to explain?";
};

// Detect learning pace from conversation history
export const detectLearningPace = (conversationHistory, subjectMastery) => {
  if (!conversationHistory || conversationHistory.length < 3) {
    return 'beginner';
  }
  
  // Analyze question complexity and mastery scores
  const avgMastery = Object.values(subjectMastery).reduce((a, b) => a + b, 0) / Object.keys(subjectMastery).length;
  
  if (avgMastery >= 70) return 'advanced';
  if (avgMastery >= 40) return 'intermediate';
  return 'beginner';
};

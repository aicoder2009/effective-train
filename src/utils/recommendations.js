// Generate study recommendations based on progress and weak areas
export const generateRecommendations = (subjectMastery, recentActivity) => {
  const recommendations = [];
  
  // Find subjects that need improvement
  const weakSubjects = Object.entries(subjectMastery)
    .filter(([_, score]) => score < 70)
    .sort((a, b) => a[1] - b[1])
    .slice(0, 2);
  
  if (weakSubjects.length > 0) {
    weakSubjects.forEach(([subject, score]) => {
      recommendations.push({
        type: 'improvement',
        subject,
        title: `Focus on ${capitalizeFirst(subject)}`,
        description: `Your ${subject} mastery is at ${score}%. Let's work on building a stronger foundation!`,
        priority: 'high',
        icon: '🎯'
      });
    });
  }
  
  // Find subjects with good progress
  const strongSubjects = Object.entries(subjectMastery)
    .filter(([_, score]) => score >= 70 && score < 90)
    .slice(0, 1);
  
  if (strongSubjects.length > 0) {
    strongSubjects.forEach(([subject, score]) => {
      recommendations.push({
        type: 'advancement',
        subject,
        title: `Advance Your ${capitalizeFirst(subject)} Skills`,
        description: `You're doing great at ${score}%! Ready for more challenging topics?`,
        priority: 'medium',
        icon: '🚀'
      });
    });
  }
  
  // Check for inactive subjects
  const allSubjects = ['mathematics', 'science', 'history', 'language'];
  const inactiveSubjects = allSubjects.filter(
    subject => !recentActivity.includes(subject)
  ).slice(0, 1);
  
  if (inactiveSubjects.length > 0) {
    inactiveSubjects.forEach(subject => {
      recommendations.push({
        type: 'exploration',
        subject,
        title: `Explore ${capitalizeFirst(subject)}`,
        description: `Haven't studied ${subject} lately? Let's dive in and discover something new!`,
        priority: 'low',
        icon: '🌟'
      });
    });
  }
  
  // Study streak encouragement
  if (recentActivity.length >= 3) {
    recommendations.push({
      type: 'streak',
      subject: 'general',
      title: 'Keep Your Study Streak Going!',
      description: `You've been consistent with your studies. Keep up the momentum!`,
      priority: 'medium',
      icon: '🔥'
    });
  }
  
  return recommendations;
};

const capitalizeFirst = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

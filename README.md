# AI Study Buddy 🎓

AI Study Buddy transforms how students approach learning by combining conversational AI with intuitive UX design. Rather than passive study sessions, students engage with an adaptive study companion that understands their learning pace, subject gaps, and preferred explanation styles—creating a personalized journey toward mastery.

## Features

### 🤖 Conversational AI Tutor
- **Adaptive Learning**: AI automatically adjusts explanations based on your learning pace (beginner, intermediate, advanced)
- **Natural Conversations**: Engage in natural dialogue about any subject
- **Multi-Subject Support**: Mathematics, Science, History, and Language learning
- **Context-Aware Responses**: AI remembers your conversation history and provides relevant follow-ups

### 📊 Visual Progress Dashboard
- **Subject Mastery Tracking**: Monitor your progress across all subjects
- **Real-Time Updates**: See your mastery levels increase as you learn
- **Study Metrics**: Track total study time and maintain study streaks
- **Achievement Badges**: Earn recognition for milestones and consistent effort

### 💡 Personalized Recommendations
- **Smart Suggestions**: Get tailored study recommendations based on your progress
- **Priority-Based**: High-priority suggestions for subjects needing improvement
- **Exploration Prompts**: Discover new topics and keep learning fresh
- **One-Click Action**: Start studying recommended topics instantly

### ♿ Accessibility & Responsive Design
- **WCAG Compliant**: High contrast ratios and proper color usage
- **Screen Reader Support**: Full ARIA labels and semantic HTML
- **Keyboard Navigation**: Complete keyboard accessibility
- **Responsive Layout**: Works seamlessly on mobile, tablet, and desktop
- **Reduced Motion Support**: Respects user preferences for animations
- **Skip Links**: Quick navigation for assistive technology users

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/aicoder2009/effective-train.git
cd effective-train
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser to `http://localhost:3000`

### Build for Production

```bash
npm run build
```

The production-ready files will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint to check code quality
- `npm run format` - Format code with Prettier

## Technology Stack

- **React 19** - Modern UI library with latest features
- **Vite** - Fast build tool and dev server
- **CSS3** - Custom styling with CSS variables for theming
- **ESLint** - Code quality and consistency
- **Prettier** - Code formatting

## Project Structure

```
effective-train/
├── src/
│   ├── components/          # React components
│   │   ├── ChatInterface.jsx
│   │   ├── ProgressDashboard.jsx
│   │   └── Recommendations.jsx
│   ├── utils/              # Utility functions
│   │   ├── aiLogic.js      # AI response generation
│   │   └── recommendations.js
│   ├── styles/             # Global styles
│   │   └── index.css
│   ├── App.jsx             # Main application component
│   └── main.jsx            # Application entry point
├── index.html              # HTML template
├── vite.config.js          # Vite configuration
└── package.json            # Project dependencies
```

## Key Features Explained

### Adaptive AI Tutor
The AI tutor analyzes your conversation history and subject mastery to determine your learning pace. It then tailors responses to match your level:
- **Beginner**: Simple explanations with real-world examples
- **Intermediate**: Building on known concepts with more depth
- **Advanced**: Complex theories and challenging problems

### Progress Tracking
Your progress is tracked across four main subjects:
- Mathematics (algebra, geometry, calculus, etc.)
- Science (physics, chemistry, biology)
- History (world history, historical analysis)
- Language (grammar, vocabulary, communication)

### Study Recommendations
The recommendation engine analyzes:
- Subjects with mastery below 70% (improvement needed)
- Subjects with 70-90% mastery (ready for advancement)
- Subjects not recently studied (exploration opportunities)
- Study streaks and consistency

## Accessibility Features

- **Semantic HTML**: Proper heading hierarchy and landmark regions
- **ARIA Labels**: Comprehensive labels for interactive elements
- **Focus Management**: Visible focus indicators and logical tab order
- **Color Contrast**: WCAG AA compliant color combinations
- **Screen Reader Text**: Hidden descriptive text for context
- **Keyboard Controls**: Full keyboard navigation support
- **Reduced Motion**: Respects `prefers-reduced-motion` setting
- **High Contrast Mode**: Adapts to `prefers-contrast: high`

## Browser Support

- Chrome/Edge (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the ISC License - see the LICENSE file for details.

## Future Enhancements

- Integration with actual AI services (OpenAI, AWS Bedrock, etc.)
- Persistent storage with user accounts
- More detailed analytics and insights
- Study session scheduling and reminders
- Collaborative learning features
- Export progress reports
- Additional subjects and customizable content

## Support

For questions or issues, please open an issue on GitHub.

---

Made with ❤️ for learners everywhere

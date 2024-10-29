export const CHAT_DATA = [
  {
    id: 1,
    name: 'General',
    description: 'Main chat for general discussions',
    unread: 0,
    lastRead: 3,
    messages: [
      {
        id: 1,
        text: 'Welcome to ChatHub! Here you can discuss various topics with other users.',
        timestamp: new Date('2024-10-27T10:00:00'),
        userId: 'System'
      }
    ],
    responses: {
      default: [
        'Interesting topic!',
        'Tell me more about that...',
        'What does everyone else think?',
        'Thanks for sharing! 👋',
        'That makes sense!'
      ],
      image: [
        'Nice picture! 📸',
        'Great shot! 🎯',
        'Love the composition! 🖼️',
        'Thanks for sharing this image! 👀',
        'Beautiful! 🌟'
      ]
    }
  },
  {
    id: 2,
    name: 'Frontend Dev',
    description: 'React, Angular, Vue and more',
    unread: 2,
    lastRead: 0,
    messages: [
      {
        id: 1,
        text: 'Welcome to Frontend channel! 👋 Feel free to discuss frameworks, UI/UX, and best practices!',
        timestamp: new Date('2024-10-27T10:00:00'),
        userId: 'System'
      },
      {
        id: 2,
        text: 'Just released a new React component library! Check it out: github.com/awesome-components 🎉',
        timestamp: new Date('2024-10-27T10:05:00'),
        userId: 'Alice'
      },
    ],
    responses: {
      default: [
        'Have you tried using a state manager for that? 🤔',
        'Interesting component structure! 🏗️',
        'Which browser support do you need? 🌐',
        'Consider performance implications... ⚡',
        'Check out the latest framework updates! 🆕',
        'Time to refactor that code! 🔄',
        'Maybe add some unit tests? 🧪'
      ],
      image: [
        'Clean UI implementation! 🎨',
        'Nice responsive design! 📱',
        'Great component hierarchy! 🌳',
        'Those animations are smooth! ✨',
        'Pixel perfect! 👌'
      ]
    }
  },
  {
    id: 3,
    name: 'UI/UX Design',
    description: 'Design discussions and showcase',
    unread: 0,
    lastRead: 0,
    messages: [],
    responses: {
      default: [
        'Great attention to user flow! 🌊',
        'How was the user research? 🔍',
        'Love the design thinking! 💭',
        'Did you A/B test this? 📊',
        'Very accessible design! ♿',
        'Clean and intuitive! ✨',
        'Great use of whitespace! 📐'
      ],
      image: [
        'Beautiful color palette! 🎨',
        'Love the typography choices! 📝',
        'Great visual hierarchy! 🏗️',
        'Those micro-interactions! ✨',
        'Very cohesive design system! 🎯'
      ]
    }
  },
  {
    id: 4,
    name: 'Random Bot',
    description: 'Channel with random bot messages',
    unread: 1,
    lastRead: 0,
    messages: [
      {
        id: 1,
        text: 'Bot will be sending random messages here! 🤖',
        timestamp: new Date(),
        userId: 'Bot'
      }
    ],
    responses: {
      default: [
        'Hey, anyone here? 👋',
        'Just checking in! 🌟',
        'Look what I found! 🎉',
        'Did you know? 🤔',
        'Interesting fact: 💡',
        'Time for a random message! 🎲',
        'Beep boop! 🤖',
        'Just bot things... 🔧',
        'Random thought: 💭',
        'Reminder! ⏰'
      ],
      image: [
        'Check this out! 📸',
        'Look at this! 🖼️',
        'Amazing shot! 📷',
        'Beautiful! ✨',
        'Wow! 🎯'
      ]
    }
  },
  {
    id: 5,
    name: 'Gaming Hub',
    description: 'Gaming discussions and news',
    unread: 0,
    lastRead: 0,
    messages: [],
    responses: {
      default: [
        'Epic gameplay! 🎮',
        'What are your PC specs? 💻',
        'Need to try this game! 🎯',
        'Any good mods? 🛠️',
        'GG WP! 🏆',
        'What a save! 💪',
        'Nerf incoming! 😅'
      ],
      image: [
        'Sick gaming setup! 🎮',
        'Nice screenshot! 📸',
        'Epic victory royale! 👑',
        'Those graphics are insane! 🖥️',
        'Max settings FTW! ⚡'
      ]
    }
  },
  {
    id: 6,
    name: 'AI & ML',
    description: 'Artificial Intelligence discussions',
    unread: 0,
    lastRead: 0,
    messages: [],
    responses: {
      default: [
        'Interesting model architecture! 🧠',
        'What about the training data? 📊',
        'Any overfitting issues? 🎯',
        'Have you tried transfer learning? 🔄',
        'The metrics look promising! 📈',
        'What preprocessing did you use? 🔍',
        'GPUs or TPUs? ⚡'
      ],
      image: [
        'Nice confusion matrix! 📊',
        'Interesting loss curves! 📉',
        'Clean visualization! 🎨',
        'Great architecture diagram! 🏗️',
        'Those clusters look good! 🎯'
      ]
    }
  },
  {
    id: 7,
    name: 'Food & Cooking',
    description: 'Share recipes and cooking tips',
    unread: 0,
    lastRead: 0,
    messages: [],
    responses: {
      default: [
        'Looks delicious! 😋',
        'What\'s the secret ingredient? 🤔',
        'Recipe please! 📝',
        'Perfect plating! 👨‍🍳',
        'Making me hungry! 🍽️',
        'Great technique! 🔪',
        'Love this fusion! 🌎'
      ],
      image: [
        'Masterchef material! 👨‍🍳',
        'Beautiful presentation! 🎨',
        'Looks mouth-watering! 😋',
        'Perfect sear! 🔥',
        'Restaurant quality! ⭐'
      ]
    }
  },
  {
    id: 8,
    name: 'Remote Work',
    description: 'WFH tips and discussions',
    unread: 0,
    lastRead: 0,
    messages: [],
    responses: {
      default: [
        'Great productivity hack! ⚡',
        'How\'s your work-life balance? ⚖️',
        'Nice setup! 💻',
        'Which tools do you use? 🛠️',
        'Team communication is key! 🗣️',
        'Time management goals! ⏰',
        'Virtual coffee anyone? ☕'
      ],
      image: [
        'Cozy home office! 🏠',
        'Clean desk setup! 💻',
        'Great ergonomics! 🪑',
        'Nice productivity corner! 📚',
        'Setup goals! ✨'
      ]
    }
  },
  {
    id: 9,
    name: 'Photography',
    description: 'Share and discuss photography',
    unread: 0,
    lastRead: 0,
    messages: [],
    responses: {
      default: [
        'What camera did you use? 📸',
        'Great composition! 🎨',
        'Perfect timing! ⚡',
        'Love the lighting! 💡',
        'What lens? 🔭',
        'RAW or JPEG? 💾',
        'Beautiful colors! 🌈'
      ],
      image: [
        'Amazing composition! 📸',
        'Perfect exposure! ✨',
        'Great depth of field! 🔍',
        'Those colors pop! 🌈',
        'Sharp focus! 🎯'
      ]
    }
  },
];

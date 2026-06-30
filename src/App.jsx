import React, { useState, useEffect } from 'react';
import './App.css';

const APP_STATE_KEY = 'grounded_practice_state';

// Color scheme matching Andrea's brand
const COLORS = {
  plum: '#6B5B95',
  gold: '#C9A66B',
  darkText: '#2C2C2C',
  lightBg: '#F9F7F4',
  lightGray: '#E8E6E2',
  white: '#FFFFFF',
  success: '#6BAA7C',
  warning: '#D4A574'
};

// Complete module data structure with full content for ALL 18 modules
const MODULES_DATA = {
  stuck: [
    {
      id: 1,
      title: "What Gets Us Stuck",
      subtitle: "Understanding Your Patterns",
      duration: "20-30 min",
      description: "Learn what 'stuck' really means and how patterns develop.",
      sections: [
        {
          id: 'intro',
          title: 'Welcome',
          content: 'This module helps you understand how patterns develop and what keeps you feeling stuck. This isn\'t about blame or shame—it\'s about clarity.',
          type: 'text'
        },
        {
          id: 'definition',
          title: 'What Does "Stuck" Mean?',
          content: 'Stuck is a pattern—repeating the same response even though it doesn\'t work. It\'s predictable, understandable, and changeable.',
          type: 'text'
        },
        {
          id: 'cycle',
          title: 'The Stuck Cycle',
          content: 'Every pattern has 4 parts: Trigger → Thought/Feeling → Protective Response → Consequence. Understanding this cycle is key.',
          subsections: [
            { label: 'Trigger', desc: 'What happens that sets it off' },
            { label: 'Thought/Feeling', desc: 'Your mind and body\'s response' },
            { label: 'Protective Response', desc: 'What you do to manage discomfort' },
            { label: 'Consequence', desc: 'What happens next that keeps it going' }
          ],
          type: 'cycle'
        },
        {
          id: 'patterns',
          title: 'Six Common Patterns',
          patterns: [
            {
              name: 'Avoidance',
              shortDesc: 'Staying away from uncomfortable situations',
              costs: 'Opportunities missed, anxiety grows, isolation increases'
            },
            {
              name: 'People-Pleasing',
              shortDesc: 'Prioritizing others\' comfort over your own needs',
              costs: 'Your needs unmet, resentment builds, relationships become transactional'
            },
            {
              name: 'Perfectionism',
              shortDesc: 'Believing perfection will keep you safe',
              costs: 'Burnout, reduced creativity, chronic anxiety'
            },
            {
              name: 'Rumination',
              shortDesc: 'Stuck in worry loops about past or future',
              costs: 'Chronic anxiety, exhaustion, difficulty focusing'
            },
            {
              name: 'Shame Spiral',
              shortDesc: 'Shutting down after mistakes or feeling exposed',
              costs: 'Relationships deteriorate, shame deepens, isolation'
            },
            {
              name: 'Hypervigilance',
              shortDesc: 'Constantly reading others\' emotions and reactions',
              costs: 'Exhaustion, loss of self, relationships feel transactional'
            }
          ],
          type: 'patterns'
        }
      ],
      exercises: [
        {
          id: 'pattern-inventory',
          title: 'Identify Your Pattern',
          prompt: 'Which patterns do you recognize in yourself? Select all that apply.',
          type: 'checkbox',
          options: ['Avoidance', 'People-Pleasing', 'Perfectionism', 'Rumination', 'Shame Spiral', 'Hypervigilance']
        },
        {
          id: 'cycle-map',
          title: 'Map Your Stuck Cycle',
          prompt: 'Think of a situation where you feel stuck. Fill in each part of the cycle:',
          type: 'form',
          fields: [
            { label: 'What triggers it?', name: 'trigger' },
            { label: 'What thought or feeling comes up?', name: 'feeling' },
            { label: 'What\'s your protective response?', name: 'response' },
            { label: 'What\'s the consequence?', name: 'consequence' }
          ]
        },
        {
          id: 'reflection',
          title: 'Reflection',
          prompt: 'How does it feel to understand this isn\'t a character flaw?',
          type: 'journal'
        }
      ]
    },
    {
      id: 2,
      title: "Know Your Nervous System",
      subtitle: "Window of Tolerance & Threat Detection",
      duration: "15-20 min",
      description: "Understand how your nervous system responds to stress.",
      sections: [
        {
          id: 'intro',
          title: 'Your Nervous System Blueprint',
          content: 'Your nervous system is constantly scanning for threat. When it detects danger (real or imagined), it activates survival responses. Understanding this helps you recognize when you\'re triggered and why.',
          type: 'text'
        },
        {
          id: 'window',
          title: 'Window of Tolerance',
          content: 'The "window of tolerance" is the zone where your nervous system feels safe. In this zone, you can think clearly, feel emotionally balanced, and respond to situations effectively. When triggered, you move outside this window into either hyper-arousal (fight/flight) or hypo-arousal (freeze/collapse).',
          type: 'text'
        },
        {
          id: 'responses',
          title: 'Nervous System Responses',
          patterns: [
            {
              name: 'Ventral Vagal (Safe & Social)',
              shortDesc: 'Your window of tolerance - calm, connected, present',
              costs: ''
            },
            {
              name: 'Sympathetic (Fight/Flight)',
              shortDesc: 'Activated response - hyper-aroused, anxious, reactive',
              costs: ''
            },
            {
              name: 'Dorsal Vagal (Freeze/Collapse)',
              shortDesc: 'Shutdown response - numb, disconnected, dissociated',
              costs: ''
            }
          ],
          type: 'patterns'
        }
      ],
      exercises: [
        {
          id: 'window-identification',
          title: 'Identify Your Window',
          prompt: 'What does it feel like when you\'re in your window of tolerance? Describe the sensations in your body.',
          type: 'journal'
        }
      ]
    },
    {
      id: 3,
      title: "Naming Your Story",
      subtitle: "Thoughts, Feelings & Beliefs",
      duration: "18 min",
      description: "Explore the connection between what you think and how you feel.",
      sections: [
        {
          id: 'intro',
          title: 'The Story You Tell Yourself',
          content: 'Your thoughts create your emotional experience. The story you tell about a situation shapes how you feel. By understanding your thoughts, you can change your emotional response.',
          type: 'text'
        },
        {
          id: 'thought-feeling-connection',
          title: 'Thoughts → Feelings → Actions',
          content: 'Your thoughts are not facts. They\'re interpretations of events. When you have a thought like "I\'m not good enough," it triggers feelings of shame or inadequacy, which then influence your actions (avoidance, withdrawal).',
          type: 'text'
        }
      ],
      exercises: [
        {
          id: 'thought-analysis',
          title: 'Notice Your Thoughts',
          prompt: 'What\'s a thought that comes up frequently for you? Write it down and notice what feelings follow.',
          type: 'journal'
        }
      ]
    },
    {
      id: 4,
      title: "The Body's Wisdom",
      subtitle: "Emotions as Information",
      duration: "15 min",
      description: "Learn to recognize what your emotions are telling you.",
      sections: [
        {
          id: 'intro',
          title: 'Your Emotions Are Messages',
          content: 'Emotions aren\'t problems to fix—they\'re information trying to tell you something. Anger might say "My boundary was crossed." Sadness might say "I need to grieve something." Fear might say "I need to prepare."',
          type: 'text'
        },
        {
          id: 'body-scan',
          title: 'Where Do You Feel It?',
          content: 'Emotions live in your body. Anxiety might feel like tightness in your chest. Shame might feel like heat in your face. By noticing where emotions live in your body, you can understand them better.',
          type: 'text'
        }
      ],
      exercises: [
        {
          id: 'emotion-body-map',
          title: 'Map Your Emotions',
          prompt: 'When you feel sad, anxious, or angry, where do you notice it in your body? Be specific.',
          type: 'journal'
        }
      ]
    },
    {
      id: 5,
      title: "Underneath It All",
      subtitle: "Exploring Root Causes",
      duration: "20 min",
      description: "Dig deeper into what drives your patterns.",
      sections: [
        {
          id: 'intro',
          title: 'Why Do You Do What You Do?',
          content: 'Every pattern has a reason. Your protective responses developed for good reason—they once kept you safe. Understanding the origin of your patterns helps you release them with compassion.',
          type: 'text'
        },
        {
          id: 'roots',
          title: 'The Roots of Your Patterns',
          content: 'Patterns often develop from childhood experiences, family dynamics, trauma, or repeated messages you received. They made sense then. The question is: do they still serve you now?',
          type: 'text'
        }
      ],
      exercises: [
        {
          id: 'pattern-origin',
          title: 'Trace Your Pattern',
          prompt: 'Pick one pattern. When did it start? What was it protecting you from?',
          type: 'journal'
        }
      ]
    }
  ],
  transitioning: [
    {
      id: 6,
      title: "Grounding: When You're Overwhelmed",
      subtitle: "Crisis Skills & Present-Moment Grounding",
      duration: "12 min",
      description: "Learn quick techniques to ground yourself when overwhelmed.",
      sections: [
        {
          id: 'intro',
          title: 'Back to Now',
          content: 'When you\'re activated, your nervous system is in past or future. Grounding techniques bring you back to the present moment where you\'re actually safe.',
          type: 'text'
        },
        {
          id: 'techniques',
          title: 'Grounding Techniques',
          patterns: [
            {
              name: '5-4-3-2-1 Sensory',
              shortDesc: 'Notice 5 things you see, 4 you hear, 3 you feel, 2 you smell, 1 you taste',
              costs: ''
            },
            {
              name: 'Cold Water',
              shortDesc: 'Splash cold water on your face or hold ice in your hand',
              costs: ''
            },
            {
              name: 'Bilateral Stimulation',
              shortDesc: 'Tap alternating knees or listen to rhythmic music',
              costs: ''
            }
          ],
          type: 'patterns'
        }
      ],
      exercises: [
        {
          id: 'grounding-practice',
          title: 'Try It Now',
          prompt: 'Use the 5-4-3-2-1 technique right now. What did you notice?',
          type: 'journal'
        }
      ]
    },
    {
      id: 7,
      title: "Pause & Respond",
      subtitle: "Building Your Window of Tolerance",
      duration: "15 min",
      description: "Develop emotional regulation skills.",
      sections: [
        {
          id: 'intro',
          title: 'The Sacred Pause',
          content: 'Between trigger and response, there\'s a space. In that space is your power. The pause allows you to shift from reaction to response.',
          type: 'text'
        },
        {
          id: 'practice',
          title: 'How to Pause',
          content: 'When triggered: 1) Notice the activation, 2) Take 3 deep breaths, 3) Ask yourself "What do I actually need right now?", 4) Choose your response.',
          type: 'text'
        }
      ],
      exercises: [
        {
          id: 'pause-exercise',
          title: 'Practice Pausing',
          prompt: 'Describe a recent situation where you wish you\'d paused. How might it have gone differently?',
          type: 'journal'
        }
      ]
    },
    {
      id: 8,
      title: "Reframing",
      subtitle: "Changing How You Think About Things",
      duration: "18 min",
      description: "Challenge and reframe unhelpful thoughts.",
      sections: [
        {
          id: 'intro',
          title: 'The Power of Perspective',
          content: 'Reframing isn\'t positive thinking. It\'s honest, compassionate thinking. It\'s asking "What else could this mean?" or "What would I tell a friend?"',
          type: 'text'
        },
        {
          id: 'examples',
          title: 'Reframing Examples',
          content: 'Instead of "I failed," try "I learned something." Instead of "Nobody likes me," try "I haven\'t found my people yet." Instead of "I\'m broken," try "I\'m healing."',
          type: 'text'
        }
      ],
      exercises: [
        {
          id: 'reframe-thought',
          title: 'Reframe a Thought',
          prompt: 'Write down a limiting belief you have. Now reframe it with compassion.',
          type: 'journal'
        }
      ]
    },
    {
      id: 9,
      title: "Values Clarification",
      subtitle: "What Actually Matters to You",
      duration: "15 min",
      description: "Identify your core values and what drives you.",
      sections: [
        {
          id: 'intro',
          title: 'Living On Purpose',
          content: 'Your values are your compass. When you live aligned with your values, life feels meaningful. When you don\'t, you feel empty regardless of success.',
          type: 'text'
        },
        {
          id: 'reflection',
          title: 'Core Values',
          content: 'Common values include: connection, creativity, growth, authenticity, kindness, courage, freedom, security, justice, beauty, spirituality, contribution.',
          type: 'text'
        }
      ],
      exercises: [
        {
          id: 'values-exercise',
          title: 'Identify Your Top 3 Values',
          prompt: 'What 3 values matter most to you? How are you living them (or not) right now?',
          type: 'journal'
        }
      ]
    },
    {
      id: 10,
      title: "Communication That Connects",
      subtitle: "Speaking Your Truth",
      duration: "18 min",
      description: "Build assertive communication skills.",
      sections: [
        {
          id: 'intro',
          title: 'Honest Connection',
          content: 'Assertive communication isn\'t aggressive. It\'s honest, respectful, and direct. It\'s saying what you need without diminishing others.',
          type: 'text'
        },
        {
          id: 'formula',
          title: 'The Communication Formula',
          content: 'Try: "I feel [emotion] when [situation]. I need [request]." Example: "I feel unheard in our conversations. I need you to ask me questions about my day."',
          type: 'text'
        }
      ],
      exercises: [
        {
          id: 'communication-practice',
          title: 'Practice Speaking Up',
          prompt: 'Is there something you need to communicate to someone? Write it using the formula.',
          type: 'journal'
        }
      ]
    },
    {
      id: 11,
      title: "Managing Worry & Rumination",
      subtitle: "Breaking Free from Thought Loops",
      duration: "18 min",
      description: "Tools for managing excessive worry.",
      sections: [
        {
          id: 'intro',
          title: 'Stuck in Your Head',
          content: 'Rumination is replaying the past. Worry is obsessing about the future. Both keep you stuck in your nervous system\'s threat-detection mode.',
          type: 'text'
        },
        {
          id: 'tools',
          title: 'Breaking the Loop',
          content: 'Techniques: 1) Label it ("I\'m ruminating"), 2) Ground yourself physically, 3) Ask "Is this helpful?", 4) Return attention to the present moment.',
          type: 'text'
        }
      ],
      exercises: [
        {
          id: 'worry-management',
          title: 'Name Your Worry Patterns',
          prompt: 'What do you tend to worry or ruminate about? When does it happen most?',
          type: 'journal'
        }
      ]
    },
    {
      id: 12,
      title: "Building Self-Compassion",
      subtitle: "Kindness Toward Yourself",
      duration: "15 min",
      description: "Reduce self-criticism and build compassion.",
      sections: [
        {
          id: 'intro',
          title: 'The Inner Critic',
          content: 'Most of us have a harsh inner critic. But that critic doesn\'t help us grow—it makes us smaller. Self-compassion is a more effective path to change.',
          type: 'text'
        },
        {
          id: 'practice',
          title: 'Self-Compassion Practice',
          content: '1) Notice your suffering ("This is hard"), 2) Recognize it\'s human ("Others struggle too"), 3) Speak to yourself as you would a dear friend.',
          type: 'text'
        }
      ],
      exercises: [
        {
          id: 'compassion-exercise',
          title: 'Talk to Yourself with Kindness',
          prompt: 'What would you say to a friend going through what you\'re going through? Say that to yourself.',
          type: 'journal'
        }
      ]
    },
    {
      id: 13,
      title: "Parts Work Basics",
      subtitle: "Understanding Your Inner Voices",
      duration: "20 min",
      description: "Introduction to Internal Family Systems concepts.",
      sections: [
        {
          id: 'intro',
          title: 'You Are Not Monolithic',
          content: 'You have many parts: the protector, the inner child, the perfectionist, the rebel. They all developed for good reasons. The goal is harmony, not getting rid of parts.',
          type: 'text'
        },
        {
          id: 'examples',
          title: 'Meet Your Parts',
          content: 'The Protector tries to keep you safe through avoidance. The Pleaser wants connection through compliance. The Perfectionist believes control equals safety. Each has wisdom.',
          type: 'text'
        }
      ],
      exercises: [
        {
          id: 'parts-inventory',
          title: 'Identify Your Parts',
          prompt: 'What parts of you can you identify? What does each one care about? What is each one afraid of?',
          type: 'journal'
        }
      ]
    }
  ],
  resourced: [
    {
      id: 14,
      title: "Real-Life Application",
      subtitle: "Using Your Skills When It Matters",
      duration: "18 min",
      description: "Practice applying skills in real-world situations.",
      sections: [
        {
          id: 'intro',
          title: 'From Theory to Life',
          content: 'Skills only matter when you actually use them. Real transformation happens when you apply these tools in your daily life, especially in challenging moments.',
          type: 'text'
        },
        {
          id: 'scenarios',
          title: 'Practice Scenarios',
          content: 'Think of your most challenging situations: conflicts, rejection, failure, overwhelm. How could you apply grounding, reframing, values alignment, or self-compassion?',
          type: 'text'
        }
      ],
      exercises: [
        {
          id: 'scenario-planning',
          title: 'Plan Your Response',
          prompt: 'Describe a challenging situation you face. How will you handle it differently with your new skills?',
          type: 'journal'
        }
      ]
    },
    {
      id: 15,
      title: "Sustaining Change",
      subtitle: "Making It Stick",
      duration: "15 min",
      description: "Build a maintenance plan for long-term success.",
      sections: [
        {
          id: 'intro',
          title: 'The Real Work Starts Now',
          content: 'Learning these skills is step one. Integration is step two. You\'ll backslide. You\'ll forget. That\'s normal. Consistency over perfection is what builds lasting change.',
          type: 'text'
        },
        {
          id: 'maintenance',
          title: 'Your Maintenance Plan',
          content: 'Daily practices (meditation, grounding), weekly check-ins, monthly reviews, and community support all strengthen your new neural pathways.',
          type: 'text'
        }
      ],
      exercises: [
        {
          id: 'sustainability-plan',
          title: 'Create Your Practice Plan',
          prompt: 'What daily practice will you commit to? What support do you need? How will you handle setbacks?',
          type: 'journal'
        }
      ]
    },
    {
      id: 16,
      title: "Navigating Relationships",
      subtitle: "From a Resourced Place",
      duration: "18 min",
      description: "Apply skills in your relationships.",
      sections: [
        {
          id: 'intro',
          title: 'Relationships as Practice',
          content: 'Your relationships are the ultimate classroom. They reveal your patterns, trigger your wounds, and offer opportunities to practice new responses.',
          type: 'text'
        },
        {
          id: 'healthy-relationships',
          title: 'What Healthy Looks Like',
          content: 'Healthy relationships have: clear boundaries, honest communication, repair after conflict, mutual respect, and space for both people to be authentic.',
          type: 'text'
        }
      ],
      exercises: [
        {
          id: 'relationship-assessment',
          title: 'Assess Your Relationships',
          prompt: 'In your closest relationships, where do you lose yourself? Where do you stand firm in your boundaries?',
          type: 'journal'
        }
      ]
    },
    {
      id: 17,
      title: "Working with Grief & Loss",
      subtitle: "Processing Life Changes",
      duration: "18 min",
      description: "Navigate grief and loss with compassion.",
      sections: [
        {
          id: 'intro',
          title: 'Grief Is Love',
          content: 'Grief isn\'t just about death. It\'s about any loss: relationships ending, dreams changing, identities shifting, time passing. Grief is how we honor what mattered.',
          type: 'text'
        },
        {
          id: 'stages',
          title: 'Moving Through Grief',
          content: 'Grief isn\'t linear. You might experience denial, anger, bargaining, sadness, acceptance—sometimes all in one day. There\'s no "right way" to grieve.',
          type: 'text'
        }
      ],
      exercises: [
        {
          id: 'grief-work',
          title: 'Honor Your Losses',
          prompt: 'What loss are you carrying? How can you honor it? What does grieving it look like?',
          type: 'journal'
        }
      ]
    },
    {
      id: 18,
      title: "Your Resilience Plan",
      subtitle: "Creating Sustainable Wellbeing",
      duration: "20 min",
      description: "Build your complete resilience blueprint.",
      sections: [
        {
          id: 'intro',
          title: 'You\'ve Got This',
          content: 'You\'ve learned the tools. Now you create your blueprint for resilience. This is YOUR plan, designed for YOUR life, based on YOUR wisdom.',
          type: 'text'
        },
        {
          id: 'blueprint',
          title: 'Your Resilience Blueprint',
          content: 'Your plan includes: grounding practices, people who support you, activities that fill your cup, values to guide you, and self-compassion for the difficult days.',
          type: 'text'
        }
      ],
      exercises: [
        {
          id: 'resilience-blueprint',
          title: 'Build Your Blueprint',
          prompt: 'Create your complete resilience plan. Include daily practices, weekly commitments, your support network, and your non-negotiables.',
          type: 'journal'
        }
      ]
    }
  ]
};

// Main App Component
export default function App() {
  const [state, setState] = useState(() => {
    const saved = localStorage.getItem(APP_STATE_KEY);
    return saved ? JSON.parse(saved) : {
      currentView: 'home',
      completedModules: [],
      modulesInProgress: {},
      userResponses: {},
      currentModuleId: null,
      currentSectionIndex: 0
    };
  });

  useEffect(() => {
    localStorage.setItem(APP_STATE_KEY, JSON.stringify(state));
  }, [state]);

  const getModule = (moduleId) => {
    for (const phase in MODULES_DATA) {
      const found = MODULES_DATA[phase].find(m => m.id === moduleId);
      if (found) return found;
    }
    return null;
  };

  const handleStartModule = (moduleId) => {
    setState(prev => ({
      ...prev,
      currentView: 'module',
      currentModuleId: moduleId,
      currentSectionIndex: 0,
      modulesInProgress: {
        ...prev.modulesInProgress,
        [moduleId]: true
      }
    }));
  };

  const handleCompleteModule = () => {
    setState(prev => ({
      ...prev,
      completedModules: [...new Set([...prev.completedModules, prev.currentModuleId])],
      currentView: 'home'
    }));
  };

  const handleSaveResponse = (exerciseId, response) => {
    setState(prev => ({
      ...prev,
      userResponses: {
        ...prev.userResponses,
        [prev.currentModuleId]: {
          ...prev.userResponses[prev.currentModuleId],
          [exerciseId]: response
        }
      }
    }));
  };

  return (
    <div className="app">
      <Header />
      {state.currentView === 'home' && <HomePage state={state} onSelectModule={handleStartModule} />}
      {state.currentView === 'module' && (
        <ModuleView
          module={getModule(state.currentModuleId)}
          onComplete={handleCompleteModule}
          onBack={() => setState(prev => ({ ...prev, currentView: 'home' }))}
          onSaveResponse={handleSaveResponse}
          savedResponses={state.userResponses[state.currentModuleId] || {}}
        />
      )}
    </div>
  );
}

// Header Component
function Header() {
  return (
    <header className="header">
      <div className="header-content">
        <h1 className="header-title">The Grounded Practice</h1>
        <p className="header-subtitle">Stuck to Resourced: Your Skills Journey</p>
      </div>
    </header>
  );
}

// Home Page with Phase Progress
function HomePage({ state, onSelectModule }) {
  const phases = [
    { key: 'stuck', label: 'Phase 1: Stuck', color: '#D4A574', modules: MODULES_DATA.stuck },
    { key: 'transitioning', label: 'Phase 2: Transitioning', color: '#9B8BA0', modules: MODULES_DATA.transitioning },
    { key: 'resourced', label: 'Phase 3: Resourced', color: '#6BAA7C', modules: MODULES_DATA.resourced }
  ];

  const getProgressPercent = (modules) => {
    if (!modules.length) return 0;
    const completed = modules.filter(m => state.completedModules.includes(m.id)).length;
    return Math.round((completed / modules.length) * 100);
  };

  return (
    <main className="home-page">
      <section className="intro-section">
        <h2>Welcome Back</h2>
        <p>Your journey from stuck to resourced happens one skill at a time. Choose a phase below to continue.</p>
      </section>

      <section className="phases-container">
        {phases.map(phase => (
          <PhaseSection
            key={phase.key}
            phase={phase}
            progress={getProgressPercent(phase.modules)}
            completedCount={phase.modules.filter(m => state.completedModules.includes(m.id)).length}
            totalCount={phase.modules.length}
            onSelectModule={onSelectModule}
            completedModules={state.completedModules}
          />
        ))}
      </section>

      <section className="overall-progress">
        <h3>Your Overall Progress</h3>
        <ProgressBar
          completed={state.completedModules.length}
          total={18}
          color={COLORS.plum}
        />
        <p className="progress-text">{state.completedModules.length} of 18 modules complete</p>
      </section>
    </main>
  );
}

// Phase Section Component
function PhaseSection({ phase, progress, completedCount, totalCount, onSelectModule, completedModules }) {
  return (
    <section className="phase-section" style={{ borderLeftColor: phase.color }}>
      <div className="phase-header">
        <h3 style={{ color: phase.color }}>{phase.label}</h3>
        <div className="phase-stats">
          <span className="completion">{completedCount}/{totalCount}</span>
        </div>
      </div>

      <ProgressBar completed={completedCount} total={totalCount} color={phase.color} />

      <div className="modules-list">
        {phase.modules.map(module => (
          <ModuleCard
            key={module.id}
            module={module}
            isCompleted={completedModules.includes(module.id)}
            onSelect={() => onSelectModule(module.id)}
          />
        ))}
      </div>
    </section>
  );
}

// Module Card Component
function ModuleCard({ module, isCompleted, onSelect }) {
  return (
    <button
      className={`module-card ${isCompleted ? 'completed' : ''}`}
      onClick={onSelect}
      style={isCompleted ? { borderLeftColor: COLORS.success } : {}}
    >
      <div className="module-card-header">
        <h4>{module.title}</h4>
        {isCompleted && <span className="badge-completed">✓ Complete</span>}
      </div>
      <p className="module-subtitle">{module.subtitle}</p>
      <p className="module-description">{module.description}</p>
      <p className="module-duration">⏱ {module.duration}</p>
    </button>
  );
}

// Progress Bar Component
function ProgressBar({ completed, total, color }) {
  const percentage = (completed / total) * 100;
  return (
    <div className="progress-bar-container">
      <div className="progress-bar-background">
        <div
          className="progress-bar-fill"
          style={{ width: `${percentage}%`, backgroundColor: color }}
        />
      </div>
    </div>
  );
}

// Module View Component
function ModuleView({ module, onComplete, onBack, onSaveResponse, savedResponses }) {
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);

  if (!module) return null;

  const currentSection = module.sections?.[currentSectionIndex];
  const isLastSection = currentSectionIndex === (module.sections?.length - 1);

  const handleNext = () => {
    if (isLastSection) {
      onComplete();
    } else {
      setCurrentSectionIndex(prev => prev + 1);
    }
  };

  return (
    <main className="module-view">
      <div className="module-header-bar">
        <button className="btn-back" onClick={onBack}>← Back</button>
        <div className="module-progress">
          {currentSectionIndex + 1} / {module.sections?.length || 0}
        </div>
      </div>

      <div className="module-content">
        <div className="module-title-section">
          <h2 style={{ color: COLORS.plum }}>{module.title}</h2>
          <p className="module-subtitle">{module.subtitle}</p>
        </div>

        {currentSection && (
          <Section
            section={currentSection}
            onSaveResponse={onSaveResponse}
            savedResponses={savedResponses}
          />
        )}

        {module.exercises && currentSection?.id === 'intro' && (
          <ExercisesPreview exercises={module.exercises} />
        )}
      </div>

      <div className="module-navigation">
        <button
          className="btn-primary"
          onClick={handleNext}
        >
          {isLastSection ? 'Complete Module' : 'Next Section'}
        </button>
      </div>
    </main>
  );
}

// Section Component
function Section({ section, onSaveResponse, savedResponses }) {
  if (section.type === 'text') {
    return (
      <div className="section">
        <h3 style={{ color: COLORS.plum }}>{section.title}</h3>
        <p className="section-content">{section.content}</p>
      </div>
    );
  }

  if (section.type === 'cycle') {
    return (
      <div className="section">
        <h3 style={{ color: COLORS.plum }}>{section.title}</h3>
        <p className="section-content">{section.content}</p>
        <div className="cycle-diagram">
          {section.subsections?.map((item, index) => (
            <div key={index} className="cycle-item">
              <div className="cycle-label" style={{ backgroundColor: COLORS.plum, color: COLORS.white }}>
                {item.label}
              </div>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (section.type === 'patterns') {
    return (
      <div className="section">
        <h3 style={{ color: COLORS.plum }}>{section.title}</h3>
        <div className="patterns-grid">
          {section.patterns?.map((pattern, index) => (
            <div key={index} className="pattern-card">
              <h4 style={{ color: COLORS.gold }}>{pattern.name}</h4>
              <p className="pattern-desc">{pattern.shortDesc}</p>
              {pattern.costs && <p className="pattern-cost"><strong>Cost:</strong> {pattern.costs}</p>}
            </div>
          ))}
        </div>
      </div>
    );
  }

  return null;
}

// Exercises Preview Component
function ExercisesPreview({ exercises }) {
  return (
    <div className="exercises-section">
      <h3 style={{ color: COLORS.plum }}>Exercises in This Module</h3>
      <div className="exercises-list">
        {exercises?.map(exercise => (
          <div key={exercise.id} className="exercise-preview">
            <h4>{exercise.title}</h4>
            <p>{exercise.prompt}</p>
          </div>
        ))}
      </div>
      <p className="exercises-note">Complete the exercises below as you work through the module.</p>
    </div>
  );
}

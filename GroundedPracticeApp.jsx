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

// Complete module data structure
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
      description: "Understand how your nervous system responds to stress."
    },
    {
      id: 3,
      title: "Naming Your Story",
      subtitle: "Thoughts, Feelings & Beliefs",
      duration: "18 min",
      description: "Explore the connection between what you think and how you feel."
    },
    {
      id: 4,
      title: "The Body's Wisdom",
      subtitle: "Emotions as Information",
      duration: "15 min",
      description: "Learn to recognize what your emotions are telling you."
    },
    {
      id: 5,
      title: "Underneath It All",
      subtitle: "Exploring Root Causes",
      duration: "20 min",
      description: "Dig deeper into what drives your patterns."
    }
  ],
  transitioning: [
    {
      id: 6,
      title: "Grounding: When You're Overwhelmed",
      subtitle: "Crisis Skills & Present-Moment Grounding",
      duration: "12 min",
      description: "Learn quick techniques to ground yourself when overwhelmed."
    },
    {
      id: 7,
      title: "Pause & Respond",
      subtitle: "Building Your Window of Tolerance",
      duration: "15 min",
      description: "Develop emotional regulation skills."
    },
    {
      id: 8,
      title: "Reframing",
      subtitle: "Changing How You Think About Things",
      duration: "18 min",
      description: "Challenge and reframe unhelpful thoughts."
    },
    {
      id: 9,
      title: "Values Clarification",
      subtitle: "What Actually Matters to You",
      duration: "15 min",
      description: "Identify your core values and what drives you."
    },
    {
      id: 10,
      title: "Communication That Connects",
      subtitle: "Speaking Your Truth",
      duration: "18 min",
      description: "Build assertive communication skills."
    },
    {
      id: 11,
      title: "Managing Worry & Rumination",
      subtitle: "Breaking Free from Thought Loops",
      duration: "18 min",
      description: "Tools for managing excessive worry."
    },
    {
      id: 12,
      title: "Building Self-Compassion",
      subtitle: "Kindness Toward Yourself",
      duration: "15 min",
      description: "Reduce self-criticism and build compassion."
    },
    {
      id: 13,
      title: "Parts Work Basics",
      subtitle: "Understanding Your Inner Voices",
      duration: "20 min",
      description: "Introduction to Internal Family Systems concepts."
    }
  ],
  resourced: [
    {
      id: 14,
      title: "Real-Life Application",
      subtitle: "Using Your Skills When It Matters",
      duration: "18 min",
      description: "Practice applying skills in real-world situations."
    },
    {
      id: 15,
      title: "Sustaining Change",
      subtitle: "Making It Stick",
      duration: "15 min",
      description: "Build a maintenance plan for long-term success."
    },
    {
      id: 16,
      title: "Navigating Relationships",
      subtitle: "From a Resourced Place",
      duration: "18 min",
      description: "Apply skills in your relationships."
    },
    {
      id: 17,
      title: "Working with Grief & Loss",
      subtitle: "Processing Life Changes",
      duration: "18 min",
      description: "Navigate grief and loss with compassion."
    },
    {
      id: 18,
      title: "Your Resilience Plan",
      subtitle: "Creating Sustainable Wellbeing",
      duration: "20 min",
      description: "Build your complete resilience blueprint."
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
              <p className="pattern-cost"><strong>Cost:</strong> {pattern.costs}</p>
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

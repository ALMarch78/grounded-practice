import React, { useState } from 'react';
import './Worksheets.css';

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

// Module 1: Pattern Mapping Worksheet
export function PatternMappingWorksheet({ moduleId, savedResponses, onSave }) {
  const [responses, setResponses] = useState(savedResponses || {});

  const handleChange = (field, value) => {
    const updated = { ...responses, [field]: value };
    setResponses(updated);
    onSave(updated);
  };

  return (
    <div className="worksheet">
      <h3 style={{ color: COLORS.plum }}>Your Stuck Cycle Map</h3>
      <p className="worksheet-intro">Identify a situation where you feel stuck and map out your cycle.</p>

      <div className="cycle-input-grid">
        <div className="cycle-input">
          <label>🎯 TRIGGER</label>
          <p className="hint">What situation sets it off?</p>
          <textarea
            value={responses.trigger || ''}
            onChange={(e) => handleChange('trigger', e.target.value)}
            placeholder="Example: My partner doesn't text back for hours..."
          />
        </div>

        <div className="arrow">↓</div>

        <div className="cycle-input">
          <label>💭 THOUGHT/FEELING</label>
          <p className="hint">What goes through your mind? What do you feel?</p>
          <textarea
            value={responses.feeling || ''}
            onChange={(e) => handleChange('feeling', e.target.value)}
            placeholder="Example: They're upset with me... I'm not important to them... anxiety, worry"
          />
        </div>

        <div className="arrow">↓</div>

        <div className="cycle-input">
          <label>🛡️ PROTECTIVE RESPONSE</label>
          <p className="hint">What do you do to manage the discomfort?</p>
          <textarea
            value={responses.response || ''}
            onChange={(e) => handleChange('response', e.target.value)}
            placeholder="Example: I check my phone constantly, draft and delete messages, avoid making plans"
          />
        </div>

        <div className="arrow">↓</div>

        <div className="cycle-input">
          <label>📊 CONSEQUENCE</label>
          <p className="hint">What happens next that keeps the cycle going?</p>
          <textarea
            value={responses.consequence || ''}
            onChange={(e) => handleChange('consequence', e.target.value)}
            placeholder="Example: I'm exhausted from checking. When they finally text, I'm irritable. Or I push them away."
          />
        </div>
      </div>

      <div className="worksheet-reflection">
        <h4>💡 Insight</h4>
        <textarea
          value={responses.insight || ''}
          onChange={(e) => handleChange('insight', e.target.value)}
          placeholder="How does understanding this cycle change how you see yourself? What would it look like to break this cycle?"
          className="reflection-large"
        />
      </div>

      <div className="worksheet-progress">
        <p style={{ color: COLORS.success }}>✓ Your response has been saved</p>
      </div>
    </div>
  );
}

// Module 2: Nervous System Awareness Worksheet
export function NervousSystemWorksheet({ moduleId, savedResponses, onSave }) {
  const [responses, setResponses] = useState(savedResponses || {});

  const handleChange = (field, value) => {
    const updated = { ...responses, [field]: value };
    setResponses(updated);
    onSave(updated);
  };

  const states = [
    {
      name: 'Ventral Vagal (Safe & Social)',
      color: COLORS.success,
      prompt: 'When I feel safe, I notice...'
    },
    {
      name: 'Sympathetic (Fight/Flight)',
      color: COLORS.warning,
      prompt: 'When I\'m activated/anxious, I notice...'
    },
    {
      name: 'Dorsal Vagal (Freeze/Collapse)',
      color: '#6B5B95',
      prompt: 'When I shut down, I notice...'
    }
  ];

  return (
    <div className="worksheet">
      <h3 style={{ color: COLORS.plum }}>Your Nervous System States</h3>
      <p className="worksheet-intro">Describe what each state feels like in YOUR body.</p>

      <div className="nervous-system-grid">
        {states.map((state, index) => (
          <div key={index} className="nervous-system-card" style={{ borderLeftColor: state.color }}>
            <h4 style={{ color: state.color }}>{state.name}</h4>
            <p className="system-prompt">{state.prompt}</p>
            <textarea
              value={responses[`state_${index}`] || ''}
              onChange={(e) => handleChange(`state_${index}`, e.target.value)}
              placeholder="Physical sensations, emotions, thoughts, behaviors..."
            />
          </div>
        ))}
      </div>

      <div className="worksheet-reflection">
        <h4>💡 Window of Tolerance</h4>
        <p>What helps you STAY in the safe state? What triggers you OUT?</p>
        <textarea
          value={responses.window || ''}
          onChange={(e) => handleChange('window', e.target.value)}
          placeholder="Example: Staying in window: time with loved ones, exercise, boundaries. Pushed out by: criticism, changes, crowds, sensory overload"
          className="reflection-large"
        />
      </div>

      <div className="worksheet-progress">
        <p style={{ color: COLORS.success }}>✓ Your response has been saved</p>
      </div>
    </div>
  );
}

// Module 3: Thought Record Worksheet
export function ThoughtRecordWorksheet({ moduleId, savedResponses, onSave }) {
  const [responses, setResponses] = useState(savedResponses || {});

  const handleChange = (field, value) => {
    const updated = { ...responses, [field]: value };
    setResponses(updated);
    onSave(updated);
  };

  return (
    <div className="worksheet">
      <h3 style={{ color: COLORS.plum }}>Thought Record</h3>
      <p className="worksheet-intro">Challenge and reframe an unhelpful thought.</p>

      <div className="thought-record">
        <div className="record-row">
          <label>📍 SITUATION</label>
          <textarea
            value={responses.situation || ''}
            onChange={(e) => handleChange('situation', e.target.value)}
            placeholder="What happened?"
          />
        </div>

        <div className="record-row">
          <label>💭 AUTOMATIC THOUGHT</label>
          <textarea
            value={responses.thought || ''}
            onChange={(e) => handleChange('thought', e.target.value)}
            placeholder="What thought popped up? (The one that feels 100% true in the moment)"
          />
        </div>

        <div className="record-row">
          <label>❌ EVIDENCE AGAINST IT</label>
          <textarea
            value={responses.against || ''}
            onChange={(e) => handleChange('against', e.target.value)}
            placeholder="What evidence contradicts this thought? Remember a time this wasn't true?"
          />
        </div>

        <div className="record-row">
          <label>✅ EVIDENCE FOR IT</label>
          <textarea
            value={responses.for || ''}
            onChange={(e) => handleChange('for', e.target.value)}
            placeholder="What evidence seems to support it? (Be honest)"
          />
        </div>

        <div className="record-row">
          <label>🔄 BALANCED THOUGHT</label>
          <textarea
            value={responses.balanced || ''}
            onChange={(e) => handleChange('balanced', e.target.value)}
            placeholder="A more balanced, compassionate way to look at this?"
            className="balanced-input"
          />
        </div>

        <div className="record-row">
          <label>🎯 HOW I FEEL NOW</label>
          <textarea
            value={responses.feelingAfter || ''}
            onChange={(e) => handleChange('feelingAfter', e.target.value)}
            placeholder="What's your emotional intensity now? (0-10)"
          />
        </div>
      </div>

      <div className="worksheet-progress">
        <p style={{ color: COLORS.success }}>✓ Your response has been saved</p>
      </div>
    </div>
  );
}

// Module 4: Body Scan & Emotion Mapping
export function EmotionBodyMapWorksheet({ moduleId, savedResponses, onSave }) {
  const [responses, setResponses] = useState(savedResponses || {});

  const handleChange = (field, value) => {
    const updated = { ...responses, [field]: value };
    setResponses(updated);
    onSave(updated);
  };

  const emotions = ['Joy', 'Sadness', 'Anger', 'Fear', 'Shame', 'Love'];

  return (
    <div className="worksheet">
      <h3 style={{ color: COLORS.plum }}>Where Do You Feel Your Emotions?</h3>
      <p className="worksheet-intro">Emotions live in your body. Notice where.</p>

      <div className="emotion-mapping">
        {emotions.map((emotion) => (
          <div key={emotion} className="emotion-card">
            <h4>{emotion}</h4>
            <textarea
              value={responses[emotion] || ''}
              onChange={(e) => handleChange(emotion, e.target.value)}
              placeholder={`When I feel ${emotion.toLowerCase()}, I notice it in my...`}
            />
          </div>
        ))}
      </div>

      <div className="worksheet-reflection">
        <h4>💡 Body Wisdom</h4>
        <p>Pick one emotion from above. What is it trying to tell you?</p>
        <textarea
          value={responses.wisdom || ''}
          onChange={(e) => handleChange('wisdom', e.target.value)}
          placeholder="Example: My anxiety is telling me I need to prepare. My sadness is inviting me to grieve."
          className="reflection-large"
        />
      </div>

      <div className="worksheet-progress">
        <p style={{ color: COLORS.success }}>✓ Your response has been saved</p>
      </div>
    </div>
  );
}

// Module 9: Values Prioritization Worksheet
export function ValuesPrioritizationWorksheet({ moduleId, savedResponses, onSave }) {
  const [responses, setResponses] = useState(savedResponses || {});

  const handleChange = (field, value) => {
    const updated = { ...responses, [field]: value };
    setResponses(updated);
    onSave(updated);
  };

  const valuesList = [
    'Authenticity', 'Connection', 'Creativity', 'Growth', 'Freedom', 'Security',
    'Kindness', 'Courage', 'Justice', 'Beauty', 'Spirituality', 'Contribution'
  ];

  return (
    <div className="worksheet">
      <h3 style={{ color: COLORS.plum }}>Your Core Values</h3>
      <p className="worksheet-intro">Choose your top 3 values and describe how you're living them.</p>

      <div className="values-selection">
        <p className="selection-hint">Select 3 values that matter most to you:</p>
        <div className="values-grid">
          {valuesList.map((value) => (
            <button
              key={value}
              className={`value-button ${responses.topValues?.includes(value) ? 'selected' : ''}`}
              onClick={() => {
                const topValues = responses.topValues || [];
                if (topValues.includes(value)) {
                  handleChange('topValues', topValues.filter(v => v !== value));
                } else if (topValues.length < 3) {
                  handleChange('topValues', [...topValues, value]);
                }
              }}
            >
              {value}
              {responses.topValues?.includes(value) && <span className="checkmark">✓</span>}
            </button>
          ))}
        </div>
      </div>

      <div className="values-deep-dive">
        {(responses.topValues || []).map((value) => (
          <div key={value} className="value-reflection">
            <h4 style={{ color: COLORS.gold }}>{value}</h4>
            <label>How are you living this value RIGHT NOW?</label>
            <textarea
              value={responses[`${value}_living`] || ''}
              onChange={(e) => handleChange(`${value}_living`, e.target.value)}
              placeholder="Examples in your daily life..."
            />
            <label>Where are you NOT living this value?</label>
            <textarea
              value={responses[`${value}_missing`] || ''}
              onChange={(e) => handleChange(`${value}_missing`, e.target.value)}
              placeholder="Where do you wish you were more..."
            />
          </div>
        ))}
      </div>

      <div className="worksheet-progress">
        <p style={{ color: COLORS.success }}>✓ Your response has been saved</p>
      </div>
    </div>
  );
}

// Module 18: Resilience Plan Worksheet
export function ResiliencePlanWorksheet({ moduleId, savedResponses, onSave }) {
  const [responses, setResponses] = useState(savedResponses || {});

  const handleChange = (field, value) => {
    const updated = { ...responses, [field]: value };
    setResponses(updated);
    onSave(updated);
  };

  return (
    <div className="worksheet">
      <h3 style={{ color: COLORS.plum }}>Your Resilience Blueprint</h3>
      <p className="worksheet-intro">Create your personalized plan for wellbeing.</p>

      <div className="resilience-plan">
        <div className="plan-section">
          <h4 style={{ color: COLORS.gold }}>🌅 Daily Practice</h4>
          <p className="section-hint">What will you do EVERY day?</p>
          <textarea
            value={responses.dailyPractice || ''}
            onChange={(e) => handleChange('dailyPractice', e.target.value)}
            placeholder="Example: 10 min meditation, journaling, grounding exercise, 15 min in nature"
          />
        </div>

        <div className="plan-section">
          <h4 style={{ color: COLORS.gold }}>🤝 Your Support Network</h4>
          <p className="section-hint">Who can you turn to? (Therapist, friend, family, support group)</p>
          <textarea
            value={responses.support || ''}
            onChange={(e) => handleChange('support', e.target.value)}
            placeholder="Names, roles, how to reach them..."
          />
        </div>

        <div className="plan-section">
          <h4 style={{ color: COLORS.gold }}>⛽ What Fills Your Cup?</h4>
          <p className="section-hint">Activities that restore energy and joy</p>
          <textarea
            value={responses.fillsCup || ''}
            onChange={(e) => handleChange('fillsCup', e.target.value)}
            placeholder="Creative projects, time in nature, time with loved ones, solitude, movement, etc."
          />
        </div>

        <div className="plan-section">
          <h4 style={{ color: COLORS.gold }}>⚠️ Early Warning Signs</h4>
          <p className="section-hint">How do you know when you're sliding back into old patterns?</p>
          <textarea
            value={responses.warnings || ''}
            onChange={(e) => handleChange('warnings', e.target.value)}
            placeholder="Sleep changes, withdrawal, irritability, perfectionism creeping back, etc."
          />
        </div>

        <div className="plan-section">
          <h4 style={{ color: COLORS.gold }}>🆘 Crisis Protocol</h4>
          <p className="section-hint">What will you do if you're in crisis?</p>
          <textarea
            value={responses.crisis || ''}
            onChange={(e) => handleChange('crisis', e.target.value)}
            placeholder="Hotline numbers, trusted person to call, grounding exercises, safe place to go"
          />
        </div>

        <div className="plan-section">
          <h4 style={{ color: COLORS.gold }}>📅 Monthly Check-In</h4>
          <p className="section-hint">How will you review and adjust your plan?</p>
          <textarea
            value={responses.checkIn || ''}
            onChange={(e) => handleChange('checkIn', e.target.value)}
            placeholder="First Sunday of each month, journaling, with therapist, etc."
          />
        </div>
      </div>

      <div className="plan-closing">
        <h4 style={{ color: COLORS.plum }}>💪 Your Commitment</h4>
        <textarea
          value={responses.commitment || ''}
          onChange={(e) => handleChange('commitment', e.target.value)}
          placeholder="Write a personal commitment to yourself about following this plan..."
          className="reflection-large"
        />
      </div>

      <div className="worksheet-progress">
        <p style={{ color: COLORS.success }}>✓ Your response has been saved</p>
      </div>
    </div>
  );
}

// Export all worksheets as a map by module ID
export const WORKSHEETS_BY_MODULE = {
  1: PatternMappingWorksheet,
  2: NervousSystemWorksheet,
  3: ThoughtRecordWorksheet,
  4: EmotionBodyMapWorksheet,
  9: ValuesPrioritizationWorksheet,
  18: ResiliencePlanWorksheet
};

// Generic worksheet renderer
export function WorksheetRenderer({ moduleId, savedResponses, onSave }) {
  const WorksheetComponent = WORKSHEETS_BY_MODULE[moduleId];

  if (!WorksheetComponent) {
    return null; // No worksheet for this module
  }

  return <WorksheetComponent moduleId={moduleId} savedResponses={savedResponses} onSave={onSave} />;
}

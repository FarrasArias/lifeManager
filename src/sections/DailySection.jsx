import { Card, P, Ul, Li } from '../components/shared';
import { MONO } from '../constants/sections';

const SCHEDULE = [
  { time: '7:00 AM', activity: 'Wake up — same time daily', tag: 'Routine' },
  { time: '7:05',   activity: 'Hydrate: large glass of water', tag: 'Diet' },
  { time: '7:15',   activity: 'Physio stretches & mobility (cervical + foot + sciatica daily program, ~15 min)', tag: 'Recovery' },
  { time: '7:30',   activity: 'Breakfast: oatmeal, banana, shake (protein + creatine), PB toast', tag: 'Diet' },
  { time: '8:00',   activity: 'Psyllium husk in water', tag: 'Stool' },
  { time: '8:30',   activity: 'Work begins — posture check, screen at eye level', tag: 'Ergonomics' },
  { time: 'Every 30 min', activity: 'Stand up, walk 2 minutes (set timer)', tag: 'Sciatica' },
  { time: '12:30 PM', activity: 'Lunch from meal prep (or ramen on ramen day)', tag: 'Diet' },
  { time: '1:00',   activity: 'Short walk — 15 min, flat ground', tag: 'Cardio' },
  { time: '5:30',   activity: 'Gym session (4×/week) — warm-up, main workout, core', tag: 'Training' },
  { time: '6:45',   activity: 'Post-gym: walk home or light cool-down', tag: 'Recovery' },
  { time: '7:00',   activity: 'Dinner from meal prep + psyllium husk in water', tag: 'Diet' },
  { time: '8:00',   activity: 'Hobby time (cubing, music, games — with elbow breaks)', tag: 'Life' },
  { time: '10:00',  activity: 'No more food. Wind-down: dim lights, no intense screens', tag: 'Sleep' },
  { time: '10:30',  activity: 'Physio evening stretches if prescribed. Brain dump journaling (3 min)', tag: 'Recovery' },
  { time: '11:00',  activity: 'Bed — B99 audio or soundscape. Sleep timer 60 min', tag: 'Sleep' },
];

const TAG_COLORS = {
  Routine: '#dde8ff', Diet: '#8877fc', Recovery: '#56fcd8', Stool: '#8877fc',
  Ergonomics: '#56d6fc', Sciatica: '#56fcd8', Cardio: '#56fcd8',
  Training: '#56d6fc', Life: '#56fcc2', Sleep: '#aa88ff',
};

export default function DailySection() {
  return (
    <>
      <Card title="Template Day — Training Day" color="#56fcc2">
        <P>This is your ideal training day. Non-training days: replace the 5:30 PM gym slot with hobby time, a longer walk, or rest. Everything else stays the same.</P>
        <div style={{ marginTop: 12 }}>
          {SCHEDULE.map((s, i) => (
            <div key={i} style={{ display: 'flex', gap: 16, padding: '10px 0', borderBottom: i < SCHEDULE.length - 1 ? '1px solid #141828' : 'none', alignItems: 'flex-start' }}>
              <div style={{ fontFamily: MONO, fontSize: 12, color: '#3a4a6a', minWidth: 80, paddingTop: 2 }}>{s.time}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, color: '#a0b0cc', marginBottom: 4 }}>{s.activity}</div>
                <span style={{ fontSize: 11, fontFamily: MONO, color: TAG_COLORS[s.tag] || '#3a4a6a', background: '#0a0d16', padding: '1px 8px', borderRadius: 2 }}>{s.tag}</span>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card title="Weekly Structure" color="#56fcc2">
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13, fontFamily: MONO }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #1e2640' }}>
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(d => (
                  <th key={d} style={{ padding: '8px 6px', color: '#3a4a6a', fontWeight: 400, textAlign: 'center' }}>{d}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid #141828' }}>
                {[
                  { text: 'Push + Core', color: '#56d6fc' },
                  { text: 'Rest / Walk', color: '#6a7a9c' },
                  { text: 'Pull + Core', color: '#56d6fc' },
                  { text: 'Rest / Walk', color: '#6a7a9c' },
                  { text: 'Legs + Core', color: '#56d6fc' },
                  { text: 'Glutes + Core', color: '#56d6fc' },
                  { text: 'Full Rest', color: '#6a7a9c' },
                ].map((d, i) => (
                  <td key={i} style={{ padding: '10px 6px', textAlign: 'center', color: d.color, fontSize: 11 }}>{d.text}</td>
                ))}
              </tr>
              <tr>
                {['Physio daily', 'Physio daily', 'Meal prep', 'Physio daily', 'Physio daily', 'Physio daily', 'Meal prep'].map((d, i) => (
                  <td key={i} style={{ padding: '6px', textAlign: 'center', color: '#56fcd8', fontSize: 10 }}>{d}</td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
        <P style={{ marginTop: 12 }}>Ramen day: any day — adjust other meals to be lighter. Rest days are still active recovery (walking + physio). Never skip physio on rest days — that's when it matters most.</P>
      </Card>

      <Card title="Monthly Check-Ins" color="#56fcc2">
        <P>Every 4 weeks, do a brief self-assessment. Prevents drift and catches problems early:</P>
        <Ul>
          <Li><strong>Pain levels:</strong> Rate sciatica, foot, elbow, throat on 0–10. Trending down? (Use the Daily Tracker tab for this.)</Li>
          <Li><strong>Gym progress:</strong> Adding reps/weight per the micro-progression rule? Any exercises causing pain?</Li>
          <Li><strong>Stool quality:</strong> Consistently Bristol 3–4? If not, adjust fiber or water intake.</Li>
          <Li><strong>Sleep duration:</strong> Actually tracking 7–8 hours? Use your phone's built-in tracker.</Li>
          <Li><strong>Anxiety:</strong> General trend — better, worse, or same? Talk to your doctor at next check-in if plateaued or worsening.</Li>
          <Li><strong>Weight:</strong> Aim for ~0.25–0.5 kg gain per month during lean bulk.</Li>
          <Li><strong>Globus:</strong> Tracking down? Correlate with anxiety levels and dietary triggers.</Li>
        </Ul>
      </Card>
    </>
  );
}

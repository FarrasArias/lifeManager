import { useState } from 'react';
import { Card, P, Ul, Li, SectionTitle } from '../components/shared';

export default function Ailments() {
  const [expanded, setExpanded] = useState({ sciatica: true });
  const toggle = (id) => setExpanded(p => ({ ...p, [id]: !p[id] }));

  return (
    <>
      <Card title="Sciatica & Foot (S1 Nerve) — Active Priority" color="#c9dbb2" collapsible expanded={!!expanded.sciatica} onToggle={() => toggle('sciatica')}>
        <P>Your lateral foot pain pattern is consistent with S1 radiculopathy. Positional changes reducing symptoms 70–95% is a great sign — the nerve is irritated, not severely compressed.</P>
        <SectionTitle color="#c9dbb2">Daily Life Adjustments</SectionTitle>
        <Ul>
          <Li><strong>Sitting:</strong> Continue the cushion. Stand + walk 2 min every 30 minutes. Keep hips slightly higher than knees.</Li>
          <Li><strong>Sleeping:</strong> Continue pillow between legs. Side sleeping with firm pillow from hip to ankle is ideal.</Li>
          <Li><strong>Standing:</strong> Avoid locking knees. Shift weight between feet. One foot on a step if standing long periods.</Li>
          <Li><strong>Walking:</strong> 15–20 min daily on flat ground. Avoid hills and uneven terrain for now.</Li>
          <Li><strong>Lifting:</strong> Always hip hinge, never round your back. Keep loads close. No twisting under load.</Li>
          <Li><strong>No running</strong> until physio clears you. S1 nerve radiculopathy + jarring forces = setback.</Li>
        </Ul>
        <SectionTitle color="#c9dbb2">Stretching & Sciatica — The Nuance</SectionTitle>
        <P>Stretching is NOT bad for sciatica — <em>aggressive</em> stretching is. Gentle piriformis, glute, and hamstring stretches are actually recommended. Never push into sharp or radiating pain. Your physio's program is safe — follow it. Broader flexibility goal is delayed ~8–12 weeks until the nerve calms.</P>
        <SectionTitle color="#c9dbb2">Core — Your #1 Gym Priority Now</SectionTitle>
        <P>Your physio prescribed core work starting with isometrics. A weak transverse abdominis and weak multifidus means your lumbar spine has no muscular corset, making the S1 nerve more vulnerable. Dead bugs, bird-dogs, and Pallof presses — no crunches, no sit-ups, no Russian twists.</P>
      </Card>

      <Card title="Cervical Spine (Back) — Maintenance Mode" color="#c9dbb2" collapsible expanded={!!expanded.cervical} onToggle={() => toggle('cervical')}>
        <P>Cervical issues (rectified lordosis, C2-C3 anterolistesis, C3-C4 retrolistesis, scoliotic attitude, facet sclerosis, uncovertebral arthritis) are well-managed. Pain is 99% gone. Maintain everything.</P>
        <Ul>
          <Li>Keep doing cervical isometrics 3×/week (as physio taught you).</Li>
          <Li>Continue face pulls and scap work as warm-up on push days.</Li>
          <Li>Maintain postural hygiene: screen at eye level, chin tucks during desk work, breaks every 30 min.</Li>
          <Li>Keep the cervical neurodynamics daily if physio prescribed them.</Li>
        </Ul>
      </Card>

      <Card title="Elbow — Active Monitoring" color="#c9dbb2" collapsible expanded={!!expanded.elbow} onToggle={() => toggle('elbow')}>
        <P>Inflammation with fluid leakage, given cubing/guitar/drums/piano/programming — classic overuse. The joint capsule is irritated.</P>
        <Ul>
          <Li><strong>Gym:</strong> Avoid full lockout on presses and pulldowns. Stop 5–10° before full extension. Use neutral grip handles when possible.</Li>
          <Li><strong>Cubing:</strong> Limit to 20-min sessions with 10-min breaks. Ice 10 min after sessions.</Li>
          <Li><strong>Programming:</strong> Ergonomic keyboard, elbows at ~90°. Pomodoro breaks every 25 min. Stretch forearms during breaks.</Li>
          <Li><strong>Sleep:</strong> Keep elbow extended. A light compression sleeve at night can reduce swelling.</Li>
          <Li><strong>Compression wrap:</strong> Use during high-use activities (not 24/7 — the joint needs blood flow).</Li>
        </Ul>
      </Card>

      <Card title="Throat / Globus / Gastritis — Dietary Integration" color="#c9dbb2" collapsible expanded={!!expanded.throat} onToggle={() => toggle('throat')}>
        <P>Globus sensation is 85% improved post-treatment. The remaining 15% is very likely anxiety-driven. H. pylori ruled out. Gastritis/duodenitis treatment is done. What remains is managing triggers.</P>
        <Ul>
          <Li><strong>Food triggers to minimize:</strong> Chocolate, very acidic foods (tomato sauce, citrus on empty stomach), spicy food on empty stomach, very hot drinks, excessive coffee.</Li>
          <Li><strong>Eating habits:</strong> Eat slowly, chew thoroughly. Don't eat within 2–3 hours of lying down. No huge volumes at once.</Li>
          <Li><strong>Gaviscon:</strong> Fine as needed — think of it as a symptom bridge, not a daily dependency.</Li>
          <Li><strong>Stress connection:</strong> As anxiety management improves (medication + sleep + routine), globus should reduce. This is one of the strongest arguments for treating everything holistically.</Li>
        </Ul>
      </Card>

      <Card title="Anxiety — The Connecting Thread" color="#c9dbb2" collapsible expanded={!!expanded.anxiety} onToggle={() => toggle('anxiety')}>
        <P>Pregabalin 75mg 2×/day with 65% improvement is meaningful progress. The remaining anxiety ties everything together: it worsens globus, disrupts sleep, makes tinnitus louder, and increases muscle tension in your back and foot.</P>
        <Ul>
          <Li><strong>Exercise = anxiolytic:</strong> Consistent training is one of the most evidence-backed anxiety reducers. Don't underestimate how much your gym routine helps your mental health.</Li>
          <Li><strong>Sleep = anxiolytic:</strong> Getting from 6–7h to 7–8h will meaningfully reduce baseline anxiety. High-ROI goal.</Li>
          <Li><strong>Routine = anxiolytic:</strong> Predictable daily patterns reduce cognitive load. The Daily Routine tab builds this.</Li>
          <Li><strong>Brain dump journaling:</strong> 3 minutes before bed. Write every worry and thought. Bullet points. Close the notebook. Your brain lets go of things it knows are written down.</Li>
          <Li><strong>Therapy:</strong> Continue if possible. Even monthly check-ins help maintain gains.</Li>
        </Ul>
      </Card>
    </>
  );
}

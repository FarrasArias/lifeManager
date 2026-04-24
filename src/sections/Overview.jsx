import { Card, P, Ul, Li } from '../components/shared';

export default function Overview() {
  return (
    <>
      <Card title="The Philosophy" color="#e8d5b7">
        <P>This plan is built on one principle: <strong>everything is connected</strong>. Your sciatica affects your training which affects your sleep which affects your anxiety which affects your gut which affects your diet which affects your recovery. Fixing one thing in isolation while neglecting the others is why you keep hitting setbacks.</P>
        <P>The plan is structured in layers. Layer 1 (recovery & pain management) must be stable before pushing Layer 2 (training & diet optimization). Layer 2 stable before Layer 3 (aesthetics, cardio, flexibility).</P>
      </Card>

      <Card title="Priority Layers" color="#e8d5b7">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {[
            { layer: 'Layer 1 — Foundation (Weeks 1–6)', bg: '#2a3328', items: ['Complete physio program for sciatica', 'Re-establish consistent sleep schedule', 'Lock in baseline diet', 'Core strengthening begins (isometrics only)', 'Maintain current gym routine at same weights'] },
            { layer: 'Layer 2 — Building (Weeks 7–16)', bg: '#282a33', items: ['Begin slow progressive overload in gym', 'Introduce gentle flexibility work (physio-approved)', 'Dial in meal prep system', 'Introduce light cardio (stationary bike)', 'Begin sleep transition from phone to audio-only'] },
            { layer: 'Layer 3 — Optimization (Weeks 17+)', bg: '#332a28', items: ['Push aesthetic goals', 'Reintroduce running/swimming gradually', 'Pursue deeper flexibility', 'Cut cycles in summer', 'Full autonomy over routine'] },
          ].map((l, i) => (
            <div key={i} style={{ background: l.bg, padding: '16px 18px', borderRadius: 2, border: '1px solid #3a352e' }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: '#e8d5b7', marginBottom: 8 }}>{l.layer}</div>
              <div style={{ fontSize: 13.5, color: '#b0a898', lineHeight: 1.7 }}>
                {l.items.map((item, j) => <div key={j} style={{ marginBottom: 3 }}>→ {item}.</div>)}
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card title="Key Rules" color="#e8d5b7">
        <Ul>
          <Li><strong>Progressive overload rule:</strong> Add 1 rep per exercise per week maximum. Once you hit the top of your rep range for all sets, increase weight by the smallest increment, drop reps back to bottom of range. No exceptions.</Li>
          <Li><strong>Pain rule:</strong> If any exercise causes pain above 3/10 during or 24 hours after, drop the weight 20% and hold for 2 weeks. If it still hurts, replace the movement.</Li>
          <Li><strong>No-skip rule:</strong> Core work is not optional. It is woven into every gym day. Your sciatica, your back, your foot — all downstream of core weakness.</Li>
          <Li><strong>Consistency beats intensity:</strong> 4 decent sessions per week for 52 weeks beats 6 hardcore sessions for 8 weeks then injury.</Li>
        </Ul>
      </Card>
    </>
  );
}

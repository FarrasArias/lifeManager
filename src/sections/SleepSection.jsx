import { Card, P, Ul, Li } from '../components/shared';

export default function SleepSection() {
  return (
    <>
      <Card title="Sleep Architecture" color="#aa88ff">
        <P>Your goal: 7–8 hours, currently at 6–7. That extra hour will compound massively across recovery, anxiety, muscle repair, and gut health.</P>
      </Card>

      <Card title="The Brooklyn 99 Transition Plan" color="#aa88ff">
        <P>Blue light suppresses melatonin and keeps your brain more active. But cold-turkey switching will fail because B99 works for you (familiar voices, humor that distracts from anxious thoughts, masks tinnitus). Transition gradually:</P>
        <Ul>
          <Li><strong>Phase 1 (Weeks 1–3):</strong> Keep watching B99, but enable maximum blue light filter. Set screen brightness to minimum. Place phone face-down so you hear but don't stare.</Li>
          <Li><strong>Phase 2 (Weeks 4–6):</strong> Switch to B99 audio only — screen off, use podcast app with sleep timer. The audio stays, the screen goes.</Li>
          <Li><strong>Phase 3 (Weeks 7+):</strong> Introduce a Bluetooth sleep headband (like SleepPhones — flat speakers in soft fleece, designed for side sleepers). Phone stays off your face entirely.</Li>
          <Li><strong>Optional Phase 4:</strong> Gradually shift from B99 audio to brown noise, rain sounds, or ocean waves. These mask tinnitus while being less cognitively stimulating. Apps: myNoise, BetterSleep. Your brain may habituate to tinnitus better with less structured audio.</Li>
        </Ul>
        <P>No rush. If Phase 2 works for months, that's fine. The goal is screen off, not silence.</P>
      </Card>

      <Card title="Sleep Hygiene Protocol" color="#aa88ff">
        <Ul>
          <Li><strong>Consistent schedule:</strong> Same bedtime and wake time every day including weekends. Pick a window (e.g., 11:30 PM – 7:30 AM) and stick to it within 30 minutes.</Li>
          <Li><strong>No food 2–3 hours before bed:</strong> Helps both globus sensation and sleep quality. If hungry, a small handful of almonds or a banana is fine.</Li>
          <Li><strong>Caffeine cutoff:</strong> No caffeine after 2 PM. Caffeine has a half-life of 5–6 hours.</Li>
          <Li><strong>Cool room:</strong> 18–20°C is optimal. Your body needs to drop core temperature to fall asleep.</Li>
          <Li><strong>Brain dump:</strong> 3-minute journaling before bed. Write down every worry, task, thought. Close the notebook. Your brain can let go of things it knows are written down.</Li>
          <Li><strong>No intense exercise 2–3 hours before bed:</strong> Mild stretching and physio exercises are fine and even beneficial.</Li>
        </Ul>
      </Card>

      <Card title="Tinnitus at Night — Management" color="#aa88ff">
        <P>Sound masking at low volume is the evidence-based approach. The sound should be just loud enough to reduce the contrast between tinnitus and silence — not loud enough to drown it out completely. Over time this helps your brain habituate rather than becoming dependent on masking.</P>
        <Ul>
          <Li><strong>Brown noise</strong> tends to be more effective than white noise for tinnitus — it's deeper and less harsh, matching common tinnitus frequencies better.</Li>
          <Li><strong>Nature soundscapes</strong> (rain, ocean, forest) are also effective and many people find them more pleasant.</Li>
          <Li><strong>Sleep timer:</strong> Set audio to gradually decrease over 30–45 min and auto-off after 60 min. Sleeping with sound all night can prevent deep sleep stages.</Li>
          <Li><strong>Room speaker vs headphones:</strong> A small bedside speaker avoids having anything in/on your ears. If you need sound closer, the sleep headband is ideal.</Li>
        </Ul>
      </Card>
    </>
  );
}

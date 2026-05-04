import { useState } from 'react';
import { Card, P, Ul, Li, SectionTitle, Tag } from '../components/shared';
import { MONO } from '../constants/sections';

export default function DietSection() {
  const [open, setOpen] = useState({ meals: true });
  const toggle = (id) => setOpen(p => ({ ...p, [id]: !p[id] }));

  return (
    <>
      <Card title="Diet Architecture" color="#8877fc">
        <P>Built on three principles: (1) support muscle growth with adequate protein, (2) promote firm, clean stools through strategic fiber balance, and (3) avoid gastritis/globus triggers while still being a foodie.</P>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 12, marginBottom: 12 }}>
          {[
            { label: 'Daily Calories', value: '~2,300–2,500 kcal', sub: 'Lean bulk / recomp' },
            { label: 'Protein Target', value: '140–155g', sub: '~2g/kg bodyweight' },
            { label: 'Fiber Target', value: '30–38g', sub: 'Balance soluble + insoluble' },
            { label: 'Water', value: '2.5–3L daily', sub: 'Critical for fiber & stools' },
          ].map((d, i) => (
            <div key={i} style={{ background: '#10101c', border: '1px solid #1e2640', padding: 14, borderRadius: 2 }}>
              <div style={{ fontSize: 12, color: '#3a4a6a', fontFamily: MONO }}>{d.label}</div>
              <div style={{ fontSize: 18, color: '#8877fc', fontWeight: 600, margin: '4px 0' }}>{d.value}</div>
              <div style={{ fontSize: 12, color: '#6a7a9c' }}>{d.sub}</div>
            </div>
          ))}
        </div>
      </Card>

      <Card title="Stool Quality Strategy" color="#8877fc">
        <P>For Bristol Type 3–4 (firm, clean, well-formed), you need soluble + insoluble fiber balance, adequate water, and key habits. Soluble fiber (oats, bananas, white rice, peeled potatoes) absorbs water and firms stools into a gel. Insoluble fiber (vegetables, whole grains) adds bulk and structure. You need both, spread across the day.</P>
        <Ul>
          <Li><strong>Psyllium husk powder:</strong> 1 tablespoon in a full glass of water, 1–2× daily. Powder form is more effective than capsules. Regulates in both directions.</Li>
          <Li><strong>White rice over brown rice:</strong> White rice is a stool-firming food. Lean into it — it pairs great with your Asian recipes.</Li>
          <Li><strong>Bananas:</strong> Eat 1 daily. Resistant starch firms stools.</Li>
          <Li><strong>Probiotic:</strong> Multi-strain supplement. Evidence shows improvement in stool form over 4–8 weeks.</Li>
          <Li><strong>Avoid or minimize:</strong> Excessive caffeine, artificial sweeteners (sorbitol/xylitol), excessive greasy food, large amounts of raw cruciferous vegetables in one sitting.</Li>
          <Li><strong>Timing:</strong> Biggest fiber load at breakfast and lunch. Less at dinner.</Li>
          <Li><strong>Hydration:</strong> Fiber without water = worse stools. Minimum 2.5L consistently through the day.</Li>
        </Ul>
      </Card>

      <Card title="Breakfast (Daily — Same)" color="#8877fc">
        <P><strong>Keep your current breakfast — it's excellent.</strong> Oatmeal (soluble fiber king), strawberries, honey, sesame powder. The shake with protein whey isolate + creatine + berries is perfect.</P>
        <P><strong>Nutella swap:</strong> Natural peanut butter or almond butter on toast. Similar satisfaction, less sugar, more protein, and peanut butter is stool-firming. Or try: banana slices + thin layer of tahini + drizzle of honey on sourdough.</P>
        <P>Add: 1 banana (stool-firming + potassium).</P>
      </Card>

      <Card title="Lunch & Dinner — Meal Prep System" color="#8877fc" collapsible expanded={!!open.meals} onToggle={() => toggle('meals')}>
        <P>Cook 2× per week (Sunday + Wednesday). Each session makes 3–4 meals. All recipes freeze well. Always have 3–4 options ready to microwave.</P>

        <SectionTitle color="#8877fc">🍜 Dry Noodle Recipes</SectionTitle>
        {[
          { name: '1. Sesame Garlic Soba Noodles', desc: 'Cook dry soba noodles. Toss with: 1 tbsp soy sauce, 1 tsp sesame oil, minced garlic, diced chicken breast (pre-cooked), steamed broccoli, shredded carrot. Top with sesame seeds. Batch the chicken and veggies, cook noodles fresh (2 min).' },
          { name: '2. Stir-Fry Udon (Yaki Udon style)', desc: 'Dry udon noodles, cooked. Stir-fry with: sliced pork loin or chicken thigh, cabbage, bell pepper, oyster sauce + soy sauce + mirin. Protein-rich and stool-friendly (cabbage is great). Freezes well as a complete meal.' },
          { name: '3. Dan Dan–Inspired Noodles (mild)', desc: 'Dry wheat noodles. Sauce: 2 tbsp peanut butter + 1 tbsp soy sauce + 1 tsp rice vinegar + a bit of chili crisp (go easy). Ground turkey or pork with ginger. Top with scallions. Freeze the meat sauce, cook noodles fresh.' },
        ].map((r, i) => <RecipeBlock key={i} name={r.name} desc={r.desc} />)}

        <SectionTitle color="#8877fc">🍔 Lean Beef Burger</SectionTitle>
        <RecipeBlock name="Simple Lean Smash Burger" desc="93% lean ground beef, 120g patties. Season with salt, pepper, garlic powder. Smash thin on a hot pan (2 min/side). Whole wheat bun, lettuce, tomato, pickles, mustard. Freeze raw patties between parchment sheets." />

        <SectionTitle color="#8877fc">🍚 Asian Rice Bowls (Batch Rotation)</SectionTitle>
        {[
          { name: '4. Teriyaki Chicken Bowl', desc: 'Batch-cook chicken thighs in homemade teriyaki (soy sauce + mirin + brown sugar + ginger). Serve over white rice with steamed edamame and pickled ginger. Freezes perfectly.' },
          { name: '5. Korean Beef Bowl (Bulgogi-style)', desc: 'Thinly sliced beef marinated in soy + sesame oil + garlic + pear juice. Serve over white rice with sautéed spinach and a fried egg. Freeze the marinated meat raw, cook from frozen.' },
          { name: '6. Japanese Curry (mild)', desc: 'Japanese curry blocks (Golden Curry mild) + chicken + potato + carrot + onion. Serve over white rice. Incredibly easy to batch and freeze. Potatoes are great for stool firmness.' },
        ].map((r, i) => <RecipeBlock key={i} name={r.name} desc={r.desc} />)}

        <SectionTitle color="#8877fc">🥩 Non-Asian Options</SectionTitle>
        {[
          { name: '7. Chicken + Sweet Potato + Green Beans', desc: 'Season chicken breast with paprika, garlic, oregano. Bake at 200°C for 20 min. Roast sweet potato cubes alongside. Steam green beans. Meal prep 4 portions. Sweet potato has great soluble fiber.' },
          { name: '8. Turkey Meatballs + White Rice + Steamed Veggies', desc: 'Ground turkey + egg + breadcrumbs + Italian seasoning → bake in batch. Freeze in bags of 5–6. Reheat with rice. High protein, stool-friendly.' },
        ].map((r, i) => <RecipeBlock key={i} name={r.name} desc={r.desc} />)}
      </Card>

      <Card title="Dinner / Evening Snack" color="#8877fc">
        <P>Your current dinner (orange + yogurt) is light. That's fine if you had a solid lunch. Keep the Greek yogurt — probiotics. Switch to plain Greek yogurt with honey instead of flavored (less sugar).</P>
        <P>On training days, add a protein source at dinner: a portion from meal prep, or cottage cheese, or eggs.</P>
      </Card>

      <Card title="Ramen Day Integration" color="#8877fc">
        <P>Your weekly tonkotsu ramen with double kaedama is non-negotiable. Here's how to integrate it:</P>
        <Ul>
          <Li>Have ramen for lunch, not dinner (gives your gut time to process sodium and fat before sleep).</Li>
          <Li>On ramen day, keep breakfast and other meals lighter and lower in fat/sodium.</Li>
          <Li>Add veggies to your ramen if the shop allows (bean sprouts, corn, greens).</Li>
          <Li>Drink extra water on ramen day — tonkotsu is high sodium.</Li>
          <Li>Don't stress about one meal per week. Consistency across the other 20 meals matters infinitely more.</Li>
        </Ul>
      </Card>

      <Card title="Supplements Summary" color="#8877fc">
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13, fontFamily: MONO }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #1e2640' }}>
                {['Supplement', 'Dose', 'When', 'Why'].map(h => (
                  <th key={h} style={{ textAlign: 'left', padding: '8px 10px', color: '#3a4a6a', fontWeight: 400 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                { name: 'Creatine', dose: '5g', when: 'Morning shake', why: 'Strength, recovery' },
                { name: 'Whey protein isolate', dose: '1 scoop (~25g)', when: 'Morning shake', why: 'Protein target' },
                { name: 'Psyllium husk (powder)', dose: '1 tbsp in water', when: 'Before lunch & dinner', why: 'Stool quality' },
                { name: 'Probiotic (multi-strain)', dose: 'Per label', when: 'Morning w/ food', why: 'Gut health, stool form' },
                { name: 'Pregabalin', dose: '75mg × 2', when: 'As prescribed', why: 'Anxiety (doctor managed)' },
                { name: 'Gaviscon', dose: 'As needed', when: 'When globus flares', why: 'Symptom bridge' },
              ].map((s, i) => (
                <tr key={i} style={{ borderBottom: '1px solid #141828' }}>
                  <td style={{ padding: '8px 10px', color: '#8877fc' }}>{s.name}</td>
                  <td style={{ padding: '8px 10px', color: '#a0b0cc' }}>{s.dose}</td>
                  <td style={{ padding: '8px 10px', color: '#a0b0cc' }}>{s.when}</td>
                  <td style={{ padding: '8px 10px', color: '#3a4a6a', fontSize: 12 }}>{s.why}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </>
  );
}

function RecipeBlock({ name, desc }) {
  return (
    <div style={{ background: '#10101c', padding: 14, borderRadius: 2, border: '1px solid #1e2640', marginBottom: 10 }}>
      <div style={{ fontWeight: 600, color: '#dde8ff', marginBottom: 6 }}>{name}</div>
      <p style={{ margin: 0, fontSize: 14, color: '#a0b0cc', lineHeight: 1.6 }}>{desc}</p>
    </div>
  );
}

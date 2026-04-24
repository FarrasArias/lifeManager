import { useState } from 'react';
import { Card, P, Btn } from '../components/shared';
import { MONO } from '../constants/sections';
import { MEALS_DB, DAILY_ITEMS, AISLE_ORDER } from '../constants/meals';

const DAYS_OF_WEEK = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const MEAL_KEYS = Object.keys(MEALS_DB);

function buildGroceryList(plan) {
  const itemMap = {};
  const add = (ing, source) => {
    const key = ing.item.toLowerCase();
    if (!itemMap[key]) {
      itemMap[key] = { item: ing.item, aisle: ing.aisle, qty: [], sources: [], isPantry: ing.qty === 'pantry' };
    }
    if (ing.qty !== 'pantry' && !itemMap[key].qty.includes(ing.qty + ` (${source})`)) {
      itemMap[key].qty.push(ing.qty + ` (${source})`);
    }
    if (!itemMap[key].sources.includes(source)) itemMap[key].sources.push(source);
  };

  Object.values(DAILY_ITEMS).forEach(g => g.ingredients.forEach(i => add(i, g.name)));

  const counts = {};
  Object.values(plan).forEach(k => { counts[k] = (counts[k] || 0) + 1; });
  Object.entries(counts).forEach(([mealKey, count]) => {
    const meal = MEALS_DB[mealKey];
    const times = Math.ceil(count / meal.servings);
    const label = `${meal.name} (×${count} srv)`;
    meal.ingredients.forEach(ing => {
      const scaled = { ...ing };
      if (ing.qty !== 'pantry' && times > 1) scaled.qty = `${ing.qty} ×${times}`;
      add(scaled, label);
    });
  });

  const byAisle = {};
  Object.values(itemMap).forEach(e => {
    if (!byAisle[e.aisle]) byAisle[e.aisle] = [];
    byAisle[e.aisle].push(e);
  });
  return byAisle;
}

function formatListForClipboard(groceryList, checkedItems, sortedAisles) {
  const lines = ['GROCERY LIST', '============', ''];
  sortedAisles.forEach(aisle => {
    lines.push(`[ ${aisle.toUpperCase()} ]`);
    groceryList[aisle].forEach(entry => {
      const checked = checkedItems[`${aisle}-${entry.item}`];
      const mark = checked ? '[x]' : '[ ]';
      const qty = entry.isPantry ? '(pantry)' : entry.qty.join(' + ');
      lines.push(`${mark} ${entry.item} — ${qty}`);
    });
    lines.push('');
  });
  return lines.join('\n');
}

export default function GrocerySection() {
  const [plan, setPlan] = useState({});
  const [showList, setShowList] = useState(false);
  const [checkedItems, setCheckedItems] = useState({});
  const [copied, setCopied] = useState(false);

  const setMeal = (day, key) => setPlan(prev => {
    const copy = { ...prev };
    if (key === '') delete copy[day]; else copy[day] = key;
    return copy;
  });

  const toggleCheck = (key) => setCheckedItems(prev => ({ ...prev, [key]: !prev[key] }));

  const groceryList = showList ? buildGroceryList(plan) : {};
  const sortedAisles = Object.keys(groceryList).sort(
    (a, b) => (AISLE_ORDER.indexOf(a) === -1 ? 99 : AISLE_ORDER.indexOf(a))
             - (AISLE_ORDER.indexOf(b) === -1 ? 99 : AISLE_ORDER.indexOf(b))
  );

  const totalItems = Object.values(groceryList).flat().length;
  const checkedCount = Object.values(checkedItems).filter(Boolean).length;

  const copyToClipboard = async () => {
    const text = formatListForClipboard(groceryList, checkedItems, sortedAisles);
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const el = document.createElement('textarea');
      el.value = text;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <>
      <Card title="Weekly Meal Planner" color="#b2dbc9">
        <P>Select a lunch/dinner for each day. Leave blank for ramen day or eating out. Breakfast + evening snack staples are always included.</P>
        <div style={{ marginTop: 8 }}>
          {DAYS_OF_WEEK.map(day => (
            <div key={day} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 0', borderBottom: '1px solid #2a2520' }}>
              <div style={{ fontFamily: MONO, fontSize: 13, color: '#8a8278', minWidth: 40 }}>{day}</div>
              <select
                value={plan[day] || ''}
                onChange={e => setMeal(day, e.target.value)}
                style={{
                  flex: 1, background: '#1a1915', color: plan[day] ? '#e8d5b7' : '#6a6358',
                  border: '1px solid #3a352e', borderRadius: 2, padding: '8px 12px',
                  fontSize: 13, fontFamily: 'Georgia, serif', cursor: 'pointer',
                }}
              >
                <option value="">— ramen day / eating out —</option>
                <optgroup label="🍜 Noodles">
                  {MEAL_KEYS.filter(k => MEALS_DB[k].category === 'noodles').map(k => (
                    <option key={k} value={k}>{MEALS_DB[k].name}</option>
                  ))}
                </optgroup>
                <optgroup label="🍚 Rice Bowls">
                  {MEAL_KEYS.filter(k => MEALS_DB[k].category === 'rice_bowl').map(k => (
                    <option key={k} value={k}>{MEALS_DB[k].name}</option>
                  ))}
                </optgroup>
                <optgroup label="🍔 Western">
                  {MEAL_KEYS.filter(k => MEALS_DB[k].category === 'western').map(k => (
                    <option key={k} value={k}>{MEALS_DB[k].name}</option>
                  ))}
                </optgroup>
              </select>
              {plan[day] && (
                <span style={{ fontSize: 11, fontFamily: MONO, color: '#6a6358', whiteSpace: 'nowrap' }}>
                  {MEALS_DB[plan[day]]?.servings} srv
                </span>
              )}
            </div>
          ))}
        </div>
        <div style={{ marginTop: 16, display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
          <button
            onClick={() => { setShowList(true); setCheckedItems({}); }}
            disabled={Object.keys(plan).length === 0}
            style={{
              background: Object.keys(plan).length > 0 ? '#b2dbc9' : '#3a352e',
              color: Object.keys(plan).length > 0 ? '#1a1915' : '#6a6358',
              border: 'none', padding: '10px 24px', fontSize: 14,
              fontFamily: 'Georgia, serif', fontWeight: 600, borderRadius: 2,
              cursor: Object.keys(plan).length > 0 ? 'pointer' : 'default',
            }}
          >Generate Grocery List</button>
          {Object.keys(plan).length === 0 && (
            <span style={{ fontSize: 12, color: '#6a6358' }}>Select at least one meal first</span>
          )}
          {showList && (
            <Btn onClick={() => { setPlan({}); setShowList(false); setCheckedItems({}); }}>Reset All</Btn>
          )}
        </div>
      </Card>

      {showList && (
        <Card title="Your Grocery List" color="#b2dbc9">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, padding: '10px 14px', background: '#1a2520', borderRadius: 2, border: '1px solid #2a3530' }}>
            <span style={{ fontSize: 13, color: '#b2dbc9', fontFamily: MONO }}>
              {checkedCount} / {totalItems} items
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 100, height: 6, background: '#2a3530', borderRadius: 3, overflow: 'hidden' }}>
                <div style={{ width: totalItems > 0 ? `${(checkedCount / totalItems) * 100}%` : '0%', height: '100%', background: '#b2dbc9', borderRadius: 3, transition: 'width 0.3s' }} />
              </div>
              <button
                onClick={copyToClipboard}
                style={{
                  background: copied ? '#4a8c5c' : '#2a3530', border: '1px solid ' + (copied ? '#4a8c5c' : '#3a4530'),
                  color: copied ? '#c9dbb2' : '#b2dbc9', padding: '6px 16px', fontSize: 13,
                  fontFamily: MONO, borderRadius: 2, cursor: 'pointer', transition: 'all 0.2s',
                  whiteSpace: 'nowrap',
                }}
              >{copied ? '✓ Copied!' : 'Copy to clipboard'}</button>
            </div>
          </div>

          {sortedAisles.map(aisle => (
            <div key={aisle} style={{ marginBottom: 20 }}>
              <div style={{ fontSize: 12, fontFamily: MONO, color: '#b2dbc9', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8, paddingBottom: 4, borderBottom: '1px solid #2a3530' }}>
                {aisle}
              </div>
              {groceryList[aisle].map((entry, i) => {
                const key = `${aisle}-${entry.item}`;
                const checked = checkedItems[key];
                return (
                  <div key={i} onClick={() => toggleCheck(key)} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, padding: '8px 4px', cursor: 'pointer', opacity: checked ? 0.4 : 1, transition: 'opacity 0.2s', borderBottom: '1px solid #22201b' }}>
                    <div style={{ width: 18, height: 18, borderRadius: 2, border: checked ? '1px solid #b2dbc9' : '1px solid #3a352e', background: checked ? '#b2dbc9' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1, fontSize: 12, color: '#1a1915', fontWeight: 700 }}>
                      {checked ? '✓' : ''}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 14, color: checked ? '#6a6358' : '#e8d5b7', textDecoration: checked ? 'line-through' : 'none' }}>{entry.item}</div>
                      <div style={{ fontSize: 12, color: '#6a6358', marginTop: 2 }}>
                        {entry.isPantry ? <span style={{ color: '#8a7a5a', fontStyle: 'italic' }}>pantry — check if needed</span> : entry.qty.join(' + ')}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ))}

          <div style={{ marginTop: 16, padding: '12px 14px', background: '#1a2520', borderRadius: 2, border: '1px solid #2a3530', fontSize: 13, color: '#6a6358' }}>
            Tap items to check them off as you shop. Quantities auto-scale per servings needed.
          </div>
        </Card>
      )}
    </>
  );
}

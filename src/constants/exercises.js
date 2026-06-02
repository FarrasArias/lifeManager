export const WARMUP = [
  { id: 'wu-0', name: 'Band face pulls',   sets: 2, repMin: 15, repMax: 15, defaultWeight: 'light band', hasWeight: false, notes: 'Light band, squeeze rear delts' },
  { id: 'wu-1', name: 'Scap push-ups',     sets: 1, repMin: 10, repMax: 10, defaultWeight: '',           hasWeight: false, notes: 'Slow, controlled protraction' },
  { id: 'wu-2', name: 'Dead bugs (core)',  sets: 2, repMin: 8,  repMax: 8,  defaultWeight: '',           hasWeight: false, notes: 'Breathe out on extension, brace abs' },
  { id: 'wu-3', name: 'Cat-cow',           sets: 1, repMin: 8,  repMax: 8,  defaultWeight: '',           hasWeight: false, notes: 'Move with breath, gentle mobilization' },
];

// ── Strength-focused rep ranges ──────────────────────────────────────────────
// Main compounds:   3–5 reps, 5 sets  → pure strength zone
// Secondary compounds: 5–7 reps, 4 sets → strength-accessory zone
// Isolation / elbow-sensitive: 8–10 reps, 3 sets → joint-safe, still hypertrophy
// Rehab (core/tibialis/glute bridge): fixed rep counts, focus on quality not load

export const DAY1 = [
  // ── Main push compound ──
  { id: 'd1-0', name: 'Cable chest press (neutral grip)',  sets: 5, repMin: 3, repMax: 5, defaultWeight: '11kg', hasWeight: true,  notes: 'Main strength lift. Staggered stance, don\'t lock elbows' },
  // ── Secondary push ──
  { id: 'd1-1', name: 'DB bench press (neutral grip)',     sets: 4, repMin: 4, repMax: 6, defaultWeight: '12lb', hasWeight: true,  notes: 'ELBOW: stop 10° before lockout, never go to failure' },
  // ── Isolation — joint-safe rep range ──
  { id: 'd1-2', name: 'Cable fly',                        sets: 3, repMin: 8, repMax: 10, defaultWeight: '9kg',  hasWeight: true,  notes: 'Isolation — constant tension, 2s eccentric' },
  { id: 'd1-3', name: 'Cable row (postural)',              sets: 3, repMin: 8, repMax: 10, defaultWeight: '15kg', hasWeight: true,  notes: 'Postural correction — elbows 30–45°, squeeze 1s' },
  { id: 'd1-4', name: 'Cable lateral raise',               sets: 3, repMin: 10, repMax: 12, defaultWeight: '5kg', hasWeight: true,  notes: 'Isolation — lead with pinky, no momentum' },
  // ── ELBOW: intentionally kept in moderate range ──
  { id: 'd1-5', name: 'Triceps rope pressdown',            sets: 3, repMin: 8,  repMax: 10, defaultWeight: '12kg', hasWeight: true,  notes: 'ELBOW: moderate weight only, no full lockout' },
  // ── Core rehab ──
  { id: 'd1-6', name: 'Pallof press (core)',               sets: 3, repMin: 8,  repMax: 10, defaultWeight: '14kg', hasWeight: true,  notes: 'Anti-rotation — brace transverse abs, slow and controlled' },
];

export const DAY2 = [
  // ── Main pull compound ──
  { id: 'd2-0', name: 'Low cable row',                    sets: 5, repMin: 3, repMax: 5, defaultWeight: '25kg', hasWeight: true,  notes: 'Main strength lift. Neutral grip, chest up, no jerking' },
  // ── Secondary pull ──
  { id: 'd2-1', name: 'Lat pulldown (neutral grip)',       sets: 4, repMin: 4, repMax: 6, defaultWeight: '25kg', hasWeight: true,  notes: 'Drive elbows to hips, stop 10° before full extension' },
  { id: 'd2-2', name: 'Single-arm cable pulldown',         sets: 3, repMin: 5, repMax: 7, defaultWeight: '16kg', hasWeight: true,  notes: 'Strict form, feel the lat fully (each side)' },
  { id: 'd2-3', name: 'Straight-arm pulldown',             sets: 3, repMin: 6, repMax: 8, defaultWeight: '14kg', hasWeight: true,  notes: 'Slight forward lean, long arc, squeeze at bottom' },
  // ── Isolation / postural ──
  { id: 'd2-4', name: 'Reverse cable fly',                 sets: 3, repMin: 10, repMax: 12, defaultWeight: '5kg', hasWeight: true,  notes: 'Postural — light, rear delt focus, no swinging' },
  // ── ELBOW: intentionally kept in moderate range ──
  { id: 'd2-5', name: 'Cable curls',                       sets: 3, repMin: 8,  repMax: 10, defaultWeight: '16kg', hasWeight: true,  notes: 'ELBOW: no full extension at bottom, moderate load only' },
  // ── Core rehab ──
  { id: 'd2-6', name: 'Bird-dogs (core)',                  sets: 3, repMin: 8,  repMax: 8,  defaultWeight: '',    hasWeight: false, notes: 'Hold 3s at top, brace core — anti-extension (each side)' },
  { id: 'd2-7', name: 'Dead bugs (core)',                  sets: 3, repMin: 8,  repMax: 8,  defaultWeight: '',    hasWeight: false, notes: 'Press low back into floor, opposite arm/leg only' },
];

export const DAY3 = [
  // ── Main leg compound — conservative upper limit due to sciatica ──
  { id: 'd3-0', name: 'Leg press',                         sets: 5, repMin: 4, repMax: 6, defaultWeight: '55kg', hasWeight: true,  notes: 'SCIATICA: no spinal rounding, foot mid-high, don\'t lock knees' },
  // ── Secondary legs ──
  { id: 'd3-1', name: 'Seated leg curl',                   sets: 4, repMin: 5, repMax: 7, defaultWeight: '27kg', hasWeight: true,  notes: 'Slow eccentric (3s down), hamstring control' },
  { id: 'd3-2', name: 'Seated leg extension',              sets: 3, repMin: 6, repMax: 8, defaultWeight: '20kg', hasWeight: true,  notes: 'Stop 10° before lockout, controlled — no snapping' },
  // ── Single-leg (pain dependent) ──
  { id: 'd3-3', name: 'Split squat (short ROM, support)',  sets: 3, repMin: 5, repMax: 7, defaultWeight: 'BW',   hasWeight: false, notes: 'SCIATICA/FOOT: skip entirely if >3/10 pain, replace with leg press set' },
  // ── Rehab & stabilisers ──
  { id: 'd3-4', name: 'Seated calf raise',                 sets: 3, repMin: 10, repMax: 12, defaultWeight: '30kg', hasWeight: true,  notes: 'Seated preferred — calves respond to moderate rep ranges' },
  { id: 'd3-5', name: 'Tibialis raises',                   sets: 2, repMin: 15, repMax: 20, defaultWeight: '',    hasWeight: false, notes: 'REHAB: foot/ankle stability, don\'t add weight' },
  { id: 'd3-6', name: 'Glute bridge (bodyweight)',         sets: 3, repMin: 10, repMax: 12, defaultWeight: '',    hasWeight: false, notes: 'REHAB: glute activation + core stability, hold 2s at top' },
  { id: 'd3-7', name: 'Pallof press (core)',               sets: 2, repMin: 8,  repMax: 10, defaultWeight: '14kg', hasWeight: true,  notes: 'Anti-rotation — alternate sides' },
];

export const DAY4 = [
  // ── Main glute compound — safest heavy lift for sciatica ──
  { id: 'd4-0', name: 'Hip thrust (bench + DB/BB)',        sets: 5, repMin: 4, repMax: 6, defaultWeight: '25kg', hasWeight: true,  notes: 'Best strength lift for you — glutes, no spinal compression. Full squeeze at top' },
  // ── Secondary hinge ──
  { id: 'd4-1', name: 'DB Romanian deadlift',              sets: 4, repMin: 4, repMax: 6, defaultWeight: '10kg', hasWeight: true,  notes: 'SCIATICA: hip hinge must be perfect — never round lumbar. Start very light' },
  { id: 'd4-2', name: 'Cable pull-through',                sets: 3, repMin: 6, repMax: 8, defaultWeight: '20kg', hasWeight: true,  notes: 'Hinge pattern reinforcement — squeeze glutes at top' },
  // ── Isolation ──
  { id: 'd4-3', name: 'Cable kickbacks',                   sets: 3, repMin: 10, repMax: 12, defaultWeight: '16kg', hasWeight: true,  notes: 'Glute isolation — don\'t arch back (each side)' },
  { id: 'd4-4', name: 'Cable abduction',                   sets: 3, repMin: 12, repMax: 15, defaultWeight: '9kg',  hasWeight: true,  notes: 'Glute medius — slow and controlled' },
  // ── Core rehab ──
  { id: 'd4-5', name: 'Dead bugs (core)',                  sets: 2, repMin: 8,  repMax: 8,  defaultWeight: '',    hasWeight: false, notes: 'Core finisher — slow, controlled, press low back down' },
  { id: 'd4-6', name: 'Bird-dogs (core)',                  sets: 2, repMin: 8,  repMax: 8,  defaultWeight: '',    hasWeight: false, notes: 'Anti-extension — hold 3s at top' },
];

export const GYM_DAYS = [
    { id: 'day1', label: 'Day 1 — PUSH + Core', tags: ['Chest', 'Shoulders', 'Triceps', 'Core'], exercises: DAY1 },
    { id: 'day2', label: 'Day 2 — LEGS + Core', tags: ['Quads', 'Hamstrings', 'Calves', 'Core'], exercises: DAY3 },
  { id: 'day3', label: 'Day 3 — PULL + Core',   tags: ['Back', 'Biceps', 'Rear delts', 'Core'], exercises: DAY2 },
  { id: 'day4', label: 'Day 4 — GLUTES + Core', tags: ['Glutes', 'Hamstrings', 'Core'], exercises: DAY4 },
];

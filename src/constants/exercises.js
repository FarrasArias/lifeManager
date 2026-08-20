// ── Warm-up (every session, ~10 min) ────────────────────────────────────────
export const WARMUP = [
  { id: 'wu-0', name: 'Recumbent bike easy pedal',  sets: 1, reps: 1,  defaultWeight: '',           hasWeight: false, notes: '5 min, RPE 3-4' },
  { id: 'wu-1', name: 'Band face pulls',            sets: 2, reps: 12, defaultWeight: 'light band', hasWeight: false, notes: 'Squeeze rear delts, no momentum' },
  { id: 'wu-2', name: 'Scap push-ups',              sets: 1, reps: 10, defaultWeight: '',           hasWeight: false, notes: 'Slow protraction, activate serratus' },
  { id: 'wu-3', name: 'Cat-cow',                    sets: 1, reps: 10, defaultWeight: '',           hasWeight: false, notes: 'Move with breath, mobilize spine' },
  { id: 'wu-4', name: 'Dead bugs (unloaded)',        sets: 1, reps: 8,  defaultWeight: '',           hasWeight: false, notes: 'Activate deep core before lifting' },
  { id: 'wu-5', name: 'Chin tucks',                 sets: 1, reps: 10, defaultWeight: '',           hasWeight: false, notes: 'Hold 5s each. Also do 3-5 between EVERY set' },
  { id: 'wu-6', name: 'Radial nerve glide (left)',   sets: 1, reps: 8,  defaultWeight: '',           hasWeight: false, notes: 'Gentle oscillations only. Stop if pain increases' },
  { id: 'wu-7', name: 'Ulnar nerve glide (left)',    sets: 1, reps: 8,  defaultWeight: '',           hasWeight: false, notes: 'Gentle oscillations only. Stop if pain increases' },
];

// ── Hypertrophy-safe rep ranges ─────────────────────────────────────────────
// Compounds:  10-12 reps, RIR 2-3  → safe strength + hypertrophy
// Secondary:  10-12 reps, RIR 1-2  → moderate intensity
// Isolation:  12-15 reps, RIR 0-1  → push harder, joint-safe
// Rehab/Core: controlled reps, focus on quality not load
//
// CERVICAL RULE: Chin tucked on every exercise. Never let head jut forward.
// LEFT ARM RULE: Stop if cold/tingly. Log which exercises trigger it.

export const DAY1 = [
  { id: 'd1-0', name: 'Cable chest press (neutral grip)',  sets: 3, reps: 10, defaultWeight: '18kg', hasWeight: true,  notes: 'Staggered stance, don\'t lock elbows. CERVICAL: chin tucked',                   guide: '10-12 reps · RIR 2-3' },
  { id: 'd1-1', name: 'Machine/DB bench press (neutral)',  sets: 3, reps: 10, defaultWeight: '20lb', hasWeight: true,  notes: 'ELBOW: stop 10° before lockout. LEFT ARM: reduce weight if tingling',           guide: '10-12 reps · RIR 2' },
  { id: 'd1-2', name: 'Cable fly (low-to-mid)',            sets: 3, reps: 12, defaultWeight: '14kg', hasWeight: true,  notes: 'Constant tension, 2s eccentric, squeeze',                                      guide: '12-15 reps · RIR 1' },
  { id: 'd1-3', name: 'Cable lateral raise',               sets: 3, reps: 12, defaultWeight: '5kg',  hasWeight: true,  notes: 'Lead with pinky, no momentum, LIGHT. LEFT ARM: monitor',                        guide: '12-15 reps · RIR 1' },
  { id: 'd1-4', name: 'Cable row (postural)',               sets: 3, reps: 12, defaultWeight: '14kg', hasWeight: true,  notes: 'Postural correction — elbows 30-45°, squeeze 1s. Supports cervical health',    guide: '12-15 reps · RIR 2' },
  { id: 'd1-5', name: 'Triceps rope pressdown',             sets: 3, reps: 12, defaultWeight: '14kg', hasWeight: true,  notes: 'ELBOW: NO full lockout. LEFT ARM: skip or right-only if cold/tingly',           guide: '12-15 reps · RIR 1' },
  { id: 'd1-6', name: 'Pallof press (core)',                sets: 2, reps: 10, defaultWeight: '14kg', hasWeight: true,  notes: 'Anti-rotation — brace transverse abs, slow and controlled',                     guide: '10-12 reps · controlled' },
];

export const DAY2 = [
  { id: 'd2-0', name: 'Leg press',                         sets: 3, reps: 10, defaultWeight: '45kg', hasWeight: true,  notes: 'Feet mid-high. SPINE: never let lower back round off pad. Don\'t lock knees',  guide: '10-12 reps · RIR 2-3' },
  { id: 'd2-1', name: 'Seated leg curl',                   sets: 3, reps: 10, defaultWeight: '27kg', hasWeight: true,  notes: '3s eccentric (slow down), hamstring control',                                  guide: '10-12 reps · RIR 1-2' },
  { id: 'd2-2', name: 'Seated leg extension',               sets: 3, reps: 10, defaultWeight: '20kg', hasWeight: true,  notes: 'Stop 10° before full lockout, controlled — no snapping',                       guide: '10-12 reps · RIR 1-2' },
  { id: 'd2-3', name: 'Hip thrust (bench + DB)',            sets: 3, reps: 10, defaultWeight: '50lb', hasWeight: true,  notes: 'BEST exercise: glutes, NO spinal compression. Full squeeze, 1s hold',          guide: '10-12 reps · RIR 2' },
  { id: 'd2-4', name: 'Seated calf raise',                 sets: 3, reps: 12, defaultWeight: '40kg', hasWeight: true,  notes: 'Seated = spine safe, 2s hold at top',                                          guide: '12-15 reps · RIR 1' },
  { id: 'd2-5', name: 'Tibialis raises',                   sets: 2, reps: 15, defaultWeight: '',     hasWeight: false, notes: 'REHAB: foot/ankle stability, no added weight',                                 guide: '15-20 reps · bodyweight' },
  { id: 'd2-6', name: 'Glute bridge (bodyweight)',          sets: 2, reps: 12, defaultWeight: '',     hasWeight: false, notes: 'REHAB: glute activation, hold 2s at top',                                      guide: '12-15 reps · controlled' },
];

export const DAY3 = [
  { id: 'd3-0', name: 'Seated cable row (neutral grip)',    sets: 3, reps: 10, defaultWeight: '30kg', hasWeight: true,  notes: 'Chest up, NO jerking. CERVICAL: neutral neck, no forward head',                guide: '10-12 reps · RIR 2-3' },
  { id: 'd3-1', name: 'Lat pulldown (neutral grip)',        sets: 3, reps: 10, defaultWeight: '30kg', hasWeight: true,  notes: 'Drive elbows to hips. CERVICAL: chin tucked, don\'t let head jut forward',     guide: '10-12 reps · RIR 2' },
  { id: 'd3-2', name: 'Single-arm cable pulldown',          sets: 3, reps: 10, defaultWeight: '14kg', hasWeight: true,  notes: 'Strict form, feel the lat. Do right first, match/reduce left',                 guide: '10-12 reps · RIR 1-2' },
  { id: 'd3-3', name: 'Straight-arm pulldown',              sets: 3, reps: 12, defaultWeight: '14kg', hasWeight: true,  notes: 'Slight forward lean, long arc, squeeze at bottom',                             guide: '12-15 reps · RIR 1' },
  { id: 'd3-4', name: 'Reverse cable fly',                  sets: 3, reps: 12, defaultWeight: '5kg',  hasWeight: true,  notes: 'POSTURAL: rear delt focus, light. Critical for cervical health',               guide: '12-15 reps · RIR 1' },
  { id: 'd3-5', name: 'Cable curls',                        sets: 3, reps: 12, defaultWeight: '14kg', hasWeight: true,  notes: 'ELBOW: no full extension. LEFT ARM: stop if cold/tingly. Alt: hammer curls',   guide: '12-15 reps · RIR 1' },
  { id: 'd3-6', name: 'Bird-dogs (core)',                   sets: 2, reps: 8,  defaultWeight: '',     hasWeight: false, notes: 'Hold 3s at top, anti-extension (each side)',                                   guide: '8 each · controlled' },
];

export const DAY4 = [
  { id: 'd4-0', name: 'Cable chest press (neutral grip)',   sets: 3, reps: 10, defaultWeight: '18kg', hasWeight: true,  notes: '2nd weekly chest stimulus. CERVICAL: chin tucked',                             guide: '10-12 reps · RIR 2' },
  { id: 'd4-1', name: 'Seated cable row (neutral grip)',    sets: 3, reps: 10, defaultWeight: '30kg', hasWeight: true,  notes: '2nd weekly back stimulus. Upper back + cervical support',                      guide: '10-12 reps · RIR 2' },
  { id: 'd4-2', name: 'Cable lateral raise',                sets: 3, reps: 12, defaultWeight: '5kg',  hasWeight: true,  notes: 'Side delts respond well to higher frequency. LEFT ARM: monitor',               guide: '12-15 reps · RIR 1' },
  { id: 'd4-3', name: 'Reverse cable fly',                  sets: 3, reps: 12, defaultWeight: '5kg',  hasWeight: true,  notes: 'CRITICAL for cervical health — strengthens lower traps/rhomboids',             guide: '12-15 reps · RIR 1' },
  { id: 'd4-4', name: 'Cable curls (hammer grip)',           sets: 3, reps: 12, defaultWeight: '12kg', hasWeight: true,  notes: 'Alternate weeks with triceps. Neutral grip = less nerve stress',               guide: '12-15 reps · RIR 1 · alt weeks' },
  { id: 'd4-5', name: 'Pallof press (core)',                 sets: 2, reps: 10, defaultWeight: '14kg', hasWeight: true,  notes: 'Anti-rotation, different angle than Day 1',                                    guide: '10-12 reps · controlled' },
  { id: 'd4-6', name: 'Side plank (each side)',              sets: 2, reps: 1,  defaultWeight: '',     hasWeight: false, notes: 'Hold 20-30s. Lateral stability, spine-safe, supports scoliosis',               guide: '20-30s hold · each side' },
];

export const GYM_DAYS = [
  { id: 'day1', label: 'Day 1 — PUSH',              tags: ['Chest', 'Shoulders', 'Triceps'],          exercises: DAY1 },
  { id: 'day2', label: 'Day 2 — LEGS',              tags: ['Quads', 'Hamstrings', 'Calves', 'Glutes'], exercises: DAY2 },
  { id: 'day3', label: 'Day 3 — PULL',              tags: ['Back', 'Biceps', 'Rear Delts'],           exercises: DAY3 },
  { id: 'day4', label: 'Day 4 — PUSH/PULL HYBRID',  tags: ['Chest', 'Back', 'Shoulders', 'Arms'],    exercises: DAY4 },
];

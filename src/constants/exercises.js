export const WARMUP = [
  { id: 'wu-0', name: 'Band face pulls',   sets: 2, repMin: 15, repMax: 15, defaultWeight: 'light band', hasWeight: false, notes: 'Light band, squeeze rear delts' },
  { id: 'wu-1', name: 'Scap push-ups',     sets: 1, repMin: 10, repMax: 10, defaultWeight: '',           hasWeight: false, notes: 'Slow, controlled protraction' },
  { id: 'wu-2', name: 'Dead bugs (core)',  sets: 2, repMin: 8,  repMax: 8,  defaultWeight: '',           hasWeight: false, notes: 'Breathe out on extension, brace abs' },
  { id: 'wu-3', name: 'Cat-cow',           sets: 1, repMin: 8,  repMax: 8,  defaultWeight: '',           hasWeight: false, notes: 'Move with breath, gentle mobilization' },
];

export const DAY1 = [
  { id: 'd1-0', name: 'Cable chest press (neutral grip)',     sets: 4, repMin: 8,  repMax: 12, defaultWeight: '9kg',  hasWeight: true,  notes: 'Staggered stance, don\'t lock elbows' },
  { id: 'd1-1', name: 'DB bench press (neutral grip)',        sets: 3, repMin: 8,  repMax: 12, defaultWeight: '10lb', hasWeight: true,  notes: 'Light/strict, stop before lockout' },
  { id: 'd1-2', name: 'Cable fly',                           sets: 3, repMin: 12, repMax: 15, defaultWeight: '9kg',  hasWeight: true,  notes: 'Constant tension, slow eccentric' },
  { id: 'd1-3', name: 'Cable row (light, postural)',          sets: 3, repMin: 12, repMax: 15, defaultWeight: '',     hasWeight: true,  notes: 'Elbows 30–45°, squeeze 1s at top' },
  { id: 'd1-4', name: 'Cable lateral raise',                  sets: 3, repMin: 12, repMax: 18, defaultWeight: '5kg',  hasWeight: true,  notes: 'Lead with pinky, controlled' },
  { id: 'd1-5', name: 'Triceps rope pressdown',               sets: 3, repMin: 10, repMax: 15, defaultWeight: '14kg', hasWeight: true,  notes: 'Don\'t snap to full lockout (elbow)' },
  { id: 'd1-6', name: 'Pallof press (core)',                  sets: 3, repMin: 10, repMax: 10, defaultWeight: '18kg', hasWeight: true,  notes: 'Anti-rotation, brace transverse abs' },
];

export const DAY2 = [
  { id: 'd2-0', name: 'Low cable row',                       sets: 4, repMin: 8,  repMax: 12, defaultWeight: '23kg', hasWeight: true,  notes: 'Neutral grip preferred, no jerking' },
  { id: 'd2-1', name: 'Lat pulldown (neutral grip)',          sets: 3, repMin: 8,  repMax: 12, defaultWeight: '23kg', hasWeight: true,  notes: 'Stop short of lockout, controlled' },
  { id: 'd2-2', name: 'Single-arm cable pulldown',            sets: 2, repMin: 10, repMax: 12, defaultWeight: '14kg', hasWeight: true,  notes: 'Strict form, feel the lat (each side)' },
  { id: 'd2-3', name: 'Reverse cable fly',                    sets: 3, repMin: 12, repMax: 18, defaultWeight: '5kg',  hasWeight: true,  notes: 'Light, rear delt focus' },
  { id: 'd2-4', name: 'Straight-arm pulldown',                sets: 2, repMin: 12, repMax: 15, defaultWeight: '14kg', hasWeight: true,  notes: 'Slight lean, long range' },
  { id: 'd2-5', name: 'Cable curls',                          sets: 3, repMin: 10, repMax: 15, defaultWeight: '18kg', hasWeight: true,  notes: 'No full extension (elbow rule)' },
  { id: 'd2-6', name: 'Bird-dogs (core)',                     sets: 2, repMin: 10, repMax: 10, defaultWeight: '',     hasWeight: false, notes: 'Hold 3s at top, brace core (each side)' },
  { id: 'd2-7', name: 'Dead bugs (core)',                     sets: 2, repMin: 8,  repMax: 8,  defaultWeight: '',     hasWeight: false, notes: 'Opposite arm/leg, press low back down' },
];

export const DAY3 = [
  { id: 'd3-0', name: 'Leg press',                            sets: 4, repMin: 8,  repMax: 12, defaultWeight: '45kg', hasWeight: true,  notes: 'Foot position mid-high, don\'t lock knees' },
  { id: 'd3-1', name: 'Seated leg extension',                 sets: 3, repMin: 12, repMax: 15, defaultWeight: '18kg', hasWeight: true,  notes: 'Controlled, don\'t snap to lockout' },
  { id: 'd3-2', name: 'Split squat (short ROM, support)',     sets: 2, repMin: 10, repMax: 12, defaultWeight: 'BW',   hasWeight: false, notes: 'Skip if foot flares > 3/10 pain' },
  { id: 'd3-3', name: 'Seated leg curl',                      sets: 3, repMin: 10, repMax: 15, defaultWeight: '25kg', hasWeight: true,  notes: 'Slow eccentric, hamstring focus' },
  { id: 'd3-4', name: 'Seated calf raise',                    sets: 3, repMin: 15, repMax: 20, defaultWeight: '27kg', hasWeight: true,  notes: 'Seated preferred (less foot load)' },
  { id: 'd3-5', name: 'Tibialis raises',                      sets: 2, repMin: 15, repMax: 25, defaultWeight: '',     hasWeight: false, notes: 'Critical for foot/ankle stability' },
  { id: 'd3-6', name: 'Glute bridge (bodyweight)',            sets: 3, repMin: 12, repMax: 12, defaultWeight: '',     hasWeight: false, notes: 'Squeeze glutes at top, hold 2s' },
  { id: 'd3-7', name: 'Pallof press (core)',                  sets: 2, repMin: 10, repMax: 10, defaultWeight: '18kg', hasWeight: true,  notes: 'Alternate side focus' },
];

export const DAY4 = [
  { id: 'd4-0', name: 'Hip thrust (bench + DB/BB)',           sets: 4, repMin: 8,  repMax: 12, defaultWeight: '35lb', hasWeight: true,  notes: 'Full squeeze at top, heavy is ok' },
  { id: 'd4-1', name: 'Cable pull-through',                   sets: 3, repMin: 12, repMax: 15, defaultWeight: '23kg', hasWeight: true,  notes: 'Hinge pattern, squeeze glutes' },
  { id: 'd4-2', name: 'DB Romanian deadlift',                 sets: 3, repMin: 8,  repMax: 12, defaultWeight: 'bar',  hasWeight: true,  notes: 'Start light, add weight slowly' },
  { id: 'd4-3', name: 'Cable kickbacks',                      sets: 3, repMin: 15, repMax: 20, defaultWeight: '18kg', hasWeight: true,  notes: 'Glute isolation, don\'t arch back (each side)' },
  { id: 'd4-4', name: 'Cable abduction',                      sets: 3, repMin: 15, repMax: 25, defaultWeight: '9kg',  hasWeight: true,  notes: 'Side-lying or standing, glute medius' },
  { id: 'd4-5', name: 'Dead bugs (core)',                     sets: 2, repMin: 10, repMax: 10, defaultWeight: '',     hasWeight: false, notes: 'Core finisher, slow and controlled' },
  { id: 'd4-6', name: 'Bird-dogs (core)',                     sets: 2, repMin: 10, repMax: 10, defaultWeight: '',     hasWeight: false, notes: 'Anti-extension focus' },
];

export const GYM_DAYS = [
  { id: 'day1', label: 'Day 1 — PUSH + Core',   tags: ['Chest', 'Shoulders', 'Triceps', 'Core'], exercises: DAY1 },
  { id: 'day2', label: 'Day 2 — PULL + Core',   tags: ['Back', 'Biceps', 'Rear delts', 'Core'], exercises: DAY2 },
  { id: 'day3', label: 'Day 3 — LEGS + Core',   tags: ['Quads', 'Hamstrings', 'Calves', 'Core'], exercises: DAY3 },
  { id: 'day4', label: 'Day 4 — GLUTES + Core', tags: ['Glutes', 'Hamstrings', 'Core'], exercises: DAY4 },
];

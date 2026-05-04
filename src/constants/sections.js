export const SECTIONS = [
  { id: 'overview',  title: 'Overview',        icon: '◉', color: '#c8d8ff' },
  { id: 'pain',      title: 'Daily Tracker',   icon: '◑', color: '#ff6eb4' },
  { id: 'ailments',  title: 'Ailments',        icon: '✦', color: '#56fcd8' },
  { id: 'gym',       title: 'Gym Tracker',     icon: '⬡', color: '#56d6fc' },
  { id: 'diet',      title: 'Diet & Nutrition',icon: '◈', color: '#8877fc' },
  { id: 'sleep',     title: 'Sleep Protocol',  icon: '◐', color: '#aa88ff' },
  { id: 'daily',     title: 'Daily Routine',   icon: '◎', color: '#56fcc2' },
  { id: 'grocery',   title: 'Grocery List',    icon: '◫', color: '#ffa756' },
  { id: 'physio',    title: 'Physio Tracker',  icon: '✛', color: '#ff8c6b' },
  { id: 'interval',  title: 'Interval Timer',  icon: '◷', color: '#4df0e0' },
  { id: 'schedule',  title: 'Daily Schedule',  icon: '◶', color: '#77c0ff' },
];

export const NAV_GROUPS = [
  {
    id: 'overview',
    label: 'Overview',
    icon: '◉',
    color: '#c8d8ff',
    direct: 'overview',
  },
  {
    id: 'trackers',
    label: 'Trackers',
    icon: '◑',
    color: '#ff6eb4',
    sections: [
      { id: 'pain',    title: 'Daily Tracker'  },
      { id: 'gym',     title: 'Gym Tracker'    },
      { id: 'physio',  title: 'Physio Tracker' },
      { id: 'grocery', title: 'Grocery List'   },
    ],
  },
  {
    id: 'guides',
    label: 'Guides',
    icon: '◈',
    color: '#8877fc',
    sections: [
      { id: 'ailments', title: 'Ailments'        },
      { id: 'diet',     title: 'Diet & Nutrition' },
      { id: 'sleep',    title: 'Sleep Protocol'   },
      { id: 'daily',    title: 'Daily Routine'    },
    ],
  },
  {
    id: 'timers',
    label: 'Timers',
    icon: '◷',
    color: '#56fcd8',
    sections: [
      { id: 'interval', title: 'Interval Timer' },
      { id: 'schedule', title: 'Daily Schedule' },
    ],
  },
];

export const FONT = `'Georgia', 'Times New Roman', serif`;
export const MONO = `'Courier New', monospace`;

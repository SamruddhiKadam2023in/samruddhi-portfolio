export const aboutIntro =
  'I build full-stack applications, developer tools, and intelligent systems that turn complex workflows and data into usable software.';

export const aboutBody = [
  'Most of what I build spans the whole stack: React and TypeScript on the front end, Python (FastAPI) and Node.js (Express) services behind it, and PostgreSQL, MongoDB and Redis underneath. When a problem calls for it, I add computer vision or NLP, such as reading utility bills with OCR or detecting vehicles and terrain features with YOLO and OpenCV.',
  'I care about what makes software dependable once it leaves my machine: tests that cover real user flows, clear states when things fail, secure defaults, and documentation someone else can actually follow.',
];

export interface FocusArea {
  title: string;
  detail: string;
}

/** Each area is grounded in at least one project on this site. */
export const focusAreas: FocusArea[] = [
  { title: 'Frontend', detail: 'Responsive, accessible React interfaces with live updates.' },
  { title: 'Backend', detail: 'REST APIs, background workers, authentication and roles.' },
  { title: 'AI / ML', detail: 'OCR and NLP pipelines that turn documents into structured data.' },
  {
    title: 'Computer vision',
    detail: 'Object detection with YOLO and classical OpenCV techniques.',
  },
  { title: 'Developer tooling', detail: 'API monitoring, alerting and incident workflows.' },
  {
    title: 'Data-driven apps',
    detail: 'Analytics, forecasting and reports built on real records.',
  },
];

export interface LoopStep {
  label: string;
  note: string;
}

export const engineeringLoop: LoopStep[] = [
  { label: 'Build', note: 'ship the smallest useful version' },
  { label: 'Test', note: 'cover the real user flows' },
  { label: 'Debug', note: 'read logs, reproduce, isolate' },
  { label: 'Improve', note: 'refactor, harden, document' },
];

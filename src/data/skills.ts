import type { Skill, SkillCategory } from '../types/skill';

export const skillCategories: SkillCategory[] = [
  { id: 'languages', number: '01', label: 'Languages' },
  { id: 'frontend', number: '02', label: 'Frontend' },
  { id: 'backend', number: '03', label: 'Backend' },
  { id: 'databases', number: '04', label: 'Databases' },
  { id: 'ai-ml', number: '05', label: 'AI / ML' },
  { id: 'tools', number: '06', label: 'Tools' },
];

// Project mappings come from each repository's dependencies and source:
// PropAI (FastAPI + React/JS), TraceLayer (Express + React/TS),
// UrbanPuls (FastAPI + React/JS + YOLO11), ISRO (Python, OpenCV, YOLOv8, PyQt6).
const ALL_WEB = ['propai', 'tracelayer', 'urbanpuls'];
const ALL = [...ALL_WEB, 'isro'];

export const skills: Skill[] = [
  // Languages
  { name: 'JavaScript', category: 'languages', projects: ['propai', 'urbanpuls'] },
  { name: 'TypeScript', category: 'languages', projects: ['tracelayer'] },
  { name: 'Python', category: 'languages', projects: ['propai', 'urbanpuls', 'isro'] },
  { name: 'Java', category: 'languages', projects: [] },
  { name: 'SQL', category: 'languages', projects: ALL_WEB },

  // Frontend
  { name: 'React', category: 'frontend', projects: ALL_WEB },
  { name: 'HTML', category: 'frontend', projects: ALL_WEB },
  { name: 'CSS', category: 'frontend', projects: ALL_WEB },
  { name: 'Tailwind CSS', category: 'frontend', projects: ALL_WEB },
  { name: 'Vite', category: 'frontend', projects: ALL_WEB },

  // Backend
  { name: 'Node.js', category: 'backend', projects: ['tracelayer'] },
  { name: 'Express.js', category: 'backend', projects: ['tracelayer'] },
  { name: 'FastAPI', category: 'backend', projects: ['propai', 'urbanpuls'] },
  { name: 'REST APIs', category: 'backend', projects: ALL_WEB },

  // Databases
  { name: 'PostgreSQL', category: 'databases', projects: ALL_WEB },
  { name: 'MongoDB', category: 'databases', projects: ['propai'] },
  { name: 'Prisma', category: 'databases', projects: ['tracelayer'] },

  // AI / ML
  { name: 'Machine Learning', category: 'ai-ml', projects: ['propai', 'urbanpuls', 'isro'] },
  { name: 'OpenCV', category: 'ai-ml', projects: ['propai', 'urbanpuls', 'isro'] },
  { name: 'YOLO', category: 'ai-ml', projects: ['urbanpuls', 'isro'] },
  { name: 'Tesseract OCR', category: 'ai-ml', projects: ['propai'] },
  { name: 'NLP', category: 'ai-ml', projects: ['propai'] },
  { name: 'LLMs', category: 'ai-ml', projects: [] },
  { name: 'RAG', category: 'ai-ml', projects: [] },

  // Tools
  { name: 'Git', category: 'tools', projects: ALL },
  { name: 'GitHub', category: 'tools', projects: ALL },
  { name: 'Docker', category: 'tools', projects: ALL_WEB },
];

import type { Project } from '../types/project';

// Source of truth: each project's repository (README, dependencies and source).
// Nothing here should be added unless it is actually implemented.

export const projects: Project[] = [
  {
    id: 'propai',
    slug: 'propai',
    number: '01',
    title: 'PropAI',
    tagline: 'AI-driven financial analytics for property management',
    category: 'AI / Data / Full Stack',
    projectType: 'individual',
    shortDescription:
      'A property management platform for tenants, owners and managers. It reads English and Marathi utility bills with OCR, turns them into tracked expenses with a next-month forecast, and compares rents against the market with a KNN model.',
    technologies: [
      'React',
      'FastAPI',
      'PostgreSQL',
      'MongoDB',
      'Redis',
      'Tesseract OCR',
      'OpenCV',
      'spaCy',
      'Docker',
    ],
    featured: true,
    githubUrl: 'https://github.com/SamruddhiKadam2023in/PropAI',
    images: [],
    hasCaseStudy: true,
  },
  {
    id: 'tracelayer',
    slug: 'tracelayer',
    number: '02',
    title: 'TraceLayer',
    tagline: 'API reliability and observability platform',
    category: 'Developer Tools / API Observability',
    projectType: 'individual',
    shortDescription:
      'Schedules recurring checks against your APIs, records every result, and turns it into uptime, latency percentiles, alerts and incidents with a timeline — all updating live in the browser.',
    technologies: [
      'React',
      'TypeScript',
      'Express',
      'PostgreSQL',
      'Prisma',
      'Redis',
      'BullMQ',
      'Socket.IO',
      'Docker',
    ],
    featured: true,
    githubUrl: 'https://github.com/SamruddhiKadam2023in/TraceLayer',
    images: [],
    hasCaseStudy: true,
  },
  {
    id: 'urbanplus',
    slug: 'urbanplus',
    number: '03',
    title: 'UrbanPlus',
    tagline: 'Traffic and parking management for Mumbai',
    category: 'Full Stack / Smart City',
    projectType: 'individual',
    shortDescription:
      'Drivers reserve parking and pay at the gate only for the time they park. Lot owners run their gates from a phone, citizens report illegal parking, and a YOLO model flags vehicles standing in no-parking areas. Available in English, Hindi and Marathi.',
    technologies: [
      'React',
      'Redux Toolkit',
      'FastAPI',
      'PostgreSQL',
      'Redis',
      'YOLO11',
      'OpenCV',
      'Leaflet',
      'WebSockets',
      'Docker',
    ],
    featured: true,
    githubUrl: 'https://github.com/SamruddhiKadam2023in/UrbanPuls',
    images: [],
    hasCaseStudy: true,
  },
  {
    id: 'isro',
    slug: 'isro-robotics-challenge',
    number: '04',
    title: 'ISRO Robotics Challenge',
    tagline: 'Autonomy toolkit for a GPS-denied quadcopter',
    category: 'Robotics / Computer Vision / Autonomous Systems',
    projectType: 'group',
    shortDescription:
      'Software for an autonomous quadcopter that has to navigate without GPS: crater and safe-landing-spot detection, Kalman-filter state estimation, RRT* path planning, and a ground control station to monitor the drone.',
    technologies: ['Python', 'OpenCV', 'YOLOv8', 'NumPy', 'PyQt6', 'DroneKit', 'MAVLink'],
    featured: true,
    githubUrl: 'https://github.com/SamruddhiKadam2023in/ANAV_ISRO_Robotics_Challenge',
    images: [],
    contribution: [
      'Built the ground control station GUI in PyQt6: a live camera feed with an edge-detection overlay, attitude and heading indicators, vehicle status, motor tests and arm/disarm controls, connected to the ArduPilot flight controller through DroneKit and MAVLink.',
      'Contributed to path planning: RRT* with parent re-selection and rewiring, combined with Kalman-filtered position estimates over a terrain map.',
    ],
    hasCaseStudy: false,
  },
];

export function getProjectBySlug(slug: string | undefined): Project | undefined {
  return projects.find((project) => project.slug === slug && project.hasCaseStudy);
}

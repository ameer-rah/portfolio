export interface ProjectHighlight {
  title: string;
  text: string;
  tech: string[];
}

export interface Project {
  id: string;
  name: string;
  type: string;
  description: string;
  stack: string[];
  highlights: ProjectHighlight[];
  github?: string;
  live?: string;
}

export const PROJECTS: Project[] = [
  {
    id: 'ruplanner',
    name: 'RUPlanner',
    type: 'Full-Stack Web App',
    description:
      'A degree planning engine for Rutgers New Brunswick. Evaluates degree requirements and builds prerequisite-aware semester plans, wrapped in a web app with accounts and saved plans.',
    stack: ['Python', 'TypeScript', 'PostgreSQL', 'Docker'],
    highlights: [
      {
        title: 'Planner brain',
        text: 'The core engine, written in Python. Resolves degree requirements against a course catalog and orders coursework so prerequisites always land in an earlier semester.',
        tech: ['Python', 'PostgreSQL'],
      },
      {
        title: 'Web app',
        text: 'TypeScript frontend for course search, plan building, and progress tracking, with authentication so students can save and revisit a plan.',
        tech: ['TypeScript', 'CSS'],
      },
      {
        title: 'Data layer',
        text: 'PostgreSQL for catalog and plan storage, including stored procedures for requirement queries. Containerized with Docker for reproducible deploys.',
        tech: ['PostgreSQL', 'PL/pgSQL', 'Docker'],
      },
    ],
    github: 'https://github.com/ameer-rah/RUPlanner',
    live: 'https://ruplanner.app',
  },
  {
    id: 'clinical-lab-monitoring',
    name: 'Clinical Lab & Patient Monitoring',
    type: 'Full-Stack Web App',
    description:
      'A simplified clinical information system for tracking lab results, vital signs, and medications over time. A Flask REST API serves a healthcare relational model out of PostgreSQL, and a React dashboard flags results outside their reference range and charts how each measurement has moved. All data is synthetic.',
    stack: ['Python', 'Flask', 'PostgreSQL', 'TypeScript', 'React', 'Docker'],
    highlights: [
      {
        title: 'Reference ranges as configuration',
        text: 'Ranges live in a table, not in code. Each row is an interval for one measurement, optionally narrowed by sex and age, so the resolver picks the most specific match — 13.0 g/dL of hemoglobin comes back low for a male patient and normal for a female one.',
        tech: ['Python', 'PostgreSQL'],
      },
      {
        title: 'One interpretation engine',
        text: 'Lab results and vital signs stay separate tables because they are separate clinical concepts, but both key on a measurement code, so a single engine interprets both. The dashboard never re-derives status client-side; it renders what the API decided.',
        tech: ['Flask', 'React'],
      },
      {
        title: 'FHIR and honest data',
        text: 'A read-only FHIR R4 layer projects the same records as Patient, Observation, and MedicationRequest resources. Seeded patients follow real clinical trajectories over two years, and unmapped codes resolve to unknown rather than silently normal.',
        tech: ['FHIR R4', 'TypeScript'],
      },
    ],
    github: 'https://github.com/ameer-rah/clinical-lab-monitoring',
  },
  {
    id: 'chest-xray',
    name: 'Chest X-Ray Classifier',
    type: 'Machine Learning',
    description:
      'A fine-tuned CNN that sorts chest X-rays into COVID-19, lung opacity, normal, or viral pneumonia, served over a FastAPI endpoint with a minimal browser UI for testing it. An educational project, not a diagnostic tool.',
    stack: ['Python', 'PyTorch', 'FastAPI', 'Docker'],
    highlights: [
      {
        title: 'Model',
        text: 'ResNet18 pretrained on ImageNet, fine-tuned on roughly 21,000 X-rays. Training uses inverse-frequency class weighting so the majority class does not swamp the rare ones.',
        tech: ['PyTorch', 'ResNet18'],
      },
      {
        title: 'Serving',
        text: 'FastAPI backend exposing a /predict endpoint that takes an image upload and returns a label with a confidence score, plus a lightweight web frontend.',
        tech: ['FastAPI', 'JavaScript'],
      },
      {
        title: 'Knowing the limits',
        text: 'The README documents where the model fails: no out-of-distribution detection, so a softmax over four classes stays confident even on inputs that are not X-rays at all.',
        tech: ['Evaluation'],
      },
    ],
    github: 'https://github.com/ameer-rah/chest-xray-classifier',
  },
  {
    id: 'njcu-community',
    name: 'NJCU Community Analysis',
    type: 'Data Analysis',
    description:
      'A demographic profile of who actually lives around each of NJCU\'s three campuses, built from every New Jersey census tract within 3 and 5 miles using ACS 2019-2023 5-Year Estimates.',
    stack: ['Python', 'Jupyter', 'pandas', 'U.S. Census ACS'],
    highlights: [
      {
        title: 'The question',
        text: 'Profiled 3-mile and 5-mile catchments around all three campuses by race, sex, and age, covering populations from 72,000 to 574,000 people.',
        tech: ['Census API', 'pandas'],
      },
      {
        title: 'The finding',
        text: 'The three catchments are not one community. Fort Monmouth is roughly ten times less dense than the Jersey City campuses, six years older at the median, and about 2.4 times as White.',
        tech: ['Jupyter'],
      },
      {
        title: 'Being honest about it',
        text: 'The Jersey City rings cross into New York, so those tracts are excluded by design rather than silently folded in. The two Jersey City campuses sit 2.5 miles apart, so their figures overlap and are not additive.',
        tech: ['Methodology'],
      },
    ],
    github: 'https://github.com/ameer-rah/njcu-community-analysis-internal',
  },
];

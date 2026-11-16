export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  period: string;
  subtitle: string;
  type: 'Startup' | 'Internship';
  highlights: string[];
  stack: string[];
}

export interface ProjectItem {
  id: string;
  title: string;
  tagline: string;
  category: 'Full-Stack' | 'EdTech' | 'E-Commerce & Booking';
  impactMetric?: string;
  liveUrl?: string;
  liveLabel?: string;
  githubUrl?: string;
  summary: string;
  highlights: string[];
  stack: string[];
  accentColor: 'blue' | 'teal' | 'indigo';
}

export interface SkillGroup {
  category: string;
  items: string[];
}

export interface EducationItem {
  degree: string;
  institution: string;
  detail?: string;
  period: string;
}

export interface CertificationItem {
  title: string;
  issuer: string;
}

export interface ReferenceItem {
  name: string;
  role: string;
  institution: string;
  email: string;
  phone: string;
}

export const PROFILE = {
  name: 'Abishanan Pathmarajah',
  shortName: 'Abishanan P.',
  headline: 'Full-Stack Software Engineer',
  subHeadline: 'Computer Science Undergraduate · React · Laravel · Node.js · .NET · Python',
  location: 'Jaffna, Sri Lanka',
  availability: 'Open to Full-Stack, Backend & Frontend Roles (Remote / Hybrid)',
  email: 'abishanan123@gmail.com',
  phone: '+94 71 134 6376',
  phoneHref: 'tel:+94711346376',
  links: {
    linkedin: 'https://linkedin.com',
    github: 'https://github.com/AbiMabi1011',
    portfolio: 'https://abishanan.tech',
  },
  summary:
    'Computer Science undergraduate with hands-on experience building production web platforms using Laravel, React, and Node.js, including 12 months of combined internship and startup software engineering experience. Also experienced with C# and .NET. Skilled in designing RESTful APIs, optimizing MySQL and MongoDB databases, and managing full development lifecycles from architecture through CI/CD deployment via GitHub and GitLab.',
  stats: [
    { value: '12+ Mo', label: 'Industry Experience' },
    { value: '3+', label: 'Production Platforms' },
    { value: '6', label: 'Verified Certifications' },
    { value: 'B.Sc.', label: 'Hons CS (May 2027)' },
  ],
};

export const EXPERIENCES: ExperienceItem[] = [
  {
    id: 'ultrakerb',
    role: 'Software Engineer',
    company: 'UltraKerb (Startup)',
    period: 'Mar 2026 – Aug 2026',
    subtitle: 'Retail / e-commerce startup',
    type: 'Startup',
    highlights: [
      'Built a full POS system using React (frontend) and Node.js/Express (backend), supporting day-to-day sales operations.',
      'Developed and maintained the startup’s web projects alongside the founding team, handling both frontend and backend work.',
      'Worked directly with the founder to scope features, ship updates, and resolve issues in a fast-moving startup environment.',
    ],
    stack: ['React', 'Node.js', 'Express', 'REST APIs', 'Full-Stack'],
  },
  {
    id: 'codevita',
    role: 'Intern Software Engineer',
    company: 'CodeVita (Pvt) Ltd.',
    period: 'Aug 2025 – Jan 2026',
    subtitle: 'Offero.lk — Sri Lankan deals platform for bank cards, vehicles, properties, and events',
    type: 'Internship',
    highlights: [
      'Led frontend development for a multi-category platform spanning Vehicles, Properties, and Events, delivering a fully responsive UI used across 3 product verticals.',
      'Built and maintained backend modules for Bank Card Offers, User Management, and Events, using PHP/MySQL.',
      'Optimized data flow between user dashboards and the backend, improving real-time deal-tracking reliability across the platform.',
    ],
    stack: ['PHP', 'MySQL', 'Responsive UI', 'JavaScript', 'Dashboards'],
  },
];

export const PROJECTS: ProjectItem[] = [
  {
    id: 'lms',
    title: 'Learning Management System (LMS)',
    tagline: 'Dual-Access Educational & Assessment Platform',
    category: 'EdTech',
    impactMetric: 'Dual-Access Hubs + Interactive Quizzes',
    liveUrl: 'https://lms.abishanan.tech',
    liveLabel: 'lms.abishanan.tech',
    summary:
      'A comprehensive educational platform featuring a public, login-free Knowledge Hub alongside a credential-gated Learning Hub for enrolled students and educators.',
    highlights: [
      'Built a dual-access educational platform: a public, login-free "Knowledge Hub" and a credential-gated "Learning Hub" for enrolled students.',
      'Developed a teacher/admin dashboard for managing student enrollments, uploading academic papers, and configuring interactive quizzes.',
    ],
    stack: ['React', 'Laravel', 'MySQL', 'Tailwind CSS', 'Role-Based Auth'],
    accentColor: 'blue',
  },
  {
    id: 'kalappai',
    title: 'Kalappai — Studio Booking & Portfolio',
    tagline: 'Photography & Cinematography Studio Management System',
    category: 'E-Commerce & Booking',
    impactMetric: 'Automated Installments + YouTube Sync',
    liveUrl: 'https://kalappai.abishanan.tech',
    liveLabel: 'kalappai.abishanan.tech',
    summary:
      'End-to-end studio management and client showcase platform uniting a categorized media gallery, calendar-based booking, installment automation, and YouTube sync.',
    highlights: [
      'Built a React + Laravel management system for photography/cinematography studios with a categorized media gallery and calendar-based booking.',
      'Automated splitting of booking fees into scheduled installments and built an admin dashboard to manage bookings, portfolios, and payment status, with automated reminders and YouTube video sync.',
    ],
    stack: ['React', 'Laravel', 'MySQL', 'YouTube Sync', 'Automated Reminders'],
    accentColor: 'teal',
  },
  {
    id: 'wanlanka',
    title: 'Wanlanka — Travel Booking Platform',
    tagline: 'Dynamic Tour Package & Pricing Engine',
    category: 'Full-Stack',
    impactMetric: '50+ Customizable Tour Packages',
    summary:
      'A full-featured travel booking platform engineered to manage customizable multi-component tour packages with real-time dynamic pricing calculations.',
    highlights: [
      'Developed a Laravel/MySQL travel platform managing 50+ customizable tour packages (transport, accommodation, guides) with dynamic pricing logic.',
    ],
    stack: ['Laravel', 'MySQL', 'PHP', 'MVC Pattern', 'Dynamic Pricing'],
    accentColor: 'indigo',
  },
];

export const SKILL_GROUPS: SkillGroup[] = [
  {
    category: 'Languages',
    items: ['Java', 'Python', 'JavaScript (ES6+)', 'PHP', 'HTML5', 'CSS3', 'SQL'],
  },
  {
    category: 'Frameworks & Libraries',
    items: ['Laravel', 'React.js', 'Node.js', 'Express', '.NET (C#)', 'Bootstrap', 'Tailwind CSS'],
  },
  {
    category: 'Databases',
    items: ['MySQL', 'MongoDB', 'Microsoft SQL Server'],
  },
  {
    category: 'Tools & Platforms',
    items: ['Git', 'GitHub', 'GitLab', 'VS Code', 'Postman', 'XAMPP', 'Jira', 'Power BI'],
  },
  {
    category: 'Engineering Concepts',
    items: ['RESTful API Development', 'OOP', 'MVC Pattern', 'CI/CD', 'Agile', 'Data Structures & Algorithms'],
  },
];

export const EDUCATION: EducationItem[] = [
  {
    degree: 'B.Sc. (Hons) Computer Science',
    institution: 'SLIIT City University, Sri Lanka',
    detail: 'Affiliated with University of Bedfordshire, UK',
    period: 'Expected: May 2027',
  },
  {
    degree: 'G.C.E. Advanced Level',
    institution: "St. John's College, Jaffna",
    period: 'Completed',
  },
];

export const CERTIFICATIONS: CertificationItem[] = [
  { title: 'Problem Solving (Basic)', issuer: 'HackerRank' },
  { title: 'Python (Basic)', issuer: 'HackerRank' },
  { title: 'C# (Basic)', issuer: 'HackerRank' },
  { title: 'Python for Beginners', issuer: 'University of Moratuwa (CODL)' },
  { title: 'Front-End Web Development', issuer: 'University of Moratuwa (CODL)' },
  { title: 'Web Design for Beginners', issuer: 'University of Moratuwa (CODL)' },
];

export const SPOKEN_LANGUAGES = [
  { language: 'English', level: 'Professional Proficiency' },
  { language: 'Tamil', level: 'Native' },
];

export const REFERENCES: ReferenceItem[] = [
  {
    name: 'Mr. V.A.M. Ragunathan Sinthujan',
    role: 'Lecturer, Department of IT',
    institution: 'SLIIT Northern Uni, Jaffna, Sri Lanka',
    email: 'sinthujan.r@sliit.lk',
    phone: '+94 76 803 5092',
  },
  {
    name: 'Mr. K. Thiruthanigesan',
    role: 'Lecturer, Department of IT',
    institution: 'SLIIT Northern Uni, Jaffna, Sri Lanka',
    email: 'thiruthanigesan.k@sliit.lk',
    phone: '+94 77 990 2255',
  },
];

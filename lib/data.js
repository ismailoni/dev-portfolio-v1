// Single source of truth for portfolio content.
// Used by the 3D scene AND by the hidden semantic (SEO / screen-reader) mirror of every page.

export const navLinks = [
  { name: 'home', url: '/' },
  { name: 'services', url: '/services' },
  { name: 'resume', url: '/resume' },
  { name: 'work', url: '/work' },
  { name: 'contact', url: '/contact' },
]

export const hero = {
  pill: 'Full-Stack Engineer • Product-Focused',
  line1: 'Designing Fast, Elegant',
  line2: 'Web Experiences',
  blurb:
    'I help startups and teams build fast, scalable web applications with clean design, smooth interactions, and real-world performance in mind.',
  focus: 'SaaS • Dashboards • Landing Pages',
  location: 'Lagos, Nigeria • Remote Worldwide',
  resumeFile: '/IsmailOniResume.pdf',
}

export const stats = [
  { num: 4, plus: true, text: 'Years Experience' },
  { num: 20, plus: true, text: 'Projects Delivered' },
  { num: 6, plus: false, text: 'Core Technologies' },
  { num: 400, plus: true, text: 'Code Commits' },
]

export const socials = [
  { icon: 'github', label: 'GitHub', url: 'https://www.github.com/ismailoni' },
  { icon: 'linkedin', label: 'LinkedIn', url: 'https://www.linkedin.com/in/ismail-oni' },
  { icon: 'youtube', label: 'YouTube', url: 'https://www.youtube.com/' },
  { icon: 'x', label: 'X (Twitter)', url: 'https://www.x.com/IsmailOni3' },
]

export const services = [
  {
    num: '01',
    title: 'Web App Development',
    description:
      'Production-grade web applications built with React and Next.js—optimized for performance, scalability, and real-world user growth.',
    highlights: ['MVP to full-scale platforms', 'Clean, maintainable architecture', 'API integration & state management'],
    href: '/contact',
  },
  {
    num: '02',
    title: 'UI/UX Implementation',
    description:
      'From Figma to flawless interfaces—pixel-perfect, accessible, and responsive designs with smooth animations.',
    highlights: ['Exact Figma-to-code translation', 'Accessibility-first (WCAG)', 'Responsive across all devices'],
    href: '/contact',
  },
  {
    num: '03',
    title: 'Performance Optimization',
    description:
      'Speed that converts. I optimize Core Web Vitals and eliminate bottlenecks to improve SEO and retention.',
    highlights: ['Faster load times (LCP, CLS, TBT)', 'Bundle size reduction', 'Advanced caching strategies'],
    href: '/contact',
  },
  {
    num: '04',
    title: 'Full-Stack Integration',
    description:
      'Seamless connection between frontend and backend systems for reliable, scalable applications.',
    highlights: ['REST & API integration', 'Authentication & security', 'Database-driven features'],
    href: '/contact',
  },
  {
    num: '05',
    title: 'Landing Page Development',
    description:
      'High-converting landing pages designed to capture attention, drive engagement, and increase conversions.',
    highlights: ['Conversion-focused layouts', 'Animation & micro-interactions', 'SEO-friendly structure'],
    href: '/contact',
  },
]

export const servicesIntro =
  'I design and build high-performance web experiences that don’t just look good—they load fast, scale well, and drive measurable business results.'

export const about = {
  title: 'About me',
  description:
    'I’m a frontend-focused full-stack developer who builds fast, scalable, and visually polished web applications. I specialize in turning ideas and designs into production-ready products that deliver real business value—not just clean code, but meaningful user experiences.',
  info: [
    { fieldName: 'Name', fieldValue: 'Ismail Oni' },
    { fieldName: 'Phone', fieldValue: '(+234) 810 656 4010' },
    { fieldName: 'Experience', fieldValue: '3+ Years' },
    { fieldName: 'Email', fieldValue: 'ismailoni80@gmail.com' },
    { fieldName: 'Freelance', fieldValue: 'Available for work' },
    { fieldName: 'Languages', fieldValue: 'English, Yoruba, Arabic (basic)' },
  ],
}

export const experience = {
  title: 'My experience',
  description: 'Real-world projects, freelance work, and production applications delivering measurable impact.',
  items: [
    { company: 'Upwork', position: 'Freelance Fullstack Developer', duration: 'July 2024 - Present' },
    { company: 'Dataverse Media', position: 'Frontend Developer', duration: '2023 - September 2024' },
    { company: 'Halqatul Hikmah Madrasah', position: 'Frontend Developer', duration: 'October 2025 - Present' },
  ],
}

export const education = {
  title: 'My education',
  description: 'Continuous learning and hands-on practice in modern frontend engineering.',
  items: [
    { institution: 'Udemy', degree: 'Frontend Development (React, Next.js, Advanced Patterns)', duration: '2024 - Present' },
    { institution: 'Codecademy', degree: 'Advanced Frontend Development', duration: '2023' },
    { institution: 'FreeCodeCamp', degree: 'Frontend Development Fundamentals', duration: '2021 - 2022' },
  ],
}

export const skills = {
  title: 'My skills',
  description: 'Tools and technologies I use to build modern, performant, and scalable web applications.',
  // `short` is what's printed on the 3D skills sphere, `name` is the full label.
  list: [
    { short: 'HTML5', name: 'HTML5' },
    { short: 'CSS3', name: 'CSS3' },
    { short: 'JavaScript', name: 'JavaScript (ES6+)' },
    { short: 'React', name: 'React.js' },
    { short: 'Next.js', name: 'Next.js' },
    { short: 'Tailwind', name: 'Tailwind CSS' },
    { short: 'Node.js', name: 'Node.js' },
    { short: 'WordPress', name: 'WordPress Theme Customization' },
    { short: 'PHP', name: 'PHP' },
  ],
}

export const projects = [
  {
    num: '01',
    category: 'Fullstack Project',
    title: 'Halqatul Hikmah LMS',
    role: 'Frontend Developer',
    responsibilities: [
      'Built the responsive landing experience and reusable content sections.',
      'Created motion-rich UI interactions to guide users through the funnel.',
      'Built the Admin dashboard and all associated features.',
      'Built the teacher dashboard with all associated features.',
      'Optimized layout structure for SEO and fast load performance.',
    ],
    description:
      'A modern learning management system for an Arabic school, featuring a responsive design and intuitive user interface.',
    stack: ['React', 'Tailwind CSS', 'Shadcn/UI', 'Node.Js'],
    cover: '/3d/work1.webp',
    gallery: [
      { src: '/work1-1.png', alt: 'Website Landing', label: 'Landing', focus: 'center' },
      { src: '/work1-2.png', alt: 'Admin Dashboard', label: 'Admin dashboard', focus: 'top' },
      { src: '/work1-3.png', alt: 'Teacher Dashboard', label: 'Teacher dashboard', focus: 'center' },
      { src: '/work1-4.png', alt: 'Admin Course preview', label: 'Course Preview', focus: 'center' },
    ],
    live: 'https://halqahtulhikmah.org',
  },
  {
    num: '02',
    category: 'Fullstack Project',
    title: 'Haaflah App',
    role: 'Fullstack Developer',
    responsibilities: [
      'Implemented the client-facing interface for the event management flow.',
      'Designed dashboard views for registrations, venue access, and event tracking.',
      'Integrated responsive UI patterns for a smooth mobile-first experience.',
      'Developed RESTful APIs to support the frontend functionality.',
      'Managed database schema design and optimization for efficient data queries.',
      'Built authentication and authorization systems for secure user access.',
    ],
    description:
      'A solution for modern event management platform that streamlines the entire event lifecycle — from registration to venue access control.',
    stack: ['React', 'Node.Js', 'PostgreSQL'],
    cover: '/3d/work2.webp',
    gallery: [
      { src: '/work2-1.png', alt: 'Haaflah event management Landing', label: 'Landing Page', focus: 'top' },
      { src: '/work2-2.png', alt: 'Haaflah event management dashboard', label: 'Dashboard overview', focus: 'center' },
      { src: '/work2-3.png', alt: 'Event management page', label: 'Event management', focus: 'center' },
      { src: '/work2-4.png', alt: 'Event creation preview', label: 'Creation flow', focus: 'center' },
      { src: '/work2-5.png', alt: 'Event Registration preview', label: 'Registration flow', focus: 'center' },
    ],
    live: 'https://haaflah.vercel.app/',
    github: 'https://github.com/ismailoni/haaflah-frontend',
  },
  {
    num: '03',
    category: 'Fullstack Project',
    title: 'Nusy Wears Online Store',
    role: 'Fullstack Developer',
    responsibilities: [
      'Built a responsive e-commerce frontend with product browsing and filtering capabilities.',
      'Designed and implemented a modern shopping cart and checkout experience.',
      'Integrated Paystack payment gateway for secure online transactions.',
      'Implemented Firebase authentication for Admin login.',
      'Built admin dashboard for inventory and order management.',
      'Optimized app performance with React Query for efficient data fetching and caching.',
    ],
    description:
      'An online store for selling fashion items, featuring a modern design and seamless shopping experience.',
    stack: ['React', 'React Query', 'Firebase Auth', 'Firestore', 'Paystack'],
    cover: '/3d/work3.webp',
    gallery: [
      { src: '/work3-1.png', alt: 'Nusy Wears Landing', label: 'Landing Page', focus: 'top' },
      { src: '/work3-2.png', alt: 'Nusy Wears Shop', label: 'Product Catalog', focus: 'center' },
      { src: '/work3-3.png', alt: 'Nusy Wears Product View', label: 'Product View', focus: 'center' },
      { src: '/work3-4.png', alt: 'Nusy Wears Cart', label: 'Shopping Cart', focus: 'center' },
      { src: '/work3-5.png', alt: 'Nusy Wears Checkout', label: 'Checkout Process', focus: 'center' },
      { src: '/work3-6.png', alt: 'Nusy Wears Order Tracking', label: 'Order Tracking', focus: 'center' },
      { src: '/work3-7.png', alt: 'Nusy Wears Admin Dashboard', label: 'Admin Dashboard', focus: 'center' },
      { src: '/work3-8.png', alt: 'Nusy Wears Admin Order Management', label: 'Admin Dashboard', focus: 'center' },
      { src: '/work3-9.png', alt: 'Nusy Wears Admin Delivery Management', label: 'Admin Dashboard', focus: 'center' },
      { src: '/work3-10.png', alt: 'Nusy Wears Admin Payment Management', label: 'Admin Dashboard', focus: 'center' },
    ],
    live: 'https://nusy-wears-web.vercel.app/',
    github: 'https://github.com/ismailoni/nusy-wears-web',
  },
  {
    num: '04',
    category: 'Fullstack Project',
    title: "Susu Academy's E-learning Platform",
    role: 'Fullstack Developer',
    responsibilities: [
      'Built a comprehensive e-learning platform with student and instructor dashboards.',
      'Implemented course creation, management, and enrollment workflows.',
      'Integrated Stripe payment gateway for course purchases and subscription handling.',
      'Designed and built responsive UI components using modern React patterns.',
      'Set up Clerk authentication for secure user management and role-based access.',
      'Integrated Cloudinary for efficient media upload and optimization.',
      'Optimized database queries and implemented caching strategies for better performance.',
    ],
    description:
      'An e-learning platform designed to provide comprehensive educational resources and interactive learning experiences for students of all ages.',
    stack: ['Next.Js', 'Express.Js', 'PostgreSQL', 'Stripe', 'Clerk', 'Cloudinary'],
    cover: '/3d/work4.webp',
    gallery: [
      { src: '/work4-1.png', alt: 'Learning platform dashboard', label: 'Student dashboard', focus: 'top' },
      { src: '/work4-2.png', alt: 'Course catalog preview', label: 'Course catalog', focus: 'center' },
      { src: '/work4-3.png', alt: 'Student journey preview', label: 'Learning journey', focus: 'center' },
      { src: '/work4-4.png', alt: 'Responsive learning platform preview', label: 'Responsive view', focus: 'center' },
    ],
    live: 'https://ismail-lms.vercel.app/',
    github: 'https://github.com/ismailoni/lms',
  },
]

export const workIntro = 'Selected frontend and fullstack projects with a focus on performance and polished UX.'

export const contactInfo = [
  { title: 'Phone', value: '(+234) 810 656 4010', href: 'tel:+2348106564010' },
  { title: 'Email', value: 'ismailoni80@gmail.com', href: 'mailto:ismailoni80@gmail.com' },
  { title: 'Address', value: '17, Alubarika street, Bariga, Lagos, Nigeria.' },
]

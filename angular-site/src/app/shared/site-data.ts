export interface NavItem {
  label: string;
  path: string;
  children?: NavItem[];
}

export interface ServiceCard {
  title: string;
  text: string;
  image: string;
  path?: string;
}

export interface InfoCard {
  title: string;
  text: string;
  image: string;
}

export interface PageData {
  eyebrow: string;
  title: string;
  subtitle: string;
  image: string;
  body: string[];
  cards?: ServiceCard[];
}

export const asset = (path: string) => `assets/${path}`;

export const navItems: NavItem[] = [
  { label: 'Home', path: '/' },
  {
    label: 'Services',
    path: '/engineering-solutions',
    children: [
      { label: 'CFD & Simulation Services', path: '/cfd-and-simulation-engineers' },
      { label: 'Embedded, Electrical & Software', path: '/embedded-electrical-and-software-engineering-services' },
      { label: 'Mechanical Engineering Services', path: '/mechanical-engineering-services' },
    ],
  },
  { label: 'About us', path: '/engineering-services' },
  { label: 'Industries served', path: '/industry-solutions-engineering-solutions' },
  { label: 'Contact', path: '/engineering-randd-services' },
];

export const highlights: InfoCard[] = [
  {
    title: 'Penang, Malaysia',
    text: 'Serving manufacturers, MedTech & startups across Southeast Asia and globally.',
    image: asset('images/icon-location.png'),
  },
  {
    title: 'Scalable Engineering Capacity',
    text: 'Senior technical directors backed by a global network of specialists, we scale to match your project size.',
    image: asset('images/icon-network.png'),
  },
  {
    title: 'Parallel Project Delivery',
    text: 'Multiple projects running simultaneously, your deadline is always our priority.',
    image: asset('images/icon-parallel.png'),
  },
  {
    title: '7-Day First Delivery',
    text: 'From project brief to first deliverable in one week, guaranteed.',
    image: asset('images/icon-bolt.png'),
  },
];

export const services: ServiceCard[] = [
  {
    title: 'CFD & Simulation',
    text: 'ANSYS and OpenFOAM simulations for medical devices, HVAC, aerospace, and industrial systems. Full technical reports included.',
    image: asset('images/cfd-simulation.jpg'),
    path: '/cfd-and-simulation-engineers',
  },
  {
    title: 'PCB Design & Embedded Systems',
    text: 'From schematic to working prototype in 2 weeks. STM32, FPGA, IoT, wireless sensors, and industrial electronics.',
    image: asset('images/pcb-embedded.jpg'),
    path: '/embedded-electrical-and-software-engineering-services',
  },
  {
    title: 'Mechanical Design & 3D CAD',
    text: 'SolidWorks and CATIA design for industrial, aerospace, and marine applications. GD&T, assemblies, and manufacturing drawings.',
    image: asset('images/mechanical-design.jpg'),
    path: '/mechanical-engineering-services',
  },
  {
    title: 'Reverse Engineering',
    text: 'We rebuild failed components and restore production lines when OEM parts are unavailable. Precision drawings and physical replacements.',
    image: asset('images/reverse-engineering.jpg'),
  },
  {
    title: 'Rig & Automation Systems',
    text: 'Custom test benches for production QA and R&D validation. Data acquisition, sensors, and automated reporting.',
    image: asset('images/rig-automation.jpg'),
  },
  {
    title: 'R&D Consulting',
    text: 'Technical feasibility studies, concept design, and engineering reports for startups and established manufacturers.',
    image: asset('images/rd-consulting.jpg'),
  },
];

export const pageContent: Record<string, PageData> = {
  services: {
    eyebrow: 'Our Services',
    title: 'Precision engineering services for fast-moving technical teams.',
    subtitle: 'CFD, reverse engineering, PCB design, embedded systems, mechanical design, and automation delivered from one focused engineering partner.',
    image: asset('images/rig-automation.jpg'),
    body: [
      'HPS Technologies supports manufacturers, MedTech companies, and hardware startups with practical R&D execution.',
      'The team combines simulation, physical prototyping, automation, and technical reporting so complex engineering work moves from concept to delivery faster.',
    ],
    cards: services,
  },
  cfd: {
    eyebrow: 'CFD & Simulation Services',
    title: 'Simulation insight for products, airflow, fluids, and thermal systems.',
    subtitle: 'ANSYS and OpenFOAM workflows for medical devices, HVAC, aerospace, and industrial engineering.',
    image: asset('images/cfd-simulation.jpg'),
    body: [
      'We use simulation to reduce prototype cycles, validate critical design decisions, and explain performance with clear technical reporting.',
      'Typical work includes fluid flow, thermal analysis, pressure drops, device performance, and design comparison studies.',
    ],
  },
  embedded: {
    eyebrow: 'Embedded, Electrical & Software',
    title: 'From schematic to working prototype in focused engineering cycles.',
    subtitle: 'PCB design, STM32, FPGA, IoT, wireless sensors, industrial electronics, and application interfaces.',
    image: asset('images/pcb-embedded.jpg'),
    body: [
      'We develop embedded systems that connect hardware, firmware, sensors, and production requirements.',
      'The work covers early feasibility, board-level design, firmware, test rigs, and practical prototype validation.',
    ],
  },
  mechanical: {
    eyebrow: 'Mechanical Engineering Services',
    title: 'Mechanical design, CAD, assemblies, and manufacturable drawings.',
    subtitle: 'SolidWorks and CATIA design for industrial, aerospace, and marine applications.',
    image: asset('images/mechanical-design.jpg'),
    body: [
      'We prepare 3D CAD, assemblies, GD&T, manufacturing drawings, and design documentation for real production constraints.',
      'The focus is clean geometry, practical tolerances, supplier-ready drawings, and clear engineering communication.',
    ],
  },
  about: {
    eyebrow: 'About us',
    title: 'A practical R&D engineering partner based in Penang.',
    subtitle: 'HPS Technologies helps teams solve complex engineering problems fast and at competitive rates.',
    image: asset('images/robot-arm.jpg'),
    body: [
      'HPS Technologies Sdn. Bhd. brings together senior technical direction and scalable specialist capacity.',
      'The company supports projects across Southeast Asia and globally, with emphasis on clear deliverables, rapid first output, and engineering that can be used in the real world.',
    ],
  },
  industries: {
    eyebrow: 'Industries served',
    title: 'Engineering support for manufacturers, MedTech, hardware startups, and industrial teams.',
    subtitle: 'Cross-domain engineering capacity for teams that need speed, technical depth, and implementation focus.',
    image: asset('images/reverse-engineering.jpg'),
    body: [
      'We support organizations working in manufacturing, medical devices, HVAC, aerospace, marine, industrial electronics, and automation.',
      'Projects can range from simulation and CAD to embedded prototypes, reverse engineering, repair documentation, and automated test benches.',
    ],
  },
  contact: {
    eyebrow: 'Contact',
    title: 'Ready to solve your engineering challenge?',
    subtitle: 'Reach out for expert engineering solutions. We respond to all inquiries within 24 hours.',
    image: asset('images/robot-arm.jpg'),
    body: [
      'Phone: +60-123799220',
      'Email: info@hpstechnologies.my',
      'Share a short project brief and the team can help identify the right engineering path.',
    ],
  },
};

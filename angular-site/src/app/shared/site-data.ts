export interface NavItem {
  label: string;
  path: string;
  children?: NavItem[];
}

export interface ServiceItem {
  title: string;
  description: string;
  image: string;
  path: string;
  bullets: string[];
}

export interface PageContent {
  title: string;
  subtitle: string;
  image: string;
  intro: string;
  highlights: string[];
}

const assetBase = '/assets/mirrored/assets.zyrosite.com';

export const logo = `${assetBase}/new-logo-iYW8nAhYjZUPFHjL.png`;

export const navItems: NavItem[] = [
  { label: 'Home', path: '/' },
  {
    label: 'Services',
    path: '/engineering-solutions',
    children: [
      { label: 'CFD & Simulation Services', path: '/cfd-and-simulation-engineers' },
      {
        label: 'Embedded, Electrical & Software',
        path: '/embedded-electrical-and-software-engineering-services',
      },
      { label: 'Mechanical Engineering Services', path: '/mechanical-engineering-services' },
    ],
  },
  { label: 'About us', path: '/engineering-services' },
  { label: 'Industries served', path: '/industry-solutions-engineering-solutions' },
  { label: 'Contact', path: '/engineering-randd-services' },
];

export const services: ServiceItem[] = [
  {
    title: 'CFD & Simulation Services',
    description:
      'Fluid flow, thermal, aerodynamic, and multiphysics simulation support for design validation and optimization.',
    image: `${assetBase}/cfd-simulation-fluid-analysis-kEpgvxCNpnIsUYRD.jpg`,
    path: '/cfd-and-simulation-engineers',
    bullets: ['CFD modelling', 'Thermal analysis', 'Flow optimization'],
  },
  {
    title: 'Embedded, Electrical & Software',
    description:
      'Embedded software, electrical harness engineering, Linux solutions, HMI, and integrated control systems.',
    image: `${assetBase}/embedded-linux-solutions-iHlM90WDgH8RcpW3.jpg`,
    path: '/embedded-electrical-and-software-engineering-services',
    bullets: ['Embedded Linux', 'HMI development', 'Electrical harnesses'],
  },
  {
    title: 'Mechanical Engineering Services',
    description:
      '3D CAD, product development, mechanical design, reverse engineering, and manufacturing-ready documentation.',
    image: `${assetBase}/mechanical-design-3d-cad-09U4YfFk3icwQbnM.jpg`,
    path: '/mechanical-engineering-services',
    bullets: ['3D CAD design', 'Reverse engineering', 'Product development'],
  },
  {
    title: 'R&D Consulting',
    description:
      'Practical engineering support for technical teams that need fast experimentation, validation, and delivery.',
    image: `${assetBase}/r-d-consulting-WHka9EYsbOSX5pxE.jpg`,
    path: '/engineering-randd-services',
    bullets: ['Feasibility studies', 'Prototype planning', 'Technical delivery'],
  },
];

export const pages: Record<string, PageContent> = {
  services: {
    title: 'Engineering Solutions',
    subtitle: 'Precision engineering services for fast-moving technical teams.',
    image: `${assetBase}/rig-automation-systems-bJ5hgdeGb71sZjJ8.jpg`,
    intro:
      'HPS Technologies delivers practical R&D, simulation, embedded, electrical, and mechanical engineering support from concept through validation.',
    highlights: ['Integrated engineering workflow', 'Local Penang support', 'Prototype to production'],
  },
  cfd: {
    title: 'CFD & Simulation Services',
    subtitle: 'Advanced fluid, thermal, and performance simulation for better engineering decisions.',
    image: `${assetBase}/cfd-3-zghKmwLxclvMa28F.jpeg`,
    intro:
      'We help teams understand flow behavior, reduce design risk, and improve performance through simulation-led engineering.',
    highlights: ['Computational fluid dynamics', 'Thermal and airflow studies', 'Design optimization'],
  },
  embedded: {
    title: 'Embedded, Electrical & Software Engineering',
    subtitle: 'Hardware, firmware, software, and integration support under one roof.',
    image: `${assetBase}/hmi-embedded-software-development-YpjxAWowMhwXiQzs.jpg`,
    intro:
      'From embedded Linux to HMI systems and electrical harnesses, we build connected engineering systems that are practical to test and deploy.',
    highlights: ['Firmware and embedded Linux', 'HMI and control software', 'Electrical harness engineering'],
  },
  mechanical: {
    title: 'Mechanical Engineering Services',
    subtitle: 'Mechanical design, CAD modelling, product development, and reverse engineering.',
    image: `${assetBase}/reverse-engineering-machine-repair-HKBqFXKPI1lrzbkV.jpg`,
    intro:
      'We support mechanical engineering teams with CAD, modelling, repair-oriented reverse engineering, and manufacturable design output.',
    highlights: ['3D CAD and drafting', 'Machine repair support', 'Manufacturing documentation'],
  },
  about: {
    title: 'About HPS Technologies',
    subtitle: 'Precision R&D engineering services in Penang.',
    image: `${assetBase}/csm_humanoid-robot-arm_a8fdd878dd-D4QMDgszerVVEwlF.jpg`,
    intro:
      'HPS Technologies Sdn. Bhd. provides specialist engineering services across CFD, reverse engineering, PCB design, embedded systems, and R&D delivery.',
    highlights: ['Engineering-first delivery', 'Multi-discipline expertise', 'Focused technical execution'],
  },
  industries: {
    title: 'Industries Served',
    subtitle: 'Engineering support across automation, electronics, product design, and technical R&D.',
    image: `${assetBase}/system-integration-visualization-8Int0ly24tK4nAAR.jpg`,
    intro:
      'We work with teams that need reliable technical support for complex physical and digital systems.',
    highlights: ['Automation systems', 'Electronics and embedded products', 'Industrial R&D'],
  },
  contact: {
    title: 'Contact',
    subtitle: 'Start a technical conversation with HPS Technologies.',
    image: `${assetBase}/system-engineering-services-DxGmCFEauDOSlg6i.jpg`,
    intro:
      'Tell us about the engineering challenge, prototype, simulation, or product workflow you want to move forward.',
    highlights: ['Email: contact@hpstechnologies.my', 'Location: Penang, Malaysia', 'R&D engineering services'],
  },
};

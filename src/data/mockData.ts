import {
  ServiceDivision,
  CorporateProject,
  ClientProjectTracker,
  RfqInquiry,
  TeamMember,
  StrategicPartner
} from '../types';

export const FULDEJ_CORPORATE_INFO = {
  companyName: 'Fuldej Integrated Service Ltd',
  registeredName: 'Fuldej Integrated Service Ltd',
  cacNumber: 'RC 7360949',
  incorporationDate: '21 February 2024',
  experience: '20+ Years Multidisciplinary Industry & Field Experience',
  motto: 'Building Sustainable Solutions Through Innovation, Partnership, and Impact.',
  address: 'White Container, BUK Old Campus Area, Opposite Laundry Junction, Kano State, Nigeria',
  email: 'info@fuldej.com.ng',
  phone1: '+234 803 265 3578',
  phone2: '+234 903 098 6923',
  bankers: 'JAIZ BANK — 0017691758 (Fuldej Integrated Service L T D)',
  legalAdvisor: 'Muhammad Auwal Sani, Esq.',
  pdfProfileUrl: '/assets/aistudio/COMPANY_PROFILE__FULDEJ_INTEGRATED.docx__2__d4101806.pdf',
  cacCertificateUrl: '/assets/aistudio/CERTIFICATE_-__FULDEJ_INTEGRATED_SERVICE_LTD___1___1___2__e5318264.pdf',
  cacCertificateFilename: 'CERTIFICATE_OF_INCORPORATION__FULDEJ_INTEGRATED_SERVICE_LTD.pdf',
  fuldejLogoUrl: '/assets/aistudio/fuldej_company_logo.jpg',
  mgdiLogoUrl: '/assets/aistudio/MGDI_Logo_updated_66e1dc7b.png',
  smartgreenLogoUrl: '/assets/aistudio/Smartgreen_logo_18dde11c.jpg',
  smartgrowthLogoUrl: '/assets/aistudio/SmartGrowthAI_Logo__1__b01bd855.png',
  compliance: [
    { title: 'CAC', subtitle: 'Corporate Affairs Commission', reg: 'RC 7360949' },
    { title: 'FIRS', subtitle: 'Federal Inland Revenue Service', reg: 'Tax Compliant' },
    { title: 'SCUML', subtitle: 'Special Control Unit against Money Laundering', reg: 'Certified' },
    { title: 'SMEDAN', subtitle: 'Small & Medium Enterprises Development Agency', reg: 'Accredited' }
  ]
};

export const STRATEGIC_PARTNERS: StrategicPartner[] = [
  {
    id: 'mgdi',
    name: 'MGDI Initiative',
    shortName: 'MGDI',
    category: 'Community Technology & Digital Empowerment',
    tagline: 'Affordable Access to Technology, Digital Skills & Innovation Opportunities',
    description: 'A community-based initiative providing affordable access to technology, digital skills, innovation opportunities, entrepreneurship support, and knowledge resources that empower citizens and contribute to sustainable economic growth across Northern Nigeria.',
    logoUrl: '/assets/aistudio/MGDI_Logo_updated_66e1dc7b.png',
    leaderName: 'Fahad Isyaku Umar',
    leaderTitle: 'Strategic Partner & Initiative Lead',
    focusAreas: [
      'Community Digital Tech Hubs & Workspaces',
      'Youth Digital Literacy & Coding Bootcamps',
      'Grassroots Entrepreneurship Incubation',
      'Subsidized ICT Infrastructure & Hardware'
    ],
    impactMetrics: [
      { label: 'Youths & Students Empowered', value: '3,000+' },
      { label: 'Community ICT Labs', value: '4 Centers' },
      { label: 'Innovation Bootcamps', value: '18 Cohorts' }
    ],
    highlightBadge: 'Flagship Community Partner'
  },
  {
    id: 'smartgreen',
    name: 'SmartGreen Venture',
    shortName: 'SmartGreen',
    category: 'Clean Energy & Sustainable Infrastructure',
    tagline: 'Solar Energy, Smart Infrastructure & Sustainable Communities Across Africa',
    description: 'A sustainable development initiative focused on renewable clean energy, smart infrastructure, solar borehole extraction, eco-responsible mining site reclamation, and environmentally sustainable community projects across Nigeria and the African continent.',
    logoUrl: '/assets/aistudio/Smartgreen_logo_18dde11c.jpg',
    leaderName: 'Eng. Abubaka Salihu & Council',
    leaderTitle: 'Director of Renewable Infrastructure',
    focusAreas: [
      'Solar PV Micro-Grids & Commercial Rooftops',
      'Deep Aquifer Solar Water Pumping Schemes',
      'Environmentally Responsible Mining & Reclamation',
      'Smart Community Mini-Grids & Municipal Solar'
    ],
    impactMetrics: [
      { label: 'Clean Power Installed', value: '1.2 MWp+' },
      { label: 'Annual CO2 Displaced', value: '920 Tons' },
      { label: 'Solar Water Schemes', value: '45+ Live' }
    ],
    highlightBadge: 'Clean Energy Alliance'
  },
  {
    id: 'smartgrowth',
    name: 'SmartGrowthAI',
    shortName: 'SmartGrowthAI',
    category: 'AI & Ethical Finance Innovation',
    tagline: 'AI-Powered Financial Inclusion, Ethical Finance & Business Growth',
    description: 'An AI-powered initiative driving financial inclusion, ethical finance models, Islamic finance literacy, SME commercial acceleration, and data-driven business transformation for enterprises and burgeoning entrepreneurs.',
    logoUrl: '/assets/aistudio/SmartGrowthAI_Logo__1__b01bd855.png',
    leaderName: 'Fahad Isyaku Umar',
    leaderTitle: 'Strategic Innovation & AI Lead',
    focusAreas: [
      'AI-Driven Financial Inclusion Algorithms',
      'SME Credit Readiness & Business Modeling',
      'Ethical Finance & Islamic Financial Literacy',
      'Enterprise Process Automation & Digital Strategy'
    ],
    impactMetrics: [
      { label: 'SMEs & Businesses Accelerated', value: '450+' },
      { label: 'Financial Modeling Accuracy', value: '99.4%' },
      { label: 'Consultancy Engagements', value: '60+ Audits' }
    ],
    highlightBadge: 'AI & Ethical Finance'
  }
];

export const SERVICE_DIVISIONS: ServiceDivision[] = [
  {
    id: 'technology',
    title: 'Technology and software solution',
    shortTitle: 'Technology & Software',
    tagline: 'Enterprise ICT Systems, Custom Software, Cloud Infrastructure & Digital Tools',
    description: 'We architect robust technology platforms, custom database management systems, and specialized software tailored for enterprises and public institutions. From secure cloud hosting and automation to smart mobile applications, we drive modern digital transformation.',
    capabilities: [
      'Custom Enterprise Software & Web Application Development',
      'Database Architecture (DBA) & Enterprise Data Systems',
      'Cloud Server Deployment, SCADA Telemetry & IoT Integration',
      'ICT Hardware Setup, Network Infrastructure & Cyber Security',
      'AI & Data-Driven Business Process Automation (SmartGrowth AI)'
    ],
    deliverables: [
      'Production-grade source code, documentation & API integrations',
      'On-premises & Cloud server configuration with high availability',
      'Staff technical capacity training & SLA maintenance agreements'
    ],
    iconName: 'Code',
    caseStudyTitle: 'Enterprise Resource & Inventory Management Platform',
    caseStudySummary: 'Deployed unified multi-warehouse logistics software and mobile telemetry reducing manual inventory reconciliation time by 82% for an agro-allied distributor.'
  },
  {
    id: 'engineering',
    title: 'Engineering and technical Services',
    shortTitle: 'Engineering & Technical',
    tagline: 'Mining Mineral Resources, Deep Aquifer Boreholes, Civil Works & Structural Engineering',
    description: 'Backed by over 20+ years of multidisciplinary field execution, our engineering division specializes in solid mineral exploration and laboratory assays, deep motorized industrial borehole drilling (up to 250m+), structural civil construction, and heavy mechanical maintenance.',
    capabilities: [
      'Solid Mineral Resource Geological Exploration (Lithium, Tantalite, Gold, Iron Ore)',
      'Certified Laboratory Assays, Trenching, Core Sampling & Concession Cadastre Mapping',
      'Deep Industrial Borehole Drilling (Rotary Mud & DTH Air Hammer up to 250m+)',
      'Motorized & Solar-Powered Submersible Pumping Reticulation (40,000L+ Towers)',
      'Civil Infrastructure, Reinforced Concrete Foundations & Machine Plinths',
      'Mechatronics Automation & Heavy Industrial Mechanical Maintenance'
    ],
    deliverables: [
      'COREN-standard structural calculation sheets & stamped CAD drawings',
      'Geophysical Vertical Electrical Sounding (VES) groundwater resistivity logs',
      'Certified geochemical laboratory assay sheets & mineral purity reports',
      'Physicochemical & microbiological water potability certificates'
    ],
    iconName: 'Wrench',
    caseStudyTitle: 'Mineral Exploration & 180m Deep Aquifer Borehole Installation',
    caseStudySummary: 'Conducted solid mineral assay verification and completed deep rotary borehole drilling yielding 18,000 LPH, coupled with a 40,000L overhead water reticulation tower.'
  },
  {
    id: 'renewable',
    title: 'Renewable Energy and smart Infrastructure',
    shortTitle: 'Renewable Energy & Smart Infra',
    tagline: 'Solar Micro-Grids, Borehole Installation Consultancy & Smart Energy Storage',
    description: 'Leading clean energy transformation through the SmartGreen Initiative. We provide turnkey commercial solar PV engineering, specialized solar-powered borehole pumping consultancy, high-capacity lithium iron phosphate (LiFePO4) storage, and hybrid generator synchronizers.',
    capabilities: [
      '5kWp to 500kWp+ Commercial & Industrial Solar PV Micro-Grids',
      'Turnkey Solar-Powered Borehole Pumping & Overhead Reticulation Consultancy',
      'High-Cycle Lithium Iron Phosphate (LiFePO4) Battery Storage Racks',
      'Pure Sine Wave Inverters with Automatic Generator Bus Synchronization',
      'Agricultural Solar Irrigation & Off-Grid Cold Chain Storage Systems',
      'Smart Community Mini-Grids & Solar Municipal Street Lighting'
    ],
    deliverables: [
      'Comprehensive electrical load profiling & peak surge audits',
      'Complete Tier-1 solar panel array with 25-year performance warranty',
      'Remote cloud telemetry for real-time kWh generation and pump flow monitoring',
      'Full solar-to-diesel fuel displacement ROI analysis'
    ],
    iconName: 'Sun',
    caseStudyTitle: '150kWp Industrial Off-Grid Solar & Hybrid Storage Installation',
    caseStudySummary: 'Engineered a 150kWp solar array with 384kWh lithium battery bank for Challawa Industrial Estate, cutting monthly facility fuel expenditures by 65%.'
  },
  {
    id: 'consultancy',
    title: 'Digital Business consultancy',
    shortTitle: 'Digital Business Consultancy',
    tagline: 'Strategic Feasibility Studies, Financial Inclusion & Corporate Advisory',
    description: 'Guiding corporate growth, capital mobilization, and operational excellence. We provide bankable feasibility studies, project management audits, ethical finance education, and digital entrepreneurship acceleration programs through the MGDI Initiative and SmartGrowth AI.',
    capabilities: [
      'Corporate Strategy, Business Development & Feasibility Studies',
      'Ethical Finance Innovation, SME Advisory & Financial Literacy',
      'Environmental & Social Impact Assessments (ESIA / EIA Statutory Permits)',
      'Mining Cadastre Office (MCO) Concession Title Regularization',
      'Digital Skills & Entrepreneurship Incubation (MGDI Initiative)'
    ],
    deliverables: [
      'Bankable feasibility documents & investor-ready pitch materials',
      'Statutory regulatory compliance approvals from Federal Ministries',
      'Structured institutional capacity building & executive workshops'
    ],
    iconName: 'Briefcase',
    caseStudyTitle: 'Concession ESIA & Commercial Bankable Feasibility Assessment',
    caseStudySummary: 'Formulated environmental impact assessments and community development agreements (CDA) for a 2,400-hectare mineral concession in Northern Nigeria.'
  },
  {
    id: 'procurement',
    title: 'Industrial supply and procurement',
    shortTitle: 'Industrial Supply & Procurement',
    tagline: 'Heavy Machinery, Electrical Switchgear, Agricultural & ICT Equipment',
    description: 'Leveraging established vendor relationships across Nigeria and global supply chains to deliver verified, high-specification equipment, genuine industrial components, agro-industrial supplies, and high-performance computing hardware on schedule.',
    capabilities: [
      'Heavy Industrial Machinery, Drilling Rig Accessories & Tooling',
      'High-Voltage Electrical Switchgear, Transformers & Power Cables',
      'Agricultural Processing Machinery & Commercial Irrigation Pumps',
      'ICT Enterprise Server Racks, Workstations & Networking Hardware',
      'Statutory Supply Chain Auditing, Logistics & Quality Assurance'
    ],
    deliverables: [
      'Original Manufacturer Equipment (OEM) warranty & test certificates',
      'End-to-end customs clearance, local freight handling & on-site delivery',
      'Commissioning testing and preventative maintenance spare parts kits'
    ],
    iconName: 'Truck',
    caseStudyTitle: 'Turnkey Supply of High-Head Solar Pumps & Deep Well Casings',
    caseStudySummary: 'Procured and delivered 12 high-head stainless steel solar submersible pumps and seamless steel borehole casings for regional community water schemes.'
  }
];

export const CORPORATE_PROJECTS: CorporateProject[] = [
  {
    id: 'proj-1',
    title: '150kWp Commercial Solar Micro-Grid & 384kWh Lithium Storage',
    division: 'renewable',
    client: 'Northern Agro-Industrial Processing Facility',
    location: 'Challawa Industrial Zone, Kano State',
    year: '2026',
    summary: 'Engineered a turnkey off-grid commercial photovoltaic array with automated diesel generator synchronization, eliminating daytime grid outage vulnerabilities.',
    keyMetrics: [
      { label: 'Array Size', value: '150 kWp' },
      { label: 'Storage', value: '384 kWh LiFePO4' },
      { label: 'Fuel Savings', value: '65% Reduction' }
    ],
    imageSrc: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'proj-2',
    title: 'Deep Rotary Borehole & 40,000L Overhead Water Reticulation Tower',
    division: 'engineering',
    client: 'Wudil Community Agricultural Cooperative',
    location: 'Wudil LGA, Kano State',
    year: '2025',
    summary: 'Electronic groundwater exploration (VES), rotary drilling to 180m basement complex aquifer, and construction of elevated steel storage reservoir.',
    keyMetrics: [
      { label: 'Depth', value: '180 Meters' },
      { label: 'Yield', value: '18,000 LPH' },
      { label: 'Tank Capacity', value: '40,000 Liters' }
    ],
    imageSrc: 'https://images.unsplash.com/photo-1541888946425-d0fbb1861593?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'proj-3',
    title: 'Mineral Concession Geological Survey & Certified Assays',
    division: 'engineering',
    client: 'Trans-Sahara Minerals Corporation',
    location: 'Northern Mining Corridor, Nigeria',
    year: '2025',
    summary: 'Geological field mapping, core borehole sample drilling, and accredited laboratory chemical assays proving high-purity commercial mineral deposits (Lithium & Tantalite).',
    keyMetrics: [
      { label: 'Concession', value: '2,400 Hectares' },
      { label: 'Core Holes', value: '45 Logged' },
      { label: 'Target Minerals', value: 'Lithium / Tantalite' }
    ],
    imageSrc: 'https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'proj-4',
    title: 'Enterprise ERP & Telemetry Infrastructure Deployment',
    division: 'technology',
    client: 'Regional Commercial Logistics Network',
    location: 'Kano Metropolis & Northern Corridor',
    year: '2026',
    summary: 'Custom database architecture and secure cloud infrastructure unifying inventory tracking, supplier procurement, and automated billing telemetry.',
    keyMetrics: [
      { label: 'Availability', value: '99.98% Uptime' },
      { label: 'Warehouses', value: '6 Connected Hubs' },
      { label: 'Security', value: 'Encrypted Role RBAC' }
    ],
    imageSrc: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'proj-5',
    title: 'Turnkey Procurement of Heavy Industrial Drilling Equipment',
    division: 'procurement',
    client: 'Integrated Water Development Authority',
    location: 'Northern Nigeria Operational Bases',
    year: '2025',
    summary: 'Consolidated procurement, OEM warranty inspection, and logistics delivery of heavy rotary drilling rods, DTH hammers, and high-pressure submersible pumps.',
    keyMetrics: [
      { label: 'Equipment Items', value: '180+ Units' },
      { label: 'Lead Time', value: '14 Days Delivered' },
      { label: 'Compliance', value: '100% OEM Inspected' }
    ],
    imageSrc: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'proj-6',
    title: 'Community Digital Innovation & Renewable Hub (MGDI Initiative)',
    division: 'consultancy',
    client: 'MGDI Initiative & Local Stakeholders',
    location: 'Kano State Educational Zone',
    year: '2026',
    summary: 'Comprehensive program delivery combining 30kWp solar power with modern computer workstations and entrepreneurship curricula empowering local youths.',
    keyMetrics: [
      { label: 'Beneficiaries', value: '3,000+ Students' },
      { label: 'Solar Power', value: '30 kWp Off-Grid' },
      { label: 'Tech Academy', value: 'Fully Equipped' }
    ],
    imageSrc: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=80'
  }
];

export const INITIAL_CLIENT_PROJECT: ClientProjectTracker = {
  projectCode: 'FDJ-2026',
  clientName: 'Alhaji Bashir Dangora — Kano Agro-Processing Ltd',
  projectName: 'Integrated Energy & Water Infrastructure (120kWp Solar Array & 195m Borehole)',
  division: 'renewable',
  location: 'Challawa Industrial Layout, Kano State',
  leadDirector: 'M.D. Ishaq Ibrahim Jaafar & Eng. Abubaka Salihu',
  startDate: '01 February 2026',
  targetCompletion: '30 April 2026',
  progressPercent: 82,
  specifications: [
    { label: 'Division', value: 'Renewable Energy & Water Engineering' },
    { label: 'Solar PV Capacity', value: '120 kWp Tier-1 Monocrystalline' },
    { label: 'Battery Storage', value: '240 kWh LiFePO4 Lithium Rack' },
    { label: 'Borehole Depth', value: '195 Meters (Deep Basement Aquifer)' },
    { label: 'Storage Reservoir', value: '30,000 Liters Elevated Steel Stand' }
  ],
  milestones: [
    {
      phase: 'Phase 1: Technical Site Feasibility & Load Audit',
      status: 'completed',
      date: '10 Feb 2026',
      description: 'Groundwater resistivity test and facility electrical single-line diagram approved.'
    },
    {
      phase: 'Phase 2: Deep Borehole Drilling & Aquifer Casing',
      status: 'completed',
      date: '28 Feb 2026',
      description: 'Drilling reached 195m aquifer. Gravel pack, casing, and 8-hour continuous yield pumping test certified.'
    },
    {
      phase: 'Phase 3: Solar Structure Mounting & Steel Tower Erection',
      status: 'completed',
      date: '20 Mar 2026',
      description: '240 monocrystalline solar panels fixed to aluminum mounting structures; 30,000L steel tower fabricated and hoisted.'
    },
    {
      phase: 'Phase 4: Inverter Synchronization & Pumping Telemetry',
      status: 'in_progress',
      date: '16 Apr 2026',
      description: 'Grid-generator ATS bus synchronization and solar submersible pump test runs underway.'
    },
    {
      phase: 'Phase 5: Final Commissioning & Statutory Handover',
      status: 'pending',
      date: '30 Apr 2026',
      description: 'Handover of certified water quality test reports, operational training, and 12-month warranty pack.'
    }
  ]
};

export const INITIAL_RFQ_INQUIRIES: RfqInquiry[] = [
  {
    id: 'rfq-501',
    referenceNumber: 'RFQ-FDJ-2026-7819',
    companyName: 'Sahara Mining & Quarries Ltd',
    contactPerson: 'Alhaji Mansur Garba',
    email: 'm.garba@saharamining.ng',
    phone: '+234 803 555 4192',
    serviceDivision: 'engineering',
    projectScope: 'Lithium & solid minerals concession exploration, core drilling (12 boreholes), and certified laboratory assay reports.',
    deliveryTimeline: '4 Weeks Turnaround',
    operatingLocation: 'Northern Mining Corridor, Kano State',
    estimatedBudgetNgn: 8500000,
    estimatedBudgetUsd: 5850,
    status: 'technical_review',
    createdAt: '2026-10-18T10:15:00Z'
  },
  {
    id: 'rfq-502',
    referenceNumber: 'RFQ-FDJ-2026-8921',
    companyName: 'Greenfield Integrated Agro-Industries',
    contactPerson: 'Dr. Fatima Abdullahi',
    email: 'fatima@greenfieldfarms.org',
    phone: '+234 802 881 7733',
    serviceDivision: 'renewable',
    projectScope: 'Turnkey 100kWp solar PV micro-grid with lithium battery storage for feedmill and continuous solar borehole pumping.',
    deliveryTimeline: '14 Days On-Site Installation',
    operatingLocation: 'Danbatta Agro Zone, Kano State',
    estimatedBudgetNgn: 12500000,
    estimatedBudgetUsd: 8600,
    status: 'proposal_issued',
    createdAt: '2026-10-19T14:30:00Z'
  },
  {
    id: 'rfq-503',
    referenceNumber: 'RFQ-FDJ-2026-3310',
    companyName: 'Apex Commercial Distribution Ltd',
    contactPerson: 'Engr. Bello Mukhtar',
    email: 'bello.m@apexdistribution.ng',
    phone: '+234 809 332 1904',
    serviceDivision: 'technology',
    projectScope: 'Enterprise warehouse software, automated supplier billing portal, and server room equipment procurement.',
    deliveryTimeline: '3 Weeks Deployment',
    operatingLocation: 'BUK Old Campus Road, Kano State',
    estimatedBudgetNgn: 4200000,
    estimatedBudgetUsd: 2900,
    status: 'inquiry_received',
    createdAt: '2026-10-20T08:00:00Z'
  }
];

export const LEADERSHIP_TEAM: TeamMember[] = [
  {
    id: 'ishaq-ibrahim-jaafar',
    name: 'M.D. Ishaq Ibrahim Jaafar',
    role: 'Founder & Managing Director',
    discipline: 'Executive Leadership & Infrastructure Implementation',
    experienceYears: 20,
    image: '/assets/team/md-ishaq-ibrahim.jpg',
    bio: 'Visionary founder and managing director of Fuldej Integrated Service Ltd. With over 20+ years of multidisciplinary industry and field experience, directing mining concession operations, deep industrial borehole programs, solar energy micro-grids, and corporate partnerships across Nigeria.'
  },
  {
    id: 'fahad-isyaku-umar',
    name: 'Fahad Isyaku Umar',
    role: 'Co-Founder & Strategic Partner',
    discipline: 'Strategic Innovation & Strategic Initiatives Lead',
    experienceYears: 18,
    isKeyPartner: true,
    image: '/assets/team/fahad-isyaku-umar.jpg',
    bio: 'Co-Founder and Strategic Partner at Fuldej Integrated Service Ltd, spearheading Strategic Innovation Initiatives including the MGDI Initiative, SmartGrowth AI, and SmartGreen. Brings extensive leadership in digital technology solutions, AI-powered financial inclusion models, ethical finance frameworks, and cross-sector commercial partnerships across West Africa.'
  },
  {
    id: 'eng-musa-zulyadain',
    name: 'Eng. Musa Zulyadain',
    role: 'Civil Engineer',
    discipline: 'Structural & Infrastructure Engineering',
    experienceYears: 16,
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80',
    bio: 'Senior civil engineer specialist in heavy structural foundations, elevated water reservoirs, machine plinths, reinforced drainage infrastructure, and COREN-standard civil documentation.'
  },
  {
    id: 'eng-abubaka-salihu',
    name: 'Eng. Abubaka Salihu',
    role: 'Electrical Engineer',
    discipline: 'Power Systems & Solar PV Engineering',
    experienceYears: 15,
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=800&q=80',
    bio: 'Leads commercial and industrial solar micro-grids, high-voltage lithium battery energy storage systems, generator ATS synchronization, and rural community electrification schemes.'
  },
  {
    id: 'eng-usman-tanko',
    name: 'Eng. Usman Tanko',
    role: 'Mechanical Engineer',
    discipline: 'Drilling Mechanics & Hydraulic Systems',
    experienceYears: 17,
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=800&q=80',
    bio: 'Oversees rotary deep borehole drilling rigs (up to 250m+), heavy down-the-hole (DTH) air percussion hammers, high-head industrial pumps, and mineral extraction mechanical plants.'
  },
  {
    id: 'dba-danjuma-idiris',
    name: 'DBA Danjuma Idiris',
    role: 'Information Technology Lead',
    discipline: 'Enterprise Software & Database Architecture',
    experienceYears: 14,
    image: '/assets/team/dba-danjuma-idiris.jpg',
    bio: 'Directs cloud infrastructure, custom database management systems, cyber security protocols, and SCADA IoT telemetry for remote solar and water flow monitoring.'
  },
  {
    id: 'pharmacy-adamu-lawan-wakili',
    name: 'Pharmacy Adamu Lawan Wakili',
    role: 'Pharmaceutical & Environmental Tech',
    discipline: 'Water Quality Chemistry & Environmental Safety',
    experienceYears: 14,
    image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=800&q=80',
    bio: 'Oversees certified laboratory physicochemical and microbiological water testing, mineral assay safety, and statutory environmental compliance.'
  },
  {
    id: 'qt-surajo-yunusa',
    name: 'Q&T Surajo Yunusa',
    role: 'Quantity & Surveyor',
    discipline: 'Cost Engineering & Land Surveying',
    experienceYears: 15,
    image: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=800&q=80',
    bio: 'Conducts topographical surveys, cadastral concession boundary mapping, bills of quantities (BOQ), and cost audits for commercial contracts.'
  },
  {
    id: 'eng-arc-nura-sambo',
    name: 'Eng. (Arc) Nura Sambo',
    role: 'Architecture Lead',
    discipline: 'Architectural & Spatial Planning',
    experienceYears: 14,
    image: '/assets/team/eng-arc-nura-sambo.jpg',
    bio: 'Directs sustainable facility design, commercial industrial layouts, eco-friendly municipal architecture, and 3D spatial engineering.'
  },
  {
    id: 'eng-ashiru-abdul',
    name: 'Eng. Ashiru Abdul',
    role: 'Mechatronics Engineer',
    discipline: 'Robotics, Telemetry & Automation',
    experienceYears: 12,
    image: '/assets/team/eng-ashiru-abdul.jpg',
    bio: 'Specializes in automated pump controllers, agricultural sensor telemetry, industrial mechatronics, and automated solar tracker controllers.'
  }
];

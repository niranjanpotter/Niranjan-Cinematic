export interface ProjectItem {
  id: string;
  title: string;
  summary: string;
  technologies: string[];
  impact: string;
  details: string[];
  category: 'Integration' | 'Modernization' | 'Enterprise' | 'Automation';
}

export interface ExperienceItem {
  company: string;
  role: string;
  period: string;
  domain: string;
  highlights: string[];
  technologies: string[];
}

export interface AchievementItem {
  title: string;
  category: 'Metric' | 'Award' | 'Milestone';
  description: string;
  icon?: string;
  badge?: string;
}

export interface CertificationItem {
  title: string;
  issuer: 'Salesforce' | 'Workato Academy';
  dateOrStatus: string;
  type: string;
}

export interface DistrictInfo {
  id: string;
  name: string;
  shortLabel: string;
  tagline: string;
  landmark: string;
  zCoord: number;
  color: string;
}

export const PORTFOLIO_DATA = {
  personal: {
    name: "Niranjan Kumar Potter",
    heroTitle: "Senior MuleSoft Developer & Technical Lead",
    subheading: "Enterprise API-Led Architecture • CloudHub 2.0 • DataWeave Optimization • Post-Go-Live Hypercare",
    location: "India (Open to relocation & remote)",
    education: {
      degree: "Bachelor of Technology (B.Tech)",
      period: "2015 – 2019",
      languages: ["English (Professional working proficiency)", "Hindi (Native)"]
    },
    bio: "Senior MuleSoft Developer and Technical Lead with integration engineering experience since 2021. I design enterprise APIs, lead architectural reviews, and guide integrations from design through deployment and support handover. Experience spans energy & utilities, HR workflows, and CRM-to-ERP order integration.",
    links: {
      linkedin: "https://www.linkedin.com/in/niranjan-potter-551b49171",
      trailblazer: "https://www.salesforce.com/trailblazer/npotter3",
      repositories: "https://github.com/niranjanpotter?tab=repositories",
      calendly: "https://calendly.com/niranjanpotter1997/mulesoft-discussion",
      github: "https://github.com/niranjanpotter"
    }
  },

  districts: [
    {
      id: "intro",
      name: "Arrival Gate: City Reveal",
      shortLabel: "POTTER CITY",
      tagline: "The world is the interface. Welcome to Sri Tech's 3D cinematic showcase.",
      landmark: "Hero Car Platform",
      zCoord: 0,
      color: "#00f0ff"
    },
    {
      id: "education",
      name: "Education District",
      shortLabel: "ACADEMY CAMPUS",
      tagline: "Foundation of engineering and continuous technical learning.",
      landmark: "Tech Institute Gate",
      zCoord: -70,
      color: "#3b82f6"
    },
    {
      id: "skills",
      name: "Technology District",
      shortLabel: "TECH TOWERS",
      tagline: "Enterprise integrations, runtime runtimes, and cloud data pipelines.",
      landmark: "Anypoint Monoliths",
      zCoord: -150,
      color: "#06b6d4"
    },
    {
      id: "projects",
      name: "Projects Boulevard",
      shortLabel: "PROJECTS BLVD",
      tagline: "Real-world production integration architectures and migrations.",
      landmark: "Integration Spire",
      zCoord: -240,
      color: "#8b5cf6"
    },
    {
      id: "achievements",
      name: "Achievements Plaza",
      shortLabel: "AWARDS PLAZA",
      tagline: "Quantified business metrics, performance gains, and industry honors.",
      landmark: "Holographic Trophy Plaza",
      zCoord: -330,
      color: "#f59e0b"
    },
    {
      id: "experience",
      name: "Experience District",
      shortLabel: "CORPORATE HUB",
      tagline: "Proven leadership at Tech Mahindra and NTT DATA / Apisero.",
      landmark: "Corporate Twin Towers",
      zCoord: -420,
      color: "#10b981"
    },
    {
      id: "contact",
      name: "Contact Garage",
      shortLabel: "CONTACT GARAGE",
      tagline: "Connect for leadership, API modernization, or integration discussions.",
      landmark: "Rooftop Sky Garage",
      zCoord: -510,
      color: "#ec4899"
    }
  ] as DistrictInfo[],

  metrics: [
    { label: "DataWeave Latency", value: "-35%", detail: "Optimized complex mappings for high-throughput legacy feeds" },
    { label: "API Response Time", value: "-60%", detail: "Parallel processing for multi-service data aggregation" },
    { label: "Deployment Cycle", value: "-40%", detail: "Automated via Maven, Azure DevOps, and MUnit gates" },
    { label: "Microservices", value: "15+", detail: "Standardized logging, error-handling & DB utilities" },
    { label: "Secure Endpoints", value: "50+", detail: "Secured with AWS Secrets Manager credentials" }
  ],

  skillCategories: [
    {
      name: "Integration & Runtimes",
      skills: ["Mule 4", "Anypoint Platform", "CloudHub 2.0", "CloudHub 1.0", "Anypoint MQ", "API Manager", "APIkit", "Anypoint Studio", "Anypoint Code Builder"]
    },
    {
      name: "API Design & Protocols",
      skills: ["RAML", "DataWeave 2.0", "RESTful APIs", "SOAP", "GraphQL", "JSON", "XML"]
    },
    {
      name: "Languages & Databases",
      skills: ["Java 17", "Java 8", "SQL", "PostgreSQL", "Oracle", "MySQL", "SQL Server", "IBM DB2"]
    },
    {
      name: "Cloud & AWS Infrastructure",
      skills: ["AWS S3", "AWS DynamoDB", "AWS Secrets Manager"]
    },
    {
      name: "Delivery, CI/CD & Testing",
      skills: ["Azure DevOps", "Azure Pipelines", "Maven", "MUnit", "SonarQube Quality Gates", "Git", "Jenkins", "Postman"]
    },
    {
      name: "Modern AI & Orchestration",
      skills: ["Model Context Protocol (MCP)", "MuleSoft Agent Fabric", "Agent Orchestration", "Workato Agentic AI"]
    }
  ],

  projects: [
    {
      id: "enterprise-api",
      title: "Enterprise API Delivery & Orchestration",
      category: "Enterprise",
      summary: "Architected and implemented API-led connectivity frameworks and reusable components across energy and utilities domains.",
      technologies: ["Mule 4", "DataWeave 2.0", "Anypoint MQ", "GraphQL", "PostgreSQL", "AWS S3"],
      impact: "60% API latency improvement with parallel aggregation across multi-source legacy databases.",
      details: [
        "Architected and led the implementation of an API-led integration framework for enterprise services.",
        "Developed Mule 4 APIs and DataWeave 2.0 transformations connecting legacy systems with downstream consumers.",
        "Built GraphQL-based billing management services connected to PostgreSQL, Oracle, and IBM DB2.",
        "Developed composite data aggregation services using AWS DynamoDB and S3 for scalable storage and retrieval."
      ]
    },
    {
      id: "cloud-modernization",
      title: "CloudHub 2.0 & Java 17 Platform Modernization",
      category: "Modernization",
      summary: "Led full-lifecycle migration of mission-critical enterprise APIs from CloudHub 1.0 to CloudHub 2.0 alongside Java 17 runtime upgrades.",
      technologies: ["CloudHub 2.0", "Java 17", "Anypoint MQ", "Azure Pipelines", "AWS Secrets Manager"],
      impact: "Seamless runtime upgrade with zero downtime and decoupled asynchronous messaging via Anypoint MQ.",
      details: [
        "Led migration of legacy APIs to CloudHub 2.0, utilizing containerized clustering and ingress controls.",
        "Upgraded Mule runtimes and microservices from legacy Java 8 to Java 17.",
        "Introduced asynchronous messaging with Anypoint MQ to decouple high-volume services.",
        "Standardized AWS Secrets Manager integration across 50+ endpoints for zero-trust credential hygiene."
      ]
    },
    {
      id: "employee-data-sync",
      title: "HR & Enterprise Application Synchronization",
      category: "Integration",
      summary: "Scheduled and real-time integration flows synchronizing Workday workforce data across CRM, Active Directory, and operational suites.",
      technologies: ["Workday", "Salesforce", "Active Directory", "Concur", "HTTP", "SQL", "Mule 4"],
      impact: "Automated identity lifecycle synchronization for thousands of enterprise staff records.",
      details: [
        "Developed scheduled Mule 4 flows to synchronize Workday employee data with Salesforce, Active Directory, and Concur.",
        "Implemented secure API methods to read employee datasets and write updates to connected enterprise nodes.",
        "Built automated error-handling and reconciliation logs to detect schema drift."
      ]
    },
    {
      id: "order-crm-erp",
      title: "CRM-to-ERP Order Integration & Post-Go-Live Hypercare",
      category: "Enterprise",
      summary: "Delivered high-reliability CRM-to-ERP integration for order and inventory exchange, followed by support team enablement.",
      technologies: ["MuleSoft", "Salesforce CRM", "ERP Systems", "DataWeave", "Splunk", "Jira"],
      impact: "Stabilized production order pipelines and trained tier-1/tier-2 support engineers on end-to-end tracing.",
      details: [
        "Delivered CRM-to-ERP order data pipelines, investigating data discrepancies and scheduler exceptions during hypercare.",
        "Provided end-to-end knowledge transfer sessions covering request lifecycles, transformations, and failure scenarios.",
        "Created comprehensive API portals and Confluence playbooks for runtime operations and monitoring via Splunk."
      ]
    },
    {
      id: "cicd-automation",
      title: "CI/CD Delivery Automation & Quality Gates",
      category: "Automation",
      summary: "Engineered automated Maven and Azure DevOps build/deployment pipelines enforcing MUnit coverage and SonarQube quality gates.",
      technologies: ["Azure DevOps", "Maven", "MUnit", "SonarQube", "Git", "Anypoint CLI"],
      impact: "Reduced deployment cycles by 40% and prevented regressions across 15+ microservices.",
      details: [
        "Established Maven-based CI/CD pipelines with SonarQube static code quality gates.",
        "Standardized unit and functional integration testing using MUnit.",
        "Automated deployment promotion across Dev, QA, UAT, and Production environments."
      ]
    }
  ] as ProjectItem[],

  achievements: [
    {
      title: "35% DataWeave Latency Reduction",
      category: "Metric",
      description: "Optimized complex DataWeave 2.0 transformations and memory allocation for high-volume transactions."
    },
    {
      title: "60% API Response Acceleration",
      category: "Metric",
      description: "Implemented parallel processing routines for composite multi-database aggregation."
    },
    {
      title: "40% Faster Deployment Cycles",
      category: "Metric",
      description: "Built automated Azure DevOps and Maven pipelines with automated MUnit testing."
    },
    {
      title: "Star Performer Award (Twice)",
      category: "Award",
      description: "Recognized twice for outstanding technical delivery, dedication, and client turnaround."
    },
    {
      title: "Ace Award (Multiple Times)",
      category: "Award",
      description: "Awarded multiple times for exceptional integration engineering and mentoring."
    },
    {
      title: "Rookie of the Quarter",
      category: "Award",
      description: "Awarded for rapid onboarding, initiative, and high-impact API delivery."
    },
    {
      title: "Salesforce Trailhead Double Star Ranger",
      category: "Milestone",
      description: "Demonstrated broad Salesforce ecosystem mastery and continuous learning."
    }
  ] as AchievementItem[],

  certifications: [
    {
      title: "Salesforce Certified MuleSoft Platform Architect I",
      issuer: "Salesforce",
      dateOrStatus: "Verified Architecture Credential",
      type: "Architecture"
    },
    {
      title: "Salesforce Certified Platform Developer I",
      issuer: "Salesforce",
      dateOrStatus: "Verified Salesforce Credential",
      type: "Development"
    },
    {
      title: "Salesforce Certified Data Cloud Consultant",
      issuer: "Salesforce",
      dateOrStatus: "Issued Jan 2025",
      type: "Data 360"
    },
    {
      title: "Salesforce Certified AI Associate",
      issuer: "Salesforce",
      dateOrStatus: "Verified AI Foundations Credential",
      type: "Artificial Intelligence"
    },
    {
      title: "Salesforce Certified MuleSoft Associate",
      issuer: "Salesforce",
      dateOrStatus: "Verified Foundations Credential",
      type: "Integration"
    },
    {
      title: "Salesforce Certified MuleSoft Integration Foundations",
      issuer: "Salesforce",
      dateOrStatus: "Issued Sept 2023",
      type: "Integration"
    },
    {
      title: "Workato Technical Architect (Agentic)",
      issuer: "Workato Academy",
      dateOrStatus: "Awarded Oct 2026 (Valid to Oct 2028)",
      type: "Agentic AI"
    },
    {
      title: "Workato Technical Developer (Agentic)",
      issuer: "Workato Academy",
      dateOrStatus: "Awarded Oct 2026 (Valid to Oct 2028)",
      type: "Agentic AI"
    },
    {
      title: "Workato Enterprise AI Essentials",
      issuer: "Workato Academy",
      dateOrStatus: "Awarded Oct 2026 (Valid to Oct 2028)",
      type: "AI & Orchestration"
    }
  ] as CertificationItem[],

  experiences: [
    {
      company: "Tech Mahindra",
      role: "Senior MuleSoft Engineer",
      period: "July 2025 – Present",
      domain: "Energy and Utilities Domain",
      technologies: ["Mule 4", "Anypoint Platform", "CloudHub 2.0", "DataWeave 2.0", "GraphQL", "AWS S3", "DynamoDB", "PostgreSQL", "SonarQube"],
      highlights: [
        "Architected API-led integration framework and composite aggregation services.",
        "Led CloudHub 2.0 migration and decoupled synchronous calls via Anypoint MQ.",
        "Built standardized logging, error-handling, and database utilities across 15+ services.",
        "Integrated AWS Secrets Manager credential hygiene across 50+ endpoints.",
        "Delivered post-go-live hypercare and comprehensive knowledge transfer to support teams."
      ]
    },
    {
      company: "NTT DATA / Apisero",
      role: "Digital Engineering Senior Engineer",
      period: "May 2021 – July 2025",
      domain: "Enterprise API Modernization & Application Integration",
      technologies: ["Mule 4", "RAML", "CloudHub 2.0", "Java 17", "Workday", "Salesforce", "Active Directory", "Azure Pipelines", "Splunk", "MUnit"],
      highlights: [
        "Designed and developed Mule 4 integrations and RAML specifications for enterprise applications.",
        "Developed scheduled synchronization flows between Workday, Salesforce, Active Directory, and Concur.",
        "Migrated APIs from CloudHub 1.0 to CloudHub 2.0 and upgraded runtimes from Java 8 to Java 17.",
        "Investigated order and scheduler anomalies during CRM-to-ERP hypercare.",
        "Delivered end-to-end knowledge transfer sessions for junior developers and support engineers."
      ]
    }
  ] as ExperienceItem[]
};


/**
 * Default Resume Data Template
 * This serves as both the default content for Shivam Pandey
 * and a standard schema that ANYONE can customize or overwrite!
 */
const DEFAULT_RESUME_DATA = {
  personal: {
    name: "Shivam Pandey",
    titles: [
      "AI & Machine Learning Engineer",
      "Computer Vision Enthusiast",
      "Full-Stack Web Developer",
      "Core CS & Java Programmer"
    ],
    statusBadge: "Available for Internships & Projects",
    email: "shivamthegreat116@email.com",
    phone: "+91 7827777291",
    location: "Greater Noida / Delhi NCR, India",
    linkedin: "https://www.linkedin.com/in/",
    github: "https://github.com/shivamthegreat116-glitch",
    avatar: "assets/avatar.svg",
    bioSnippet: "B.Tech CSE (AI & ML) student passionate about building real-time computer vision systems, intelligent AI applications, and modern responsive web solutions."
  },
  about: {
    summary: "Passionate about advancing Artificial Intelligence and Computer Vision through practical innovation, with primary interests in Machine Learning, Deep Learning, Computer Vision, and Human-Centric AI Applications. Interested in building real-time vision pipelines, stress and emotion analysis systems, improving inference efficiency, and exploring real-world implementations of intelligent software.",
    stats: [
      { label: "Core Domains", value: "3+" },
      { label: "Hands-on Projects", value: "5+" },
      { label: "Tech Certifications", value: "3+" },
      { label: "Academic Standing", value: "2027" }
    ],
    highlights: [
      {
        icon: "fas fa-brain",
        title: "AI & Computer Vision",
        description: "Real-time OpenCV vision pipelines, facial landmark analysis, and automated emotion/stress recognition systems."
      },
      {
        icon: "fas fa-laptop-code",
        title: "Web Engineering",
        description: "Responsive, mobile-first web layouts using semantic HTML5, modern CSS3 animations, and interactive vanilla JavaScript."
      },
      {
        icon: "fas fa-cubes",
        title: "Core CS & OOP",
        description: "Strong grounding in Object-Oriented Programming (Java & Python), Data Structures, and clean algorithmic problem solving."
      }
    ]
  },
  skills: [
    {
      category: "Programming Languages",
      icon: "fas fa-code",
      items: ["Python", "Java (Basics)", "C++", "C", "JavaScript (ES6+)"]
    },
    {
      category: "Web Technologies",
      icon: "fas fa-globe",
      items: ["HTML5", "CSS3", "JavaScript DOM", "Responsive Web Design", "Flexbox & CSS Grid", "REST APIs"]
    },
    {
      category: "Core CS & AI",
      icon: "fas fa-microchip",
      items: ["Object-Oriented Programming (Java)", "Data Structures (Basics)", "Computer Vision (OpenCV)", "Machine Learning Basics", "Algorithmic Problem Solving"]
    },
    {
      category: "Developer Tools",
      icon: "fas fa-terminal",
      items: ["Git", "GitHub", "VS Code", "Jupyter Notebook", "OpenCV CLI", "Chrome DevTools"]
    },
    {
      category: "Soft Skills",
      icon: "fas fa-users",
      items: ["Analytical Thinking", "Problem Solving", "Teamwork & Collaboration", "Technical Writing", "Quick Learner"]
    }
  ],
  projects: [
    {
      title: "Real-Time AI-Based Stress Management System",
      category: "Artificial Intelligence & Computer Vision",
      badge: "Featured AI Project",
      description: "Real-time computer vision system evaluating psychological stress and fatigue indicators from live camera streams using OpenCV. Employs facial landmark analysis and emotion metrics to trigger automated relaxation interventions via an interactive web dashboard.",
      tags: ["Python", "OpenCV", "Facial Landmarks", "Emotion AI", "Web Dashboard", "HTML5/CSS3"],
      features: [
        "Live camera feed processing with high frame-rate facial tracking",
        "Multi-point landmark calculation for blink rate, eyebrow furrowing, and fatigue cues",
        "Interactive web dashboard providing real-time relaxation prompts and stress telemetry"
      ],
      github: "https://github.com/shivamthegreat116-glitch/Jolly-ai",
      demo: "https://github.com/shivamthegreat116-glitch/Jolly-ai"
    },
    {
      title: "Universal Digital Portfolio & Resume Platform",
      category: "Web Engineering",
      badge: "Interactive Web App",
      description: "A lightweight, client-side digital resume and portfolio website engine designed for students, developers, and professionals. Features dynamic in-browser content customization, instant ATS-ready PDF generation, light/dark themes, and JSON portability.",
      tags: ["HTML5", "CSS3", "Vanilla JavaScript", "Print CSS", "LocalStorage", "Zero Dependencies"],
      features: [
        "In-browser interactive live resume customizer with instant preview",
        "Export and import JSON configuration to carry resume anywhere",
        "Clean, print-optimized media queries for sharp PDF downloads"
      ],
      github: "https://github.com/shivamthegreat116-glitch/shivams-digital-portfolio",
      demo: "https://shivams-digital-portfolio.vercel.app"
    }
  ],
  experience: [
    {
      role: "AI & Computer Vision Prototyper",
      organization: "Academic & Open-Source Research",
      duration: "2024 - Present",
      location: "Greater Noida, India",
      points: [
        "Built end-to-end computer vision prototypes integrating live camera feeds, image processing, and interactive web frontends.",
        "Proficient in designing structured, responsive, and mobile-friendly web layouts using semantic HTML5 and modern CSS3.",
        "Practical foundation in Core Java and Object-Oriented Programming paradigms applied to algorithmic problem solving.",
        "Active learner pursuing specialized industry certification in Computer Vision Engineering from MathWorks.",
        "Demonstrated strong technical communication, analytical problem-solving, and collaborative team skills in technical projects."
      ]
    }
  ],
  education: [
    {
      degree: "B.Tech in Computer Science & Engineering (AI & Machine Learning)",
      institution: "AKTU University / Lloyd Institute Of Engineering And Technology",
      duration: "2023 - 2027",
      score: "3rd Semester (Expected 2027)",
      description: "Specializing in Artificial Intelligence and Machine Learning. Relevant coursework includes Data Structures, Object-Oriented Programming with Java, Python for AI, Discrete Mathematics, and Computer Architecture."
    },
    {
      degree: "Senior Secondary School / Junior College (Class XII)",
      institution: "Senior Secondary School",
      duration: "2021 - 2023",
      score: "Science Stream (PCM)",
      description: "Rigorous curriculum focused on Physics, Chemistry, and Advanced Mathematics, developing strong quantitative analytical thinking."
    }
  ],
  certifications: [
    {
      title: "Web Development: Front-End Fundamentals Certification",
      issuer: "Web Fundamentals Institute",
      date: "Verified",
      description: "Core competencies in semantic HTML5 markup, responsive CSS3 styling, and client-side JavaScript DOM programming."
    },
    {
      title: "Programming & Core: Foundations of OOP with Java & Python for AI",
      issuer: "Core Computing Credential",
      date: "Verified",
      description: "Hands-on foundation in Object-Oriented software architecture, encapsulation, inheritance, polymorphism, and Python AI scripting."
    },
    {
      title: "Computer Vision Engineering Specialist",
      issuer: "MathWorks Specialized Track",
      date: "In Progress",
      description: "Advanced training in feature detection, optical flow, camera calibration, and edge vision models."
    }
  ],
  achievements: [
    {
      title: "Smart India Hackathon (SIH) — Internal Round Qualified",
      year: "2024",
      description: "Qualified the competitive internal screening round for designing innovative tech solutions addressing critical real-world problem statements."
    },
    {
      title: "AI Stress Detection Prototype Recognition",
      year: "2024",
      description: "Presented functional live OpenCV stress and emotion tracking pipeline to faculty and peers with positive evaluations."
    }
  ]
};

// Make available globally on window or via module
if (typeof window !== 'undefined') {
  window.DEFAULT_RESUME_DATA = DEFAULT_RESUME_DATA;
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = DEFAULT_RESUME_DATA;
}

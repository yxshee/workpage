export type Project = {
  id: number;
  title: string;
  category: string;
  year: string;
  image: string;
  description: string;
  longDescription?: string;
  features?: string[];
  highlights?: string[];
  tech?: string[];
  githubUrl: string;
  liveUrl?: string;
};

export const personalInfo = {
  name: "Yash Dogra",
  role: "AI/ML Engineer & Full Stack Developer",
  location: "Hamirpur, Himachal Pradesh",
  email: "yxshdogra@gmail.com",
  phone: "+91 7876205914",
  socials: {
    instagram: "https://instagram.com/yxshdogra",
    linkedin: "https://www.linkedin.com/in/yxshdogra/",
    github: "https://github.com/yxshee",
  },
  resumeUrl: "/YashDogra_Resume.pdf",
  summary: "Computer Science undergraduate proficient in Python and C++ with hands on experience in ML frameworks for NLP and computer vision. Specializing in advanced AI techniques and full stack web development to solve real world problems.",
  education: [
    {
      institution: "Thapar Institute of Engineering and Technology",
      degree: "Bachelor of Engineering in Computer Science",
      period: "2021 - 2025",
      score: "CGPA: 8.11",
      location: "Patiala, Punjab"
    },
    {
      institution: "DAV Public School",
      degree: "CBSE, Class XII",
      period: "2020",
      score: "95.2%",
      location: "Hamirpur, Himachal Pradesh"
    }
  ],
  skills: {
    languages: ["Python", "C++", "SQL", "R"],
    frameworks: ["TensorFlow", "Keras", "PyTorch", "Scikit learn", "Hugging Face Transformers"],
    dataTools: ["NumPy", "Pandas", "Power BI", "Matplotlib", "OpenCV", "NLTK"],
    devTools: ["Git", "GitHub", "VS Code", "PyCharm", "Google Colab", "MySQL", "Redis", "Leaflet", "OAuth 2.0", "JWT"]
  },
  projects: [
    {
      id: 1,
      title: "MapMitra",
      category: "React • Node.js • MongoDB",
      year: "2024",
      image: "/images/core/mapmitra.webp",
      description: "Real time campus navigation and e rickshaw tracking with landmark based routing. Achieved 90% ETA prediction accuracy and reduced route computation latency by 40% via BFS optimization and Redis caching.",
      longDescription: "MapMitra is a comprehensive campus navigation solution featuring real-time e-rickshaw tracking, landmark-based routing, and intelligent ETA predictions. The system uses BFS optimization for efficient pathfinding and Redis caching to drastically reduce route computation latency.",
      features: ["90% ETA prediction accuracy", "40% reduced route computation latency", "Real-time e-rickshaw tracking", "Landmark-based navigation"],
      highlights: ["Designed and shipped end-to-end campus mobility workflows", "Improved route performance with BFS and Redis optimization"],
      tech: ["React", "Node.js", "MongoDB", "Leaflet", "Redis", "OAuth 2.0", "JWT"],
      githubUrl: "https://github.com/yxshee/mapmitra",
      liveUrl: "https://map-mitra.vercel.app"
    },
    {
      id: 2,
      title: "Text Summarization",
      category: "T5 Transformer • HuggingFace",
      year: "2024",
      image: "/images/core/image2.webp",
      description: "Developed a text summarization tool using the T5 Transformer model and XLSum dataset with focus on Punjabi. Achieved ROUGE1 of 54.38 and ROUGE-L of 53.57 post fine tuning.",
      longDescription: "Built and fine-tuned a T5-based summarization pipeline on XLSum, focusing on Punjabi summarization quality and practical evaluation outputs.",
      features: ["Fine-tuned T5 Transformer on XLSum", "Punjabi-language summarization workflow", "ROUGE score evaluation pipeline"],
      highlights: ["ROUGE-1: 54.38", "ROUGE-L: 53.57 after fine-tuning"],
      tech: ["Python", "Transformers", "ROUGE", "HuggingFace"],
      githubUrl: "https://github.com/yxshee/summarization-nlp",
      liveUrl: "https://txtsummarizer-nlp.streamlit.app"
    },
    {
      id: 3,
      title: "Toxic Terminator",
      category: "NLP • Streamlit",
      year: "2023",
      image: "/images/core/image3.webp",
      description: "Built a real world toxicity detection model using Kaggle dataset. Employed TF IDF and Naive Bayes classifier, achieving 95% test accuracy and 0.95 F1 score with real time Streamlit interface.",
      longDescription: "Implemented a practical toxicity detection app that combines TF-IDF feature extraction with a Naive Bayes classifier and a real-time Streamlit interface.",
      features: ["TF-IDF text vectorization", "Naive Bayes classification", "Real-time Streamlit prediction interface"],
      highlights: ["95% test accuracy", "0.95 F1 score on toxic text classification"],
      tech: ["Python", "Streamlit", "TF IDF", "Naive Bayes"],
      githubUrl: "https://github.com/yxshee/toxic-terminator",
      liveUrl: "https://toxicterminator.streamlit.app"
    },
    {
      id: 4,
      title: "Speech Command Recognition",
      category: "CNN • TensorFlow • Audio",
      year: "2024",
      image: "/images/core/speech.gif",
      description: "Speech command recognition using CNNs with preprocessing, model training, and performance evaluation on the TensorFlow dataset. Features audio processing and deep learning classification.",
      longDescription: "Created a complete speech-command classification workflow, from audio preprocessing to CNN training and evaluation on TensorFlow speech data.",
      features: ["Audio preprocessing and feature preparation", "CNN-based speech command model", "Dataset-level performance evaluation"],
      highlights: ["Built an end-to-end deep learning audio pipeline", "Focused on practical inference-ready classification"],
      tech: ["Python", "TensorFlow", "CNN", "Librosa", "Deep Learning"],
      githubUrl: "https://github.com/yxshee/speech-command-recognition",
      liveUrl: "https://librosaiscool.streamlit.app"
    },
    {
      id: 5,
      title: "TravelPage",
      category: "Next.js • TypeScript • GSAP",
      year: "2026",
      image: "/images/core/travel.webp",
      description: "Immersive travel portfolio built with Next.js, featuring smooth GSAP transitions, custom cursor behavior, and sequential storytelling sections.",
      longDescription: "Developed an immersive storytelling portfolio experience with section-by-section flow, animation-driven pacing, and tailored interaction details.",
      features: ["GSAP-powered scene transitions", "Custom cursor interaction patterns", "Sequential narrative section design"],
      highlights: ["Balanced performance with motion-heavy UI", "Shaped content for immersive exploration"],
      tech: ["Next.js", "TypeScript", "GSAP", "UI Animation"],
      githubUrl: "https://github.com/yxshee/travelpage"
    },
    {
      id: 6,
      title: "PromptDJ",
      category: "TypeScript • Creative AI UI",
      year: "2025",
      image: "/images/core/prompt-dj.webp",
      description: "DJ inspired web app for mixing, managing, and remixing AI prompts with an interactive interface focused on fast prompt experimentation.",
      longDescription: "Designed a creative AI interface inspired by DJ workflows so users can rapidly iterate, remix, and organize prompts in one place.",
      features: ["Prompt mixing and remix controls", "Fast experimentation-oriented interaction flow", "Organized prompt management UI"],
      highlights: ["Turned prompt experimentation into a playful workflow", "Focused on speed and low-friction interaction"],
      tech: ["TypeScript", "React", "Prompt Engineering", "UI Design"],
      githubUrl: "https://github.com/yxshee/promptdj"
    },
    {
      id: 7,
      title: "Realtime Face Attendance",
      category: "Python • OpenCV • ML",
      year: "2022",
      image: "/images/core/face-attendance.webp",
      description: "Automated attendance platform that enrolls and recognizes faces in real time, then records attendance with streamlined operator workflows.",
      longDescription: "Built a real-time attendance system that handles face enrollment, live recognition, and operator-friendly attendance recording.",
      features: ["Face enrollment and identity setup", "Live recognition workflow", "Attendance recording pipeline"],
      highlights: ["Reduced manual attendance effort", "Streamlined day-to-day operator process"],
      tech: ["Python", "OpenCV", "Face Recognition", "Computer Vision"],
      githubUrl: "https://github.com/yxshee/realtime-face-attendance"
    },
    {
      id: 8,
      title: "No BS College Predictor",
      category: "JavaScript • Decision Tool",
      year: "2023",
      image: "/images/core/page2-image4.webp",
      description: "Fast JEE college prediction utility built for zero friction results: no signups, minimal inputs, and straightforward recommendation outputs.",
      longDescription: "Created a lightweight prediction utility for JEE applicants that prioritizes speed, clarity, and no-login accessibility.",
      features: ["Minimal-input recommendation flow", "No-auth usage experience", "Straightforward result presentation"],
      highlights: ["Optimized for quick decision support", "Removed signup friction from core flow"],
      tech: ["JavaScript", "Data Mapping", "Frontend UX"],
      githubUrl: "https://github.com/yxshee/no-bs-college-predictor",
      liveUrl: "https://no-bs-predictor.netlify.app"
    },
    {
      id: 9,
      title: "Chatbot LangChain",
      category: "RAG • FAISS • Gemini",
      year: "2025",
      image: "/images/core/page2-image5.webp",
      description: "Regulation focused RAG chatbot that answers RBI NBFC queries using vector retrieval over official guideline chunks and LLM responses.",
      longDescription: "Implemented a regulation-aware RAG assistant that retrieves relevant RBI guideline chunks and produces context-grounded answers for NBFC queries.",
      features: ["FAISS vector retrieval", "Regulation-chunk grounding workflow", "LLM response generation for policy Q&A"],
      highlights: ["Improved response relevance with retrieval grounding", "Focused on domain-specific compliance queries"],
      tech: ["Python", "LangChain", "FAISS", "RAG", "Gemini API"],
      githubUrl: "https://github.com/yxshee/chatbot-langchain"
    },
    {
      id: 10,
      title: "PDFLayoutAI",
      category: "Python • YOLOv8 • PDF",
      year: "2025",
      image: "/images/core/page2-image6.webp",
      description: "AI driven PDF layout detector that annotates multi page documents, exports structured JSON, and supports CLI based batch processing.",
      longDescription: "Built a document-layout analysis tool that detects page elements with YOLOv8 and exports structured outputs for downstream automation.",
      features: ["Multi-page PDF layout detection", "Structured JSON export", "CLI batch processing support"],
      highlights: ["Automated document parsing workflows", "Designed for repeatable large-batch runs"],
      tech: ["Python", "YOLOv8", "PDF Processing", "CLI"],
      githubUrl: "https://github.com/yxshee/pdflayoutai"
    },
    {
      id: 11,
      title: "Kaleidoscope",
      category: "TypeScript • p5.js",
      year: "2025",
      image: "/images/core/page2-image7.webp",
      description: "Interactive generative art experience built with p5.js and TypeScript, designed around responsive symmetry and motion driven visuals.",
      longDescription: "Created a responsive generative art playground using p5.js with symmetry-focused visual systems and motion-reactive behavior.",
      features: ["Interactive symmetry controls", "Motion-driven visual transformations", "Responsive canvas behavior"],
      highlights: ["Explored creative coding interaction design", "Prioritized smooth visuals across screen sizes"],
      tech: ["TypeScript", "p5.js", "Generative Art"],
      githubUrl: "https://github.com/yxshee/kaleidoscope",
      liveUrl: "https://yxshee.github.io/kaleidoscope"
    },
    {
      id: 12,
      title: "Listify",
      category: "Flutter • Dart",
      year: "2022",
      image: "/images/core/image5.webp",
      description: "Cross platform shopping list app with streamlined list management, quick item workflows, and clean mobile first information hierarchy.",
      longDescription: "Built a mobile-first shopping companion with fast list operations, clear structure, and cross-platform delivery using Flutter.",
      features: ["Cross-platform list management", "Quick add/update item actions", "Mobile-first information hierarchy"],
      highlights: ["Focused on daily-use simplicity", "Shipped with clean, task-oriented UX"],
      tech: ["Flutter", "Dart", "Mobile UI", "State Management"],
      githubUrl: "https://github.com/yxshee/listify"
    },
    {
      id: 13,
      title: "MetaScrub",
      category: "JavaScript • Privacy Tool",
      year: "2025",
      image: "/images/core/image6.webp",
      description: "Remove all metadata from images in your browser, ensuring privacy and safe sharing. Client side processing with no server uploads.",
      longDescription: "Developed a browser-native privacy utility that strips metadata from images locally before sharing.",
      features: ["Client-side metadata removal", "No server upload workflow", "Privacy-first image handling"],
      highlights: ["Protected user privacy with local processing", "Kept the workflow lightweight and fast"],
      tech: ["JavaScript", "Canvas API", "EXIF", "Privacy"],
      githubUrl: "https://github.com/yxshee/metascrub",
      liveUrl: "https://yxshee.github.io/metascrub"
    },
    {
      id: 14,
      title: "Handwritten Text Recognition",
      category: "Deep Learning • OCR",
      year: "2023",
      image: "/images/core/image7.webp",
      description: "Deep learning based approach to recognizing handwritten text from images using neural networks and image preprocessing techniques.",
      longDescription: "Implemented an OCR pipeline for handwritten inputs using image preprocessing and neural network-based sequence understanding.",
      features: ["Image preprocessing for handwritten inputs", "Neural OCR model workflow", "Recognition pipeline experimentation"],
      highlights: ["Improved handwritten text readability for models", "Combined CV preprocessing with DL inference"],
      tech: ["Python", "TensorFlow", "CNN", "OCR", "Image Processing"],
      githubUrl: "https://github.com/yxshee/handwritten-text-recognition"
    },
    {
      id: 15,
      title: "Fake Currency Detector",
      category: "Python • OpenCV • SSIM",
      year: "2024",
      image: "/images/core/page3-image1.webp",
      description: "Python based system to detect counterfeit INR 500 and 2000 notes using image processing techniques like ORB feature matching and SSIM similarity.",
      longDescription: "Built a counterfeit-detection workflow for INR notes using feature matching and structural similarity analysis.",
      features: ["ORB feature matching pipeline", "SSIM-based authenticity comparison", "Image-processing verification checks"],
      highlights: ["Focused on practical counterfeit detection heuristics", "Combined complementary visual similarity methods"],
      tech: ["Python", "OpenCV", "ORB", "SSIM", "Image Processing"],
      githubUrl: "https://github.com/yxshee/fake-currency-detector"
    },
    {
      id: 16,
      title: "ThermoSight",
      category: "PyTorch • ViT • Streamlit",
      year: "2025",
      image: "/images/core/thermosight.webp",
      description: "Vision Transformer based thermal image classifier for post fire concrete assessment, with an interactive Streamlit app and TensorBoard tracked training pipeline.",
      longDescription: "Developed a ViT-based thermal imagery classifier to support post-fire concrete evaluation, wrapped with a Streamlit interface and experiment tracking.",
      features: ["Vision Transformer thermal classification", "Streamlit inference interface", "TensorBoard tracked training pipeline"],
      highlights: ["Applied ViT models to civil assessment context", "Built a reproducible training and evaluation loop"],
      tech: ["Python", "PyTorch", "Vision Transformer", "Streamlit", "TensorBoard"],
      githubUrl: "https://github.com/yxshee/thermosight",
      liveUrl: "https://thermosight.streamlit.app"
    },
    {
      id: 17,
      title: "Personal Portfolio",
      category: "Next.js • React • Framer Motion",
      year: "2026",
      image: "/images/core/personal-portfolio.webp",
      description: "Interactive portfolio website featuring motion-heavy UI, 3D orbit carousel, recursive generative backgrounds, and theme-aware glassmorphic design components.",
      longDescription: "Built a modern portfolio experience combining React 19, Next.js 16 App Router, and Framer Motion animations. Features include an orbit-based project carousel, p5.js generative backgrounds, custom cursor interactions, and comprehensive theme system with glassmorphic panels.",
      features: ["3D orbit carousel for project showcase", "Recursive generative art backgrounds", "Custom cursor with preview states", "Theme-aware glassmorphic UI components"],
      highlights: ["Motion-heavy UI with smooth 60fps animations", "Responsive design across all breakpoints", "Optimized performance with Next.js 16"],
      tech: ["Next.js", "React", "TypeScript", "Framer Motion", "p5.js", "Tailwind CSS"],
      githubUrl: "https://github.com/yxshee/workpage",
      liveUrl: "https://yxshee.github.io"
    }
  ] satisfies Project[],

  certifications: [
    { id: 1, title: "NVIDIA Fundamentals of Accelerated Computing with CUDA Python", year: "2025", issuer: "NVIDIA", image: "/images/core/page3-image1.webp" },
    { id: 2, title: "NVIDIA Generative AI with Diffusion Models", year: "2025", issuer: "NVIDIA", image: "/images/core/page3-image2.webp" },
    { id: 3, title: "IBM Data Science Professional Certificate", year: "2023", issuer: "IBM", image: "/images/core/page3-image3.webp" },
    { id: 4, title: "IBM Artificial Intelligence Fundamentals", year: "2025", issuer: "IBM", image: "/images/core/page3-image4.webp" },
    { id: 5, title: "IBM Building AI Solutions with Advanced Algorithms", year: "2025", issuer: "IBM", image: "/images/core/page3-image5.webp" },
    { id: 6, title: "IBM Building Trustworthy AI Enterprise Solutions", year: "2025", issuer: "IBM", image: "/images/core/page3-image6.webp" },
    { id: 7, title: "IBM Generative AI in Action", year: "2025", issuer: "IBM", image: "/images/core/page3-image7.webp" },
    { id: 8, title: "Google UX Design Professional Certificate", year: "2023", issuer: "Google", image: "/images/core/page2-image1.webp" },
    { id: 9, title: "Computer Vision Specialization", year: "2024", issuer: "Coursera", image: "/images/core/page2-image2.webp" },
    { id: 10, title: "Cyber Security Fundamentals", year: "2024", issuer: "Coursera", image: "/images/core/page2-image3.webp" },
    { id: 11, title: "Mobile App Development", year: "2024", issuer: "Coursera", image: "/images/core/page2-image4.webp" },
    { id: 14, title: "Pandas for Data Analysis", year: "2024", issuer: "Kaggle", image: "/images/core/page2-image7.webp" },
    { id: 16, title: "Robotic Arm Development", year: "2024", issuer: "Technical Certification", image: "/images/core/image6.webp" },
    { id: 17, title: "Handwritten Text Recognition", year: "2024", issuer: "Research Certificate", image: "/images/core/image7.webp" },
    { id: 18, title: "ICICC 2025 Conference Presentation", year: "2025", issuer: "ICICC Singapore", image: "/images/core/page3-image1.webp" },
    
  ],
  archive: [
    { id: 101, title: "ICICC 2025 Research Paper Presentation", year: "2025", type: "Publication", image: "/images/core/page3-image1.webp" },
    { id: 102, title: "Gold Medal Inter departmental Football", year: "2024", type: "Sports", image: "/images/core/page3-image2.webp" },
    { id: 103, title: "Silver Medal Inter departmental Chess", year: "2024", type: "Sports", image: "/images/core/page3-image3.webp" },
    { id: 104, title: "Head of Logistics - Girl Up Patiala", year: "2023", type: "Leadership", image: "/images/core/page3-image4.webp" }
  ],
  heroImage: "/images/core/thegreats.webp"
};




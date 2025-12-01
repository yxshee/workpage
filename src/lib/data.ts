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
      image: "/images/core/image1.webp",
      description: "Real time campus navigation and e rickshaw tracking with landmark based routing. Achieved 90% ETA prediction accuracy and reduced route computation latency by 40% via BFS optimization and Redis caching.",
      technologies: ["React", "Node.js", "MongoDB", "Leaflet", "Redis", "OAuth 2.0", "JWT"],
      repoUrl: "https://github.com/yxshee/mapmitra"
    },
    {
      id: 2,
      title: "Text Summarization",
      category: "T5 Transformer • HuggingFace",
      year: "2024",
      image: "/images/core/image2.webp",
      description: "Developed a text summarization tool using the T5 Transformer model and XLSum dataset with focus on Punjabi. Achieved ROUGE1 of 54.38 and ROUGE-L of 53.57 post fine tuning.",
      technologies: ["Python", "Transformers", "ROUGE", "HuggingFace"],
      repoUrl: "https://github.com/yxshee/summarization-nlp"
    },
    {
      id: 3,
      title: "Toxic Terminator",
      category: "NLP • Streamlit",
      year: "2023",
      image: "/images/core/image3.webp",
      description: "Built a real world toxicity detection model using Kaggle dataset. Employed TF IDF and Naive Bayes classifier, achieving 95% test accuracy and 0.95 F1 score with real time Streamlit interface.",
      technologies: ["Python", "Streamlit", "TF IDF", "Naive Bayes"],
      repoUrl: "https://github.com/yxshee/toxic-terminator"
    },
    {
      id: 4,
      title: "Speech Command Recognition",
      category: "CNN • TensorFlow • Audio",
      year: "2024",
      image: "/images/core/image4.webp",
      description: "Speech command recognition using CNNs with preprocessing, model training, and performance evaluation on the TensorFlow dataset. Features audio processing and deep learning classification.",
      technologies: ["Python", "TensorFlow", "CNN", "Librosa", "Deep Learning"],
      repoUrl: "https://github.com/yxshee/speech-command-recognition"
    },
    {
      id: 5,
      title: "TravelPage",
      category: "Next.js • TypeScript • GSAP",
      year: "2026",
      image: "/images/core/page2-image1.webp",
      description: "Immersive travel portfolio built with Next.js, featuring smooth GSAP transitions, custom cursor behavior, and sequential storytelling sections.",
      technologies: ["Next.js", "TypeScript", "GSAP", "UI Animation"],
      repoUrl: "https://github.com/yxshee/travelpage"
    },
    {
      id: 6,
      title: "PromptDJ",
      category: "TypeScript • Creative AI UI",
      year: "2026",
      image: "/images/core/page2-image2.webp",
      description: "DJ inspired web app for mixing, managing, and remixing AI prompts with an interactive interface focused on fast prompt experimentation.",
      technologies: ["TypeScript", "React", "Prompt Engineering", "UI Design"],
      repoUrl: "https://github.com/yxshee/promptdj"
    },
    {
      id: 7,
      title: "Realtime Face Attendance",
      category: "Python • OpenCV • ML",
      year: "2026",
      image: "/images/core/page2-image3.webp",
      description: "Automated attendance platform that enrolls and recognizes faces in real time, then records attendance with streamlined operator workflows.",
      technologies: ["Python", "OpenCV", "Face Recognition", "Computer Vision"],
      repoUrl: "https://github.com/yxshee/realtime-face-attendance"
    },
    {
      id: 8,
      title: "No BS College Predictor",
      category: "JavaScript • Decision Tool",
      year: "2026",
      image: "/images/core/page2-image4.webp",
      description: "Fast JEE college prediction utility built for zero friction results: no signups, minimal inputs, and straightforward recommendation outputs.",
      technologies: ["JavaScript", "Data Mapping", "Frontend UX"],
      repoUrl: "https://github.com/yxshee/no-bs-college-predictor"
    },
    {
      id: 9,
      title: "Chatbot LangChain",
      category: "RAG • FAISS • Gemini",
      year: "2026",
      image: "/images/core/page2-image5.webp",
      description: "Regulation focused RAG chatbot that answers RBI NBFC queries using vector retrieval over official guideline chunks and LLM responses.",
      technologies: ["Python", "LangChain", "FAISS", "RAG", "Gemini API"],
      repoUrl: "https://github.com/yxshee/chatbot-langchain"
    },
    {
      id: 10,
      title: "PDFLayoutAI",
      category: "Python • YOLOv8 • PDF",
      year: "2025",
      image: "/images/core/page2-image6.webp",
      description: "AI driven PDF layout detector that annotates multi page documents, exports structured JSON, and supports CLI based batch processing.",
      technologies: ["Python", "YOLOv8", "PDF Processing", "CLI"],
      repoUrl: "https://github.com/yxshee/pdflayoutai"
    },
    {
      id: 11,
      title: "Kaleidoscope",
      category: "TypeScript • p5.js",
      year: "2026",
      image: "/images/core/page2-image7.webp",
      description: "Interactive generative art experience built with p5.js and TypeScript, designed around responsive symmetry and motion driven visuals.",
      technologies: ["TypeScript", "p5.js", "Generative Art"],
      repoUrl: "https://github.com/yxshee/kaleidoscope"
    },
    {
      id: 12,
      title: "Listify",
      category: "Flutter • Dart",
      year: "2026",
      image: "/images/core/image5.webp",
      description: "Cross platform shopping list app with streamlined list management, quick item workflows, and clean mobile first information hierarchy.",
      technologies: ["Flutter", "Dart", "Mobile UI", "State Management"],
      repoUrl: "https://github.com/yxshee/listify"
    },
    {
      id: 13,
      title: "MetaScrub",
      category: "JavaScript • Privacy Tool",
      year: "2025",
      image: "/images/core/image6.webp",
      description: "Remove all metadata from images in your browser, ensuring privacy and safe sharing. Client side processing with no server uploads.",
      technologies: ["JavaScript", "Canvas API", "EXIF", "Privacy"],
      repoUrl: "https://github.com/yxshee/metascrub"
    },
    {
      id: 14,
      title: "Handwritten Text Recognition",
      
      category: "Deep Learning • OCR",
      year: "2025",
      image: "/images/core/image7.webp",
      description: "Deep learning based approach to recognizing handwritten text from images using neural networks and image preprocessing techniques.",
      technologies: ["Python", "TensorFlow", "CNN", "OCR", "Image Processing"],
      repoUrl: "https://github.com/yxshee/handwritten-text-recognition"
    },
    {
      id: 15,
      title: "Fake Currency Detector",
      category: "Python • OpenCV • SSIM",
      year: "2024",
      image: "/images/core/page3-image1.webp",
      description: "Python based system to detect counterfeit INR 500 and 2000 notes using image processing techniques like ORB feature matching and SSIM similarity.",
      technologies: ["Python", "OpenCV", "ORB", "SSIM", "Image Processing"],
      repoUrl: "https://github.com/yxshee/fake-currency-detector"
    },
    {
      id: 16,
      title: "ThermoSight",
      category: "PyTorch • ViT • Streamlit",
      year: "2025",
      image: "/images/core/page3-image2.webp",
      description: "Vision Transformer based thermal image classifier for post fire concrete assessment, with an interactive Streamlit app and TensorBoard tracked training pipeline.",
      technologies: ["Python", "PyTorch", "Vision Transformer", "Streamlit", "TensorBoard"],
      repoUrl: "https://github.com/yxshee/thermosight"
    }
  ],

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

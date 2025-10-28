import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Github, Linkedin, Sun, Moon, Phone, MapPin, Briefcase, Code, BookOpen, ChevronDown, CheckCircle, GraduationCap, Award, Download, Zap } from 'lucide-react';
// NOTE: Removed the direct import for emailjs as it causes compilation issues in this environment.
import profilePic from './assets/Dhanuja.png';
import portofolio_Pic from './assets/Dhanuja_Portofolio2.0.jpg';

// --- CONFIGURATION DATA ---
const sections = [
  { id: 'about', title: 'About' },
  { id: 'skills', title: 'Skills' },
  { id: 'projects', title: 'Projects' },
  { id: 'contact', title: 'Contact' },
];

const staggerContainer = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: 'easeOut',
      when: 'beforeChildren',
    },
  },
};

const getSkillIcon = (skill) => {
  const icons = {
    'Java': <svg className="h-5 w-5 text-orange-400" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 0L0 4.5l3.5 15.5L12 24l8.5-4L24 4.5zM12 3.5l-6.5 11L12 21l6.5-6.5z"/></svg>,
    'Python': <svg className="h-5 w-5 text-sky-400" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M12 2a10 10 0 100 20 10 10 0 000-20zM12 4a8 8 0 110 16 8 8 0 010-16zM12 6a6 6 0 100 12 6 6 0 000-12z" /></svg>,
    'C': <svg className="h-5 w-5 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zM12 16a4 4 0 100-8 4 4 0 000 8z" /></svg>,
    'C#': <svg className="h-5 w-5 text-purple-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zM12 16a4 4 0 100-8 4 4 0 000 8z" /></svg>,
    'Angular': <svg className="h-5 w-5 text-red-500" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M12 0L0 4.5l3.5 15.5L12 24l8.5-4L24 4.5zM12 3.5l-6.5 11L12 21l6.5-6.5z" /></svg>,
    'React': <svg className="h-5 w-5 text-cyan-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2zm0 4v12M12 6c3.314 0 6 2.686 6 6s-2.686 6-6 6M12 6c-3.314 0-6 2.686-6 6s2.686 6 6 6M12 6l-6 10.392M12 6l6 10.392" /></svg>,
    'Next.js': <svg className="h-5 w-5 text-gray-400" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M12 2a10 10 0 100 20 10 10 0 000-20zM12 4a8 8 0 110 16 8 8 0 010-16zM12 6a6 6 0 100 12 6 6 0 000-12zM12 8a4 4 0 100 8 4 4 0 000-8z" /></svg>,
    'Html': <svg className="h-5 w-5 text-orange-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.875 1.5l-8 2A1.5 1.5 0 002 4.969V15a1.5 1.5 0 00.875 1.375l8 2A1.5 1.5 0 0012 17.031V3a1.5 1.5 0 00-1.125-1.531zM11 15.5V5.5l7 1.75V17.25l-7-1.75z" clipRule="evenodd" /></svg>,
    'Tailwind CSS': <svg className="h-5 w-5 text-cyan-400" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 2.75a9.25 9.25 0 100 18.5 9.25 9.25 0 000-18.5zM12 4.75a7.25 7.25 0 110 14.5 7.25 7.25 0 010-14.5zM12 6.75a5.25 5.25 0 100 10.5 5.25 5.25 0 000-10.5z" /></svg>,
    'JavaScript': <svg className="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 2a10 10 0 100 20 10 10 0 000-20zM12 4a8 8 0 110 16 8 8 0 010-16zM12 6a6 6 0 100 12 6 6 0 000-12zM12 8a4 4 0 100 8 4 4 0 000-8z" /></svg>,
    'ASP.NET': <svg className="h-5 w-5 text-purple-600" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zM12 4a8 8 0 110 16 8 8 0 010-16z" /></svg>,
    'MSSQL': <svg className="h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 2a10 10 0 100 20 10 10 0 000-20zM12 4a8 8 0 110 16 8 8 0 010-16zM12 6a6 6 0 100 12 6 6 0 000-12z" /></svg>,
    'MySQL': <svg className="h-5 w-5 text-orange-400" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 2a10 10 0 100 20 10 10 0 000-20zM12 4a8 8 0 110 16 8 8 0 010-16zM12 6a6 6 0 100 12 6 6 0 000-12z" /></svg>,
    'MongoDB': <svg className="h-5 w-5 text-green-500" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 2a10 10 0 100 20 10 10 0 000-20zM12 4a8 8 0 110 16 8 8 0 010-16zM12 6a6 6 0 100 12 6 6 0 000-12z" /></svg>,
    'PostgreSQL': <svg className="h-5 w-5 text-blue-500" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 2a10 10 0 100 20 10 10 0 000-20zM12 4a8 8 0 110 16 8 8 0 010-16zM12 6a6 6 0 100 12 6 6 0 000-12z" /></svg>,
    'TestNG': <svg className="h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 2a10 10 0 100 20 10 10 0 000-20zM12 4a8 8 0 110 16 8 8 0 010-16zM12 6a6 6 0 100 12 6 6 0 000-12z" /></svg>,
    'JIRA': <svg className="h-5 w-5 text-blue-500" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 2a10 10 0 100 20 10 10 0 000-20zM12 4a8 8 0 110 16 8 8 0 010-16zM12 6a6 6 0 100 12 6 6 0 000-12z" /></svg>,
    'Git': <svg className="h-5 w-5 text-orange-600" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18a8 8 0 110-16 8 8 0 010 16zM12 6a6 6 0 100 12 6 6 0 000-12z" /></svg>,
    'Github': <svg className="h-5 w-5 text-gray-400" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zM12 4a8 8 0 110 16 8 8 0 010-16zM12 6a6 6 0 100 12 6 6 0 000-12zM12 8a4 4 0 100 8 4 4 0 000-8z" /></svg>,
    'Figma': <svg className="h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 2a10 10 0 100 20 10 10 0 000-20zM12 4a8 8 0 110 16 8 8 0 010-16zM12 6a6 6 0 100 12 6 6 0 000-12z" /></svg>,
    'Cisco Packet Tracer': <svg className="h-5 w-5 text-blue-500" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 2a10 10 0 100 20 10 10 0 000-20zM12 4a8 8 0 110 16 8 8 0 010-16zM12 6a6 6 0 100 12 6 6 0 000-12z" /></svg>,
    'Google Collab': <svg className="h-5 w-5 text-green-500" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 2a10 10 0 100 20 10 10 0 000-20zM12 4a8 8 0 110 16 8 8 0 010-16zM12 6a6 6 0 100 12 6 6 0 000-12z" /></svg>,
    'Postman': <svg className="h-5 w-5 text-orange-400" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 2a10 10 0 100 20 10 10 0 000-20zM12 4a8 8 0 110 16 8 8 0 010-16zM12 6a6 6 0 100 12 6 6 0 000-12z" /></svg>,
  };
  return icons[skill] || <Code className="h-5 w-5 text-gray-500" />;
};

const skillsData = {
  'Programming Languages': ['Java', 'Python', 'C', 'C#', 'JavaScript'],
  'Frontend Development': ['Angular', 'React', 'Next.js', 'Html', 'Tailwind CSS'],
  'Backend & Database': ['ASP.NET', 'MSSQL', 'MySQL', 'MongoDB', 'PostgreSQL'],
  'Tools & Workflow': ['Git', 'Github', 'Figma', 'Postman', 'JIRA', 'TestNG', 'Cisco Packet Tracer', 'Google Collab'],
};

const softSkills = ['Problem Solving', 'Leadership', 'Attention to Detail', 'Good Team Player', 'Effective Communication', 'Critical Thinking', 'Adaptability', 'Conflict Resolution'];

const projectsData = [
  {
    title: 'Personal Portfolio Website (This Site!)',
    description: 'A dynamic and modern personal portfolio website built to showcase my skills, projects, and professional experience. Designed with a focus on performance, user experience, and a state-of-the-art technology stack.',
    technologies: ['React.js', 'Tailwind CSS', 'Framer Motion', 'Vercel', 'CI/CD'],
    role: 'Full Stack Developer',
    link: '#',
    imageUrl: '../src/assets/Dhanuja_Portofolio2.0.jpg', 
  },
  {
    title: 'Tea Factory Supply Chain Management System',
    description: 'Developed a full-stack Tea Factory Supply Chain Management System (TFSCMS) to digitize and automate key processes, enhancing efficiency and data accuracy. My core responsibility was designing and implementing the Ledger Management and Reporting modules.',
    technologies: ['Angular', 'ASP.NET', 'Flutter', 'MSSQL', 'Azure'],
    role: 'Full Stack Developer',
    link: '#',
    imageUrl: 'https://placehold.co/600x400/581c87/fff?text=Supply+Chain+Management', 
  },
  {
    title: 'Linkedin Job Application Tracker (Ongoing)',
    description: 'Developing a Chrome extension to automate job application tracking and management for Linkedin users. Core features include automated job posting detection, one-click application saving, and success pattern analysis.',
    technologies: ['JavaScript ES6+', 'Chrome Extension APIs', 'HTML5', 'CSS3', 'Chrome Storage API'],
    role: 'Full Stack Developer',
    link: '#',
    imageUrl: 'https://placehold.co/600x400/0f766e/fff?text=Job+Tracker+Extension', 
  },
  {
    title: 'Condition Controlled Plant Maintaining System (IoT)',
    description: 'Developed an IoT-based automated plant care system for urban residents using ESP32 microcontroller with integrated environmental monitoring and control capabilities.',
    technologies: ['Arduino', 'ESP32', 'DHT22/DS18B20 Sensors', 'C++', 'Proteus Simulation'],
    role: 'Hardware Engineer',
    link: '#',
    imageUrl: 'https://placehold.co/600x400/fb923c/fff?text=IoT+System+Diagram', 
  },
  {
    title: 'Condition Controlled Plant Maintaining System (IoT)',
    description: 'Developed an IoT-based automated plant care system for urban residents using ESP32 microcontroller with integrated environmental monitoring and control capabilities.',
    technologies: ['Arduino', 'ESP32', 'DHT22/DS18B20 Sensors', 'C++', 'Proteus Simulation'],
    role: 'Hardware Engineer',
    link: '#',
    imageUrl: 'https://placehold.co/600x400/fb923c/fff?text=IoT+System+Diagram', 
  },
];

// Background Graphics Component (Falling Particles)
const ParticleBackground = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <style jsx="true">{`
      .particle {
        position: absolute;
        width: 3px; /* Slightly larger particles for visibility */
        height: 3px;
        background-color: rgba(244, 63, 94, 0.6); /* rose-500 with opacity */
        border-radius: 50%;
        animation: fall linear infinite;
        opacity: 0;
      }

      .particle-light {
        background-color: rgba(255, 255, 255, 0.3); /* Lighter particles for contrast */
      }

      @keyframes fall {
        0% {
          transform: translateY(-10vh) translateX(0);
          opacity: 0;
        }
        5% { opacity: 1; }
        95% { opacity: 1; }
        100% {
          transform: translateY(110vh) translateX(10vw); /* Increased travel distance */
          opacity: 0;
        }
      }
    `}</style>
    {Array.from({ length: 80 }).map((_, i) => ( /* Increased particle count */
      <div
        key={i}
        className={`particle ${i % 3 === 0 ? '' : 'particle-light'}`}
        style={{
          left: `${Math.random() * 100}vw`,
          top: `${Math.random() * 100}vh`,
          animationDuration: `${Math.random() * 10 + 8}s`, // Slower movement
          animationDelay: `${Math.random() * 15}s`,
          width: `${Math.random() * 2 + 1.5}px`,
          height: `${Math.random() * 2 + 1.5}px`,
        }}
      />
    ))}
  </div>
);

// --- COMPONENTS ---

// Navbar Component
const Header = ({ activeSection, smoothScrollTo, isDarkMode, setIsDarkMode }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const headerBgClass = isDarkMode
    ? isScrolled ? 'bg-gray-950/90 backdrop-blur-md shadow-2xl' : 'bg-transparent'
    : isScrolled ? 'bg-white/90 backdrop-blur-md shadow-lg' : 'bg-transparent';
  
  const textClass = isDarkMode ? 'text-gray-300 hover:text-rose-500' : 'text-gray-700 hover:text-rose-500';

  return (
    <motion.header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${headerBgClass}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 100 }}
    >
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
        <a href="#" className="text-3xl font-extrabold text-rose-500 transition-colors duration-300">
          DS
        </a>
        <div className="hidden md:flex items-center space-x-6">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => smoothScrollTo(section.id)}
              className={`text-lg font-medium py-2 px-3 transition-all duration-300 transform border-b-2 ${
                activeSection === section.id
                  ? 'text-rose-500 border-rose-500 font-bold'
                  : `border-transparent ${textClass} hover:border-rose-500/50`
              }`}
            >
              {section.title}
            </button>
          ))}
          <a
            href="#" // Placeholder for resume download link
            className="bg-rose-500 text-white font-bold py-2 px-5 rounded-lg shadow-xl transform transition-all duration-300 hover:scale-[1.02] hover:bg-rose-600 flex items-center gap-2 ml-4"
          >
            <Download className="w-4 h-4" /> Resume
          </a>
          <button onClick={() => setIsDarkMode(!isDarkMode)} className={`${textClass} transition-colors duration-300 p-2 rounded-full hover:bg-gray-800/50`}>
            {isDarkMode ? <Sun className="h-6 w-6" /> : <Moon className="h-6 w-6" />}
          </button>
        </div>
      </nav>
    </motion.header>
  );
};

// Main App Component
const App = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const [isDarkMode, setIsDarkMode] = useState(true);

  // Form state for Email.js
  const form = useRef();
  const [formStatus, setFormStatus] = useState(''); // 'success', 'error', 'sending', ''
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formMessage, setFormMessage] = useState('');

  // --- Email.js Sending Function Placeholder ---
  const sendEmail = async (e) => {
    e.preventDefault();
    setFormStatus('sending');

    // NOTE: This uses the direct Email.js API endpoint. When deployed,
    // ensure you have the correct library installed OR use a serverless function
    // to handle the API call securely.
    const SERVICE_ID = 'service_qxp6p35'; 
    const TEMPLATE_ID = 'template_oeullns'; 
    const PUBLIC_KEY = 'hgY6-0qg4krI-UBDw';
    const API_ENDPOINT = 'https://api.emailjs.com/api/v1.0/email/send';

    const payload = {
      service_id: SERVICE_ID,
      template_id: TEMPLATE_ID,
      user_id: PUBLIC_KEY,
      template_params: {
        from_name: formName,
        from_email: formEmail,
        message: formMessage,
      },
    };

    try {
      const response = await fetch(API_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (response.status === 200) {
        console.log('Email sent successfully via fetch.');
        setFormStatus('success');
        setFormName('');
        setFormEmail('');
        setFormMessage('');
      } else {
        const errorText = await response.text();
        console.error('Email sending failed:', errorText);
        setFormStatus('error');
      }
    } catch (error) {
      console.error('Network error during email send:', error);
      setFormStatus('error');
    }
    
    // Clear status after 5 seconds
    setTimeout(() => setFormStatus(''), 5000); 
  };
  // --- End of Email.js Function Placeholder ---


  useEffect(() => {
    // Set initial dark mode state to the class on the body/html for Tailwind
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    const handleScroll = () => {
      let currentSection = 'hero';
      const sectionIds = ['about', 'skills', 'projects', 'contact'];
      for (const sectionId of sectionIds) {
        const element = document.getElementById(sectionId);
        if (element && window.scrollY >= element.offsetTop - 200) {
          currentSection = sectionId;
        }
      }
      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isDarkMode]);

  const smoothScrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80, // Offset for fixed header
        behavior: 'smooth',
      });
    }
  };

  const getCardClasses = (isDarkMode) => (
    isDarkMode ? 'bg-gray-800/50 border border-gray-700/70' : 'bg-white shadow-xl border border-gray-200'
  );

  const getSectionTitleClass = (isDarkMode) => (
    isDarkMode ? 'text-white' : 'text-gray-900'
  );

  const getTextColor = (isDarkMode) => (
    isDarkMode ? 'text-gray-300' : 'text-gray-700'
  );

  const EducationSection = () => (
    <motion.div variants={itemVariants} className={`${getCardClasses(isDarkMode)} p-8 rounded-xl transition-colors duration-500 h-full`}>
      <h3 className={`text-xl sm:text-2xl font-bold ${getSectionTitleClass(isDarkMode)} mb-6 flex items-center gap-3 border-b border-rose-500/30 pb-3`}>
        <GraduationCap className="h-7 w-7 text-rose-500" /> Education
      </h3>
      <div className="space-y-6">
        <div>
          <h4 className={`${getTextColor(isDarkMode)} text-lg font-semibold`}>University of Moratuwa</h4>
          <p className={`${getTextColor(isDarkMode)} text-sm`}>B.Sc.(Hons) in Information Technology</p>
          <p className="text-gray-500 text-xs">2023 - Present</p>
        </div>
        <div>
          <h4 className={`${getTextColor(isDarkMode)} text-lg font-semibold`}>Ananda National College, Chilaw</h4>
          <p className={`${getTextColor(isDarkMode)} text-sm`}>GCE Advanced Level - 2021 (Biological Science Stream)</p>
          <p className="text-gray-500 text-xs mt-1">Results: 3Bs | Z Score: 1.5967 | District Rank: 105</p>
        </div>
      </div>
    </motion.div>
  );

  const AchievementsSection = () => (
    <motion.div variants={itemVariants} className={`${getCardClasses(isDarkMode)} p-8 rounded-xl transition-colors duration-500 h-full`}>
      <h3 className={`text-xl sm:text-2xl font-bold ${getSectionTitleClass(isDarkMode)} mb-6 flex items-center gap-3 border-b border-rose-500/30 pb-3`}>
        <Award className="h-7 w-7 text-rose-500" /> Achievements
      </h3>
      <ul className="space-y-4">
        {[
          'MoraXtreme 9.0 (2024) - Participant',
          'Mora UXplore 2.0 - Semi-finalists',
          'SpiritX (2025) - Participant',
          'Company Coordinator - FIT Future Careers - 2024',
          'Floor Coordinator - FIT Future Careers 2025'
        ].map((item, index) => (
          <li key={index} className="flex items-start gap-3">
            <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-1" />
            <span className={`${getTextColor(isDarkMode)} text-base`}>{item}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );

  const InterestsSection = () => (
    <motion.div variants={itemVariants} className={`${getCardClasses(isDarkMode)} p-8 rounded-xl transition-colors duration-500 h-full`}>
      <h3 className={`text-xl sm:text-2xl font-bold ${getSectionTitleClass(isDarkMode)} mb-6 flex items-center gap-3 border-b border-rose-500/30 pb-3`}>
        <BookOpen className="h-7 w-7 text-rose-500" /> Beyond Code
      </h3>
      <p className={`${getTextColor(isDarkMode)} leading-relaxed mb-4`}>
        When I'm not coding, you'll find me analyzing Formula 1 strategies, playing badminton, or diving into mystery novels.
      </p>
      <div className="flex flex-wrap gap-2">
        {['Formula 1', 'Badminton', 'Cricket', 'Music', 'Mystery Novels'].map((hobby) => (
          <span key={hobby} className={`${isDarkMode ? 'bg-gray-700 text-gray-400' : 'bg-gray-300 text-gray-700'} text-sm py-1 px-3 rounded-full font-medium`}>
            {hobby}
          </span>
        ))}
      </div>
    </motion.div>
  );

  const LanguagesSection = () => (
    <motion.div variants={itemVariants} className={`${getCardClasses(isDarkMode)} p-8 rounded-xl transition-colors duration-500 h-full`}>
      <h3 className={`text-xl sm:text-2xl font-bold ${getSectionTitleClass(isDarkMode)} mb-6 flex items-center gap-3 border-b border-rose-500/30 pb-3`}>
        <Briefcase className="h-7 w-7 text-rose-500" /> Languages
      </h3>
      <ul className="space-y-4">
        <li>
          <h4 className={`${getTextColor(isDarkMode)} text-lg font-semibold`}>Sinhala</h4>
          <p className="text-gray-500 text-sm">Native</p>
        </li>
        <li>
          <h4 className={`${getTextColor(isDarkMode)} text-lg font-semibold`}>English</h4>
          <p className="text-gray-500 text-sm">Fluent</p>
        </li>
      </ul>
    </motion.div>
  );

  return (
    <div className={`min-h-screen font-sans antialiased transition-colors duration-500 ${isDarkMode ? 'bg-gray-950 text-gray-100' : 'bg-gray-50 text-gray-900'} relative`}>
      {isDarkMode && <ParticleBackground />}
      <Header activeSection={activeSection} smoothScrollTo={smoothScrollTo} isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
      
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 pt-20 relative z-10">

        {/* --- HERO SECTION (Text on Left, Smaller Image on Right) --- */}
        <section id="hero" className="min-h-[calc(100vh-80px)] flex items-center justify-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            // Layout: text first (left), image second (right)
            className="flex flex-col lg:flex-row items-center justify-between w-full max-w-7xl lg:space-x-12 py-12 lg:py-0"
          >
            {/* 1. TEXT CONTENT (Left Side - Dominant Space) */}
            <div className="text-center lg:text-left w-full lg:w-3/5 max-w-2xl mb-12 lg:mb-0">
              <motion.h1 
                variants={itemVariants} 
                className={`text-4xl sm:text-6xl lg:text-7xl font-extrabold leading-tight mb-4 ${getSectionTitleClass(isDarkMode)}`}
              >
                Hi, I'm <span className="text-rose-500">Dhanuja Surasingha</span>
              </motion.h1>
              <motion.h2 
                variants={itemVariants} 
                className={`text-xl sm:text-3xl font-semibold mb-4 ${getTextColor(isDarkMode)}`}
              >
                Software Engineer Intern
              </motion.h2>
              
              {/* STATIC TAGLINE */}
              <motion.p 
                variants={itemVariants} 
                className={`${getTextColor(isDarkMode)} text-lg sm:text-xl font-medium mb-10`}
              >
                Building innovative solutions in <span className="font-bold">scalable systems</span>. Passionate about creating efficient, scalable systems that make a difference.
              </motion.p>
              
              <motion.div variants={itemVariants} className="flex justify-center lg:justify-start space-x-4">
                <motion.a
                  href="#projects"
                  className="bg-rose-500 hover:bg-rose-600 text-white font-bold py-3 px-8 rounded-lg shadow-xl transform transition-all duration-300 hover:scale-[1.05]"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  View My Work
                </motion.a>
                <motion.a
                  href="#contact"
                  className={`border-2 border-rose-500 ${isDarkMode ? 'bg-transparent text-rose-500 hover:bg-rose-500/10' : 'bg-transparent text-rose-500 hover:bg-rose-500/10'} font-bold py-3 px-8 rounded-lg transform transition-all duration-300 hover:scale-[1.02]`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Get In Touch
                </motion.a>
              </motion.div>
            </div>
            
            {/* 2. IMAGE CONTAINER (Right Side - Smaller and Subtler) */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.2, ease: "easeOut", delay: 0.5 }}
              // Small image container on the right
              className="w-full lg:w-2/5 flex justify-center items-center"
            >
                <motion.div
                    // Small max width (max-w-xs)
                    className="w-full max-w-xs aspect-square relative rounded-full overflow-hidden shadow-2xl border-4 border-rose-500/50"
                    whileHover={{ scale: 1.05, boxShadow: isDarkMode ? '0 0 40px rgba(244, 63, 94, 0.7)' : '0 0 30px rgba(244, 63, 94, 0.5)' }}
                    transition={{ type: "spring", stiffness: 100, damping: 10 }}
                >
                    <motion.img
                        // --- IMAGE SOURCE ---
                        src={profilePic}
                        alt="Dhanuja Surasingha"
                        className="absolute inset-0 w-full h-full object-cover rounded-full"
                        initial={{ scale: 1.1 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/300x300/2D3748/fff?text=DS+Photo"; }}
                    />
                </motion.div>
            </motion.div>
          </motion.div>
        </section>
        
        {/* --- ABOUT ME SECTION --- */}
        <motion.section 
          id="about" 
          className="py-20 lg:py-32"
          initial="hidden"
          whileInView="visible"
          variants={sectionVariants}
          viewport={{ amount: 0.2, once: false }}
        >
          <motion.h2
            variants={itemVariants}
            className={`text-4xl font-bold text-center ${getSectionTitleClass(isDarkMode)} mb-4`}
          >
            About Me
          </motion.h2>
          <motion.p variants={itemVariants} className={`${getTextColor(isDarkMode)} text-xl text-center mb-16`}>
            A dedicated and passionate IT undergraduate ready for innovative projects.
          </motion.p>

          <motion.div 
            variants={staggerContainer}
            className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto"
          >
            <motion.div
              variants={itemVariants}
              className={`${getCardClasses(isDarkMode)} p-8 rounded-xl shadow-2xl col-span-1 lg:col-span-1 transition-colors duration-500`}
            >
              <h3 className={`text-2xl font-bold ${getSectionTitleClass(isDarkMode)} mb-4 border-b border-rose-500/30 pb-3`}>
                Summary
              </h3>
              <p className={`${getTextColor(isDarkMode)} leading-relaxed`}>
                A passionate and motivated IT undergraduate and aspiring Software Engineer with a strong foundation in core programming and problem-solving. Possessing a keen interest in **Cloud Computing** and **DevOps** methodologies, I am eager to apply my foundational development skills and commitment to continuous learning in a challenging Software Engineering Internship. Seeking to contribute to innovative projects and gain hands-on experience in building efficient, scalable systems.
              </p>
            </motion.div>

            <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-8">
              <EducationSection />
              <AchievementsSection />
              <InterestsSection />
              <LanguagesSection />
            </div>
          </motion.div>
        </motion.section>

        {/* --- SKILLS SECTION (Fixed Gap) --- */}
        <motion.section 
          id="skills" 
          className="py-20 lg:py-32" 
          initial="hidden"
          whileInView="visible"
          variants={sectionVariants}
          viewport={{ amount: 0.2, once: false }}
        >
          <motion.h2
            variants={itemVariants}
            className={`text-4xl font-bold text-center ${getSectionTitleClass(isDarkMode)} mb-4`}
          >
            Technical & Soft Skills
          </motion.h2>
          <motion.p variants={itemVariants} className={`${getTextColor(isDarkMode)} text-xl text-center mb-16`}>
            Mastering a modern stack for full-stack and specialized development.
          </motion.p>
          
          <motion.div 
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto"
          >
            {Object.entries(skillsData).map(([category, skills], index) => (
              <motion.div
                key={category}
                variants={itemVariants}
                className={`${getCardClasses(isDarkMode)} p-6 rounded-xl shadow-lg transition-all duration-300 hover:shadow-2xl hover:scale-[1.01]`}
              >
                <h3 className={`text-xl font-semibold ${getSectionTitleClass(isDarkMode)} mb-4 border-b border-rose-500/30 pb-2 flex items-center gap-3`}>
                  <Code className="h-6 w-6 text-rose-500" /> {category}
                </h3>
                <ul className="flex flex-wrap gap-3">
                  {skills.map((skill) => (
                    <motion.li
                      key={skill}
                      className={`${isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-300 text-gray-700'} text-sm py-1.5 px-3 rounded-full font-medium shadow-inner flex items-center gap-2`}
                      whileHover={{ scale: 1.05, boxShadow: '0 0 8px rgba(244, 63, 94, 0.4)' }}
                      transition={{ duration: 0.2 }}
                    >
                      {getSkillIcon(skill)}
                      <span>{skill}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}
            {/* Soft Skills Card */}
            <motion.div
              variants={itemVariants}
              className={`${getCardClasses(isDarkMode)} p-6 rounded-xl shadow-lg transition-all duration-300 hover:shadow-2xl hover:scale-[1.01] lg:col-span-3`}
            >
              <h3 className={`text-xl font-semibold ${getSectionTitleClass(isDarkMode)} mb-4 border-b border-rose-500/30 pb-2 flex items-center gap-3`}>
                <BookOpen className="h-6 w-6 text-rose-500" /> Soft Skills & Attributes
              </h3>
              <ul className="flex flex-wrap gap-3">
                {softSkills.map((skill) => (
                  <motion.li
                    key={skill}
                    className={`${isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-300 text-gray-700'} text-sm py-1.5 px-3 rounded-full font-medium shadow-inner`}
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                  >
                    {skill}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        </motion.section>

        {/* --- PROJECTS SECTION --- */}
        <motion.section 
          id="projects" 
          className="py-20 lg:py-32"
          initial="hidden"
          whileInView="visible"
          variants={sectionVariants}
          viewport={{ amount: 0.1, once: false }}
        >
          <motion.h2
            variants={itemVariants}
            className={`text-4xl font-bold text-center ${getSectionTitleClass(isDarkMode)} mb-4`}
          >
            Featured Projects
          </motion.h2>
          <motion.p variants={itemVariants} className={`${getTextColor(isDarkMode)} text-xl text-center mb-16`}>
            Showcasing my full-stack capability and diverse technological interests.
          </motion.p>

          <motion.div 
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto"
          >
            {projectsData.map((project, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className={`${getCardClasses(isDarkMode)} p-8 rounded-xl shadow-2xl flex flex-col transition-all duration-300 hover:scale-[1.02] hover:ring-2 hover:ring-rose-500/50`}
                whileHover={{ y: -5 }}
              >
                <div className="mb-6 rounded-xl overflow-hidden shadow-xl">
                    {/* Placeholder image for project */}
                    <img
                        src={project.imageUrl} 
                        alt={project.title}
                        className="w-full h-48 object-cover object-center"
                        onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/600x400/2D3748/fff?text=Project+Image"; }}
                    />
                </div>
                <h3 className={`text-2xl font-bold ${getSectionTitleClass(isDarkMode)} mb-3`}>{project.title}</h3>
                <p className={`text-sm font-semibold text-rose-500 mb-4`}>Role: {project.role}</p>
                
                <p className={`${getTextColor(isDarkMode)} leading-relaxed mb-6 flex-grow`}>{project.description}</p>
                
                <div>
                  <h4 className={`text-lg font-semibold text-rose-500 mb-3 border-t border-rose-500/30 pt-3`}>Technologies Used</h4>
                  <ul className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <li key={tech} className={`${isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-300 text-gray-700'} text-sm py-1 px-3 rounded-full`}>
                        {tech}
                      </li>
                    ))}
                  </ul>
                  {/* NEW: GitHub Link Button */}
                   <a 
                     href="#" 
                     target="_blank" 
                     rel="noopener noreferrer" 
                     className="inline-flex items-center gap-2 bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg transition-all duration-300 text-sm shadow-md mt-2"
                      >
                    <Github className="h-4 w-4" /> View Code
                   </a>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        {/* --- CONTACT SECTION --- */}
        <motion.section 
          id="contact" 
          className="py-20 lg:py-32"
          initial="hidden"
          whileInView="visible"
          variants={sectionVariants}
          viewport={{ amount: 0.2, once: false }}
        >
          <motion.h2
            variants={itemVariants}
            className={`text-4xl font-bold text-center ${getSectionTitleClass(isDarkMode)} mb-4`}
          >
            Get In Touch
          </motion.h2>
          <motion.p variants={itemVariants} className={`${getTextColor(isDarkMode)} text-xl text-center mb-16`}>
            Have a project idea or just want to connect? Send me a message!
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-6xl mx-auto">
            
            {/* Contact Form */}
            <motion.div
              variants={itemVariants}
              className={`${getCardClasses(isDarkMode)} p-8 rounded-xl shadow-2xl transition-colors duration-500`}
            >
              <h3 className={`text-2xl font-bold ${getSectionTitleClass(isDarkMode)} mb-6`}>Send a Quick Message</h3>
              <form ref={form} onSubmit={sendEmail} className="space-y-6">
                <input 
                  type="text" 
                  name="user_name"
                  placeholder="Your Full Name" 
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  required
                  className={`w-full p-3 rounded-lg ${isDarkMode ? 'bg-gray-900 text-gray-200 placeholder-gray-500 border-gray-700' : 'bg-gray-100 text-gray-800 placeholder-gray-500 border-gray-300'} border focus:outline-none focus:ring-2 focus:ring-rose-500`} 
                />
                <input 
                  type="email" 
                  name="user_email"
                  placeholder="Your Email Address" 
                  value={formEmail}
                  onChange={(e) => setFormEmail(e.target.value)}
                  required
                  className={`w-full p-3 rounded-lg ${isDarkMode ? 'bg-gray-900 text-gray-200 placeholder-gray-500 border-gray-700' : 'bg-gray-100 text-gray-800 placeholder-gray-500 border-gray-300'} border focus:outline-none focus:ring-2 focus:ring-rose-500`} 
                />
                <textarea 
                  rows="5" 
                  name="message"
                  placeholder="Tell me about your project or opportunity..." 
                  value={formMessage}
                  onChange={(e) => setFormMessage(e.target.value)}
                  required
                  className={`w-full p-3 rounded-lg ${isDarkMode ? 'bg-gray-900 text-gray-200 placeholder-gray-500 border-gray-700' : 'bg-gray-100 text-gray-800 placeholder-gray-500 border-gray-300'} border focus:outline-none focus:ring-2 focus:ring-rose-500`}
                ></textarea>
                
                {/* Status Message */}
                <AnimatePresence>
                  {formStatus === 'success' && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="text-center text-green-500 font-bold"
                    >
                      Message sent successfully! Thank you.
                    </motion.p>
                  )}
                  {formStatus === 'error' && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="text-center text-red-500 font-bold"
                    >
                      Failed to send message. Please try again or email me directly.
                    </motion.p>
                  )}
                </AnimatePresence>

                <motion.button
                  type="submit"
                  disabled={formStatus === 'sending'}
                  className={`w-full font-bold py-3 rounded-lg shadow-lg transform transition-all duration-300 ${
                    formStatus === 'sending' 
                      ? 'bg-gray-500 cursor-not-allowed' 
                      : 'bg-rose-500 hover:bg-rose-600 hover:scale-[1.02]'
                  } text-white`}
                  whileHover={{ scale: formStatus !== 'sending' ? 1.02 : 1 }}
                  whileTap={{ scale: formStatus !== 'sending' ? 0.98 : 1 }}
                >
                  {formStatus === 'sending' ? 'Sending...' : 'Send Message'}
                </motion.button>
              </form>
            </motion.div>
            
            {/* Contact Details & Socials */}
            <div className="space-y-8">
              <motion.div
                variants={itemVariants}
                className={`${getCardClasses(isDarkMode)} p-8 rounded-xl shadow-2xl transition-colors duration-500`}
              >
                <h3 className={`text-2xl font-bold ${getSectionTitleClass(isDarkMode)} mb-4`}>Details</h3>
                <div className="flex flex-col space-y-4">
                  <div className="flex items-center gap-3">
                    <Mail className="h-6 w-6 text-rose-500" />
                    <a href="mailto:dhanuja.surasingha@gmail.com" className={`${getTextColor(isDarkMode)} hover:text-rose-500 transition-colors duration-300`}>dhanuja.surasingha@gmail.com</a>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="h-6 w-6 text-rose-500" />
                    <a href="tel:+94763082404" className={`${getTextColor(isDarkMode)} hover:text-rose-500 transition-colors duration-300`}>+94 76 3082404</a>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="h-6 w-6 text-rose-500" />
                    <span className={`${getTextColor(isDarkMode)}`}>Moratuwa, Sri Lanka</span>
                  </div>
                </div>
              </motion.div>
              <motion.div
                variants={itemVariants}
                className={`${getCardClasses(isDarkMode)} p-8 rounded-xl shadow-2xl transition-colors duration-500`}
              >
                <h3 className={`text-2xl font-bold ${getSectionTitleClass(isDarkMode)} mb-4`}>Connect</h3>
                <p className={`${getTextColor(isDarkMode)} leading-relaxed mb-6`}>
                  I'm currently seeking internship opportunities and exciting projects where I can contribute my skills in full-stack development, IoT, and cloud computing.
                </p>
                <div className="flex space-x-4">
                  <a href="https://www.linkedin.com/in/dhanuja-surasingha/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-rose-500 text-white font-bold py-2 px-5 rounded-lg shadow-lg transform transition-all duration-300 hover:scale-[1.05] hover:bg-rose-600">
                    <Linkedin className="h-5 w-5" /> LinkedIn
                  </a>
                  <a href="https://github.com/Dhanuja-Surasingha" target="_blank" rel="noopener noreferrer" className={`${isDarkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-300 text-gray-700 hover:bg-gray-400'} font-bold py-2 px-5 rounded-lg shadow-lg transform transition-all duration-300 hover:scale-[1.02] flex items-center gap-2`}>
                    <Github className="h-5 w-5" /> GitHub
                  </a>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.section>
      </main>

      <footer className={`${isDarkMode ? 'bg-gray-950/90 border-t border-gray-800' : 'bg-gray-100/90 border-t border-gray-200'} py-8 transition-colors duration-500 relative z-10`}>
        <div className={`container mx-auto text-center ${isDarkMode ? 'text-gray-500' : 'text-gray-600'} text-sm`}>
          Made by Dhanuja Surasingha | &copy; {new Date().getFullYear()} All Rights Reserved.
        </div>
      </footer>
    </div>
  );
};

export default App;

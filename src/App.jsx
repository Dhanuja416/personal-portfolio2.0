import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Github, Linkedin, Sun, Moon, Phone, MapPin, Briefcase, Code, BookOpen, ChevronDown, CheckCircle, GraduationCap, Award } from 'lucide-react';

const imageBaseUrl = './src/assets/Dhanuja.png';

const sections = [
  { id: 'about', title: 'About' },
  { id: 'projects', title: 'Projects' },
  { id: 'skills', title: 'Skills' },
  { id: 'contact', title: 'Contact' },
];

const navItemVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

const variants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 },
};

const getSkillIcon = (skill) => {
  const icons = {
    'Java': (
      <svg className="h-4 w-4 text-orange-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.5-12.5a.5.5 0 00-1 0v4.25a.75.75 0 001.5 0V7.22l.78.78a.75.75 0 101.06-1.06L11 5.44V6.5zm-2 0a.5.5 0 00-1 0v1.75a.75.75 0 001.5 0V7.22l.78.78a.75.75 0 101.06-1.06L9 5.44V6.5z" clipRule="evenodd" />
        <path fillRule="evenodd" d="M8.75 12.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" clipRule="evenodd" />
      </svg>
    ),
    'Python': (
      <svg className="h-4 w-4 text-sky-400" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2a10 10 0 100 20 10 10 0 000-20zM12 4a8 8 0 110 16 8 8 0 010-16zM12 6a6 6 0 100 12 6 6 0 000-12z" />
      </svg>
    ),
    'C': (
      <svg className="h-4 w-4 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zM12 16a4 4 0 100-8 4 4 0 000 8z" />
      </svg>
    ),
    'C#': (
      <svg className="h-4 w-4 text-purple-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zM12 16a4 4 0 100-8 4 4 0 000 8z" />
      </svg>
    ),
    'Angular': (
      <svg className="h-4 w-4 text-red-500" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 0L0 4.5l3.5 15.5L12 24l8.5-4L24 4.5zM12 3.5l-6.5 11L12 21l6.5-6.5z" />
      </svg>
    ),
    'React': (
      <svg className="h-4 w-4 text-cyan-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2zm0 4v12M12 6c3.314 0 6 2.686 6 6s-2.686 6-6 6M12 6c-3.314 0-6 2.686-6 6s2.686 6 6 6M12 6l-6 10.392M12 6l6 10.392" />
      </svg>
    ),
    'Next.js': (
      <svg className="h-4 w-4 text-gray-400" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2a10 10 0 100 20 10 10 0 000-20zM12 4a8 8 0 110 16 8 8 0 010-16zM12 6a6 6 0 100 12 6 6 0 000-12zM12 8a4 4 0 100 8 4 4 0 000-8z" />
      </svg>
    ),
    'Html': (
      <svg className="h-4 w-4 text-orange-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" d="M10.875 1.5l-8 2A1.5 1.5 0 002 4.969V15a1.5 1.5 0 00.875 1.375l8 2A1.5 1.5 0 0012 17.031V3a1.5 1.5 0 00-1.125-1.531zM11 15.5V5.5l7 1.75V17.25l-7-1.75z" clipRule="evenodd" />
      </svg>
    ),
    'Tailwind CSS': (
      <svg className="h-4 w-4 text-cyan-400" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2.75a9.25 9.25 0 100 18.5 9.25 9.25 0 000-18.5zM12 4.75a7.25 7.25 0 110 14.5 7.25 7.25 0 010-14.5zM12 6.75a5.25 5.25 0 100 10.5 5.25 5.25 0 000-10.5z" />
      </svg>
    ),
    'JavaScript': (
      <svg className="h-4 w-4 text-yellow-400" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2a10 10 0 100 20 10 10 0 000-20zM12 4a8 8 0 110 16 8 8 0 010-16zM12 6a6 6 0 100 12 6 6 0 000-12zM12 8a4 4 0 100 8 4 4 0 000-8z" />
      </svg>
    ),
    'ASP.NET': (
      <svg className="h-4 w-4 text-purple-600" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zM12 4a8 8 0 110 16 8 8 0 010-16z" />
      </svg>
    ),
    'MSSQL': (
      <svg className="h-4 w-4 text-red-500" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2a10 10 0 100 20 10 10 0 000-20zM12 4a8 8 0 110 16 8 8 0 010-16zM12 6a6 6 0 100 12 6 6 0 000-12z" />
      </svg>
    ),
    'MySQL': (
      <svg className="h-4 w-4 text-orange-400" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2a10 10 0 100 20 10 10 0 000-20zM12 4a8 8 0 110 16 8 8 0 010-16zM12 6a6 6 0 100 12 6 6 0 000-12z" />
      </svg>
    ),
    'MongoDB': (
      <svg className="h-4 w-4 text-green-500" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2a10 10 0 100 20 10 10 0 000-20zM12 4a8 8 0 110 16 8 8 0 010-16zM12 6a6 6 0 100 12 6 6 0 000-12z" />
      </svg>
    ),
    'PostgreSQL': (
      <svg className="h-4 w-4 text-blue-500" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2a10 10 0 100 20 10 10 0 000-20zM12 4a8 8 0 110 16 8 8 0 010-16zM12 6a6 6 0 100 12 6 6 0 000-12z" />
      </svg>
    ),
    'TestNG': (
      <svg className="h-4 w-4 text-red-500" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2a10 10 0 100 20 10 10 0 000-20zM12 4a8 8 0 110 16 8 8 0 010-16zM12 6a6 6 0 100 12 6 6 0 000-12z" />
      </svg>
    ),
    'JIRA': (
      <svg className="h-4 w-4 text-blue-500" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2a10 10 0 100 20 10 10 0 000-20zM12 4a8 8 0 110 16 8 8 0 010-16zM12 6a6 6 0 100 12 6 6 0 000-12z" />
      </svg>
    ),
    'Git': (
      <svg className="h-4 w-4 text-orange-600" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18a8 8 0 110-16 8 8 0 010 16zM12 6a6 6 0 100 12 6 6 0 000-12z" />
      </svg>
    ),
    'Github': (
      <svg className="h-4 w-4 text-gray-400" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zM12 4a8 8 0 110 16 8 8 0 010-16zM12 6a6 6 0 100 12 6 6 0 000-12zM12 8a4 4 0 100 8 4 4 0 000-8z" />
      </svg>
    ),
    'Figma': (
      <svg className="h-4 w-4 text-red-500" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2a10 10 0 100 20 10 10 0 000-20zM12 4a8 8 0 110 16 8 8 0 010-16zM12 6a6 6 0 100 12 6 6 0 000-12z" />
      </svg>
    ),
    'Cisco Packet Tracer': (
      <svg className="h-4 w-4 text-blue-500" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2a10 10 0 100 20 10 10 0 000-20zM12 4a8 8 0 110 16 8 8 0 010-16zM12 6a6 6 0 100 12 6 6 0 000-12z" />
      </svg>
    ),
    'Google Collab': (
      <svg className="h-4 w-4 text-green-500" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2a10 10 0 100 20 10 10 0 000-20zM12 4a8 8 0 110 16 8 8 0 010-16zM12 6a6 6 0 100 12 6 6 0 000-12z" />
      </svg>
    ),
    'Postman': (
      <svg className="h-4 w-4 text-orange-400" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2a10 10 0 100 20 10 10 0 000-20zM12 4a8 8 0 110 16 8 8 0 010-16zM12 6a6 6 0 100 12 6 6 0 000-12z" />
      </svg>
    ),
  };
  return icons[skill] || <svg className="h-4 w-4 text-gray-500" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none"/></svg>;
};

const App = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      let currentSection = 'hero';
      const sections = ['about', 'projects', 'skills', 'contact'];
      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element && window.scrollY >= element.offsetTop - 100) {
          currentSection = sectionId;
        }
      }
      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const smoothScrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop,
        behavior: 'smooth',
      });
      setIsMobileMenuOpen(false);
    }
  };

  const skillsData = {
    'Programming Languages': ['Java', 'Python', 'C', 'C#'],
    'Frontend Development': ['Angular', 'React', 'Next.js', 'Html', 'Tailwind CSS', 'JavaScript'],
    'Backend Development': ['ASP.NET'],
    'Databases': ['MSSQL', 'MySQL', 'MongoDB', 'PostgreSQL'],
    'Software Testing': ['TestNG'],
    'Project Management': ['JIRA'],
    'Version Controlling': ['Git', 'Github'],
    'Tools': ['Figma', 'Cisco Packet Tracer', 'Google Collab', 'Postman'],
  };
  
  const softSkills = ['Problem Solving', 'Leadership', 'Attention to Detail', 'Good Team Player', 'Effective Communication', 'Critical Thinking', 'Adaptability', 'Conflict Resolution'];

  const projectsData = [
    {
      title: 'Personal Portfolio Website',
      description: 'A dynamic and modern personal portfolio website built to showcase my skills, projects, and professional experience.',
      technologies: ['React.js', 'Tailwind CSS', 'Framer Motion', 'ASP.NET Core', 'MSSQL', 'Vercel', 'Azure App Service'],
      role: 'Full Stack Developer',
    },
    {
      title: 'Tea Factory Supply Chain Management System',
      description: 'Developed a full-stack Tea Factory Supply Chain Management System (TFSCMS) to digitize and automate key processes, enhancing efficiency and data accuracy.',
      technologies: ['Angular', 'ASP.NET', 'Flutter', 'MSSQL', 'Azure'],
      role: 'Full Stack Developer',
    },
    {
      title: 'Linkedin Job Application Tracker',
      description: 'Developing a Chrome extension to automate job application tracking and management for Linkedin users.',
      technologies: ['JavaScript ES6+', 'Chrome Extension APIs', 'HTML5', 'CSS3', 'Chrome Storage API'],
      role: 'Full Stack Developer',
    },
    {
      title: 'Condition controlled plant maintaining system',
      description: 'Developed an IoT-based automated plant care system for urban residents using ESP32 microcontroller with integrated environmental monitoring and control capabilities.',
      technologies: ['Arduino', 'ESP32', 'DHT22/DS18B20 Sensors', 'C++', 'Proteus Simulation', 'EasyEDA'],
      role: 'Hardware Engineer',
    },
  ];

  const EducationSection = () => (
    <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-gray-200'} p-8 rounded-3xl shadow-2xl transition-colors duration-500`}>
      <h3 className={`text-xl sm:text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-6 flex items-center gap-2`}>
        <GraduationCap className="h-8 w-8 text-rose-500" /> Education
      </h3>
      <div className="space-y-6">
        <div>
          <h4 className={`${isDarkMode ? 'text-gray-200' : 'text-gray-800'} text-lg font-semibold`}>University of Moratuwa</h4>
          <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>B.Sc.(Hons) in Information Technology</p>
          <p className={`${isDarkMode ? 'text-gray-500' : 'text-gray-500'} text-sm`}>2023 - Present</p>
        </div>
        <div className={`${isDarkMode ? 'border-gray-700' : 'border-gray-300'} border-t pt-4`}>
          <h4 className={`${isDarkMode ? 'text-gray-200' : 'text-gray-800'} text-lg font-semibold`}>Ananda National College, Chilaw</h4>
          <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>GCE Advanced Level - 2021 (Biological Science Stream)</p>
          <p className={`${isDarkMode ? 'text-gray-500' : 'text-gray-500'} text-sm`}>Results: 3Bs | Z Score: 1.5967 | District Rank: 105</p>
          <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mt-2`}>GCE Ordinary Level - 2016</p>
          <p className={`${isDarkMode ? 'text-gray-500' : 'text-gray-500'} text-sm`}>Results: 9As</p>
        </div>
      </div>
    </div>
  );

  const AchievementsSection = () => (
    <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-gray-200'} p-8 rounded-3xl shadow-2xl transition-colors duration-500`}>
      <h3 className={`text-xl sm:text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-6 flex items-center gap-2`}>
        <Award className="h-8 w-8 text-rose-500" /> Achievements & Leadership
      </h3>
      <ul className="space-y-4">
        <li className="flex items-center gap-3">
          <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
          <span className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>MoraXtreme 9.0 (2024) - Participant - Organized by IEEE University of Moratuwa</span>
        </li>
        <li className="flex items-center gap-3">
          <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
          <span className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Mora UXplore 2.0 - Semi-finalists - Organized by the University of Moratuwa</span>
        </li>
        <li className="flex items-center gap-3">
          <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
          <span className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>SpiritX (2025) - Participant - Inter University development competition organized by Mora Spirit 360 - University of Moratuwa</span>
        </li>
        <li className="flex items-center gap-3">
          <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
          <span className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Company Coordinator - FIT Future Careers - 2024</span>
        </li>
        <li className="flex items-center gap-3">
          <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
          <span className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Floor Coordinator - FIT Future Careers 2025</span>
        </li>
      </ul>
    </div>
  );

  return (
    <div className={`${isDarkMode ? 'bg-gray-900 text-gray-200' : 'bg-white text-gray-800'} min-h-screen font-sans antialiased transition-colors duration-500`}>
      <header className={`${isDarkMode ? 'bg-gray-900/70' : 'bg-white/70'} fixed top-0 left-0 right-0 z-50 backdrop-blur-md shadow-lg`}>
        <nav className="container mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
          <motion.a
            href="#"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-2xl font-bold text-rose-500"
          >
            DS
          </motion.a>
          <div className="hidden md:flex items-center space-x-6 lg:space-x-10">
            {sections.map((section, index) => (
              <motion.button
                key={section.id}
                onClick={() => smoothScrollTo(section.id)}
                className={`text-lg font-medium py-2 px-4 transition-all duration-300 transform ${
                  activeSection === section.id
                    ? 'text-rose-500 border-b-2 border-rose-500'
                    : isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                }`}
                variants={navItemVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.1 * index }}
              >
                {section.title}
              </motion.button>
            ))}
            <motion.a
              href="#"
              className="bg-rose-500 text-white font-bold py-2 px-6 rounded-full shadow-lg transform transition-all duration-300 hover:scale-105 ml-4"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Resume
            </motion.a>
            <button onClick={() => setIsDarkMode(!isDarkMode)} className={`${isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors duration-300`}>
              {isDarkMode ? <Sun className="h-6 w-6" /> : <Moon className="h-6 w-6" />}
            </button>
          </div>
          <button
            className={`md:hidden transition-colors duration-300 ${isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-gray-900'}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <ChevronDown className={`h-8 w-8 transition-transform duration-300 ${isMobileMenuOpen ? 'rotate-180' : ''}`} />
          </button>
        </nav>
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className={`md:hidden ${isDarkMode ? 'bg-gray-800/90' : 'bg-gray-100/90'} backdrop-blur-md`}
            >
              <div className="flex flex-col items-start px-4 py-2 space-y-2">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => smoothScrollTo(section.id)}
                    className={`w-full text-left py-3 px-4 ${isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-gray-900'} transition-colors duration-300 rounded-lg`}
                  >
                    {section.title}
                  </button>
                ))}
                <motion.a
                  href="#"
                  className="w-full text-center bg-rose-500 text-white font-bold py-2 px-6 rounded-full mt-4"
                >
                  Resume
                </motion.a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
      
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-32">
        <section id="hero" className="flex flex-col lg:flex-row items-center justify-between mb-24 lg:space-x-12">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={variants}
            transition={{ duration: 1 }}
            className="text-center lg:text-left mb-12 lg:mb-0 max-w-2xl"
          >
            <motion.img
              src={imageBaseUrl}
              alt="Dhanuja Surasingha"
              className="w-48 h-48 rounded-full object-cover mx-auto mb-6 md:hidden"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
            />
            <h1 className={`${isDarkMode ? 'text-white' : 'text-gray-900'} text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-4`}>
              Hi, I'm <span className="text-rose-500">Dhanuja Surasingha</span>
            </h1>
            <h2 className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'} text-xl sm:text-2xl font-semibold mb-2`}>
              Software Engineer Intern
            </h2>
            <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'} text-lg sm:text-xl font-medium mb-6`}>
              Building innovative solutions in full-stack development, IoT, and cloud computing. Passionate about creating efficient, scalable systems that make a difference.
            </p>
            <div className="flex justify-center lg:justify-start space-x-4">
              <motion.a
                href="#projects"
                className="bg-rose-500 hover:bg-rose-600 text-white font-bold py-3 px-8 rounded-full shadow-lg transform transition-all duration-300 hover:scale-105"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View My Work
              </motion.a>
              <motion.a
                href="#contact"
                className={`${isDarkMode ? 'bg-gray-700 hover:bg-gray-600 text-gray-200' : 'bg-gray-300 hover:bg-gray-400 text-gray-800'} font-bold py-3 px-8 rounded-full shadow-lg transform transition-all duration-300 hover:scale-105`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Get In Touch
              </motion.a>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className={`hidden md:block w-80 h-80 lg:w-96 lg:h-96 relative rounded-full overflow-hidden border-4 ${isDarkMode ? 'border-gray-700' : 'border-gray-300'} shadow-2xl`}
          >
            <motion.img
              src={imageBaseUrl}
              alt="Dhanuja Surasingha"
              className="absolute inset-0 w-full h-full object-cover rounded-full"
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            />
          </motion.div>
        </section>

        <section id="about" className="py-20 lg:py-32">
          <motion.h2
            className={`text-3xl sm:text-4xl font-bold text-center ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-12`}
            initial="hidden"
            whileInView="visible"
            variants={variants}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, amount: 0.5 }}
          >
            About Me
          </motion.h2>
          <div className="text-center mb-12">
            <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'} text-lg`}>Transforming ideas into innovative software solutions with passion and precision</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              className={`${isDarkMode ? 'bg-gray-800' : 'bg-gray-200'} p-8 rounded-3xl shadow-2xl col-span-1 md:col-span-2 lg:col-span-1 transition-colors duration-500`}
              initial="hidden"
              whileInView="visible"
              variants={variants}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true, amount: 0.5 }}
            >
              <h3 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-4`}>About Me</h3>
              <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'} leading-relaxed`}>
                A passionate and motivated IT undergraduate and aspiring Software Engineer with a strong foundation in core programming and problem-solving. Possessing a keen interest in Cloud Computing and DevOps methodologies, I am eager to apply my foundational development skills and commitment to continuous learning in a challenging Software Engineering Internship. Seeking to contribute to innovative projects and gain hands-on experience in building efficient, scalable systems.
              </p>
            </motion.div>
            <motion.div
              className="col-span-1 md:col-span-2 lg:col-span-1 grid grid-cols-1 lg:grid-cols-2 gap-8"
              initial="hidden"
              whileInView="visible"
              variants={variants}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true, amount: 0.5 }}
            >
              <EducationSection />
              <AchievementsSection />
            </motion.div>
          </div>
           <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 mt-8"
            initial="hidden"
            whileInView="visible"
            variants={variants}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true, amount: 0.5 }}
          >
            <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-gray-200'} p-8 rounded-3xl shadow-2xl transition-colors duration-500`}>
              <h3 className={`text-xl sm:text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-6 flex items-center gap-2`}>
                <BookOpen className="h-8 w-8 text-rose-500" /> Beyond Code
              </h3>
              <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'} leading-relaxed mb-4`}>
                When I'm not coding, you'll find me analyzing Formula 1 strategies, playing badminton, or diving into mystery novels that challenge my problem-solving mindset.
              </p>
              <div className="flex flex-wrap gap-2">
                {['Formula 1', 'Badminton', 'Cricket', 'Music', 'Mystery novels'].map((hobby) => (
                  <span key={hobby} className={`${isDarkMode ? 'bg-gray-700 text-gray-400' : 'bg-gray-300 text-gray-700'} text-sm py-1 px-3 rounded-full`}>
                    {hobby}
                  </span>
                ))}
              </div>
            </div>
            <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-gray-200'} p-8 rounded-3xl shadow-2xl transition-colors duration-500`}>
              <h3 className={`text-xl sm:text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-6 flex items-center gap-2`}>
                <Briefcase className="h-8 w-8 text-rose-500" /> Languages
              </h3>
              <ul className="space-y-4">
                <li>
                  <h4 className={`${isDarkMode ? 'text-gray-200' : 'text-gray-800'} text-lg font-semibold`}>Sinhala</h4>
                  <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Native</p>
                </li>
                <li>
                  <h4 className={`${isDarkMode ? 'text-gray-200' : 'text-gray-800'} text-lg font-semibold`}>English</h4>
                  <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Fluent</p>
                </li>
              </ul>
            </div>
          </motion.div>
        </section>

        <section id="projects" className="py-20 lg:py-32">
          <motion.h2
            className={`text-3xl sm:text-4xl font-bold text-center ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-12`}
            initial="hidden"
            whileInView="visible"
            variants={variants}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, amount: 0.5 }}
          >
            My Projects
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {projectsData.map((project, index) => (
              <motion.div
                key={index}
                className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-200 border-gray-300'} p-8 rounded-3xl shadow-2xl border flex flex-col transition-all duration-300 hover:scale-105`}
                initial="hidden"
                whileInView="visible"
                variants={variants}
                transition={{ duration: 0.8, delay: 0.1 * index }}
                viewport={{ once: true, amount: 0.3 }}
              >
                <h3 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-3`}>{project.title}</h3>
                <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'} leading-relaxed mb-4 flex-grow`}>{project.description}</p>
                <div className="mb-4">
                  <span className="text-sm font-semibold text-rose-500">Role:</span>
                  <span className={`ml-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>{project.role}</span>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-rose-500 mb-2">Technologies</h4>
                  <ul className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <li key={tech} className={`${isDarkMode ? 'bg-gray-700 text-gray-400' : 'bg-gray-300 text-gray-700'} text-sm py-1 px-3 rounded-full`}>
                        {tech}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        <section id="skills" className="py-20 lg:py-32">
          <motion.h2
            className={`text-3xl sm:text-4xl font-bold text-center ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-12`}
            initial="hidden"
            whileInView="visible"
            variants={variants}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, amount: 0.5 }}
          >
            Technical Skills
          </motion.h2>
          <div className="text-center mb-12">
            <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'} text-lg`}>Technologies and tools I work with to build innovative solutions</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Object.entries(skillsData).map(([category, skills], index) => (
              <motion.div
                key={category}
                className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-200 border-gray-300'} p-6 rounded-2xl shadow-lg border transition-all duration-300 hover:shadow-xl hover:scale-105`}
                initial="hidden"
                whileInView="visible"
                variants={variants}
                transition={{ duration: 0.8, delay: 0.1 * index }}
                viewport={{ once: true, amount: 0.3 }}
              >
                <h3 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-4 border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-300'} pb-2 flex items-center gap-2`}>
                  <Code className="h-6 w-6 text-rose-500" /> {category}
                </h3>
                <ul className="flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <motion.li
                      key={skill}
                      className={`${isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-300 text-gray-700'} text-sm py-1 px-3 rounded-full shadow-inner flex items-center gap-2`}
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.2 }}
                    >
                      {getSkillIcon(skill)}
                      <span>{skill}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}
            <motion.div
              className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-200'} p-6 rounded-2xl shadow-lg border transition-all duration-300 hover:shadow-xl hover:scale-105`}
              initial="hidden"
              whileInView="visible"
              variants={variants}
              transition={{ duration: 0.8, delay: 0.1 * (Object.keys(skillsData).length) }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <h3 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-4 border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-300'} pb-2 flex items-center gap-2`}>
                <BookOpen className="h-6 w-6 text-rose-500" /> Soft Skills
              </h3>
              <ul className="flex flex-wrap gap-2">
                {softSkills.map((skill) => (
                  <motion.li
                    key={skill}
                    className={`${isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-300 text-gray-700'} text-sm py-1 px-3 rounded-full shadow-inner`}
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.2 }}
                  >
                    {skill}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
        </section>

        <section id="contact" className="py-20 lg:py-32">
          <motion.h2
            className={`text-3xl sm:text-4xl font-bold text-center ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-12`}
            initial="hidden"
            whileInView="visible"
            variants={variants}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, amount: 0.5 }}
          >
            Get In Touch
          </motion.h2>
          <div className="text-center mb-12">
            <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'} text-lg`}>
              I'm always open to discussing new opportunities, interesting projects, or just having a chat about technology
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              className={`${isDarkMode ? 'bg-gray-800' : 'bg-gray-200'} p-8 rounded-3xl shadow-2xl transition-colors duration-500`}
              initial="hidden"
              whileInView="visible"
              variants={variants}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true, amount: 0.5 }}
            >
              <h3 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-4`}>Send me a message</h3>
              <form className="space-y-6">
                <input type="text" placeholder="Your full name" className={`w-full p-3 rounded-lg ${isDarkMode ? 'bg-gray-700 text-gray-200 placeholder-gray-400 border-gray-600' : 'bg-gray-300 text-gray-800 placeholder-gray-500 border-gray-400'} border focus:outline-none focus:ring-2 focus:ring-rose-500`} />
                <input type="email" placeholder="your.email@example.com" className={`w-full p-3 rounded-lg ${isDarkMode ? 'bg-gray-700 text-gray-200 placeholder-gray-400 border-gray-600' : 'bg-gray-300 text-gray-800 placeholder-gray-500 border-gray-400'} border focus:outline-none focus:ring-2 focus:ring-rose-500`} />
                <input type="text" placeholder="What's this about?" className={`w-full p-3 rounded-lg ${isDarkMode ? 'bg-gray-700 text-gray-200 placeholder-gray-400 border-gray-600' : 'bg-gray-300 text-gray-800 placeholder-gray-500 border-gray-400'} border focus:outline-none focus:ring-2 focus:ring-rose-500`} />
                <textarea rows="4" placeholder="Tell me about your project or opportunity..." className={`w-full p-3 rounded-lg ${isDarkMode ? 'bg-gray-700 text-gray-200 placeholder-gray-400 border-gray-600' : 'bg-gray-300 text-gray-800 placeholder-gray-500 border-gray-400'} border focus:outline-none focus:ring-2 focus:ring-rose-500`}></textarea>
                <motion.button
                  type="submit"
                  className="w-full bg-rose-500 hover:bg-rose-600 text-white font-bold py-3 rounded-full shadow-lg transform transition-all duration-300 hover:scale-105"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Send Message
                </motion.button>
              </form>
            </motion.div>
            <div className="space-y-8">
              <motion.div
                className={`${isDarkMode ? 'bg-gray-800' : 'bg-gray-200'} p-8 rounded-3xl shadow-2xl transition-colors duration-500`}
                initial="hidden"
                whileInView="visible"
                variants={variants}
                transition={{ duration: 0.8, delay: 0.3 }}
                viewport={{ once: true, amount: 0.5 }}
              >
                <h3 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-4`}>Contact Information</h3>
                <div className="flex flex-col space-y-4">
                  <div className="flex items-center gap-3">
                    <Mail className="h-6 w-6 text-rose-500" />
                    <a href="mailto:dhanuja.surasingha@gmail.com" className={`${isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-gray-900'} transition-colors duration-300`}>dhanuja.surasingha@gmail.com</a>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="h-6 w-6 text-rose-500" />
                    <a href="tel:+94763082404" className={`${isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-gray-900'} transition-colors duration-300`}>+94 76 3082404</a>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="h-6 w-6 text-rose-500" />
                    <span className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Moratuwa, Sri Lanka</span>
                  </div>
                </div>
              </motion.div>
              <motion.div
                className={`${isDarkMode ? 'bg-gray-800' : 'bg-gray-200'} p-8 rounded-3xl shadow-2xl transition-colors duration-500`}
                initial="hidden"
                whileInView="visible"
                variants={variants}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true, amount: 0.5 }}
              >
                <h3 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-4`}>Let's Connect</h3>
                <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'} leading-relaxed mb-6`}>
                  I'm currently seeking internship opportunities and exciting projects where I can contribute my skills in full-stack development, IoT, and cloud computing.
                </p>
                <div className="flex space-x-4">
                  <a href="https://www.linkedin.com/in/dhanuja-surasingha/" target="_blank" rel="noopener noreferrer" className={`${isDarkMode ? 'bg-gray-700 hover:bg-gray-600 text-gray-200' : 'bg-gray-300 hover:bg-gray-400 text-gray-800'} font-bold py-2 px-6 rounded-full shadow-lg transform transition-all duration-300 hover:scale-105 flex items-center gap-2`}>
                    <Linkedin className="h-5 w-5" /> LinkedIn
                  </a>
                  <a href="https://github.com/Dhanuja-Surasingha" target="_blank" rel="noopener noreferrer" className={`${isDarkMode ? 'bg-gray-700 hover:bg-gray-600 text-gray-200' : 'bg-gray-300 hover:bg-gray-400 text-gray-800'} font-bold py-2 px-6 rounded-full shadow-lg transform transition-all duration-300 hover:scale-105 flex items-center gap-2`}>
                    <Github className="h-5 w-5" /> GitHub
                  </a>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      <footer className={`${isDarkMode ? 'bg-gray-950' : 'bg-gray-100'} py-8 transition-colors duration-500`}>
        <div className={`container mx-auto text-center ${isDarkMode ? 'text-gray-500' : 'text-gray-600'} text-sm`}>
          &copy; {new Date().getFullYear()} Dhanuja Surasingha. All Rights Reserved.
        </div>
      </footer>
    </div>
  );
};

export default App;

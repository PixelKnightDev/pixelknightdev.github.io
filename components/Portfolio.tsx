'use client'
import React, { useState, useEffect, useRef } from 'react';
import { Github, Linkedin, Mail, Phone, ExternalLink, Code, Database, Globe, Server, Smartphone, Palette, Home, User, Briefcase, Settings, MessageCircle, Terminal, Box } from 'lucide-react';
import { motion, AnimatePresence, MotionValue, useMotionValue, useSpring, useTransform } from 'framer-motion';
import Image from 'next/image';

// Utility function (cn) - simple classname utility
const cn = (...classes: (string | undefined)[]) => {
  return classes.filter(Boolean).join(' ');
};

// Dot Background Component
const DotBackground = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative min-h-screen w-full">
      {/* Fixed dot background that doesn't scroll */}
      <div
        className="fixed inset-0 z-0 bg-black"
        style={{
          backgroundImage: 'radial-gradient(#404040 1px, transparent 1px)',
          backgroundSize: '20px 20px',
          backgroundAttachment: 'fixed'
        }}
      />
      {/* Fixed radial gradient overlay */}
      <div 
        className="fixed inset-0 z-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 20%, black)',
          backgroundAttachment: 'fixed'
        }}
      />
      {/* Content that scrolls over the fixed background */}
      <div className="relative z-10 w-full">
        {children}
      </div>
    </div>
  );
};

// Bento Grid Components
const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "mx-auto grid max-w-7xl grid-cols-1 gap-6 md:auto-rows-[28rem] md:grid-cols-3",
        className,
      )}
    >
      {children}
    </div>
  );
};

const BentoGridItem = ({
  className,
  title,
  description,
  header,
  icon,
  github,
  live,
  tech,
}: {
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  header?: React.ReactNode;
  icon?: React.ReactNode;
  github?: string;
  live?: string;
  tech?: string[];
}) => {
  return (
    <div
      className={cn(
        "group/bento shadow-input row-span-1 flex flex-col rounded-xl border border-purple-500/20 bg-black/50 backdrop-blur-sm p-0 transition duration-200 hover:shadow-xl hover:border-purple-500/50 overflow-hidden",
        className,
      )}
    >
      {/* Image Header - Takes more space */}
      <div className="flex-[3] relative">
        {header}
      </div>
      
      {/* Content Section - Takes less space */}
      <div className="flex-[2] p-4 flex flex-col justify-between">
        <div className="transition duration-200 group-hover/bento:translate-x-2">
          <div className="flex items-center gap-2 mb-2">
            {icon}
            <div className="font-sans font-bold text-white text-sm md:text-lg line-clamp-1">
              {title}
            </div>
          </div>
          <div className="font-sans text-xs md:text-sm text-gray-300 mb-3 line-clamp-4 leading-relaxed">
            {description}
          </div>
          {tech && (
            <div className="flex flex-wrap gap-1 mb-3 overflow-hidden max-h-12">
              {tech.slice(0, 4).map((item, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-purple-600/20 text-purple-300 rounded-full text-xs border border-purple-500/30 whitespace-nowrap"
                >
                  {item}
                </span>
              ))}
              {tech.length > 4 && (
                <span className="px-2 py-1 bg-gray-600/20 text-gray-400 rounded-full text-xs">
                  +{tech.length - 4}
                </span>
              )}
            </div>
          )}
        </div>
        
        {/* Buttons at bottom */}
        <div className="flex gap-2 mt-auto">
          {github && (
            <a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 px-3 py-1.5 bg-purple-600/20 text-purple-300 rounded-lg hover:bg-purple-600/30 transition-colors text-xs font-medium"
            >
              <Github className="w-3 h-3" />
              Code
            </a>
          )}
          {live && (
            <a
              href={live}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 px-3 py-1.5 border border-purple-400/50 text-purple-300 rounded-lg hover:bg-purple-400/20 transition-colors text-xs font-medium"
            >
              <ExternalLink className="w-3 h-3" />
              Live
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

// FloatingDock Component (Left Sidebar)
const FloatingDock = ({
  items,
  desktopClassName,
  mobileClassName,
}: {
  items: { title: string; icon: React.ReactNode; href?: string; onClick?: () => void }[];
  desktopClassName?: string;
  mobileClassName?: string;
}) => {
  return (
    <>
      <FloatingDockDesktop items={items} className={desktopClassName} />
      <FloatingDockMobile items={items} className={mobileClassName} />
    </>
  );
};

const FloatingDockMobile = ({
  items,
  className,
}: {
  items: { title: string; icon: React.ReactNode; href?: string; onClick?: () => void }[];
  className?: string;
}) => {
  const [open, setOpen] = useState(false);
  return (
    <div className={`fixed top-4 left-4 z-50 block md:hidden ${className}`}>
      <AnimatePresence>
        {open && (
          <motion.div
            layoutId="nav"
            className="absolute top-full mt-2 flex flex-col gap-2 bg-black/90 backdrop-blur-md rounded-2xl p-3 border border-purple-500/20"
          >
            {items.map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: -10 }}
                animate={{
                  opacity: 1,
                  x: 0,
                }}
                exit={{
                  opacity: 0,
                  x: -10,
                  transition: {
                    delay: idx * 0.05,
                  },
                }}
                transition={{ delay: (items.length - 1 - idx) * 0.05 }}
              >
                <button
                  onClick={() => {
                    if (item.onClick) item.onClick();
                    setOpen(false);
                  }}
                  className="flex items-center gap-3 px-3 py-2 rounded-lg bg-gray-900/50 hover:bg-purple-600/20 transition-colors group min-w-[120px]"
                >
                  <div className="h-4 w-4 text-purple-400 group-hover:text-purple-300">{item.icon}</div>
                  <span className="text-sm text-gray-300 group-hover:text-white">{item.title}</span>
                </button>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
      <button
        onClick={() => setOpen(!open)}
        className="flex h-12 w-12 items-center justify-center rounded-xl bg-black/80 backdrop-blur-md border border-purple-500/20 hover:border-purple-500/40 transition-colors"
      >
        <Settings className="h-5 w-5 text-purple-400" />
      </button>
    </div>
  );
};

const FloatingDockDesktop = ({
  items,
  className,
}: {
  items: { title: string; icon: React.ReactNode; href?: string; onClick?: () => void }[];
  className?: string;
}) => {
  return (
    <motion.div
      className={`fixed left-6 top-1/2 transform -translate-y-1/2 z-50 hidden md:flex flex-col gap-3 bg-black/80 backdrop-blur-md rounded-2xl p-4 border border-purple-500/20 hover:border-purple-500/30 transition-colors ${className}`}
    >
      {items.map((item) => (
        <SidebarIconContainer key={item.title} {...item} />
      ))}
    </motion.div>
  );
};

function SidebarIconContainer({
  title,
  icon,
  href,
  onClick,
}: {
  title: string;
  icon: React.ReactNode;
  href?: string;
  onClick?: () => void;
}) {
  const [hovered, setHovered] = useState(false);

  const handleClick = () => {
    if (onClick) onClick();
  };

  return (
    <div className="relative">
      <button
        onClick={handleClick}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="group flex h-12 w-12 items-center justify-center rounded-xl bg-gray-900/50 hover:bg-purple-600/20 border border-purple-500/10 hover:border-purple-500/30 transition-all duration-300 hover:scale-110"
      >
        <div className="h-5 w-5 text-purple-400 group-hover:text-purple-300 transition-colors">
          {icon}
        </div>
      </button>
      
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, x: -10, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -10, scale: 0.8 }}
            className="absolute left-full ml-3 top-1/2 transform -translate-y-1/2 px-3 py-2 bg-black/90 backdrop-blur-md rounded-lg border border-purple-500/30 whitespace-nowrap z-60"
          >
            <span className="text-sm text-white font-medium">{title}</span>
            <div className="absolute right-full top-1/2 transform -translate-y-1/2 w-0 h-0 border-t-4 border-b-4 border-r-4 border-transparent border-r-purple-500/30"></div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const Portfolio = () => {
  const [activeSection, setActiveSection] = useState('home');

  // Navigation items for FloatingDock
  const navigationItems = [
    {
      title: "Home",
      icon: <Home className="h-full w-full" />,
      onClick: () => scrollToSection('home')
    },
    {
      title: "About",
      icon: <User className="h-full w-full" />,
      onClick: () => scrollToSection('about')
    },
    {
      title: "Projects",
      icon: <Briefcase className="h-full w-full" />,
      onClick: () => scrollToSection('projects')
    },
    {
      title: "Skills",
      icon: <Code className="h-full w-full" />,
      onClick: () => scrollToSection('skills')
    },
    {
      title: "Contact",
      icon: <MessageCircle className="h-full w-full" />,
      onClick: () => scrollToSection('contact')
    },
    {
      title: "GitHub",
      icon: <Github className="h-full w-full" />,
      onClick: () => window.open('https://github.com/PixelKnightDev', '_blank')
    },
    {
      title: "LinkedIn",
      icon: <Linkedin className="h-full w-full" />,
      onClick: () => window.open('https://linkedin.com/in/pratyush-yadav-186291306/', '_blank')
    }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'projects', 'skills', 'contact'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Project Skeleton Component
  const ProjectSkeleton = () => (
    <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-purple-900/20 to-blue-900/20 border border-purple-500/20"></div>
  );

  // Projects data for Bento Grid
  const projects = [
    {
      title: "ChatMind",
      description: "A modern, full-featured AI chat application built with Next.js 15, TypeScript, and Clerk authentication. Leveraging Groq's powerful Llama 3 model via Vercel AI SDK, it delivers real-time streaming responses with advanced features like file uploads, conversation management, and webhook integration for seamless external service connectivity.",
      header: (
        <div className="relative w-full h-full rounded-t-xl overflow-hidden">
          <img
            src="/images/chatmind.png"
            alt="ChatMind Project"
            className="object-cover hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        </div>
      ),
      icon: <Code className="h-4 w-4 text-purple-400" />,
      github: "https://github.com/PixelKnightDev/chatmind",
      tech: ["Next.js 15", "TypeScript", "Clerk", "Zustand", "Vercel AI SDK"],
      className: "md:col-span-2"
    },
    {
      title: "Weatherly",
      description: "A dynamic weather application with real-time meteorological data, geolocation integration, and mobile-first responsive design.",
      header: (
        <div className="relative w-full h-full rounded-t-xl overflow-hidden">
          <img
            src="/images/weatherly.png"
            alt="Weatherly Project"
            className="object-cover hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        </div>
      ),
      icon: <Globe className="h-4 w-4 text-purple-400" />,
      github: "https://github.com/PixelKnightDev/weather-app",
      live: "https://weather-app-nu-three-84.vercel.app/",
      tech: ["Next.js", "Open-Meteo API", "CSS", "Vercel"]
    },
    {
      title: "Backend BoilerPlate",
      description: "A production-ready Node.js and Express boilerplate with authentication, validation, error handling, and best practices for building RESTful APIs.",
      header: (
        <div className="relative w-full h-full rounded-t-xl overflow-hidden bg-gradient-to-br from-green-600/30 to-emerald-600/30 flex items-center justify-center">
          <div className="text-center">
            <Server className="w-16 h-16 text-green-400 mx-auto mb-4" />
            <p className="text-green-300 text-lg font-medium">API Backend</p>
            <p className="text-green-400 text-sm mt-2">Node.js + Express</p>
          </div>
        </div>
      ),
      icon: <Server className="h-4 w-4 text-purple-400" />,
      github: "https://github.com/PixelKnightDev/Backend-BoilerPlate-Express-and-Node",
      tech: ["Node.js", "Express", "MongoDB", "JWT", "Validation"]
    },
    {
      title: "GoCowsay",
      description: "A Go implementation of the classic cowsay command-line tool. A fun project demonstrating Go programming with ASCII art and command-line utilities.",
      header: (
        <div className="relative w-full h-full rounded-t-xl overflow-hidden">
          <img
            src="/images/gocowsay.png"
            alt="GoCowsay Project"
            className="object-cover object-left hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        </div>
      ),
      icon: <Terminal className="h-4 w-4 text-purple-400" />,
      github: "https://github.com/PixelKnightDev/gocowsay",
      tech: ["Go", "CLI", "ASCII Art"]
    }
  ];

  // Define proper types for skills
  type SkillCategory = 'Languages' | 'Frameworks' | 'Databases' | 'Tools';

  const skills: Record<SkillCategory, string[]> = {
    "Languages": ["C/C++", "JavaScript", "HTML", "CSS", "Python", "Go"],
    "Frameworks": ["Next.js", "React", "Express.js", "Node.js", "TailwindCSS"],
    "Databases": ["MongoDB", "PostgreSQL"],
    "Tools": ["VS Code", "Git", "Docker", "Postman", "Firebase", "Vercel", "Figma"]
  };

  const skillIcons: Record<SkillCategory, React.ReactElement> = {
    "Languages": <Code className="w-6 h-6" />,
    "Frameworks": <Server className="w-6 h-6" />,
    "Databases": <Database className="w-6 h-6" />,
    "Tools": <Palette className="w-6 h-6" />
  };

  return (
    <DotBackground>
      <div className="min-h-screen text-white overflow-x-hidden">
        {/* Left Sidebar Navigation */}
        <FloatingDock items={navigationItems} />

        {/* Hero Section */}
        <section id="home" className="relative flex min-h-screen items-center justify-center">
          <div className="text-center max-w-4xl mx-auto px-4 py-20">
            <div className="mb-8">
              <div className="mb-6">
                <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-4">
                  PY
                </div>
              </div>
              <h1 className="text-5xl md:text-7xl font-bold mb-6">
                <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  Pratyush Yadav
                </span>
              </h1>
              <p className="text-xl md:text-3xl text-white mb-8">
                Full-Stack Developer & CS Student at IIIT Jabalpur
              </p>
              <p className="text-2xl text-white max-w-2xl mx-auto mb-12">
                A developer passionate about building innovative web applications with modern technologies. 
                Experienced in Next.js, React, AI integration, and backend development.
                Currently exploring the world of machine learning.
              </p>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="relative py-20 px-4 ml-0 md:ml-20">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              About Me
            </h2>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <p className="text-lg text-gray-300 leading-relaxed">
                  I'm a Computer Science student at the Indian Institute of Information Technology, Jabalpur, 
                  with a passion for creating impactful web applications and exploring the intersection of 
                  AI and web development.
                </p>
                <p className="text-lg text-gray-300 leading-relaxed">
                  My journey in tech has led me to develop full-stack applications using modern frameworks 
                  like Next.js and React, while integrating cutting-edge AI technologies to create 
                  intelligent user experiences.
                </p>
                <p className="text-lg text-gray-300 leading-relaxed">
                  When I'm not coding, you'll find me contributing to hackathons, exploring new technologies 
                  like Go programming, or working on innovative projects that solve real-world problems.
                </p>
                {/* Resume Button */}
                <div className="pt-4">
                <a
                    href="/resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 font-medium text-white"
                >
                    <ExternalLink className="w-4 h-4" />
                    View Resume
                </a>
                </div>
              </div>
              <div className="bg-gradient-to-br from-purple-900/30 to-blue-900/30 p-8 rounded-2xl border border-purple-500/20">
                <h3 className="text-2xl font-bold mb-6 text-purple-400">Education</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="text-xl font-semibold text-white">Bachelor of Technology</h4>
                    <p className="text-purple-300">Computer Science Major</p>
                    <p className="text-gray-400">Indian Institute of Information Technology, Jabalpur</p>
                    <p className="text-sm text-gray-500">Aug 2024 - Present</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Projects Section with Bento Grid */}
        <section id="projects" className="relative py-20 px-4 ml-0 md:ml-20">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Featured Projects
            </h2>
            <BentoGrid className="max-w-6xl mx-auto">
              {projects.map((item, i) => (
                <BentoGridItem
                  key={i}
                  title={item.title}
                  description={item.description}
                  header={item.header}
                  icon={item.icon}
                  github={item.github}
                  live={item.live}
                  tech={item.tech}
                  className={item.className}
                />
              ))}
            </BentoGrid>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="relative py-20 px-4 ml-0 md:ml-20">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Technical Skills
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {(Object.entries(skills) as [SkillCategory, string[]][]).map(([category, skillList]) => (
                <div
                  key={category}
                  className="bg-gradient-to-br from-gray-900/50 to-black/50 p-6 rounded-2xl border border-gray-700 hover:border-purple-500/50 transition-all duration-300"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-purple-600/20 rounded-lg">
                      {skillIcons[category]}
                    </div>
                    <h3 className="text-xl font-bold text-white">{category}</h3>
                  </div>
                  <div className="space-y-2">
                    {skillList.map((skill, index) => (
                      <div
                        key={index}
                        className="px-3 py-2 bg-purple-600/10 text-purple-300 rounded-lg text-sm border border-purple-500/20"
                      >
                        {skill}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="relative py-20 px-4 ml-0 md:ml-20">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-8 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Let's Connect
            </h2>
            <p className="text-xl text-gray-300 mb-12">
              I'm always interested in new opportunities and collaborations. 
              Feel free to reach out if you'd like to work together!
            </p>
            
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <a
                href="mailto:pratyushyadav0106@gmail.com"
                className="flex items-center justify-center gap-3 p-6 bg-gradient-to-br from-purple-900/30 to-blue-900/30 rounded-2xl border border-purple-500/20 hover:border-purple-500/50 transition-all duration-300 transform hover:scale-105"
              >
                <Mail className="w-6 h-6 text-purple-400" />
                <div className="text-left">
                  <p className="text-sm text-gray-400">Email</p>
                  <p className="text-white">pratyushyadav0106@gmail.com</p>
                </div>
              </a>
              <a
                href="tel:+918765025989"
                className="flex items-center justify-center gap-3 p-6 bg-gradient-to-br from-purple-900/30 to-blue-900/30 rounded-2xl border border-purple-500/20 hover:border-purple-500/50 transition-all duration-300 transform hover:scale-105"
              >
                <Phone className="w-6 h-6 text-purple-400" />
                <div className="text-left">
                  <p className="text-sm text-gray-400">Phone</p>
                  <p className="text-white">+91-8765025989</p>
                </div>
              </a>
            </div>

            <div className="flex justify-center gap-6">
              <a
                href="https://github.com/PixelKnightDev"
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full hover:from-purple-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-110"
              >
                <Github className="w-6 h-6" />
              </a>
              <a
                href="https://linkedin.com/in/pratyush-yadav-186291306/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full hover:from-purple-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-110"
              >
                <Linkedin className="w-6 h-6" />
              </a>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="relative py-8 px-4 border-t border-gray-800 ml-0 md:ml-20">
          <div className="max-w-6xl mx-auto text-center">
            <p className="text-gray-400">
              © 2025 Pratyush Yadav. Built with Next.js and passion for great design.
            </p>
          </div>
        </footer>

        <style jsx>{`
          html {
            scroll-behavior: smooth;
          }
        `}</style>
      </div>
    </DotBackground>
  );
};

export default Portfolio;
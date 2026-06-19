'use client'
import React, { useState, useEffect } from 'react';
import { Github, Linkedin, Mail, Phone, ExternalLink, Code, Database, Globe, Server, Palette, Home, User, Briefcase, Settings, MessageCircle, Terminal, ShieldCheck, Award, Trophy, Users } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { AsciiArt } from '@/components/ui/ascii-art';

const cn = (...classes: (string | undefined)[]) => {
  return classes.filter(Boolean).join(' ');
};

const DotBackground = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative min-h-screen w-full">
      <div
        className="fixed inset-0 z-0 bg-black"
        style={{
          backgroundImage: 'radial-gradient(#404040 1px, transparent 1px)',
          backgroundSize: '20px 20px',
          backgroundAttachment: 'fixed'
        }}
      />
      <div 
        className="fixed inset-0 z-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 20%, black)',
          backgroundAttachment: 'fixed'
        }}
      />
      <div className="relative z-10 w-full">
        {children}
      </div>
    </div>
  );
};

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
        "mx-auto grid max-w-7xl grid-cols-1 gap-6 md:auto-rows-[25rem] md:grid-cols-2",
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
        "group/bento shadow-input row-span-1 flex flex-col rounded-xl border border-indigo-500/30 bg-black/50 backdrop-blur-sm p-0 transition duration-200 hover:shadow-xl hover:border-indigo-500/50 overflow-hidden",
        className,
      )}
    >
      <div className="flex-[2] relative">
        {header}
      </div>
      
      <div className="flex-[3] p-4 flex flex-col justify-between">
        <div className="transition duration-200 group-hover/bento:translate-x-2">
          <div className="flex items-center gap-2 mb-2">
            {icon}
            <div className="font-sans font-bold text-white text-sm md:text-lg line-clamp-1">
              {title}
            </div>
          </div>
          <div className="font-sans text-xs md:text-sm text-gray-200 mb-3 line-clamp-4 leading-relaxed">
            {description}
          </div>
          {tech && (
            <div className="flex flex-wrap gap-1 mb-3 overflow-hidden max-h-12">
              {tech.slice(0, 4).map((item, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-indigo-500/20 text-gray-200 rounded-full text-xs border border-indigo-500/30 whitespace-nowrap"
                >
                  {item}
                </span>
              ))}
              {tech.length > 4 && (
                <span className="px-2 py-1 bg-indigo-500/20 text-indigo-400 rounded-full text-xs">
                  +{tech.length - 4}
                </span>
              )}
            </div>
          )}
        </div>
        
        <div className="flex gap-2 mt-auto">
          {github && (
            <a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
               className="flex items-center gap-1 px-3 py-1.5 bg-indigo-500/20 text-gray-200 rounded-lg hover:bg-indigo-500/30 transition-colors text-xs font-medium"
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
              className="flex items-center gap-1 px-3 py-1.5 border border-indigo-500/50 text-gray-200 rounded-lg hover:bg-indigo-500/20 transition-colors text-xs font-medium"
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
            className="absolute top-full mt-2 flex flex-col gap-2 bg-black/90 backdrop-blur-md rounded-2xl p-3 border border-indigo-500/30"
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
                  className="flex items-center gap-3 px-3 py-2 rounded-lg bg-gray-900/50 hover:bg-indigo-500/20 transition-colors group min-w-[120px]"
                >
                  <div className="h-4 w-4 text-indigo-400 group-hover:text-gray-200">{item.icon}</div>
                  <span className="text-sm text-gray-200 group-hover:text-white">{item.title}</span>
                </button>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
      <button
        onClick={() => setOpen(!open)}
        className="flex h-12 w-12 items-center justify-center rounded-xl bg-black/80 backdrop-blur-md border border-indigo-500/30 hover:border-indigo-500/40 transition-colors"
      >
        <Settings className="h-5 w-5 text-indigo-400" />
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
      className={`fixed left-6 top-1/2 transform -translate-y-1/2 z-50 hidden md:flex flex-col gap-3 bg-black/80 backdrop-blur-md rounded-2xl p-4 border border-indigo-500/30 hover:border-indigo-500/30 transition-colors ${className}`}
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
  onClick,
}: {
  title: string;
  icon: React.ReactNode;
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
        className="group flex h-12 w-12 items-center justify-center rounded-xl bg-gray-900/50 hover:bg-indigo-500/20 border border-indigo-500/20 hover:border-indigo-500/30 transition-all duration-300 hover:scale-110"
      >
        <div className="h-5 w-5 text-indigo-400 group-hover:text-gray-200 transition-colors">
          {icon}
        </div>
      </button>
      
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, x: -10, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -10, scale: 0.8 }}
            className="absolute left-full ml-3 top-1/2 transform -translate-y-1/2 px-3 py-2 bg-black/90 backdrop-blur-md rounded-lg border border-indigo-500/30 whitespace-nowrap z-60"
          >
            <span className="text-sm text-white font-medium">{title}</span>
            <div className="absolute right-full top-1/2 transform -translate-y-1/2 w-0 h-0 border-t-4 border-b-4 border-r-4 border-transparent border-r-green-500/30"></div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const Portfolio = () => {
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
      title: "Recognition",
      icon: <Award className="h-full w-full" />,
      onClick: () => scrollToSection('recognition')
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
      const sections = ['home', 'about', 'projects', 'recognition', 'skills', 'contact'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) {
      }
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

  const projects = [
    {
      title: "Aegis-AST",
      description: "A zero-trust supply chain security scanner for npm that parses the full AST of every source file to catch phantom dependencies, packages declared but never imported. Six heuristic scanners run in under a second behind a quarantine-first install, with Groq AI as a second-pass validator that filters false positives.",
      header: (
        <div className="relative w-full h-full rounded-t-xl overflow-hidden">
          <img
            src="/images/aegis-ast.png"
            alt="Aegis-AST Project"
            className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        </div>
      ),
      icon: <ShieldCheck className="h-4 w-4 text-indigo-400" />,
      github: "https://github.com/PixelKnightDev/Aegis",
      live: "https://www.npmjs.com/package/aegis-ast",
      tech: ["TypeScript", "Babel AST", "Groq AI", "MongoDB Atlas", "Commander.js"],
      className: "md:col-span-2"
    },
    {
      title: "Glimpse",
      description: "A lightning-fast interactive code search tool with real-time TUI, instant editor integration, and smart file filtering for seamless code exploration.",
      header: (
        <div className="relative w-full h-full rounded-t-xl overflow-hidden">
          <img
            src="/images/glimpse.png"
            alt="Glimpse Interactive Code Search"
            className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        </div>
      ),
      icon: <Server className="h-4 w-4 text-indigo-400" />,
      github: "https://github.com/PixelKnightDev/Glimpse",
      live: "https://github.com/PixelKnightDev/Glimpse/releases/tag/v1.0.0",
      tech: ["Go", "Bubbletea", "Lipgloss", "TUI", "CLI", "Real-time Search"]
    },

    {
      title: "Weatherly",
      description: "A dynamic weather application with real-time meteorological data, geolocation integration, and mobile-first responsive design.",
      header: (
        <div className="relative w-full h-full rounded-t-xl overflow-hidden">
          <img
            src="/images/weatherly.png"
            alt="Weatherly Project"
            className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        </div>
      ),
      icon: <Globe className="h-4 w-4 text-indigo-400" />,
      github: "https://github.com/PixelKnightDev/weather-app",
      live: "https://weather-app-nu-three-84.vercel.app/",
      tech: ["Next.js", "Open-Meteo API", "Vercel"]
    },
    {
      title: "ChatMind",
      description: "Full-stack AI chat application built with Next.js 15, TypeScript, and Clerk authentication featuring real-time AI streaming with Grok, message editing, and multi-format file uploads powered by Vercel AI SDK.",
      header: (
        <div className="relative w-full h-full rounded-t-xl overflow-hidden">
          <img
            src="/images/chatmind.png"
            alt="ChatMind Project"
            className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        </div>
      ),
      icon: <Code className="h-4 w-4 text-indigo-400" />,
      github: "https://github.com/PixelKnightDev/chatmind",
      tech: ["Next.js 15", "TypeScript", "Clerk", "Zustand", "Vercel AI SDK"],
      className: "md:col-span-2"
    },
    {
      title: "Clustify",
      description: "A Gmail cleanup automation tool that securely deletes emails using rule-based keyword matching, batch operations, and OAuth2 authentication with full safety previews.",
      header: (
        <div className="relative w-full h-full rounded-t-xl overflow-hidden">
          <img
            src="/images/clustify.png"
            alt="Clustify Project"
            className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        </div>
      ),
      icon: <Mail className="h-4 w-4 text-indigo-400" />,
      github: "https://github.com/PixelKnightDev/Clustify",
      live: "https://addons.mozilla.org/en-US/firefox/addon/clustify/?utm_source=addons.mozilla.org&utm_medium=referral&utm_content=search",
      tech: ["JavaScript", "Gmail API", "OAuth2"]
    },
    {
      title: "GoCowsay",
      description: "A Go implementation of the classic cowsay command-line tool. A fun project demonstrating Go programming with ASCII art and command-line utilities.",
      header: (
        <div className="relative w-full h-full rounded-t-xl overflow-hidden">
          <img
            src="/images/gocowsay.png"
            alt="GoCowsay Project"
            className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        </div>
      ),
      icon: <Terminal className="h-4 w-4 text-indigo-400" />,
      github: "https://github.com/PixelKnightDev/gocowsay",
      tech: ["Go", "CLI", "ASCII Art"]
    },
        {
        title: "QuantForge Backtesting Platform",
        description: "A full-stack trading strategy backtesting and deployment platform with real-time monitoring, visual strategy builder, performance analytics, and WebSocket-based updates.",
        header: (
        <div className="relative w-full h-full rounded-t-xl overflow-hidden">
          <img
            src="/images/quantforge.jpeg"
            alt="QuantForge Project"
            className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        </div>
      ),
      icon: <Code className="h-4 w-4 text-indigo-400" />,
      github: "https://github.com/PixelKnightDev/quantforge",
      tech: ["FastAPI", "React", "TypeScript", "WebSockets", "PostgreSQL", "Strategy Backtesting"],
      className: "md:col-span-2"
    },
    {
    title: "Neovim Setup",
    description: "A highly customized Neovim configuration built on LazyVim framework",
    header: (
        <div className="relative w-full h-full rounded-t-xl overflow-hidden">
        <img
            src="/images/neovim.png"
            alt="Neovim Setup Project"
            className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        </div>
    ),
    icon: <Terminal className="h-4 w-4 text-indigo-400" />,
    github: "https://github.com/PixelKnightDev/nvim-setup",
    tech: ["Lua", "LazyVim", "Alacritty", "LSP", "Neovim"]
    },

  ];

  const recognition = [
    {
      title: "3rd Place, HackByte 4.0",
      detail: "MLH Top-50 global hackathon. Competed among 400+ offline participants and 5100+ registrations nationwide.",
      date: "Apr 2026",
      icon: <Trophy className="w-6 h-6 text-indigo-400" />
    },
    {
      title: "Winner, CanYouHackIt",
      detail: "First place in the Automation & Productivity track at the 24-hour intra-college hackathon for building Clustify.",
      date: "Sep 2025",
      icon: <Award className="w-6 h-6 text-indigo-400" />
    },
    {
      title: "Dev Wing Member, BitByte Programming Club",
      detail: "Core team member, technical contributor, and event organizer.",
      date: "2024 to Present",
      icon: <Users className="w-6 h-6 text-indigo-400" />
    },
    {
      title: "Competitive Programming",
      detail: "Codeforces rating 1191 and 150+ problems solved on LeetCode.",
      date: "Ongoing",
      icon: <Code className="w-6 h-6 text-indigo-400" />
    }
  ];

  type SkillCategory = 'Languages' | 'Frameworks' | 'Databases' | 'Tools';

  const skills: Record<SkillCategory, string[]> = {
    "Languages": ["C/C++", "JavaScript", "HTML", "CSS", "Go"],
    "Frameworks": ["Next.js", "React", "Express.js", "Node.js"],
    "Databases": ["MongoDB", "PostgreSql"],
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
        <FloatingDock items={navigationItems} />

        <section id="home" className="relative flex min-h-screen items-center justify-center ml-0 md:ml-20">
          <div className="max-w-6xl mx-auto px-4 py-20 w-full">
            <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
              <div className="flex justify-center md:justify-end">
                <div className="relative w-full max-w-sm aspect-square rounded-2xl border border-indigo-500/30 bg-black/40 backdrop-blur-sm overflow-hidden">
                  <AsciiArt
                    src="/images/logo.jpg"
                    resolution={300}
                    color="#818cf8"
                    inverted
                    animationStyle="fade"
                    animationDuration={1.5}
                    animateOnView={false}
                    className="w-full h-full"
                  />
                </div>
              </div>
              <div className="text-center md:text-left">
                <h1 className="text-5xl md:text-7xl font-bold mb-6">
                  <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-violet-500 bg-clip-text text-transparent">
                    Pratyush Yadav
                  </span>
                </h1>
                <p className="text-xl md:text-2xl text-gray-200 mb-8">
                  Full-Stack Developer & CS Student at IIIT Jabalpur
                </p>
                <p className="text-lg text-indigo-400 max-w-2xl mx-auto md:mx-0 mb-12">
                  Passionate about building innovative web applications with modern technologies. 
                  Experienced in Next.js, React, AI integration, and backend development.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="relative py-20 px-4 ml-0 md:ml-20">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-indigo-500 to-violet-500 bg-clip-text text-transparent">
              About Me
            </h2>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <p className="text-lg text-gray-200 leading-relaxed">
                  I&apos;m a Computer Science student at the Indian Institute of Information Technology, Jabalpur, 
                  drawn to the systems layer of software, the parts where performance, reliability, and scale 
                  actually get decided.
                </p>
                <p className="text-lg text-gray-200 leading-relaxed">
                  My aim is to work in infrastructure engineering, building the kind of tools and platforms that 
                  other developers lean on without having to think about them. I&apos;m especially drawn to 
                  distributed systems, systems programming in Go, and open-source security tooling.
                </p>
                <p className="text-lg text-gray-200 leading-relaxed">
                  Away from the editor, you&apos;ll find me on the basketball court, behind a camera, or lost in a 
                  story-driven or pixel game. I gravitate toward projects that have a bit of craft to them.
                </p>
              </div>
              <div className="bg-gradient-to-br from-indigo-900/20 to-violet-900/20 p-8 rounded-2xl border border-indigo-500/30">
                <h3 className="text-2xl font-bold mb-6 text-indigo-400">Education</h3>
                <div className="space-y-4 mb-6">
                  <div>
                    <h4 className="text-xl font-semibold text-white">Bachelor of Technology</h4>
                    <p className="text-gray-200">Computer Science Major</p>
                    <p className="text-indigo-400">Indian Institute of Information Technology, Jabalpur</p>
                    <p className="text-sm text-gray-500">Aug 2024 - Present</p>
                  </div>
                </div>
                <a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-violet-600 text-white rounded-lg hover:from-indigo-700 hover:to-violet-700 transition-all duration-300 transform hover:scale-105 font-medium"
                >
                  <ExternalLink className="w-4 h-4" />
                  View Resume
                </a>
              </div>
            </div>
          </div>
        </section>

        <section id="projects" className="relative py-20 px-4 ml-0 md:ml-20">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-indigo-500 to-violet-500 bg-clip-text text-transparent">
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

        <section id="recognition" className="relative py-20 px-4 ml-0 md:ml-20">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-indigo-500 to-violet-500 bg-clip-text text-transparent">
              Recognition
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {recognition.map((item, i) => (
                <div
                  key={i}
                  className="flex items-start gap-4 bg-gradient-to-br from-gray-900/50 to-black/50 p-6 rounded-2xl border border-gray-700 hover:border-indigo-500/50 transition-all duration-300"
                >
                  <div className="p-2 bg-indigo-500/20 rounded-lg shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1 mb-1">
                      <h3 className="text-lg font-bold text-white">{item.title}</h3>
                      <span className="text-xs text-indigo-400 whitespace-nowrap">{item.date}</span>
                    </div>
                    <p className="text-sm text-gray-300 leading-relaxed">{item.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="skills" className="relative py-20 px-4 ml-0 md:ml-20">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-indigo-500 to-violet-500 bg-clip-text text-transparent">
              Technical Skills
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {(Object.entries(skills) as [SkillCategory, string[]][]).map(([category, skillList]) => (
                <div
                  key={category}
                  className="bg-gradient-to-br from-gray-900/50 to-black/50 p-6 rounded-2xl border border-gray-700 hover:border-indigo-500/50 transition-all duration-300"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-indigo-500/20 rounded-lg">
                      {skillIcons[category]}
                    </div>
                    <h3 className="text-xl font-bold text-white">{category}</h3>
                  </div>
                  <div className="space-y-2">
                    {skillList.map((skill, index) => (
                      <div
                        key={index}
                        className="px-3 py-2 bg-indigo-500/15 text-gray-200 rounded-lg text-sm border border-indigo-500/30"
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

        <section id="contact" className="relative py-20 px-4 ml-0 md:ml-20">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-8 bg-gradient-to-r from-indigo-500 to-violet-500 bg-clip-text text-transparent">
              Lets Connect
            </h2>
            <p className="text-xl text-gray-200 mb-12">
              I&apos;m always interested in new opportunities and collaborations. 
              Feel free to reach out if you&apos;d like to work together!
            </p>
            
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <a
                href="mailto:pratyushyadav0106@gmail.com"
                className="flex items-center justify-center gap-3 p-6 bg-gradient-to-br from-indigo-900/20 to-violet-900/20 rounded-2xl border border-indigo-500/30 hover:border-indigo-500/50 transition-all duration-300 transform hover:scale-105"
              >
                <Mail className="w-6 h-6 text-indigo-400" />
                <div className="text-left">
                  <p className="text-sm text-indigo-400">Email</p>
                  <p className="text-white">pratyushyadav0106@gmail.com</p>
                </div>
              </a>
              <a
                href="tel:+918765024989"
                className="flex items-center justify-center gap-3 p-6 bg-gradient-to-br from-indigo-900/20 to-violet-900/20 rounded-2xl border border-indigo-500/30 hover:border-indigo-500/50 transition-all duration-300 transform hover:scale-105"
              >
                <Phone className="w-6 h-6 text-indigo-400" />
                <div className="text-left">
                  <p className="text-sm text-indigo-400">Phone</p>
                  <p className="text-white">+91-8765024989</p>
                </div>
              </a>
            </div>

            <div className="flex justify-center gap-6">
              <a
                href="https://github.com/PixelKnightDev"
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 bg-gradient-to-r from-indigo-600 to-violet-600 rounded-full hover:from-indigo-700 hover:to-violet-700 transition-all duration-300 transform hover:scale-110"
              >
                <Github className="w-6 h-6" />
              </a>
              <a
                href="https://linkedin.com/in/pratyush-yadav-186291306/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 bg-gradient-to-r from-indigo-600 to-violet-600 rounded-full hover:from-indigo-700 hover:to-violet-700 transition-all duration-300 transform hover:scale-110"
              >
                <Linkedin className="w-6 h-6" />
              </a>
            </div>
          </div>
        </section>

        <footer className="relative py-8 px-4 border-t border-gray-800 ml-0 md:ml-20">
          <div className="max-w-6xl mx-auto text-center">
            <p className="text-indigo-400">
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
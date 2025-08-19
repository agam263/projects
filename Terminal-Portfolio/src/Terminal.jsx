import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const BADGES = [
  {
    label: 'LFX',
    color: 'bg-blue-600',
    url: 'https://lfx.linuxfoundation.org/',
  },
  {
    label: 'C4GT',
    color: 'bg-green-600',
    url: 'https://c4gt.dev/',
  },
];

const PROJECTS = [
  {
    name: 'VoteFlow',
    desc: 'A secure and transparent online voting platform leveraging blockchain technology for tamper-proof elections.',
    url: '#',
    img: 'https://placehold.co/300x180/222/fff?text=VoteFlow',
  },
  {
    name: 'CodeMates',
    desc: 'A collaborative coding platform that connects developers for pair programming and project building.',
    url: '#',
    img: 'https://placehold.co/300x180/222/fff?text=CodeMates',
  },
  {
    name: 'Portfolio Website',
    desc: 'My personal portfolio website showcasing my skills, achievements, and projects.',
    url: '#',
    img: 'https://placehold.co/300x180/222/fff?text=Portfolio',
  },
];

function TypingOutput({ text }) {
  const [displayed, setDisplayed] = useState('');
  useEffect(() => {
    setDisplayed('');
    let i = 0;
    const interval = setInterval(() => {
      setDisplayed((d) => d + text[i]);
      i++;
      if (i >= text.length) clearInterval(interval);
    }, 12);
    return () => clearInterval(interval);
  }, [text]);
  return <span>{displayed}</span>;
}

const COMMANDS = {
  help: {
    description: 'List available commands',
    action: () => (
      <>
        <TypingOutput text={"Available commands:"} />
        <div className="ml-4"><TypingOutput text={"about, achievements, projects, contact, clear, help"} /></div>
      </>
    ),
  },
  about: {
    description: 'About Athar Ramzan',
    action: () => (
      <div>
        <TypingOutput text={"I'm Athar Ramzan, a Computer Science student passionate about building impactful software and contributing to open source. I love learning new technologies and collaborating with global communities."} />
        <div className="flex space-x-3 mt-4">
          {BADGES.map(badge => (
            <a key={badge.label} href={badge.url} target="_blank" rel="noopener noreferrer">
              <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold text-white shadow-md ${badge.color} hover:scale-105 transition-transform`}>{badge.label}</span>
            </a>
          ))}
        </div>
      </div>
    ),
  },
  achievements: {
    description: 'Show achievements',
    action: () => (
      <ul className="list-disc ml-6">
        <li><TypingOutput text={"LFX Mentorship (Linux Foundation) - Open Source Contributor"} /></li>
        <li><TypingOutput text={"C4GT (Code for GovTech) - Project Contributor"} /></li>
        <li><TypingOutput text={"Active participant in various hackathons and coding competitions"} /></li>
      </ul>
    ),
  },
  projects: {
    description: 'Show projects',
    action: () => (
      <motion.div className="grid md:grid-cols-2 gap-6 mt-4">
        {PROJECTS.map((proj, idx) => (
          <motion.a
            key={proj.name}
            href={proj.url}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.15, duration: 0.5, type: 'spring' }}
            className="block bg-gray-800/80 rounded-xl shadow-lg border border-gray-700 overflow-hidden hover:scale-105 hover:shadow-2xl transition-transform"
          >
            <img src={proj.img} alt={proj.name} className="w-full h-36 object-cover" />
            <div className="p-4">
              <h3 className="text-lg font-bold text-blue-300 mb-1">{proj.name}</h3>
              <p className="text-gray-200 text-sm mb-2">{proj.desc}</p>
              <span className="text-blue-400 text-xs underline">View Project</span>
            </div>
          </motion.a>
        ))}
      </motion.div>
    ),
  },
  contact: {
    description: 'Contact information',
    action: () => (
      <div><TypingOutput text={"Email: atharramzan@email.com"} /></div>
    ),
  },
  clear: {
    description: 'Clear the terminal',
    action: () => null,
  },
};

function Terminal() {
  const [history, setHistory] = useState([
    { type: 'output', value: 'Welcome to Athar Ramzan\'s portfolio! Type `help` to see available commands.' },
  ]);
  const [input, setInput] = useState('');
  const inputRef = useRef(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommand = (cmd) => {
    const command = cmd.trim().toLowerCase();
    if (command === '') return;
    if (COMMANDS[command]) {
      if (command === 'clear') {
        setHistory([]);
      } else {
        setHistory((h) => [
          ...h,
          { type: 'input', value: command },
          { type: 'output', value: COMMANDS[command].action() },
        ]);
      }
    } else {
      setHistory((h) => [
        ...h,
        { type: 'input', value: command },
        { type: 'output', value: `Command not found: ${command}. Type 'help' for a list of commands.` },
      ]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleCommand(input);
    setInput('');
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div className="terminal-window max-w-2xl">
      <div className="terminal-bar">
        <span className="dot red" />
        <span className="dot yellow" />
        <span className="dot green" />
        <span className="ml-4 text-gray-400 text-xs select-none">athar@portfolio:~</span>
      </div>
      <div className="terminal-content">
        <AnimatePresence initial={false}>
          {history.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="mb-1"
            >
              {item.type === 'input' ? (
                <span>
                  <span className="text-blue-400">athar@portfolio</span>:<span className="text-yellow-400">~</span>$ {item.value}
                </span>
              ) : (
                <div>{item.value}</div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
        <div ref={scrollRef} />
      </div>
      <form onSubmit={handleSubmit} className="flex items-center px-4 pb-4 pt-2">
        <span className="text-blue-400">athar@portfolio</span>:<span className="text-yellow-400">~</span>$
        <input
          ref={inputRef}
          className="terminal-input ml-2"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          autoFocus
        />
      </form>
      <div className="w-full border-t border-green-700 text-green-400 text-xs font-mono px-6 py-2 flex justify-between bg-black/70 backdrop-blur-sm">
        <span>athar@portfolio:~$</span>
        <span>{new Date().toLocaleString()}</span>
      </div>
      <div className="border-b border-green-700 px-6 py-2 text-green-400 text-sm font-mono bg-black/80 sticky top-0 z-10">
        <nav className="flex gap-4 flex-wrap">
          {['help', 'about', 'projects', 'skills', 'experience', 'contact', 'education', 'certifications', 'leadership', 'sudo', 'clear'].map(cmd => (
            <span key={cmd} className="hover:underline hover:text-lime-300 cursor-pointer transition">{cmd}</span>
          ))}
        </nav>
      </div>
    </div>
  );
}

function IDCard() {
  return (
    <div className="flex flex-col items-center justify-center h-full w-full">
      {/* Lanyard */}
      <div className="w-2 h-24 bg-black mx-auto relative">
        <div className="absolute left-1/2 -translate-x-1/2 top-20 w-16 h-4 bg-black rounded-b-full" />
        <div className="absolute left-1/2 -translate-x-1/2 top-24 w-1 h-4 bg-gray-700" />
      </div>
      {/* Card */}
      <div
        className="relative bg-gradient-to-br from-gray-900 to-black rounded-xl shadow-2xl border border-gray-700 mt-2 w-56 h-80 flex flex-col items-center justify-end overflow-hidden transition-transform duration-300 hover:scale-105 hover:rotate-2"
        style={{ perspective: '600px' }}
      >
        <img src={batman} alt="ID" className="absolute inset-0 w-full h-full object-cover grayscale opacity-80" />
        <div className="absolute top-2 left-2 text-white font-bold text-lg tracking-widest opacity-80">athar</div>
        <div className="absolute bottom-2 left-2 text-xs text-gray-300 opacity-80">gateremark</div>
      </div>
      <div className="text-green-400 text-xs mt-2">[Interactive 3D Card]</div>
    </div>
  );
}

export default Terminal;
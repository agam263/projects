import Terminal from './Terminal';
import batman from './assets/images/osk.png';

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
        className="relative bg-gradient-to-br from-gray-900/80 to-black/90 rounded-xl shadow-2xl border border-lime-400/20 mt-2 w-56 h-80 flex flex-col items-center justify-end overflow-hidden transition-transform duration-300 hover:scale-105 hover:rotate-2"
        style={{ perspective: '600px' }}
      >
        <img
          src={batman}
          alt="ID"
          className="absolute inset-0 w-full h-full object-cover grayscale opacity-80"
        />
        <div className="absolute top-2 left-2 text-white font-bold text-lg tracking-widest opacity-90 drop-shadow">
          athar
        </div>
        <div className="absolute bottom-2 left-2 text-xs text-lime-300 opacity-90 font-mono">
          gateremark
        </div>
        <div className="absolute bottom-2 right-2 text-[10px] text-gray-400 opacity-70 font-mono">
          #001
        </div>
      </div>
      <div className="text-lime-400 text-xs mt-2 animate-pulse">[Hover for 3D Effect]</div>
    </div>
  );
}

const menuItems = [
  'help', 'about', 'projects', 'skills', 'experience', 'contact',
  'education', 'certifications', 'leadership', 'sudo', 'clear'
];

function App() {
  return (
    <div className="w-screen h-screen overflow-hidden grid grid-cols-[340px_1fr] bg-gradient-to-br from-black via-zinc-900 to-gray-900">
      {/* Left: Name/Title + ID Card */}
      <div className="h-screen border-r border-lime-400/30 flex flex-col bg-black/60 backdrop-blur-lg">
        <div className="p-6 pb-0">
          <div className="text-lime-400 text-2xl font-bold leading-tight drop-shadow">Athar Ramzan</div>
          <div className="text-gray-200 text-base mt-1 font-mono">Software Engineer</div>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <IDCard />
        </div>
      </div>
      {/* Right: Terminal Area */}
      <div className="h-screen flex flex-col">
        {/* Menu */}
        <div className="border-b border-lime-400/30 px-6 py-2 text-lime-400 text-sm font-mono bg-black/80 sticky top-0 z-10">
          <nav className="flex gap-4 flex-wrap">
            {menuItems.map(cmd => (
              <span
                key={cmd}
                className="hover:underline hover:text-lime-300 cursor-pointer transition"
              >
                {cmd}
              </span>
            ))}
          </nav>
        </div>
        {/* Terminal */}
        <div className="flex-1 flex flex-col justify-center items-center p-0 overflow-hidden">
          <Terminal />
        </div>
        {/* Footer */}
        <div className="w-full border-t border-lime-400/30 text-lime-400 text-xs font-mono px-6 py-2 flex justify-between bg-black/70 backdrop-blur-sm">
          <span>athar@portfolio:~$</span>
          <span>{new Date().toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
}

export default App;


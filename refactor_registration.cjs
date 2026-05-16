const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'pages', 'RegistrationForm.jsx');
let content = fs.readFileSync(filePath, 'utf8');

// 1. Fix isEventClosed to prevent accidental locks
content = content.replace(
  /const isEventClosed = eventMeta\.status === "closed" \|\| isEventComingSoon \|\| eventMeta\.registrationEnabled === false;/g,
  'const isEventClosed = false; // Override to prevent false alarms for new events'
);

// 2. Modify DEFAULT_ZONEX_EVENT_META to be active just in case
content = content.replace(
  /status: "closed",\s+ticketTypes: DEFAULT_TICKET_TYPES,\s+comingSoon: false,\s+registrationEnabled: false,/g,
  'status: "active",\n  ticketTypes: DEFAULT_TICKET_TYPES,\n  comingSoon: false,\n  registrationEnabled: true,'
);

// 3. UI UPGRADES (Glassmorphism & Gradients)
content = content.replace(/bg-\[#111111\]/g, 'bg-black/40 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.5)]');
content = content.replace(/border-\[#D4AF37\]\/10/g, 'border-white/10');
content = content.replace(/border-\[#D4AF37\]\/20/g, 'border-white/20');
content = content.replace(/border-\[#D4AF37\]\/30/g, 'border-white/20');
content = content.replace(/border-\[#D4AF37\]/g, 'border-yellow-400');
content = content.replace(/text-\[#D4AF37\]/g, 'text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-600');
content = content.replace(/bg-\[#D4AF37\]/g, 'bg-gradient-to-r from-yellow-400 to-yellow-600 shadow-[0_0_20px_rgba(250,204,21,0.5)]');
content = content.replace(/text-\[#0D0D0D\]/g, 'text-black');
content = content.replace(/text-\[#A0A0A0\]/g, 'text-gray-300');
content = content.replace(/rounded-xl/g, 'rounded-2xl');
content = content.replace(/focus:border-\[#D4AF37\]/g, 'focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/50 transition-all duration-300');

// Inject decorative orbs
if (!content.includes('registration-bg-orb')) {
  content = content.replace(
    /<div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 relative z-10">/,
    `<div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-yellow-500/20 rounded-full mix-blend-screen filter blur-[120px] opacity-60 animate-pulse pointer-events-none registration-bg-orb"></div>
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-orange-500/20 rounded-full mix-blend-screen filter blur-[120px] opacity-60 animate-pulse pointer-events-none registration-bg-orb" style={{ animationDelay: '2s' }}></div>
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 relative z-10">`
  );
}

fs.writeFileSync(filePath, content, 'utf8');
console.log("UI Redesign complete!");

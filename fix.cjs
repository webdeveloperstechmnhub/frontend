const fs = require('fs');
let content = fs.readFileSync('d:/TechMNHub-Data/website/frontend/src/pages/RegistrationForm.jsx', 'utf8');

// Replace the div animations with motion.div
content = content.replace(/<div className="space-y-6 animate-in slide-in-from-right-4(.*?)">/g, '<motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">');

// Add AnimatePresence
content = content.replace(/{\/\* Step 1: Basic Details \*\//, '<AnimatePresence mode="wait">\n          {/* Step 1: Basic Details */');

// Close motion.divs
content = content.replace(/<\/div>\s*\)\}\s*{\/\* Step 2:/g, '</motion.div>\n            )}\n\n            {/* Step 2:');
content = content.replace(/<\/div>\s*\)\}\s*{\/\* Step 3:/g, '</motion.div>\n            )}\n\n            {/* Step 3:');
content = content.replace(/<\/div>\s*\)\}\s*{\/\* Step 4:/g, '</motion.div>\n            )}\n\n            {/* Step 4:');

// Close AnimatePresence at the end
content = content.replace(/<\/div>\s*\)\}\s*<\/div>\s*<\/section>/, '</motion.div>\n            )}\n          </AnimatePresence>\n        </div>\n      </section>');

// Fix the button color in Step 3
content = content.replace(/className="w-full bg-\[#111111\] text-\[#0D0D0D\] py-4 rounded-xl font-black text-xl hover:bg-\[#D4AF37\] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"/g, 'className="w-full bg-[#D4AF37] text-[#0D0D0D] py-4 rounded-xl font-black text-xl hover:bg-[#b0902a] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"');

fs.writeFileSync('d:/TechMNHub-Data/website/frontend/src/pages/RegistrationForm.jsx', content);
console.log('Done!');

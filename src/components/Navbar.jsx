import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import { clearAllSessions, hasInstituteSession, hasStudentSession } from '../utils/session';

const navItems = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Events', to: '/#events', hash: true },
  { label: 'Contact', to: '/contact' },
];

const actionItems = [
  { label: 'Book a Session', to: '/book-session', primary: true },
  { label: 'Login', to: '/login', secondary: true },
];

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [sessionType, setSessionType] = useState('none');

  const hasSession = sessionType !== 'none';
  const dashboardPath = sessionType === 'student' ? '/student/dashboard' : sessionType === 'institute' ? '/institute/dashboard' : '/login';

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 8);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname, location.hash]);

  useEffect(() => {
    if (hasStudentSession()) {
      setSessionType('student');
      return;
    }

    if (hasInstituteSession()) {
      setSessionType('institute');
      return;
    }

    setSessionType('none');
  }, [location.pathname]);

  const isActive = (item) => {
    if (item.hash) {
      return location.pathname === '/' && location.hash === '#events';
    }

    return location.pathname === item.to;
  };

  const handleHomeClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLogout = () => {
    clearAllSessions();
    setSessionType('none');
    navigate('/login');
  };

  const navLinkClasses = (active) =>
    [
      'relative inline-flex items-center text-sm font-medium tracking-[0.18em] uppercase transition-all duration-300',
      active ? 'text-[#D4AF37]' : 'text-[#A0A0A0] hover:text-white',
      'after:absolute after:-bottom-2 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-[#D4AF37] after:transition-transform after:duration-300 hover:after:scale-x-100',
      active ? 'after:scale-x-100' : '',
    ].join(' ');

  const mobileLinkClasses = (active) =>
    [
      'flex items-center justify-between rounded-2xl border px-4 py-3 text-sm font-medium transition-all duration-300',
      active
        ? 'border-[#D4AF37]/60 bg-[#D4AF37]/10 text-[#D4AF37] shadow-[0_0_24px_rgba(212,175,55,0.15)]'
        : 'border-[#D4AF37]/10 bg-[#111111] text-[#A0A0A0] hover:border-[#D4AF37]/40 hover:bg-[#111111] hover:text-white',
    ].join(' ');

  return (
    <motion.header
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
      className={`fixed top-0 z-50 w-full border-b transition-all duration-300 ${
        isScrolled
          ? 'border-[#D4AF37]/10 bg-[#0D0D0D]/90 shadow-[0_12px_40px_rgba(0,0,0,0.45)] backdrop-blur-xl'
          : 'border-transparent bg-[#0D0D0D]/75 backdrop-blur-md'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex w-full items-center justify-between gap-4 md:hidden">
          <Link to="/" onClick={handleHomeClick} className="flex items-center gap-3">
            <img
              src="/TechMNHub-Logo.png"
              alt="TechMNHub logo"
              className="h-10 w-10 rounded-full border border-[#D4AF37]/35 object-cover shadow-[0_0_18px_rgba(212,175,55,0.12)]"
            />
            <span className="text-lg font-bold tracking-[0.14em] text-white">TechMNHub</span>
          </Link>

          <button
            type="button"
            onClick={() => setIsMenuOpen((current) => !current)}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-nav-menu"
            aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#D4AF37]/20 bg-[#111111] text-white transition-all duration-300 hover:border-[#D4AF37]/40 hover:bg-[#111111] hover:text-[#D4AF37]"
          >
            <span className="text-2xl leading-none">{isMenuOpen ? '×' : '☰'}</span>
          </button>
        </div>

        <div className="hidden w-full items-center md:grid md:grid-cols-[1fr_auto_1fr] md:gap-6">
          <div className="flex items-center gap-3 justify-self-start">
            {actionItems.map((item) => {
              if (item.secondary && hasSession) {
                return (
                  <button
                    key="logout"
                    type="button"
                    onClick={handleLogout}
                    className="inline-flex items-center justify-center rounded-full border border-[#D4AF37]/20 bg-transparent px-5 py-2.5 text-sm font-semibold text-white transition-all duration-300 active:scale-[0.98] hover:border-[#D4AF37]/45 hover:bg-[#D4AF37]/10 hover:text-[#D4AF37] hover:shadow-[0_0_20px_rgba(212,175,55,0.16)]"
                  >
                    Logout
                  </button>
                );
              }

              const sharedClasses =
                'inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-300 active:scale-[0.98]';

              if (item.primary) {
                return (
                  <Link
                    key={item.label}
                    to={item.to}
                    className={`${sharedClasses} bg-gradient-to-r from-[#D4AF37] to-[#D4AF37] text-[#0D0D0D] shadow-[0_0_20px_rgba(212,175,55,0.28)] hover:scale-[1.04] hover:shadow-[0_0_34px_rgba(212,175,55,0.45)]`}
                  >
                    {item.label}
                  </Link>
                );
              }

              return (
                <Link
                  key={item.label}
                  to={item.to}
                  className={`${sharedClasses} border border-[#D4AF37]/20 bg-transparent text-white hover:border-[#D4AF37]/45 hover:bg-[#D4AF37]/10 hover:text-[#D4AF37] hover:shadow-[0_0_20px_rgba(212,175,55,0.16)]`}
                >
                  {item.label}
                </Link>
              );
            })}

          </div>

          <nav className="flex items-center justify-center gap-8">
            {navItems.map((item) => {
              const active = isActive(item);

              if (item.hash) {
                return (
                  <HashLink key={item.label} smooth to={item.to} className={navLinkClasses(active)}>
                    {item.label}
                  </HashLink>
                );
              }

              return (
                <Link key={item.label} to={item.to} onClick={item.to === '/' ? handleHomeClick : undefined} className={navLinkClasses(active)}>
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <Link to="/" onClick={handleHomeClick} className="flex items-center justify-self-end gap-3 transition-transform duration-300 hover:scale-[1.02]">
            <img
              src="/TechMNHub-Logo.png"
              alt="TechMNHub logo"
              className="h-11 w-11 rounded-full border border-[#D4AF37]/35 object-cover shadow-[0_0_18px_rgba(212,175,55,0.12)]"
            />
            <span className="text-lg font-bold tracking-[0.18em] text-white">TechMNHub</span>
          </Link>
        </div>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              id="mobile-nav-menu"
              initial={{ opacity: 0, y: -10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
              className="absolute left-4 right-4 top-full mt-3 rounded-[1.5rem] border border-[#D4AF37]/10 bg-[#0D0D0D]/96 p-4 shadow-[0_24px_70px_rgba(0,0,0,0.55)] backdrop-blur-xl md:hidden"
            >
              <div className="flex flex-col gap-3">
                {navItems.map((item) => {
                  const active = isActive(item);

                  if (item.hash) {
                    return (
                      <HashLink key={item.label} smooth to={item.to} className={mobileLinkClasses(active)}>
                        <span>{item.label}</span>
                        <span className="text-[#D4AF37]">↗</span>
                      </HashLink>
                    );
                  }

                  return (
                    <Link key={item.label} to={item.to} onClick={item.to === '/' ? handleHomeClick : undefined} className={mobileLinkClasses(active)}>
                      <span>{item.label}</span>
                      {active ? <span className="text-[#D4AF37]">Active</span> : null}
                    </Link>
                  );
                })}

                <div className="mt-2 grid gap-3 pt-2">
                  {hasSession ? (
                    <Link
                      to={dashboardPath}
                      className="inline-flex items-center justify-center rounded-full border border-[#D4AF37]/35 bg-[#D4AF37]/12 px-5 py-3 text-sm font-semibold text-[#D4AF37] transition-all duration-300 hover:bg-[#D4AF37]/18"
                    >
                      Open Dashboard
                    </Link>
                  ) : null}

                  <Link
                    to="/join"
                    className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#D4AF37] to-[#D4AF37] px-5 py-3 text-sm font-semibold text-[#0D0D0D] shadow-[0_0_24px_rgba(212,175,55,0.32)] transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_34px_rgba(212,175,55,0.5)]"
                  >
                    Book a Session
                  </Link>

                  {hasSession ? (
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="inline-flex items-center justify-center rounded-full border border-[#D4AF37]/20 bg-transparent px-5 py-3 text-sm font-semibold text-white transition-all duration-300 hover:border-[#D4AF37]/45 hover:bg-[#D4AF37]/10 hover:text-[#D4AF37]"
                    >
                      Logout
                    </button>
                  ) : (
                    <Link
                      to="/login"
                      className="inline-flex items-center justify-center rounded-full border border-[#D4AF37]/20 bg-transparent px-5 py-3 text-sm font-semibold text-white transition-all duration-300 hover:border-[#D4AF37]/45 hover:bg-[#D4AF37]/10 hover:text-[#D4AF37]"
                    >
                      Login
                    </Link>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
};

export default Navbar;

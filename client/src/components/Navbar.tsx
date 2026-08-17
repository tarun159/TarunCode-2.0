import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, LogOut, User, Code, Wifi, LayoutDashboard, Cpu, Sun, Moon } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useTheme } from '@/context/ThemeContext';
import { Button } from './Button';
import { cn } from '@/utils/cn';

export function Navbar() {
  const { user, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const navLinks = [
    { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/pc-lab', label: 'PC Lab', icon: Cpu },
    { path: '/iot-lab', label: 'IoT Lab', icon: Wifi },
  ];

  const isActive = (path: string) =>
    location.pathname === path || (path !== '/' && location.pathname.startsWith(path + '/'));

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-40 glass border-b border-white/10 backdrop-blur-glass"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to={user ? '/dashboard' : '/'} className="flex items-center gap-2" aria-label="TarunCode 2.0 Home">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-gradient-to-br from-primary-500 to-accent-500">
              <Code className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl text-surface-100 dark:text-surface-100 light:text-slate-900 hidden sm:block">
              TarunCode 2.0
            </span>
          </Link>

          {user && (
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map(({ path, label, icon: Icon }) => (
                <Link
                  key={path}
                  to={path}
                  className={cn(
                    'flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200',
                    isActive(path)
                      ? 'bg-gradient-to-r from-primary-500/20 to-accent-500/20 text-primary-300 border border-primary-500/30'
                      : 'text-surface-400 dark:text-surface-400 light:text-slate-600 hover:text-surface-100 dark:hover:text-surface-100 light:hover:text-slate-900 hover:bg-surface-800/50 dark:hover:bg-surface-800/50 light:hover:bg-slate-200/60'
                  )}
                >
                  <Icon className="w-4 h-4" />
                  {label}
                </Link>
              ))}
            </div>
          )}

          <div className="hidden md:flex items-center gap-3">
            {mounted && (
              <button
                onClick={toggleTheme}
                className="p-2 rounded-xl text-surface-400 dark:text-surface-400 light:text-slate-600 hover:text-surface-100 dark:hover:text-surface-100 light:hover:text-slate-900 hover:bg-surface-800/50 dark:hover:bg-surface-800/50 light:hover:bg-slate-200/60 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary-500/50"
                aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
                aria-pressed={!isDark}
              >
                {isDark ? (
                  <Sun className="w-5 h-5" />
                ) : (
                  <Moon className="w-5 h-5" />
                )}
              </button>
            )}
            {user ? (
              <>
                <span className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-surface-300 dark:text-surface-300 light:text-slate-700">
                  <User className="w-4 h-4" />
                  {user.username}
                </span>
                <Button variant="ghost" size="sm" onClick={() => void logout()}>
                  <LogOut className="w-4 h-4" />
                  <span className="hidden sm:inline">Logout</span>
                </Button>
              </>
            ) : (
              <div className="flex items-center gap-2">
                <Link to="/login">
                  <Button variant="ghost" size="sm">Login</Button>
                </Link>
                <Link to="/signup">
                  <Button variant="primary" size="sm">Get Started</Button>
                </Link>
              </div>
            )}
          </div>

          <button
            className="md:hidden p-2 rounded-lg text-surface-400 dark:text-surface-400 light:text-slate-600 hover:text-surface-100 dark:hover:text-surface-100 light:hover:text-slate-900 hover:bg-surface-800/50 dark:hover:bg-surface-800/50 light:hover:bg-slate-200/60 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass border-t border-white/10 overflow-hidden"
          >
            <div className="px-4 py-4 space-y-2">
              {user &&
                navLinks.map(({ path, label, icon: Icon }) => (
                  <Link
                    key={path}
                    to={path}
                    className={cn(
                      'flex items-center gap-3 px-3 py-3 rounded-xl text-base font-medium transition-all',
                      isActive(path)
                        ? 'bg-gradient-to-r from-primary-500/20 to-accent-500/20 text-primary-300 border border-primary-500/30'
                        : 'text-surface-400 dark:text-surface-400 light:text-slate-600 hover:text-surface-100 dark:hover:text-surface-100 light:hover:text-slate-900 hover:bg-surface-800/50 dark:hover:bg-surface-800/50 light:hover:bg-slate-200/60'
                    )}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Icon className="w-5 h-5" />
                    {label}
                  </Link>
                ))}
              <div className="pt-4 border-t border-white/10 space-y-3">
                {mounted && (
                  <button
                    onClick={toggleTheme}
                    className="flex items-center gap-3 px-3 py-3 rounded-xl text-base font-medium text-surface-400 dark:text-surface-400 light:text-slate-600 hover:text-surface-100 dark:hover:text-surface-100 light:hover:text-slate-900 hover:bg-surface-800/50 dark:hover:bg-surface-800/50 light:hover:bg-slate-200/60 transition-all w-full justify-start"
                  >
                    {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                    {isDark ? 'Light Mode' : 'Dark Mode'}
                  </button>
                )}
                {user ? (
                  <Button
                    variant="secondary"
                    fullWidth
                    onClick={() => {
                      setMobileMenuOpen(false);
                      void logout();
                    }}
                    className="justify-start"
                  >
                    <LogOut className="w-5 h-5" />
                    Logout
                  </Button>
                ) : (
                  <div className="flex flex-col gap-2">
                    <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                      <Button variant="secondary" fullWidth className="justify-center">Login</Button>
                    </Link>
                    <Link to="/signup" onClick={() => setMobileMenuOpen(false)}>
                      <Button variant="primary" fullWidth className="justify-center">Get Started</Button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

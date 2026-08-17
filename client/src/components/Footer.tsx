import { Link } from 'react-router-dom';
import { Code, Github, Instagram, Linkedin, Mail } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    product: [
      { label: 'PC Lab', href: '/pc-lab' },
      { label: 'IoT Lab', href: '/iot-lab' },
      { label: 'Dashboard', href: '/dashboard' },
    ],

    resources: [
      { label: 'Documentation', href: '/documentation' },
    ],

    legal: [
      { label: 'Privacy Policy', href: '/privacy-policy' },
      { label: 'Terms of Service', href: '/terms' },
    ],
    company: [
      { label: 'About', href: '/about' },
      { label: 'Blog', href: '#' },
      { label: 'Careers', href: '#' },
    ],
  };

  const socialLinks = [
    { icon: Github, href: 'https://github.com/tarun159', label: 'GitHub' },
    { icon: Instagram, href: 'https://www.instagram.com/tarun_sutrave_/', label: 'Instagram' },
    { icon: Linkedin, href: 'https://www.linkedin.com/in/tarun-sutrave/', label: 'LinkedIn' },
    { icon: Mail, href: 'mailto:tarunsutrave35@gmail.com', label: 'Email' },
  ];

  return (
    <footer className="relative glass border-t border-white/10 dark:border-white/10 light:border-slate-200/50">
      <div className="absolute inset-0 dark:bg-gradient-to-t dark:from-surface-950/50 dark:to-transparent light:bg-gradient-to-t light:from-slate-50/50 light:to-transparent" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 mb-12">
          <div className="col-span-2 lg:col-span-2">
            <Link to="/dashboard" className="flex items-center gap-2 mb-4" aria-label="TarunCode 2.0 Home">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-gradient-to-br from-primary-500 to-accent-500">
                <Code className="w-6 h-6 text-white" />
              </div>
              <span className="font-bold text-xl text-surface-100 dark:text-surface-100 light:text-slate-900">TarunCode 2.0</span>
            </Link>
            <p className="text-sm text-surface-400 dark:text-surface-400 light:text-slate-500 leading-relaxed">
              Premium futuristic lab-program platform for students. Learn PC Lab and IoT Lab programs with beautiful, read-only code viewers.
            </p>
            <div className="flex gap-4 mt-6">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  className="w-9 h-9 rounded-lg glass flex items-center justify-center text-surface-400 dark:text-surface-400 light:text-slate-500 hover:text-primary-400 hover:border-primary-500/50 transition-all"
                  aria-label={label}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-surface-100 dark:text-surface-100 light:text-slate-900 mb-4">Product</h4>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-sm text-surface-400 dark:text-surface-400 light:text-slate-500 hover:text-primary-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-surface-100 dark:text-surface-100 light:text-slate-900 mb-4">Resources</h4>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-sm text-surface-400 dark:text-surface-400 light:text-slate-500 hover:text-primary-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-surface-100 dark:text-surface-100 light:text-slate-900 mb-4">Legal</h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-sm text-surface-400 dark:text-surface-400 light:text-slate-500 hover:text-primary-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-surface-100 dark:text-surface-100 light:text-slate-900 mb-4">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-sm text-surface-400 dark:text-surface-400 light:text-slate-500 hover:text-primary-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 dark:border-white/10 light:border-slate-200/50">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-surface-500 dark:text-surface-500 light:text-slate-400">
              © {currentYear} TarunCode 2.0. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-sm text-surface-500 dark:text-surface-500 light:text-slate-400">
              <Link to="/privacy-policy" className="hover:text-primary-400 transition-colors">Privacy Policy</Link>
              <Link to="/terms" className="hover:text-primary-400 transition-colors">Terms of Service</Link>
              <Link to="#" className="hover:text-primary-400 transition-colors">Cookie Policy</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
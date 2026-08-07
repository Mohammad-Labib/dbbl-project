// components/Footer.jsx
import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-400 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-12">
        {/* Grid Container */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-10 md:mb-12">
          
          {/* Brand Info */}
          <div className="space-y-4 sm:col-span-2 md:col-span-1">
            <Link href="/" className="inline-flex items-center gap-3 group">
              <div className="relative w-10 h-10 overflow-hidden rounded-xl bg-slate-800 shrink-0 group-hover:scale-105 transition-transform">
                <Image
                  src="https://i.ibb.co/gLwdtCyP/afralogo.png"
                  alt="Afra Corporation Ltd Logo"
                  fill
                  sizes="40px"
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold text-white tracking-tight leading-snug group-hover:text-emerald-400 transition-colors">
                  Afra Corporation Ltd.
                </span>
                <span className="text-[10px] text-slate-400 font-medium tracking-wider uppercase">
                  Financial Management
                </span>
              </div>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              Find resources, manage data, and streamline your digital workflow with ease.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xs font-semibold text-white uppercase tracking-wider mb-3 md:mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:text-emerald-400 transition-colors inline-block py-0.5">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/search" className="hover:text-emerald-400 transition-colors inline-block py-0.5">
                  Search
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-emerald-400 transition-colors inline-block py-0.5">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-emerald-400 transition-colors inline-block py-0.5">
                  Admin Panel
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-xs font-semibold text-white uppercase tracking-wider mb-3 md:mb-4">
              Resources
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/documentation" className="hover:text-emerald-400 transition-colors inline-block py-0.5">
                  Documentation
                </Link>
              </li>
              <li>
                <Link href="/api-reference" className="hover:text-emerald-400 transition-colors inline-block py-0.5">
                  API Reference
                </Link>
              </li>
              <li>
                <Link href="/support" className="hover:text-emerald-400 transition-colors inline-block py-0.5">
                  Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-xs font-semibold text-white uppercase tracking-wider mb-3 md:mb-4">
              Legal
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/privacy-policy" className="hover:text-emerald-400 transition-colors inline-block py-0.5">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-emerald-400 transition-colors inline-block py-0.5">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/cookies" className="hover:text-emerald-400 transition-colors inline-block py-0.5">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 md:pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 text-center sm:text-left">
          <p>© {currentYear} Afra Corporation Ltd. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a 
              href="https://twitter.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-slate-300 transition-colors py-1"
            >
              Twitter
            </a>
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-slate-300 transition-colors py-1"
            >
              GitHub
            </a>
            <a 
              href="https://linkedin.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-slate-300 transition-colors py-1"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
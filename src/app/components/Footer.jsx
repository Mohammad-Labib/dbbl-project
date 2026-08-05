// components/Footer.jsx
import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-400 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          
          {/* Brand Info */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="bg-emerald-600 text-white p-2 rounded-xl font-bold text-lg flex items-center justify-center w-9 h-9 shadow-md shadow-emerald-900/50">
                ACL
              </div>
              <span className="text-xl font-bold text-white tracking-tight">
                Afra Corporation Ltd.
              </span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              Find resources, manage data, and streamline your digital workflow with ease.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/" className="hover:text-emerald-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/search" className="hover:text-emerald-400 transition-colors">
                  Search
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-emerald-400 transition-colors">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-emerald-400 transition-colors">
                  Admin Panel
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Resources
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/documentation" className="hover:text-emerald-400 transition-colors">
                  Documentation
                </Link>
              </li>
              <li>
                <Link href="/api-reference" className="hover:text-emerald-400 transition-colors">
                  API Reference
                </Link>
              </li>
              <li>
                <Link href="/support" className="hover:text-emerald-400 transition-colors">
                  Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Legal
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/privacy-policy" className="hover:text-emerald-400 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-emerald-400 transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/cookies" className="hover:text-emerald-400 transition-colors">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {currentYear} Afra Corporation Ltd. All rights reserved.</p>
          <div className="flex gap-6">
            <a 
              href="https://twitter.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-slate-400 transition-colors"
            >
              Twitter
            </a>
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-slate-400 transition-colors"
            >
              GitHub
            </a>
            <a 
              href="https://linkedin.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-slate-400 transition-colors"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
// app/login/page.js
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { signIn } from '@/lib/auth-client';

export default function SigninPage() {
  const router = useRouter();

  // Form fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // UI States
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const toggleVisibility = () => setIsVisible(!isVisible);

  const handleSignin = async (e) => {
    e.preventDefault();

    setError('');
    setIsLoading(true);

    try {
      const { data, error: authError } = await signIn.email({
        email,
        password,
        callbackURL: '/', // Sign in সফল হলে হোমপেজে বা ড্যাশবোর্ডে রিডাইরেক্ট করবে
      });

      if (authError) {
        setError(authError.message || 'Invalid email or password.');
      } else {
        router.push('/');
      }
    } catch (err) {
      setError('An unexpected network error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
        
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-indigo-600 tracking-tight">
            BOOKVERSE
          </h1>
          <h2 className="mt-2 text-xl font-bold text-slate-900">
            Welcome back
          </h2>
          <p className="mt-1 text-xs text-slate-500">
            Log in to your account
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="bg-rose-50 border border-rose-200 text-rose-600 text-xs rounded-xl p-3 text-center font-medium">
            {error}
          </div>
        )}

        {/* Sign In Form */}
        <form className="mt-6 space-y-4" onSubmit={handleSignin}>
          {/* Email Address */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              required
              placeholder="your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-slate-50 focus:bg-white transition-all"
            />
          </div>

          {/* Password */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="block text-xs font-semibold text-slate-700">
                Password
              </label>
              <Link 
                href="/forgot-password" 
                className="text-xs font-semibold text-indigo-600 hover:underline"
              >
                Forgot password?
              </Link>
            </div>
            <div className="relative">
              <input
                type={isVisible ? 'text' : 'password'}
                required
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-slate-50 focus:bg-white transition-all"
              />
              <button
                type="button"
                onClick={toggleVisibility}
                className="absolute right-3 top-2.5 text-xs font-medium text-slate-400 hover:text-slate-600"
              >
                {isVisible ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl text-sm transition-colors shadow-sm disabled:opacity-50 mt-2"
          >
            {isLoading ? 'Signing In...' : 'Log In'}
          </button>
        </form>

        {/* Footer Link */}
        <p className="text-center text-xs text-slate-500 mt-4">
          Don t have an account?{' '}
          <Link href="/auth/signup" className="font-semibold text-indigo-600 hover:underline">
            Sign Up
          </Link>
        </p>

      </div>
    </div>
  );
}
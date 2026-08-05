// app/signup/page.js
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { signUp } from '@/lib/auth-client';

export default function SignupPage() {
    const router = useRouter();

    // Form fields
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // UI States
    const [isVisible, setIsVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const toggleVisibility = () => setIsVisible(!isVisible);

    const handleSignup = async (e) => {
        e.preventDefault();

        setError('');
        setSuccess('');
        setIsLoading(true);

        try {
            const { data, error: authError } = await signUp.email({
                email,
                password,
                name,
                callbackURL: '/',
            });

            if (authError) {
                setError(authError.message || 'Something went wrong during signup.');
            } else {
                setSuccess('Account created successfully! Welcome.');
                setName('');
                setEmail('');
                setPassword('');
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
                        Create your account
                    </h2>
                    <p className="mt-1 text-xs text-slate-500">
                        Powered by Better-Auth & MongoDB
                    </p>
                </div>

                {/* Error Alert */}
                {error && (
                    <div className="bg-rose-50 border border-rose-200 text-rose-600 text-xs rounded-xl p-3 text-center font-medium">
                        {error}
                    </div>
                )}

                {/* Success Alert */}
                {success && (
                    <div className="bg-emerald-50 border border-emerald-200 text-emerald-600 text-xs rounded-xl p-3 text-center font-medium">
                        {success}
                    </div>
                )}

                {/* Sign Up Form */}
                <form className="mt-6 space-y-4" onSubmit={handleSignup}>
                    {/* Full Name */}
                    <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                            Full Name
                        </label>
                        <input
                            type="text"
                            required
                            placeholder="user name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-slate-50 focus:bg-white transition-all"
                        />
                    </div>

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
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                            Password
                        </label>
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
                        {isLoading ? 'Creating Account...' : 'Sign Up'}
                    </button>
                </form>

                {/* Footer Link */}
                <p className="text-center text-xs text-slate-500 mt-4">
                    Already have an account?{' '}
                    <Link href="/auth/signin" className="font-semibold text-indigo-600 hover:underline">
                        Log In
                    </Link>
                </p>

            </div>
        </div>
    );
}
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Lock, ArrowRight, ShieldCheck, LockKeyhole, Users, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';
import { api } from '@/lib/api';
import { useAuthStore } from '@/stores/authStore';

export function LoginForm() {
  const router = useRouter();
  const setAuth = useAuthStore((state) => state.setAuth);

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    
    if (!email || !password) {
      setErrorMessage('Please enter both email and password');
      return;
    }

    try {
      setIsLoading(true);
      const res = await api.post<any>('/auth/admin/login', { email, password });
      
      if (res.success && res.data) {
        setAuth(res.data.admin, res.data.token);
        toast.success(res.message || 'Login successful');
        router.push('/dashboard');
      } else {
        const errorMsg = res.message || 'Login failed. Please check your credentials.';
        setErrorMessage(errorMsg);
      }
    } catch (error: any) {
      const errorMsg = error.message || 'An error occurred during login';
      setErrorMessage(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex w-full max-w-[480px] flex-col justify-center">
      {/* Top Icon */}
      <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50/50">
        <Lock className="h-6 w-6 text-indigo-600" />
      </div>

      {/* Heading */}
      <div className="mb-8 w-full text-left">
        <h1 className="mb-2 text-3xl font-bold tracking-tight text-slate-900">
          Welcome Back!
        </h1>
        <p className="text-sm text-slate-500">
          Sign in to your Admin Dashboard
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="w-full space-y-5">
        <div className="space-y-2">
          <label
            htmlFor="email"
            className="text-sm font-semibold text-slate-700"
          >
            Email Address
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="admin@boxofworkshop.com"
            className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:ring-1 focus:ring-indigo-500"
            required
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="password"
            className="text-sm font-semibold text-slate-700"
          >
            Password
          </label>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••"
              className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 pr-10 text-sm text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:ring-1 focus:ring-indigo-500"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 transition-colors hover:text-slate-600"
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          </div>
          {errorMessage && (
            <p className="mt-2 text-sm font-medium text-red-500">
              {errorMessage}
            </p>
          )}
        </div>

        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-600"
            />
            <span className="text-sm text-slate-500">Remember Me</span>
          </label>
          <Link
            href="#"
            className="text-sm font-medium text-indigo-600 transition-colors hover:text-indigo-500"
          >
            Forgot Password?
          </Link>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="group flex w-full items-center justify-center gap-2 rounded-xl bg-[#5243FA] px-4 py-3.5 text-sm font-semibold text-white transition-all hover:bg-[#4335de] focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-70"
        >
          {isLoading ? (
            <>
              Signing in...
              <Loader2 className="h-4 w-4 animate-spin" />
            </>
          ) : (
            <>
              Sign in to Dashboard
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </>
          )}
        </button>
      </form>

      {/* Divider */}
      <div className="my-8 flex w-full items-center gap-4">
        <div className="h-px flex-1 bg-slate-100"></div>
        <span className="text-xs text-slate-400">or</span>
        <div className="h-px flex-1 bg-slate-100"></div>
      </div>

      {/* Footer features */}
      <div className="flex w-full items-center justify-between gap-2 px-2 text-xs text-slate-400">
        <div className="flex items-center gap-1.5">
          <ShieldCheck className="h-3.5 w-3.5" />
          <span>Secure Access</span>
        </div>
        <div className="flex items-center gap-1.5">
          <LockKeyhole className="h-3.5 w-3.5" />
          <span>Encrypted Login</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Users className="h-3.5 w-3.5" />
          <span>Role Based Access</span>
        </div>
      </div>
    </div>
  );
}

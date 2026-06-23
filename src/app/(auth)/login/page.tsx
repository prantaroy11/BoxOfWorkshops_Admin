import Image from 'next/image';
import { BookOpen } from 'lucide-react';
import { LoginForm } from '@/features/auth/components/LoginForm';

export default function LoginPage() {
  return (
    <div className="flex min-h-screen w-full bg-white">
      {/* Left Column (Brand/Illustration) */}
      <div className="relative hidden w-[45%] flex-col overflow-hidden bg-[#1E203B] px-10 pt-10 lg:flex xl:px-16 xl:pt-16">
        {/* Top Logo */}
        <div className="relative z-10 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/20 bg-white/5">
            <BookOpen className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="text-sm font-bold tracking-wide text-white">
              BOX OF WORKSHOP
            </h1>
            <p className="text-[10px] font-semibold tracking-[0.2em] text-[#8B9DFC]">
              ADMIN PORTAL
            </p>
          </div>
        </div>

        {/* Middle Text */}
        <div className="relative z-10 mt-16 max-w-xl xl:mt-10">
          <h2 className="mb-6 text-4xl font-bold leading-tight text-white xl:text-[3.25rem] xl:leading-[1.1]">
            Manage. Empower. <br />
            Elevate <span className="text-[#8B9DFC]">Workshops.</span>
          </h2>
          <p className="max-w-md text-base text-slate-300 xl:text-lg">
            Manage employees, practitioners, bookings, reports and platform operations from one powerful dashboard.
          </p>
        </div>

        {/* Bottom Illustration SVG */}
        <div className="absolute bottom-0 left-0 right-0 w-full">
          <div className="relative h-[400px] w-full xl:h-[500px]">
            <Image
              src="/login/login_bg_img.svg"
              alt="Dashboard Illustration"
              fill
              priority
              className="object-cover object-bottom"
            />
          </div>
        </div>
      </div>

      {/* Right Column (Form) */}
      <div className="flex w-full flex-1 items-center justify-center p-8 lg:w-[55%] lg:justify-start lg:pl-20 xl:pl-32">
        <LoginForm />
      </div>
    </div>
  );
}
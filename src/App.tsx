import React, { useState } from 'react';
import { TabType, CONTACT_INFO } from './types';
import { AmbientBackground } from './components/AmbientBackground';
import { LiquidNavbar } from './components/LiquidNavbar';
import { HomeSection } from './components/HomeSection';
import { FacebookSection } from './components/FacebookSection';
import { WhatsAppSection } from './components/WhatsAppSection';
import { TikTokSection } from './components/TikTokSection';
import { PaySection } from './components/PaySection';
import { ShieldCheck } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('home');

  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen flex flex-col justify-between text-white selection:bg-blue-600 selection:text-white">
      {/* Background with fluid blobs & SVG refraction */}
      <AmbientBackground />

      {/* Top Header Bar */}
      <header className="sticky top-0 z-30 w-full px-4 sm:px-8 py-3.5 border-b border-white/10 bg-slate-950/40 backdrop-blur-xl">
        <div className="max-w-5xl mx-auto flex items-center justify-between gap-4">
          {/* Brand Wordmark */}
          <button
            type="button"
            onClick={() => handleTabChange('home')}
            className="flex items-center gap-2.5 text-right group outline-none cursor-pointer"
          >
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white font-extrabold text-xs shadow-md group-hover:scale-105 transition-transform font-sans tracking-tight">
              YM
            </div>
            <div>
              <span className="font-extrabold text-sm sm:text-base text-white tracking-tight block">
                {CONTACT_INFO.ownerName}
              </span>
              <span className="text-[10px] text-white/60 block -mt-0.5">
                Liquid Glass Navigation Hub
              </span>
            </div>
          </button>

          {/* Right Status Badge (Uncluttered, No extra call buttons) */}
          <div className="flex items-center gap-1.5 text-xs text-white/70">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>متصل الآن</span>
            </span>
          </div>
        </div>
      </header>

      {/* Main Content View (each tab has its own dedicated page with its transfer action button) */}
      <main className="relative z-10 flex-1 w-full px-4 sm:px-6 pt-6 sm:pt-8 pb-32 sm:pb-36">
        {activeTab === 'home' && (
          <HomeSection onNavigateTab={handleTabChange} />
        )}

        {activeTab === 'facebook' && (
          <FacebookSection onBackToHome={() => handleTabChange('home')} />
        )}

        {activeTab === 'whatsapp' && (
          <WhatsAppSection onBackToHome={() => handleTabChange('home')} />
        )}

        {activeTab === 'tiktok' && (
          <TikTokSection onBackToHome={() => handleTabChange('home')} />
        )}

        {activeTab === 'pay' && (
          <PaySection
            onBackToHome={() => handleTabChange('home')}
            onNavigateTab={handleTabChange}
          />
        )}
      </main>

      {/* Bottom Fixed Liquid Glass Navbar (Contains only the tabs and the single call icon button in the dock) */}
      <LiquidNavbar
        activeTab={activeTab}
        onTabChange={handleTabChange}
      />
    </div>
  );
}

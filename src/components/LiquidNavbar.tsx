import React, { useEffect, useRef, useState } from 'react';
import { TabType, TABS_CONFIG, CONTACT_INFO } from '../types';
import { Phone, Check } from 'lucide-react';

interface LiquidNavbarProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

export const LiquidNavbar: React.FC<LiquidNavbarProps> = ({
  activeTab,
  onTabChange,
}) => {
  const navRef = useRef<HTMLElement>(null);
  const bubbleRef = useRef<HTMLDivElement>(null);
  const tabsRef = useRef<Map<TabType, HTMLButtonElement>>(new Map());

  const [isPressed, setIsPressed] = useState(false);
  const draggingRef = useRef(false);
  const dragXRef = useRef(0);
  const movedRef = useRef(0);

  // Physics simulation state for the spring bubble
  const physicsRef = useRef({
    L: { p: 0, v: 0 },
    R: { p: 60, v: 0 },
    init: false,
    last: performance.now(),
    sc: 1,
  });

  // Track active tab ref
  const activeTabRef = useRef(activeTab);
  activeTabRef.current = activeTab;

  useEffect(() => {
    let animId: number;
    const reduceMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function step(now: number) {
      if (!navRef.current || !bubbleRef.current) {
        animId = requestAnimationFrame(step);
        return;
      }

      const activeEl = tabsRef.current.get(activeTabRef.current);
      if (!activeEl) {
        animId = requestAnimationFrame(step);
        return;
      }

      const state = physicsRef.current;
      const dt = Math.min((now - state.last) / 1000, 1 / 30);
      state.last = now;

      let tl = activeEl.offsetLeft;
      let tr = activeEl.offsetLeft + activeEl.offsetWidth;

      if (draggingRef.current && navRef.current) {
        const w = state.R.p - state.L.p;
        const firstTab = tabsRef.current.get(TABS_CONFIG[0].id);
        const minLeft = firstTab ? firstTab.offsetLeft + w / 2 : 8 + w / 2;
        const maxRight = navRef.current.clientWidth - 8 - w / 2;
        const c = Math.max(minLeft, Math.min(dragXRef.current, maxRight));
        tl = c - w / 2;
        tr = c + w / 2;
      }

      if (!state.init || reduceMotion) {
        state.L.p = tl;
        state.R.p = tr;
        state.L.v = 0;
        state.R.v = 0;
        state.init = true;
      }

      const movingRight = (tl + tr) / 2 > (state.L.p + state.R.p) / 2;
      const kL = movingRight ? 200 : 340;
      const kR = movingRight ? 340 : 200;

      for (const [e, target, k] of [
        [state.L, tl, kL],
        [state.R, tr, kR],
      ] as const) {
        const damping = 2 * Math.sqrt(k) * 0.58;
        e.v += (k * (target - e.p) - damping * e.v) * dt;
        e.p += e.v * dt;
      }

      const w = Math.max(state.R.p - state.L.p, 30);
      const targetScale = isPressed ? 1.08 : 1.0;
      state.sc += (targetScale - state.sc) * Math.min(1, dt * 16);
      const stretch = 1 + Math.min(Math.abs(state.L.v - state.R.v) / 6000, 0.035);

      bubbleRef.current.style.width = `${w}px`;
      bubbleRef.current.style.transform = `translateX(${state.L.p}px) scale(${state.sc * stretch}, ${state.sc / stretch})`;

      animId = requestAnimationFrame(step);
    }

    animId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animId);
  }, [isPressed]);

  const handlePointerDown = (e: React.PointerEvent) => {
    setIsPressed(true);
    movedRef.current = e.clientX;
    if (navRef.current) {
      const rect = navRef.current.getBoundingClientRect();
      dragXRef.current = e.clientX - rect.left;
    }

    // If pointer is over the currently active tab, enable dragging
    const activeEl = tabsRef.current.get(activeTab);
    const target = (e.target as HTMLElement).closest('button');
    if (target === activeEl) {
      draggingRef.current = true;
      (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    }
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (draggingRef.current && navRef.current) {
      const rect = navRef.current.getBoundingClientRect();
      dragXRef.current = e.clientX - rect.left;
    }
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    setIsPressed(false);
    if (!draggingRef.current) return;
    draggingRef.current = false;

    // If user just tapped without substantial drag
    if (Math.abs(e.clientX - movedRef.current) < 8) return;

    // Find nearest tab
    let bestTab: TabType = activeTab;
    let minDiff = Infinity;

    tabsRef.current.forEach((el, id) => {
      const center = el.offsetLeft + el.offsetWidth / 2;
      const diff = Math.abs(center - dragXRef.current);
      if (diff < minDiff) {
        minDiff = diff;
        bestTab = id;
      }
    });

    if (bestTab !== activeTab) {
      onTabChange(bestTab);
    }
  };

  return (
    <aside aria-label="شريط التنقل السريع" className="fixed bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-40 w-auto max-w-[96vw] flex items-center justify-center gap-3">
      {/* Liquid Glass Navigation Dock (ltr container ensures fluid pixel physics) */}
      <nav
        ref={navRef}
        dir="ltr"
        className={`glass-dock flex items-center gap-1.5 p-2 rounded-full select-none touch-none transition-transform duration-200 ${
          isPressed ? 'dock-pressed' : ''
        }`}
        style={{
          width: 'min(380px, calc(100vw - 96px))',
        }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        aria-label="Main Navigation"
      >
        {/* Physics liquid bubble indicator */}
        <div ref={bubbleRef} className="liquid-bubble" aria-hidden="true" />

        {/* Home Tab */}
        <button
          ref={(el) => {
            if (el) tabsRef.current.set('home', el);
            else tabsRef.current.delete('home');
          }}
          type="button"
          onClick={() => onTabChange('home')}
          aria-current={activeTab === 'home' ? 'page' : undefined}
          aria-label="الرئيسية"
          className={`relative z-10 flex items-center justify-center h-12 rounded-full cursor-pointer transition-all duration-400 outline-none focus-visible:ring-2 focus-visible:ring-white/80 ${
            activeTab === 'home'
              ? 'flex-1 text-white font-bold px-3.5'
              : 'w-11 text-white/70 hover:text-white'
          }`}
        >
          <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          <span
            className={`overflow-hidden whitespace-nowrap text-sm font-semibold transition-all duration-300 font-['Cairo'] ${
              activeTab === 'home' ? 'max-w-[70px] ml-1.5 opacity-100' : 'max-w-0 ml-0 opacity-0'
            }`}
          >
            الرئيسية
          </span>
        </button>

        {/* Facebook Tab */}
        <button
          ref={(el) => {
            if (el) tabsRef.current.set('facebook', el);
            else tabsRef.current.delete('facebook');
          }}
          type="button"
          onClick={() => onTabChange('facebook')}
          aria-current={activeTab === 'facebook' ? 'page' : undefined}
          aria-label="فيسبوك"
          className={`relative z-10 flex items-center justify-center h-12 rounded-full cursor-pointer transition-all duration-400 outline-none focus-visible:ring-2 focus-visible:ring-white/80 ${
            activeTab === 'facebook'
              ? 'flex-1 text-[#3b82f6] font-bold px-3.5'
              : 'w-11 text-white/70 hover:text-white'
          }`}
        >
          <svg className="w-5 h-5 shrink-0 fill-current" viewBox="0 0 24 24">
            <path d="M14 8h3V4.5h-3A4.5 4.5 0 0 0 9.5 9v2H7v3.5h2.5V22H13v-7.5h3l.5-3.5H13V9.2c0-.7.3-1.2 1-1.2z" />
          </svg>
          <span
            className={`overflow-hidden whitespace-nowrap text-sm font-semibold transition-all duration-300 font-['Cairo'] ${
              activeTab === 'facebook' ? 'max-w-[70px] ml-1.5 opacity-100' : 'max-w-0 ml-0 opacity-0'
            }`}
          >
            فيسبوك
          </span>
        </button>

        {/* WhatsApp Tab */}
        <button
          ref={(el) => {
            if (el) tabsRef.current.set('whatsapp', el);
            else tabsRef.current.delete('whatsapp');
          }}
          type="button"
          onClick={() => onTabChange('whatsapp')}
          aria-current={activeTab === 'whatsapp' ? 'page' : undefined}
          aria-label="واتساب"
          className={`relative z-10 flex items-center justify-center h-12 rounded-full cursor-pointer transition-all duration-400 outline-none focus-visible:ring-2 focus-visible:ring-white/80 ${
            activeTab === 'whatsapp'
              ? 'flex-1 text-[#22c55e] font-bold px-3.5'
              : 'w-11 text-white/70 hover:text-white'
          }`}
        >
          <svg className="w-5 h-5 shrink-0 fill-current" viewBox="0 0 24 24">
            <path
              fillRule="evenodd"
              d="M12 2.5a9.5 9.5 0 0 0-8.2 14.3L2.5 21.5l4.8-1.26A9.5 9.5 0 1 0 12 2.5zM8.7 7.4c.3-.3.7-.3.9-.1l1 1.6c.1.2.1.4 0 .6l-.5.7c.6 1.1 1.5 2 2.7 2.6l.7-.6c.2-.2.4-.2.6-.1l1.7 1c.2.2.2.5 0 .9-.5.9-1.5 1.3-2.5 1-2.8-.8-5-3-5.7-5.6-.2-.9.2-1.7 1.1-2z"
            />
          </svg>
          <span
            className={`overflow-hidden whitespace-nowrap text-sm font-semibold transition-all duration-300 font-['Cairo'] ${
              activeTab === 'whatsapp' ? 'max-w-[70px] ml-1.5 opacity-100' : 'max-w-0 ml-0 opacity-0'
            }`}
          >
            واتساب
          </span>
        </button>

        {/* TikTok Tab */}
        <button
          ref={(el) => {
            if (el) tabsRef.current.set('tiktok', el);
            else tabsRef.current.delete('tiktok');
          }}
          type="button"
          onClick={() => onTabChange('tiktok')}
          aria-current={activeTab === 'tiktok' ? 'page' : undefined}
          aria-label="تيك توك"
          className={`relative z-10 flex items-center justify-center h-12 rounded-full cursor-pointer transition-all duration-400 outline-none focus-visible:ring-2 focus-visible:ring-white/80 ${
            activeTab === 'tiktok'
              ? 'flex-1 text-[#ff3366] font-bold px-3.5'
              : 'w-11 text-white/70 hover:text-white'
          }`}
        >
          <svg className="w-5 h-5 shrink-0 fill-current" viewBox="0 0 24 24">
            <path d="M16.6 2.5h-3.3v12.4a2.5 2.5 0 1 1-2.5-2.5c.3 0 .5 0 .8.1V9.1a5.8 5.8 0 1 0 5 5.8V8.8c1.1.9 2.5 1.4 4 1.4V6.9c-2.1 0-3.7-1.7-4-4.4z" />
          </svg>
          <span
            className={`overflow-hidden whitespace-nowrap text-sm font-semibold transition-all duration-300 font-['Cairo'] ${
              activeTab === 'tiktok' ? 'max-w-[70px] ml-1.5 opacity-100' : 'max-w-0 ml-0 opacity-0'
            }`}
          >
            تيك توك
          </span>
        </button>

        {/* Pay Tab */}
        <button
          ref={(el) => {
            if (el) tabsRef.current.set('pay', el);
            else tabsRef.current.delete('pay');
          }}
          type="button"
          onClick={() => onTabChange('pay')}
          aria-current={activeTab === 'pay' ? 'page' : undefined}
          aria-label="الدفع"
          className={`relative z-10 flex items-center justify-center h-12 rounded-full cursor-pointer transition-all duration-400 outline-none focus-visible:ring-2 focus-visible:ring-white/80 ${
            activeTab === 'pay'
              ? 'flex-1 text-[#0a58ff] font-bold px-3.5'
              : 'w-11 text-white/70 hover:text-white'
          }`}
        >
          <svg className="w-5 h-5 shrink-0 fill-current" viewBox="0 0 24 24">
            <path
              fillRule="evenodd"
              d="M4 5h16a2 2 0 0 1 2 2v2H2V7a2 2 0 0 1 2-2zM2 11h20v6a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2zm3 3a1 1 0 0 0 0 2h4a1 1 0 0 0 0-2z"
            />
          </svg>
          <span
            className={`overflow-hidden whitespace-nowrap text-sm font-semibold transition-all duration-300 font-['Cairo'] ${
              activeTab === 'pay' ? 'max-w-[70px] ml-1.5 opacity-100' : 'max-w-0 ml-0 opacity-0'
            }`}
          >
            الدفع
          </span>
        </button>
      </nav>

      {/* Direct Call Button (Glass orb in dock) */}
      <a
        href={`tel:${CONTACT_INFO.phoneIntl}`}
        aria-label="اتصال هاتفي مباشر"
        title="اتصال هاتفي مباشر"
        className="relative shrink-0 w-14 h-14 sm:w-16 sm:h-16 rounded-full glass-dock flex items-center justify-center text-white bg-blue-600/70 hover:bg-blue-600/90 active:scale-95 transition-all duration-300 shadow-lg shadow-blue-500/25 group outline-none focus-visible:ring-2 focus-visible:ring-white/80 cursor-pointer"
      >
        <div className="absolute inset-0 rounded-full bg-blue-400/20 blur-md group-hover:bg-blue-400/40 transition-colors pointer-events-none" />
        <Phone className="w-6 h-6 relative z-10 stroke-[2.2] group-hover:rotate-12 transition-transform duration-300" />
      </a>
    </aside>
  );
};

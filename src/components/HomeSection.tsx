import React, { useState } from 'react';
import { TabType, CONTACT_INFO } from '../types';
import {
  Share2,
  Check,
  ArrowLeft,
  Sparkles,
  ShieldCheck,
  Zap,
  Phone,
  ExternalLink,
  MessageCircle,
  CreditCard,
  QrCode,
  Copy,
} from 'lucide-react';

interface HomeSectionProps {
  onNavigateTab: (tab: TabType) => void;
}

export const HomeSection: React.FC<HomeSectionProps> = ({
  onNavigateTab,
}) => {
  const [copiedLink, setCopiedLink] = useState(false);
  const [showQR, setShowQR] = useState(false);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Liquid Glass Hub - Yasser Mohamed',
          text: 'منصة التواصل السريع والدفع الإلكتروني المباشر',
          url: window.location.href,
        });
        return;
      } catch {
        // Fallback to copy
      }
    }

    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    } catch {
      // ignore
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6 sm:space-y-8 animate-fade-in">
      {/* Hero Profile Card */}
      <div className="glass-panel rounded-3xl p-6 sm:p-8 relative overflow-hidden">
        {/* Subtle decorative glowing corner */}
        <div className="absolute -top-16 -left-16 w-48 h-48 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-16 -right-16 w-48 h-48 bg-pink-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start gap-6 text-center md:text-right">
          {/* Avatar / Profile Graphic */}
          <div className="relative shrink-0">
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl glass-dock p-1 shadow-2xl flex items-center justify-center bg-gradient-to-tr from-blue-600/30 via-indigo-600/20 to-purple-600/30">
              <div className="w-full h-full rounded-xl bg-gradient-to-br from-blue-600 to-indigo-800 flex items-center justify-center text-white font-extrabold text-3xl shadow-inner font-sans tracking-tight">
                YM
              </div>
            </div>
            <span className="absolute -bottom-1 -right-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-500/90 text-white shadow-lg flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              متصل
            </span>
          </div>

          {/* Profile Details */}
          <div className="flex-1 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center justify-center md:justify-start gap-2">
                  <span>{CONTACT_INFO.ownerName}</span>
                  <ShieldCheck className="w-6 h-6 text-blue-400 shrink-0" />
                </h1>
                <p className="text-white/70 text-sm sm:text-base mt-1">
                  {CONTACT_INFO.role} • قنوات التواصل الرسمية وبوابة التحويل السريع
                </p>
              </div>

              {/* Share & QR Actions */}
              <div className="flex items-center justify-center gap-2">
                <button
                  type="button"
                  onClick={handleShare}
                  className="px-3.5 py-2 rounded-xl glass-dock text-xs sm:text-sm font-semibold text-white/90 hover:text-white flex items-center gap-1.5 active:scale-95 transition-all cursor-pointer"
                  title="مشاركة الرابط"
                >
                  {copiedLink ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
                  <span>{copiedLink ? 'تم النسخ' : 'مشاركة'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setShowQR(!showQR)}
                  className="p-2 rounded-xl glass-dock text-white/90 hover:text-white active:scale-95 transition-all cursor-pointer"
                  title="رمز QR"
                >
                  <QrCode className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Quick Badges / Highlights */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 pt-1 text-xs text-white/80">
              <span className="px-3 py-1 rounded-lg bg-white/10 backdrop-blur-sm border border-white/10 flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-amber-400" />
                استجابة فورية
              </span>
              <span className="px-3 py-1 rounded-lg bg-white/10 backdrop-blur-sm border border-white/10 flex items-center gap-1.5">
                <CreditCard className="w-3.5 h-3.5 text-blue-400" />
                تحويل إنستاباي ومحافظ
              </span>
              <span className="px-3 py-1 rounded-lg bg-white/10 backdrop-blur-sm border border-white/10 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-pink-400" />
                تيك توك وفيسبوك
              </span>
            </div>
          </div>
        </div>

        {/* QR Code Popup view if opened */}
        {showQR && (
          <div className="mt-6 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 bg-black/20 p-4 rounded-2xl">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 bg-white p-1.5 rounded-xl shrink-0 flex items-center justify-center">
                {/* SVG mock QR representation */}
                <div className="w-full h-full bg-slate-900 rounded flex flex-col justify-between p-1">
                  <div className="flex justify-between">
                    <div className="w-4 h-4 border-2 border-white rounded-xs bg-slate-900" />
                    <div className="w-4 h-4 border-2 border-white rounded-xs bg-slate-900" />
                  </div>
                  <div className="flex justify-center">
                    <div className="w-2 h-2 bg-white rounded-xs" />
                  </div>
                  <div className="flex justify-between">
                    <div className="w-4 h-4 border-2 border-white rounded-xs bg-slate-900" />
                    <div className="w-4 h-2 bg-white rounded-xs" />
                  </div>
                </div>
              </div>
              <div className="text-right">
                <h4 className="text-sm font-bold text-white">امسح الرمز بكاميرا هاتفك</h4>
                <p className="text-xs text-white/70 mt-0.5">افتح المنصة على أي هاتف فوراً أو شاركها مع الأصدقاء</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setShowQR(false)}
              className="text-xs text-white/60 hover:text-white px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 cursor-pointer"
            >
              إغلاق
            </button>
          </div>
        )}
      </div>

      {/* Main Tabs Navigation Grid: Each tab opens its dedicated section + contains a direct action transfer button */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <span>الأقسام الرئيسية وبوابات الانتقال</span>
          </h2>
          <span className="text-xs text-white/60">اضغط على أي قسم للاطلاع على التفاصيل والزر المباشر</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Facebook Card */}
          <div className="glass-panel rounded-2xl p-5 hover:border-blue-500/40 transition-all duration-300 group flex flex-col justify-between gap-4">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-blue-600/20 text-[#3b82f6] border border-blue-500/30 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                    <path d="M14 8h3V4.5h-3A4.5 4.5 0 0 0 9.5 9v2H7v3.5h2.5V22H13v-7.5h3l.5-3.5H13V9.2c0-.7.3-1.2 1-1.2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-white text-base group-hover:text-blue-400 transition-colors">
                    صفحة فيسبوك الرسمية
                  </h3>
                  <p className="text-xs text-white/70 mt-0.5">
                    متابعة المنشورات، التحديثات والمجتمع التفاعلي
                  </p>
                </div>
              </div>
              <span className="text-[11px] px-2 py-0.5 rounded-md bg-blue-500/10 text-blue-300 border border-blue-500/20">
                فيسبوك
              </span>
            </div>

            {/* Action buttons inside the card */}
            <div className="flex items-center gap-2 pt-2 border-t border-white/10">
              <button
                type="button"
                onClick={() => onNavigateTab('facebook')}
                className="flex-1 py-2 px-3 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <span>عرض قسم فيسبوك</span>
                <ArrowLeft className="w-3.5 h-3.5" />
              </button>

              <a
                href={CONTACT_INFO.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="py-2 px-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-md shadow-blue-600/30 active:scale-95 transition-all"
                title="الانتقال المباشر لفيسبوك"
              >
                <span>انتقال</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* WhatsApp Card */}
          <div className="glass-panel rounded-2xl p-5 hover:border-emerald-500/40 transition-all duration-300 group flex flex-col justify-between gap-4">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-emerald-600/20 text-[#22c55e] border border-emerald-500/30 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                    <path
                      fillRule="evenodd"
                      d="M12 2.5a9.5 9.5 0 0 0-8.2 14.3L2.5 21.5l4.8-1.26A9.5 9.5 0 1 0 12 2.5zM8.7 7.4c.3-.3.7-.3.9-.1l1 1.6c.1.2.1.4 0 .6l-.5.7c.6 1.1 1.5 2 2.7 2.6l.7-.6c.2-.2.4-.2.6-.1l1.7 1c.2.2.2.5 0 .9-.5.9-1.5 1.3-2.5 1-2.8-.8-5-3-5.7-5.6-.2-.9.2-1.7 1.1-2z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-white text-base group-hover:text-emerald-400 transition-colors">
                    محادثة واتساب الفورية
                  </h3>
                  <p className="text-xs text-white/70 mt-0.5">
                    تواصل مباشر وسريع على الرقم 01143298437
                  </p>
                </div>
              </div>
              <span className="text-[11px] px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                رد سريع
              </span>
            </div>

            {/* Action buttons */}
            <div className="flex items-center gap-2 pt-2 border-t border-white/10">
              <button
                type="button"
                onClick={() => onNavigateTab('whatsapp')}
                className="flex-1 py-2 px-3 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <span>عرض قسم واتساب</span>
                <ArrowLeft className="w-3.5 h-3.5" />
              </button>

              <a
                href={CONTACT_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="py-2 px-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-md shadow-emerald-600/30 active:scale-95 transition-all"
                title="فتح محادثة واتساب"
              >
                <span>محادثة</span>
                <MessageCircle className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* TikTok Card */}
          <div className="glass-panel rounded-2xl p-5 hover:border-pink-500/40 transition-all duration-300 group flex flex-col justify-between gap-4">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-pink-600/20 text-[#ff3366] border border-pink-500/30 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                    <path d="M16.6 2.5h-3.3v12.4a2.5 2.5 0 1 1-2.5-2.5c.3 0 .5 0 .8.1V9.1a5.8 5.8 0 1 0 5 5.8V8.8c1.1.9 2.5 1.4 4 1.4V6.9c-2.1 0-3.7-1.7-4-4.4z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-white text-base group-hover:text-pink-400 transition-colors">
                    حساب تيك توك
                  </h3>
                  <p className="text-xs text-white/70 mt-0.5">
                    مقاطع وشروحات تقنية مميزة ({CONTACT_INFO.tiktokHandle})
                  </p>
                </div>
              </div>
              <span className="text-[11px] px-2 py-0.5 rounded-md bg-pink-500/10 text-pink-300 border border-pink-500/20">
                فيديوهات
              </span>
            </div>

            {/* Action buttons */}
            <div className="flex items-center gap-2 pt-2 border-t border-white/10">
              <button
                type="button"
                onClick={() => onNavigateTab('tiktok')}
                className="flex-1 py-2 px-3 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <span>عرض قسم تيك توك</span>
                <ArrowLeft className="w-3.5 h-3.5" />
              </button>

              <a
                href={CONTACT_INFO.tiktokUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="py-2 px-3.5 rounded-xl bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-500 hover:to-rose-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-md shadow-pink-600/30 active:scale-95 transition-all"
                title="فتح حساب تيك توك"
              >
                <span>مشاهدة</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Payment Card */}
          <div className="glass-panel rounded-2xl p-5 hover:border-blue-400/50 transition-all duration-300 group flex flex-col justify-between gap-4">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-blue-600/20 text-[#3b82f6] border border-blue-400/30 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <CreditCard className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-base group-hover:text-blue-300 transition-colors">
                    بوابة الدفع والتحويل اللحظي
                  </h3>
                  <p className="text-xs text-white/70 mt-0.5">
                    إنستاباي (InstaPay) ومحفظة فودافون كاش
                  </p>
                </div>
              </div>
              <span className="text-[11px] px-2 py-0.5 rounded-md bg-blue-500/20 text-blue-200 border border-blue-400/30 font-bold">
                تحويل لحظي
              </span>
            </div>

            {/* Action buttons */}
            <div className="flex items-center gap-2 pt-2 border-t border-white/10">
              <button
                type="button"
                onClick={() => onNavigateTab('pay')}
                className="flex-1 py-2 px-3 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <span>عرض تفاصيل الدفع</span>
                <ArrowLeft className="w-3.5 h-3.5" />
              </button>

              <a
                href={CONTACT_INFO.instapayUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="py-2 px-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-md shadow-blue-600/30 active:scale-95 transition-all"
                title="الدفع عبر إنستاباي"
              >
                <span>إنستاباي</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

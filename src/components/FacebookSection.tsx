import React, { useState } from 'react';
import { CONTACT_INFO } from '../types';
import {
  ExternalLink,
  Copy,
  Check,
  Share2,
  Users,
  MessageSquare,
  ThumbsUp,
  Sparkles,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';

interface FacebookSectionProps {
  onBackToHome: () => void;
}

export const FacebookSection: React.FC<FacebookSectionProps> = ({ onBackToHome }) => {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(CONTACT_INFO.facebookUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'صفحة فيسبوك الرسمية - Yasser Mohamed',
          text: 'تابع الصفحة الرسمية على فيسبوك للحصول على أحدث الأخبار والخدمات',
          url: CONTACT_INFO.facebookUrl,
        });
      } catch {
        // user cancelled
      }
    } else {
      handleCopyLink();
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto space-y-6 animate-fade-in">
      {/* Breadcrumb / Back button */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={onBackToHome}
          className="text-xs text-white/70 hover:text-white flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
        >
          <ArrowRight className="w-4 h-4" />
          <span>العودة للرئيسية</span>
        </button>
        <span className="text-xs text-blue-400 font-semibold px-2.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/20">
          Facebook Official Page
        </span>
      </div>

      {/* Main Feature Glass Card */}
      <div className="glass-panel-heavy rounded-3xl p-6 sm:p-8 relative overflow-hidden">
        {/* Glow accent */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-6">
          {/* Header info */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-right">
            <div className="w-20 h-20 sm:w-22 sm:h-22 rounded-2xl bg-[#1877F2]/20 border border-[#1877F2]/40 text-[#1877F2] flex items-center justify-center p-3 shadow-xl shrink-0">
              <svg className="w-12 h-12 fill-current" viewBox="0 0 24 24">
                <path d="M14 8h3V4.5h-3A4.5 4.5 0 0 0 9.5 9v2H7v3.5h2.5V22H13v-7.5h3l.5-3.5H13V9.2c0-.7.3-1.2 1-1.2z" />
              </svg>
            </div>

            <div className="flex-1 space-y-1.5">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  الصفحة الرسمية على فيسبوك
                </h1>
                <ShieldCheck className="w-6 h-6 text-blue-400 shrink-0" />
              </div>
              <p className="text-white/70 text-sm sm:text-base leading-relaxed">
                انضم لمجتمعنا على فيسبوك لمتابعة أحدث المنشورات، التحديثات التقنية اليومية، والتواصل مع المتابعين.
              </p>
              <div className="text-xs text-blue-300 font-mono pt-1 break-all dir-ltr text-center sm:text-right">
                {CONTACT_INFO.facebookUrl}
              </div>
            </div>
          </div>

          {/* Primary Action Button (زرار الانتقال المباشر) */}
          <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-blue-900/40 via-blue-800/30 to-indigo-900/40 border border-blue-500/30 space-y-3">
            <div className="text-center sm:text-right">
              <h3 className="text-sm font-bold text-white flex items-center justify-center sm:justify-start gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>زر الانتقال المباشر للصفحة</span>
              </h3>
              <p className="text-xs text-white/60 mt-0.5">
                اضغط على الزر أدناه للانتقال وفتح صفحة فيسبوك مباشرة في تطبيقك أو المتصفح
              </p>
            </div>

            {/* The Main High-Impact Transfer CTA */}
            <a
              href={CONTACT_INFO.facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-base sm:text-lg flex items-center justify-center gap-3 shadow-xl shadow-blue-600/35 active:scale-[0.98] transition-all duration-200 group"
            >
              <svg className="w-6 h-6 fill-current group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
                <path d="M14 8h3V4.5h-3A4.5 4.5 0 0 0 9.5 9v2H7v3.5h2.5V22H13v-7.5h3l.5-3.5H13V9.2c0-.7.3-1.2 1-1.2z" />
              </svg>
              <span>الانتقال إلى صفحة فيسبوك الآن</span>
              <ExternalLink className="w-5 h-5 stroke-[2.4]" />
            </a>

            {/* Secondary Link actions */}
            <div className="flex items-center gap-2 pt-1">
              <button
                type="button"
                onClick={handleCopyLink}
                className="flex-1 py-2 px-3 rounded-lg bg-white/10 hover:bg-white/15 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'تم نسخ الرابط ✓' : 'نسخ رابط الصفحة'}</span>
              </button>

              <button
                type="button"
                onClick={handleShare}
                className="py-2 px-4 rounded-lg bg-white/10 hover:bg-white/15 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>مشاركة</span>
              </button>
            </div>
          </div>

          {/* Highlights Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 text-center sm:text-right space-y-1">
              <div className="w-8 h-8 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center mx-auto sm:mx-0">
                <ThumbsUp className="w-4 h-4" />
              </div>
              <h4 className="text-xs font-bold text-white">منشورات مستمرة</h4>
              <p className="text-[11px] text-white/60">محتوى مفيد وشروحات حصرية على مدار الأسبوع</p>
            </div>

            <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 text-center sm:text-right space-y-1">
              <div className="w-8 h-8 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center mx-auto sm:mx-0">
                <MessageSquare className="w-4 h-4" />
              </div>
              <h4 className="text-xs font-bold text-white">تفاعل ومراسلة</h4>
              <p className="text-[11px] text-white/60">إمكانية إرسال الرسائل والتواصل المباشر عبر مسنجر</p>
            </div>

            <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 text-center sm:text-right space-y-1">
              <div className="w-8 h-8 rounded-lg bg-sky-500/20 text-sky-400 flex items-center justify-center mx-auto sm:mx-0">
                <Users className="w-4 h-4" />
              </div>
              <h4 className="text-xs font-bold text-white">مجتمع نشط</h4>
              <p className="text-[11px] text-white/60">مشاركة الآراء والمناقشات في التعليقات</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

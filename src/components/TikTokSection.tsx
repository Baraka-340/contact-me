import React, { useState } from 'react';
import { CONTACT_INFO } from '../types';
import {
  ExternalLink,
  Copy,
  Check,
  Share2,
  Video,
  Flame,
  PlayCircle,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

interface TikTokSectionProps {
  onBackToHome: () => void;
}

export const TikTokSection: React.FC<TikTokSectionProps> = ({ onBackToHome }) => {
  const [copied, setCopied] = useState(false);

  const handleCopyHandle = async () => {
    try {
      await navigator.clipboard.writeText(CONTACT_INFO.tiktokHandle);
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
          title: 'حساب تيك توك - @baraka519',
          text: 'شاهد أحدث المقاطع والفيديوهات التقنية على تيك توك',
          url: CONTACT_INFO.tiktokUrl,
        });
      } catch {
        // user cancelled
      }
    } else {
      handleCopyHandle();
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto space-y-6 animate-fade-in">
      {/* Breadcrumb */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={onBackToHome}
          className="text-xs text-white/70 hover:text-white flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
        >
          <ArrowRight className="w-4 h-4" />
          <span>العودة للرئيسية</span>
        </button>
        <span className="text-xs text-pink-400 font-semibold px-2.5 py-1 rounded-full bg-pink-500/10 border border-pink-500/20">
          TikTok Channel
        </span>
      </div>

      {/* Main Feature Glass Card */}
      <div className="glass-panel-heavy rounded-3xl p-6 sm:p-8 relative overflow-hidden">
        {/* Glow accent */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-pink-600/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-600/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-6">
          {/* Header info */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-right">
            <div className="w-20 h-20 sm:w-22 sm:h-22 rounded-2xl bg-gradient-to-tr from-[#ff0050]/25 to-[#00f2fe]/25 border border-pink-500/30 text-white flex items-center justify-center p-3 shadow-xl shrink-0">
              <svg className="w-12 h-12 fill-current text-white" viewBox="0 0 24 24">
                <path d="M16.6 2.5h-3.3v12.4a2.5 2.5 0 1 1-2.5-2.5c.3 0 .5 0 .8.1V9.1a5.8 5.8 0 1 0 5 5.8V8.8c1.1.9 2.5 1.4 4 1.4V6.9c-2.1 0-3.7-1.7-4-4.4z" />
              </svg>
            </div>

            <div className="flex-1 space-y-1.5">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  قناة تيك توك الرسمية
                </h1>
                <span className="font-mono text-xs px-2.5 py-1 rounded-full bg-white/10 text-white/90 border border-white/15" dir="ltr">
                  {CONTACT_INFO.tiktokHandle}
                </span>
              </div>
              <p className="text-white/70 text-sm sm:text-base leading-relaxed">
                استمتع بمشاهدة مقاطع فيديو قصيرة، شروحات تقنية مبسطة، ومحتوى تفاعلي متجدد باستمرار.
              </p>

              {/* Handle copy button */}
              <div className="pt-2 flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <button
                  type="button"
                  onClick={handleCopyHandle}
                  className="p-1.5 px-3 rounded-xl bg-white/10 hover:bg-white/20 text-xs text-white/90 font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'تم نسخ المعرف (@baraka519)' : 'نسخ اسم المستخدم (@baraka519)'}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Primary Action Button (زرار الانتقال المباشر) */}
          <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-pink-950/40 via-purple-950/30 to-black/40 border border-pink-500/30 space-y-3">
            <div className="text-center sm:text-right">
              <h3 className="text-sm font-bold text-white flex items-center justify-center sm:justify-start gap-1.5">
                <Sparkles className="w-4 h-4 text-pink-400" />
                <span>زر الانتقال المباشر لتيك توك</span>
              </h3>
              <p className="text-xs text-white/60 mt-0.5">
                اضغط على الزر أدناه لفتح الحساب ومتابعة الفيديوهات على تطبيق تيك توك فوراً
              </p>
            </div>

            {/* The Main High-Impact Transfer CTA */}
            <a
              href={CONTACT_INFO.tiktokUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-[#ff0050] via-rose-500 to-[#9900ef] hover:opacity-95 text-white font-bold text-base sm:text-lg flex items-center justify-center gap-3 shadow-xl shadow-pink-600/35 active:scale-[0.98] transition-all duration-200 group"
            >
              <PlayCircle className="w-6 h-6 group-hover:scale-110 transition-transform" />
              <span>فتح حساب تيك توك ومشاهدة المقاطع</span>
              <ExternalLink className="w-5 h-5 stroke-[2.4]" />
            </a>

            {/* Secondary actions */}
            <div className="flex items-center gap-2 pt-1">
              <button
                type="button"
                onClick={handleShare}
                className="w-full py-2 px-3 rounded-lg bg-white/10 hover:bg-white/15 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>مشاركة القناة مع أصدقائك</span>
              </button>
            </div>
          </div>

          {/* Highlights Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 text-center sm:text-right space-y-1">
              <div className="w-8 h-8 rounded-lg bg-pink-500/20 text-pink-400 flex items-center justify-center mx-auto sm:mx-0">
                <Video className="w-4 h-4" />
              </div>
              <h4 className="text-xs font-bold text-white">فيديوهات قصيرة</h4>
              <p className="text-[11px] text-white/60">أفكار سريعة وشروحات بدون إطالة</p>
            </div>

            <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 text-center sm:text-right space-y-1">
              <div className="w-8 h-8 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center mx-auto sm:mx-0">
                <Flame className="w-4 h-4" />
              </div>
              <h4 className="text-xs font-bold text-white">ترندات ومعلومات</h4>
              <p className="text-[11px] text-white/60">أحدث الأخبار والحلول التقنية الذكية</p>
            </div>

            <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 text-center sm:text-right space-y-1">
              <div className="w-8 h-8 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center mx-auto sm:mx-0">
                <Sparkles className="w-4 h-4" />
              </div>
              <h4 className="text-xs font-bold text-white">تفاعل ومتابعة</h4>
              <p className="text-[11px] text-white/60">الرد على التعليقات ومشاركة الاستفسارات</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

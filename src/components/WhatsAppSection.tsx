import React, { useState } from 'react';
import { CONTACT_INFO } from '../types';
import {
  MessageCircle,
  Copy,
  Check,
  ExternalLink,
  ArrowRight,
  Send,
} from 'lucide-react';

interface WhatsAppSectionProps {
  onBackToHome: () => void;
}

const TEMPLATES = [
  'السلام عليكم ورحمة الله، أود الاستفسار عن تفاصيل الخدمات المتاحة.',
  'مرحباً، قمت بعملية تحويل مالي وأود إرسال صورة الإيصال لتأكيد الاستلام.',
  'السلام عليكم، أحتاج استشارة تقنية عاجلة، متى يكون الوقت المناسب للاتصال؟',
];

export const WhatsAppSection: React.FC<WhatsAppSectionProps> = ({
  onBackToHome,
}) => {
  const [selectedMessage, setSelectedMessage] = useState(TEMPLATES[0]);
  const [customText, setCustomText] = useState('');
  const [isCustom, setIsCustom] = useState(false);
  const [copiedNumber, setCopiedNumber] = useState(false);

  const activeMessage = isCustom ? customText : selectedMessage;
  const whatsappUrlWithMsg = `https://wa.me/201143298437?text=${encodeURIComponent(activeMessage)}`;

  const handleCopyNumber = async () => {
    try {
      await navigator.clipboard.writeText(CONTACT_INFO.phone);
      setCopiedNumber(true);
      setTimeout(() => setCopiedNumber(false), 2000);
    } catch {
      // ignore
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
        <span className="text-xs text-emerald-400 font-semibold px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
          WhatsApp Direct Chat
        </span>
      </div>

      {/* Main Feature Glass Card */}
      <div className="glass-panel-heavy rounded-3xl p-6 sm:p-8 relative overflow-hidden">
        {/* Glow accent */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-600/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-6">
          {/* Header info */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-right">
            <div className="w-20 h-20 sm:w-22 sm:h-22 rounded-2xl bg-[#25D366]/20 border border-[#25D366]/40 text-[#25D366] flex items-center justify-center p-3 shadow-xl shrink-0">
              <svg className="w-12 h-12 fill-current" viewBox="0 0 24 24">
                <path
                  fillRule="evenodd"
                  d="M12 2.5a9.5 9.5 0 0 0-8.2 14.3L2.5 21.5l4.8-1.26A9.5 9.5 0 1 0 12 2.5zM8.7 7.4c.3-.3.7-.3.9-.1l1 1.6c.1.2.1.4 0 .6l-.5.7c.6 1.1 1.5 2 2.7 2.6l.7-.6c.2-.2.4-.2.6-.1l1.7 1c.2.2.2.5 0 .9-.5.9-1.5 1.3-2.5 1-2.8-.8-5-3-5.7-5.6-.2-.9.2-1.7 1.1-2z"
                />
              </svg>
            </div>

            <div className="flex-1 space-y-1.5">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  محادثة واتساب المباشرة
                </h1>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold border border-emerald-500/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  متاح للرد
                </span>
              </div>
              <p className="text-white/70 text-sm sm:text-base leading-relaxed">
                تواصل مباشر وسريع دون الحاجة لتسجيل الرقم مسبقاً، يمكنك اختيار رسالة جاهزة أو كتابة رسالتك فوراً.
              </p>

              {/* Number display with quick copy */}
              <div className="pt-2 flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <div className="font-mono text-base font-bold text-emerald-300 px-3 py-1 rounded-xl bg-black/30 border border-emerald-500/30" dir="ltr">
                  {CONTACT_INFO.phone}
                </div>
                <button
                  type="button"
                  onClick={handleCopyNumber}
                  className="p-1.5 px-3 rounded-xl bg-white/10 hover:bg-white/20 text-xs text-white/90 font-medium flex items-center gap-1 transition-colors cursor-pointer"
                >
                  {copiedNumber ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedNumber ? 'تم نسخ الرقم' : 'نسخ'}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Quick Message Picker */}
          <div className="p-4 sm:p-5 rounded-2xl bg-black/20 border border-white/10 space-y-3">
            <label className="block text-xs font-bold text-white/80">
              اختر نص الرسالة لبدء المحادثة أو اكتب رسالتك:
            </label>

            <div className="grid grid-cols-1 gap-2">
              {TEMPLATES.map((tpl, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => {
                    setIsCustom(false);
                    setSelectedMessage(tpl);
                  }}
                  className={`text-right p-3 rounded-xl text-xs sm:text-sm transition-all duration-200 border cursor-pointer ${
                    !isCustom && selectedMessage === tpl
                      ? 'bg-emerald-500/20 border-emerald-500/60 text-white font-medium shadow-sm'
                      : 'bg-white/5 border-white/5 text-white/70 hover:bg-white/10'
                  }`}
                >
                  {tpl}
                </button>
              ))}

              <button
                type="button"
                onClick={() => setIsCustom(true)}
                className={`text-right p-3 rounded-xl text-xs sm:text-sm transition-all duration-200 border cursor-pointer ${
                  isCustom
                    ? 'bg-emerald-500/20 border-emerald-500/60 text-white font-medium'
                    : 'bg-white/5 border-white/5 text-white/70 hover:bg-white/10'
                }`}
              >
                ✏️ كتابة نص مخصص من عندك...
              </button>
            </div>

            {isCustom && (
              <div className="pt-2">
                <textarea
                  value={customText}
                  onChange={(e) => setCustomText(e.target.value)}
                  placeholder="اكتب رسالتك هنا ليتم إرسالها فور فتح واتساب..."
                  rows={3}
                  className="w-full p-3 rounded-xl bg-white/5 border border-white/15 text-white text-xs sm:text-sm placeholder:text-white/40 focus:outline-none focus:border-emerald-500"
                />
              </div>
            )}
          </div>

          {/* Primary Action Button (زرار الانتقال المباشر) */}
          <div className="space-y-3 pt-1">
            <a
              href={whatsappUrlWithMsg}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-base sm:text-lg flex items-center justify-center gap-3 shadow-xl shadow-emerald-600/35 active:scale-[0.98] transition-all duration-200 group"
            >
              <Send className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              <span>بدء محادثة واتساب الفورية الآن</span>
              <ExternalLink className="w-5 h-5 stroke-[2.4]" />
            </a>

            <div className="text-center text-xs text-white/60">
              <span>* سيتم فتح تطبيق واتساب فوراً مع الرسالة المختارة</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

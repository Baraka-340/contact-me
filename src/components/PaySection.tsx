import React, { useState } from 'react';
import { CONTACT_INFO } from '../types';
import {
  CreditCard,
  Copy,
  Check,
  ExternalLink,
  ArrowRight,
  ShieldCheck,
  Zap,
  Smartphone,
  Wallet,
  MessageCircle,
  HelpCircle,
} from 'lucide-react';

interface PaySectionProps {
  onBackToHome: () => void;
  onNavigateTab: (tab: any) => void;
}

export const PaySection: React.FC<PaySectionProps> = ({ onBackToHome, onNavigateTab }) => {
  const [copiedWallet, setCopiedWallet] = useState(false);
  const [copiedInstapay, setCopiedInstapay] = useState(false);
  const [amount, setAmount] = useState('');

  const handleCopyWallet = async () => {
    try {
      await navigator.clipboard.writeText(CONTACT_INFO.walletNumber);
      setCopiedWallet(true);
      setTimeout(() => setCopiedWallet(false), 2000);
    } catch {
      // ignore
    }
  };

  const handleCopyInstapay = async () => {
    try {
      await navigator.clipboard.writeText(CONTACT_INFO.instapayAddress);
      setCopiedInstapay(true);
      setTimeout(() => setCopiedInstapay(false), 2000);
    } catch {
      // ignore
    }
  };

  // Generate confirmation message link for WhatsApp
  const confirmMsg = amount
    ? `السلام عليكم، قمت بتحويل مبلغ ${amount} ج.م، يرجى تأكيد استلام المعاملة.`
    : `السلام عليكم، قمت بتحويل مالي، يرجى تأكيد استلام المعاملة ومرفق تفاصيل الإيصال.`;
  const confirmWhatsappUrl = `https://wa.me/201143298437?text=${encodeURIComponent(confirmMsg)}`;

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
        <span className="text-xs text-blue-400 font-semibold px-2.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center gap-1">
          <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
          معاملات دفع فورية وآمنة
        </span>
      </div>

      {/* Main Container */}
      <div className="space-y-6">
        {/* Section 1: InstaPay Card */}
        <div className="glass-panel-heavy rounded-3xl p-6 sm:p-8 relative overflow-hidden border border-blue-500/30">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 space-y-5">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-blue-600/20 border border-blue-400/40 text-blue-400 flex items-center justify-center shrink-0">
                  <Zap className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                    <span>إنستاباي (InstaPay)</span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 font-normal">
                      تحويل فوري
                    </span>
                  </h2>
                  <p className="text-xs sm:text-sm text-white/70">
                    أسرع وسيلة تحويل بين الحسابات البنكية المصرية والبطاقات ميزة
                  </p>
                </div>
              </div>
            </div>

            {/* Address Box */}
            <div className="p-4 rounded-2xl bg-black/30 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="text-center sm:text-right">
                <span className="text-xs text-white/60 block">عنوان الدفع اللحظي (IPA)</span>
                <span className="font-mono text-lg sm:text-xl font-bold text-blue-300 tracking-wide dir-ltr block select-all">
                  {CONTACT_INFO.instapayAddress}
                </span>
              </div>

              <button
                type="button"
                onClick={handleCopyInstapay}
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs sm:text-sm font-bold text-white flex items-center justify-center gap-1.5 transition-all cursor-pointer"
              >
                {copiedInstapay ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                <span>{copiedInstapay ? 'تم نسخ العنوان ✓' : 'نسخ عنوان إنستاباي'}</span>
              </button>
            </div>

            {/* Main Action Transfer Button (زرار الانتقال المباشر لإنستاباي) */}
            <div className="space-y-2">
              <a
                href={CONTACT_INFO.instapayUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-base sm:text-lg flex items-center justify-center gap-3 shadow-xl shadow-blue-600/35 active:scale-[0.98] transition-all duration-200 group"
              >
                <Zap className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span>الانتقال للدفع المباشر عبر إنستاباي</span>
                <ExternalLink className="w-5 h-5 stroke-[2.4]" />
              </a>
              <p className="text-center text-[11px] text-white/50">
                Powered by InstaPay Egypt • يمكنك فتح الرابط مباشرة من هاتفك
              </p>
            </div>
          </div>
        </div>

        {/* Section 2: Electronic Wallet (Vodafone Cash) Card */}
        <div className="glass-panel-heavy rounded-3xl p-6 sm:p-8 relative overflow-hidden border border-emerald-500/30">
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-600/15 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 space-y-5">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-emerald-600/20 border border-emerald-400/40 text-emerald-400 flex items-center justify-center shrink-0">
                  <Wallet className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                    <span>المحفظة الإلكترونية</span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-normal">
                      فودافون كاش وكافة المحافظ
                    </span>
                  </h2>
                  <p className="text-xs sm:text-sm text-white/70">
                    استقبل التحويل من محافظ (فودافون، أورنج، اتصالات، وي، والمحافظ البنكية الذكية)
                  </p>
                </div>
              </div>
            </div>

            {/* Wallet Number Box */}
            <div className="p-4 rounded-2xl bg-black/30 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="text-center sm:text-right">
                <span className="text-xs text-white/60 block">رقم المحفظة الإلكترونية</span>
                <span className="font-mono text-2xl font-bold text-emerald-300 tracking-wider dir-ltr block select-all">
                  {CONTACT_INFO.walletNumber}
                </span>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={handleCopyWallet}
                  className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs sm:text-sm font-bold text-white flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                >
                  {copiedWallet ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  <span>{copiedWallet ? 'تم نسخ الرقم ✓' : 'نسخ رقم المحفظة'}</span>
                </button>

                {/* USSD Dial button for Vodafone Cash users */}
                <a
                  href={`tel:*9*7*${CONTACT_INFO.walletNumber}#`}
                  className="px-3.5 py-2.5 rounded-xl bg-emerald-600/30 hover:bg-emerald-600/50 text-emerald-300 text-xs font-bold border border-emerald-500/40 flex items-center gap-1 transition-all"
                  title="كود تحويل فودافون كاش السريع"
                >
                  <Smartphone className="w-4 h-4" />
                  <span>كود التحويل</span>
                </a>
              </div>
            </div>

            {/* Instructions */}
            <div className="p-4 rounded-xl bg-white/5 border border-white/5 text-xs text-white/70 space-y-2">
              <div className="font-semibold text-white flex items-center gap-1.5">
                <HelpCircle className="w-3.5 h-3.5 text-emerald-400" />
                <span>كيفية التحويل من أي محفظة إلكترونية:</span>
              </div>
              <ol className="list-decimal list-inside space-y-1 text-white/60 pr-1">
                <li>افتح تطبيق محفظتك (أو اطلب كود المحفظة الخاص بشركتك).</li>
                <li>اختر "تحويل أموال" ثم أدخل رقم المستلم: <strong className="text-white font-mono">{CONTACT_INFO.walletNumber}</strong></li>
                <li>حدد المبلغ المطلوب وأدخل الرقم السري لتأكيد التحويل.</li>
                <li>احتفظ بلقطة شاشة أو كود الإيصال لتأكيد الدفع.</li>
              </ol>
            </div>
          </div>
        </div>

        {/* Section 3: Transfer Confirmation Card (إرسال إشعار الدفع عبر واتساب) */}
        <div className="glass-panel rounded-2xl p-5 border border-white/10 space-y-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-right">
            <div>
              <h3 className="font-bold text-white text-sm sm:text-base flex items-center justify-center sm:justify-start gap-2">
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span>تأكيد عملية التحويل وإرسال الإيصال</span>
              </h3>
              <p className="text-xs text-white/60 mt-0.5">
                بعد إتمام التحويل، يمكنك إرسال إشعار فوري عبر واتساب لتأكيد الاستلام
              </p>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="number"
                placeholder="المبلغ (اختياري)"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-28 px-3 py-1.5 rounded-xl bg-white/10 border border-white/15 text-xs text-white text-center focus:outline-none focus:border-emerald-500"
              />
              <span className="text-xs text-white/60">ج.م</span>
            </div>
          </div>

          <a
            href={confirmWhatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/25 active:scale-95 transition-all"
          >
            <MessageCircle className="w-4 h-4" />
            <span>إرسال إشعار وتأكيد التحويل عبر واتساب</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
};

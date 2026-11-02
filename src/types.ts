export type TabType = 'home' | 'facebook' | 'whatsapp' | 'tiktok' | 'pay';

export interface TabItem {
  id: TabType;
  labelAr: string;
  labelEn: string;
  brandColor: string;
  externalUrl?: string;
  badge?: string;
}

export const TABS_CONFIG: TabItem[] = [
  {
    id: 'home',
    labelAr: 'الرئيسية',
    labelEn: 'home',
    brandColor: '#3b82f6',
  },
  {
    id: 'facebook',
    labelAr: 'فيسبوك',
    labelEn: 'facebook',
    brandColor: '#1877F2',
    externalUrl: 'https://www.facebook.com/share/1JymU3QfNJ/',
  },
  {
    id: 'whatsapp',
    labelAr: 'واتساب',
    labelEn: 'whatsapp',
    brandColor: '#25D366',
    externalUrl: 'https://wa.me/201143298437',
  },
  {
    id: 'tiktok',
    labelAr: 'تيك توك',
    labelEn: 'tiktok',
    brandColor: '#ff0050',
    externalUrl: 'https://www.tiktok.com/@baraka519',
  },
  {
    id: 'pay',
    labelAr: 'الدفع',
    labelEn: 'pay',
    brandColor: '#0a58ff',
    badge: 'فوري',
  },
];

export const CONTACT_INFO = {
  phone: '01143298437',
  phoneIntl: '+201143298437',
  walletNumber: '01030365646',
  instapayAddress: 'yasser1241@instapay',
  instapayUrl: 'https://ipn.eg/S/yasser1241/instapay/4PxAKc',
  facebookUrl: 'https://www.facebook.com/share/1JymU3QfNJ/',
  whatsappUrl: 'https://wa.me/201143298437',
  tiktokUrl: 'https://www.tiktok.com/@baraka519',
  tiktokHandle: '@baraka519',
  ownerName: 'Yasser Mohamed',
  role: 'الحساب الرسمي • تواصل ودفع فوري',
};

export type TabType = 'new' | 'processing' | 'completed';

export interface Order {
  id: string;
  patientName: string;
  hospitalName: string;
  bloodType: string;
  bagsCount: number;
  status: 'عادي' | 'عاجل جداً' | 'جاري المعالجة' | 'تم التسليم' | 'مرفوض' | 'جاري التجهيز';
  time: string;
  createdAt?: string; // مثال: "2026-03-15T10:30:00Z"
}
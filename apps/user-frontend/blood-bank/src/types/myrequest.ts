// 1. تعريف أنواع البيانات (Interfaces)
export interface Order {
  id: string;
  hospital: string;
  status: string;
  date: string;
  type: 'success' | 'cancelled' | 'pending';
  bloodType: string;
  reason?: string;
}

// 1. تغيير اسم الـ interface إلى BloodRequest ليكون أكثر دقة
export interface BloodRequest {
  id: string;
  hospital: string;
  status: string;
  time: string;
  bloodType: string;
  progress: number; 
  currentStep: 'طلب' | 'موافقة' | 'تجهيز' | 'استلام' | 'مراجعة' | 'جاهز';
  color: 'emerald' | 'orange' | 'blue';
  address?: string;
}
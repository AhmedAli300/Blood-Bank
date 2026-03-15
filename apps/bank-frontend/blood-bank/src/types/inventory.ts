export type StockStatus = 'الكل' | 'متاح' | 'قارب الانتهاء' | 'منتهي';

export interface BloodStock {
  id: string;
  type: string; // مثال: +A
  label: string; // فصيلة A إيجابي
  balance: number;
  status: StockStatus;
  note?: string; // ملاحظات مثل "12 كيس تنتهي صلاحيتها..."
}
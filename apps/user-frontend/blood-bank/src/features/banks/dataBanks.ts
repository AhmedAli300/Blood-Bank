export const bloodBanks = [
  { id: 1, name: "بنك الدم الإقليمي", location: "العباسية، القاهرة", distance: "2.5 كم", rating: 4.8, status: "available", bags: 5 },
  { id: 2, name: "مستشفى دار الشفاء", location: "العباسية، بجوار المترو", distance: "3.8 كم", rating: 4.2, status: "limited", bags: 2 },
  { id: 3, name: "بنك الشروق للدم", location: "مدينة نصر", distance: "7.1 كم", rating: 4.5, status: "unavailable", bags: 0 },
];
 
export const bloodTypes = ["O+", "O-", "A+", "A-", "B+", "B-", "AB+", "AB-"];
    


interface BloodStock {
  type: string;
  bags: number;
  status: 'available' | 'unavailable'; // تحديد القيم المسموحة فقط
}


export const bloodTypeItem :BloodStock[] = [
    { type: 'A+', bags: 12, status: 'available' },
    { type: 'A-', bags: 5, status: 'available' },
    { type: 'B+', bags: 8, status: 'available' },
    { type: 'B-', bags: 0, status: 'unavailable' },
    { type: 'O+', bags: 2, status: 'available' },
    { type: 'O-', bags: 0, status: 'unavailable' },
    { type: 'AB+', bags: 4, status: 'available' },
    { type: 'AB-', bags: 1, status: 'available' },
  ];
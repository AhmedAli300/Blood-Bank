import { ReactNode } from "react";

export interface MenuItem {
  id: number;
  url: string;
  label: string;
  icon: ReactNode; // نستخدم ReactNode لأن الأيقونة عبارة عن Component
  badge?: number;  
}
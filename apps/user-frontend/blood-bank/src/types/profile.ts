export interface MenuItem {
  id: number;
  title: string;
  icon: React.ReactNode;
  urle: string; // تأكد أنها ليست url?: string
}
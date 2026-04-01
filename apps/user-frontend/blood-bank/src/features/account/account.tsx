import { MenuItem } from "@/types/profile"
import { useState } from "react";
import { MdAddBox, MdOutlineHistory, MdOutlineNotificationsNone, MdOutlinePayments, MdOutlineSecurity } from "react-icons/md";

export const menuItems: MenuItem[] = [
            { id: 1, title: 'طرق الدفع', urle: "account/payment", icon: <MdOutlinePayments size={24} className="text-[#10B981]" /> },
            { id: 2, title: 'تاريخ التبرع',urle: "account/donation-history", icon: <MdOutlineHistory size={24} className="text-[#10B981]" /> },
            { id: 3, title: 'التنبيهات',urle: "account/alerts", icon: <MdOutlineNotificationsNone size={24} className="text-[#10B981]" /> },
            { id: 4, title: 'الأمان والخصوصية',urle: "account/setting", icon: <MdOutlineSecurity size={24} className="text-[#10B981]" /> },
          ];





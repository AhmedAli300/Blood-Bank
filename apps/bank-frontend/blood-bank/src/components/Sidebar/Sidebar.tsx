"use client";
import { MenuItem } from "@/types/Sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation"; // استيراد hook المسارات
import { BsDropletHalf } from "react-icons/bs";
import { LuLayoutDashboard, LuBoxes, LuBell, LuSettings, LuLogOut } from "react-icons/lu";
import { RiHomeHeartFill } from "react-icons/ri";
import { TbReportSearch } from "react-icons/tb";

const Sidebar = () => {
  const pathname = usePathname();

  const menuItems:MenuItem[] = [
      { id: 1, url: "/home", label: "الرئيسية", icon: <RiHomeHeartFill size={22} /> },
    { id: 2, url: "/requests", label: "الطلبات", icon: <LuLayoutDashboard size={22} /> },
    { id: 3, url: "/inventory", label: "المخزون", icon: <LuBoxes size={22} /> },
    { id: 4, url: "/setting", label: "التنبيهات", icon: <LuBell size={22} />, badge: 3 },
    { id: 5, url: "/reports", label: "التقارير", icon: <TbReportSearch size={22} /> },
    { id: 6, url: "/setting", label: "الإعدادات", icon: <LuSettings size={22} /> },
  ];

  return (
    <aside className="fixed right-0 top-0 h-screen w-64 bg-white border-l border-gray-100 flex flex-col z-50">
      
      {/* اللوجو */}
      <div className="p-8 flex items-center justify-start gap-2 text-[#3B71F3]">
         <div className="bg-[#3B71F3] p-1.5 rounded-lg text-white">
            <BsDropletHalf size={20} />
         </div>
         <span className="font-bold text-xl">بنك الدم</span>
      </div>

      {/* القائمة الجانبية */}
      <nav className="flex-1 px-4 space-y-2">
        {menuItems.map((item) => {
          const isActive = pathname.startsWith(item.url);

          return (
            <Link
              href={item.url}
              key={item.id}
              className={`w-full flex items-center justify-between p-3 rounded-xl transition-all duration-200 ${
                isActive 
                  ? "bg-[#EBF1FF] text-[#3B71F3] font-bold shadow-sm" 
                  : "text-gray-400 hover:bg-gray-50 hover:text-gray-600"
              }`}
            >
              <div className="flex items-center gap-3">
                <span className={isActive ? "text-[#3B71F3]" : "text-gray-400"}>
                    {item.icon}
                </span>
                <span className="text-sm">{item.label}</span>
              </div>
              
              {item.badge && (
                <span className="bg-red-500 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full font-normal">
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* الملف الشخصي */}
      <div className="p-4 border-t border-gray-50 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 font-bold">
            ل
          </div>
          <div className="text-right">
            <p className="text-sm font-bold text-gray-800 leading-tight">أحمد محمود</p>
            <p className="text-[10px] text-gray-400">مدير النظام</p>
          </div>
        </div>
        <button className="text-gray-400 hover:text-red-500 transition-colors">
          <LuLogOut size={20} />
        </button>
      </div>

    </aside>
  );
};

export default Sidebar;
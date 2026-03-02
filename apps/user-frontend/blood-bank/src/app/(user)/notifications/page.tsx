"use client";

import React, { useState } from 'react';
import { 
  MdDoneAll, 
  MdCheckCircle, 
  MdError, 
  MdNotifications, 
  MdCampaign,
  MdAccessTime
} from 'react-icons/md';

const NotificationsPage = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'unread'>('all');
  
  // الحالة تبدأ بـ 3 رسائل كما طلبت
  const [visiblePreviousCount, setVisiblePreviousCount] = useState(3);

  const newNotifications = [
    {
      id: 1,
      title: "الدم جاهز للاستلام",
      desc: "كيس الدم الخاص بطلبك رقم #4589 تم تجهيزه بنجاح وهو جاهز للاستلام من بنك الدم المركزي بالدقي.",
      time: "منذ ١٥ دقيقة",
      type: "success",
      isRead: false
    },
    {
      id: 2,
      title: "تم قبول طلبك",
      desc: "وافقت مستشفى دار الشفاء على طلب التبرع رقم #1234. يرجى التوجه للمستشفى في الموعد المحدد.",
      time: "منذ ساعتين",
      type: "info",
      isRead: false
    }
  ];

  // مصفوفة "سابقاً" تحتوي الآن على 9 رسائل متنوعة
  const previousNotifications = [
    { id: 3, title: "توفر فصيلة نادرة", desc: "فصيلة الدم O- أصبحت متاحة الآن بكميات محدودة في بنك الدم المركزي.", time: "أمس", type: "alert", isRead: true },
    { id: 4, title: "تنبيه بخصوص العينة", desc: "حدثت مشكلة تقنية أثناء فحص العينة رقم #9988. يرجى التواصل مع الدعم.", time: "منذ ٣ أيام", type: "warning", isRead: true },
    { id: 5, title: "حملة تبرع جديدة", desc: "انضم إلينا في حملة التبرع الكبرى بميدان التحرير يوم الجمعة القادم.", time: "الأسبوع الماضي", type: "campaign", isRead: true },
    { id: 6, title: "تذكير بالتبرع الدوري", desc: "لقد مر 3 أشهر على آخر تبرع لك، يمكنك الآن المساهمة في إنقاذ حياة جديدة.", time: "منذ أسبوعين", type: "info", isRead: true },
    { id: 7, title: "نتائج التحاليل", desc: "نتائج تحاليل تبرعك الأخير جاهزة الآن، يمكنك الاطلاع عليها من قسم التقارير.", time: "منذ شهر", type: "success", isRead: true },
    { id: 8, title: "شكر وتقدير", desc: "بفضل تبرعك، تم إنقاذ حياة مريض في حالة حرجة. شكراً لكونك بطلاً.", time: "منذ شهر", type: "success", isRead: true },
    { id: 9, title: "تحديث شروط التبرع", desc: "تم تحديث البروتوكول الطبي الخاص بمعايير قبول المتبرعين، يرجى المراجعة.", time: "منذ شهرين", type: "warning", isRead: true },
    { id: 10, title: "مركز تبرع جديد", desc: "تم افتتاح فرع جديد لبنك الدم في منطقة التجمع الخامس لخدمتكم بشكل أسرع.", time: "منذ ٣ أشهر", type: "campaign", isRead: true },
    { id: 11, title: "عروض الشركاء", desc: "احصل على خصم 20% في المختبرات الطبية الشريكة بمجرد إظهار بطاقة المتبرع.", time: "منذ ٣ أشهر", type: "alert", isRead: true },
  ];

  // دالة تحميل المزيد لإظهار باقي الـ 9 رسائل
  const handleLoadMore = () => {
    setVisiblePreviousCount(all => all + 3); // سيضيف الـ 6 المتبقين ليصبح المجموع 9
  };

  return (
    <div className="min-h-screen bg-gray-50/50 py-10 px-4 flex flex-col items-center" dir="rtl">
      
      {/* Header */}
      <div className="w-full max-w-[93%] mx-auto flex justify-between  mb-8">
        <h1 className="text-2xl font-bold text-gray-800">الإشعارات</h1>
        {/* <button className="flex items-center gap-1 text-emerald-600 text-sm font-medium hover:opacity-80 transition-opacity">
          <MdDoneAll size={18} />
          تحديد الكل كمقروء
        </button> */}
      {/* Tabs */}
      {/* <div className="w-full max-w-[93%]"> */}

      <div className="bg-gray-200/50 p-1  rounded-xl flex   w-full max-w-sm  gap-1 mb-1  border border-gray-100">
        <button 
          onClick={() => setActiveTab('all')}
          className={`flex-1 max-w-sm py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'all' ? 'bg-white shadow-sm text-gray-800' : 'text-gray-400 hover:text-gray-600'}`}
        >
          الكل
        </button>
        <button 
          onClick={() => setActiveTab('unread')}
          className={`flex-1  max-w-sm py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'unread' ? 'bg-white shadow-sm text-gray-800' : 'text-gray-400 hover:text-gray-600'}`}
        >
          غير مقروء
        </button>
      </div>
      {/* </div> */}
      </div>


      <div className="w-full max-w-[93%] mx-auto space-y-8">
        
        {/* قسم الجديد - يظهر فقط في تبويب الكل */}
        {activeTab === 'all' && (
          <section>
            <div className="flex items-center gap-2 mb-4">
              <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
              <h2 className="text-sm font-bold text-gray-800">جديد</h2>
            </div>
            <div className="space-y-4">
              {newNotifications.map(notification => (
                <NotificationCard key={notification.id} {...notification} showDot={true} />
              ))}
            </div>
          </section>
        )}

        {/* قسم غير المقروء - يظهر عند الضغط على تبويب غير مقروء */}
        {activeTab === 'unread' && (
          <section className="space-y-4">
             {/* هنا يتم عرض الرسائل الجديدة فقط لأنها غير مقروءة */}
             {newNotifications.map(notification => (
                <NotificationCard key={notification.id} {...notification} showDot={true} />
              ))}
          </section>
        )}

        {/* قسم "سابقاً" - يظهر فقط في تبويب "الكل" كما طلبت */}
        {activeTab === 'all' && (
          <section className="pt-4">
            <h2 className="text-sm font-bold text-gray-400 mb-4 mr-2">سابقاً</h2>
            <div className="space-y-4">
              {previousNotifications.slice(0, visiblePreviousCount).map(notification => (
                <NotificationCard key={notification.id} {...notification} showDot={false} />
              ))}
            </div>
            
            {/* زر تحميل المزيد - يظهر إذا كان هناك رسائل متبقية من الـ 9 */}
            {visiblePreviousCount < previousNotifications.length && (
              <button 
                onClick={handleLoadMore}
                className="w-full mt-8 py-3 bg-white border border-gray-100 rounded-xl text-sm font-bold text-gray-500 hover:bg-gray-50 transition-all shadow-sm flex items-center justify-center gap-2 active:scale-[0.98]"
              >
                تحميل المزيد من الإشعارات
              </button>
            )}
          </section>
        )}

        {/* في حال عدم وجود إشعارات غير مقروءة */}
        {activeTab === 'unread' && newNotifications.length === 0 && (
          <div className="text-center py-20 bg-white rounded-[32px] border border-dashed border-gray-100">
             <MdNotifications size={48} className="mx-auto text-gray-100 mb-4" />
             <p className="text-gray-400 font-medium">لا توجد إشعارات جديدة</p>
          </div>
        )}
      </div>
    </div>
  );
};

// مكون البطاقة (Card Component)
const NotificationCard = ({ title, desc, time, type, showDot }: any) => {
  const icons: any = {
    success: <MdCheckCircle className="text-emerald-500" size={24} />,
    info: <div className="p-1 bg-blue-50 text-blue-500 rounded-full"><MdNotifications size={20} /></div>,
    alert: <div className="p-1 bg-purple-50 text-purple-500 rounded-full"><MdNotifications size={20} /></div>,
    warning: <MdError className="text-orange-400" size={24} />,
    campaign: <div className="p-1 bg-gray-50 text-gray-400 rounded-full"><MdCampaign size={20} /></div>
  };

  return (
    <div className="bg-white p-5 rounded-[22px] shadow-sm border border-gray-50 flex items-start gap-4 hover:shadow-md transition-all group cursor-pointer animate-in fade-in slide-in-from-bottom-2">
      <div className="mt-1">
        {icons[type] || icons.info}
      </div>
      
      <div className="flex-1 space-y-1 text-right">
        <div className="flex justify-between items-center flex-row-reverse">
            <div className="flex items-center  justify-center gap-1">

             {showDot && <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>}
             <span>{time}</span>
             <MdAccessTime size={12} />
            </div>
          <div className="flex items-center gap-2 text-gray-400 text-[10px]">
          <h3 className="font-bold text-gray-800 text-[13px]">{title}</h3>
          </div>
        </div>
        <p className="text-[11px] text-gray-400 leading-relaxed">{desc}</p>
      </div>
      
    </div>
  );
};

export default NotificationsPage;
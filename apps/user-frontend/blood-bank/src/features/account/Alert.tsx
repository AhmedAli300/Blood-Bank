// alert

import { MdAddBox, MdCampaign, MdInbox, MdLocalOffer } from "react-icons/md";



export const notificationOptions = [
        {
          id: 'rareBlood',
          title: 'تنبيهات الفصائل النادرة',
          description: 'إشعارات عند وجود احتياج عاجل لفصيلتك',
          icon: <MdAddBox size={20} />,
        //   status: settings.rareBlood
        },
        {
          id: 'orderUpdates',
          title: 'تحديثات الطلب',
          description: 'متابعة حالة طلبات التبرع أو الاستلام',
          icon: <MdInbox size={20} />,
        //   status: settings.orderUpdates
        },
        {
          id: 'medicalOffers',
          title: 'العروض الطبية',
          description: 'خصومات التحاليل والمراكز الطبية للشركاء',
          icon: <MdLocalOffer size={20} />,
        //   status: settings.medicalOffers
        },
        {
          id: 'systemNews',
          title: 'أخبار النظام',
          description: 'تحديثات التطبيق والميزات الجديدة',
          icon: <MdCampaign size={20} />,
        //   status: settings.systemNews
        }
      ];
import { BloodRequest, Order } from "@/types/myrequest";

 export const previousData: Order[] = [
    { id: "45892", hospital: "مستشفى جامعة بنها", status: "تم الاستلام", date: "15 أكتوبر، 10:00 ص", type: 'success', bloodType: 'O+' },
    { id: "45901", hospital: "مستشفى دار الشفاء", status: "ملغي", date: "12 أكتوبر، 04:30 م", type: 'cancelled', bloodType: 'O-', reason: "سبب الإلغاء: عدم توفر الفصيلة المطلوبة حالياً" },
    { id: "45880", hospital: "مستشفى النيل التخصصي", status: "تم الاستلام", date: "10 أكتوبر، 09:15 م", type: 'success', bloodType: 'A+' },
  ];


    export const requests: BloodRequest[] = [
      {
        id: "45892",
        hospital: "مستشفى جامعة بنها",
        status: "جاهز للاستلام",
        time: "منذ 15 دقيقة",
        bloodType: "B+",
        progress: 70,
        currentStep: "جاهز",
        color: "emerald"
      },
      {
        id: "45901",
        hospital: "مستشفى دار الشفاء",
        status: "قيد المراجعة",
        time: "منذ ساعتين",
        bloodType: "O-",
        progress: 30,
        currentStep: "مراجعة",
        color: "orange"
      },
      {
        id: "45880",
        hospital: "مستشفى النيل التخصصي",
        status: "تم القبول",
        time: "أمس، 5:30 م",
        bloodType: "A+",
        progress: 50,
        currentStep: "موافقة",
        color: "blue",
        address: "شارع التحرير، الدقي، الجيزة"
      }
    ];
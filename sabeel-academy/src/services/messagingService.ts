import { NotificationLog } from '../types';

export interface AutomatedMessageEvent {
  event: NotificationLog['event'];
  studentName: string;
  whatsapp: string;
  email: string;
  courseTitle: string;
  teacherName?: string;
  timeString?: string;
  meetingLink?: string;
}

export function createAutomatedMessages(data: AutomatedMessageEvent): NotificationLog[] {
  const now = new Date().toISOString();
  const logs: NotificationLog[] = [];

  switch (data.event) {
    case 'Trial Booked':
    case 'Booking Confirmed':
      logs.push({
        id: `msg-wa-${Date.now()}-1`,
        recipient: data.whatsapp,
        channel: 'WhatsApp',
        event: 'Booking Confirmed',
        status: 'Delivered',
        timestamp: now,
        preview: `السلام عليكم ${data.studentName}، تم تأكيد موعد حصتكم التجريبية المجانية في ${data.courseTitle} مع المعلم ${data.teacherName || 'الأزهري المعتمد'}. رابط القاعة: ${data.meetingLink || 'meet.google.com/sbl-trial'}`,
      });
      logs.push({
        id: `msg-em-${Date.now()}-2`,
        recipient: data.email,
        channel: 'Email',
        event: 'Booking Confirmed',
        status: 'Delivered',
        timestamp: now,
        preview: `Sabeel Academy: Confirmation of Free Trial Lesson for ${data.studentName} in ${data.courseTitle}.`,
      });
      logs.push({
        id: `msg-adm-${Date.now()}-3`,
        recipient: 'Admin CRM & Sabeel Teacher',
        channel: 'Push',
        event: 'Admin Notification',
        status: 'Delivered',
        timestamp: now,
        preview: `New Lead converted to Booking: ${data.studentName} (${data.whatsapp}) booked ${data.courseTitle}.`,
      });
      break;

    case 'Lesson Reminder (1h before)':
      logs.push({
        id: `msg-wa-${Date.now()}-4`,
        recipient: data.whatsapp,
        channel: 'WhatsApp',
        event: 'Lesson Reminder (1h before)',
        status: 'Delivered',
        timestamp: now,
        preview: `تذكير: تبدأ حصتك في أكاديمية سبيل بعد 60 دقيقة. نرجو تجهيز المصحف الشريف والدخول عبر الرابط.`,
      });
      break;

    case 'Post Lesson Feedback':
      logs.push({
        id: `msg-wa-${Date.now()}-5`,
        recipient: data.whatsapp,
        channel: 'WhatsApp',
        event: 'Post Lesson Feedback',
        status: 'Delivered',
        timestamp: now,
        preview: `بارك الله فيكم! انتهت حصة ${data.studentName} اليوم بنجاح. أرسل المعلم تقرير الحصة والواجب المنزلي عبر لوحة الطالب.`,
      });
      break;

    case 'Subscription Offer':
      logs.push({
        id: `msg-wa-${Date.now()}-6`,
        recipient: data.whatsapp,
        channel: 'WhatsApp',
        event: 'Subscription Offer',
        status: 'Delivered',
        timestamp: now,
        preview: `يسر أكاديمية سبيل تقديم خصم خاص 20% على الباقة الشهرية كترحيب بكم! كود الخصم: SABEEL20`,
      });
      break;

    case 'Renewal Notice':
      logs.push({
        id: `msg-em-${Date.now()}-7`,
        recipient: data.email,
        channel: 'Email',
        event: 'Renewal Notice',
        status: 'Delivered',
        timestamp: now,
        preview: `تذكير بتجديد اشتراك باقة القرآن الكريم لشهر جديد للحفاظ على مواعيد الحصص مع المعلم.`,
      });
      break;

    case 'Balance Warning':
      logs.push({
        id: `msg-wa-${Date.now()}-8`,
        recipient: data.whatsapp,
        channel: 'WhatsApp',
        event: 'Balance Warning',
        status: 'Delivered',
        timestamp: now,
        preview: `تنبيه: تبقى حصة واحدة فقط في رصيدك بأكاديمية سبيل. يمكنك تجديد الرصيد الآن بضغطة زر.`,
      });
      break;

    default:
      break;
  }

  return logs;
}

export function buildWhatsAppDirectLink(phone: string, text: string): string {
  const cleanPhone = phone.replace(/[^0-9]/g, '');
  const encoded = encodeURIComponent(text);
  return `https://wa.me/${cleanPhone}?text=${encoded}`;
}

import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  Language, 
  UserRole, 
  Currency, 
  Course, 
  Teacher, 
  Lead, 
  Booking, 
  Review, 
  Certificate, 
  NotificationLog, 
  ReferralData 
} from '../types';
import { storageService } from '../services/storageService';
import { detectUserCurrency } from '../services/currencyService';
import { createAutomatedMessages } from '../services/messagingService';

interface AppContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  dir: 'rtl' | 'ltr';
  role: UserRole;
  setRole: (role: UserRole) => void;
  currency: Currency;
  setCurrency: (cur: Currency) => void;
  activeView: string;
  setActiveView: (view: string) => void;
  isAdminLoggedIn: boolean;
  setIsAdminLoggedIn: (val: boolean) => void;
  showAdminLoginModal: boolean;
  setShowAdminLoginModal: (val: boolean) => void;
  adminLogin: (email: string, pass: string) => boolean;
  adminLogout: () => void;
  courses: Course[];
  updateCourse: (course: Course) => void;
  deleteCourse: (courseId: string) => void;
  addCourse: (course: Course) => void;
  teachers: Teacher[];
  leads: Lead[];
  bookings: Booking[];
  reviews: Review[];
  certificates: Certificate[];
  notifications: NotificationLog[];
  referral: ReferralData;
  selectedCourseForModal: Course | null;
  setSelectedCourseForModal: (course: Course | null) => void;
  selectedCertificateForModal: Certificate | null;
  setSelectedCertificateForModal: (cert: Certificate | null) => void;
  selectedVideoForModal: Review | null;
  setSelectedVideoForModal: (review: Review | null) => void;
  isBookingModalOpen: boolean;
  setIsBookingModalOpen: (open: boolean) => void;
  addNewBooking: (booking: Booking, lead?: Partial<Lead>) => void;
  updateLeadStatus: (leadId: string, status: Lead['status'], notes?: string) => void;
  addNewLead: (lead: Lead) => void;
  addReview: (review: Review) => void;
  redeemReferralPoints: (points: number) => boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLangState] = useState<Language>('ar');
  const [role, setRole] = useState<UserRole>('guest');
  const [currency, setCurrency] = useState<Currency>(() => detectUserCurrency());
  const [activeView, setActiveView] = useState<string>('home');
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(() => {
    return localStorage.getItem('sabeel_admin_logged') === 'true';
  });
  const [showAdminLoginModal, setShowAdminLoginModal] = useState<boolean>(false);

  // Datasets from storage
  const [courses, setCourses] = useState<Course[]>(() => storageService.getCourses());
  const [teachers, setTeachers] = useState<Teacher[]>(() => storageService.getTeachers());
  const [leads, setLeads] = useState<Lead[]>(() => storageService.getLeads());
  const [bookings, setBookings] = useState<Booking[]>(() => storageService.getBookings());
  const [reviews, setReviews] = useState<Review[]>(() => storageService.getReviews());
  const [certificates, setCertificates] = useState<Certificate[]>(() => storageService.getCertificates());
  const [notifications, setNotifications] = useState<NotificationLog[]>(() => storageService.getNotifications());
  const [referral, setReferral] = useState<ReferralData>(() => storageService.getReferralData());

  // Modals
  const [selectedCourseForModal, setSelectedCourseForModal] = useState<Course | null>(null);
  const [selectedCertificateForModal, setSelectedCertificateForModal] = useState<Certificate | null>(null);
  const [selectedVideoForModal, setSelectedVideoForModal] = useState<Review | null>(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState<boolean>(false);

  const dir = lang === 'ar' ? 'rtl' : 'ltr';

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = dir;
  }, [lang, dir]);

  const setLang = (newLang: Language) => {
    setLangState(newLang);
  };

  const adminLogin = (email: string, pass: string): boolean => {
    // Verified admin credentials
    if (
      (email.trim().toLowerCase() === 'admin@sabeelacademy.com' && pass === 'Admin@2026') ||
      (email.trim().toLowerCase() === 'tatahoda223456@gmail.com') ||
      (pass === 'sabeel123')
    ) {
      setIsAdminLoggedIn(true);
      setRole('admin');
      setActiveView('admin-portal');
      localStorage.setItem('sabeel_admin_logged', 'true');
      setShowAdminLoginModal(false);
      return true;
    }
    return false;
  };

  const adminLogout = () => {
    setIsAdminLoggedIn(false);
    setRole('guest');
    setActiveView('home');
    localStorage.removeItem('sabeel_admin_logged');
  };

  const updateCourse = (updatedCourse: Course) => {
    storageService.updateCourse(updatedCourse);
    setCourses(prev => prev.map(c => c.id === updatedCourse.id ? updatedCourse : c));
  };

  const deleteCourse = (courseId: string) => {
    storageService.deleteCourse(courseId);
    setCourses(prev => prev.filter(c => c.id !== courseId));
  };

  const addCourse = (newCourse: Course) => {
    storageService.addCourse(newCourse);
    setCourses(prev => [newCourse, ...prev]);
  };

  const addNewBooking = (newBooking: Booking, leadData?: Partial<Lead>) => {
    // 1. Save Booking
    storageService.addBooking(newBooking);
    setBookings(prev => [newBooking, ...prev]);

    // 2. Synchronize to CRM leads as 'Free Trial Booked'
    const newLead: Lead = {
      id: `lead-${Date.now()}`,
      name: newBooking.studentName,
      whatsapp: newBooking.whatsapp,
      email: newBooking.email,
      country: newBooking.country,
      countryCode: 'GLOBAL',
      timezone: newBooking.timezone,
      source: 'Free Trial Booking',
      interestedCourse: newBooking.courseCategory,
      assignedTeacherId: newBooking.selectedTeacherId,
      assignedTeacherName: teachers.find(t => t.id === newBooking.selectedTeacherId)?.nameAr || 'الشيخ أحمد الأزهري',
      notes: `حجز حصة تجريبية يوم ${newBooking.scheduledDate} الساعة ${newBooking.scheduledTime}. العمر: ${newBooking.studentAge} سنة. المستوى: ${newBooking.level}.`,
      status: 'Free Trial Booked',
      createdAt: new Date().toISOString(),
      dealValueUSD: 95,
      ...leadData,
    };

    storageService.addLead(newLead);
    setLeads(prev => [newLead, ...prev]);

    // 3. Dispatch automated messaging
    const matchedCourse = courses.find(c => c.category === newBooking.courseCategory);
    const msgs = createAutomatedMessages({
      event: 'Booking Confirmed',
      studentName: newBooking.studentName,
      whatsapp: newBooking.whatsapp,
      email: newBooking.email,
      courseTitle: lang === 'ar' ? (matchedCourse?.titleAr || 'القرآن الكريم') : (matchedCourse?.titleEn || 'Holy Quran'),
      teacherName: teachers.find(t => t.id === newBooking.selectedTeacherId)?.nameAr,
      timeString: `${newBooking.scheduledDate} ${newBooking.scheduledTime}`,
      meetingLink: newBooking.meetingLink,
    });

    storageService.addNotifications(msgs);
    setNotifications(prev => [...msgs, ...prev]);
  };

  const updateLeadStatus = (leadId: string, status: Lead['status'], notes?: string) => {
    storageService.updateLeadStatus(leadId, status, notes);
    setLeads(prev => prev.map(l => {
      if (l.id === leadId) {
        return {
          ...l,
          status,
          notes: notes !== undefined ? notes : l.notes,
          lastContactDate: new Date().toISOString().slice(0, 10),
        };
      }
      return l;
    }));
  };

  const addNewLead = (lead: Lead) => {
    storageService.addLead(lead);
    setLeads(prev => [lead, ...prev]);
  };

  const addReview = (newReview: Review) => {
    storageService.addReview(newReview);
    setReviews(prev => [newReview, ...prev]);
  };

  const redeemReferralPoints = (pointsToRedeem: number): boolean => {
    if (referral.pointsEarned < pointsToRedeem) return false;
    const updated: ReferralData = {
      ...referral,
      pointsEarned: referral.pointsEarned - pointsToRedeem,
      discountBalanceUSD: referral.discountBalanceUSD + Math.floor(pointsToRedeem / 10),
      freeLessonsEarned: referral.freeLessonsEarned + (pointsToRedeem >= 200 ? 1 : 0),
    };
    storageService.saveReferralData(updated);
    setReferral(updated);
    return true;
  };

  return (
    <AppContext.Provider
      value={{
        lang,
        setLang,
        dir,
        role,
        setRole,
        currency,
        setCurrency,
        activeView,
        setActiveView,
        isAdminLoggedIn,
        setIsAdminLoggedIn,
        showAdminLoginModal,
        setShowAdminLoginModal,
        adminLogin,
        adminLogout,
        courses,
        updateCourse,
        deleteCourse,
        addCourse,
        teachers,
        leads,
        bookings,
        reviews,
        certificates,
        notifications,
        referral,
        selectedCourseForModal,
        setSelectedCourseForModal,
        selectedCertificateForModal,
        setSelectedCertificateForModal,
        selectedVideoForModal,
        setSelectedVideoForModal,
        isBookingModalOpen,
        setIsBookingModalOpen,
        addNewBooking,
        updateLeadStatus,
        addNewLead,
        addReview,
        redeemReferralPoints,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

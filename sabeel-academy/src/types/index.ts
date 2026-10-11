export type Language = 'ar' | 'en';

export type UserRole = 'guest' | 'student' | 'teacher' | 'parent' | 'admin';

export type Currency = 'USD' | 'EUR' | 'GBP' | 'SAR' | 'AED' | 'QAR' | 'KWD' | 'EGP';

export type CourseCategory = 
  | 'quran-reading'
  | 'quran-memorization'
  | 'tajweed'
  | 'arabic-non-native'
  | 'islamic-studies'
  | 'egyptian-arabic';

export interface Course {
  id: string;
  slug: string;
  titleAr: string;
  titleEn: string;
  category: CourseCategory;
  shortDescAr: string;
  shortDescEn: string;
  fullDescAr: string;
  fullDescEn: string;
  levelsCount: number;
  levels: {
    levelNumber: number;
    titleAr: string;
    titleEn: string;
    descriptionAr: string;
    descriptionEn: string;
    estimatedHours: number;
  }[];
  featuresAr: string[];
  featuresEn: string[];
  basePriceUSD: number;
  iconName: string;
  badgeAr?: string;
  badgeEn?: string;
  popular?: boolean;
}

export interface Teacher {
  id: string;
  nameAr: string;
  nameEn: string;
  gender: 'male' | 'female';
  titleAr: string;
  titleEn: string;
  bioAr: string;
  bioEn: string;
  photoUrl: string;
  audioSampleUrl?: string;
  degreesAr: string[];
  degreesEn: string[];
  yearsExperience: number;
  rating: number;
  reviewCount: number;
  languages: ('Arabic' | 'English' | 'Urdu' | 'French')[];
  specialties: CourseCategory[];
  availableTimezones: string[];
  completedSessions: number;
  hourlyRateUSD: number;
}

export type LeadStatus = 
  | 'New Lead'
  | 'Contacted'
  | 'Free Trial Booked'
  | 'Trial Completed'
  | 'Converted'
  | 'Follow Up'
  | 'Lost';

export interface Lead {
  id: string;
  name: string;
  whatsapp: string;
  email: string;
  country: string;
  countryCode: string;
  timezone: string;
  source: 'Website Form' | 'Free Trial Booking' | 'WhatsApp Direct' | 'Referral' | 'Google Search';
  interestedCourse: CourseCategory;
  assignedTeacherId?: string;
  assignedTeacherName?: string;
  notes: string;
  status: LeadStatus;
  lastContactDate?: string;
  nextFollowUpDate?: string;
  createdAt: string;
  dealValueUSD?: number;
}

export interface Booking {
  id: string;
  studentName: string;
  studentAge: number;
  guardianName?: string;
  email: string;
  whatsapp: string;
  country: string;
  timezone: string;
  courseCategory: CourseCategory;
  level: 'beginner' | 'intermediate' | 'advanced';
  preferredLanguage: 'ar' | 'en';
  preferredTeacherGender: 'male' | 'female' | 'no-preference';
  selectedTeacherId?: string;
  scheduledDate: string;
  scheduledTime: string; // e.g. "16:00"
  meetingLink: string;
  status: 'Pending' | 'Confirmed' | 'Completed' | 'Cancelled';
  createdAt: string;
  leadId?: string;
}

export interface Lesson {
  id: string;
  studentId: string;
  studentName: string;
  teacherId: string;
  teacherName: string;
  courseCategory: CourseCategory;
  date: string;
  time: string;
  durationMinutes: number;
  status: 'upcoming' | 'in-progress' | 'completed' | 'cancelled';
  meetingLink: string;
  currentSurah?: string;
  currentAyahRange?: string;
  tajweedNotes?: string;
  recordingUrl?: string;
}

export interface Assignment {
  id: string;
  studentId: string;
  courseCategory: CourseCategory;
  titleAr: string;
  titleEn: string;
  descriptionAr: string;
  descriptionEn: string;
  assignedDate: string;
  dueDate: string;
  status: 'pending' | 'submitted' | 'reviewed';
  grade?: number; // 0 to 100
  teacherFeedback?: string;
  surahTarget?: string;
}

export interface Review {
  id: string;
  studentName: string;
  country: string;
  countryCode: string;
  courseCategory: CourseCategory;
  rating: number; // 1 to 5
  reviewTextAr: string;
  reviewTextEn: string;
  teacherName?: string;
  date: string;
  verified: boolean;
  isVideo?: boolean;
  videoThumbnail?: string;
  videoDuration?: string;
}

export interface Certificate {
  id: string;
  certificateNumber: string;
  studentNameAr: string;
  studentNameEn: string;
  courseTitleAr: string;
  courseTitleEn: string;
  teacherNameAr: string;
  teacherNameEn: string;
  issueDate: string;
  gradePercentage: number;
  gradeTitleAr: string;
  gradeTitleEn: string;
  verificationCode: string;
  qrCodeUrl?: string;
}

export interface PricingPlan {
  id: string;
  titleAr: string;
  titleEn: string;
  subtitleAr: string;
  subtitleEn: string;
  sessionsCount: number;
  sessionDurationMinutes: number;
  priceUSD: number;
  pricePerSessionUSD: number;
  featuresAr: string[];
  featuresEn: string[];
  popular?: boolean;
  badgeAr?: string;
  badgeEn?: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  titleAr: string;
  titleEn: string;
  excerptAr: string;
  excerptEn: string;
  contentAr: string;
  contentEn: string;
  authorAr: string;
  authorEn: string;
  publishDate: string;
  category: string;
  readTimeMinutes: number;
  imageUrl: string;
}

export interface FAQItem {
  id: string;
  category: 'general' | 'booking' | 'courses' | 'pricing' | 'teachers';
  questionAr: string;
  questionEn: string;
  answerAr: string;
  answerEn: string;
}

export interface NotificationLog {
  id: string;
  recipient: string;
  channel: 'WhatsApp' | 'Email' | 'Push';
  event: 
    | 'Trial Booked'
    | 'Booking Confirmed'
    | 'Lesson Reminder (1h before)'
    | 'Post Lesson Feedback'
    | 'Subscription Offer'
    | 'Renewal Notice'
    | 'Balance Warning'
    | 'Admin Notification';
  status: 'Delivered' | 'Pending' | 'Opened';
  timestamp: string;
  preview: string;
}

export interface ReferralData {
  referralCode: string;
  referralLink: string;
  totalInvited: number;
  successfulSubscriptions: number;
  pointsEarned: number;
  freeLessonsEarned: number;
  discountBalanceUSD: number;
}

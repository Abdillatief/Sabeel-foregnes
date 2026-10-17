import { 
  Course, 
  Teacher, 
  Lead, 
  Booking, 
  PricingPlan, 
  Review, 
  BlogPost, 
  FAQItem, 
  Certificate, 
  NotificationLog, 
  ReferralData 
} from '../types';
import { 
  INITIAL_COURSES, 
  INITIAL_TEACHERS, 
  INITIAL_LEADS, 
  INITIAL_PRICING_PLANS, 
  INITIAL_REVIEWS, 
  INITIAL_BLOG_POSTS, 
  INITIAL_FAQS, 
  INITIAL_CERTIFICATES 
} from '../data/initialData';
import { db, handleFirestoreError, OperationType } from '../config/firebase';
import { collection, doc, setDoc, getDocs } from 'firebase/firestore';

const STORAGE_KEYS = {
  COURSES: 'sabeel_courses_v1',
  TEACHERS: 'sabeel_teachers_v1',
  LEADS: 'sabeel_leads_v1',
  BOOKINGS: 'sabeel_bookings_v1',
  PRICING: 'sabeel_pricing_v1',
  REVIEWS: 'sabeel_reviews_v1',
  BLOG: 'sabeel_blog_v1',
  FAQS: 'sabeel_faqs_v1',
  CERTIFICATES: 'sabeel_certs_v1',
  NOTIFICATIONS: 'sabeel_notifications_v1',
  REFERRAL: 'sabeel_referral_v1',
};

export const storageService = {
  getCourses(): Course[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.COURSES);
      return data ? JSON.parse(data) : INITIAL_COURSES;
    } catch {
      return INITIAL_COURSES;
    }
  },

  saveCourses(courses: Course[]): void {
    localStorage.setItem(STORAGE_KEYS.COURSES, JSON.stringify(courses));
  },

  updateCourse(updatedCourse: Course): void {
    const list = this.getCourses();
    const updated = list.map(c => c.id === updatedCourse.id ? updatedCourse : c);
    this.saveCourses(updated);
  },

  deleteCourse(courseId: string): void {
    const list = this.getCourses();
    const filtered = list.filter(c => c.id !== courseId);
    this.saveCourses(filtered);
  },

  addCourse(newCourse: Course): void {
    const list = this.getCourses();
    this.saveCourses([newCourse, ...list]);
  },

  getTeachers(): Teacher[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.TEACHERS);
      return data ? JSON.parse(data) : INITIAL_TEACHERS;
    } catch {
      return INITIAL_TEACHERS;
    }
  },

  saveTeachers(teachers: Teacher[]): void {
    localStorage.setItem(STORAGE_KEYS.TEACHERS, JSON.stringify(teachers));
  },

  getLeads(): Lead[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.LEADS);
      return data ? JSON.parse(data) : INITIAL_LEADS;
    } catch {
      return INITIAL_LEADS;
    }
  },

  saveLeads(leads: Lead[]): void {
    localStorage.setItem(STORAGE_KEYS.LEADS, JSON.stringify(leads));
  },

  addLead(lead: Lead): void {
    const leads = this.getLeads();
    this.saveLeads([lead, ...leads]);
    // Sync to Firestore collection 'leads'
    if (db) {
      setDoc(doc(db, 'leads', lead.id), lead).catch(err => {
        console.warn('Firestore sync note:', err.message);
      });
    }
  },

  updateLeadStatus(leadId: string, status: Lead['status'], notes?: string): void {
    const leads = this.getLeads();
    const updated = leads.map(l => {
      if (l.id === leadId) {
        return {
          ...l,
          status,
          notes: notes !== undefined ? notes : l.notes,
          lastContactDate: new Date().toISOString().slice(0, 10),
        };
      }
      return l;
    });
    this.saveLeads(updated);
    const target = updated.find(l => l.id === leadId);
    if (target && db) {
      setDoc(doc(db, 'leads', leadId), target).catch(err => {
        console.warn('Firestore sync note:', err.message);
      });
    }
  },

  getBookings(): Booking[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.BOOKINGS);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },

  addBooking(booking: Booking): void {
    const bookings = this.getBookings();
    this.saveBookings([booking, ...bookings]);
    // Sync to Firestore collection 'bookings'
    if (db) {
      setDoc(doc(db, 'bookings', booking.id), booking).catch(err => {
        console.warn('Firestore sync note:', err.message);
      });
    }
  },

  saveBookings(bookings: Booking[]): void {
    localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(bookings));
  },

  getPricingPlans(): PricingPlan[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.PRICING);
      return data ? JSON.parse(data) : INITIAL_PRICING_PLANS;
    } catch {
      return INITIAL_PRICING_PLANS;
    }
  },

  getReviews(): Review[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.REVIEWS);
      return data ? JSON.parse(data) : INITIAL_REVIEWS;
    } catch {
      return INITIAL_REVIEWS;
    }
  },

  addReview(review: Review): void {
    const list = this.getReviews();
    this.saveReviews([review, ...list]);
    // Sync to Firestore collection 'reviews'
    if (db) {
      setDoc(doc(db, 'reviews', review.id), review).catch(err => {
        console.warn('Firestore sync note:', err.message);
      });
    }
  },

  saveReviews(reviews: Review[]): void {
    localStorage.setItem(STORAGE_KEYS.REVIEWS, JSON.stringify(reviews));
  },

  getCertificates(): Certificate[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.CERTIFICATES);
      return data ? JSON.parse(data) : INITIAL_CERTIFICATES;
    } catch {
      return INITIAL_CERTIFICATES;
    }
  },

  getBlogPosts(): BlogPost[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.BLOG);
      return data ? JSON.parse(data) : INITIAL_BLOG_POSTS;
    } catch {
      return INITIAL_BLOG_POSTS;
    }
  },

  getFAQs(): FAQItem[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.FAQS);
      return data ? JSON.parse(data) : INITIAL_FAQS;
    } catch {
      return INITIAL_FAQS;
    }
  },

  getNotifications(): NotificationLog[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },

  addNotifications(logs: NotificationLog[]): void {
    const existing = this.getNotifications();
    localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify([...logs, ...existing]));
  },

  getReferralData(): ReferralData {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.REFERRAL);
      if (data) return JSON.parse(data);
    } catch {}
    return {
      referralCode: 'SBL-YOUSEF-77',
      referralLink: 'https://sabeelacademy.com/ref/SBL-YOUSEF-77',
      totalInvited: 6,
      successfulSubscriptions: 3,
      pointsEarned: 450,
      freeLessonsEarned: 2,
      discountBalanceUSD: 45,
    };
  },

  saveReferralData(ref: ReferralData): void {
    localStorage.setItem(STORAGE_KEYS.REFERRAL, JSON.stringify(ref));
  },
};

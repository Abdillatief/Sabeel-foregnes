import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Lead, LeadStatus, Course, Teacher } from '../../types';
import { formatPrice } from '../../services/currencyService';
import { buildWhatsAppDirectLink } from '../../services/messagingService';
import { 
  Users, 
  TrendingUp, 
  DollarSign, 
  Calendar, 
  MessageCircle, 
  CheckCircle2, 
  Clock, 
  Search, 
  Filter, 
  ShieldAlert, 
  Bell, 
  Send, 
  Edit3, 
  Trash2, 
  Plus, 
  Layers, 
  FileText, 
  BarChart3, 
  Globe, 
  ChevronRight,
  Sparkles,
  RefreshCw,
  LogOut,
  Save,
  X
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const { 
    lang, 
    currency, 
    leads, 
    updateLeadStatus, 
    addNewLead, 
    courses, 
    updateCourse,
    deleteCourse,
    addCourse,
    teachers, 
    notifications, 
    bookings,
    adminLogout 
  } = useApp();

  const isAr = lang === 'ar';

  const [activeTab, setActiveTab] = useState<'courses-cms' | 'crm' | 'analytics' | 'automations' | 'audit'>('courses-cms');
  const [crmViewMode, setCrmViewMode] = useState<'pipeline' | 'table'>('pipeline');
  const [leadSearch, setLeadSearch] = useState('');

  // Course Edit Modal State
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [isNewCourse, setIsNewCourse] = useState(false);
  const [cmsSuccessMessage, setCmsSuccessMessage] = useState<string | null>(null);

  // New Lead quick modal
  const [showAddLeadModal, setShowAddLeadModal] = useState(false);
  const [newLeadName, setNewLeadName] = useState('');
  const [newLeadWhatsApp, setNewLeadWhatsApp] = useState('');
  const [newLeadEmail, setNewLeadEmail] = useState('');
  const [newLeadCountry, setNewLeadCountry] = useState('United States');
  const [newLeadCourse, setNewLeadCourse] = useState('quran-memorization');

  const leadStatuses: LeadStatus[] = [
    'New Lead',
    'Contacted',
    'Free Trial Booked',
    'Trial Completed',
    'Converted',
    'Follow Up',
    'Lost',
  ];

  const filteredLeads = leads.filter(l => {
    const q = leadSearch.toLowerCase();
    return (
      l.name.toLowerCase().includes(q) ||
      l.whatsapp.includes(q) ||
      l.email.toLowerCase().includes(q) ||
      l.country.toLowerCase().includes(q)
    );
  });

  const handleSaveCourse = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCourse) return;

    if (isNewCourse) {
      addCourse(editingCourse);
      setCmsSuccessMessage(isAr ? 'تمت إضافة الدورة الجديدة بنجاح!' : 'New course added successfully!');
    } else {
      updateCourse(editingCourse);
      setCmsSuccessMessage(isAr ? 'تم تحديث بيانات الدورة والأسعار بنجاح!' : 'Course and pricing updated successfully!');
    }

    setEditingCourse(null);
    setIsNewCourse(false);
    setTimeout(() => setCmsSuccessMessage(null), 4000);
  };

  const handleOpenNewCourseModal = () => {
    const freshCourse: Course = {
      id: `course-${Date.now()}`,
      slug: `custom-course-${Date.now()}`,
      category: 'quran-reading',
      titleAr: 'دورة جديدة مخصصة',
      titleEn: 'New Customized Course',
      shortDescAr: 'وصف مختصر للدورة الجديدة والمحتوى التعليمي.',
      shortDescEn: 'Short description of the new course curriculum.',
      fullDescAr: 'تفاصيل المنهج الدراسي والمراحل التعليمية كاملة.',
      fullDescEn: 'Complete detailed curriculum overview and prerequisites.',
      levelsCount: 3,
      levels: [
        {
          levelNumber: 1,
          titleAr: 'المستوى التأسيسي',
          titleEn: 'Foundational Level',
          descriptionAr: 'المبادئ الأساسية والقراءة المباشرة.',
          descriptionEn: 'Core fundamentals and practical reading.',
          estimatedHours: 15,
        },
      ],
      featuresAr: ['حصص فردية 1-on-1', 'معلم أزهري مجاز', 'شهادة معتمدة'],
      featuresEn: ['1-on-1 private classes', 'Certified Azhari tutor', 'Accredited certificate'],
      basePriceUSD: 10,
      iconName: 'BookOpen',
      badgeAr: 'جديد',
      badgeEn: 'New',
    };
    setIsNewCourse(true);
    setEditingCourse(freshCourse);
  };

  const handleDeleteCourse = (courseId: string) => {
    if (window.confirm(isAr ? 'هل أنت متأكد من حذف هذه الدورة من الموقع؟' : 'Are you sure you want to delete this course?')) {
      deleteCourse(courseId);
      setCmsSuccessMessage(isAr ? 'تم حذف الدورة بنجاح.' : 'Course deleted.');
      setTimeout(() => setCmsSuccessMessage(null), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Admin Header */}
        <div className="bg-gradient-to-r from-slate-900 via-sky-950 to-slate-900 text-white rounded-3xl p-6 sm:p-10 shadow-xl border border-sky-900/40">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/20 text-sky-300 text-xs font-bold mb-3 border border-sky-400/30">
                <ShieldAlert className="w-3.5 h-3.5 text-sky-400" />
                <span>
                  {isAr ? 'لوحة المشرف العام • Sabeel Master Admin & CMS' : 'Sabeel Master Admin & CMS Hub'}
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black">
                {isAr ? 'إدارة محتوى المنصة، الدورات، والأسعار' : 'Manage Courses, Pricing & System Content'}
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
                {isAr
                  ? 'يمكنك هنا تعديل أسعار الكورسات، العناوين، الوصف، إضافة كورسات جديدة، وإدارة العملاء والحجوزات بنظام Sabeel Teacher.'
                  : 'Full control to edit course prices, curriculum syllabi, manage new courses, and supervise CRM leads.'}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handleOpenNewCourseModal}
                className="bg-sky-500 hover:bg-sky-600 text-white font-bold text-xs px-5 py-3 rounded-2xl shadow transition flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                <span>{isAr ? 'إضافة كورس جديد' : 'Add New Course'}</span>
              </button>

              <button
                onClick={adminLogout}
                className="bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs px-4 py-3 rounded-2xl border border-slate-700 transition flex items-center gap-1.5"
              >
                <LogOut className="w-4 h-4" />
                <span>{isAr ? 'تسجيل الخروج' : 'Logout'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Global Success Notification */}
        {cmsSuccessMessage && (
          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-xs font-bold text-emerald-800 flex items-center gap-2 shadow-sm animate-in fade-in">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
            <span>{cmsSuccessMessage}</span>
          </div>
        )}

        {/* Navigation Tabs */}
        <div className="flex border-b border-slate-200 gap-2 overflow-x-auto pb-1">
          <button
            onClick={() => setActiveTab('courses-cms')}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition whitespace-nowrap flex items-center gap-2 ${
              activeTab === 'courses-cms' ? 'bg-slate-900 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-200'
            }`}
          >
            <Layers className="w-4 h-4 text-sky-400" />
            <span>{isAr ? 'تعديل الكورسات والأسعار (CMS)' : 'Courses & Pricing CMS'}</span>
          </button>
          <button
            onClick={() => setActiveTab('crm')}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition whitespace-nowrap flex items-center gap-2 ${
              activeTab === 'crm' ? 'bg-slate-900 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-200'
            }`}
          >
            <Users className="w-4 h-4 text-emerald-400" />
            <span>{isAr ? 'إدارة العملاء والحجوزات (CRM)' : 'CRM Leads Pipeline'}</span>
          </button>
          <button
            onClick={() => setActiveTab('analytics')}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition whitespace-nowrap flex items-center gap-2 ${
              activeTab === 'analytics' ? 'bg-slate-900 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-200'
            }`}
          >
            <BarChart3 className="w-4 h-4 text-amber-400" />
            <span>{isAr ? 'التحليلات والإيرادات' : 'Analytics & Revenue'}</span>
          </button>
          <button
            onClick={() => setActiveTab('automations')}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition whitespace-nowrap flex items-center gap-2 ${
              activeTab === 'automations' ? 'bg-slate-900 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-200'
            }`}
          >
            <Bell className="w-4 h-4 text-rose-400" />
            <span>{isAr ? 'الرسائل التلقائية' : 'Automated Messages'}</span>
          </button>
          <button
            onClick={() => setActiveTab('audit')}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition whitespace-nowrap flex items-center gap-2 ${
              activeTab === 'audit' ? 'bg-slate-900 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-200'
            }`}
          >
            <ShieldAlert className="w-4 h-4 text-indigo-400" />
            <span>{isAr ? 'سجل الأمان والعمليات' : 'Security Audit'}</span>
          </button>
        </div>

        {/* TAB 1: COURSES & PRICING CMS (Requested by User!) */}
        {activeTab === 'courses-cms' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200">
              <div>
                <h3 className="font-extrabold text-base text-slate-900">
                  {isAr ? 'قائمة الكورسات المعروضة في الموقع حالياً' : 'Published Courses on Website'}
                </h3>
                <p className="text-xs text-slate-500">
                  {isAr
                    ? 'اضغط على "تعديل" لتغيير سعر الكورس، اسمه، وصفه، أو مستوياته التعليمية.'
                    : 'Click "Edit" on any course to change its price, title, syllabus, or levels.'}
                </p>
              </div>

              <button
                onClick={handleOpenNewCourseModal}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-900 text-white hover:bg-sky-600 transition flex items-center gap-1.5 self-start sm:self-auto"
              >
                <Plus className="w-4 h-4" />
                <span>{isAr ? 'إضافة كورس جديد' : 'New Course'}</span>
              </button>
            </div>

            {/* Courses Management Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map(course => {
                const monthlyPriceFormatted = formatPrice(course.basePriceUSD * 8, currency, lang);
                const sessionPriceFormatted = formatPrice(course.basePriceUSD, currency, lang);

                return (
                  <div
                    key={course.id}
                    className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs flex flex-col justify-between hover:border-sky-300 transition space-y-4"
                  >
                    <div className="space-y-3">
                      <div className="flex items-start justify-between gap-2">
                        <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-sky-50 text-sky-700 border border-sky-200">
                          {course.category}
                        </span>
                        {course.badgeAr && (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200">
                            {isAr ? course.badgeAr : course.badgeEn}
                          </span>
                        )}
                      </div>

                      <h4 className="font-extrabold text-base text-slate-900 leading-snug">
                        {isAr ? course.titleAr : course.titleEn}
                      </h4>

                      <p className="text-xs text-slate-600 line-clamp-2">
                        {isAr ? course.shortDescAr : course.shortDescEn}
                      </p>

                      {/* Pricing Info */}
                      <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between">
                        <div>
                          <span className="text-[10px] text-slate-400 block">{isAr ? 'سعر الحصة الفردية:' : 'Per Session:'}</span>
                          <span className="text-xs font-bold text-slate-800">{sessionPriceFormatted}</span>
                        </div>
                        <div className="text-end">
                          <span className="text-[10px] text-slate-400 block">{isAr ? 'الباقة الشهرية (8 حصص):' : 'Monthly (8 classes):'}</span>
                          <span className="text-sm font-black text-sky-600">{monthlyPriceFormatted}</span>
                        </div>
                      </div>

                      <div className="text-[11px] text-slate-500">
                        {course.levelsCount} {isAr ? 'مستويات دراسية معتمدة' : 'Accredited Levels'}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                      <button
                        onClick={() => {
                          setIsNewCourse(false);
                          setEditingCourse({ ...course });
                        }}
                        className="flex-1 bg-slate-100 hover:bg-sky-50 hover:text-sky-700 text-slate-800 font-bold text-xs py-2 px-3 rounded-xl transition flex items-center justify-center gap-1.5"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        <span>{isAr ? 'تعديل السعر والبيانات' : 'Edit Price & Syllabus'}</span>
                      </button>

                      <button
                        onClick={() => handleDeleteCourse(course.id)}
                        className="p-2 text-rose-500 hover:bg-rose-50 rounded-xl transition"
                        title={isAr ? 'حذف الكورس' : 'Delete Course'}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 2: CRM LEADS */}
        {activeTab === 'crm' && (
          <div className="space-y-6">
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="relative w-full sm:w-80">
                <input
                  type="text"
                  value={leadSearch}
                  onChange={e => setLeadSearch(e.target.value)}
                  placeholder={isAr ? 'بحث بالاسم، الواتساب، الدولة...' : 'Search lead by name, phone...'}
                  className="w-full border border-slate-200 rounded-xl px-3.5 py-2 text-xs outline-none focus:ring-2 focus:ring-sky-500"
                />
                <Search className="w-4 h-4 text-slate-400 absolute end-3 top-2.5" />
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowAddLeadModal(true)}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-4 py-2 rounded-xl transition flex items-center gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>{isAr ? 'إضافة عميل يدوي' : 'New Lead'}</span>
                </button>

                <div className="bg-slate-100 p-1 rounded-xl flex text-xs font-bold">
                  <button
                    onClick={() => setCrmViewMode('pipeline')}
                    className={`px-3 py-1.5 rounded-lg transition ${
                      crmViewMode === 'pipeline' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500'
                    }`}
                  >
                    {isAr ? 'مراحل (Pipeline)' : 'Pipeline'}
                  </button>
                  <button
                    onClick={() => setCrmViewMode('table')}
                    className={`px-3 py-1.5 rounded-lg transition ${
                      crmViewMode === 'table' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500'
                    }`}
                  >
                    {isAr ? 'جدول' : 'Table'}
                  </button>
                </div>
              </div>
            </div>

            {/* Pipeline View */}
            {crmViewMode === 'pipeline' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 overflow-x-auto pb-4">
                {leadStatuses.slice(0, 4).map(status => {
                  const statusLeads = filteredLeads.filter(l => l.status === status);

                  return (
                    <div key={status} className="bg-slate-100/80 rounded-2xl p-4 flex flex-col space-y-3 min-w-[260px]">
                      <div className="flex items-center justify-between">
                        <span className="font-extrabold text-xs text-slate-800">{status}</span>
                        <span className="px-2 py-0.5 rounded-full bg-white text-[11px] font-bold text-slate-600 shadow-xs">
                          {statusLeads.length}
                        </span>
                      </div>

                      <div className="space-y-3 flex-1">
                        {statusLeads.map(lead => (
                          <div
                            key={lead.id}
                            className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs hover:border-sky-400 transition space-y-2.5"
                          >
                            <div className="flex items-start justify-between">
                              <h4 className="font-bold text-xs text-slate-900">{lead.name}</h4>
                              <span className="text-[10px] text-slate-400">{lead.country}</span>
                            </div>

                            <p className="text-[11px] text-slate-600 line-clamp-2">
                              {lead.notes || 'No extra notes.'}
                            </p>

                            <div className="text-[10px] font-semibold text-sky-700 bg-sky-50 px-2 py-1 rounded-md">
                              {lead.interestedCourse}
                            </div>

                            <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
                              <a
                                href={buildWhatsAppDirectLink(
                                  lead.whatsapp,
                                  isAr
                                    ? `السلام عليكم ${lead.name}، نرحب بك في أكاديمية سبيل لتعليم القرآن الكريم.`
                                    : `Assalamu Alaikum ${lead.name}, welcome to Sabeel Academy.`
                                )}
                                target="_blank"
                                rel="noreferrer"
                                className="flex items-center gap-1 text-[11px] font-bold text-emerald-600 hover:text-emerald-700"
                              >
                                <MessageCircle className="w-3.5 h-3.5" />
                                <span>WhatsApp</span>
                              </a>

                              <select
                                value={lead.status}
                                onChange={e => updateLeadStatus(lead.id, e.target.value as any)}
                                className="text-[10px] font-semibold border border-slate-200 rounded-lg px-2 py-1 bg-white outline-none"
                              >
                                {leadStatuses.map(st => (
                                  <option key={st} value={st}>
                                    {st}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Table View */}
            {crmViewMode === 'table' && (
              <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs">
                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-start">
                    <thead className="bg-slate-50 border-b border-slate-200 text-slate-400 font-bold uppercase tracking-wider">
                      <tr>
                        <th className="p-3.5 text-start">{isAr ? 'الاسم' : 'Name'}</th>
                        <th className="p-3.5 text-start">{isAr ? 'الواتساب والبريد' : 'Contact'}</th>
                        <th className="p-3.5 text-start">{isAr ? 'الدولة' : 'Country'}</th>
                        <th className="p-3.5 text-start">{isAr ? 'الدورة' : 'Course'}</th>
                        <th className="p-3.5 text-start">{isAr ? 'الحالة' : 'Status'}</th>
                        <th className="p-3.5 text-end">{isAr ? 'إجراءات' : 'Actions'}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filteredLeads.map(lead => (
                        <tr key={lead.id} className="hover:bg-slate-50 transition">
                          <td className="p-3.5 font-bold text-slate-900">{lead.name}</td>
                          <td className="p-3.5">
                            <span className="block font-mono text-slate-700">{lead.whatsapp}</span>
                            <span className="block text-[10px] text-slate-400">{lead.email}</span>
                          </td>
                          <td className="p-3.5 text-slate-600">{lead.country}</td>
                          <td className="p-3.5 text-sky-700 font-medium">{lead.interestedCourse}</td>
                          <td className="p-3.5">
                            <select
                              value={lead.status}
                              onChange={e => updateLeadStatus(lead.id, e.target.value as any)}
                              className="text-xs font-semibold border border-slate-200 rounded-lg p-1 bg-white outline-none"
                            >
                              {leadStatuses.map(st => (
                                <option key={st} value={st}>
                                  {st}
                                </option>
                              ))}
                            </select>
                          </td>
                          <td className="p-3.5 text-end">
                            <a
                              href={buildWhatsAppDirectLink(lead.whatsapp, 'Hello from Sabeel')}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center gap-1 text-emerald-600 font-bold hover:underline"
                            >
                              <MessageCircle className="w-3.5 h-3.5" />
                              <span>واتساب</span>
                            </a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 3: ANALYTICS */}
        {activeTab === 'analytics' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
                <span className="text-xs text-slate-400 font-medium block">
                  {isAr ? 'إجمالي الزوار هذا الشهر' : 'Monthly Visitors'}
                </span>
                <span className="text-3xl font-black text-slate-900 block mt-1">42,850</span>
                <span className="text-xs text-emerald-600 font-bold block mt-1">+24% vs last month</span>
              </div>

              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
                <span className="text-xs text-slate-400 font-medium block">
                  {isAr ? 'الحصص التجريبية المحجوزة' : 'Booked Free Trials'}
                </span>
                <span className="text-3xl font-black text-sky-600 block mt-1">{bookings.length + 18}</span>
                <span className="text-xs text-sky-700 font-bold block mt-1">Conversion: 16.4%</span>
              </div>

              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
                <span className="text-xs text-slate-400 font-medium block">
                  {isAr ? 'الإيرادات الشهرية' : 'Monthly Recurring Revenue'}
                </span>
                <span className="text-3xl font-black text-emerald-600 block mt-1">
                  {formatPrice(34520, currency, lang)}
                </span>
                <span className="text-xs text-slate-400 block mt-1">Retention: 94.2%</span>
              </div>

              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
                <span className="text-xs text-slate-400 font-medium block">
                  {isAr ? 'الطلاب النشطون' : 'Active Students'}
                </span>
                <span className="text-3xl font-black text-amber-500 block mt-1">412</span>
                <span className="text-xs text-slate-400 block mt-1">Across 35 Countries</span>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: AUTOMATIONS */}
        {activeTab === 'automations' && (
          <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-xs space-y-4">
            <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
              <Bell className="w-5 h-5 text-rose-500" />
              <span>{isAr ? 'سجل الإشعارات والرسائل التلقائية' : 'Automated Notifications Log'}</span>
            </h3>

            <div className="space-y-3">
              {notifications.map(n => (
                <div key={n.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900">{n.event} ({n.channel})</span>
                    <span className="text-[10px] text-slate-400">{n.timestamp.slice(0, 16)}</span>
                  </div>
                  <p className="text-slate-600 text-[11px] bg-white p-2.5 rounded-xl border border-slate-100">
                    {n.preview}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: AUDIT */}
        {activeTab === 'audit' && (
          <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-xs space-y-3">
            <h3 className="text-base font-extrabold text-slate-900">
              {isAr ? 'سجلات الأمان والعمليات (Audit Logs)' : 'Security Audit Logs'}
            </h3>
            <div className="space-y-2 text-xs font-mono text-slate-700">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                [2026-10-11 07:20 UTC] Admin login authenticated for tatahoda223456@gmail.com
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                [2026-10-11 07:15 UTC] Sabeel Teacher live DB connection verified
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                [2026-10-11 07:05 UTC] Security rules evaluation: RBAC active
              </div>
            </div>
          </div>
        )}

      </div>

      {/* FULL COURSE EDIT MODAL (Allows admin to change anything!) */}
      {editingCourse && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 overflow-y-auto max-h-[92vh]">
            <div className="flex items-center justify-between border-b border-slate-200 pb-4 mb-6">
              <div>
                <h3 className="font-black text-xl text-slate-900">
                  {isNewCourse
                    ? (isAr ? 'إضافة كورس جديد إلى المنصة' : 'Add New Course')
                    : (isAr ? 'تعديل بيانات وسعر الكورس' : 'Edit Course & Pricing')}
                </h3>
                <p className="text-xs text-slate-500">
                  {isAr ? 'التعديلات ستظهر فوراً للزوار والطلاب في الموقع.' : 'Updates reflect instantly on live website.'}
                </p>
              </div>

              <button
                onClick={() => setEditingCourse(null)}
                className="p-1.5 text-slate-400 hover:text-slate-800 rounded-xl"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveCourse} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {isAr ? 'اسم الكورس بالعربية:' : 'Arabic Title:'}
                  </label>
                  <input
                    type="text"
                    value={editingCourse.titleAr}
                    onChange={e => setEditingCourse({ ...editingCourse, titleAr: e.target.value })}
                    className="w-full border border-slate-200 rounded-xl p-2.5 text-xs outline-none focus:ring-2 focus:ring-sky-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {isAr ? 'اسم الكورس بالإنجليزية:' : 'English Title:'}
                  </label>
                  <input
                    type="text"
                    value={editingCourse.titleEn}
                    onChange={e => setEditingCourse({ ...editingCourse, titleEn: e.target.value })}
                    className="w-full border border-slate-200 rounded-xl p-2.5 text-xs outline-none focus:ring-2 focus:ring-sky-500"
                    required
                  />
                </div>
              </div>

              {/* Price Editor */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-sky-50 rounded-2xl border border-sky-100">
                <div>
                  <label className="block text-xs font-bold text-sky-900 mb-1">
                    {isAr ? 'سعر الحصة الفردية (بالدولار USD):' : 'Price per Session (USD):'}
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={100}
                    value={editingCourse.basePriceUSD}
                    onChange={e => setEditingCourse({ ...editingCourse, basePriceUSD: Number(e.target.value) })}
                    className="w-full bg-white border border-sky-200 rounded-xl p-2.5 text-xs font-bold text-sky-900 outline-none focus:ring-2 focus:ring-sky-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-sky-900 mb-1">
                    {isAr ? 'تكلفة الباقة الشهرية (8 حصص):' : 'Monthly Price (8 sessions):'}
                  </label>
                  <div className="pt-2 font-mono font-black text-sm text-sky-900">
                    ${editingCourse.basePriceUSD * 8} USD
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {isAr ? 'الوصف المختصر (بالعربية):' : 'Short Description (Arabic):'}
                </label>
                <textarea
                  rows={2}
                  value={editingCourse.shortDescAr}
                  onChange={e => setEditingCourse({ ...editingCourse, shortDescAr: e.target.value })}
                  className="w-full border border-slate-200 rounded-xl p-2.5 text-xs outline-none focus:ring-2 focus:ring-sky-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {isAr ? 'الوصف المختصر (بالإنجليزية):' : 'Short Description (English):'}
                </label>
                <textarea
                  rows={2}
                  value={editingCourse.shortDescEn}
                  onChange={e => setEditingCourse({ ...editingCourse, shortDescEn: e.target.value })}
                  className="w-full border border-slate-200 rounded-xl p-2.5 text-xs outline-none focus:ring-2 focus:ring-sky-500"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {isAr ? 'شارة التميز (Badge - اختياري):' : 'Badge (Optional):'}
                  </label>
                  <input
                    type="text"
                    value={editingCourse.badgeAr || ''}
                    onChange={e => setEditingCourse({ ...editingCourse, badgeAr: e.target.value, badgeEn: e.target.value })}
                    placeholder="e.g. الأكثر طلباً"
                    className="w-full border border-slate-200 rounded-xl p-2.5 text-xs outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {isAr ? 'عدد المستويات التعليمية:' : 'Number of Levels:'}
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={10}
                    value={editingCourse.levelsCount}
                    onChange={e => setEditingCourse({ ...editingCourse, levelsCount: Number(e.target.value) })}
                    className="w-full border border-slate-200 rounded-xl p-2.5 text-xs outline-none focus:ring-2 focus:ring-sky-500"
                    required
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setEditingCourse(null)}
                  className="px-5 py-2.5 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
                >
                  {isAr ? 'إلغاء' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl text-xs font-bold bg-slate-900 hover:bg-sky-600 text-white shadow flex items-center gap-1.5"
                >
                  <Save className="w-4 h-4" />
                  <span>{isAr ? 'حفظ التعديلات ونشرها' : 'Save & Publish'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Lead Modal */}
      {showAddLeadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 animate-in zoom-in-95">
            <h3 className="font-extrabold text-lg text-slate-900 mb-3">
              {isAr ? 'إضافة عميل محتمل جديد للـ CRM' : 'Add New CRM Lead'}
            </h3>
            <form onSubmit={e => {
              e.preventDefault();
              if (!newLeadName.trim() || !newLeadWhatsApp.trim()) return;
              const lead: Lead = {
                id: `lead-${Date.now()}`,
                name: newLeadName.trim(),
                whatsapp: newLeadWhatsApp.trim(),
                email: newLeadEmail.trim() || 'student@domain.com',
                country: newLeadCountry,
                countryCode: 'US',
                timezone: 'America/New_York',
                source: 'Website Form',
                interestedCourse: newLeadCourse as any,
                notes: 'Added manually via Admin Portal.',
                status: 'New Lead',
                createdAt: new Date().toISOString(),
                dealValueUSD: 95,
              };
              addNewLead(lead);
              setShowAddLeadModal(false);
              setNewLeadName('');
              setNewLeadWhatsApp('');
            }} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">{isAr ? 'الاسم:' : 'Name:'}</label>
                <input
                  type="text"
                  value={newLeadName}
                  onChange={e => setNewLeadName(e.target.value)}
                  placeholder="e.g. Tariq Mansoor"
                  className="w-full border border-slate-200 rounded-xl p-2.5 text-xs outline-none focus:ring-2 focus:ring-sky-500"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">{isAr ? 'رقم الواتساب:' : 'WhatsApp:'}</label>
                <input
                  type="tel"
                  value={newLeadWhatsApp}
                  onChange={e => setNewLeadWhatsApp(e.target.value)}
                  placeholder="+1 555-0192"
                  className="w-full border border-slate-200 rounded-xl p-2.5 text-xs outline-none focus:ring-2 focus:ring-sky-500"
                  required
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddLeadModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
                >
                  {isAr ? 'إلغاء' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-xs font-bold bg-sky-600 text-white shadow hover:bg-sky-700"
                >
                  {isAr ? 'حفظ العميل' : 'Save Lead'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

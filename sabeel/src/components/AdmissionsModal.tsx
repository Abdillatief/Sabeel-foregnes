import React, { useState } from 'react';
import { COURSES, Course } from '../data/coursesData';
import { playChime } from '../utils/audioHelper';
import { X, CheckCircle, ShieldCheck, Send } from 'lucide-react';

interface AdmissionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onEnrolledSuccess: (courseId: string) => void;
  preselectedCourseId?: string;
}

export const AdmissionsModal: React.FC<AdmissionsModalProps> = ({
  isOpen,
  onClose,
  onEnrolledSuccess,
  preselectedCourseId
}) => {
  const [courseId, setCourseId] = useState<string>(preselectedCourseId || COURSES[0].id);
  const [fullName, setFullName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [level, setLevel] = useState<string>('beginner');
  const [needsFinancialAid, setNeedsFinancialAid] = useState<boolean>(false);
  const [studyGoals, setStudyGoals] = useState<string>('');
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email) return;

    setIsSubmitted(true);
    playChime();
    onEnrolledSuccess(courseId);
  };

  const handleResetAndClose = () => {
    setIsSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-xl w-full max-h-[90vh] overflow-y-auto border border-stone-200 shadow-2xl p-6 md:p-8 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-stone-200">
          <div>
            <h3 className="text-xl font-bold text-stone-900">
              Academy Admission & Enrollment
            </h3>
            <p className="text-xs text-stone-500 mt-0.5">
              Sabeel Academy academic year admissions are open under Waqf endowment.
            </p>
          </div>
          <button
            onClick={handleResetAndClose}
            className="p-1.5 text-stone-400 hover:text-stone-700 rounded-lg border border-stone-200 hover:bg-stone-50 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {!isSubmitted ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Course Selector */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-stone-700">Select Academic Program:</label>
              <select
                value={courseId}
                onChange={(e) => setCourseId(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-800 text-stone-800"
              >
                {COURSES.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.title} ({c.level} · {c.duration})
                  </option>
                ))}
              </select>
            </div>

            {/* Name & Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-stone-700">Full Name:</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Abdullah Rahman"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-800 text-stone-800"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-stone-700">Email Address:</label>
                <input
                  type="email"
                  required
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-800 text-stone-800"
                />
              </div>
            </div>

            {/* Prior Background */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-stone-700">Current Arabic / Quranic Fluency:</label>
              <select
                value={level}
                onChange={(e) => setLevel(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-800 text-stone-800"
              >
                <option value="beginner">Beginner: Learning letters and basic reading</option>
                <option value="intermediate">Intermediate: Can read Quran fluently, seeking Tajweed & grammar</option>
                <option value="advanced">Advanced: Familiar with classical Arabic texts & Sarf</option>
              </select>
            </div>

            {/* Aspirations */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-stone-700">Study Goals & Aspirations (Optional):</label>
              <textarea
                rows={2}
                placeholder="What do you hope to achieve through this course?"
                value={studyGoals}
                onChange={(e) => setStudyGoals(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-800 text-stone-800"
              />
            </div>

            {/* Endowment Aid Notice */}
            <div className="p-3 bg-stone-50 border border-stone-200 rounded-xl space-y-1">
              <label className="flex items-start gap-2 cursor-pointer text-xs text-stone-700">
                <input
                  type="checkbox"
                  checked={needsFinancialAid}
                  onChange={(e) => setNeedsFinancialAid(e.target.checked)}
                  className="mt-0.5 rounded border-stone-300 text-emerald-800 focus:ring-emerald-700"
                />
                <span>
                  <strong>Full Waqf Grant:</strong> I request tuition-free access funded by the Sabeel Islamic Heritage Endowment.
                </span>
              </label>
            </div>

            {/* Action Buttons */}
            <div className="pt-4 border-t border-stone-200 flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-[11px] text-stone-400">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-800" />
                <span>Zero-risk registration</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleResetAndClose}
                  className="px-4 py-2 text-xs font-medium text-stone-600 hover:text-stone-900 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center gap-1.5 px-5 py-2 text-xs font-semibold text-white bg-emerald-900 rounded-lg hover:bg-emerald-950 transition-colors cursor-pointer shadow-xs"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit Application</span>
                </button>
              </div>
            </div>
          </form>
        ) : (
          /* Success Screen */
          <div className="text-center py-8 space-y-4">
            <div className="w-14 h-14 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto shadow-xs">
              <CheckCircle className="w-8 h-8" />
            </div>

            <div className="space-y-1">
              <h4 className="text-xl font-bold text-stone-900">Admission Confirmed!</h4>
              <p className="text-xs text-stone-600 max-w-sm mx-auto">
                Welcome to Sabeel Academy, <strong>{fullName}</strong>. A welcome syllabus and orientation link have been dispatched to <strong>{email}</strong>.
              </p>
            </div>

            <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 text-xs text-stone-600 max-w-sm mx-auto text-left space-y-1">
              <div className="font-semibold text-stone-900">Next Steps:</div>
              <p>1. Live lecture details added to your Student Portal.</p>
              <p>2. Prepare your recitation microphone for Tajweed phonetics.</p>
              <p>3. Review the Makharij Lab in preparation for Week 1.</p>
            </div>

            <button
              onClick={handleResetAndClose}
              className="mt-2 px-6 py-2.5 bg-emerald-900 text-white rounded-lg text-xs font-semibold hover:bg-emerald-950 transition-colors cursor-pointer"
            >
              Enter Student Portal
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

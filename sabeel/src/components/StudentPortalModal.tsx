import React, { useState, useEffect } from 'react';
import { COURSES, Course } from '../data/coursesData';
import { X, BookOpen, Clock, Award, Save, CheckCircle, FileText, Calendar } from 'lucide-react';
import { SabeelLogo } from './SabeelLogo';

interface StudentPortalModalProps {
  isOpen: boolean;
  onClose: () => void;
  enrolledCourseIds: string[];
}

export const StudentPortalModal: React.FC<StudentPortalModalProps> = ({
  isOpen,
  onClose,
  enrolledCourseIds
}) => {
  const [activeTab, setActiveTab] = useState<'courses' | 'notes' | 'certificates'>('courses');
  const [studyNotes, setStudyNotes] = useState<string>(() => {
    return localStorage.getItem('sabeel_study_notes') || '• Tajweed Rule: Qalqalah occurs in (Qutb Jad) when Sakin.\n• Arabic Syntax: Inna gives Nasb to the Ism and Raf to the Khabar.\n• Seerah insight: Hilf al-Fudul teaches universal justice for all victims of oppression.';
  });
  const [isNotesSaved, setIsNotesSaved] = useState<boolean>(false);

  useEffect(() => {
    if (isNotesSaved) {
      const timer = setTimeout(() => setIsNotesSaved(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [isNotesSaved]);

  if (!isOpen) return null;

  const enrolledCourses = COURSES.filter(c => enrolledCourseIds.includes(c.id));

  const handleSaveNotes = () => {
    localStorage.setItem('sabeel_study_notes', studyNotes);
    setIsNotesSaved(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto border border-stone-200 shadow-2xl p-6 md:p-8 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-stone-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-sky-50 border border-sky-200/80 flex items-center justify-center shadow-xs">
              <SabeelLogo size={36} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-stone-900">Student Academic Portal</h3>
              <p className="text-xs text-stone-500">
                Logged in as <span className="font-medium text-emerald-900">Talib al-Ilm (Student #SB-2026-904)</span>
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-700 rounded-lg border border-stone-200 hover:bg-stone-50 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center gap-1.5 border-b border-stone-200 pb-2">
          <button
            onClick={() => setActiveTab('courses')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
              activeTab === 'courses'
                ? 'bg-emerald-900 text-white'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            My Enrolled Courses ({enrolledCourses.length})
          </button>
          <button
            onClick={() => setActiveTab('notes')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
              activeTab === 'notes'
                ? 'bg-emerald-900 text-white'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Study Notes Scratchpad
          </button>
          <button
            onClick={() => setActiveTab('certificates')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
              activeTab === 'certificates'
                ? 'bg-emerald-900 text-white'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Sanad Transcripts & Badges
          </button>
        </div>

        {/* Tab 1: Enrolled Courses */}
        {activeTab === 'courses' && (
          <div className="space-y-4">
            {enrolledCourses.length > 0 ? (
              enrolledCourses.map((c, i) => (
                <div
                  key={c.id}
                  className="p-4 bg-stone-50 border border-stone-200 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-xs text-stone-500">
                      <span>{c.category}</span>
                      <span aria-hidden="true">·</span>
                      <span className="text-emerald-800 font-medium">{c.schedule}</span>
                    </div>
                    <h4 className="text-sm font-bold text-stone-900">{c.title}</h4>
                    <p className="text-xs text-stone-500">Instructor: {c.instructor}</p>

                    {/* Progress track */}
                    <div className="pt-2 w-full max-w-xs space-y-1">
                      <div className="flex justify-between text-[11px] text-stone-500">
                        <span>Attendance & Lessons</span>
                        <span className="font-semibold text-emerald-900 tabular-nums">
                          {i === 0 ? '70%' : '25%'}
                        </span>
                      </div>
                      <div className="w-full h-1.5 bg-stone-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-emerald-700"
                          style={{ width: i === 0 ? '70%' : '25%' }}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <a
                      href="#tajweed-lab"
                      onClick={onClose}
                      className="px-3 py-1.5 bg-white border border-stone-300 rounded-lg text-xs font-semibold text-stone-700 hover:bg-stone-100 transition-colors"
                    >
                      Classroom Lab
                    </a>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12 bg-stone-50 rounded-xl border border-stone-200 p-6 space-y-2">
                <BookOpen className="w-8 h-8 text-stone-400 mx-auto" />
                <h4 className="text-sm font-bold text-stone-800">You are not yet enrolled in any course</h4>
                <p className="text-xs text-stone-500">
                  Select a course from our curriculum to enroll and track your attendance.
                </p>
                <a
                  href="#curriculum"
                  onClick={onClose}
                  className="inline-block mt-2 px-4 py-2 bg-emerald-900 text-white rounded-lg text-xs font-semibold hover:bg-emerald-950 transition-colors"
                >
                  Browse Courses
                </a>
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Study Notes */}
        {activeTab === 'notes' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-stone-600">
                Personal Halqa & Lecture Notes:
              </label>
              <button
                onClick={handleSaveNotes}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-900 text-white rounded-lg text-xs font-semibold hover:bg-emerald-950 transition-colors cursor-pointer"
              >
                {isNotesSaved ? <CheckCircle className="w-3.5 h-3.5 text-amber-300" /> : <Save className="w-3.5 h-3.5" />}
                <span>{isNotesSaved ? 'Notes Saved!' : 'Save Notes'}</span>
              </button>
            </div>
            <textarea
              rows={8}
              value={studyNotes}
              onChange={(e) => setStudyNotes(e.target.value)}
              placeholder="Record your notes, vocabulary questions, and insights..."
              className="w-full p-4 bg-stone-50 border border-stone-300 rounded-xl text-xs sm:text-sm text-stone-800 focus:outline-none focus:ring-1 focus:ring-emerald-800 font-mono leading-relaxed"
            />
          </div>
        )}

        {/* Tab 3: Transcripts & Badges */}
        {activeTab === 'certificates' && (
          <div className="space-y-4">
            <div className="p-4 bg-stone-50 border border-stone-200 rounded-xl flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-stone-900">Classical Foundations Certificate</h4>
                  <p className="text-[11px] text-stone-500">Tajweed, Arabic Syntax, Prophetic History</p>
                </div>
              </div>
              <span className="text-xs font-semibold text-emerald-800">Verified by Sanad Board</span>
            </div>

            <div className="p-4 bg-stone-50 border border-stone-200 rounded-xl flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-900 flex items-center justify-center">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-stone-900">Quranic Articulation (Makharij) Badge</h4>
                  <p className="text-[11px] text-stone-500">28 Letters Articulation Precision Exam</p>
                </div>
              </div>
              <span className="text-xs font-semibold text-stone-500">Earned</span>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="pt-4 border-t border-stone-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-stone-600 hover:text-stone-900 cursor-pointer"
          >
            Close Portal
          </button>
        </div>
      </div>
    </div>
  );
};

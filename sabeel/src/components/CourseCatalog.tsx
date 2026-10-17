import React, { useState } from 'react';
import { COURSES, Course } from '../data/coursesData';
import { Search, Star, Clock, User, BookOpen, Check, X, Calendar, Award } from 'lucide-react';

interface CourseCatalogProps {
  onEnroll: (course: Course) => void;
  enrolledCourseIds: string[];
}

export const CourseCatalog: React.FC<CourseCatalogProps> = ({ onEnroll, enrolledCourseIds }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedLevel, setSelectedLevel] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeCourseModal, setActiveCourseModal] = useState<Course | null>(null);

  const categories = ['All', 'Quran & Tajweed', 'Arabic Language', 'Islamic Sciences', 'Seerah & History', 'Youth & Leadership'];
  const levels = ['All', 'Beginner', 'Intermediate', 'Advanced'];

  const filteredCourses = COURSES.filter((course) => {
    const matchesCat = selectedCategory === 'All' || course.category === selectedCategory;
    const matchesLevel = selectedLevel === 'All' || course.level === selectedLevel;
    const matchesSearch =
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.arabicTitle.includes(searchQuery) ||
      course.instructor.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesLevel && matchesSearch;
  });

  return (
    <section id="curriculum" className="py-16 bg-stone-50 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-6 border-b border-stone-200">
          <div>
            <div className="text-xs font-semibold text-emerald-800 tracking-wide uppercase">
              Academic Curricula & Programs
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 mt-1">
              Sanad-Linked Faculty & Structured Courses
            </h2>
            <p className="text-sm text-stone-600 mt-1 max-w-2xl">
              All courses are designed with weekly live interactive seminars, personal recitation correction circles, and structured examinations.
            </p>
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search subjects, scholars..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs bg-white border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-800 text-stone-800"
            />
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-emerald-900 text-white shadow-xs'
                    : 'bg-white border border-stone-200 text-stone-600 hover:bg-stone-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Level Filter */}
          <div className="flex items-center gap-1 bg-white border border-stone-200 p-1 rounded-lg self-end sm:self-auto shrink-0">
            <span className="text-[11px] font-semibold text-stone-400 px-2 uppercase">Level:</span>
            {levels.map((lvl) => (
              <button
                key={lvl}
                onClick={() => setSelectedLevel(lvl)}
                className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                  selectedLevel === lvl
                    ? 'bg-stone-900 text-white'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                {lvl}
              </button>
            ))}
          </div>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => {
            const isEnrolled = enrolledCourseIds.includes(course.id);

            return (
              <div
                key={course.id}
                className="bg-white border border-stone-200 rounded-2xl overflow-hidden hover:border-stone-300 hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Course Image */}
                  <div className="relative aspect-16/10 bg-stone-100 overflow-hidden">
                    <img
                      src={course.image}
                      alt={course.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                    <div className="absolute top-3 left-3 bg-stone-900/80 backdrop-blur-sm text-white px-2.5 py-1 rounded-md text-[11px] font-medium">
                      {course.category}
                    </div>
                    <div className="absolute top-3 right-3 bg-emerald-950/85 backdrop-blur-sm text-amber-300 px-2.5 py-1 rounded-md text-[11px] font-bold">
                      {course.tuition}
                    </div>
                  </div>

                  {/* Course Info */}
                  <div className="p-5 space-y-3">
                    <div className="font-arabic text-sm text-emerald-900 font-bold text-right" dir="rtl">
                      {course.arabicTitle}
                    </div>

                    <h3 className="text-base font-bold text-stone-900 leading-snug">
                      {course.title}
                    </h3>

                    {/* Unboxed Metadata Line */}
                    <div className="flex items-center gap-2 text-xs text-stone-500">
                      <span>{course.duration}</span>
                      <span aria-hidden="true">·</span>
                      <span>{course.level}</span>
                      <span aria-hidden="true">·</span>
                      <span className="flex items-center gap-1 text-amber-800 font-semibold tabular-nums">
                        <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                        {course.rating}
                      </span>
                    </div>

                    <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
                      {course.description}
                    </p>

                    <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
                      <span className="font-medium text-stone-800 truncate">{course.instructor}</span>
                      <span className="tabular-nums shrink-0">{course.enrolledCount.toLocaleString()} enrolled</span>
                    </div>
                  </div>
                </div>

                {/* Card Action Buttons */}
                <div className="p-5 pt-0 flex items-center gap-2">
                  <button
                    onClick={() => setActiveCourseModal(course)}
                    className="flex-1 py-2 text-xs font-semibold text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors cursor-pointer text-center"
                  >
                    Syllabus & Info
                  </button>

                  <button
                    onClick={() => onEnroll(course)}
                    className={`flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer shrink-0 ${
                      isEnrolled
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                        : 'bg-emerald-900 text-white hover:bg-emerald-950'
                    }`}
                  >
                    {isEnrolled ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Enrolled</span>
                      </>
                    ) : (
                      <>
                        <BookOpen className="w-3.5 h-3.5" />
                        <span>Enroll</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {filteredCourses.length === 0 && (
          <div className="text-center py-16 bg-white border border-stone-200 rounded-2xl p-8">
            <BookOpen className="w-8 h-8 text-stone-400 mx-auto mb-2" />
            <h4 className="text-sm font-bold text-stone-800">No courses match your filter</h4>
            <p className="text-xs text-stone-500 mt-1">Try resetting the category or search criteria.</p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSelectedLevel('All');
                setSearchQuery('');
              }}
              className="mt-4 px-4 py-2 bg-stone-100 text-stone-800 rounded-lg text-xs font-semibold hover:bg-stone-200 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Detailed Syllabus Modal */}
        {activeCourseModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs">
            <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-stone-200 shadow-2xl p-6 md:p-8 space-y-6">
              <div className="flex items-start justify-between gap-4 pb-4 border-b border-stone-200">
                <div>
                  <div className="font-arabic text-lg text-emerald-900 font-bold" dir="rtl">
                    {activeCourseModal.arabicTitle}
                  </div>
                  <h3 className="text-xl font-bold text-stone-900 mt-0.5">
                    {activeCourseModal.title}
                  </h3>
                  <div className="flex items-center gap-2 text-xs text-stone-500 mt-1">
                    <span>{activeCourseModal.category}</span>
                    <span aria-hidden="true">·</span>
                    <span>{activeCourseModal.level}</span>
                    <span aria-hidden="true">·</span>
                    <span>{activeCourseModal.duration}</span>
                  </div>
                </div>
                <button
                  onClick={() => setActiveCourseModal(null)}
                  className="p-1.5 text-stone-400 hover:text-stone-700 rounded-lg border border-stone-200 hover:bg-stone-50"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Instructor Profile */}
              <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-emerald-900 text-white flex items-center justify-center font-bold text-sm shrink-0">
                  {activeCourseModal.instructor.split(' ')[1]?.[0] || 'S'}
                </div>
                <div>
                  <div className="text-sm font-bold text-stone-900">{activeCourseModal.instructor}</div>
                  <div className="text-xs text-stone-600">{activeCourseModal.instructorTitle}</div>
                  <div className="text-[11px] text-stone-400 mt-0.5 flex items-center gap-2">
                    <Calendar className="w-3 h-3" />
                    <span>{activeCourseModal.schedule}</span>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div>
                <h4 className="text-xs font-semibold text-stone-500 uppercase tracking-wide mb-1.5">
                  Course Overview
                </h4>
                <p className="text-sm text-stone-700 leading-relaxed">
                  {activeCourseModal.description}
                </p>
              </div>

              {/* Syllabus Breakdown */}
              <div>
                <h4 className="text-xs font-semibold text-stone-500 uppercase tracking-wide mb-2.5">
                  Curriculum Modules & Topics
                </h4>
                <div className="space-y-2.5">
                  {activeCourseModal.modules.map((m) => (
                    <div key={m.week} className="p-3 bg-stone-50 rounded-xl border border-stone-200/80">
                      <div className="text-xs font-bold text-stone-900">
                        Week {m.week}: {m.title}
                      </div>
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {m.topics.map((t, ti) => (
                          <span
                            key={ti}
                            className="text-[11px] bg-white border border-stone-200 px-2 py-0.5 rounded text-stone-600"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Prerequisites & Tuition */}
              <div className="pt-2 text-xs text-stone-500 space-y-1">
                <div>
                  <strong className="text-stone-700">Prerequisites: </strong>
                  {activeCourseModal.prerequisites}
                </div>
                <div>
                  <strong className="text-stone-700">Tuition: </strong>
                  {activeCourseModal.tuition} — Open registration under Waqf grant.
                </div>
              </div>

              {/* Modal Action */}
              <div className="pt-4 border-t border-stone-200 flex justify-end gap-3">
                <button
                  onClick={() => setActiveCourseModal(null)}
                  className="px-4 py-2 text-xs font-medium text-stone-600 hover:text-stone-900 cursor-pointer"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    onEnroll(activeCourseModal);
                    setActiveCourseModal(null);
                  }}
                  className="px-5 py-2.5 text-xs font-semibold text-white bg-emerald-900 hover:bg-emerald-950 rounded-lg transition-colors cursor-pointer"
                >
                  Confirm Enrollment
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

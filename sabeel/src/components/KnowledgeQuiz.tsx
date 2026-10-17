import React, { useState } from 'react';
import { QUIZ_QUESTIONS, QuizQuestion } from '../data/quizData';
import { playChime, playTasbihClick } from '../utils/audioHelper';
import { CheckCircle2, XCircle, RotateCcw, Award, ChevronRight, BookOpen, Download } from 'lucide-react';

export const KnowledgeQuiz: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [studentName, setStudentName] = useState<string>('Talib al-Ilm');
  const [showCertificate, setShowCertificate] = useState<boolean>(false);

  const currentQ: QuizQuestion = QUIZ_QUESTIONS[currentIndex];

  const handleSelect = (idx: number) => {
    if (isAnswerSubmitted) return;
    setSelectedOption(idx);
    playTasbihClick();
  };

  const handleSubmitAnswer = () => {
    if (selectedOption === null || isAnswerSubmitted) return;
    setIsAnswerSubmitted(true);
    if (selectedOption === currentQ.correctIndex) {
      setScore(prev => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex + 1 < QUIZ_QUESTIONS.length) {
      setCurrentIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswerSubmitted(false);
    } else {
      setIsCompleted(true);
      playChime();
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
    setScore(0);
    setIsCompleted(false);
    setShowCertificate(false);
  };

  return (
    <section id="assessment" className="py-16 bg-white border-b border-stone-200">
      <div className="max-w-4xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-10 space-y-2">
          <div className="text-xs font-semibold text-emerald-800 tracking-wide uppercase">
            Sanad Assessment & Knowledge Check
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-stone-900">
            Interactive Classical Scholarship Quiz
          </h2>
          <p className="text-sm text-stone-600">
            Test your comprehension of Tajweed rules, Arabic grammar fundamentals, and historical milestones.
          </p>
        </div>

        {!isCompleted ? (
          <div className="bg-stone-50 border border-stone-200 rounded-2xl p-6 md:p-8 space-y-6">
            {/* Progress Bar & Header */}
            <div className="flex items-center justify-between text-xs text-stone-500 pb-3 border-b border-stone-200">
              <span className="font-semibold text-emerald-900">
                Question {currentIndex + 1} of {QUIZ_QUESTIONS.length}
              </span>
              <span className="bg-white border border-stone-200 px-2.5 py-1 rounded text-stone-700 font-medium">
                Category: {currentQ.category}
              </span>
            </div>

            {/* Question Text */}
            <div className="space-y-2">
              {currentQ.arabicPrompt && (
                <div className="font-arabic text-xl font-bold text-emerald-950 text-right" dir="rtl">
                  {currentQ.arabicPrompt}
                </div>
              )}
              <h3 className="text-lg font-bold text-stone-900 leading-snug">
                {currentQ.question}
              </h3>
            </div>

            {/* Options List */}
            <div className="space-y-3 pt-2">
              {currentQ.options.map((opt, optIdx) => {
                const isSelected = selectedOption === optIdx;
                const isCorrect = optIdx === currentQ.correctIndex;

                let optionStyles = 'border-stone-200 bg-white hover:border-stone-300 text-stone-800';

                if (isAnswerSubmitted) {
                  if (isCorrect) {
                    optionStyles = 'border-emerald-600 bg-emerald-50/80 text-emerald-950 font-semibold ring-1 ring-emerald-600';
                  } else if (isSelected && !isCorrect) {
                    optionStyles = 'border-rose-400 bg-rose-50 text-rose-950';
                  } else {
                    optionStyles = 'border-stone-200 bg-stone-100/50 text-stone-400 opacity-70';
                  }
                } else if (isSelected) {
                  optionStyles = 'border-emerald-800 bg-emerald-50 text-emerald-950 ring-1 ring-emerald-800';
                }

                return (
                  <button
                    key={optIdx}
                    onClick={() => handleSelect(optIdx)}
                    disabled={isAnswerSubmitted}
                    className={`w-full text-left p-4 rounded-xl border text-sm transition-all flex items-center justify-between cursor-pointer ${optionStyles}`}
                  >
                    <span>{opt}</span>
                    {isAnswerSubmitted && isCorrect && (
                      <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0" />
                    )}
                    {isAnswerSubmitted && isSelected && !isCorrect && (
                      <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Explanation card after submit */}
            {isAnswerSubmitted && (
              <div className="p-4 bg-white border border-stone-200 rounded-xl space-y-1.5 text-xs animate-fadeIn">
                <div className="font-bold text-stone-900">Scholarly Commentary:</div>
                <p className="text-stone-700 leading-relaxed">{currentQ.explanation}</p>
                <div className="text-[11px] font-mono text-emerald-800 pt-1">
                  Classical Reference: {currentQ.classicalSource}
                </div>
              </div>
            )}

            {/* Footer Actions */}
            <div className="pt-4 border-t border-stone-200 flex items-center justify-between">
              <span className="text-xs text-stone-400 tabular-nums">
                Current Score: {score} / {currentIndex + (isAnswerSubmitted ? 1 : 0)}
              </span>

              {!isAnswerSubmitted ? (
                <button
                  onClick={handleSubmitAnswer}
                  disabled={selectedOption === null}
                  className={`px-5 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                    selectedOption !== null
                      ? 'bg-emerald-900 text-white hover:bg-emerald-950'
                      : 'bg-stone-200 text-stone-400 cursor-not-allowed'
                  }`}
                >
                  Confirm Answer
                </button>
              ) : (
                <button
                  onClick={handleNext}
                  className="inline-flex items-center gap-1.5 px-5 py-2 text-xs font-semibold bg-emerald-900 text-white rounded-lg hover:bg-emerald-950 transition-colors cursor-pointer"
                >
                  <span>{currentIndex + 1 < QUIZ_QUESTIONS.length ? 'Next Question' : 'View Results'}</span>
                  <ChevronRight className="w-4 h-4 text-amber-300" />
                </button>
              )}
            </div>
          </div>
        ) : (
          /* Completion State */
          <div className="bg-stone-50 border border-stone-200 rounded-2xl p-8 text-center space-y-6">
            <div className="w-16 h-16 bg-amber-100 text-amber-800 rounded-full flex items-center justify-center mx-auto shadow-xs">
              <Award className="w-8 h-8" />
            </div>

            <div className="space-y-1">
              <h3 className="text-2xl font-bold text-stone-900">Assessment Completed!</h3>
              <p className="text-sm text-stone-600">
                You achieved a final score of{' '}
                <strong className="text-stone-900 tabular-nums font-bold">
                  {score} out of {QUIZ_QUESTIONS.length}
                </strong>{' '}
                ({Math.round((score / QUIZ_QUESTIONS.length) * 100)}%)
              </p>
            </div>

            {/* Name Input for Certificate */}
            <div className="max-w-xs mx-auto text-left space-y-1.5">
              <label className="text-xs font-semibold text-stone-600">
                Name on Academic Certificate:
              </label>
              <input
                type="text"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                placeholder="Your Full Name"
                className="w-full px-3 py-2 text-xs bg-white border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-800 text-stone-800"
              />
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <button
                onClick={() => setShowCertificate(true)}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-900 text-white rounded-lg text-xs font-semibold hover:bg-emerald-950 transition-colors cursor-pointer shadow-xs"
              >
                <Award className="w-4 h-4 text-amber-300" />
                <span>View Academy Certificate</span>
              </button>
              <button
                onClick={handleRestart}
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-white border border-stone-300 text-stone-700 rounded-lg text-xs font-semibold hover:bg-stone-100 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Retake Assessment</span>
              </button>
            </div>
          </div>
        )}

        {/* Certificate Modal */}
        {showCertificate && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/70 backdrop-blur-xs">
            <div className="bg-white rounded-2xl max-w-2xl w-full border-4 border-amber-300/60 p-8 space-y-6 shadow-2xl relative text-center">
              {/* Certificate Inner Frame */}
              <div className="border border-stone-300 p-8 rounded-xl bg-[radial-gradient(#fafaf9_1px,transparent_1px)] [background-size:20px_20px] relative">
                <div className="text-xs font-serif uppercase tracking-widest text-amber-900 font-bold">
                  Sabeel Academy · معهد السبيل للعلوم الشرعية
                </div>
                <div className="font-arabic text-xl font-bold text-emerald-950 mt-1">
                  شهادة إتمام التقييم المعرفي
                </div>
                <h3 className="text-2xl font-serif font-bold text-stone-900 mt-3">
                  Certificate of Classical Proficiency
                </h3>
                <p className="text-xs text-stone-500 mt-1">
                  This certifies that
                </p>

                <div className="font-serif text-2xl font-bold text-emerald-950 my-3 py-1 border-b border-stone-300 inline-block px-8">
                  {studentName || 'Honored Student'}
                </div>

                <p className="text-xs text-stone-600 max-w-md mx-auto leading-relaxed">
                  Has successfully completed the Sanad Assessment examination in Quranic Tajweed, Classical Arabic Syntax (Nahw), and Prophetic History with distinction score ({score}/{QUIZ_QUESTIONS.length}).
                </p>

                <div className="mt-8 pt-4 border-t border-stone-200 grid grid-cols-2 gap-4 text-left">
                  <div>
                    <div className="text-[10px] text-stone-400 uppercase font-mono">Date Issued</div>
                    <div className="text-xs font-semibold text-stone-800">
                      {new Date().toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] text-stone-400 uppercase font-mono">Academic Seal</div>
                    <div className="text-xs font-serif font-bold text-emerald-900">
                      Sabeel Academic Board · الإجازة
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-3 pt-2">
                <button
                  onClick={() => setShowCertificate(false)}
                  className="px-4 py-2 text-xs font-medium text-stone-600 hover:text-stone-900 cursor-pointer"
                >
                  Close
                </button>
                <button
                  onClick={() => window.print()}
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-emerald-900 rounded-lg hover:bg-emerald-950 transition-colors cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Print Certificate</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

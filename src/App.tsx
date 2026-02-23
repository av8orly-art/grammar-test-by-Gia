/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  CheckCircle2, 
  XCircle, 
  ChevronRight, 
  RotateCcw, 
  Trophy, 
  BookOpen, 
  Info,
  ExternalLink,
  GraduationCap
} from 'lucide-react';
import { 
  QUESTION_BANK, 
  Question, 
  Difficulty, 
  GrammarPoint,
  Level,
  KET_QUESTIONS,
  PET_QUESTIONS
} from './types.ts';

// --- Components ---

const Badge = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${className}`}>
    {children}
  </span>
);

const DifficultyBadge = ({ difficulty }: { difficulty: Difficulty }) => {
  const colors = {
    [Difficulty.Beginner]: "bg-emerald-100 text-emerald-700 border border-emerald-200",
    [Difficulty.Intermediate]: "bg-amber-100 text-amber-700 border border-amber-200",
    [Difficulty.Advanced]: "bg-rose-100 text-rose-700 border border-rose-200",
  };
  return <Badge className={colors[difficulty]}>{difficulty}</Badge>;
};

const CategoryBadge = ({ category }: { category: GrammarPoint }) => (
  <Badge className="bg-slate-100 text-slate-600 border border-slate-200">{category}</Badge>
);

export default function App() {
  const [selectedLevel, setSelectedLevel] = useState<Level | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [activeExplanation, setActiveExplanation] = useState<number | null>(null);
  
  // 错题追踪
  const [wrongQuestionIds, setWrongQuestionIds] = useState<string[]>([]);
  const [isRedoMode, setIsRedoMode] = useState(false);
  const [isReviewMode, setIsReviewMode] = useState(false);

  const questions = useMemo(() => {
    if (isRedoMode || isReviewMode) {
      return QUESTION_BANK.filter(q => wrongQuestionIds.includes(q.id));
    }
    
    let baseQuestions: Question[] = [];
    if (selectedLevel === Level.KET) baseQuestions = KET_QUESTIONS;
    if (selectedLevel === Level.PET) baseQuestions = PET_QUESTIONS;
    
    // 限制题目数量 (KET 20题, PET 40题)
    const count = selectedLevel === Level.KET ? 20 : 40;
    return baseQuestions.slice(0, count);
  }, [selectedLevel, isRedoMode, isReviewMode, wrongQuestionIds]);

  const currentQuestion = questions[currentIndex];
  const totalQuestions = questions.length;

  const encouragement = useMemo(() => {
    if (totalQuestions === 0) return "";
    const ratio = score / totalQuestions;
    if (ratio === 1) return "完美！你已经掌握了这些复杂的语法结构！";
    if (ratio >= 0.8) return "太棒了！你的语法基础非常扎实。";
    if (ratio >= 0.6) return "做得不错！再接再厉，你会更上一层楼。";
    return "加油！多看解析，掌握这些规则并不难。";
  }, [score, totalQuestions, showResults]);

  const handleOptionSelect = (blankId: string, optionText: string) => {
    if (isSubmitted) return;
    setUserAnswers(prev => ({ ...prev, [blankId]: optionText }));
  };

  const handleSubmit = () => {
    if (isSubmitted) return;

    let isCorrect = true;
    currentQuestion.blanks.forEach(blank => {
      if (userAnswers[blank.id] !== blank.correctAnswer) {
        isCorrect = false;
      }
    });

    if (isCorrect) {
      setScore(prev => prev + 1);
    } else {
      if (!wrongQuestionIds.includes(currentQuestion.id)) {
        setWrongQuestionIds(prev => [...prev, currentQuestion.id]);
      }
    }
    setIsSubmitted(true);
  };

  const handleNext = () => {
    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex(prev => prev + 1);
      setUserAnswers({});
      setIsSubmitted(false);
      setActiveExplanation(null);
    } else {
      setShowResults(true);
    }
  };

  const handleRestart = () => {
    setSelectedLevel(null);
    setCurrentIndex(0);
    setUserAnswers({});
    setIsSubmitted(false);
    setScore(0);
    setShowResults(false);
    setActiveExplanation(null);
    setIsRedoMode(false);
    setIsReviewMode(false);
  };

  const startRedo = () => {
    setCurrentIndex(0);
    setUserAnswers({});
    setIsSubmitted(false);
    setScore(0);
    setShowResults(false);
    setActiveExplanation(null);
    setIsRedoMode(true);
    setIsReviewMode(false);
  };

  const startReview = () => {
    setCurrentIndex(0);
    setIsSubmitted(true);
    setShowResults(false);
    setActiveExplanation(0);
    setIsRedoMode(false);
    setIsReviewMode(true);
  };

  // 在回顾模式下自动填充正确答案
  React.useEffect(() => {
    if (isReviewMode && currentQuestion) {
      const reviewAnswers: Record<string, string> = {};
      currentQuestion.blanks.forEach(b => {
        reviewAnswers[b.id] = b.correctAnswer;
      });
      setUserAnswers(reviewAnswers);
    }
  }, [currentIndex, isReviewMode, currentQuestion]);

  if (!selectedLevel && !isRedoMode && !isReviewMode) {
    return (
      <div className="min-h-screen bg-[#F8F9FA] flex items-center justify-center p-4 font-sans">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl shadow-xl p-8 max-w-md w-full border border-slate-100"
        >
          <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center mb-6">
            <GraduationCap className="w-8 h-8 text-indigo-600" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">选择题库级别</h2>
          <p className="text-slate-500 mb-8">请根据你的学习目标选择适合的语法练习级别。</p>
          
          <div className="space-y-4">
            <button 
              onClick={() => setSelectedLevel(Level.KET)}
              className="w-full p-6 bg-white border-2 border-slate-100 rounded-2xl text-left hover:border-indigo-500 hover:bg-indigo-50 transition-all group"
            >
              <h3 className="text-lg font-bold text-slate-900 group-hover:text-indigo-700">KET (初级)</h3>
              <p className="text-sm text-slate-500">适合初学者，涵盖基础时态、简单从句和常用连词。</p>
            </button>
            <button 
              onClick={() => setSelectedLevel(Level.PET)}
              className="w-full p-6 bg-white border-2 border-slate-100 rounded-2xl text-left hover:border-indigo-500 hover:bg-indigo-50 transition-all group"
            >
              <h3 className="text-lg font-bold text-slate-900 group-hover:text-indigo-700">PET (中级)</h3>
              <p className="text-sm text-slate-500">适合有一定基础的学生，包含虚拟语气、被动语态和复杂从句。</p>
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  const progress = ((currentIndex + 1) / totalQuestions) * 100;

  if (showResults) {
    return (
      <div className="min-h-screen bg-[#F8F9FA] flex items-center justify-center p-4 font-sans">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-3xl shadow-xl p-8 max-w-md w-full text-center border border-slate-100"
        >
          <div className="w-20 h-20 bg-indigo-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <Trophy className="w-10 h-10 text-indigo-600" />
          </div>
          <h2 className="text-3xl font-bold text-slate-900 mb-2">测试完成!</h2>
          <div className="text-6xl font-black text-indigo-600 mb-4">
            {score}<span className="text-2xl text-slate-400">/{totalQuestions}</span>
          </div>
          <p className="text-slate-600 mb-8 leading-relaxed">
            {encouragement}
          </p>
          
          {wrongQuestionIds.length > 0 && (
            <div className="space-y-3 mb-8">
              <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">错题集管理</h3>
              <div className="grid grid-cols-2 gap-3">
                <button 
                  onClick={startReview}
                  className="flex items-center justify-center gap-2 p-3 bg-rose-50 text-rose-600 rounded-xl hover:bg-rose-100 transition-colors font-bold text-sm"
                >
                  <BookOpen className="w-4 h-4" />
                  查看错题解析
                </button>
                <button 
                  onClick={startRedo}
                  className="flex items-center justify-center gap-2 p-3 bg-amber-50 text-amber-600 rounded-xl hover:bg-amber-100 transition-colors font-bold text-sm"
                >
                  <RotateCcw className="w-4 h-4" />
                  重做错题
                </button>
              </div>
            </div>
          )}

          <button 
            onClick={handleRestart}
            className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 flex items-center justify-center gap-2"
          >
            <RotateCcw className="w-5 h-5" />
            重新开始
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-slate-900 font-sans selection:bg-indigo-100">
      {/* Header */}
      <header className="bg-white border-bottom border-slate-200 sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-100">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-slate-900 leading-none">GrammarMaster</h1>
              <div className="flex items-center gap-2 mt-1">
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Junior High Edition</p>
                <span className="text-[10px] bg-indigo-50 text-indigo-600 px-1.5 py-0.5 rounded font-bold">
                  {isRedoMode ? "重做模式" : isReviewMode ? "错题回顾" : selectedLevel}
                </span>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-xs font-bold text-slate-400 mb-1">进度 {currentIndex + 1}/{totalQuestions}</span>
            <div className="w-32 h-1.5 bg-slate-100 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                className="h-full bg-indigo-500"
              />
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            {/* Question Info */}
            <div className="flex items-center gap-2">
              <DifficultyBadge difficulty={currentQuestion.difficulty} />
              <CategoryBadge category={currentQuestion.category} />
            </div>

            {/* Sentence Card */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-indigo-500 opacity-20" />
              <div className="text-2xl md:text-3xl font-medium leading-relaxed text-slate-800">
                {currentQuestion.sentenceParts.map((part, idx) => (
                  <React.Fragment key={idx}>
                    {part}
                    {idx < currentQuestion.blanks.length && (
                      <span 
                        className={`inline-block min-w-[120px] mx-2 border-b-2 transition-all px-2 py-1 text-center ${
                          isSubmitted 
                            ? userAnswers[currentQuestion.blanks[idx].id] === currentQuestion.blanks[idx].correctAnswer
                              ? "border-emerald-500 text-emerald-600 bg-emerald-50 rounded-t-lg"
                              : "border-rose-500 text-rose-600 bg-rose-50 rounded-t-lg"
                            : userAnswers[currentQuestion.blanks[idx].id]
                              ? "border-indigo-500 text-indigo-600"
                              : "border-slate-300 text-slate-300"
                        }`}
                      >
                        {userAnswers[currentQuestion.blanks[idx].id] || "________"}
                      </span>
                    )}
                  </React.Fragment>
                ))}
              </div>
              
              {isSubmitted && (
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-6 text-slate-400 italic text-lg"
                >
                  {currentQuestion.translation}
                </motion.p>
              )}
            </div>

            {/* Options Area */}
            <div className="space-y-8">
              {currentQuestion.blanks.map((blank, bIdx) => (
                <div key={blank.id} className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                      <BookOpen className="w-4 h-4" />
                      选择正确答案
                    </h3>
                    {isSubmitted && (
                      <button 
                        onClick={() => setActiveExplanation(activeExplanation === bIdx ? null : bIdx)}
                        className="text-xs font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1"
                      >
                        <Info className="w-3 h-3" />
                        {activeExplanation === bIdx ? "隐藏解析" : "查看解析"}
                      </button>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {blank.options.map((option) => (
                      <button
                        key={option.id}
                        disabled={isSubmitted}
                        onClick={() => handleOptionSelect(blank.id, option.text)}
                        className={`py-4 px-4 rounded-2xl font-bold text-sm transition-all border-2 ${
                          userAnswers[blank.id] === option.text
                            ? isSubmitted
                              ? option.text === blank.correctAnswer
                                ? "bg-emerald-50 border-emerald-500 text-emerald-700"
                                : "bg-rose-50 border-rose-500 text-rose-700"
                              : "bg-indigo-50 border-indigo-500 text-indigo-700"
                            : isSubmitted && option.text === blank.correctAnswer
                              ? "bg-emerald-50 border-emerald-200 text-emerald-600 border-dashed"
                              : "bg-white border-slate-100 text-slate-600 hover:border-indigo-200 hover:bg-slate-50"
                        }`}
                      >
                        {option.text}
                      </button>
                    ))}
                  </div>

                  {/* Explanation Card */}
                  <AnimatePresence>
                    {isSubmitted && activeExplanation === bIdx && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm space-y-4">
                          <div className="flex items-start gap-3">
                            <div className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center shrink-0">
                              <CheckCircle2 className="w-5 h-5 text-indigo-600" />
                            </div>
                            <div>
                              <h4 className="font-bold text-slate-900 mb-1">语法规则</h4>
                              <p className="text-sm text-slate-600 leading-relaxed">{blank.explanation.rule}</p>
                            </div>
                          </div>
                          
                          <div className="flex items-start gap-3">
                            <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center shrink-0">
                              <BookOpen className="w-5 h-5 text-emerald-600" />
                            </div>
                            <div>
                              <h4 className="font-bold text-slate-900 mb-1">经典例句</h4>
                              <p className="text-sm text-slate-600 italic">"{blank.explanation.example}"</p>
                            </div>
                          </div>

                          <div className="flex items-start gap-3">
                            <div className="w-8 h-8 rounded-full bg-rose-50 flex items-center justify-center shrink-0">
                              <XCircle className="w-5 h-5 text-rose-600" />
                            </div>
                            <div>
                              <h4 className="font-bold text-slate-900 mb-1">常见错误</h4>
                              <p className="text-sm text-slate-600">{blank.explanation.commonMistake}</p>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>

            {/* Actions */}
            <div className="pt-8 flex gap-4">
              {!isSubmitted ? (
                <button
                  onClick={handleSubmit}
                  disabled={Object.keys(userAnswers).length < currentQuestion.blanks.length}
                  className="flex-1 py-4 bg-indigo-600 text-white rounded-2xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100 disabled:opacity-50 disabled:shadow-none"
                >
                  提交答案
                </button>
              ) : (
                <button
                  onClick={handleNext}
                  className="flex-1 py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 transition-all shadow-lg shadow-slate-200 flex items-center justify-center gap-2"
                >
                  {currentIndex < totalQuestions - 1 ? "下一题" : "查看结果"}
                  <ChevronRight className="w-5 h-5" />
                </button>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer Branding */}
      <footer className="max-w-3xl mx-auto px-4 py-12 text-center">
        <p className="text-xs font-bold text-slate-300 uppercase tracking-[0.2em]">Crafted for Learning Excellence</p>
      </footer>
    </div>
  );
}

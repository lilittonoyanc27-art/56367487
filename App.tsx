/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useCallback } from 'react';
import {
  Volume2,
  Search,
  BookOpen,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Eye,
  EyeOff,
  HelpCircle,
  Layers,
  Sparkles,
  ArrowRight,
  ExternalLink,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import {
  ROMANCE_SECTIONS,
  PRESET_VERSES,
  QUIZ_QUESTIONS,
  Section,
  ContentBlock,
  QuizQuestion
} from './data.ts';

type ViewMode = 'click-reveal' | 'parallel' | 'spanish-only' | 'armenian-only';
type FontSize = 'normal' | 'large' | 'xlarge';

export default function App() {
  // Navigation & Search State
  const [activeTab, setActiveTab] = useState<'guide' | 'lab' | 'quiz' | 'exam-ready'>('guide');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [partFilter, setPartFilter] = useState<'all' | '1' | '2'>('all');

  // Font size state: normal, large (default), xlarge
  const [fontSize, setFontSize] = useState<FontSize>('large');

  // Reveal state for Spanish -> Armenian click-to-reveal
  // Map of block ID to boolean (true = revealed)
  const [revealedBlocks, setRevealedBlocks] = useState<Record<string, boolean>>({});
  const [viewMode, setViewMode] = useState<ViewMode>('click-reveal');

  // Audio / Speech Synthesis state
  const [speakingId, setSpeakingId] = useState<string | null>(null);

  // Metric Laboratory State
  const [selectedPresetIndex, setSelectedPresetIndex] = useState<number>(0);
  const [customVerse, setCustomVerse] = useState<string>(PRESET_VERSES[0].text);

  // Quiz State
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [quizFinished, setQuizFinished] = useState(false);

  // Bookmarks / Saved concepts
  const [bookmarkedSections, setBookmarkedSections] = useState<string[]>([]);

  // Toggle reveal for a specific block
  const toggleReveal = useCallback((blockId: string) => {
    setRevealedBlocks((prev) => ({
      ...prev,
      [blockId]: !prev[blockId],
    }));
  }, []);

  // Reveal all or hide all
  const setAllRevealed = useCallback((revealed: boolean) => {
    const newMap: Record<string, boolean> = {};
    ROMANCE_SECTIONS.forEach((sec) => {
      sec.blocks.forEach((blk) => {
        newMap[blk.id] = revealed;
      });
    });
    setRevealedBlocks(newMap);
  }, []);

  // Speech synthesis for Spanish text
  const speakSpanish = useCallback((text: string, id: string) => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    if (speakingId === id) {
      setSpeakingId(null);
      return;
    }
    const cleanText = text.replace(/[\n•→]/g, ' ').trim();
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = 'es-ES';
    utterance.rate = 0.9;
    utterance.onend = () => setSpeakingId(null);
    utterance.onerror = () => setSpeakingId(null);
    setSpeakingId(id);
    window.speechSynthesis.speak(utterance);
  }, [speakingId]);

  // Toggle bookmark
  const toggleBookmark = useCallback((sectionId: string) => {
    setBookmarkedSections((prev) =>
      prev.includes(sectionId) ? prev.filter((id) => id !== sectionId) : [...prev, sectionId]
    );
  }, []);

  // Filter sections by search and category
  const filteredSections = useMemo(() => {
    return ROMANCE_SECTIONS.filter((sec) => {
      if (partFilter === '1' && sec.part !== 1) return false;
      if (partFilter === '2' && sec.part !== 2) return false;
      if (activeCategory !== 'all' && sec.category !== activeCategory) return false;

      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      const matchTitle = sec.titleEs.toLowerCase().includes(q) || sec.titleHy.toLowerCase().includes(q);
      const matchSummary =
        (sec.summaryEs && sec.summaryEs.toLowerCase().includes(q)) ||
        (sec.summaryHy && sec.summaryHy.toLowerCase().includes(q));
      const matchBlocks = sec.blocks.some(
        (b) => b.es.toLowerCase().includes(q) || b.hy.toLowerCase().includes(q)
      );

      return matchTitle || matchSummary || matchBlocks;
    });
  }, [partFilter, activeCategory, searchQuery]);

  // Laboratory calculations for custom verse
  const analysisResult = useMemo(() => {
    const raw = customVerse.trim();
    if (!raw) return null;

    // Check if it matches a preset
    const presetMatch = PRESET_VERSES.find(
      (p) => p.text.toLowerCase() === raw.toLowerCase()
    );
    if (presetMatch) {
      return {
        syllables: presetMatch.syllables,
        sinalefas: presetMatch.sinalefas,
        finalWord: presetMatch.finalWord,
        accentType: presetMatch.accentType,
        offset: presetMatch.offset,
        totalCount: presetMatch.expectedCount,
        note: presetMatch.note,
        translation: presetMatch.translation,
      };
    }

    // Dynamic heuristic parser
    const words = raw.split(/\s+/).filter(Boolean);
    const cleanedWords = words.map((w) => w.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑüÜ]/g, ''));
    if (cleanedWords.length === 0) return null;

    const finalWord = cleanedWords[cleanedWords.length - 1].toLowerCase();
    let accentType: 'aguda' | 'llana' | 'esdrújula' = 'llana';
    let offset = 0;

    // Determine stress of the final word
    const hasAccent = /[áéíóú]/.test(finalWord);
    if (hasAccent) {
      // Find position of accented vowel from end
      const matches = [...finalWord.matchAll(/[áéíóú]/gi)];
      const lastAccVowel = matches[matches.length - 1];
      const distanceToEnd = finalWord.length - 1 - (lastAccVowel.index ?? 0);
      if (distanceToEnd <= 2 && (finalWord.endsWith('n') || finalWord.endsWith('s') || /[áéíóú]$/.test(finalWord))) {
        accentType = 'aguda';
        offset = +1;
      } else if (distanceToEnd > 4) {
        accentType = 'esdrújula';
        offset = -1;
      } else {
        accentType = 'llana';
        offset = 0;
      }
    } else {
      if (/[nsaeiou]$/i.test(finalWord)) {
        accentType = 'llana';
        offset = 0;
      } else {
        accentType = 'aguda';
        offset = +1;
      }
    }

    // Heuristic syllable splitting
    const syllablesList: string[] = [];
    const detectedSinalefas: string[] = [];

    for (let i = 0; i < words.length; i++) {
      const currentWord = words[i];
      const nextWord = words[i + 1];

      // Check sinalefa between currentWord and nextWord
      const currEndsVowel = /[aeiouáéíóú]$/i.test(currentWord.replace(/[^a-zA-Záéíóú]/g, ''));
      const nextStartsVowel = /^[h]?[aeiouáéíóú]/i.test(nextWord ? nextWord.replace(/[^a-zA-Záéíóú]/g, '') : '');

      if (currEndsVowel && nextStartsVowel && nextWord) {
        detectedSinalefas.push(`${currentWord} + ${nextWord}`);
      }

      // Simple syllable chunks for display
      const chunks = currentWord.match(/[^aeiouáéíóúy]*[aeiouáéíóúy]+[^aeiouáéíóúy]*/gi) || [currentWord];
      syllablesList.push(...chunks);
    }

    const rawCount = syllablesList.length;
    const sinalefaDeduction = detectedSinalefas.length;
    const calculatedTotal = rawCount - sinalefaDeduction + offset;

    return {
      syllables: syllablesList,
      sinalefas: detectedSinalefas,
      finalWord,
      accentType,
      offset,
      totalCount: calculatedTotal,
      note: `Տողում հայտնաբերվել է ${sinalefaDeduction} հնարավոր սինալեֆա, վերջին բառը՝ ${accentType} (${offset >= 0 ? `+${offset}` : offset}):`,
      translation: 'Մուտքագրված տող',
    };
  }, [customVerse]);

  // Quiz score
  const quizScore = useMemo(() => {
    let score = 0;
    QUIZ_QUESTIONS.forEach((q) => {
      const ansIdx = selectedAnswers[q.id];
      if (ansIdx !== undefined && q.options[ansIdx]?.correct) {
        score++;
      }
    });
    return score;
  }, [selectedAnswers]);

  const restartQuiz = () => {
    setSelectedAnswers({});
    setCurrentQuestionIndex(0);
    setQuizFinished(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col selection:bg-amber-100 selection:text-amber-900">
      {/* ================= TOP BAR CONTRACT ================= */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 px-6 py-3.5 flex items-center justify-between gap-8 shadow-xs">
        {/* Zone 1: Brand Wordmark */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="w-8 h-8 rounded-lg bg-amber-700 text-white flex items-center justify-center font-brand font-bold text-base shadow-xs">
            R
          </div>
          <span className="font-brand text-lg font-bold tracking-tight text-slate-900 whitespace-nowrap">
            El Romance · Ռոմանս
          </span>
        </div>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600">
          <button
            onClick={() => setActiveTab('guide')}
            className={`whitespace-nowrap transition-colors pb-0.5 border-b-2 ${
              activeTab === 'guide'
                ? 'border-amber-700 text-amber-900 font-semibold'
                : 'border-transparent hover:text-slate-900'
            }`}
          >
            Ուսումնական ձեռնարկ
          </button>
          <button
            onClick={() => setActiveTab('lab')}
            className={`whitespace-nowrap transition-colors pb-0.5 border-b-2 ${
              activeTab === 'lab'
                ? 'border-amber-700 text-amber-900 font-semibold'
                : 'border-transparent hover:text-slate-900'
            }`}
          >
            Վանկերի հաշվիչ (8 վանկ)
          </button>
          <button
            onClick={() => setActiveTab('exam-ready')}
            className={`whitespace-nowrap transition-colors pb-0.5 border-b-2 ${
              activeTab === 'exam-ready'
                ? 'border-amber-700 text-amber-900 font-semibold'
                : 'border-transparent hover:text-slate-900'
            }`}
          >
            Քննական ամփոփիչ
          </button>
          <button
            onClick={() => setActiveTab('quiz')}
            className={`whitespace-nowrap transition-colors pb-0.5 border-b-2 ${
              activeTab === 'quiz'
                ? 'border-amber-700 text-amber-900 font-semibold'
                : 'border-transparent hover:text-slate-900'
            }`}
          >
            Ինքնաստուգման թեստ
          </button>
        </nav>

        {/* Zone 3: Primary Action & Font Size Controls */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Font Size Toggle */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg border border-slate-200/80">
            <span className="text-xs text-slate-500 font-semibold px-1.5 hidden sm:inline">Տառաչափ</span>
            <button
              onClick={() => setFontSize('normal')}
              className={`px-2 py-1 text-xs font-semibold rounded cursor-pointer transition-colors ${
                fontSize === 'normal'
                  ? 'bg-white shadow-xs text-slate-900 font-bold'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
              title="Սովորական տառաչափ (Normal)"
            >
              A
            </button>
            <button
              onClick={() => setFontSize('large')}
              className={`px-2.5 py-1 text-xs font-bold rounded cursor-pointer transition-colors ${
                fontSize === 'large'
                  ? 'bg-amber-900 text-white shadow-xs font-extrabold'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
              title="Մեծ տառաչափ (Large - լռելյայն)"
            >
              A+
            </button>
            <button
              onClick={() => setFontSize('xlarge')}
              className={`px-2.5 py-1 text-xs font-black rounded cursor-pointer transition-colors ${
                fontSize === 'xlarge'
                  ? 'bg-amber-900 text-white shadow-xs'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
              title="Խոշոր / Շատ մեծ տառաչափ (Extra Large)"
            >
              A++
            </button>
          </div>

          <button
            onClick={() => {
              setActiveTab('lab');
            }}
            className="px-4 py-2 text-xs font-semibold text-white bg-amber-800 rounded-lg hover:bg-amber-900 transition-colors whitespace-nowrap shadow-xs cursor-pointer flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Մետրիկ լաբորատորիա</span>
            <span className="sm:hidden">Լաբորատորիա</span>
          </button>
        </div>
      </header>

      {/* Main Container with dynamic font size scale */}
      <main
        className={`flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-8 space-y-8 ${
          fontSize === 'xlarge'
            ? 'text-scale-xlarge'
            : fontSize === 'large'
            ? 'text-scale-large'
            : 'text-scale-normal'
        }`}
      >
        {/* ================= HERO SECTION ================= */}
        <section className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-xs space-y-6 relative overflow-hidden">
          <div className="space-y-3 max-w-3xl">
            <div className="flex items-center gap-2 text-xs text-amber-800 font-semibold tracking-wide">
              <span>Իսպանական գրականություն</span>
              <span aria-hidden="true">·</span>
              <span>Տաղաչափություն և ռոմանս</span>
              <span aria-hidden="true">·</span>
              <span>Իսպաներենից հայերեն քլիք-թարգմանություն</span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-slate-900 font-serif-title leading-tight">
              EL ROMANCE — Իսպանական Ռոմանս
            </h1>
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
              Իսպանական գրականության ամենանշանավոր բանաստեղծական տեսակը։ Բացատրենք դրա կառուցվածքը,
              հանգը, վանկերի հաշվարկը, սինալեֆաները, <span className="font-semibold text-slate-900">8– / 8a</span> բանաձևը և այն հատկանիշները, որոնցով կարող ես ճանաչել ռոմանսը քննության ժամանակ։
            </p>
          </div>

          {/* Quick metric formula strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 border-t border-slate-100">
            <div className="p-3.5 bg-amber-50/70 border border-amber-200/60 rounded-xl">
              <span className="text-xs text-amber-900 font-semibold block">Հիմնական բանաձև</span>
              <span className="text-xl font-bold font-mono text-amber-950">8– / 8a / 8– / 8a</span>
              <span className="text-xs text-amber-800/90 block mt-0.5">8 վանկ, զույգ տողերի հանգ</span>
            </div>
            <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl">
              <span className="text-xs text-slate-500 font-semibold block">Վանկաչափ (Métrica)</span>
              <span className="text-xl font-bold text-slate-900">Octosílabo</span>
              <span className="text-xs text-slate-500 block mt-0.5">Յուրաքանչյուր տող՝ 8 վանկ</span>
            </div>
            <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl">
              <span className="text-xs text-slate-500 font-semibold block">Հանգի տեսակ (Rima)</span>
              <span className="text-xl font-bold text-slate-900">Asonante</span>
              <span className="text-xs text-slate-500 block mt-0.5">Զույգ տողերի ձայնավորներ</span>
            </div>
            <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl">
              <span className="text-xs text-slate-500 font-semibold block">Բնույթ (Carácter)</span>
              <span className="text-xl font-bold text-slate-900">Épico-lírico</span>
              <span className="text-xs text-slate-500 block mt-0.5">Պատմողական-քնարական</span>
            </div>
          </div>

          {/* Interaction Banner */}
          <div className="p-4 bg-gradient-to-r from-amber-900 to-amber-950 text-white rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xs">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-amber-700/80 flex items-center justify-center shrink-0">
                <Sparkles className="w-4 h-4 text-amber-200" />
              </div>
              <div>
                <p className="text-sm font-bold text-amber-100">
                  Ինտերակտիվ ուսումնական ռեժիմ
                </p>
                <p className="text-xs text-amber-200/90">
                  Սեղմեք ցանկացած իսպաներեն հատվածի վրա՝ հայերեն թարգմանությունն ու բացատրությունը տեսնելու համար։
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <div className="flex items-center gap-1 bg-amber-950/60 p-1 rounded-lg border border-amber-800">
                <span className="text-[11px] text-amber-300 font-medium px-1">Տառաչափ՝</span>
                <button
                  onClick={() => setFontSize('normal')}
                  className={`px-2 py-0.5 text-xs font-semibold rounded cursor-pointer ${
                    fontSize === 'normal' ? 'bg-amber-800 text-white' : 'text-amber-200 hover:text-white'
                  }`}
                >
                  A
                </button>
                <button
                  onClick={() => setFontSize('large')}
                  className={`px-2 py-0.5 text-xs font-bold rounded cursor-pointer ${
                    fontSize === 'large' ? 'bg-amber-700 text-white shadow-xs' : 'text-amber-200 hover:text-white'
                  }`}
                >
                  A+ (Մեծ)
                </button>
                <button
                  onClick={() => setFontSize('xlarge')}
                  className={`px-2 py-0.5 text-xs font-black rounded cursor-pointer ${
                    fontSize === 'xlarge' ? 'bg-amber-600 text-white shadow-xs' : 'text-amber-200 hover:text-white'
                  }`}
                >
                  A++ (Խոշոր)
                </button>
              </div>

              <button
                onClick={() => setAllRevealed(true)}
                className="px-3 py-1.5 text-xs font-medium bg-amber-800/90 hover:bg-amber-700 text-white rounded-lg transition-colors flex items-center gap-1 cursor-pointer whitespace-nowrap"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Բացել բոլորը</span>
              </button>
              <button
                onClick={() => setAllRevealed(false)}
                className="px-3 py-1.5 text-xs font-medium bg-amber-800/90 hover:bg-amber-700 text-white rounded-lg transition-colors flex items-center gap-1 cursor-pointer whitespace-nowrap"
              >
                <EyeOff className="w-3.5 h-3.5" />
                <span>Փակել բոլորը</span>
              </button>
            </div>
          </div>
        </section>

        {/* Tab 1: Full Study Guide */}
        {activeTab === 'guide' && (
          <div className="space-y-6">
            {/* Filter and Control Bar */}
            <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 shadow-xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
              {/* Search Bar */}
              <div className="relative flex-1 min-w-[260px]">
                <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Փնտրել իսպաներեն կամ հայերեն (sinalefa, 8a, asonante, վանկ, քննություն...)"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-10 py-3 text-sm sm:text-base bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-700/20 focus:border-amber-700 font-medium"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs sm:text-sm text-slate-400 hover:text-slate-700 font-semibold cursor-pointer"
                  >
                    Մաքրել
                  </button>
                )}
              </div>

              {/* View Mode Switcher */}
              <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl shrink-0 border border-slate-200/60">
                <button
                  onClick={() => setViewMode('click-reveal')}
                  className={`px-3.5 py-2 text-xs sm:text-sm font-bold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                    viewMode === 'click-reveal'
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                  title="Իսպաներենի վրա սեղմելով բացվում է հայերենը"
                >
                  Քլիքով բացվող
                </button>
                <button
                  onClick={() => setViewMode('parallel')}
                  className={`px-3.5 py-2 text-xs sm:text-sm font-bold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                    viewMode === 'parallel'
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                  title="Երկու լեզուները միանգամից տեսանելի են"
                >
                  Զուգահեռ ընթերցում
                </button>
                <button
                  onClick={() => setViewMode('spanish-only')}
                  className={`px-3.5 py-2 text-xs sm:text-sm font-bold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                    viewMode === 'spanish-only'
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                  title="Միայն իսպաներենը"
                >
                  Միայն իսպաներեն
                </button>
                <button
                  onClick={() => setViewMode('armenian-only')}
                  className={`px-3.5 py-2 text-xs sm:text-sm font-bold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                    viewMode === 'armenian-only'
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                  title="Միայն հայերենը"
                >
                  Միայն հայերեն
                </button>
              </div>
            </div>

            {/* Category / Part Filters */}
            <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm">
              <span className="text-slate-500 font-bold">Բաժիններ՝</span>
              <button
                onClick={() => setPartFilter('all')}
                className={`px-3 py-1.5 rounded-lg font-bold transition-colors cursor-pointer ${
                  partFilter === 'all'
                    ? 'bg-amber-900 text-white shadow-xs'
                    : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                Ամբողջը ({ROMANCE_SECTIONS.length})
              </button>
              <button
                onClick={() => setPartFilter('1')}
                className={`px-3 py-1.5 rounded-lg font-bold transition-colors cursor-pointer ${
                  partFilter === '1'
                    ? 'bg-amber-900 text-white shadow-xs'
                    : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                Մաս 1. Հիմնական ձեռնարկ (1–18)
              </button>
              <button
                onClick={() => setPartFilter('2')}
                className={`px-3 py-1.5 rounded-lg font-bold transition-colors cursor-pointer ${
                  partFilter === '2'
                    ? 'bg-amber-900 text-white shadow-xs'
                    : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                Մաս 2. Խորացված բացատրություններ (1–15)
              </button>

              <span className="text-slate-300 mx-1">|</span>

              <button
                onClick={() => setActiveCategory('all')}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-colors cursor-pointer ${
                  activeCategory === 'all'
                    ? 'bg-slate-800 text-white shadow-xs'
                    : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                Բոլոր թեմաները
              </button>
              <button
                onClick={() => setActiveCategory('meter')}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-colors cursor-pointer ${
                  activeCategory === 'meter'
                    ? 'bg-slate-800 text-white shadow-xs'
                    : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                Վանկեր & Սինալեֆա
              </button>
              <button
                onClick={() => setActiveCategory('rhyme')}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-colors cursor-pointer ${
                  activeCategory === 'rhyme'
                    ? 'bg-slate-800 text-white shadow-xs'
                    : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                Հանգեր & 8a
              </button>
              <button
                onClick={() => setActiveCategory('themes')}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-colors cursor-pointer ${
                  activeCategory === 'themes'
                    ? 'bg-slate-800 text-white shadow-xs'
                    : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                Թեմաներ & Ոճ
              </button>
              <button
                onClick={() => setActiveCategory('mistakes')}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-colors cursor-pointer ${
                  activeCategory === 'mistakes'
                    ? 'bg-slate-800 text-white shadow-xs'
                    : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                Հաճախակի սխալներ
              </button>
              <button
                onClick={() => setActiveCategory('exam')}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-colors cursor-pointer ${
                  activeCategory === 'exam'
                    ? 'bg-slate-800 text-white shadow-xs'
                    : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                Քննական հիմնավորում
              </button>
            </div>

            {/* Sections Display */}
            {filteredSections.length === 0 ? (
              <div className="bg-white border border-slate-200 rounded-xl p-12 text-center space-y-3">
                <HelpCircle className="w-10 h-10 text-slate-300 mx-auto" />
                <p className="text-slate-600 font-medium">Ոչինչ չի գտնվել որոնման արդյունքում։</p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setActiveCategory('all');
                    setPartFilter('all');
                  }}
                  className="text-xs font-semibold text-amber-800 hover:underline"
                >
                  Չեղարկել բոլոր ֆիլտրերը
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {filteredSections.map((sec) => (
                  <SectionCard
                    key={sec.id}
                    section={sec}
                    viewMode={viewMode}
                    revealedBlocks={revealedBlocks}
                    onToggleReveal={toggleReveal}
                    onSpeak={speakSpanish}
                    isSpeaking={speakingId}
                    isBookmarked={bookmarkedSections.includes(sec.id)}
                    onToggleBookmark={toggleBookmark}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Interactive Metric Laboratory (Syllable Counter & Sinalefa Analyzer) */}
        {activeTab === 'lab' && (
          <div className="space-y-6">
            <div className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-xs space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs text-amber-800 font-medium">
                  <span>Ինտերակտիվ վերլուծիչ</span>
                  <span aria-hidden="true">·</span>
                  <span>Տաղաչափություն և սինալեֆա</span>
                </div>
                <h2 className="text-2xl font-bold font-serif-title text-slate-900">
                  Վանկերի հաշվիչ և տաղաչափական լաբորատորիա
                </h2>
                <p className="text-sm text-slate-600">
                  Փորձարկեք տողերը տեքստից կամ մուտքագրեք Ձեր սեփական իսպաներեն տողը։ Հաշվիչը ցույց կտա վանկերի բաժանումը,
                  կգտնի սինալեֆաները (ձայնավորների միավորումը բառերի միջև) և կկիրառի վերջին բառի շեշտի կանոնը (+1, 0, −1)։
                </p>
              </div>

              {/* Preset selector */}
              <div className="space-y-2.5">
                <label className="text-sm font-bold text-slate-800 block">
                  Ընտրեք պատրաստի օրինակ տեքստից՝
                </label>
                <div className="flex flex-wrap gap-2">
                  {PRESET_VERSES.map((preset, idx) => (
                    <button
                      key={preset.text}
                      onClick={() => {
                        setSelectedPresetIndex(idx);
                        setCustomVerse(preset.text);
                      }}
                      className={`px-3.5 py-2 text-sm font-semibold rounded-xl border transition-all cursor-pointer ${
                        selectedPresetIndex === idx && customVerse === preset.text
                          ? 'bg-amber-900 text-white border-amber-900 shadow-xs'
                          : 'bg-slate-50 text-slate-800 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      «{preset.text}»
                    </button>
                  ))}
                </div>
              </div>

              {/* Input field */}
              <div className="space-y-2.5">
                <label className="text-sm font-bold text-slate-800 block">
                  Կամ մուտքագրեք իսպաներեն տողը՝
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={customVerse}
                    onChange={(e) => setCustomVerse(e.target.value)}
                    placeholder="Օրինակ՝ Por el valle va la niña"
                    className="flex-1 px-4 py-3 text-base sm:text-lg font-medium bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-700/20 focus:border-amber-700"
                  />
                  <button
                    onClick={() => speakSpanish(customVerse, 'lab-input')}
                    className="px-4 py-3 bg-slate-100 border border-slate-200 rounded-xl hover:bg-slate-200 transition-colors cursor-pointer text-slate-700"
                    title="Լսել արտասանությունը"
                  >
                    <Volume2 className={`w-5 h-5 ${speakingId === 'lab-input' ? 'text-amber-700 animate-pulse' : ''}`} />
                  </button>
                </div>
              </div>

              {/* Analysis Result Card */}
              {analysisResult && (
                <div className="p-6 bg-amber-50/70 border border-amber-200 rounded-2xl space-y-5 shadow-xs">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3.5 border-b border-amber-200/80">
                    <div>
                      <span className="text-xs sm:text-sm text-amber-800 font-bold block uppercase tracking-wide">
                        Հայերեն իմաստը՝
                      </span>
                      <span className="text-base sm:text-lg font-semibold text-amber-950">
                        {analysisResult.translation}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs sm:text-sm text-slate-600 font-mono font-medium">
                        Վերջնական արդյունք՝
                      </span>
                      <span
                        className={`px-3.5 py-1.5 text-base sm:text-lg font-extrabold font-mono rounded-xl shadow-xs ${
                          analysisResult.totalCount === 8
                            ? 'bg-emerald-700 text-white'
                            : 'bg-amber-900 text-white'
                        }`}
                      >
                        {analysisResult.totalCount} տաղաչափական վանկ
                        {analysisResult.totalCount === 8 ? ' (Octosílabo ✓)' : ''}
                      </span>
                    </div>
                  </div>

                  {/* Step by Step Breakdown */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Syllables list */}
                    <div className="p-4 bg-white border border-amber-200/80 rounded-xl space-y-2">
                      <span className="text-xs sm:text-sm font-bold text-slate-700 block uppercase tracking-wide">
                        1. Վանկերի բաժանում
                      </span>
                      <div className="flex flex-wrap gap-1.5 font-mono text-sm sm:text-base">
                        {analysisResult.syllables.map((syl, i) => (
                          <span
                            key={i}
                            className={`px-2 py-1 rounded-md font-semibold ${
                              syl.includes('_')
                                ? 'bg-amber-100 text-amber-950 font-bold border border-amber-400'
                                : 'bg-slate-100 text-slate-900'
                            }`}
                          >
                            {syl}
                            {i < analysisResult.syllables.length - 1 ? ' /' : ''}
                          </span>
                        ))}
                      </div>
                      <span className="text-xs sm:text-sm text-slate-500 font-medium block">
                        Ընդհանուր՝ {analysisResult.syllables.length} վանկ
                      </span>
                    </div>

                    {/* Sinalefas */}
                    <div className="p-4 bg-white border border-amber-200/80 rounded-xl space-y-2">
                      <span className="text-xs sm:text-sm font-bold text-slate-700 block uppercase tracking-wide">
                        2. Սինալեֆաներ (Sinalefas)
                      </span>
                      {analysisResult.sinalefas.length > 0 ? (
                        <div className="space-y-1.5">
                          {analysisResult.sinalefas.map((sin, i) => (
                            <span
                              key={i}
                              className="text-xs sm:text-sm font-mono font-bold text-amber-950 block bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200"
                            >
                              • {sin} (-1 վանկ)
                            </span>
                          ))}
                        </div>
                      ) : (
                        <span className="text-xs sm:text-sm text-slate-400 italic">
                          Սինալեֆաներ չեն հայտնաբերվել
                        </span>
                      )}
                    </div>

                    {/* Final Word Accent */}
                    <div className="p-4 bg-white border border-amber-200/80 rounded-xl space-y-2">
                      <span className="text-xs sm:text-sm font-bold text-slate-700 block uppercase tracking-wide">
                        3. Վերջին բառի կանոն (+1, 0, -1)
                      </span>
                      <div className="text-xs sm:text-sm space-y-1">
                        <p className="font-mono text-slate-800">
                          Վերջին բառ՝ <strong className="text-amber-950 font-bold text-sm sm:text-base">{analysisResult.finalWord}</strong>
                        </p>
                        <p className="text-slate-700 font-medium">
                          Շեշտի տեսակ՝{' '}
                          <span className="font-bold text-amber-900 uppercase">
                            {analysisResult.accentType}
                          </span>{' '}
                          ({analysisResult.offset >= 0 ? `+${analysisResult.offset}` : analysisResult.offset})
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Summary note */}
                  <div className="text-sm sm:text-base text-amber-950 bg-amber-100/70 p-3.5 rounded-xl font-medium leading-relaxed">
                    💡 {analysisResult.note}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Tab 3: Exam Readiness Checklist & Synthesized Answers */}
        {activeTab === 'exam-ready' && (
          <div className="space-y-6">
            <div className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-xs space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs sm:text-sm text-amber-800 font-bold uppercase tracking-wide">
                  <span>Քննական ուղեցույց</span>
                  <span aria-hidden="true">·</span>
                  <span>Պատրաստի բանաձևային պատասխաններ</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold font-serif-title text-slate-900">
                  Ինչպե՞ս հիմնավորել քննությանը, որ բանաստեղծությունը ռոմանս է
                </h2>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                  Դպրոցական և համալսարանական քննությունների համար անհրաժեշտ 4 քայլանի ստուգումը և պաշտոնական պատրաստի պատասխանները։
                </p>
              </div>

              {/* 4 Steps Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-5 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
                  <span className="text-xs sm:text-sm font-bold text-amber-900 uppercase tracking-wide">
                    Քայլ 1. Չափը (La medida)
                  </span>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900">
                    ¿Los versos tienen ocho sílabas métricas?
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Արդյո՞ք տողերն ունեն ութ տաղաչափական վանկ։ Հաշվի՛ր սինալեֆաները և վերջին բառի շեշտի կանոնը (+1, 0, −1)։
                  </p>
                </div>

                <div className="p-5 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
                  <span className="text-xs sm:text-sm font-bold text-amber-900 uppercase tracking-wide">
                    Քայլ 2. Հանգը (La rima)
                  </span>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900">
                    ¿Los versos pares comparten rima asonante?
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Արդյո՞ք զույգ տողերն ունեն ընդհանուր ձայնավորային հանգ (համընկնում են ձայնավորները վերջին շեշտված ձայնավորից սկսած)։
                  </p>
                </div>

                <div className="p-5 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
                  <span className="text-xs sm:text-sm font-bold text-amber-900 uppercase tracking-wide">
                    Քայլ 3. Կենտ տողերը (Los impares)
                  </span>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900">
                    ¿Quedan sueltos?
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Արդյո՞ք կենտ տողերը մնում են անհանգ (sueltos)՝ միաժամանակ պահպանելով 8 վանկաչափը։
                  </p>
                </div>

                <div className="p-5 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
                  <span className="text-xs sm:text-sm font-bold text-amber-900 uppercase tracking-wide">
                    Քայլ 4. Կառուցվածքը (La organización)
                  </span>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900">
                    ¿Es una serie sin un número fijo de versos?
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Ռոմանսը ոչ էստրոֆիկ է (no estrófica)․ տողերի թիվը հաստատուն չէ, պարտադիր չի բաժանվում 4 կամ 6 տողանի տների։
                  </p>
                </div>
              </div>

              {/* Ready exam answers */}
              <div className="space-y-4 pt-4 border-t border-slate-200">
                <h3 className="text-lg font-bold text-slate-900">
                  Պատրաստի պատասխանի մոդել (Respuesta modelo)
                </h3>

                {/* Spanish answer box */}
                <div className="p-5 bg-amber-50/80 border border-amber-200 rounded-2xl space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs sm:text-sm font-bold text-amber-900 uppercase tracking-wide">
                      🇪🇸 Իսպաներեն ձևակերպում (արտասանության համար)
                    </span>
                    <button
                      onClick={() =>
                        speakSpanish(
                          'Este poema es un romance porque está compuesto por versos octosílabos, presenta rima asonante en los versos pares y deja sueltos los impares. Su esquema métrico es ocho libre, ocho a, ocho libre, ocho a. Además, tiene carácter narrativo.',
                          'exam-formula-es'
                        )
                      }
                      className="text-amber-800 hover:text-amber-950 text-xs sm:text-sm font-bold flex items-center gap-1.5 cursor-pointer"
                    >
                      <Volume2 className="w-4 h-4" />
                      <span>Լսել</span>
                    </button>
                  </div>
                  <p className="text-base sm:text-lg md:text-xl font-serif-title font-medium text-amber-950 leading-relaxed italic">
                    «Este poema es un romance porque está compuesto por versos octosílabos, presenta rima asonante en los versos pares y deja sueltos los impares. Su esquema métrico es 8–, 8a, 8–, 8a… Además, tiene carácter narrativo.»
                  </p>
                </div>

                {/* Armenian answer box */}
                <div className="p-5 bg-slate-50 border border-slate-200 rounded-2xl space-y-2.5">
                  <span className="text-xs sm:text-sm font-bold text-slate-700 uppercase tracking-wide">
                    🇦🇲 Հայերեն թարգմանություն և հիմնավորում
                  </span>
                  <p className="text-base sm:text-lg text-slate-900 leading-relaxed font-semibold">
                    «Այս բանաստեղծությունը ռոմանս է, որովհետև կազմված է ութվանկանի տողերից, զույգ տողերն ունեն ձայնավորային հանգ, իսկ կենտ տողերն անհանգ են։ Դրա տաղաչափական սխեման է՝ 8–, 8a, 8–, 8a… Բացի այդ, այն ունի պատմողական բնույթ։»
                  </p>
                </div>

                {/* Complete Synthesis for High Grades */}
                <div className="p-5 bg-white border border-slate-200 rounded-2xl space-y-3">
                  <span className="text-xs sm:text-sm font-bold text-amber-900 uppercase tracking-wide">
                    Ընդլայնված ակադեմիական սինթեզ (ամբողջական քննության համար)
                  </span>
                  <div className="text-sm sm:text-base text-slate-700 space-y-2.5 leading-relaxed">
                    <p>
                      <strong>🇪🇸 Síntesis completa:</strong> «El romance es una composición poética no estrófica, formada tradicionalmente por una serie de versos octosílabos. Los versos pares presentan una misma rima asonante y los impares quedan sueltos. Su esquema es 8–, 8a, 8–, 8a… Suele tener carácter narrativo y puede incluir diálogos, repeticiones y elementos líricos. El comienzo en mitad de la acción y el final abierto son frecuentes, pero no obligatorios.»
                    </p>
                    <p>
                      <strong>🇦🇲 Հայերեն ամբողջական սահմանում:</strong> «Ռոմանսը բանաստեղծական ստեղծագործություն է, որի կառուցվածքը չի պահանջում հաստատուն տների բաժանում։ Ավանդաբար այն կազմված է ութվանկանի տողերի շարքից։ Զույգ տողերն ունեն նույն ձայնավորային հանգը, իսկ կենտ տողերը մնում են անհանգ։ Սխեման է՝ 8–, 8a, 8–, 8a… Այն սովորաբար ունի պատմողական բնույթ և կարող է ներառել երկխոսություններ, կրկնություններ ու քնարական տարրեր։ Գործողության կեսից սկսվելը և բաց ավարտը հաճախ հանդիպող, բայց ոչ պարտադիր հատկանիշներ են։»
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: Interactive Quiz & Self-Testing */}
        {activeTab === 'quiz' && (
          <div className="space-y-6">
            <div className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-xs space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2 text-xs sm:text-sm text-amber-800 font-bold uppercase tracking-wide">
                    <span>Ինքնաստուգում</span>
                    <span aria-hidden="true">·</span>
                    <span>Գիտելիքի ստուգում</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold font-serif-title text-slate-900 mt-1">
                    Թեստ ռոմանսի և տաղաչափության վերաբերյալ
                  </h2>
                </div>
                <div className="text-right">
                  <span className="text-xs sm:text-sm text-slate-400 font-medium block">Հարց</span>
                  <span className="text-xl font-bold font-mono text-slate-900">
                    {currentQuestionIndex + 1} / {QUIZ_QUESTIONS.length}
                  </span>
                </div>
              </div>

              {/* Progress bar */}
              <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-amber-800 h-full transition-all duration-300"
                  style={{
                    width: `${((currentQuestionIndex + 1) / QUIZ_QUESTIONS.length) * 100}%`,
                  }}
                />
              </div>

              {/* Active Question */}
              {(() => {
                const q = QUIZ_QUESTIONS[currentQuestionIndex];
                const selectedOptionIdx = selectedAnswers[q.id];
                const hasAnswered = selectedOptionIdx !== undefined;

                return (
                  <div className="space-y-5">
                    {/* Question text */}
                    <div className="p-5 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
                      <p className="text-base sm:text-lg md:text-xl font-bold text-slate-900 font-serif-title leading-relaxed">
                        🇪🇸 {q.questionEs}
                      </p>
                      <p className="text-sm sm:text-base text-slate-700 font-medium leading-relaxed">
                        🇦🇲 {q.questionHy}
                      </p>
                    </div>

                    {/* Options */}
                    <div className="space-y-3">
                      {q.options.map((opt, optIdx) => {
                        const isChosen = selectedOptionIdx === optIdx;
                        let optionStyle = 'bg-white border-slate-200 hover:bg-slate-50 text-slate-800';

                        if (hasAnswered) {
                          if (opt.correct) {
                            optionStyle = 'bg-emerald-50 border-emerald-300 text-emerald-950 font-medium';
                          } else if (isChosen && !opt.correct) {
                            optionStyle = 'bg-rose-50 border-rose-300 text-rose-950 font-medium';
                          } else {
                            optionStyle = 'bg-white border-slate-200 opacity-60 text-slate-500';
                          }
                        }

                        return (
                          <button
                            key={optIdx}
                            disabled={hasAnswered}
                            onClick={() => {
                              setSelectedAnswers((prev) => ({
                                ...prev,
                                [q.id]: optIdx,
                              }));
                            }}
                            className={`w-full text-left p-4 rounded-xl border transition-all text-sm sm:text-base cursor-pointer space-y-1.5 ${optionStyle}`}
                          >
                            <div className="flex items-start justify-between gap-3">
                              <span className="font-bold text-base sm:text-lg leading-relaxed">{opt.es}</span>
                              {hasAnswered && opt.correct && (
                                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                              )}
                              {hasAnswered && isChosen && !opt.correct && (
                                <XCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                              )}
                            </div>
                            <p className="text-sm sm:text-base opacity-90 text-slate-700 leading-relaxed">
                              {opt.hy}
                            </p>
                          </button>
                        );
                      })}
                    </div>

                    {/* Feedback on answer */}
                    {hasAnswered && (
                      <div
                        className={`p-4 rounded-xl text-sm sm:text-base space-y-1 border ${
                          q.options[selectedOptionIdx].correct
                            ? 'bg-emerald-50/80 border-emerald-200 text-emerald-950'
                            : 'bg-rose-50/80 border-rose-200 text-rose-950'
                        }`}
                      >
                        <p className="font-bold text-base">
                          {q.options[selectedOptionIdx].correct ? '✓ Ճիշտ է։' : '✗ Սխալ է։'}
                        </p>
                        <p className="leading-relaxed">{q.options[selectedOptionIdx].explanationHy}</p>
                      </div>
                    )}

                    {/* Navigation buttons */}
                    <div className="flex items-center justify-between pt-4 border-t border-slate-200">
                      <button
                        disabled={currentQuestionIndex === 0}
                        onClick={() => setCurrentQuestionIndex((prev) => prev - 1)}
                        className="px-3.5 py-2 text-sm font-semibold rounded-lg text-slate-600 hover:text-slate-900 disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
                      >
                        Նախորդը
                      </button>

                      {currentQuestionIndex < QUIZ_QUESTIONS.length - 1 ? (
                        <button
                          disabled={!hasAnswered}
                          onClick={() => setCurrentQuestionIndex((prev) => prev + 1)}
                          className="px-5 py-2.5 text-sm font-bold text-white bg-amber-800 rounded-xl hover:bg-amber-900 disabled:opacity-40 disabled:pointer-events-none transition-colors cursor-pointer flex items-center gap-2"
                        >
                          <span>Հաջորդ հարցը</span>
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      ) : (
                        <button
                          disabled={!hasAnswered}
                          onClick={() => setQuizFinished(true)}
                          className="px-5 py-2.5 text-sm font-bold text-white bg-emerald-700 rounded-xl hover:bg-emerald-800 disabled:opacity-40 disabled:pointer-events-none transition-colors cursor-pointer flex items-center gap-2"
                        >
                          <span>Ավարտել թեստը</span>
                          <CheckCircle2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                );
              })()}

              {/* Quiz Results Summary */}
              {quizFinished && (
                <div className="p-6 bg-slate-900 text-white rounded-xl space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold">Թեստի արդյունքները</h3>
                    <span className="text-xl font-bold font-mono text-amber-300">
                      {quizScore} / {QUIZ_QUESTIONS.length}
                    </span>
                  </div>
                  <p className="text-xs text-slate-300">
                    {quizScore === QUIZ_QUESTIONS.length
                      ? 'Գերազանց է։ Դուք անթերի յուրացրել եք իսպանական ռոմանսի բոլոր տաղաչափական և ոճական կանոնները։'
                      : quizScore >= 3
                      ? 'Լավ արդյունք։ Կարող եք կրկնել այն հարցերը, որտեղ սխալվել եք, և նորից հանձնել թեստը։'
                      : 'Խորհուրդ ենք տալիս ևս մեկ անգամ կարդալ ուսումնական ձեռնարկի առաջին և երկրորդ մասերը։'}
                  </p>
                  <button
                    onClick={restartQuiz}
                    className="px-4 py-2 text-xs font-semibold bg-white text-slate-900 rounded-lg hover:bg-slate-100 transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Վերսկսել թեստը</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-200 bg-white py-6 px-6 text-center text-xs text-slate-500">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>© 2026 El Romance — Իսպանական Ռոմանսի Ինտերակտիվ Ուսումնական Ձեռնարկ</p>
          <div className="flex items-center gap-4 text-xs text-slate-400">
            <span>8– / 8a</span>
            <span aria-hidden="true">·</span>
            <span>Asonante</span>
            <span aria-hidden="true">·</span>
            <span>Sinalefa</span>
            <span aria-hidden="true">·</span>
            <span>Romancero</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

// ================= SECTION COMPONENT =================
interface SectionCardProps {
  section: Section;
  viewMode: ViewMode;
  revealedBlocks: Record<string, boolean>;
  onToggleReveal: (id: string) => void;
  onSpeak: (text: string, id: string) => void;
  isSpeaking: string | null;
  isBookmarked: boolean;
  onToggleBookmark: (id: string) => void;
}

function SectionCard({
  section,
  viewMode,
  revealedBlocks,
  onToggleReveal,
  onSpeak,
  isSpeaking,
  isBookmarked,
  onToggleBookmark,
}: SectionCardProps) {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div
      id={section.id}
      className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs transition-shadow hover:shadow-sm"
    >
      {/* Section Header */}
      <div className="p-5 sm:p-6 bg-slate-50/80 border-b border-slate-200 flex items-start justify-between gap-4">
        <div className="space-y-1.5 flex-1">
          <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-amber-900 uppercase tracking-wide">
            <span>Մաս {section.part}</span>
            <span aria-hidden="true">·</span>
            <span>Բաժին {section.sectionNumber}</span>
            <span aria-hidden="true">·</span>
            <span className="capitalize">{section.category}</span>
          </div>
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-slate-900 font-serif-title flex flex-wrap items-center gap-2">
            <span>{section.titleEs}</span>
            <span className="text-slate-400 font-normal">/</span>
            <span className="text-amber-950 font-semibold">
              {section.titleHy}
            </span>
          </h2>
          {section.summaryHy && (
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed pt-1">
              {section.summaryHy}
            </p>
          )}
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => onToggleBookmark(section.id)}
            className={`p-2 rounded-xl border text-sm transition-colors cursor-pointer ${
              isBookmarked
                ? 'bg-amber-100 text-amber-900 border-amber-300 font-bold'
                : 'bg-white border-slate-200 text-slate-400 hover:text-slate-700'
            }`}
            title={isBookmarked ? 'Հեռացնել նշվածներից' : 'Պահպանել նշվածներում'}
          >
            ★
          </button>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-2 rounded-xl border border-slate-200 bg-white text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
            title={isExpanded ? 'Փակել բաժինը' : 'Բացել բաժինը'}
          >
            {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Section Body */}
      {isExpanded && (
        <div className="p-5 sm:p-7 space-y-5">
          {section.blocks.map((block) => (
            <BlockRenderer
              key={block.id}
              block={block}
              viewMode={viewMode}
              isRevealed={Boolean(revealedBlocks[block.id])}
              onToggleReveal={() => onToggleReveal(block.id)}
              onSpeak={onSpeak}
              isSpeaking={isSpeaking === block.id}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// ================= BLOCK RENDERER =================
interface BlockRendererProps {
  block: ContentBlock;
  viewMode: ViewMode;
  isRevealed: boolean;
  onToggleReveal: () => void;
  onSpeak: (text: string, id: string) => void;
  isSpeaking: boolean;
}

function BlockRenderer({
  block,
  viewMode,
  isRevealed,
  onToggleReveal,
  onSpeak,
  isSpeaking,
}: BlockRendererProps) {
  // Should Armenian be visible?
  const showArmenian =
    viewMode === 'armenian-only' ||
    viewMode === 'parallel' ||
    (viewMode === 'click-reveal' && isRevealed) ||
    (viewMode === 'spanish-only' && isRevealed);

  // Should Spanish be visible?
  const showSpanish = viewMode !== 'armenian-only';

  if (block.type === 'formula') {
    return (
      <div className="p-5 bg-amber-50/90 border border-amber-200 rounded-2xl space-y-2.5 shadow-2xs">
        <div className="flex items-center justify-between">
          <span className="text-xs sm:text-sm font-bold text-amber-900 uppercase tracking-wide">
            Տաղաչափական բանաձև (Esquema métrico)
          </span>
          <button
            onClick={() => onSpeak(block.es, block.id)}
            className="text-amber-800 hover:text-amber-950 cursor-pointer p-1"
            title="Լսել իսպաներեն"
          >
            <Volume2 className={`w-4 h-4 ${isSpeaking ? 'text-amber-700 animate-pulse' : ''}`} />
          </button>
        </div>
        <div className="font-mono text-2xl sm:text-3xl md:text-4xl font-extrabold text-amber-950 tracking-wider">
          {block.es}
        </div>
        <p className="text-sm sm:text-base text-amber-950 font-medium leading-relaxed">{block.hy}</p>
      </div>
    );
  }

  if (block.type === 'table' && block.table) {
    return (
      <div className="space-y-2.5 my-3">
        <div className="flex items-center justify-between">
          <span className="text-sm sm:text-base font-bold text-slate-800 block">
            🇪🇸 {block.es}
          </span>
          {viewMode === 'click-reveal' && (
            <button
              onClick={onToggleReveal}
              className="text-xs sm:text-sm font-bold text-amber-800 hover:underline cursor-pointer"
            >
              {isRevealed ? 'Փակել թարգմանությունը' : 'Բացել հայերենը'}
            </button>
          )}
        </div>
        <div className="overflow-x-auto rounded-xl border border-slate-200 shadow-2xs">
          <table className="w-full text-left text-sm sm:text-base border-collapse">
            <thead>
              <tr className="bg-slate-100 text-slate-800 font-bold border-b border-slate-200">
                {block.table.headers.map((h, i) => (
                  <th key={i} className="p-3.5 sm:p-4">
                    <div className="space-y-1">
                      <span className="block">{h.es}</span>
                      {showArmenian && h.hy !== h.es && (
                        <span className="block text-slate-600 font-medium text-xs sm:text-sm">
                          {h.hy}
                        </span>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              {block.table.rows.map((row, rIdx) => (
                <tr
                  key={rIdx}
                  onClick={viewMode === 'click-reveal' ? onToggleReveal : undefined}
                  className={`${
                    viewMode === 'click-reveal' ? 'cursor-pointer hover:bg-amber-50/40' : ''
                  } transition-colors`}
                >
                  {row.cells.map((cell, cIdx) => (
                    <td key={cIdx} className="p-3.5 sm:p-4 align-top">
                      {showSpanish && (
                        <div className="font-semibold text-slate-900 font-serif-title leading-relaxed">
                          {cell.es}
                        </div>
                      )}
                      {showArmenian && (
                        <div className="text-slate-700 mt-1.5 pt-1.5 border-t border-slate-100 leading-relaxed font-normal">
                          {cell.hy}
                        </div>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  if (block.type === 'key-rule') {
    return (
      <div
        onClick={viewMode === 'click-reveal' ? onToggleReveal : undefined}
        className={`p-5 bg-amber-50/70 border border-amber-200 rounded-2xl space-y-2.5 transition-all shadow-2xs ${
          viewMode === 'click-reveal' ? 'cursor-pointer hover:bg-amber-50 hover:border-amber-300' : ''
        }`}
      >
        <div className="flex items-center justify-between">
          <span className="text-xs sm:text-sm font-bold text-amber-900 uppercase tracking-wide">
            Կարևոր կանոն (Regla clave)
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onSpeak(block.es, block.id);
              }}
              className="text-amber-800 hover:text-amber-950 cursor-pointer p-1"
              title="Լսել"
            >
              <Volume2 className={`w-4 h-4 ${isSpeaking ? 'text-amber-700 animate-pulse' : ''}`} />
            </button>
            {viewMode === 'click-reveal' && (
              <span className="text-xs font-bold text-amber-900 bg-amber-100/90 px-2.5 py-1 rounded-md">
                {showArmenian ? 'Հայերենը բացված է' : '👉 Սեղմիր բացելու համար'}
              </span>
            )}
          </div>
        </div>

        {showSpanish && (
          <p className="text-base sm:text-lg md:text-xl font-bold text-amber-950 font-serif-title leading-relaxed">
            🇪🇸 {block.es}
          </p>
        )}

        {showArmenian && (
          <p className="text-sm sm:text-base md:text-lg font-semibold text-slate-800 pt-1.5 border-t border-amber-200/60 leading-relaxed">
            🇦🇲 {block.hy}
          </p>
        )}
      </div>
    );
  }

  if (block.type === 'callout') {
    return (
      <div
        onClick={viewMode === 'click-reveal' ? onToggleReveal : undefined}
        className={`p-5 bg-slate-50 border border-slate-200 rounded-2xl space-y-2.5 transition-all shadow-2xs ${
          viewMode === 'click-reveal' ? 'cursor-pointer hover:bg-slate-100/80 hover:border-slate-300' : ''
        }`}
      >
        <div className="flex items-center justify-between">
          <span className="text-xs sm:text-sm font-bold text-slate-700 uppercase tracking-wide">
            Ուշադրությո՛ւն (¡Atención!)
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onSpeak(block.es, block.id);
              }}
              className="text-slate-600 hover:text-slate-900 cursor-pointer p-1"
              title="Լսել"
            >
              <Volume2 className={`w-4 h-4 ${isSpeaking ? 'text-amber-700 animate-pulse' : ''}`} />
            </button>
            {viewMode === 'click-reveal' && (
              <span className="text-xs font-semibold text-slate-600 bg-white border border-slate-200 px-2 py-0.5 rounded-md">
                {showArmenian ? 'Բացված է' : '👉 Սեղմիր թարգմանության համար'}
              </span>
            )}
          </div>
        </div>

        {showSpanish && (
          <p className="text-sm sm:text-base md:text-lg font-semibold text-slate-900 font-serif-title leading-relaxed">
            🇪🇸 {block.es}
          </p>
        )}

        {showArmenian && (
          <p className="text-sm sm:text-base text-slate-700 pt-2 border-t border-slate-200 leading-relaxed">
            🇦🇲 {block.hy}
          </p>
        )}
      </div>
    );
  }

  if (block.type === 'example' || block.type === 'quote') {
    return (
      <div
        onClick={viewMode === 'click-reveal' ? onToggleReveal : undefined}
        className={`p-5 sm:p-6 bg-white border border-slate-200 rounded-2xl space-y-3 transition-all shadow-2xs ${
          viewMode === 'click-reveal' ? 'cursor-pointer hover:border-amber-300 hover:bg-amber-50/25' : ''
        }`}
      >
        <div className="flex items-center justify-between">
          <span className="text-xs sm:text-sm font-bold text-slate-500 uppercase tracking-wide">
            {block.type === 'quote' ? 'Բանաստեղծական հատված (Poema)' : 'Օրինակ (Ejemplo)'}
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onSpeak(block.es, block.id);
              }}
              className="text-slate-600 hover:text-slate-900 cursor-pointer p-1"
              title="Լսել իսպաներեն"
            >
              <Volume2 className={`w-4 h-4 ${isSpeaking ? 'text-amber-700 animate-pulse' : ''}`} />
            </button>
            {viewMode === 'click-reveal' && (
              <span className="text-xs font-bold text-amber-900 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200">
                {showArmenian ? 'Հայերենը բացված է' : '👉 Սեղմիր հայերենի համար'}
              </span>
            )}
          </div>
        </div>

        {showSpanish && (
          <div className="font-serif-title text-slate-900 whitespace-pre-line text-base sm:text-lg md:text-xl font-medium leading-relaxed">
            {block.es}
          </div>
        )}

        {showArmenian && (
          <div className="pt-2.5 border-t border-slate-100 text-sm sm:text-base text-slate-700 whitespace-pre-line leading-relaxed">
            {block.hy}
          </div>
        )}
      </div>
    );
  }

  // Default paragraph block
  return (
    <div
      onClick={viewMode === 'click-reveal' ? onToggleReveal : undefined}
      className={`p-4 rounded-xl border transition-all space-y-2.5 ${
        viewMode === 'click-reveal'
          ? 'cursor-pointer hover:bg-amber-50/30 border-slate-200 hover:border-amber-300'
          : 'border-transparent'
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        {showSpanish && (
          <div className="text-base sm:text-lg md:text-xl text-slate-900 leading-relaxed font-serif-title font-medium flex-1">
            <span className="text-xs sm:text-sm font-bold text-amber-900 mr-2">🇪🇸</span>
            {block.es}
          </div>
        )}
        <div className="flex items-center gap-1 shrink-0 mt-1">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onSpeak(block.es, block.id);
            }}
            className="text-slate-400 hover:text-slate-700 cursor-pointer p-1.5 rounded-lg hover:bg-slate-100"
            title="Լսել արտասանությունը"
          >
            <Volume2 className={`w-4 h-4 ${isSpeaking ? 'text-amber-700 animate-pulse' : ''}`} />
          </button>
        </div>
      </div>

      {showArmenian && (
        <div className="text-sm sm:text-base text-slate-700 leading-relaxed pt-2.5 border-t border-slate-100">
          <span className="text-xs sm:text-sm font-bold text-amber-900 mr-2">🇦🇲</span>
          {block.hy}
        </div>
      )}

      {viewMode === 'click-reveal' && !showArmenian && (
        <div className="text-xs sm:text-sm text-amber-800 font-semibold flex items-center gap-1 pt-1">
          <span>👉 Սեղմեք այստեղ՝ հայերեն թարգմանությունը տեսնելու համար</span>
        </div>
      )}

      {block.sourceUrl && (
        <div className="pt-1.5 text-xs text-slate-400 flex items-center gap-1">
          <span>Աղբյուր՝</span>
          <a
            href={block.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="text-amber-800 hover:underline flex items-center gap-0.5"
          >
            <span>{block.sourceName || 'Աղբյուր'}</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      )}
    </div>
  );
}

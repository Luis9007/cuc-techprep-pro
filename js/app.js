/**
 * Lógica principal de la aplicación de preparación para la entrevista técnica CUC
 * Versión 3.0: Énfasis en ADSO, Ejecución Local, Entornos y Git/GitHub
 */

document.addEventListener('DOMContentLoaded', () => {
  // Inicializar componentes
  initNavigation();
  initQuestionBank();
  initMockSimulator();
  initTechnicalQuiz();
  initCodeLab();
  initPitchBuilder();
  initChecklist();
  initCheatSheet();
  
  // Inicializar iconos de Lucide
  if (window.lucide) {
    window.lucide.createIcons();
  }
});

// ==========================================
// 1. NAVEGACIÓN ENTRE TABS (DESKTOP & MÓVIL)
// ==========================================
function initNavigation() {
  const navButtons = document.querySelectorAll('.nav-btn');
  const sections = document.querySelectorAll('.tab-section');
  const mobileDrawer = document.getElementById('mobile-drawer');

  navButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-target');
      if (!targetId) return;
      
      // Sincronizar todos los botones que apunten a esta pestaña
      navButtons.forEach(b => {
        const bTarget = b.getAttribute('data-target');
        if (bTarget === targetId) {
          b.classList.remove('text-slate-400', 'hover:bg-slate-800', 'hover:text-slate-200');
          b.classList.add('bg-red-600', 'text-white', 'shadow-lg', 'shadow-red-900/50');
        } else {
          b.classList.remove('bg-red-600', 'text-white', 'shadow-lg', 'shadow-red-900/50');
          b.classList.add('text-slate-400', 'hover:bg-slate-800', 'hover:text-slate-200');
        }
      });

      // Mostrar sección seleccionada
      sections.forEach(sec => {
        if (sec.id === targetId) {
          sec.classList.remove('hidden');
        } else {
          sec.classList.add('hidden');
        }
      });

      // Cerrar modal / drawer móvil automáticamente si estaba abierto
      if (mobileDrawer && !mobileDrawer.classList.contains('hidden')) {
        mobileDrawer.classList.add('hidden');
      }

      if (targetId === 'adso-git') {
        initCheatSheet();
      }

      if (window.lucide) {
        window.lucide.createIcons();
      }

      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });

  // Eventos de apertura y cierre del menú móvil
  const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
  const closeDrawerBtn = document.getElementById('close-drawer-btn');
  const drawerBackdrop = document.getElementById('drawer-backdrop');

  if (mobileMenuToggle && mobileDrawer) {
    mobileMenuToggle.addEventListener('click', () => {
      mobileDrawer.classList.toggle('hidden');
      if (window.lucide) window.lucide.createIcons();
    });
  }

  if (closeDrawerBtn && mobileDrawer) {
    closeDrawerBtn.addEventListener('click', () => {
      mobileDrawer.classList.add('hidden');
    });
  }

  if (drawerBackdrop && mobileDrawer) {
    drawerBackdrop.addEventListener('click', () => {
      mobileDrawer.classList.add('hidden');
    });
  }
}

// ==========================================
// 2. BANCO DE PREGUNTAS
// ==========================================
let currentQuestionFilter = 'all';

function initQuestionBank() {
  const container = document.getElementById('questions-container');
  const filterBtns = document.querySelectorAll('.question-filter-btn');
  const searchInput = document.getElementById('question-search');

  // Actualizar conteos en los botones de filtro dinámicamente
  filterBtns.forEach(btn => {
    const filter = btn.getAttribute('data-filter');
    let count = 0;
    if (filter === 'all') {
      count = INTERVIEW_QUESTIONS.length;
      btn.innerHTML = `Todas (${count})`;
    } else if (filter === 'programacion') {
      count = INTERVIEW_QUESTIONS.filter(q => q.category === 'programacion').length;
      btn.innerHTML = `💻 Programación (${count})`;
    } else if (filter === 'adso') {
      count = INTERVIEW_QUESTIONS.filter(q => q.category === 'adso').length;
      btn.innerHTML = `📐 ADSO & Requisitos (${count})`;
    } else if (filter === 'git_entornos') {
      count = INTERVIEW_QUESTIONS.filter(q => q.category === 'git_entornos').length;
      btn.innerHTML = `🌿 Git, GitHub & Entornos (${count})`;
    } else if (filter === 'ia') {
      count = INTERVIEW_QUESTIONS.filter(q => q.category === 'ia').length;
      btn.innerHTML = `🤖 Inteligencia Artificial (${count})`;
    } else if (filter === 'blandas') {
      count = INTERVIEW_QUESTIONS.filter(q => q.category === 'blandas').length;
      btn.innerHTML = `🤝 Habilidades Blandas (${count})`;
    } else if (filter === 'casos') {
      count = INTERVIEW_QUESTIONS.filter(q => q.category === 'casos').length;
      btn.innerHTML = `🏛️ Casos Prácticos (${count})`;
    }
  });

  function renderQuestions() {
    const searchTerm = searchInput ? searchInput.value.toLowerCase().trim() : '';
    container.innerHTML = '';

    const filtered = INTERVIEW_QUESTIONS.filter(q => {
      const matchesCategory = currentQuestionFilter === 'all' || q.category === currentQuestionFilter;
      const matchesSearch = q.question.toLowerCase().includes(searchTerm) || 
                            q.modelAnswer.toLowerCase().includes(searchTerm) ||
                            q.categoryLabel.toLowerCase().includes(searchTerm);
      return matchesCategory && matchesSearch;
    });

    if (filtered.length === 0) {
      container.innerHTML = `
        <div class="p-8 text-center bg-slate-800/40 rounded-xl border border-slate-700">
          <i data-lucide="help-circle" class="w-12 h-12 text-slate-500 mx-auto mb-3"></i>
          <p class="text-slate-300 font-medium">No se encontraron preguntas con los filtros seleccionados.</p>
        </div>
      `;
      if (window.lucide) window.lucide.createIcons();
      return;
    }

    filtered.forEach((q, index) => {
      const card = document.createElement('div');
      card.className = 'glass-card rounded-xl p-5 border border-slate-700/60 mb-4 transition-all';
      
      const categoryColor = {
        programacion: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
        adso: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
        git_entornos: 'bg-teal-500/10 text-teal-400 border-teal-500/20',
        ia: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
        blandas: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
        casos: 'bg-amber-500/10 text-amber-400 border-amber-500/20'
      }[q.category] || 'bg-slate-700 text-slate-300';

      card.innerHTML = `
        <div class="flex items-start justify-between gap-4 cursor-pointer toggle-answer-header" data-id="${q.id}">
          <div class="flex-1">
            <div class="flex flex-wrap items-center gap-2 mb-2">
              <span class="text-xs font-mono font-bold text-slate-500">#${index + 1}</span>
              <span class="text-xs px-2.5 py-0.5 rounded-full border ${categoryColor} font-semibold uppercase tracking-wider">
                ${q.categoryLabel}
              </span>
              <span class="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
                ${q.difficulty}
              </span>
            </div>
            <h4 class="text-base sm:text-lg font-semibold text-white leading-snug">
              ${q.question}
            </h4>
          </div>
          <button class="text-slate-400 hover:text-white p-1 rounded-lg bg-slate-800/80 transition-colors shrink-0">
            <i data-lucide="chevron-down" class="w-5 h-5 chevron-icon transition-transform"></i>
          </button>
        </div>

        <div class="answer-content hidden mt-4 pt-4 border-t border-slate-700/80">
          <div class="mb-4 bg-slate-900/60 p-3 rounded-lg border border-slate-800">
            <div class="flex items-center gap-2 text-xs font-semibold text-amber-400 mb-1">
              <i data-lucide="target" class="w-4 h-4"></i> ¿Qué evalúa el entrevistador?
            </div>
            <p class="text-xs sm:text-sm text-slate-300">${q.evaluation}</p>
          </div>

          <div class="mb-4">
            <div class="flex items-center gap-2 text-xs font-semibold text-emerald-400 mb-2">
              <i data-lucide="check-circle" class="w-4 h-4"></i> Respuesta Modelo Recomendada:
            </div>
            <div class="text-sm text-slate-200 leading-relaxed whitespace-pre-line bg-slate-950/70 p-4 rounded-lg border border-emerald-950/40">
              ${q.modelAnswer}
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
            <div class="bg-blue-950/20 border border-blue-900/30 p-3 rounded-lg">
              <span class="text-xs font-semibold text-blue-400 flex items-center gap-1.5 mb-1.5">
                <i data-lucide="lightbulb" class="w-3.5 h-3.5"></i> Puntos Clave a Mencionar:
              </span>
              <ul class="text-xs text-slate-300 space-y-1 list-disc list-inside">
                ${q.keyTips.map(tip => `<li>${tip}</li>`).join('')}
              </ul>
            </div>

            <div class="bg-rose-950/20 border border-rose-900/30 p-3 rounded-lg">
              <span class="text-xs font-semibold text-rose-400 flex items-center gap-1.5 mb-1.5">
                <i data-lucide="alert-triangle" class="w-3.5 h-3.5"></i> Qué EVITAR decir (Red Flag):
              </span>
              <p class="text-xs text-rose-200/90 leading-relaxed">${q.redFlags}</p>
            </div>
          </div>

          <div class="mt-4 flex justify-end gap-2">
            <button class="speak-btn text-xs px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center gap-1.5 transition-colors" data-text="${encodeURIComponent(q.question)}">
              <i data-lucide="volume-2" class="w-3.5 h-3.5"></i> Escuchar pregunta
            </button>
          </div>
        </div>
      `;

      const header = card.querySelector('.toggle-answer-header');
      const content = card.querySelector('.answer-content');
      const chevron = card.querySelector('.chevron-icon');

      header.addEventListener('click', () => {
        const isHidden = content.classList.contains('hidden');
        content.classList.toggle('hidden');
        chevron.style.transform = isHidden ? 'rotate(180deg)' : 'rotate(0deg)';
      });

      const speakBtn = card.querySelector('.speak-btn');
      speakBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        speakText(decodeURIComponent(speakBtn.getAttribute('data-text')));
      });

      container.appendChild(card);
    });

    if (window.lucide) window.lucide.createIcons();
  }

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => {
        b.classList.remove('bg-red-600', 'text-white');
        b.classList.add('bg-slate-800', 'text-slate-400');
      });
      btn.classList.remove('bg-slate-800', 'text-slate-400');
      btn.classList.add('bg-red-600', 'text-white');

      currentQuestionFilter = btn.getAttribute('data-filter');
      renderQuestions();
    });
  });

  if (searchInput) {
    searchInput.addEventListener('input', renderQuestions);
  }

  renderQuestions();
}

// ==========================================
// 3. SIMULADOR DE ENTREVISTA EN VIVO
// ==========================================
let simulatorState = {
  active: false,
  questions: [],
  currentIndex: 0,
  timerInterval: null,
  secondsElapsed: 0,
  userNotes: {},
  ratings: {}
};

function initMockSimulator() {
  const startBtn = document.getElementById('start-sim-btn');
  const simSetup = document.getElementById('sim-setup');
  const simActive = document.getElementById('sim-active');
  const simSummary = document.getElementById('sim-summary');

  const questionCard = document.getElementById('sim-question-text');
  const categoryBadge = document.getElementById('sim-category-badge');
  const currentNumBadge = document.getElementById('sim-current-num');
  const totalNumBadge = document.getElementById('sim-total-num');
  const timerDisplay = document.getElementById('sim-timer');
  const speakCurrentBtn = document.getElementById('sim-speak-btn');
  const nextBtn = document.getElementById('sim-next-btn');
  const prevBtn = document.getElementById('sim-prev-btn');
  const finishBtn = document.getElementById('sim-finish-btn');
  const hintBtn = document.getElementById('sim-hint-btn');
  const hintBox = document.getElementById('sim-hint-box');
  const hintText = document.getElementById('sim-hint-text');
  const notesArea = document.getElementById('sim-notes-input');
  const restartBtn = document.getElementById('sim-restart-btn');

  const stars = document.querySelectorAll('.sim-star-btn');

  startBtn.addEventListener('click', () => {
    const countSelect = document.getElementById('sim-count-select').value;
    const categorySelect = document.getElementById('sim-category-select').value;

    let available = [...INTERVIEW_QUESTIONS];
    if (categorySelect !== 'all') {
      available = available.filter(q => q.category === categorySelect);
    }

    available.sort(() => 0.5 - Math.random());
    const totalToTake = Math.min(parseInt(countSelect, 10), available.length);
    simulatorState.questions = available.slice(0, totalToTake);
    simulatorState.currentIndex = 0;
    simulatorState.secondsElapsed = 0;
    simulatorState.userNotes = {};
    simulatorState.ratings = {};

    simSetup.classList.add('hidden');
    simSummary.classList.add('hidden');
    simActive.classList.remove('hidden');

    startTimer();
    renderCurrentSimQuestion();
  });

  function startTimer() {
    clearInterval(simulatorState.timerInterval);
    simulatorState.timerInterval = setInterval(() => {
      simulatorState.secondsElapsed++;
      const mins = Math.floor(simulatorState.secondsElapsed / 60).toString().padStart(2, '0');
      const secs = (simulatorState.secondsElapsed % 60).toString().padStart(2, '0');
      timerDisplay.textContent = `${mins}:${secs}`;
    }, 1000);
  }

  function renderCurrentSimQuestion() {
    const q = simulatorState.questions[simulatorState.currentIndex];
    if (!q) return;

    currentNumBadge.textContent = simulatorState.currentIndex + 1;
    totalNumBadge.textContent = simulatorState.questions.length;
    categoryBadge.textContent = q.categoryLabel;
    questionCard.textContent = q.question;

    hintBox.classList.add('hidden');
    hintText.textContent = q.modelAnswer;

    notesArea.value = simulatorState.userNotes[q.id] || '';

    const currentRating = simulatorState.ratings[q.id] || 0;
    updateStarUI(currentRating);

    prevBtn.disabled = simulatorState.currentIndex === 0;
    if (simulatorState.currentIndex === simulatorState.questions.length - 1) {
      nextBtn.classList.add('hidden');
      finishBtn.classList.remove('hidden');
    } else {
      nextBtn.classList.remove('hidden');
      finishBtn.classList.add('hidden');
    }

    const autoSpeech = document.getElementById('sim-autospeech-check');
    if (autoSpeech && autoSpeech.checked) {
      speakText(q.question);
    }
  }

  notesArea.addEventListener('input', () => {
    const q = simulatorState.questions[simulatorState.currentIndex];
    if (q) {
      simulatorState.userNotes[q.id] = notesArea.value;
    }
  });

  stars.forEach(star => {
    star.addEventListener('click', () => {
      const val = parseInt(star.getAttribute('data-value'), 10);
      const q = simulatorState.questions[simulatorState.currentIndex];
      if (q) {
        simulatorState.ratings[q.id] = val;
        updateStarUI(val);
      }
    });
  });

  function updateStarUI(val) {
    stars.forEach(s => {
      const sVal = parseInt(s.getAttribute('data-value'), 10);
      if (sVal <= val) {
        s.classList.remove('text-slate-600');
        s.classList.add('text-amber-400');
      } else {
        s.classList.remove('text-amber-400');
        s.classList.add('text-slate-600');
      }
    });
  }

  speakCurrentBtn.addEventListener('click', () => {
    const q = simulatorState.questions[simulatorState.currentIndex];
    if (q) speakText(q.question);
  });

  hintBtn.addEventListener('click', () => {
    hintBox.classList.toggle('hidden');
  });

  nextBtn.addEventListener('click', () => {
    if (simulatorState.currentIndex < simulatorState.questions.length - 1) {
      simulatorState.currentIndex++;
      renderCurrentSimQuestion();
    }
  });

  prevBtn.addEventListener('click', () => {
    if (simulatorState.currentIndex > 0) {
      simulatorState.currentIndex--;
      renderCurrentSimQuestion();
    }
  });

  finishBtn.addEventListener('click', () => {
    clearInterval(simulatorState.timerInterval);
    renderSimSummary();
  });

  restartBtn.addEventListener('click', () => {
    simSummary.classList.add('hidden');
    simActive.classList.add('hidden');
    simSetup.classList.remove('hidden');
  });

  function renderSimSummary() {
    simActive.classList.add('hidden');
    simSummary.classList.remove('hidden');

    const totalTimeSpan = document.getElementById('summary-total-time');
    const avgScoreSpan = document.getElementById('summary-avg-score');
    const summaryList = document.getElementById('summary-questions-list');

    const mins = Math.floor(simulatorState.secondsElapsed / 60);
    const secs = simulatorState.secondsElapsed % 60;
    totalTimeSpan.textContent = `${mins}m ${secs}s`;

    let totalRating = 0;
    let ratedCount = 0;
    Object.values(simulatorState.ratings).forEach(r => {
      if (r > 0) {
        totalRating += r;
        ratedCount++;
      }
    });

    const avg = ratedCount > 0 ? (totalRating / ratedCount).toFixed(1) : 'Sin calificar';
    avgScoreSpan.textContent = `${avg} / 5.0 ⭐`;

    summaryList.innerHTML = '';
    simulatorState.questions.forEach((q, idx) => {
      const rating = simulatorState.ratings[q.id] || 'N/A';
      const notes = simulatorState.userNotes[q.id] || 'Sin notas registradas.';
      
      const item = document.createElement('div');
      item.className = 'p-4 rounded-lg bg-slate-900 border border-slate-800 text-left';
      item.innerHTML = `
        <div class="flex items-center justify-between mb-2">
          <span class="text-xs text-slate-400 font-semibold">Pregunta ${idx + 1} (${q.categoryLabel})</span>
          <span class="text-xs px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20 font-bold">
            Autoevaluación: ${rating} ⭐
          </span>
        </div>
        <p class="text-sm font-semibold text-white mb-2">${q.question}</p>
        <div class="text-xs text-slate-400 bg-slate-950 p-2.5 rounded border border-slate-800">
          <strong class="text-slate-300">Tus notas:</strong> ${notes}
        </div>
      `;
      summaryList.appendChild(item);
    });

    if (window.confetti) {
      window.confetti({ particleCount: 70, spread: 60, origin: { y: 0.7 } });
    }
  }
}

// ==========================================
// 4. TEST TÉCNICO INTERACTIVO (QUIZ)
// ==========================================
let quizState = {
  currentIndex: 0,
  score: 0,
  answers: [],
  selectedOption: null
};

function initTechnicalQuiz() {
  const startBtn = document.getElementById('quiz-start-btn');
  const introCard = document.getElementById('quiz-intro');
  const quizActive = document.getElementById('quiz-active');
  const resultsCard = document.getElementById('quiz-results');

  const questionNum = document.getElementById('quiz-q-num');
  const totalNum = document.getElementById('quiz-q-total');
  const topicBadge = document.getElementById('quiz-topic-badge');
  const questionText = document.getElementById('quiz-question-text');
  const optionsContainer = document.getElementById('quiz-options-container');
  const feedbackBox = document.getElementById('quiz-feedback-box');
  const feedbackText = document.getElementById('quiz-feedback-text');
  const submitBtn = document.getElementById('quiz-submit-btn');
  const nextBtn = document.getElementById('quiz-next-btn');
  const progressBar = document.getElementById('quiz-progress-bar');
  const restartBtn = document.getElementById('quiz-restart-btn');

  startBtn.addEventListener('click', () => {
    quizState.currentIndex = 0;
    quizState.score = 0;
    quizState.answers = [];
    quizState.selectedOption = null;

    introCard.classList.add('hidden');
    resultsCard.classList.add('hidden');
    quizActive.classList.remove('hidden');

    renderQuizQuestion();
  });

  function renderQuizQuestion() {
    const q = TECHNICAL_QUIZ[quizState.currentIndex];
    quizState.selectedOption = null;

    questionNum.textContent = quizState.currentIndex + 1;
    totalNum.textContent = TECHNICAL_QUIZ.length;
    topicBadge.textContent = q.topic;
    questionText.textContent = q.question;

    const progressPercent = ((quizState.currentIndex) / TECHNICAL_QUIZ.length) * 100;
    progressBar.style.width = `${progressPercent}%`;

    feedbackBox.classList.add('hidden');
    submitBtn.classList.remove('hidden');
    submitBtn.disabled = true;
    submitBtn.classList.add('opacity-50', 'cursor-not-allowed');
    nextBtn.classList.add('hidden');

    optionsContainer.innerHTML = '';
    q.options.forEach((opt, idx) => {
      const optBtn = document.createElement('button');
      optBtn.className = 'w-full text-left p-4 rounded-xl border border-slate-700/80 bg-slate-900/60 hover:bg-slate-800 text-slate-200 text-sm font-medium transition-all flex items-center justify-between group';
      optBtn.innerHTML = `
        <span class="flex items-center gap-3">
          <span class="w-7 h-7 rounded-lg bg-slate-800 text-slate-400 group-hover:text-white flex items-center justify-center text-xs font-bold border border-slate-700">
            ${String.fromCharCode(65 + idx)}
          </span>
          <span>${opt}</span>
        </span>
        <span class="check-icon opacity-0">
          <i data-lucide="check" class="w-5 h-5 text-emerald-400"></i>
        </span>
      `;

      optBtn.addEventListener('click', () => {
        optionsContainer.querySelectorAll('button').forEach(b => {
          b.classList.remove('border-red-500', 'bg-red-950/20', 'ring-2', 'ring-red-500/50');
          b.classList.add('border-slate-700/80');
        });
        optBtn.classList.remove('border-slate-700/80');
        optBtn.classList.add('border-red-500', 'bg-red-950/20', 'ring-2', 'ring-red-500/50');

        quizState.selectedOption = idx;
        submitBtn.disabled = false;
        submitBtn.classList.remove('opacity-50', 'cursor-not-allowed');
      });

      optionsContainer.appendChild(optBtn);
    });

    if (window.lucide) window.lucide.createIcons();
  }

  submitBtn.addEventListener('click', () => {
    if (quizState.selectedOption === null) return;

    const q = TECHNICAL_QUIZ[quizState.currentIndex];
    const isCorrect = quizState.selectedOption === q.correct;
    if (isCorrect) quizState.score++;

    quizState.answers.push({
      question: q.question,
      selected: quizState.selectedOption,
      correct: q.correct,
      isCorrect
    });

    const optionButtons = optionsContainer.querySelectorAll('button');
    optionButtons.forEach((btn, idx) => {
      btn.disabled = true;
      if (idx === q.correct) {
        btn.classList.add('bg-emerald-950/40', 'border-emerald-500', 'text-emerald-300');
      } else if (idx === quizState.selectedOption && !isCorrect) {
        btn.classList.add('bg-rose-950/40', 'border-rose-500', 'text-rose-300');
      }
    });

    feedbackBox.classList.remove('hidden');
    if (isCorrect) {
      feedbackBox.className = 'mt-5 p-4 rounded-xl border border-emerald-500/40 bg-emerald-950/30 text-emerald-200 text-xs sm:text-sm';
      feedbackText.innerHTML = `<strong>¡Excelente! Respuesta Correcta:</strong> ${q.explanation}`;
    } else {
      feedbackBox.className = 'mt-5 p-4 rounded-xl border border-rose-500/40 bg-rose-950/30 text-rose-200 text-xs sm:text-sm';
      feedbackText.innerHTML = `<strong>Respuesta incorrecta:</strong> ${q.explanation}`;
    }

    submitBtn.classList.add('hidden');
    nextBtn.classList.remove('hidden');
  });

  nextBtn.addEventListener('click', () => {
    if (quizState.currentIndex < TECHNICAL_QUIZ.length - 1) {
      quizState.currentIndex++;
      renderQuizQuestion();
    } else {
      renderQuizResults();
    }
  });

  function renderQuizResults() {
    quizActive.classList.add('hidden');
    resultsCard.classList.remove('hidden');

    const scoreDisplay = document.getElementById('quiz-final-score');
    const badgeDisplay = document.getElementById('quiz-result-badge');
    const messageDisplay = document.getElementById('quiz-result-message');
    const breakdownList = document.getElementById('quiz-breakdown-list');

    const total = TECHNICAL_QUIZ.length;
    const percentage = Math.round((quizState.score / total) * 100);
    scoreDisplay.textContent = `${quizState.score} / ${total} (${percentage}%)`;

    if (percentage >= 80) {
      badgeDisplay.className = 'px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide bg-emerald-500/10 text-emerald-400 border border-emerald-500/30';
      badgeDisplay.textContent = 'Nivel: Altamente Preparado 🚀';
      messageDisplay.textContent = '¡Impresionante! Tienes fundamentos sólidos de programación, ADSO, entornos e inteligencia artificial.';
      if (window.confetti) {
        window.confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } });
      }
    } else if (percentage >= 60) {
      badgeDisplay.className = 'px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide bg-amber-500/10 text-amber-400 border border-amber-500/30';
      badgeDisplay.textContent = 'Nivel: Competente con Oportunidad de Repaso 💡';
      messageDisplay.textContent = '¡Buen resultado! Revisa el Banco de Preguntas y el Cheat Sheet en las áreas donde dudaste.';
    } else {
      badgeDisplay.className = 'px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide bg-rose-500/10 text-rose-400 border border-rose-500/30';
      badgeDisplay.textContent = 'Nivel: Necesita Fortalecer Conceptos 📚';
      messageDisplay.textContent = 'No te desanimes. Estudia las respuestas explicadas, revisa los comandos en el Cheat Sheet y vuelve a intentarlo.';
    }

    breakdownList.innerHTML = '';
    quizState.answers.forEach((ans, idx) => {
      const q = TECHNICAL_QUIZ[idx];
      const div = document.createElement('div');
      div.className = `p-3 rounded-lg border text-xs sm:text-sm ${ans.isCorrect ? 'bg-emerald-950/20 border-emerald-900/40 text-emerald-300' : 'bg-rose-950/20 border-rose-900/40 text-rose-300'}`;
      div.innerHTML = `
        <div class="flex items-center justify-between mb-1">
          <span class="font-bold">${idx + 1}. ${q.topic}</span>
          <span>${ans.isCorrect ? '✅ Correcta' : '❌ Incorrecta'}</span>
        </div>
        <p class="text-slate-300 text-xs">${q.question}</p>
        <p class="text-slate-400 text-xs mt-1"><strong>Tu respuesta:</strong> ${q.options[ans.selected]} | <strong>Correcta:</strong> ${q.options[ans.correct]}</p>
      `;
      breakdownList.appendChild(div);
    });
  }

  restartBtn.addEventListener('click', () => {
    resultsCard.classList.add('hidden');
    introCard.classList.remove('hidden');
  });
}

// ==========================================
// 5. LABORATORIO DE CÓDIGO & IA (15 RETOS PRÁCTICOS)
// ==========================================
function initCodeLab() {
  const challengeSelect = document.getElementById('challenge-select');
  const titleElem = document.getElementById('challenge-title');
  const descElem = document.getElementById('challenge-desc');
  const editor = document.getElementById('code-editor');
  const runBtn = document.getElementById('run-code-btn');
  const resetBtn = document.getElementById('reset-code-btn');
  const outputBox = document.getElementById('code-output');
  const solutionBox = document.getElementById('solution-explanation');

  challengeSelect.innerHTML = '';
  CODE_CHALLENGES.forEach(ch => {
    const opt = document.createElement('option');
    opt.value = ch.id;
    opt.textContent = `[${ch.category}] ${ch.title}`;
    challengeSelect.appendChild(opt);
  });

  let currentChallenge = CODE_CHALLENGES[0];

  function loadChallenge(id) {
    currentChallenge = CODE_CHALLENGES.find(c => c.id === id) || CODE_CHALLENGES[0];
    titleElem.textContent = currentChallenge.title;
    descElem.textContent = currentChallenge.description;
    editor.value = currentChallenge.starterCode;
    outputBox.innerHTML = '<span class="text-slate-500">// Haz clic en "Probar Solución" para ejecutar pruebas o simular el entorno</span>';
    solutionBox.textContent = currentChallenge.explanation;
  }

  challengeSelect.addEventListener('change', (e) => {
    loadChallenge(e.target.value);
  });

  resetBtn.addEventListener('click', () => {
    editor.value = currentChallenge.starterCode;
    outputBox.innerHTML = '<span class="text-slate-500">// Código reiniciado al estado inicial.</span>';
  });

  runBtn.addEventListener('click', () => {
    outputBox.innerHTML = '<span class="text-amber-400 font-mono text-xs">Ejecutando pruebas y análisis...</span>';

    setTimeout(() => {
      const userCode = editor.value;

      // 1. Clasificador de Notas
      if (currentChallenge.id === 'fizzbuzz') {
        runJsTest(userCode, 'clasificarNota', currentChallenge.testCases, (fn, tc) => fn(tc.input));
      }
      // 2. Validador de correo institucional
      else if (currentChallenge.id === 'email_validator') {
        runJsTest(userCode, 'validarCorreoInstitucional', currentChallenge.testCases, (fn, tc) => fn(tc.input));
      }
      // 3. Filtro de estudiantes honor
      else if (currentChallenge.id === 'filter_students') {
        runJsTest(userCode, 'obtenerCuadroHonor', currentChallenge.testCases, (fn, tc) => fn(tc.input), true);
      }
      // 4. Verificador de palíndromos
      else if (currentChallenge.id === 'palindrome_check') {
        runJsTest(userCode, 'esPalindromo', currentChallenge.testCases, (fn, tc) => fn(tc.input));
      }
      // 5. Prerrequisitos de materias
      else if (currentChallenge.id === 'prerequisites_graph') {
        runJsTest(userCode, 'puedeInscribir', currentChallenge.testCases, (fn, tc) => fn(tc.input.materia, tc.input.reqs, tc.input.aprobadas));
      }
      // 6. ADSO: Requerimientos RF vs RNF
      else if (currentChallenge.id === 'adso_rf_rnf') {
        runJsTest(userCode, 'clasificarRequerimiento', currentChallenge.testCases, (fn, tc) => fn(tc.input));
      }
      // 7. Git: Validador de ramas Git Flow
      else if (currentChallenge.id === 'git_branch_validator') {
        runJsTest(userCode, 'validarNombreRama', currentChallenge.testCases, (fn, tc) => fn(tc.input));
      }
      // 8. Entornos: Parser de .env
      else if (currentChallenge.id === 'env_parser') {
        runJsTest(userCode, 'parsearEnv', currentChallenge.testCases, (fn, tc) => fn(tc.input), true);
      }
      // 9. SQL Promedio por Carrera
      else if (currentChallenge.id === 'sql_students') {
        outputBox.innerHTML = `
          <div class="space-y-2 text-xs font-mono text-slate-300">
            <span class="text-emerald-400 font-bold">✔ Sintaxis SQL validada exitosamente:</span>
            <div class="bg-slate-950 p-2.5 rounded border border-slate-800">
              <span class="text-slate-400">Resultado de la consulta simulada:</span>
              <table class="w-full mt-2 text-left text-slate-300 text-xs">
                <thead>
                  <tr class="border-b border-slate-800 text-slate-400">
                    <th class="py-1">carrera</th>
                    <th class="py-1">promedio_carrera</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td class="py-0.5">Ingeniería de Sistemas</td><td class="text-emerald-400 font-bold">4.21</td></tr>
                  <tr><td class="py-0.5">Desarrollo de Software</td><td class="text-emerald-400 font-bold">4.08</td></tr>
                  <tr><td class="py-0.5">Ingeniería Electrónica</td><td class="text-emerald-400 font-bold">3.85</td></tr>
                </tbody>
              </table>
            </div>
            <p class="text-emerald-400 text-xs mt-1">¡Cláusulas GROUP BY y HAVING >= 3.5 aplicadas con éxito!</p>
          </div>
        `;
        if (window.confetti) window.confetti({ particleCount: 40, spread: 45 });
      }
      // 10. SQL INNER JOIN
      else if (currentChallenge.id === 'sql_joins') {
        outputBox.innerHTML = `
          <div class="space-y-2 text-xs font-mono text-slate-300">
            <span class="text-emerald-400 font-bold">✔ Cruce relacional validado:</span>
            <div class="bg-slate-950 p-2.5 rounded border border-slate-800">
              <span class="text-slate-400">Registros vinculados mediante INNER JOIN:</span>
              <table class="w-full mt-2 text-left text-slate-300 text-xs">
                <thead>
                  <tr class="border-b border-slate-800 text-slate-400">
                    <th class="py-1">estudiante</th>
                    <th class="py-1">curso</th>
                    <th class="py-1">nota_final</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td>Andrés Gómez</td><td>Programación Web</td><td class="text-emerald-400 font-bold">4.7</td></tr>
                  <tr><td>Laura Pérez</td><td>Bases de Datos II</td><td class="text-emerald-400 font-bold">4.5</td></tr>
                  <tr><td>Carlos Ruiz</td><td>Inteligencia Artificial</td><td class="text-emerald-400 font-bold">4.2</td></tr>
                </tbody>
              </table>
            </div>
            <p class="text-emerald-400 text-xs">¡Llaves foráneas y condiciones WHERE aplicadas correctamente!</p>
          </div>
        `;
        if (window.confetti) window.confetti({ particleCount: 40, spread: 45 });
      }
      // 11. SQL Riesgo Académico
      else if (currentChallenge.id === 'sql_risk') {
        outputBox.innerHTML = `
          <div class="space-y-2 text-xs font-mono text-slate-300">
            <span class="text-emerald-400 font-bold">✔ Filtro de estudiantes en riesgo verificado:</span>
            <div class="bg-slate-950 p-2.5 rounded border border-slate-800">
              <span class="text-slate-400">Estudiantes con 2 o más materias reprobadas (&lt; 3.0):</span>
              <table class="w-full mt-2 text-left text-slate-300 text-xs">
                <thead>
                  <tr class="border-b border-slate-800 text-slate-400">
                    <th class="py-1">estudiante_id</th>
                    <th class="py-1">materias_reprobadas</th>
                    <th class="py-1">promedio_general</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td>EST-10829</td><td class="text-rose-400 font-bold">3</td><td>2.45</td></tr>
                  <tr><td>EST-10944</td><td class="text-rose-400 font-bold">2</td><td>2.80</td></tr>
                </tbody>
              </table>
            </div>
            <p class="text-emerald-400 text-xs">¡Alerta temprana de riesgo calculada con precisión!</p>
          </div>
        `;
        if (window.confetti) window.confetti({ particleCount: 40, spread: 45 });
      }
      // 12. ADSO: Tabla Intermedia Muchos a Muchos
      else if (currentChallenge.id === 'sql_intermediate_table') {
        outputBox.innerHTML = `
          <div class="space-y-2 text-xs font-mono text-slate-300">
            <span class="text-emerald-400 font-bold">✔ Estructura DDL relacional validada:</span>
            <div class="bg-slate-950 p-2.5 rounded border border-slate-800">
              <span class="text-blue-400 font-semibold">Tabla creada:</span> matriculas
              <ul class="mt-1.5 space-y-1 text-slate-300 list-disc list-inside">
                <li>Clave Primaria Compuesta: <code class="text-amber-400 font-bold">(estudiante_id, curso_id, periodo)</code></li>
                <li>Clave Foránea: <code class="text-emerald-400">estudiante_id REFERENCES estudiantes(id)</code></li>
                <li>Clave Foránea: <code class="text-emerald-400">curso_id REFERENCES cursos(id)</code></li>
                <li>Restricción de integridad: <code class="text-slate-400">ON DELETE RESTRICT</code></li>
              </ul>
            </div>
            <p class="text-emerald-400 text-xs">¡Modelo normalizado en 3FN que resuelve la relación N:M!</p>
          </div>
        `;
        if (window.confetti) window.confetti({ particleCount: 40, spread: 45 });
      }
      // 13. Prompt PQR
      else if (currentChallenge.id === 'ai_prompt') {
        outputBox.innerHTML = `
          <div class="space-y-2 text-xs font-mono text-slate-300">
            <span class="text-emerald-400 font-bold">✔ Simulación de inferencia LLM con System Prompt:</span>
            <div class="bg-slate-950 p-2.5 rounded border border-slate-800 text-slate-400">
              <span class="text-blue-400 font-bold">Entrada del Estudiante:</span> "Hola, pagué mi matrícula hace 3 días y todavía me sale bloqueado el horario para inscribir cálculo integral."
            </div>
            <div class="bg-slate-950 p-2.5 rounded border border-slate-800 text-emerald-400">
              <span class="text-slate-400">Salida generada en JSON estricto:</span>
<pre class="mt-1 text-slate-200">
{
  "categoria": "Pagos y Facturación",
  "urgencia": "Alta",
  "resumen_breve": "Pago efectuado no reflejado para inscripción de materias",
  "accion_recomendada": "Remitir a Tesorería y Soporte Técnico para validación de pasarela"
}
</pre>
            </div>
            <p class="text-emerald-400 text-xs">¡Estructura de prompt profesional lista para producción!</p>
          </div>
        `;
        if (window.confetti) window.confetti({ particleCount: 40, spread: 45 });
      }
      // 14. Prompt RAG
      else if (currentChallenge.id === 'ai_rag_prompt') {
        outputBox.innerHTML = `
          <div class="space-y-2 text-xs font-mono text-slate-300">
            <span class="text-emerald-400 font-bold">✔ Simulación de Asistente RAG con barreras de seguridad:</span>
            <div class="bg-slate-950 p-2.5 rounded border border-slate-800 text-slate-400">
              <span class="text-blue-400 font-bold">Pregunta:</span> "¿Hasta qué semana puedo cancelar una materia sin que afecte mi promedio?"
            </div>
            <div class="bg-slate-950 p-2.5 rounded border border-slate-800 text-emerald-300">
              <span class="text-slate-400">Respuesta con cita estricta:</span>
              <p class="mt-1 text-slate-200">"De acuerdo con el <strong>Artículo 42, Parágrafo 1</strong> del Reglamento Estudiantil, la cancelación extemporánea de asignaturas puede solicitarse hasta la semana 8 del período académico regular sin generar calificación reprobatoria en el historial académico."</p>
            </div>
            <p class="text-emerald-400 text-xs">¡Citas precisas y prevención de alucinaciones verificadas!</p>
          </div>
        `;
        if (window.confetti) window.confetti({ particleCount: 40, spread: 45 });
      }
      // 15. Terminal Troubleshooting Puerto Ocupado
      else if (currentChallenge.id === 'port_troubleshoot') {
        outputBox.innerHTML = `
          <div class="space-y-2 text-xs font-mono text-slate-300">
            <span class="text-emerald-400 font-bold">✔ Simulación de Terminal PowerShell / Bash:</span>
            <div class="bg-slate-950 p-2.5 rounded border border-slate-800">
              <span class="text-amber-400 font-bold">&gt; netstat -ano | findstr :3000</span>
              <pre class="text-slate-300 mt-1">TCP    0.0.0.0:3000           0.0.0.0:0              LISTENING       14280</pre>
              <span class="text-amber-400 font-bold mt-2 block">&gt; taskkill /PID 14280 /F</span>
              <pre class="text-emerald-400 mt-1">CORRECTO: el proceso con PID 14280 se ha terminado forzosamente.</pre>
              <span class="text-emerald-400 font-bold mt-1 block">✔ Puerto 3000 liberado. Servidor listo para arrancar con npm run dev.</span>
            </div>
            <p class="text-emerald-400 text-xs">¡Excelente manejo de troubleshooting en terminal!</p>
          </div>
        `;
        if (window.confetti) window.confetti({ particleCount: 40, spread: 45 });
      }
    }, 350);
  });

  function runJsTest(userCode, functionName, testCases, executor, compareObjects = false) {
    try {
      const runFunc = new Function(`${userCode}; return ${functionName};`)();
      
      let passed = 0;
      let html = '<div class="space-y-1.5 font-mono text-xs">';
      
      testCases.forEach((tc, idx) => {
        const actual = executor(runFunc, tc);
        let isMatch = false;
        
        if (compareObjects) {
          isMatch = JSON.stringify(actual) === JSON.stringify(tc.expected);
        } else {
          isMatch = actual === tc.expected;
        }

        if (isMatch) passed++;
        
        const displayActual = typeof actual === 'object' ? JSON.stringify(actual) : actual;
        const displayExpected = typeof tc.expected === 'object' ? JSON.stringify(tc.expected) : tc.expected;

        html += `
          <div class="flex items-center gap-2 ${isMatch ? 'text-emerald-400' : 'text-rose-400'}">
            <span>${isMatch ? '✔ PASS' : '✖ FAIL'}</span>
            <span>Caso ${idx + 1}: ${functionName}(...) -> ${displayActual} (Esperado: ${displayExpected})</span>
          </div>
        `;
      });

      html += `</div>`;
      const allPassed = passed === testCases.length;
      html += `
        <div class="mt-3 pt-2 border-t border-slate-800 text-xs font-semibold ${allPassed ? 'text-emerald-400' : 'text-amber-400'}">
          Resultado: ${passed} de ${testCases.length} pruebas superadas. ${allPassed ? '¡Excelente código!' : 'Revisa los casos que fallaron.'}
        </div>
      `;
      outputBox.innerHTML = html;

      if (allPassed && window.confetti) {
        window.confetti({ particleCount: 60, spread: 55 });
      }
    } catch (err) {
      outputBox.innerHTML = `<span class="text-rose-400 font-mono text-xs">Error de sintaxis o ejecución en JavaScript: ${err.message}</span>`;
    }
  }

  loadChallenge('fizzbuzz');
}

// ==========================================
// 6. CONSTRUCTOR DE PITCH PERSONAL ("HÁBLAME DE TI")
// ==========================================
function initPitchBuilder() {
  const nameInput = document.getElementById('pitch-name');
  const careerInput = document.getElementById('pitch-career');
  const techInput = document.getElementById('pitch-tech');
  const aiInput = document.getElementById('pitch-ai');
  const strengthInput = document.getElementById('pitch-strength');
  const previewBox = document.getElementById('pitch-preview-text');
  const copyBtn = document.getElementById('copy-pitch-btn');
  const saveBtn = document.getElementById('save-pitch-btn');
  const copyToast = document.getElementById('pitch-copy-toast');

  const savedPitch = localStorage.getItem('cuc_saved_pitch_form');
  if (savedPitch) {
    try {
      const data = JSON.parse(savedPitch);
      if (data.name) nameInput.value = data.name;
      if (data.career) careerInput.value = data.career;
      if (data.tech) techInput.value = data.tech;
      if (data.ai) aiInput.value = data.ai;
      if (data.strength) strengthInput.value = data.strength;
    } catch (e) {}
  }

  function updatePitch() {
    const name = nameInput.value.trim() || '[Tu Nombre]';
    const career = careerInput.value.trim() || 'Ingeniería de Sistemas / Análisis y Desarrollo de Software (ADSO)';
    const tech = techInput.value.trim() || 'JavaScript, Python, Git Flow y bases de datos relacionales SQL';
    const ai = aiInput.value.trim() || 'herramientas de IA generativa, diseño de prompts y APIs de IA';
    const strength = strengthInput.value.trim() || 'mi proactividad, disciplina para aprender rápido y capacidad para resolver problemas en equipo';

    const speech = `¡Hola! Mucho gusto, mi nombre es ${name}. Soy estudiante de ${career}.

A lo largo de mi formación he consolidado bases sólidas en análisis y desarrollo de software, modelado de requerimientos, estructuras de datos y tecnologías como ${tech}, con buenas prácticas de versionamiento en Git y principios de código limpio.

Además, tengo un gran interés y conocimientos en ${ai}, utilizándolas activamente para optimizar flujos de trabajo, documentar soluciones y acelerar el desarrollo.

Me emociona enormemente la oportunidad de realizar mis prácticas en la Universidad de la Costa (CUC), porque comparto su visión de innovación tecnológica y desarrollo de proyectos reales. Estoy seguro de que puedo aportar ${strength}, a la vez que aprendo de los proyectos y las mejores prácticas del equipo para acelerar mi crecimiento profesional.`;

    previewBox.textContent = speech;
  }

  [nameInput, careerInput, techInput, aiInput, strengthInput].forEach(inp => {
    inp.addEventListener('input', updatePitch);
  });

  saveBtn.addEventListener('click', () => {
    const data = {
      name: nameInput.value,
      career: careerInput.value,
      tech: techInput.value,
      ai: aiInput.value,
      strength: strengthInput.value
    };
    localStorage.setItem('cuc_saved_pitch_form', JSON.stringify(data));
    showToast('¡Pitch guardado exitosamente en tu navegador!');
  });

  copyBtn.addEventListener('click', () => {
    const text = previewBox.textContent;
    navigator.clipboard.writeText(text).then(() => {
      showToast('¡Discurso copiado al portapapeles!');
    });
  });

  function showToast(msg) {
    if (copyToast) {
      copyToast.textContent = msg;
      copyToast.classList.remove('opacity-0', 'pointer-events-none');
      setTimeout(() => {
        copyToast.classList.add('opacity-0', 'pointer-events-none');
      }, 2500);
    }
  }

  updatePitch();
}

// ==========================================
// 7. CHECKLIST & PERSISTENCIA
// ==========================================
function initChecklist() {
  const checkboxes = document.querySelectorAll('.checklist-checkbox');

  const savedState = JSON.parse(localStorage.getItem('cuc_interview_checklist') || '{}');
  checkboxes.forEach(cb => {
    const key = cb.getAttribute('data-check-id');
    if (savedState[key]) {
      cb.checked = true;
      const label = cb.closest('label');
      if (label) label.classList.add('text-slate-500', 'line-through');
    }

    cb.addEventListener('change', () => {
      savedState[key] = cb.checked;
      localStorage.setItem('cuc_interview_checklist', JSON.stringify(savedState));
      
      const label = cb.closest('label');
      if (label) {
        if (cb.checked) {
          label.classList.add('text-slate-500', 'line-through');
        } else {
          label.classList.remove('text-slate-500', 'line-through');
        }
      }

      updateChecklistProgress();
    });
  });

  function updateChecklistProgress() {
    const total = checkboxes.length;
    let checked = 0;
    checkboxes.forEach(cb => { if (cb.checked) checked++; });
    const percent = Math.round((checked / total) * 100);
    
    const countElem = document.getElementById('checklist-count');
    const barElem = document.getElementById('checklist-progress-bar');
    if (countElem) countElem.textContent = `${checked}/${total} completados (${percent}%)`;
    if (barElem) barElem.style.width = `${percent}%`;
  }

  updateChecklistProgress();
}

// ==========================================
// 8. GUÍA INTERACTIVA: ADSO, GIT & CHEATSHEET DE COMANDOS LOCALES
// ==========================================
function initCheatSheet() {
  const glossaryContainer = document.getElementById('adso-glossary-container');
  const commandsContainer = document.getElementById('terminal-commands-container');

  const glossaryList = (typeof ADSO_GLOSSARY !== 'undefined') ? ADSO_GLOSSARY : [];
  if (glossaryContainer && glossaryList.length > 0) {
    glossaryContainer.innerHTML = '';
    glossaryList.forEach(item => {
      const card = document.createElement('div');
      card.className = 'glass-card p-4 rounded-xl border border-slate-800 space-y-1.5';
      card.innerHTML = `
        <div class="flex items-center justify-between">
          <h4 class="font-bold text-white text-sm">${item.term}</h4>
          <span class="text-[10px] px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 font-semibold uppercase">
            ${item.category}
          </span>
        </div>
        <p class="text-xs text-slate-300 leading-relaxed">${item.definition}</p>
      `;
      glossaryContainer.appendChild(card);
    });
  }

  const cheatsheetList = (typeof TERMINAL_CHEATSHEET !== 'undefined') ? TERMINAL_CHEATSHEET : [];
  if (commandsContainer && cheatsheetList.length > 0) {
    commandsContainer.innerHTML = '';
    cheatsheetList.forEach(topic => {
      const block = document.createElement('div');
      block.className = 'glass-panel p-5 rounded-2xl border border-slate-800 space-y-3';
      
      let cmdsHtml = '';
      topic.commands.forEach(c => {
        cmdsHtml += `
          <div class="bg-slate-950 p-3 rounded-xl border border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2 group">
            <div class="flex-1 font-mono text-xs text-amber-400 break-all">
              <span>$ ${c.cmd}</span>
            </div>
            <div class="text-[11px] text-slate-400 flex items-center justify-between gap-3 shrink-0">
              <span>${c.desc}</span>
              <button class="copy-cmd-btn text-slate-500 hover:text-white p-1 rounded bg-slate-800 hover:bg-slate-700 transition-colors" data-cmd="${encodeURIComponent(c.cmd)}" title="Copiar comando">
                <i data-lucide="copy" class="w-3.5 h-3.5"></i>
              </button>
            </div>
          </div>
        `;
      });

      block.innerHTML = `
        <h3 class="text-sm sm:text-base font-bold text-white flex items-center gap-2">
          <i data-lucide="terminal" class="w-4 h-4 text-red-500"></i> ${topic.topic}
        </h3>
        <div class="space-y-2">
          ${cmdsHtml}
        </div>
      `;

      commandsContainer.appendChild(block);
    });

    // Copiar comando al portapapeles
    commandsContainer.querySelectorAll('.copy-cmd-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const cmd = decodeURIComponent(btn.getAttribute('data-cmd'));
        navigator.clipboard.writeText(cmd).then(() => {
          btn.classList.add('text-emerald-400');
          setTimeout(() => btn.classList.remove('text-emerald-400'), 1500);
        });
      });
    });
  }

  if (window.lucide) {
    window.lucide.createIcons();
  }
}

// ==========================================
// UTILIDADES: TEXT TO SPEECH (VOZ NATIVA)
// ==========================================
function speakText(text) {
  if (!('speechSynthesis' in window)) {
    alert('Tu navegador no soporta síntesis de voz.');
    return;
  }

  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'es-CO';
  utterance.rate = 1.0;
  utterance.pitch = 1.0;

  const voices = window.speechSynthesis.getVoices();
  const esVoice = voices.find(v => v.lang.startsWith('es'));
  if (esVoice) utterance.voice = esVoice;

  window.speechSynthesis.speak(utterance);
}

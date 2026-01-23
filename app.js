/**
 * WebDev Academy - Course Application
 * JavaScript functionality following template patterns
 */

'use strict';

/* ============================================
   Configuration
   ============================================ */
const CONFIG = Object.freeze({
  storageKey: 'webdev-academy-progress',
  copyFeedbackDuration: 2000,
  chapters: Object.freeze({
    internet: { quizzes: 4, exercises: 0 },
    html: { quizzes: 2, exercises: 2 },
    css: { quizzes: 2, exercises: 2 },
    layout: { quizzes: 3, exercises: 2 },
    dom: { quizzes: 4, exercises: 2 },
    javascript: { quizzes: 10, exercises: 5 },
    'javascript-part2': { quizzes: 7, exercises: 3 },
    projects: { quizzes: 0, exercises: 0 }
  })
});

// Calculate total items
const TOTAL_ITEMS = Object.values(CONFIG.chapters).reduce(
  (sum, ch) => sum + ch.quizzes + ch.exercises,
  0
);

/* ============================================
   State Management (localStorage-backed)
   ============================================ */
const state = {
  getCompletedItems() {
    try {
      return JSON.parse(localStorage.getItem(CONFIG.storageKey)) || {};
    } catch (error) {
      console.warn('Failed to parse progress from localStorage:', error);
      return {};
    }
  },

  markComplete(chapterId, itemId) {
    const items = this.getCompletedItems();

    if (!items[chapterId]) {
      items[chapterId] = [];
    }

    if (items[chapterId].includes(itemId)) {
      return false;
    }

    items[chapterId].push(itemId);
    localStorage.setItem(CONFIG.storageKey, JSON.stringify(items));
    return true;
  },

  isComplete(chapterId, itemId) {
    const items = this.getCompletedItems();
    return items[chapterId]?.includes(itemId) || false;
  },

  getTotalCompleted() {
    const items = this.getCompletedItems();
    return Object.values(items).reduce((sum, arr) => sum + arr.length, 0);
  },

  getChapterCompleted(chapterId) {
    const items = this.getCompletedItems();
    return items[chapterId]?.length || 0;
  }
};

/* ============================================
   Initialization
   ============================================ */
document.addEventListener('DOMContentLoaded', function () {
  initCollapsibles();
  initSmoothScrolling();
  initActiveNavigation();
  initProgress();
  initChapterStatuses();
  restoreQuizStates();
});

/* ============================================
   Collapsible Sections
   ============================================ */
function initCollapsibles() {
  const triggers = document.querySelectorAll('.collapsible__trigger');

  triggers.forEach(function (trigger) {
    trigger.addEventListener('click', function () {
      const parent = trigger.closest('.collapsible');
      const isOpen = parent.classList.contains('collapsible--open');

      parent.classList.toggle('collapsible--open');
      trigger.setAttribute('aria-expanded', String(!isOpen));
    });
  });
}

/* ============================================
   Smooth Scrolling
   ============================================ */
function initSmoothScrolling() {
  const links = document.querySelectorAll('a[href^="#"]');

  links.forEach(function (link) {
    link.addEventListener('click', function (event) {
      const targetId = link.getAttribute('href');

      if (targetId === '#') {
        return;
      }

      const target = document.querySelector(targetId);

      if (target) {
        event.preventDefault();
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });

        history.pushState(null, '', targetId);
      }
    });
  });
}

/* ============================================
   Active Navigation
   ============================================ */
function initActiveNavigation() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.sidebar__link');

  if (sections.length === 0 || navLinks.length === 0) {
    return;
  }

  const observerOptions = {
    rootMargin: '-20% 0px -70% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        const activeId = entry.target.getAttribute('id');

        navLinks.forEach(function (link) {
          link.classList.remove('sidebar__link--active');

          if (link.getAttribute('href') === '#' + activeId) {
            link.classList.add('sidebar__link--active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(function (section) {
    observer.observe(section);
  });
}

/* ============================================
   Progress Tracking
   ============================================ */
function initProgress() {
  updateProgress();
}

function updateProgress() {
  const completed = state.getTotalCompleted();
  const percent = Math.min(100, Math.round((completed / TOTAL_ITEMS) * 100));

  const fill = document.getElementById('progressFill');
  const text = document.getElementById('progressPercent');

  if (fill) {
    fill.style.width = percent + '%';
  }

  if (text) {
    text.textContent = String(percent);
  }
}

function initChapterStatuses() {
  Object.keys(CONFIG.chapters).forEach(function (chapterId) {
    const chapter = CONFIG.chapters[chapterId];
    const total = chapter.quizzes + chapter.exercises;
    const completed = state.getChapterCompleted(chapterId);

    const statusElement = document.getElementById('status-' + chapterId);

    if (statusElement) {
      if (completed === 0) {
        statusElement.textContent = 'Not started';
      } else if (completed >= total) {
        statusElement.textContent = 'Completed';
        statusElement.style.color = 'var(--color-accent-primary)';
      } else {
        statusElement.textContent = completed + '/' + total + ' done';
        statusElement.style.color = 'var(--color-accent-warning)';
      }
    }
  });
}

/* ============================================
   Quiz Functionality
   ============================================ */
function getCurrentChapterId() {
  const article = document.querySelector('.chapter-page');

  if (article && article.dataset.chapter) {
    return article.dataset.chapter;
  }

  const path = window.location.pathname;

  if (path.includes('internet')) return 'internet';
  if (path.includes('html')) return 'html';
  if (path.includes('css')) return 'css';
  if (path.includes('layout')) return 'layout';
  if (path.includes('dom')) return 'dom';
  if (path.includes('javascript-part2')) return 'javascript-part2';
  if (path.includes('javascript')) return 'javascript';
  if (path.includes('projects')) return 'projects';

  return 'unknown';
}

function checkQuiz(option, selected) {
  const quiz = option.closest('.quiz');

  if (!quiz) {
    return;
  }

  const correct = quiz.dataset.correct;
  const quizId = quiz.dataset.quizId || quiz.dataset.correct;
  const options = quiz.querySelectorAll('.quiz-option');
  const chapterId = getCurrentChapterId();

  if (quiz.dataset.answered === 'true') {
    return;
  }

  quiz.dataset.answered = 'true';

  options.forEach(function (opt) {
    opt.style.pointerEvents = 'none';
  });

  if (selected === correct) {
    option.classList.add('correct');

    if (state.markComplete(chapterId, 'quiz-' + quizId)) {
      updateProgress();
      initChapterStatuses();
    }
  } else {
    option.classList.add('incorrect');

    options.forEach(function (opt) {
      const letter = opt.querySelector('.option-letter');

      if (letter && letter.textContent.toLowerCase() === correct) {
        opt.classList.add('correct');
      }
    });
  }
}

function restoreQuizStates() {
  const chapterId = getCurrentChapterId();
  const completed = state.getCompletedItems()[chapterId] || [];

  document.querySelectorAll('.quiz').forEach(function (quiz) {
    const quizId = quiz.dataset.quizId || quiz.dataset.correct;

    if (completed.includes('quiz-' + quizId)) {
      quiz.dataset.answered = 'true';
      const options = quiz.querySelectorAll('.quiz-option');
      const correct = quiz.dataset.correct;

      options.forEach(function (opt) {
        opt.style.pointerEvents = 'none';
        const letter = opt.querySelector('.option-letter');

        if (letter && letter.textContent.toLowerCase() === correct) {
          opt.classList.add('correct');
        }
      });
    }
  });
}

/* ============================================
   Code Execution
   ============================================ */
function runHTMLCode(textareaId, outputId) {
  const textarea = document.getElementById(textareaId);
  const output = document.getElementById(outputId);
  const chapterId = getCurrentChapterId();

  if (!textarea || !output) {
    return;
  }

  output.innerHTML = textarea.value;

  if (state.markComplete(chapterId, 'exercise-' + textareaId)) {
    updateProgress();
    initChapterStatuses();
  }
}

function runJSCode(textareaId, outputId) {
  const textarea = document.getElementById(textareaId);
  const output = document.getElementById(outputId);
  const chapterId = getCurrentChapterId();

  if (!textarea || !output) {
    return;
  }

  output.innerHTML = '';

  const originalLog = console.log;
  const originalWarn = console.warn;
  const originalError = console.error;
  const logs = [];

  console.log = function () {
    const args = Array.prototype.slice.call(arguments);
    logs.push({ type: 'log', message: args.map(formatValue).join(' ') });
    originalLog.apply(console, args);
  };

  console.warn = function () {
    const args = Array.prototype.slice.call(arguments);
    logs.push({ type: 'warn', message: args.map(formatValue).join(' ') });
    originalWarn.apply(console, args);
  };

  console.error = function () {
    const args = Array.prototype.slice.call(arguments);
    logs.push({ type: 'error', message: args.map(formatValue).join(' ') });
    originalError.apply(console, args);
  };

  try {
    const code = textarea.value;
    const fn = new Function(code);
    const result = fn();

    console.log = originalLog;
    console.warn = originalWarn;
    console.error = originalError;

    if (logs.length > 0) {
      output.innerHTML = logs.map(function (log) {
        const color = log.type === 'error' ? 'var(--color-accent-danger)' :
          log.type === 'warn' ? 'var(--color-accent-warning)' :
            'var(--color-accent-primary)';
        return '<div style="color: ' + color + '; padding: 0.5rem 1rem; ' +
          'background: rgba(35, 134, 54, 0.1); border-radius: 6px; ' +
          'margin-bottom: 4px; font-family: var(--font-mono); font-size: 14px;">' +
          '<span style="color: var(--color-text-muted);">▸</span> ' +
          escapeHtml(log.message) + '</div>';
      }).join('');
    } else if (result !== undefined) {
      output.innerHTML = '<div style="color: var(--color-accent-primary); ' +
        'padding: 0.5rem 1rem; background: rgba(35, 134, 54, 0.1); ' +
        'border-radius: 6px; font-family: var(--font-mono); font-size: 14px;">' +
        '<span style="color: var(--color-text-muted);">▸</span> ' +
        escapeHtml(formatValue(result)) + '</div>';
    } else {
      output.innerHTML = '<div style="color: var(--color-text-muted); ' +
        'padding: 0.5rem 1rem; font-style: italic;">' +
        'Code executed successfully (no output)</div>';
    }

    if (state.markComplete(chapterId, 'exercise-' + textareaId)) {
      updateProgress();
      initChapterStatuses();
    }
  } catch (error) {
    console.log = originalLog;
    console.warn = originalWarn;
    console.error = originalError;

    output.innerHTML = '<div style="color: var(--color-accent-danger); ' +
      'padding: 1rem; background: rgba(248, 81, 73, 0.1); ' +
      'border-radius: 8px; border: 1px solid var(--color-accent-danger);">' +
      '<strong>Error:</strong> ' + escapeHtml(error.message) + '</div>';
  }
}

function runCSSCode(textareaId, outputId) {
  const textarea = document.getElementById(textareaId);
  const chapterId = getCurrentChapterId();

  if (!textarea) {
    return;
  }

  const code = textarea.value;
  const styleId = 'dynamic-style-' + textareaId;

  const existingStyle = document.getElementById(styleId);
  if (existingStyle) {
    existingStyle.remove();
  }

  const style = document.createElement('style');
  style.id = styleId;
  style.textContent = code.replace(/\.btn(?![-\w])/g, '.styled-btn');
  document.head.appendChild(style);

  if (state.markComplete(chapterId, 'exercise-' + textareaId)) {
    updateProgress();
    initChapterStatuses();
  }
}

/* ============================================
   Utility Functions
   ============================================ */
function formatValue(value) {
  if (value === null) return 'null';
  if (value === undefined) return 'undefined';
  if (typeof value === 'string') return value;

  if (typeof value === 'object') {
    try {
      return JSON.stringify(value, null, 2);
    } catch (error) {
      return String(value);
    }
  }

  return String(value);
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

function showHint(hintId) {
  const hint = document.getElementById(hintId);

  if (!hint) {
    return;
  }

  hint.style.display = hint.style.display === 'none' ? 'block' : 'none';
}

function copyCode(btn) {
  const codeBlock = btn.closest('.code-block');

  if (!codeBlock) {
    return;
  }

  const code = codeBlock.querySelector('code');

  if (!code) {
    return;
  }

  const text = code.innerText;
  const originalText = btn.textContent;

  navigator.clipboard.writeText(text).then(function () {
    btn.textContent = 'Copied!';

    setTimeout(function () {
      btn.textContent = originalText;
    }, CONFIG.copyFeedbackDuration);
  }).catch(function (error) {
    console.error('Failed to copy:', error);
  });
}

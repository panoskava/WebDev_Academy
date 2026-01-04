/**
 * WebDev Academy - Course Page Application
 * Handles interactivity for the web development course.
 * Supports multi-page architecture with global progress tracking.
 */

'use strict';

/* ============================================
   Constants & Configuration
   ============================================ */
const CONFIG = {
  storageKey: 'webdev-academy-progress',
  copyFeedbackDuration: 2000, // ms
  // Define all quizzes per chapter for accurate total count
  chapters: {
    internet: { quizzes: 4, exercises: 0 },
    html: { quizzes: 2, exercises: 2 },
    css: { quizzes: 2, exercises: 2 },
    layout: { quizzes: 3, exercises: 2 },
    projects: { quizzes: 0, exercises: 0 },
  },
};

// Calculate total items dynamically
CONFIG.totalItems = Object.values(CONFIG.chapters).reduce(
  (sum, ch) => sum + ch.quizzes + ch.exercises,
  0
);

/* ============================================
   State Management (localStorage-backed)
   ============================================ */
const state = {
  /**
   * Get all completed items from localStorage
   * @returns {Object} Object with chapter IDs as keys, arrays of item IDs as values
   */
  getCompletedItems() {
    try {
      return JSON.parse(localStorage.getItem(CONFIG.storageKey)) || {};
    } catch (e) {
      console.warn('Failed to parse progress from localStorage:', e);
      return {};
    }
  },

  /**
   * Mark an item as complete
   * @param {string} chapterId - Chapter identifier (e.g., 'internet', 'html')
   * @param {string} itemId - Unique item identifier within the chapter
   * @returns {boolean} True if item was newly marked complete, false if already complete
   */
  markComplete(chapterId, itemId) {
    const items = this.getCompletedItems();
    if (!items[chapterId]) {
      items[chapterId] = [];
    }
    // Prevent duplicate items
    if (items[chapterId].includes(itemId)) {
      return false;
    }
    items[chapterId].push(itemId);
    localStorage.setItem(CONFIG.storageKey, JSON.stringify(items));
    return true;
  },

  /**
   * Check if an item is already complete
   * @param {string} chapterId - Chapter identifier
   * @param {string} itemId - Item identifier
   * @returns {boolean}
   */
  isComplete(chapterId, itemId) {
    const items = this.getCompletedItems();
    return items[chapterId]?.includes(itemId) || false;
  },

  /**
   * Get total completed items across all chapters
   * @returns {number}
   */
  getTotalCompleted() {
    const items = this.getCompletedItems();
    return Object.values(items).reduce((sum, arr) => sum + arr.length, 0);
  },

  /**
   * Get completed count for a specific chapter
   * @param {string} chapterId
   * @returns {number}
   */
  getChapterCompleted(chapterId) {
    const items = this.getCompletedItems();
    return items[chapterId]?.length || 0;
  },
};

/* ============================================
   DOM Utilities
   ============================================ */
/**
 * Safely query a single element
 * @param {string} selector - CSS selector
 * @param {Element} parent - Parent element (default: document)
 * @returns {Element|null}
 */
const $ = (selector, parent = document) => parent.querySelector(selector);

/**
 * Safely query all matching elements
 * @param {string} selector - CSS selector
 * @param {Element} parent - Parent element (default: document)
 * @returns {NodeList}
 */
const $$ = (selector, parent = document) => parent.querySelectorAll(selector);

/* ============================================
   Progress Tracking
   ============================================ */
/**
 * Updates the global progress bar and percentage display.
 * Clamps value between 0-100% to prevent overflow.
 */
function updateProgress() {
  const completed = state.getTotalCompleted();
  // FIX: Clamp percentage to prevent exceeding 100%
  const percent = Math.min(100, Math.round((completed / CONFIG.totalItems) * 100));

  const fill = $('#progressFill');
  const text = $('#progressPercent');

  if (fill) fill.style.width = `${percent}%`;
  if (text) text.textContent = percent;
}

/**
 * Update chapter status indicators on the landing page
 */
function updateChapterStatuses() {
  Object.keys(CONFIG.chapters).forEach((chapterId) => {
    const chapter = CONFIG.chapters[chapterId];
    const total = chapter.quizzes + chapter.exercises;
    const completed = state.getChapterCompleted(chapterId);

    const dot = $(`#status-${chapterId}`);
    const text = $(`#status-text-${chapterId}`);

    if (dot && text) {
      if (completed === 0) {
        dot.className = 'status-dot';
        text.textContent = 'Not started';
      } else if (completed >= total) {
        dot.className = 'status-dot completed';
        text.textContent = 'Completed';
      } else {
        dot.className = 'status-dot in-progress';
        text.textContent = `${completed}/${total} completed`;
      }
    }
  });
}

/* ============================================
   Chapter Accordion (for legacy support)
   ============================================ */
/**
 * Toggles chapter content visibility.
 * @param {Element} header - The chapter header element
 */
function toggleChapter(header) {
  const content = header.nextElementSibling;
  const toggle = header.querySelector('.chapter-toggle');

  if (content) content.classList.toggle('open');
  if (toggle) toggle.classList.toggle('open');
}

/* ============================================
   Quiz Functionality
   ============================================ */
/**
 * Get the current chapter ID from the page
 * @returns {string} Chapter ID or 'unknown'
 */
function getCurrentChapterId() {
  const article = $('.chapter-page');
  if (article) {
    return article.dataset.chapter || 'unknown';
  }
  // Check URL as fallback
  const path = window.location.pathname;
  if (path.includes('internet')) return 'internet';
  if (path.includes('html')) return 'html';
  if (path.includes('css')) return 'css';
  if (path.includes('layout')) return 'layout';
  if (path.includes('projects')) return 'projects';
  return 'unknown';
}

/**
 * Checks a quiz answer and provides feedback.
 * @param {Element} option - The selected quiz option element
 * @param {string} selected - The selected answer letter
 */
function checkQuiz(option, selected) {
  const quiz = option.closest('.quiz');
  if (!quiz) return;

  const correct = quiz.dataset.correct;
  const quizId = quiz.dataset.quizId || quiz.dataset.correct; // Fallback to correct answer as ID
  const options = $$('.quiz-option', quiz);
  const chapterId = getCurrentChapterId();

  // Prevent re-answering
  if (quiz.dataset.answered === 'true') return;
  quiz.dataset.answered = 'true';

  // Disable all options
  options.forEach((opt) => {
    opt.style.pointerEvents = 'none';
  });

  // Mark correct or incorrect
  if (selected === correct) {
    option.classList.add('correct');
    // Only update progress if newly completed
    if (state.markComplete(chapterId, `quiz-${quizId}`)) {
      updateProgress();
    }
  } else {
    option.classList.add('incorrect');
    // Highlight the correct answer
    options.forEach((opt) => {
      const letter = opt.querySelector('.option-letter');
      if (letter && letter.textContent.toLowerCase() === correct) {
        opt.classList.add('correct');
      }
    });
  }
}

/* ============================================
   Code Execution (HTML Preview)
   ============================================ */
/**
 * Runs HTML code and displays it in a preview container.
 * @param {string} textareaId - ID of the textarea with code
 * @param {string} outputId - ID of the output container
 */
function runHTMLCode(textareaId, outputId) {
  const textarea = document.getElementById(textareaId);
  const output = document.getElementById(outputId);
  const chapterId = getCurrentChapterId();

  if (!textarea || !output) return;

  output.innerHTML = textarea.value;

  // Mark exercise as complete
  if (state.markComplete(chapterId, `exercise-${textareaId}`)) {
    updateProgress();
  }
}

/* ============================================
   Code Execution (CSS Preview)
   ============================================ */
/**
 * Runs CSS code by injecting a dynamic style element.
 * @param {string} textareaId - ID of the textarea with code
 * @param {string} outputId - ID of the output container (for context)
 */
function runCSSCode(textareaId, outputId) {
  const textarea = document.getElementById(textareaId);
  const chapterId = getCurrentChapterId();

  if (!textarea) return;

  const code = textarea.value;
  const styleId = `dynamic-style-${textareaId}`;

  // Remove existing dynamic style if present
  const existingStyle = document.getElementById(styleId);
  if (existingStyle) existingStyle.remove();

  // Create and inject new style
  const style = document.createElement('style');
  style.id = styleId;
  // Namespace .btn to avoid conflicts with page styles
  style.textContent = code.replace(/\.btn(?![-\w])/g, '.styled-btn');
  document.head.appendChild(style);

  // Mark exercise as complete
  if (state.markComplete(chapterId, `exercise-${textareaId}`)) {
    updateProgress();
  }
}

/* ============================================
   Hint Toggle
   ============================================ */
/**
 * Toggles the visibility of a hint element.
 * @param {string} hintId - ID of the hint element
 */
function showHint(hintId) {
  const hint = document.getElementById(hintId);
  if (!hint) return;

  hint.style.display = hint.style.display === 'none' ? 'block' : 'none';
}

/* ============================================
   Clipboard Copy
   ============================================ */
/**
 * Copies code from a code block to the clipboard.
 * @param {Element} btn - The copy button element
 */
function copyCode(btn) {
  const codeBlock = btn.closest('.code-block');
  if (!codeBlock) return;

  const code = codeBlock.querySelector('code');
  if (!code) return;

  const text = code.innerText;
  const originalText = btn.textContent;

  navigator.clipboard.writeText(text).then(() => {
    btn.textContent = 'Copied!';
    setTimeout(() => {
      btn.textContent = originalText;
    }, CONFIG.copyFeedbackDuration);
  }).catch((err) => {
    console.error('Failed to copy:', err);
  });
}

/* ============================================
   Navigation Highlighting
   ============================================ */
/**
 * Highlight the active navigation link based on current page
 */
function highlightActiveNav() {
  const currentPath = window.location.pathname;
  $$('.nav-links a').forEach((link) => {
    const href = link.getAttribute('href');
    if (href && currentPath.includes(href.replace('../', '').replace('./', ''))) {
      link.classList.add('active');
    }
  });
}

/**
 * Restore quiz states from localStorage
 */
function restoreQuizStates() {
  const chapterId = getCurrentChapterId();
  const completed = state.getCompletedItems()[chapterId] || [];

  $$('.quiz').forEach((quiz) => {
    const quizId = quiz.dataset.quizId || quiz.dataset.correct;
    if (completed.includes(`quiz-${quizId}`)) {
      quiz.dataset.answered = 'true';
      const options = $$('.quiz-option', quiz);
      const correct = quiz.dataset.correct;

      options.forEach((opt) => {
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
   Initialization
   ============================================ */
document.addEventListener('DOMContentLoaded', () => {
  // Update progress bar
  updateProgress();

  // Update chapter statuses on landing page
  updateChapterStatuses();

  // Highlight active navigation
  highlightActiveNav();

  // Restore quiz states
  restoreQuizStates();

  // Open the first chapter by default (legacy support for accordion)
  const firstContent = $('.chapter-content');
  const firstToggle = $('.chapter-toggle');

  if (firstContent) firstContent.classList.add('open');
  if (firstToggle) firstToggle.classList.add('open');
});

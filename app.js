/**
 * WebDev Academy - Course Page Application
 * Handles interactivity for the web development course.
 */

'use strict';

/* ============================================
   Constants & Configuration
   ============================================ */
const CONFIG = {
  totalItems: 12, // Total quizzes + exercises for progress tracking
  copyFeedbackDuration: 2000, // ms
};

/* ============================================
   State Management
   ============================================ */
const state = {
  completedItems: 0,
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
 * Updates the progress bar and percentage display.
 */
function updateProgress() {
  const percent = Math.round((state.completedItems / CONFIG.totalItems) * 100);
  const fill = $('#progressFill');
  const text = $('#progressPercent');

  if (fill) fill.style.width = `${percent}%`;
  if (text) text.textContent = percent;
}

/* ============================================
   Chapter Accordion
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
 * Checks a quiz answer and provides feedback.
 * @param {Element} option - The selected quiz option element
 * @param {string} selected - The selected answer letter
 */
function checkQuiz(option, selected) {
  const quiz = option.closest('.quiz');
  if (!quiz) return;

  const correct = quiz.dataset.correct;
  const options = $$('.quiz-option', quiz);

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
    state.completedItems++;
    updateProgress();
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

  if (!textarea || !output) return;

  output.innerHTML = textarea.value;
  state.completedItems++;
  updateProgress();
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

  state.completedItems++;
  updateProgress();
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
   Initialization
   ============================================ */
document.addEventListener('DOMContentLoaded', () => {
  // Open the first chapter by default
  const firstContent = $('.chapter-content');
  const firstToggle = $('.chapter-toggle');

  if (firstContent) firstContent.classList.add('open');
  if (firstToggle) firstToggle.classList.add('open');
});

# WebDev Academy Technical Documentation

**Version:** 2.0.0  
**Last Updated:** January 2026  
**Status:** Active  

---

## 1. Executive Summary

**WebDev Academy** is a client-side, single-page application (SPA) architecture web development course designed to run entirely in the browser without backend dependencies. It provides a comprehensive, interactive learning environment featuring real-time code execution, persistent progress tracking, and module-based content delivery.

The platform is engineered to be lightweight, performant, and privacy-focused, utilizing local storage for state persistence. It covers the full spectrum of modern web development, from networking fundamentals to advanced JavaScript concepts.

---

## 2. Getting Started

### 2.1 Prerequisites
Accessing the WebDev Academy requires only a modern web browser with JavaScript enabled.
- **Recommended Browsers:** Google Chrome (90+), Mozilla Firefox (90+), Microsoft Edge, or Safari.
- **System Requirements:** OS-independent (runs on Windows, macOS, Linux, Android, iOS).

### 2.2 Installation
Since the project is a static site, no build process or package installation is required.

**Option A: Local Deployment**
1. Clone the repository:
   ```bash
   git clone https://github.com/panoskava/WebDev_Academy.git
   ```
2. Navigate to the project directory:
   ```bash
   cd WebDev_Academy
   ```
3. Launch via a local development server (recommended for `localStorage` functionality):
   ```bash
   # Using Python 3
   python3 -m http.server 8000
   
   # Using Node.js serve
   npx serve .
   ```
4. Navigate to `http://localhost:8000` in your browser.

**Option B: Direct Access**
Open the `index.html` file directly in your web browser. *Note: Strict browser security settings may restrict `localStorage` access on the `file://` protocol.*

---

## 3. Architecture & Design

### 3.1 High-Level Architecture
The application follows a **Multi-Page Static Site** architecture with a centralized state management controller.

- **Presentation Layer (View):** Semantic HTML5 pages styled with a custom CSS3 design system.
- **Logic Layer (Controller):** a monolithic `app.js` handling routing logic, event delegation, and state mutations.
- **Data Layer (Model):** `window.localStorage` serving as the persistent document store.

### 3.2 Directory Structure
The project adheres to a semantic directory structure:

```text
WebDev_Academy/
├── index.html              # Application Entry Point & Dashboard
├── projects.html           # Practical Application Projects
├── app.js                  # Core Application Logic & State Controller
├── styles.css              # Global Design System & Component Library
├── DOCUMENTATION.md        # Technical Documentation (This file)
└── chapters/               # Content Modules
    ├── index.html          # Chapters Directory/Index
    ├── internet.html       # Module 1: Networking Fundamentals
    ├── html.html           # Module 2: Document Structure
    ├── css.html            # Module 3: Visual Styling
    ├── layout.html         # Module 4: Responsive Design System
    ├── dom.html            # Module 5: Document Object Model
    ├── javascript.html     # Module 6: CS Fundamentals & Syntax
    └── javascript-part2.html # Module 7: Advanced Browser Scripting
```

---

## 4. Technical Implementation Details

### 4.1 State Management System
State is managed via a singleton `state` object within `app.js`, serving as the single source of truth for user progress.

**Data Model:**
The application persists a JSON serialization of the user's progress under the key `webdev-academy-progress`.

```json
{
  "internet": ["quiz-internet-1", "quiz-internet-2"],
  "html": ["quiz-html-1", "exercise-html-ex-1"],
  "javascript": ["quiz-js-scope", "exercise-js-loops"]
}
```

**Key Methods:**
- `markComplete(chapterId, itemId)`: Idempotent operation to record item completion. Updates specific chapter arrays and triggers persistence.
- `state.getCompletedItems()`: Retrieves and deserializes the state tree.
- `state.getTotalCompleted()`: Aggregates completion metrics for the progress dashboard.

### 4.2 Interactive Assessment Engine

#### Quiz System
Quizzes are implemented as data-driven components within the HTML structure.
- **Configuration:** Defined via `data-quiz-id`, `data-correct` (answer key), and `data-answered` (state) attributes.
- **Validation Logic:** The `checkQuiz()` function performs client-side validation, comparing user selection against the dataset. Immediate visual feedback (success/error states) is applied via CSS class toggling (`.correct` / `.incorrect`).

#### Code Execution Sandbox
The platform features a live code execution environment (`runJSCode`, `runHTMLCode`, `runCSSCode`) enabling safe, sandboxed execution of user code.
- **JavaScript Execution:** Utilizes `new Function()` constructor to execute user string input.
- **Console Proxying:** Overrides global `console.log`, `console.warn`, and `console.error` to intercept standard output and render it to the comprehensive UI log container alongside the execution result.
- **Safety:** Execution is wrapped in `try-catch` blocks to gracefully handle runtime errors and display stack traces to the user.

### 4.3 Design System & UI Architecture
The UI is built on a custom CSS framework utilizing modern CSS Custom Properties (Variables) for theming and consistency.

**Core Tokens (`:root`):**
- **Color Palette:** Semantic referencing (e.g., `--color-primary`, `--color-bg-dark`) ensures dark-mode compatibility and easy theming.
- **Typography:** Uses 'Inter' for UI copy and 'Fira Code' for technical content, ensuring readability.
- **Layout:** Responsive grid and flexbox utilities handle device adaptation from mobile (`max-width: 768px`) to desktop.

**Component Library:**
The `styles.css` file implements a modular BEM-like (Block Element Modifier) methodology for components:
- `.card` / `.chapter-card`
- `.btn` / `.btn--primary`
- `.alert` / `.alert--info`
- `.progress-bar`

---

## 5. Module Configuration

The application configuration is centralized in the `CONFIG` constant in `app.js`. When adding new content, this registry must be updated.

**Current Configuration:**
```javascript
const CONFIG = {
    chapters: {
        internet:         { quizzes: 4, exercises: 0 },
        html:             { quizzes: 2, exercises: 2 },
        css:              { quizzes: 2, exercises: 2 },
        layout:           { quizzes: 3, exercises: 2 },
        dom:              { quizzes: 4, exercises: 2 },
        javascript:       { quizzes: 10, exercises: 5 },
        'javascript-part2': { quizzes: 7, exercises: 3 },
        projects:         { quizzes: 0, exercises: 0 }
    }
};
```

---

## 6. Contribution Guide

We welcome contributions to the WebDev Academy. To ensure quality and consistency, please adhere to the following standards:

### 6.1 Content Guidelines
- **Tone:** Professional, encouraging, and technically precise.
- **Formatting:** Use semantic HTML tags. Code blocks must use the `<pre><code>` structure.
- **Ids:** All interactive elements (quizzes, exercises) must possess a globally unique ID to ensure correct state tracking.

### 6.2 Code Style
- **JavaScript:** ES6+ syntax, strict mode (`'use strict'`), functional style where appropriate.
- **CSS:** Mobile-first media queries, variable-based values, grouping by component.

---

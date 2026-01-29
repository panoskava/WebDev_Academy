# WebDev Academy

![Project Status](https://img.shields.io/badge/status-active-success.svg)
![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Version](https://img.shields.io/badge/version-2.0.0-lightgrey.svg)

> **A comprehensive, interactive web development course built entirely with vanilla HTML, CSS, and JavaScript.**

## 👋 Introduction

Welcome to **WebDev Academy**. I created this project with a singular goal: to build a robust, interactive educational platform without relying on heavy frameworks or complex build tools. I wanted to demonstrate that modern, performant, and scalable web applications can be engineered using only standard web technologies.

This course is designed to take learners from the absolute basics of how the internet works to advanced JavaScript concepts, all within a custom-built, single-page application (SPA) environment that I developed from scratch (With heavy inspiration from Professor Δημητριος Βεργαδος "Προγραμματισμός στο Διαδίκτυο" course at University of West Macedonia).

## ✨ Key Features

*   **Interactive Learning Environment**: I implemented a custom "sandbox" feature that allows users to write HTML, CSS, and JavaScript and see the results instantly, all running safely within the browser.
*   **Persistent Progress Tracking**: The application automatically saves your progress (completed lessons, quizzes, and exercises) using `localStorage`, so you can pick up exactly where you left off.
*   **Framework-Free Architecture**: Every component, from the routing logic to the state management system, is hand-coded in vanilla JavaScript.
*   **Responsive Design System**: A fully custom CSS framework that ensures a seamless experience across desktop, tablet, and mobile devices.
*   **Deep-Dive Content**: 7 comprehensive modules covering The Internet, HTML5, CSS3, Flexbox/Grid Layouts, DOM Manipulation, and Advanced JavaScript.

## 🛠️ Technology Stack

I utilized a "back-to-basics" stack to ensure maximum performance and zero dependency bloat:

*   **HTML5**: Semantic structure and accessible markup.
*   **CSS3**: Advanced styling using Custom Properties (Variables), Flexbox, and CSS Grid.
*   **JavaScript (ES6+)**: The core application logic, utilizing modern features like Modules, Arrow Functions, and the Intersection Observer API.
*   **Local Storage**: For client-side data persistence.

## 🚀 Getting Started

Since I built this as a static site, you don't need to install any dependencies or run a build process.

### Running Locally

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/panoskava/WebDev_Academy.git
    ```

2.  **Navigate to the project folder:**
    ```bash
    cd WebDev_Academy
    ```

3.  **Launch the application:**
    You can simply open `index.html` in your browser. However, for the best experience (and to ensure all browser APIs work correctly), I recommend using a simple local server:

    ```bash
    # If you have Python installed:
    python3 -m http.server 8000
    ```

    Then open `http://localhost:8000` in your browser.

## 📚 Project Structure

Here is a high-level overview of how I organized the codebase:

```text
WebDev_Academy/
├── index.html              # The main dashboard and entry point
├── app.js                  # The core application logic (Controller)
├── styles.css              # My custom design system (View)
├── projects.html           # Practical coding challenges
├── DOCUMENTATION.md        # Detailed technical documentation
└── chapters/               # Educational content modules
    ├── internet.html
    ├── html.html
    └── ...
```

## 🎯 Philosophy

In building WebDev Academy, I adhered to a few core principles:

1.  **Simplicity over Complexity**: Why use a 2MB framework when 100 lines of vanilla JS will do?
2.  **Accessibility**: Semantic HTML and proper ARIA labels are not optional; they are foundational.

## 📄 License

This project is open-source and available for educational purposes. Feel free to use, modify, and learn from the code!

---

*Built with ❤️ by panoskava.*

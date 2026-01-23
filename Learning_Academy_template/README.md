# Course Academy - Website Template

A reusable template for educational websites with theory and exercises.

---

## File Structure

```
template/
├── README.md              # This file
├── index.html             # Landing page
├── styles.css             # All CSS styles
├── app.js                 # JavaScript functionality
└── theory/
    ├── index.html         # Theory index
    ├── lesson-template.html   # Lesson template
    └── diagrams-template.js   # Graphviz diagram template
```

---

## Quick Start

### Step 1: Copy
Copy the entire `template/` folder to your new project folder.

### Step 2: Customize `index.html`
1. Change the title in `<title>` and `<h1>`
2. Update the description in `<meta name="description">`
3. Add your own content cards

### Step 3: Create Lessons
1. Copy `theory/lesson-template.html` to `theory/lesson1-title.html`
2. Follow the `<!-- CUSTOMIZE: ... -->` comments
3. Update `theory/index.html` with a link to the new lesson

---

## File Guide

### `index.html` - Landing Page
The main page with:
- **Hero Section**: Title and description
- **Content Cards**: Cards for topic sections
- **Footer**: Footer

### `theory/index.html` - Theory Index
List of all available lessons with cards.

### `theory/lesson-template.html` - Lesson Template
Complete lesson with:
- **Sidebar**: In-lesson navigation
- **Sections**: Organized content
- **Components**: All available UI elements

---

## CSS Classes Reference

### Layouts
| Class | Description |
|-------|-------------|
| `.app-layout` | Grid layout with sidebar |
| `.sidebar` | Side navigation |
| `.main-content` | Main content area |
| `.container` | Centered container |

### Cards
| Class | Description |
|-------|-------------|
| `.problem-card` | Content/exercise card |
| `.test-card` | Card with hover effects |
| `.lesson-card` | Lesson card |

### Alerts
| Class | Usage |
|-------|-------|
| `.alert--info` | Information (lightbulb icon) |
| `.alert--tip` | Tips (lightbulb icon) |
| `.alert--warning` | Warnings (warning triangle icon) |
| `.alert--important` | Important (star icon) |

### Content
| Class | Description |
|-------|-------------|
| `.solution` | Solution box |
| `.steps` | Step-by-step explanation |
| `.grammar` | Grammars/rules |
| `.math-block` | Mathematical expressions |
| `.table-container` | Responsive table |
| `.diagram-container` | Graphviz diagrams |

### Collapsibles
| Class | Description |
|-------|-------------|
| `.collapsible` | Container |
| `.collapsible__trigger` | Toggle button |
| `.collapsible__content` | Hidden content |
| `.collapsible--open` | Open state |

---

## How to Create a Lesson

### 1. Copy the template
```bash
copy theory\lesson-template.html theory\lesson1-introduction.html
```

### 2. Update metadata
```html
<title>Lesson 1: Your Title | Academy</title>
<meta name="description" content="Lesson description...">
```

### 3. Customize the sidebar
```html
<li class="sidebar__item">
    <a href="#section-id" class="sidebar__link">
        <span class="sidebar__icon" aria-hidden="true">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
                <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
            </svg>
        </span>
        Section Title
    </a>
</li>
```

### 4. Add sections
Use the components from the template. Each `<section>` must have an `id` that matches the sidebar link.

### 5. Update the index
Add a new card in `theory/index.html`.

---

## Tips

1. **Consistency**: Always use the same CSS classes
2. **IDs**: Each section needs a unique `id` for the sidebar
3. **Icons**: Use inline SVG icons for professional appearance
4. **Responsive**: Styles are already responsive
5. **Dark Theme**: The color scheme is dark by design

---

## Alert Example

```html
<div class="alert alert--tip">
    <span class="alert__icon" aria-hidden="true">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M9 18h6M10 22h4M12 2a7 7 0 0 1 7 7c0 2.4-1.2 4.5-3 5.7V17H8v-2.3C6.2 13.5 5 11.4 5 9a7 7 0 0 1 7-7z"/>
        </svg>
    </span>
    <div class="alert__content">
        <strong>Tip:</strong> Your tip text here.
    </div>
</div>
```

## Collapsible Solution Example

```html
<div class="collapsible">
    <button class="collapsible__trigger" aria-expanded="false">
        <span>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="16" height="16" style="vertical-align: middle;">
                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
                <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
            </svg>
            View Solution
        </span>
        <span class="collapsible__icon">▼</span>
    </button>
    <div class="collapsible__content">
        <div class="solution">
            <div class="solution__header">
                <span>✓</span> Solution
            </div>
            <div class="solution__content">
                Solution content here...
            </div>
        </div>
    </div>
</div>
```

## Step-by-Step Example

```html
<ol class="steps">
    <li class="step">
        <div class="step__title">Step 1</div>
        <div class="step__content">
            Step description...
        </div>
    </li>
    <li class="step">
        <div class="step__title">Step 2</div>
        <div class="step__content">
            Step description...
        </div>
    </li>
</ol>
```

---

## Dependencies

- **Fonts**: Google Fonts (Inter, JetBrains Mono) - loaded from CDN
- **Graphviz**: Viz.js for diagrams - optional, load from CDN if needed

---

## License

Free to use and modify. Created for educational purposes.

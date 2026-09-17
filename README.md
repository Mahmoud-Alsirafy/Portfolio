# Mahmoud Wael — Full-Stack Developer Portfolio

A modern, high-performance personal developer portfolio for **Mahmoud Wael**, Full-Stack Software Developer with a specialized focus on **Back-End Development with PHP & Laravel, MySQL Database Engineering, and RESTful APIs**.

Built entirely from the ground up using **pure HTML5, CSS3, and Vanilla JavaScript** with **zero external libraries or UI frameworks** (No React, No Vue, No Tailwind, No Bootstrap, No jQuery).

---

## 🚀 Tech Stack

* **HTML5**: Clean, semantic markup optimized for accessibility (a11y) and search engine indexing (SEO). Includes schema markup (JSON-LD `Person`).
* **CSS3**: Modern Vanilla CSS architecture utilizing CSS custom properties (variables), responsive fluid clamp typography, CSS Grid & Flexbox, smooth transitions, and dark/light color tokens.
* **Vanilla JavaScript (ES6+)**: Custom modular scripts handling the interactive navigation, drawer menu, project filtering, modal dialog, touch-enabled testimonials carousel, animated counters, and contact validation.

> **Standalone Frontend:**  
> This project does **not** require `Node.js`, `npm`, `Composer`, a local PHP server, or a database to run. It runs directly in any modern browser.

---

## 📁 Project Structure

```text
portfolio/
│
├── index.html                  # Main semantic HTML5 markup (all 11 sections)
│
├── css/
│   └── styles.css              # Custom CSS design system, typography, components, and media queries
│
├── js/
│   └── scripts.js              # Vanilla JS interactions (nav, modal, filter, carousel, form validation)
│
├── assets/
│   ├── images/
│   │   ├── profile.svg         # Clean developer silhouette avatar placeholder
│   │   ├── about.svg           # Code architecture illustration
│   │   ├── favicon.svg         # Monogram website favicon
│   │   └── projects/
│   │       ├── medlink.svg     # MedLink EHR project mockup
│   │       ├── petcare.svg     # PetCare clinic portal mockup
│   │       ├── ecommerce.svg   # ShopFlow e-commerce mockup
│   │       └── portfolio.svg   # Developer portfolio mockup
│   │
│   └── icons/                  # High-performance inline SVG icons
│
└── README.md                   # Documentation, setup guide, and roadmap
```

---

## 💻 How to Run

### Option 1: Direct Browser Opening
1. Open the project folder in File Explorer.
2. Double-click `index.html` (or right-click and choose **Open With** → Chrome / Edge / Firefox / Safari).
3. The portfolio will load immediately with all styling and interactions ready.

### Option 2: Using VS Code Live Server
1. Open the `portfolio` folder inside **Visual Studio Code**.
2. Install the **Live Server** extension if you haven't already.
3. Right-click on `index.html` and select **Open with Live Server**.
4. The site will launch on your local development server (e.g. `http://127.0.0.1:5500`).

---

## 🎨 Color Palette

The project is built strictly upon a calm, professional, and elegant palette:

| Color | Hex Code | Primary Usage |
| :--- | :--- | :--- |
| **Dark Slate** | `#333333` | Headings, primary text, buttons, footer, cards |
| **Pure White** | `#FFFFFF` | Main background, surface cards, active highlights |
| **Soft Mint** | `#E1F4F3` | Accents, badges, button hover states, icons |
| **Warm Muted** | `#706C61` | Secondary text, borders, timeline accents |

---

## 📑 Website Sections

1. **Home (`#home`)**: Hero introduction, full-stack headline, elevator pitch, quick availability meta, CTA buttons, and profile frame with floating technology tags (PHP, Laravel, MySQL, JavaScript).
2. **About (`#about`)**: Detailed bio, engineering values, and live animated counters (+2 Years Experience, +10 Projects, +8 Technologies, +5 Production Apps).
3. **Education (`#education`)**: Academic timeline displaying Bachelor of Business Information Systems (BIS) at El Obour High Institutes, grade, and core subjects.
4. **Experience (`#experience`)**: Career cards highlighting Full-Stack / Backend development, Laravel engineering, and capstone project execution.
5. **Skills (`#skills`)**: Structured categories (Backend Development, Database Engineering, Frontend Core, Tools & Workflow) without fake percentages.
6. **Projects (`#projects`)**: Interactive project filter (All, Laravel, PHP, JavaScript, Full-Stack), card grid with tags and links, plus a rich "View Details" modal dialog.
7. **Achievements (`#achievements`)**: Grid of milestone cards celebrating tracks, certifications, and project deliveries.
8. **Testimonials (`#testimonials`)**: Pure Vanilla JS carousel with previous/next controls, pagination dots, autoplay with pause-on-hover, and touch swipe gestures.
9. **Services (`#services`)**: 6 cards detailing backend, Laravel, REST APIs, database design, web engineering, and API integration.
10. **Get In Touch (`#contact`)**: Direct contact channel cards (WhatsApp, Email, GitHub, LinkedIn) plus a validated contact form with client-side error states and simulated submission feedback.
11. **Footer**: Brand summary, quick navigation links, technology highlights, copyright, and smooth Back-to-Top button.

---

## ✏️ Customization & Personalization Guide

All personal info and links are clearly tagged with HTML comments for rapid customization:

* **Name & Headline**: Search `index.html` for `<!-- EDIT: Your Name -->` and `<!-- EDIT: Professional Title -->`.
* **Profile Picture**: Place your real portrait at `assets/images/profile.jpg`. The `<img>` tag automatically uses it, and gracefully falls back to the clean SVG avatar if not present.
* **Social & Contact Links**:
  - `<!-- EDIT: WhatsApp Number -->` → update `https://wa.me/YOUR_NUMBER`
  - `<!-- EDIT: Your Email -->` → `mailto:alsirafy123@gmail.com`
  - `<!-- EDIT: GitHub URL -->` → `https://github.com/Mahmoud-Alsirafy`
  - `<!-- EDIT: LinkedIn URL -->` → update `https://linkedin.com/in/YOUR_USERNAME`
* **Stats Counters**: In `#about`, change the `data-count="10"` attributes to update the numbers.
* **Projects & Modal Content**: Edit cards in `index.html` and the corresponding detailed metadata in `projectsData` inside `js/scripts.js`.

---

## 🔮 Future Development (Laravel Expansion Roadmap)

This clean frontend architecture is structured to seamlessly migrate into a full-stack **Laravel application**:

1. **Blade Templating**:
   - Extract `index.html` into reusable Blade components:
     - `resources/views/layouts/app.blade.php`
     - `resources/views/partials/hero.blade.php`
     - `resources/views/partials/projects.blade.php`
     - `resources/views/partials/contact.blade.php`
2. **Database & Eloquent Models**:
   - Create migrations and Eloquent models for:
     - `Project` (title, slug, description, image, category, github_url, demo_url, features_json)
     - `Skill` (name, category, proficiency)
     - `Testimonial` (author, role, content, avatar)
     - `ContactMessage` (name, email, subject, message, is_read)
3. **Admin Dashboard / CMS**:
   - Integrate Laravel Filament or custom dashboard to easily create, edit, and reorder projects and testimonials.
4. **Backend Contact Form Processing**:
   - Create a dedicated controller `ContactController::submit(ContactRequest $request)`.
   - Validate inputs on server-side, store messages in MySQL, and trigger asynchronous email notifications via Laravel Queues.
5. **RESTful API**:
   - Expose endpoints (`/api/v1/projects`, `/api/v1/skills`) allowing future mobile apps or third-party portfolio consumers to access portfolio data.

---

## 📜 License

Available for personal and professional use.
All rights reserved © 2026 **Mahmoud Wael**.

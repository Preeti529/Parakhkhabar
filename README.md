# परख खबर (Parakh Khabar) – Hindi News Portal

A professional Hindi news web portal recreated with high visual fidelity inspired by [Parakh Khabar](https://parakhkhabar.com/). Built using React, Vite, Tailwind CSS, Lucide React, and Schema.org JSON-LD.

---

## 📌 Project Overview

- **Brand:** परख खबर (Parakh Khabar)
- **Tagline:** निष्पक्ष, प्रामाणिक और तेज समाचार
- **Coverage:** उत्तर प्रदेश (बलिया, लखनऊ, वाराणसी, कानपुर, आदि), उत्तराखंड, भारत, विदेश, खेल, मनोरंजन, व्यापार, टेक्नोलॉजी, राशिफल
- **Design Philosophy:** Real Indian Hindi newspaper layout inspired by Dainik Bhaskar and Parakh Khabar, featuring clean typography, clear visual hierarchy, authentic red `#e01b24` branding, and rich Devanagari styling.

---

## 🛠️ Technology Stack

- **Frontend Framework:** React 18 + Vite
- **Styling:** Tailwind CSS (Custom Newspaper theme & fonts)
- **Icons:** Lucide React (no emojis used for UI controls)
- **Routing:** React Router v6
- **Structured Data & SEO:** Schema.org JSON-LD (`NewsArticle`, `NewsMediaOrganization`, `WebSite`, `BreadcrumbList`)
- **Data Source:** Centralized structured JSON (`news.json`, `categories.json`, `navigation.json`)

---

## 📂 Project Structure

```
ParakhKhabar/
│
├── assets/                       # Centralized Static Assets
│   ├── images/
│   │   ├── news/                 # News article photography
│   │   ├── banners/              # Ad and e-paper banners
│   │   └── thumbnails/           # Small format thumbnails
│   ├── logos/                    # Authentic Parakh Khabar logo
│   ├── icons/
│   ├── fonts/
│   └── data/                     # Centralized News & Taxonomy Data
│       ├── news.json             # 24+ structured news items with full content
│       ├── categories.json       # Hindi categories and regional districts
│       └── navigation.json       # Top bar, navbar & policy link mappings
│
├── public/                       # Public web assets (logo, favicon)
│   ├── logo.png
│   └── images/
│
├── src/
│   ├── components/               # Modular, reusable React components
│   │   ├── TopBar.jsx            # Top bar with logo, date, search trigger
│   │   ├── Navbar.jsx            # Primary red navbar with district dropdowns
│   │   ├── BreakingNews.jsx      # Animated breaking news ticker
│   │   ├── FeaturedNews.jsx      # bhaskar_hero lead story layout
│   │   ├── NewsCard.jsx          # Newspaper card with thumbnail & byline
│   │   ├── CategorySection.jsx   # bhaskar_nohero category blocks
│   │   ├── Sidebar.jsx           # E-Paper, Ads, Trending, Horoscope & Social
│   │   ├── SearchBar.jsx         # Search modal with instant keywords
│   │   ├── MobileMenu.jsx        # Slide-over responsive drawer
│   │   ├── ShareModal.jsx        # WhatsApp, Facebook, X, Copy link
│   │   ├── Breadcrumbs.jsx       # SEO breadcrumbs with Schema.org
│   │   └── Footer.jsx            # Newspaper footer with mandatory policies
│   │
│   ├── pages/
│   │   ├── Home.jsx              # Homepage with hero, category grids & sidebar
│   │   ├── Category.jsx          # Category & district filtered news
│   │   ├── Article.jsx           # Full article reading view with related news
│   │   ├── SearchResults.jsx     # Keyword search with result counts
│   │   ├── PolicyPage.jsx        # Ownership, Ethics, Fact-Check, GDPR policies
│   │   └── NotFound.jsx          # Custom 404 page in Hindi
│   │
│   ├── layouts/
│   │   └── MainLayout.jsx        # Master layout wrapper
│   │
│   ├── services/
│   │   └── newsService.js        # Data query & filtering service
│   │
│   ├── utils/
│   │   ├── seo.js                # Dynamic Meta & JSON-LD generator
│   │   └── date.js               # Hindi calendar date formatter
│   │
│   ├── styles/
│   │   └── index.css             # Tailwind base & custom newspaper styles
│   │
│   ├── App.jsx                   # React Router route definitions
│   └── main.jsx                  # Application entry point
│
├── index.html                    # SEO optimized HTML with OpenGraph
├── vite.config.js                # Vite build configuration with aliases
├── tailwind.config.js            # Custom color palette & font configuration
├── postcss.config.js
└── package.json
```

---

## 🚀 How to Run the Project in VS Code

1. Open **VS Code**.
2. Open the project folder located at:
   ```
   D:\ParakhKhabar
   ```
3. Open a terminal inside VS Code (`Ctrl + ~` or `Terminal -> New Terminal`).
4. Dependencies are already installed. If needed, install dependencies:
   ```bash
   npm install
   ```
5. Start the local development server:
   ```bash
   npm run dev
   ```
6. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

---

## 🔍 Key Features Implemented

1. **High Visual Fidelity:** Colors (`#e01b24` brand red, `#6322cf` purple accent, `#212529` headings), newspaper grid alignment, and typography (`Mukta`, `Noto Sans Devanagari`).
2. **Authentic Parakh Khabar Branding:** Clean header with logo, current date in Hindi, and navigation bar with comprehensive district dropdowns for Uttar Pradesh and Uttarakhand.
3. **Breaking News Ticker:** Interactive headline ticker with prev/next navigation.
4. **Lead Featured Article (`bhaskar_hero`):** Large lead visual with 16:9 aspect ratio, bold headline, author byline, and supporting sub-cards.
5. **Category Sections (`bhaskar_nohero`):** Dedicated blocks for उत्तर प्रदेश, भारत, विदेश, उत्तराखंड, मनोरंजन, and बिजनेस.
6. **Sidebar Features:**
   - Digital E-Paper promotional card
   - Standard 300x250 advertisement placeholder
   - Top Trending News list with ranked indices
   - Daily Horoscope (आज का राशिफल) widget
   - Social media connect buttons
7. **Article Detail Pages:** Dynamic routing (`/news/:slug`) with rich Hindi article content, related news, tags, view count, and editorial notes.
8. **Real-time Search:** Search modal + dedicated search results page (`/search?q=...`).
9. **Category & District Filtering:** Instant filtering for UP and Uttarakhand districts (e.g. बलिया, लखनऊ, वाराणसी, देहरादून, आदि).
10. **Schema.org Structured Data:** Valid JSON-LD for `NewsMediaOrganization`, `WebSite`, `NewsArticle`, and `BreadcrumbList`.
11. **Mandatory Compliance Pages:** Ownership and Funding, Ethics Policy, Fact Checking Policy, GDPR, Disclaimer, Privacy Policy, Terms and Conditions, About Us, Contact Us.
12. **Full Responsiveness:** Optimized for desktops, tablets, and smartphones with mobile drawer navigation.

---

## 📄 License & Attribution

Recreated for educational and development purposes inspired by [Parakh Khabar](https://parakhkhabar.com/).

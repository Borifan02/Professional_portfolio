# Professional Portfolio

Personal portfolio website rebuilt with React, Vite, and Tailwind CSS.

## Overview

This project showcases professional experience, technical skills, featured work, certifications, and contact channels in a single-page layout.

The current implementation includes interactive behaviors restored from the previous version:

- Theme toggle with persistence
- Preloader screen
- Particle background
- Custom cursor and follower effect
- Reveal-on-scroll animations
- Google Apps Script submission for contact and newsletter forms

## Tech Stack

- React 18
- Vite 5
- Tailwind CSS 3
- Boxicons

## Project Structure

```text
Professional_portfolio/
├── index.html
├── package.json
├── src/
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── assets/
├── image/
└── README.md
```

## Run Locally

1. Install dependencies.

```bash
npm install
```

2. Start the development server.

```bash
npm start
```

Alternative development command:

```bash
npm run dev
```

3. Build for production.

```bash
npm run build
```

4. Preview the production build.

```bash
npm run preview
```

## Forms Integration

Both forms currently submit to a Google Apps Script endpoint configured inside the React app.

- Contact form status message id: `msg`
- Newsletter status message id: `newsletter-msg`

If you want to switch the endpoint, update `scriptURL` in `src/App.jsx`.

## Content Sections

- Home
- About
- Skills
- Professional Journey
- Services
- Projects
- Blog
- Certifications
- Professional Strengths
- Newsletter
- Contact

## Author

Borifan Dabasa

- GitHub: https://github.com/Borifan02
- LinkedIn: http://www.linkedin.com/in/borifan-dabasa-a5191036b
- Email: dabasaborifan@gmail.com

## License

Licensed under the MIT License. See `LICENSE`.

# JSON/XML Formatter

Modern, lightweight JSON/XML formatter built with React + TypeScript + Vite using plain CSS (no external UI libs). Supports dark/light themes, keyboard shortcuts, copy to clipboard, error handling, and performance/status info.

## Features

- JSON and XML tabs with keyboard switching (Ctrl+1/Ctrl+2)
- One textarea for input/output with monospace font
- Actions: Format, Minify, Copy, Clear
- Inline error alerts for parse/format errors
- Copy toast (auto hides)
- Character and line counters
- Status strip: current tab, last action time, render time (ms)
- Dark/light themes with system default and manual toggle (persisted)
- Accessible focus states, AA contrast

## Keyboard Shortcuts

- Ctrl/Cmd + Enter → Format
- Ctrl/Cmd + Shift + Enter → Minify
- Ctrl/Cmd + L → Clear (prevents default)
- Ctrl/Cmd + C (when textarea focused) → Copy
- Ctrl + 1 → JSON tab
- Ctrl + 2 → XML tab

## Development

Install dependencies and run the dev server:

```bash
npm i
npm run dev
```

## Build

```bash
npm run build
```

The output is generated in `dist/`.

## Deploy

Vercel auto-detects Vite projects:

- Build Command: `npm run build`
- Output Directory: `dist/`


This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      ...tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      ...tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      ...tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

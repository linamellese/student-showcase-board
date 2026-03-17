# Student Project Showcase Board

A modern web platform where students can publish, showcase, and discover academic/personal projects. Features a clean card-based layout with filtering, search, and project details.

## Features

- Project Submission: Students can add projects with title, description, tech stack, GitHub link, live demo URL
- Project Cards: Beautiful cards displaying project info, tech badges, and preview images
- Filtering & Search: Filter by technology, search by keywords
- Project Details: Click cards to view full project info, screenshots, and links
- Responsive Design: Works on desktop, tablet, and mobile

## Technologies

- Frontend: React + Vite, CSS Modules
- Backend: Node.js + Express, MySQL
- Additional: Axios for API calls

## Getting Started

### Frontend

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

### Backend

1. Navigate to backend directory:

   ```bash
   cd backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up MySQL database and update connection in server.js

4. Start the server:
   ```bash
   npm start
   ```

## Project Structure

- `src/components/`: React components
- `src/types.ts`: TypeScript interfaces
- `src/data.ts`: Mock data
- `backend/`: Node.js Express server
  {
  files: ['**/*.{js,jsx}'],
  extends: [
  // Other configs...

           // Remove tseslint.configs.recommended and replace with this
           tseslint.configs.recommendedTypeChecked,
           // Alternatively, use this for stricter rules
           tseslint.configs.strictTypeChecked,
           // Optionally, add this for stylistic rules
           tseslint.configs.stylisticTypeChecked,

           // Other configs...
         ],
         languageOptions: {
           ecmaVersion: 2020,
           globals: globals.browser,
           parserOptions: {
             ecmaVersion: 'latest',
             sourceType: 'module',
             ecmaFeatures: {
               jsx: true,
             },
           },
         },

   },
   ])

````

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
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
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
  },
])
````

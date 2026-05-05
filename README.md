# Persistly

## 💻 About Us
We are students of class 11⁰⁴ at Akps, passionate about learning and building modern websites. As part of our journey in technology, we created this Task Manager Website to help users stay organized and productive.

This project reflects our growing skills in web development using technologies like React, TypeScript, and Tailwind CSS, along with a real database system. Through this website, we are learning how real-world systems are designed and built.

Our goal is not just to complete a project, but to gain practical experience, work as a team, and prepare ourselves for future opportunities in the tech world.

## 🚀 Features
- Add, update, and delete tasks
- Set categories, priorities, and optional deadlines
- Store tasks in Supabase for a real database backend
- Responsive UI built with Tailwind CSS and modern React patterns

## 🧰 Tech Stack
- React
- TypeScript
- Tailwind CSS
- Supabase
- Vite
- React Router
- TanStack React Query

## Getting Started
### 1. Install dependencies
```bash
npm install
```

### 2. Configure Supabase
Create a `.env` file in the project root with the following keys:
```env
VITE_SUPABASE_URL="https://your-project-id.supabase.co"
VITE_SUPABASE_PUBLISHABLE_KEY="your-anon-key"
VITE_SUPABASE_PROJECT_ID="your-project-id"
```

### 3. Create the database table
In your Supabase dashboard, run the SQL from `supabase/migrations/20260405093034_cd7be96d-72d8-48b3-99e4-be9e99545a1a.sql` to create the `tasks` table and policies.

### 4. Run the app
```bash
npm run dev
```
Open the app at `http://localhost:8080/`.

## Build for production
```bash
npm run build
```

## Preview the production build
```bash
npm run preview
```

## Testing and linting
```bash
npm run test
npm run lint
```

## Notes
- This app uses Supabase REST requests to save tasks.
- If you see network errors, verify your `.env` values and Supabase project settings.
- The app is designed for learning and can be extended with authentication and user management later.

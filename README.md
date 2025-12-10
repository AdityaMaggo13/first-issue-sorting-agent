# First Issue Sorting Agent

A minimal Next.js app for finding good first issues based on your skills, experience level, and interests.

## 🚀 Features

- Simple, user-friendly interface
- Form with three inputs:
  - **Skills**: Text input for your technical skills (e.g., React, JavaScript)
  - **Level**: Select between Beginner or Intermediate
  - **Interest**: Choose from Web, ML, or DevTools
- API endpoint that returns recommended issues
- Beautiful UI with Tailwind CSS
- TypeScript for type safety
- Ready for Vercel deployment

## 📁 Project Structure

```
first-issue-sorting-agent/
├── app/
│   ├── api/
│   │   └── recommend/
│   │       └── route.ts          # API endpoint for recommendations
│   ├── globals.css               # Global styles with Tailwind
│   ├── layout.tsx                # Root layout component
│   └── page.tsx                  # Main page with form UI
├── .gitignore                    # Git ignore file
├── next.config.js                # Next.js configuration
├── package.json                  # Dependencies and scripts
├── postcss.config.js             # PostCSS configuration
├── README.md                     # This file
├── tailwind.config.ts            # Tailwind CSS configuration
└── tsconfig.json                 # TypeScript configuration
```

## 🛠️ Setup Instructions

### Prerequisites

Before you start, make sure you have **Node.js** (version 18 or higher) installed on your computer.
You can download it from [nodejs.org](https://nodejs.org/)

### Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run the development server:**
   ```bash
   npm run dev
   ```

3. **Open your browser:**
   - Navigate to [http://localhost:3000](http://localhost:3000)
   - You should see the First Issue Finder interface!

## 📝 How to Use

1. Enter your skills in the text input (e.g., "React, JavaScript")
2. Select your experience level (Beginner or Intermediate)
3. Choose your area of interest (Web, ML, or DevTools)
4. Click "Find Issues" button
5. View the recommended issues that appear below the form

## 🧪 Testing the API

The API endpoint `/api/recommend` currently returns 2 hardcoded fake issues for testing purposes.

**Request format:**
```json
POST /api/recommend
{
  "skills": "React, JavaScript",
  "level": "Beginner",
  "interest": "Web"
}
```

**Response format:**
```json
{
  "issues": [
    {
      "title": "Add dark mode toggle to settings page",
      "repo": "awesome-web-app/frontend",
      "url": "https://github.com/example/repo/issues/123",
      "labels": ["good first issue", "frontend", "react", "beginner"]
    },
    {
      "title": "Fix responsive layout on mobile devices",
      "repo": "cool-project/ui-components",
      "url": "https://github.com/example/repo/issues/456",
      "labels": ["good first issue", "css", "bug", "web"]
    }
  ]
}
```

## 🚢 Deploying to Vercel

This app is ready for Vercel deployment!

### Option 1: Deploy via GitHub

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com/)
3. Click "New Project"
4. Import your GitHub repository
5. Vercel will auto-detect Next.js and configure everything
6. Click "Deploy"!

### Option 2: Deploy via Vercel CLI

```bash
npm install -g vercel
vercel
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## 📦 Technologies Used

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS framework
- **React 18** - UI library

## 🎯 Next Steps

To make this app production-ready, you could:

1. Replace hardcoded issues with real GitHub API integration
2. Add pagination for issue results
3. Implement filtering and sorting options
4. Add authentication for personalized recommendations
5. Store user preferences
6. Add more sophisticated matching algorithms

## 📄 License

This project is open source and available for learning purposes.

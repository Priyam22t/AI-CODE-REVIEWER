# 🚀 AI-Powered Code Reviewer

An advanced **AI-powered code analysis tool** that reviews source code for **quality, security, and performance issues** using large language models.  
Built with a modern **React + Monaco Editor frontend** and a **Node.js + Express backend**, this project demonstrates real-world AI integration for developer tooling

---

## ✨ Features

### 🔍 Intelligent Code Review
- AI-generated **detailed code reviews**
- Detects **bugs, bad practices, security risks, and performance bottlenecks**
- Supports multiple languages:
  - JavaScript
  - Python
  - Java
  - C++

### 📊 Code Quality Metrics
- **Code Quality Score (0–100)**
- **Security Risk Level** (Low / Medium / High)
- **Performance Rating** (Poor / Average / Good)

### 🛠 Auto-Fix Suggestions
- AI-generated improved version of the code
- **Apply Auto-Fix** directly to the editor with one click
- View **before vs after code diff**

### 🎨 Modern Frontend UI
- Monaco Editor (VS Code–like experience)
- Clean and responsive layout
- **Light / Dark theme toggle**
- Collapsible and readable review sections
- Visual score bar and badges

### 📄 Export & Utilities
- **Download AI review as PDF**
- Copy review text easily
- Developer-friendly interface

---

## 🧠 How It Works

1. User writes or pastes code into the Monaco Editor  
2. Selects the programming language  
3. Frontend sends code to backend API  
4. Backend forwards request to **OpenRouter AI models**  
5. AI analyzes the code and returns structured feedback  
6. Frontend displays score, security & performance insights, issues, suggestions, auto-fix, and diff view

---

## 🧰 Tech Stack

### Frontend
- React
- Monaco Editor
- Tailwind CSS
- React Markdown
- jsPDF
- Lucide Icons

### Backend
- Node.js
- Express.js
- OpenRouter API
- REST API architecture

---

## 📂 Project Structure

AI-Powered-Code-Reviewer/
│
├── frontend/
│   ├── src/
│   │   └── App.jsx
│   ├── package.json
│   └── vite.config.js
│
├── BackEnd/
│   ├── src/
│   │   ├── routes/
│   │   │   └── review.route.js
│   │   ├── services/
│   │   │   └── ai.service.js
│   │   └── app.js
│   ├── server.js
│   ├── .env
│   └── package.json
│
└── README.md

---

## ⚙️ Installation & Setup

### Clone the Repository
```bash
git clone https://github.com/your-username/ai-powered-code-reviewer.git
cd ai-powered-code-reviewer
```

### Backend Setup
```bash
cd BackEnd
npm install
```

Create a `.env` file:
```env
OPENROUTER_API_KEY=your_openrouter_api_key_here
PORT=3000
```

Start backend:
```bash
node server.js
```

Backend runs at:
```
http://localhost:3000
```

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

Frontend runs at:
```
http://localhost:5173
```

---

## 🧪 Example Use Cases
- Detect performance issues like large loops or memory leaks  
- Identify security vulnerabilities such as `eval` or unsafe patterns  
- Improve code quality and readability  
- Generate safer, cleaner versions of existing code  
- Demonstrate AI-assisted development in interviews or presentations  

---

## 📸 Demo Highlights
- Low-quality code → Low score, warnings, and auto-fix  
- High-quality code → High score and minimal suggestions  
- Before/after code comparison  
- PDF report generation  

---

## 🎯 Why This Project?

This project showcases practical AI integration, full-stack development skills, clean UI/UX design, scalable backend architecture, and modern developer tooling concepts.  
It is suitable for final-year projects, internship portfolios, hackathons, and AI & web development demos.

---

## 🚀 Future Enhancements
- User authentication & review history  
- Model selector (GPT / Claude / DeepSeek)  
- Inline AI comments in editor  
- Deployment to Vercel / Render  
- Team collaboration features  

---

## 📜 License
MIT License

---

## 🙌 Acknowledgements
- Monaco Editor  
- OpenRouter AI  
- Open-source community  

⭐ If you like this project, consider giving it a star on GitHub!

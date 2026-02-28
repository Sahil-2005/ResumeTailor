<div align="center">

# 🎯 Resume Tailor

<img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React"/>
<img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite"/>
<img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js"/>
<img src="https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express"/>
<img src="https://img.shields.io/badge/Expo-1B1F23?style=for-the-badge&logo=expo&logoColor=white" alt="Expo"/>

<br/><br/>

**🚀 Your AI-Powered Resume Coach**

*Align your resume with job descriptions and land your dream job!*

<br/>

[![Live Demo](https://img.shields.io/badge/🌐_Live_Demo-Visit_App-00C853?style=for-the-badge)](https://resumetailorapp.vercel.app/)

<br/>

[Features](#-features) • [Tech Stack](#️-tech-stack) • [Getting Started](#-getting-started) • [Contributing](#-contributing)

---

</div>

## 📖 About

**Resume Tailor** is a full-stack web and mobile application that helps job seekers optimize their resumes for specific job postings. Upload your **resume** and **job description**, and get **AI-powered insights** on how well your resume matches the role — complete with actionable suggestions to improve your chances!

<div align="center">

```
📄 Upload Resume  →  📝 Add Job Description  →  🔍 Get Analysis  →  ✨ Improve & Apply!
```

</div>

---

## ✨ Features

<table>
<tr>
<td width="50%">

### 📱 Core Features
- 📄 **Resume Upload** – PDF/DOC support
- 📝 **Job Description Input** – Paste or upload
- 🔍 **Match Analysis** – AI-powered comparison
- 📊 **Keyword Insights** – Find missing keywords
- 💡 **Smart Suggestions** – Tailored improvements

</td>
<td width="50%">

### ⚡ Technical Highlights
- 🌐 **Web App** – React + Vite (blazing fast!)
- 📲 **Mobile App** – Expo + React Native
- 🛠️ **Robust API** – Node.js & Express
- 🤖 **AI Integration** – Gemini-powered analysis
- 🔒 **Secure Auth** – JWT authentication

</td>
</tr>
</table>

---

## 🛠️ Tech Stack

<div align="center">

| Layer | Technologies |
|:---:|:---|
| **Frontend** | ![React](https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=react&logoColor=black) ![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white) ![TailwindCSS](https://img.shields.io/badge/Tailwind-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white) |
| **Mobile** | ![Expo](https://img.shields.io/badge/Expo-1B1F23?style=flat-square&logo=expo&logoColor=white) ![React Native](https://img.shields.io/badge/React_Native-20232A?style=flat-square&logo=react&logoColor=61DAFB) ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white) |
| **Backend** | ![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=nodedotjs&logoColor=white) ![Express](https://img.shields.io/badge/Express-000000?style=flat-square&logo=express&logoColor=white) |
| **AI/ML** | ![Google Gemini](https://img.shields.io/badge/Google%20Gemini-4285F4?style=flat-square&logo=google&logoColor=white) |

</div>

---

## 📂 Project Structure

```
Resume_Tailor/
├── 📁 client/                 # 🌐 React + Vite Web App
│   ├── src/
│   │   ├── components/        # Reusable UI components
│   │   ├── pages/             # Page components
│   │   └── utils/             # API utilities
│   └── ...
│
├── 📁 resumetailor-mobile/    # 📱 Expo Mobile App
│   ├── app/                   # App screens (Expo Router)
│   ├── components/            # Mobile UI components
│   ├── lib/                   # API & utilities
│   └── ...
│
├── 📁 server/                 # 🛠️ Node.js Backend
│   ├── controllers/           # Route handlers
│   ├── middleware/            # Auth & validation
│   ├── models/                # Database models
│   ├── routes/                # API routes
│   └── utils/                 # Helpers (Gemini, file parser)
│
└── 📄 README.md
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** v18+ 
- **npm** or **yarn**
- **Expo CLI** (for mobile app)

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/Sahil-2005/ResumeTailor.git
cd ResumeTailor
```

### 2️⃣ Install Dependencies

<details>
<summary><b>📦 Backend Setup</b></summary>

```bash
cd server
npm install
```

Create a `.env` file:
```env
PORT=5000
JWT_SECRET=your_secret_key
GEMINI_API_KEY=your_gemini_api_key
```

</details>

<details>
<summary><b>🌐 Frontend (Web) Setup</b></summary>

```bash
cd client
npm install
```

</details>

<details>
<summary><b>📱 Mobile App Setup</b></summary>

```bash
cd resumetailor-mobile
npm install
```

</details>

### 3️⃣ Run the Application

| Platform | Command | URL |
|:---:|:---|:---|
| 🛠️ **Backend** | `cd server && npm start` | `http://localhost:5000` |
| 🌐 **Web** | `cd client && npm run dev` | `http://localhost:5173` |
| 📱 **Mobile** | `cd resumetailor-mobile && npx expo start` | Expo Go App |

---

## 📈 Roadmap

<div align="center">

| Status | Feature |
|:---:|:---|
| ✅ | Resume upload & parsing |
| ✅ | Job description analysis |
| ✅ | AI-powered matching |
| 🔄 | Resume scoring system |
| 📋 | Multi-job comparison |
| 📋 | Export improved resume |
| 📋 | Resume templates |

</div>

> **Legend:** ✅ Done • 🔄 In Progress • 📋 Planned

---

## 🤝 Contributing

Contributions are what make the open-source community amazing! Any contributions you make are **greatly appreciated**.

```bash
# 1. Fork the repository
# 2. Create your feature branch
git checkout -b feature/AmazingFeature

# 3. Commit your changes
git commit -m "Add some AmazingFeature"

# 4. Push to the branch
git push origin feature/AmazingFeature

# 5. Open a Pull Request 🎉
```

---

## 👨‍💻 Author

<div align="center">

**Sahil Gawade**

[![Portfolio](https://img.shields.io/badge/Portfolio-000000?style=for-the-badge&logo=About.me&logoColor=white)](https://sahil-gawade.vercel.app/)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/sahil-gawade-920a0a242/)
[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Sahil-2005)
[![Mail](https://img.shields.io/badge/Mail-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:gawadesahil.dev@gmail.com)

</div>

---

## 📜 License

Distributed under the **MIT License**. See `LICENSE` for more information.

---

<div align="center">

### ⭐ Star this repo if you find it helpful!

**Made with ❤️ by [Sahil Gawade](https://github.com/Sahil-2005)**

</div>

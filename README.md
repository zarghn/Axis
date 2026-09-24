# 🅰️ AXIS

**A Project & Task Management Dashboard | My First React Project ⚛️**

---

## 📖 About

Axis is a personal dashboard for managing projects, tasks, and time, built with **React** and **Tailwind CSS**.

This is my first serious project with React — no course, no tutorial, I just jumped straight into writing code and learned as I went. Plenty of bugs, plenty of debugging, and I finally landed on something I'm proud of 🎉


<img width="1422" height="900" alt="desktop (6) (1)" src="https://github.com/user-attachments/assets/90f2d0d3-6546-49db-8335-e36bcccf1dea" />
https://www.figma.com/design/8QkJgJJFzWFQ8AWYl9S1C8/AXIS?t=Tg3lPiKSKVfWwwEp-0
## ✨ Features

- 🔐 **Login system** — simple authentication to access the dashboard
- 📁 **Project management** — create, edit, and delete projects with dates and descriptions
- ✅ **Task management** — each project has its own task list with three statuses: `NOT STARTED` / `IN PROCESS` / `DONE`
- ⏱️ **Time Tracker** — a circular timer to track focused work time per task
- 📊 **Overall Progress chart** — visualizes work time across the days of the week
- 📅 **Calendar** — displays the current month with navigation between months
- 📈 **Status bar** — shows the overall percentage of done, in-process, and not-started tasks
- 💾 **Local persistence (localStorage)** — data is saved in the browser

## 🛠️ Tech Stack

- **React** (with Hooks — `useState`, `useEffect`, `useContext`, `useRef`)
- **Tailwind CSS** for styling
- **Context API** for authentication state management
- **localStorage** for data persistence

## 📂 Project Structure

```
src/
├── assets/           # images and icons
├── components/
│   └── dashboard/
│       ├── Header.jsx
│       ├── UserProfile.jsx
│       ├── OverallProgress.jsx
│       ├── CalendarCard.jsx
│       ├── TimeTracker.jsx
│       ├── StatusAll.jsx
│       ├── StatusTabs.jsx
│       ├── ProjectList/
│       │   ├── ProjectList.jsx
│       │   ├── ProjectItem.jsx
│       │   ├── ProjectTitle.jsx
│       │   └── AddProject.jsx
│       └── TaskList.jsx
│           └── TaskItem.jsx
├── context/
│   └── AuthContext.jsx
├── pages/
│   ├── LoginPage.jsx
│   └── DashboardPage.jsx
├── App.jsx
└── main.jsx
```

## 🚀 Getting Started

```bash
# clone the repo
git clone https://github.com/username/axis.git
cd axis

# install dependencies
npm install

# run the dev server
npm run dev
```

The app will be available at `http://localhost:5173` (or a similar port).

## 🔑 Logging In

Authentication is currently simplified — user credentials are hardcoded in the app (for demo/testing purposes only).

## 🧠 What I Learned

- Working with **nested components** and passing props between them
- Managing **shared state** across multiple components
- Using the **Context API** to avoid prop drilling
- Using **localStorage** to persist data across page reloads
- Building a **responsive layout** with Tailwind (mobile to desktop)
- Debugging layout issues (grid/flex) and matching the UI to a Figma design

## 🔮 Next Steps

- [ ] Add a real backend (likely with Django REST Framework or FastAPI)
- [ ] Real authentication with JWT
- [ ] A database for persistent project and task storage
- [ ] Multi-user support

## 🙏 A Note

This project isn't perfect and is still a work in progress — but as my first React project, it's a big milestone for me. Feedback and suggestions are always welcome!

---

Built with ❤️ and a lot of tea ☕

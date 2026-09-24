# 🅰️ AXIS

A front-end project & task management dashboard, designed from a custom Figma layout and built while learning React from scratch.

This project was built as a learning project to practice React fundamentals, component composition, state management, Context API, and Tailwind CSS — no course, no tutorial, just jumping straight into code and learning along the way.

> 🎨 The UI is based on a custom Figma design and rebuilt pixel-by-pixel as a fully functional React app.

---

<br/>

## <h3 align="center">📱 Project Preview</h3>
<p align="center">
  <img width="90%" alt="Axis - dashboard preview" src="https://github.com/user-attachments/assets/90f2d0d3-6546-49db-8335-e36bcccf1dea" />
</p>

<p align="center">
  🎨 <a href="https://www.figma.com/design/8QkJgJJFzWFQ8AWYl9S1C8/AXIS?t=Tg3lPiKSKVfWwwEp-0">View the Figma design</a>
</p>

<br/>

---

## ✨ Features

### 📁 Project Management
- Create, edit, and delete projects with title, description, and date
- Custom calendar picker inside the add/edit project modal
- Search projects by title

### ✅ Task Management
- Each project has its own independent task list
- Three task statuses: `NOT STARTED` / `IN PROCESS` / `DONE`
- Inline task editing and deletion
- Click-to-cycle status toggle

### ⏱️ Time Tracker
- Circular animated timer to track focused work sessions
- Assign a task to the active timer session
- Start / pause / reset controls

### 📊 Overall Progress
- Weekly bar chart of tracked work time
- Highlights the current day
- Shows the difference in minutes compared to last week

### 📅 Calendar
- Displays the current month
- Navigate between months with arrow controls

### 📈 Status Overview
- Aggregated percentage bar of done / in-process / not-started tasks across all projects

### 🎨 Custom UI
- Fully custom design based on a Figma prototype
- Responsive layout (mobile → desktop)
- Built entirely with Tailwind CSS utility classes, no UI framework

---

## 🛠️ Tech Stack

- **React** — Hooks (`useState`, `useEffect`, `useContext`, `useRef`)
- **Tailwind CSS** — utility-first styling
- **Context API** — authentication state management
- **Browser Storage** — `localStorage` for data persistence
- **Figma** — source design reference

---

## 📁 Project Structure

```
src/
├── assets/                   # images and icons
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

---

## 🚀 Getting Started

This project has no backend yet, so it runs entirely on the front-end.

### 1. Clone the repository
```bash
git clone https://github.com/zarghn/Axis
```

### 2. Install dependencies
```bash
npm install
```

### 3. Run the dev server
```bash
npm run dev
```

The app will be available at `http://localhost:5173` (or a similar port).

---

## 🔑 Test Login

Authentication is currently simplified for demo purposes — use the credentials below to log in:

```
Username: Zahra
Password: 1234
```

> ⚠️ This is a hardcoded demo account only, not a real authentication system.

---

## ⚠️ Current Limitations

This is a **front-end-only** application.

- No backend or database — all data lives in the browser
- Data is stored only via `localStorage`, not synced across devices
- No real user accounts or authentication
- Login credentials are hardcoded for demo purposes only

---

## 🗺️ Roadmap

Future improvements I'd like to make:

- [ ] Add a real backend (Django REST Framework or FastAPI)
- [ ] Real authentication with JWT and hashed passwords
- [ ] A database for persistent project and task storage
- [ ] Multi-user support
- [ ] Notifications system
- [ ] Drag-and-drop task reordering

---

## 📚 What I Practiced

This project helped me practice and understand several React and front-end concepts, including:

- Component composition and prop passing between nested components
- Shared state management across sibling components
- The Context API to avoid prop drilling
- Persisting state with `localStorage`
- Building a fully responsive layout with Tailwind CSS
- Translating a Figma design into a real, working UI
- Debugging layout issues (grid/flex) to match a design spec

---

## 📄 License

This project is created for learning and educational purposes.

Feel free to explore the code and use it as inspiration for your own learning projects.

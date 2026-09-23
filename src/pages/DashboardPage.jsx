import React, { useEffect, useState } from "react";

import Header from "../components/dashboard/Header";
import UserProfile from "../components/dashboard/UserProfile";
import ProjectList from "../components/dashboard/ProjectList/ProjectList";
import TaskList from "../components/dashboard/TaskList";
import StatusAll from "../components/dashboard/statusAll";
import TimeTracker from "../components/dashboard/TimeTracker";
import OverallProgress from "../components/dashboard/OverallProgress";
import CalendarCard from "../components/dashboard/CalendarCard";

function DashboardPage() {
  const [activeProject, setActiveProject] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [projects, setProjects] = useState(() => {
    const savedProjects = localStorage.getItem("projects");
    return savedProjects ? JSON.parse(savedProjects) : [];
  });
  const [completedSessions, setCompletedSessions] = useState(() => {
    const savedSessions = localStorage.getItem("completedSessions");
    return savedSessions ? JSON.parse(savedSessions) : [];
  });
  const [selectedTaskId, setSelectedTaskId] = useState(null);

  useEffect(() => {
    localStorage.setItem("projects", JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem(
      "completedSessions",
      JSON.stringify(completedSessions)
    );
  }, [completedSessions]);

  return (
    <div className="min-h-screen bg-gradient-to-l from-[#FFE27A] via-[#FFF8D6] to-[#FFFDF3] pb-10 text-neutral-800 font-sans">
      {/* هدر بالای صفحه */}
      <div className="sticky top-0 z-50 backdrop-blur-md bg-transparent px-4 py-3">
        <div className="max-w-6xl mx-auto">
          <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 flex flex-col gap-5 mt-1">
        {/* عنوان و دکمه ساخت پروژه */}
        <div className="flex flex-row items-center justify-between gap-2">
          <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-neutral-900 tracking-tight">
            Welcome in, Zahra.
          </h1>

          <button
            type="button"
            onClick={() => {
              const event = new CustomEvent("openAddProjectModal");
              window.dispatchEvent(event);
            }}
            className="bg-[#FFE27A] hover:bg-[#ffd952] text-black text-[10px] sm:text-xs font-bold px-3 py-2 sm:px-5 sm:py-3 rounded-2xl shadow-xs transition-transform active:scale-95 tracking-wider uppercase shrink-0"
          >
            ADD NEW PROJECT
          </button>
        </div>

        {/* نوار وضعیت فیلترها (StatusAll) - با قابلیت اسکرول افقی در موبایل برای حفظ یک خط بودن */}
        <div className="w-full overflow-x-auto no-scrollbar">
          <StatusAll projects={projects} />
        </div>

        {/* چیدمان کارت‌ها: در دسکتاپ 4 ستونه، در موبایل تک ستونه با ترتیب دقیق تصویر */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 items-start">
          
          {/* ۱. کارت تصویر پروفایل */}
          <div className="w-full order-1">
            <UserProfile />
          </div>

          {/* ۲. کارت پیشرفت کلی (Overall Progress) */}
          <div className="w-full order-2 lg:order-2">
            <OverallProgress completedSessions={completedSessions} />
          </div>

          {/* ۳. لیست پروژه‌ها (Team Projects) */}
          <div className="w-full order-3 lg:order-3">
            <ProjectList
              projects={projects}
              setProjects={setProjects}
              activeProject={activeProject}
              setActiveProject={setActiveProject}
              searchTerm={searchTerm}
            />
          </div>

          {/* ۴. تایمر تمرکز (TimeTracker) */}
          <div className="w-full order-4 lg:order-4">
            <TimeTracker
              completedSessions={completedSessions}
              setCompletedSessions={setCompletedSessions}
              selectedTaskId={selectedTaskId}
              setSelectedTaskId={setSelectedTaskId}
              projects={projects}
            />
          </div>

          {/* ۵. تقویم (Calendar) */}
          <div className="w-full order-5 lg:order-5">
            <CalendarCard />
          </div>

          {/* ۶. لیست تسک‌ها (TaskList) */}
          <div className="w-full order-6 lg:order-6">
            <TaskList
              activeProject={activeProject}
              projects={projects}
              setProjects={setProjects}
              selectedTaskId={selectedTaskId}
              setSelectedTaskId={setSelectedTaskId}
            />
          </div>

        </div>

        {/* متن فوتر پایین صفحه - فقط در موبایل */}
        <div className="text-center text-xs font-serif text-neutral-600 mt-6 md:hidden">
          well done ! have a good day :)
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
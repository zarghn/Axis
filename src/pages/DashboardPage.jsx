import React, { useEffect, useState } from "react";
import Header from "../components/dashboard/Header";
import UserProfile from "../components/dashboard/UserProfile";
import ProjectList from "../components/dashboard/ProjectList/ProjectList";
import TaskList from "../components/dashboard/TaskList";
import StatusAll from "../components/dashboard/statusAll";
import TimeTracker from "../components/dashboard/TimeTracker";
import OverallProgress from "../components/dashboard/OverallProgress";
import CalendarCard from "../components/dashboard/CalendarCard";
import Background from "../components/dashboard/Background";
import bgImage from "../assets/images/bg.png";

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
      JSON.stringify(completedSessions),
    );
  }, [completedSessions]);

  return (
    <div
      className="relative min-h-screen lg:h-screen w-full text-neutral-800 font-sans lg:overflow-hidden overflow-y-auto bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <Background />
      <div className="relative z-10 h-full flex flex-col justify-between p-4 md:p-6 max-w-7xl mx-auto overflow-hidden">
        <div className="w-full shrink-0">
          <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </div>

        {/* Title + Add Project  */}
        <div className="flex flex-row items-center justify-between my-2 shrink-0">
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

        {/* Status */}
        <div className="w-full shrink-0">
          <StatusAll projects={projects} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-stretch flex-1 overflow-hidden my-2">
          {/*  1 / User Profile + Progress */}
          <div className="flex flex-col gap-4 justify-between h-full overflow-hidden">
            <UserProfile />
            <OverallProgress completedSessions={completedSessions} />
          </div>

          {/* 2 / Team Projects */}
          <div className="flex flex-col gap-4 h-full overflow-y-auto pr-1">
            <ProjectList
              projects={projects}
              setProjects={setProjects}
              activeProject={activeProject}
              setActiveProject={setActiveProject}
              searchTerm={searchTerm}
            />
          </div>

          {/* 3 / Timer & Calendar */}
          <div className="flex flex-col gap-4 justify-between h-full overflow-hidden">
            <TimeTracker
              completedSessions={completedSessions}
              setCompletedSessions={setCompletedSessions}
              selectedTaskId={selectedTaskId}
              setSelectedTaskId={setSelectedTaskId}
              projects={projects}
            />
            <CalendarCard />
          </div>

          {/* 4 / Tasks List */}
          <div className="flex flex-col gap-4 h-full overflow-y-auto pr-1">
            <TaskList
              activeProject={activeProject}
              projects={projects}
              setProjects={setProjects}
              selectedTaskId={selectedTaskId}
              setSelectedTaskId={setSelectedTaskId}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-xs font-serif text-neutral-600 md:hidden shrink-0">
          well done ! have a good day :)
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;

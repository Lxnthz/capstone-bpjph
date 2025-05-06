import { NavLink, Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-[25%] bg-[#670075] text-white flex flex-col rounded-r-3xl py-10">
        <div className="p-4 text-center font-bold text-xl border-b border-white">
          My Website
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `block px-4 py-2 rounded hover:bg-white hover:text-black ${
                isActive ? "bg-white text-black" : ""
              }`
            }>
            Home
          </NavLink>
          <NavLink
            to="/statistics"
            className={({ isActive }) =>
              `block px-4 py-2 rounded hover:bg-white hover:text-black ${
                isActive ? "bg-white text-black" : ""
              }`
            }>
            Statistics
          </NavLink>
          <NavLink
            to="/geospatial"
            className={({ isActive }) =>
              `block px-4 py-2 rounded hover:bg-white hover:text-black ${
                isActive ? "bg-white text-black" : ""
              }`
            }>
            Geospatial Data
          </NavLink>
          <NavLink
            to="/infographics"
            className={({ isActive }) =>
              `block px-4 py-2 rounded hover:bg-white hover:text-black ${
                isActive ? "bg-white text-black" : ""
              }`
            }>
            Infographics
          </NavLink>
          <NavLink
            to="/prediction"
            className={({ isActive }) =>
              `block px-4 py-2 rounded hover:bg-white hover:text-black ${
                isActive ? "bg-white text-black" : ""
              }`
            }>
            Prediction Visualization
          </NavLink>
        </nav>
        <div className="p-4 text-center text-sm border-t border-white">
          © 2025 My Website
        </div>
      </aside>

      {/* Content Area */}
      <main className="flex-1 p-6 overflow-auto">
        <div className="h-full flex items-center justify-center">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

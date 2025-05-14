import { NavLink, Outlet } from "react-router-dom";
import { IconContext } from "react-icons";
import { TbMap2, TbCalendarStats, TbHome, TbInfoCircle, TbAlignBoxLeftTop   } from "react-icons/tb";
import BPJPHLogo from "../assets/bpjph-logo.png";

export default function MainLayout() {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-[25%] bg-[#670075] text-white flex flex-col rounded-r-3xl">
        <div className="p-4 text-center font-bold text-xl border-b border-white flex justify-center">
          <img src={BPJPHLogo} alt="Logo" className="" />
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <NavLink to="/" className={({ isActive }) => `block px-4 py-2 rounded hover:bg-white hover:text-black ${ isActive ? "bg-white text-black" : "" }`}>
            <IconContext.Provider value={{ className: "mr-2", size: "1.5em" }} >
              <p className="align-middle flex items-center"><TbHome className="mr-2" /> Beranda</p>
            </IconContext.Provider>
          </NavLink>
          <NavLink to="/statistics" className={({ isActive }) => `block px-4 py-2 rounded hover:bg-white hover:text-black ${ isActive ? "bg-white text-black" : "" }`}>
            <IconContext.Provider value={{ className: "mr-2", size: "1.5em" }} >
              <p className="align-middle flex items-center"><TbCalendarStats className="mr-2" /> Statistik</p>
            </IconContext.Provider>
          </NavLink>
          <NavLink to="/geospatial" className={({ isActive }) => `block px-4 py-2 items-center rounded hover:bg-white hover:text-black ${ isActive ? "bg-white text-black" : "" }`}>
            <IconContext.Provider value={{ className: "mr-2", size: "1.5em" }} >
              <p className="align-middle flex items-center"><TbMap2 className="mr-2" /> Sebaran Geografis</p>
            </IconContext.Provider>
          </NavLink>
          <NavLink to="/infographics" className={({ isActive }) => `block px-4 py-2 rounded hover:bg-white hover:text-black ${ isActive ? "bg-white text-black" : "" }`}>
            <IconContext.Provider value={{ className: "mr-2", size: "1.5em" }} >
              <p className="align-middle flex items-center"><TbInfoCircle className="mr-2" /> Infografis</p>
            </IconContext.Provider>
          </NavLink>
          <NavLink to="/prediction" className={({ isActive }) => `block px-4 py-2 rounded hover:bg-white hover:text-black ${ isActive ? "bg-white text-black" : "" }`}>
            <IconContext.Provider value={{ className: "mr-2", size: "1.5em" }} >
              <p className="align-middle flex items-center"><TbAlignBoxLeftTop className="mr-2" /> Visualisasi Prediksi</p>
            </IconContext.Provider>
          </NavLink>
        </nav>
        <div className="p-4 text-center text-sm border-t border-white flex flex-col justify-center items-center py-7">
          <p>© 2025 Badan Penyelenggara Jaminan Produk Halal</p>
          <p>In collaboration with IPB University</p>
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

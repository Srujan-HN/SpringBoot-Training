import { NavLink, useNavigate } from 'react-router-dom';
import { getUser, removeToken } from '../utils/auth';

export default function Navbar({ onUpload }) {
  const user = getUser();
  const navigate = useNavigate();
  const logout = () => { removeToken(); navigate('/login'); };

  return (
    <header className="bg-white/70 backdrop-blur-md fixed top-0 left-0 right-0 z-50 border-b border-[#e6e8ea]/60 shadow-sm">
      <div className="flex justify-between items-center w-full px-6 py-4 max-w-[1440px] mx-auto">
        <div className="flex items-center gap-8">
          <span className="font-extrabold text-[#002c53] tracking-tight text-2xl" style={{ fontFamily: 'Manrope, sans-serif' }}>
            StudyVault
          </span>
          <nav className="hidden md:flex items-center gap-6">
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                `text-sm font-semibold pb-1 transition-colors ${isActive ? 'text-[#002c53] border-b-2 border-[#002c53]' : 'text-[#43474f] hover:text-[#1a426e]'}`
              }
            >
              All Files
            </NavLink>
            {user?.role === 'TEACHER' && (
              <NavLink
                to="/my-files"
                className={({ isActive }) =>
                  `text-sm font-semibold pb-1 transition-colors ${isActive ? 'text-[#002c53] border-b-2 border-[#002c53]' : 'text-[#43474f] hover:text-[#1a426e]'}`
                }
              >
                My Files
              </NavLink>
            )}
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={logout}
            className="hidden sm:flex items-center gap-2 text-[#43474f] hover:text-[#002c53] transition-colors text-sm font-medium"
          >
            <span className="material-symbols-outlined">logout</span>
            <span>Logout</span>
          </button>
          <div className="w-9 h-9 rounded-full bg-[#1a426e] flex items-center justify-center text-white font-bold text-sm">
            {user?.email?.[0]?.toUpperCase() || 'U'}
          </div>
        </div>
      </div>

      {/* Mobile bottom nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-[#e6e8ea] flex justify-around items-center py-3 px-6 z-50">
        <NavLink to="/dashboard" className={({ isActive }) => `flex flex-col items-center gap-1 ${isActive ? 'text-[#002c53]' : 'text-[#737780]'}`}>
          <span className="material-symbols-outlined">folder_copy</span>
          <span className="text-[10px] font-bold">Files</span>
        </NavLink>
        {user?.role === 'TEACHER' && (
          <NavLink to="/my-files" className={({ isActive }) => `flex flex-col items-center gap-1 ${isActive ? 'text-[#002c53]' : 'text-[#737780]'}`}>
            <span className="material-symbols-outlined">person_pin</span>
            <span className="text-[10px] font-bold">Mine</span>
          </NavLink>
        )}
        {user?.role === 'TEACHER' && (
          <button onClick={onUpload} className="bg-[#002c53] text-white p-3 rounded-full -mt-8 shadow-lg border-4 border-[#f7f9fb]">
            <span className="material-symbols-outlined">add</span>
          </button>
        )}
        <button onClick={logout} className="flex flex-col items-center gap-1 text-[#737780]">
          <span className="material-symbols-outlined">logout</span>
          <span className="text-[10px] font-bold">Logout</span>
        </button>
      </nav>
    </header>
  );
}

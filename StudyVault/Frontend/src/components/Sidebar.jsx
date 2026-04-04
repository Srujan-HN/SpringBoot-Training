import { NavLink, useNavigate } from 'react-router-dom';
import { getUser, removeToken } from '../utils/auth';

export default function Sidebar({ onUpload }) {
  const user = getUser();
  const navigate = useNavigate();

  const logout = () => { removeToken(); navigate('/login'); };

  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-6 py-3 transition-colors font-medium text-sm ${
      isActive
        ? 'bg-white text-[#002c53] font-semibold rounded-r-xl'
        : 'text-[#43474f] hover:bg-[#f0f2f5]'
    }`;

  return (
    <aside className="hidden md:flex flex-col h-[calc(100vh-72px)] w-64 bg-white/50 backdrop-blur-sm sticky top-[72px] py-8 gap-4 border-r border-[#e6e8ea]/60">
      <div className="px-6 mb-6 flex items-center gap-3">
        <div className="w-12 h-12 rounded-full bg-[#1a426e] flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
          {user?.email?.[0]?.toUpperCase() || 'U'}
        </div>
        <div className="overflow-hidden">
          <p className="font-bold text-[#191c1e] text-sm truncate" style={{ fontFamily: 'Manrope, sans-serif' }}>
            {user?.role === 'TEACHER' ? 'Teacher' : 'Student'}
          </p>
          <p className="text-xs text-[#43474f] truncate">{user?.email}</p>
        </div>
      </div>

      <nav className="flex-1 space-y-1">
        <NavLink to="/dashboard" className={linkClass}>
          <span className="material-symbols-outlined">folder_copy</span>
          <span>All Files</span>
        </NavLink>
        {user?.role === 'TEACHER' && (
          <NavLink to="/my-files" className={linkClass}>
            <span className="material-symbols-outlined">person_pin</span>
            <span>My Files</span>
          </NavLink>
        )}
      </nav>

      {user?.role === 'TEACHER' && (
        <div className="px-6">
          <button
            onClick={onUpload}
            className="w-full bg-[#002c53] text-white py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-[#1a426e] transition-colors shadow-sm"
          >
            <span className="material-symbols-outlined">upload_file</span>
            Upload File
          </button>
        </div>
      )}

      <div className="mt-auto">
        <button
          onClick={logout}
          className="flex items-center gap-3 text-[#43474f] px-6 py-3 hover:bg-[#f0f2f5] transition-colors w-full text-sm font-medium"
        >
          <span className="material-symbols-outlined">logout</span>
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}

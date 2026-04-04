import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getMyFiles } from '../api/api';
import { getUser, isLoggedIn } from '../utils/auth';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import FileCard from '../components/FileCard';
import UploadModal from '../components/UploadModal';

export default function MyFiles() {
  const navigate = useNavigate();
  const user = getUser();
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showUpload, setShowUpload] = useState(false);
  const [editId, setEditId] = useState(null);
  const [toast, setToast] = useState({ msg: '', type: 'success' });

  useEffect(() => {
    if (!isLoggedIn()) { navigate('/login'); return; }
    fetchFiles();
  }, [navigate]);

  const fetchFiles = async () => {
    setLoading(true);
    try {
      const res = await getMyFiles();
      if (res.status === 403 || res.status === 401) { navigate('/login'); return; }
      setFiles(await res.json());
    } catch { showToast('Failed to load files', 'error'); }
    finally { setLoading(false); }
  };

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast({ msg: '', type: 'success' }), 3000);
  };

  const handleSuccess = (msg) => { setShowUpload(false); setEditId(null); showToast(msg); fetchFiles(); };
  const handleDeleted = (id) => { setFiles(prev => prev.filter(f => f.id !== id)); showToast('File deleted successfully'); };
  const handleEdit = (id) => { setEditId(id); setShowUpload(true); };

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(160deg, #f0f6ff 0%, #e8f4fb 40%, #f0fafa 70%, #f7f9fb 100%)' }}>
      <Navbar onUpload={() => { setEditId(null); setShowUpload(true); }} />

      <div className="flex pt-[64px]">
        <Sidebar onUpload={() => { setEditId(null); setShowUpload(true); }} />

        <main className="flex-1 p-6 md:p-10 pb-24 md:pb-10 max-w-7xl">

          {/* Hero header */}
          <div className="relative rounded-3xl overflow-hidden mb-8 p-8"
            style={{ background: 'linear-gradient(135deg, #003034 0%, #00484d 50%, #005f66 100%)' }}>
            <div style={{ position:'absolute', width:300, height:300, borderRadius:'50%', top:'-80px', right:'-60px', background:'radial-gradient(circle, rgba(122,213,221,0.2) 0%, transparent 70%)' }} />
            <div className="relative z-10 flex items-center justify-between flex-wrap gap-4">
              <div>
                <p className="text-teal-200/60 text-sm font-medium mb-1">Your uploads,</p>
                <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight" style={{ fontFamily: 'Manrope, sans-serif' }}>
                  My Files 📁
                </h1>
                <p className="text-teal-200/50 text-sm mt-2">{files.length} files uploaded by you</p>
              </div>
              <button onClick={() => { setEditId(null); setShowUpload(true); }}
                className="flex items-center gap-2 px-6 py-3 rounded-2xl font-bold text-sm shadow-xl hover:opacity-90 transition-all"
                style={{ background: 'rgba(255,255,255,0.15)', color: 'white', border: '1px solid rgba(255,255,255,0.2)' }}>
                <span className="material-symbols-outlined">upload_file</span>
                Upload New
              </button>
            </div>
          </div>

          {/* Section title */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-extrabold text-[#002c53]" style={{ fontFamily: 'Manrope, sans-serif' }}>Uploaded Files</h2>
            <span className="text-xs text-[#737780] font-medium bg-white px-3 py-1.5 rounded-full shadow-sm"
              style={{ border: '1px solid rgba(0,44,83,0.06)' }}>
              {files.length} total
            </span>
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-24 gap-4">
              <div className="w-16 h-16 rounded-3xl flex items-center justify-center animate-pulse"
                style={{ background: 'linear-gradient(135deg, #003034, #00484d)' }}>
                <span className="material-symbols-outlined text-white text-3xl">folder_open</span>
              </div>
              <p className="text-[#737780] font-medium">Loading your files...</p>
            </div>
          ) : files.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 gap-4">
              <div className="w-20 h-20 rounded-3xl flex items-center justify-center"
                style={{ background: 'rgba(0,48,52,0.06)' }}>
                <span className="material-symbols-outlined text-4xl text-[#c3c6d0]">drive_folder_upload</span>
              </div>
              <p className="text-[#43474f] font-bold text-lg">No uploads yet</p>
              <p className="text-[#737780] text-sm">Start by uploading your first file</p>
              <button onClick={() => setShowUpload(true)}
                className="mt-2 px-6 py-3 rounded-2xl font-bold text-sm text-white shadow-lg hover:opacity-90 transition-all"
                style={{ background: 'linear-gradient(135deg, #003034, #00484d)' }}>
                Upload First File
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {files.map(file => (
                <FileCard key={file.id} file={file} userEmail={user?.email} userRole={user?.role}
                  onEdit={handleEdit} onDeleted={handleDeleted} onError={(m) => showToast(m, 'error')} />
              ))}
            </div>
          )}
        </main>
      </div>

      {user?.role === 'TEACHER' && (
        <button onClick={() => { setEditId(null); setShowUpload(true); }}
          className="hidden lg:flex fixed bottom-8 right-8 h-14 w-14 rounded-full items-center justify-center shadow-2xl hover:scale-110 transition-transform z-40 group"
          style={{ background: 'linear-gradient(135deg, #003034, #00484d)' }}>
          <span className="material-symbols-outlined text-white text-3xl">add</span>
          <span className="absolute right-full mr-4 px-4 py-2 rounded-xl text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none"
            style={{ background: '#2d3133', color: '#eff1f3' }}>Upload New File</span>
        </button>
      )}

      {showUpload && <UploadModal editId={editId} onClose={() => { setShowUpload(false); setEditId(null); }} onSuccess={handleSuccess} />}

      {toast.msg && (
        <div className="fixed bottom-24 md:bottom-8 left-1/2 -translate-x-1/2 px-6 py-3 rounded-2xl text-sm font-bold shadow-2xl z-50 flex items-center gap-2"
          style={{ background: toast.type === 'error' ? '#ba1a1a' : 'linear-gradient(135deg, #003034, #00484d)', color: 'white' }}>
          <span className="material-symbols-outlined text-base">{toast.type === 'error' ? 'error' : 'check_circle'}</span>
          {toast.msg}
        </div>
      )}
    </div>
  );
}

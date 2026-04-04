import { useState, useCallback } from 'react';
import { deleteFile } from '../api/api';
import { getToken } from '../utils/auth';

const typeConfig = (type) => {
  if (!type) return { icon: 'description', label: 'File', color: '#6366f1', bg: 'rgba(99,102,241,0.1)' };
  if (type.includes('pdf')) return { icon: 'picture_as_pdf', label: 'PDF', color: '#ef4444', bg: 'rgba(239,68,68,0.1)' };
  if (type.includes('image')) return { icon: 'image', label: 'Image', color: '#10b981', bg: 'rgba(16,185,129,0.1)' };
  if (type.includes('zip') || type.includes('archive')) return { icon: 'folder_zip', label: 'Archive', color: '#f59e0b', bg: 'rgba(245,158,11,0.1)' };
  if (type.includes('sheet') || type.includes('excel') || type.includes('csv')) return { icon: 'table_chart', label: 'Spreadsheet', color: '#22c55e', bg: 'rgba(34,197,94,0.1)' };
  if (type.includes('video')) return { icon: 'video_file', label: 'Video', color: '#8b5cf6', bg: 'rgba(139,92,246,0.1)' };
  if (type.includes('word') || type.includes('document')) return { icon: 'article', label: 'Document', color: '#3b82f6', bg: 'rgba(59,130,246,0.1)' };
  return { icon: 'description', label: 'File', color: '#6366f1', bg: 'rgba(99,102,241,0.1)' };
};

const fetchWithAuth = async (url) => {
  const res = await fetch(url, { headers: { Authorization: `Bearer ${getToken()}` } });
  if (!res.ok) throw new Error('File not found or access denied');
  return res;
};

export default function FileCard({ file, userEmail, userRole, onEdit, onDeleted, onError }) {
  const isOwner = file.uploadedBy?.email === userEmail;
  const canEdit = userRole === 'TEACHER' && isOwner;
  const displayName = file.fileName?.replace(/^[a-f0-9-]{36}_/, '') || 'Unnamed File';
  const { icon, label, color, bg } = typeConfig(file.fileType);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const handleDownload = useCallback(async () => {
    try {
      const res = await fetchWithAuth(`/files/download/${file.id}`);
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url; a.download = displayName; a.click();
      URL.revokeObjectURL(url);
    } catch (e) { onError && onError(e.message); }
  }, [file.id, displayName, onError]);

  const handlePreview = useCallback(async () => {
    try {
      const res = await fetchWithAuth(`/files/preview/${file.id}`);
      const contentType = res.headers.get('Content-Type') || file.fileType || 'application/octet-stream';
      const blob = await res.blob();
      const url = URL.createObjectURL(new Blob([blob], { type: contentType }));
      window.open(url, '_blank');
    } catch (e) { onError && onError(e.message); }
  }, [file.id, file.fileType, onError]);

  const handleDelete = useCallback(async () => {
    const res = await deleteFile(file.id);
    if (res.ok) onDeleted(file.id);
    else onError && onError('Failed to delete file');
    setConfirmDelete(false);
  }, [file.id, onDeleted, onError]);

  return (
    <div className="group relative bg-white rounded-3xl overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
      style={{ boxShadow: '0 4px 24px rgba(0,44,83,0.08)', border: '1px solid rgba(0,44,83,0.06)' }}>

      {/* Top color bar */}
      <div className="h-1.5 w-full" style={{ background: `linear-gradient(90deg, ${color}, ${color}88)` }} />

      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-110"
              style={{ background: bg }}>
              <span className="material-symbols-outlined text-xl" style={{ color }}>{icon}</span>
            </div>
            <span className="text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wide"
              style={{ background: bg, color }}>{label}</span>
          </div>
        </div>

        {/* File name */}
        <h3 className="font-extrabold text-[#002c53] text-base leading-snug mb-4 line-clamp-2 group-hover:text-[#1a426e] transition-colors"
          style={{ fontFamily: 'Manrope, sans-serif' }}>
          {displayName}
        </h3>

        {/* Uploader */}
        <div className="flex items-center gap-2.5 mb-5 p-3 rounded-2xl" style={{ background: 'rgba(0,44,83,0.04)' }}>
          <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-extrabold flex-shrink-0"
            style={{ background: 'linear-gradient(135deg, #002c53, #003034)' }}>
            {file.uploadedBy?.name?.[0]?.toUpperCase() || '?'}
          </div>
          <div>
            <p className="text-[10px] text-[#737780] font-medium">Uploaded by</p>
            <p className="text-xs font-bold text-[#002c53]">{file.uploadedBy?.name || 'Unknown'}</p>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex gap-2">
          <button onClick={handlePreview}
            className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-2xl text-xs font-bold transition-all hover:shadow-md"
            style={{ background: 'rgba(0,44,83,0.06)', color: '#002c53' }}>
            <span className="material-symbols-outlined text-sm">visibility</span> Preview
          </button>
          <button onClick={handleDownload}
            className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-2xl text-xs font-bold text-white transition-all hover:shadow-md hover:opacity-90"
            style={{ background: 'linear-gradient(135deg, #002c53, #003034)' }}>
            <span className="material-symbols-outlined text-sm">download</span> Download
          </button>
        </div>

        {/* Edit/Delete */}
        {canEdit && (
          <div className="flex gap-2 mt-3 pt-3" style={{ borderTop: '1px solid rgba(0,44,83,0.06)' }}>
            <button onClick={() => onEdit(file.id)}
              className="flex-1 flex items-center justify-center gap-1 py-2 rounded-xl text-xs font-bold transition-all hover:bg-blue-50"
              style={{ color: '#1a426e' }}>
              <span className="material-symbols-outlined text-sm">edit</span> Edit
            </button>
            {confirmDelete ? (
              <div className="flex-1 flex items-center justify-center gap-1">
                <button onClick={handleDelete}
                  className="flex-1 py-2 rounded-xl text-xs font-bold transition-all bg-red-100"
                  style={{ color: '#ba1a1a' }}>Confirm</button>
                <button onClick={() => setConfirmDelete(false)}
                  className="flex-1 py-2 rounded-xl text-xs font-bold transition-all hover:bg-gray-100"
                  style={{ color: '#555' }}>Cancel</button>
              </div>
            ) : (
              <button onClick={() => setConfirmDelete(true)}
                className="flex-1 flex items-center justify-center gap-1 py-2 rounded-xl text-xs font-bold transition-all hover:bg-red-50"
                style={{ color: '#ba1a1a' }}>
                <span className="material-symbols-outlined text-sm">delete</span> Delete
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

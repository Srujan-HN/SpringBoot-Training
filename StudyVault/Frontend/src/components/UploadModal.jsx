import { useState, useCallback } from 'react';
import { uploadFile, updateFile } from '../api/api';

export default function UploadModal({ onClose, onSuccess, editId = null }) {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [dragging, setDragging] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) { setError('Please select a file'); return; }
    setLoading(true); setError('');
    try {
      const res = editId ? await updateFile(editId, file) : await uploadFile(file);
      const text = await res.text();
      if (!res.ok) { setError(text || 'Operation failed'); return; }
      onSuccess(text);
    } catch { setError('Server error.'); }
    finally { setLoading(false); }
  };

  const handleDrop = (e) => {
    e.preventDefault(); setDragging(false);
    const dropped = e.dataTransfer.files[0];
    if (dropped) setFile(dropped);
  };

  const formatSize = (bytes) => bytes < 1024 * 1024
    ? `${(bytes / 1024).toFixed(1)} KB`
    : `${(bytes / 1024 / 1024).toFixed(1)} MB`;

  const handleFileChange = useCallback(e => setFile(e.target.files[0]), []);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 px-4"
      style={{ background: 'rgba(0,13,26,0.7)', backdropFilter: 'blur(8px)' }}>
      <div className="w-full max-w-md rounded-3xl overflow-hidden shadow-2xl"
        style={{ background: 'linear-gradient(160deg, #001f3f, #002c53)', border: '1px solid rgba(255,255,255,0.1)' }}>

        {/* Header */}
        <div className="flex justify-between items-center px-8 pt-8 pb-6"
          style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #00848e, #005f66)' }}>
              <span className="material-symbols-outlined text-white text-lg">{editId ? 'edit' : 'upload_file'}</span>
            </div>
            <div>
              <h2 className="text-lg font-extrabold text-white" style={{ fontFamily: 'Manrope, sans-serif' }}>
                {editId ? 'Update File' : 'Upload File'}
              </h2>
              <p className="text-xs text-blue-200/40">Max file size: 5MB</p>
            </div>
          </div>
          <button onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-all">
            <span className="material-symbols-outlined text-lg">close</span>
          </button>
        </div>

        <div className="px-8 py-6">
          {error && (
            <div className="flex items-center gap-2 bg-red-500/15 border border-red-400/25 text-red-300 text-sm px-4 py-3 rounded-2xl mb-5">
              <span className="material-symbols-outlined text-base">error</span>{error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {/* Drop zone */}
            <div
              onClick={() => document.getElementById('fileInput').click()}
              onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
              onDragLeave={() => setDragging(false)}
              onDrop={handleDrop}
              className="rounded-3xl p-8 text-center cursor-pointer transition-all"
              style={{
                border: `2px dashed ${dragging ? 'rgba(122,213,221,0.8)' : file ? 'rgba(122,213,221,0.4)' : 'rgba(255,255,255,0.15)'}`,
                background: dragging ? 'rgba(122,213,221,0.08)' : file ? 'rgba(0,132,142,0.08)' : 'rgba(255,255,255,0.03)',
              }}>
              {file ? (
                <div className="flex flex-col items-center gap-3">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center"
                    style={{ background: 'rgba(0,132,142,0.2)' }}>
                    <span className="material-symbols-outlined text-3xl" style={{ color: '#7ad5dd' }}>check_circle</span>
                  </div>
                  <div>
                    <p className="text-white font-bold text-sm">{file.name}</p>
                    <p className="text-blue-200/40 text-xs mt-1">{formatSize(file.size)}</p>
                  </div>
                  <span className="text-xs text-blue-200/40">Click to change file</span>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-3">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center"
                    style={{ background: 'rgba(255,255,255,0.06)' }}>
                    <span className="material-symbols-outlined text-3xl text-white/30">cloud_upload</span>
                  </div>
                  <div>
                    <p className="text-white/70 font-semibold text-sm">Drop your file here</p>
                    <p className="text-blue-200/30 text-xs mt-1">or click to browse</p>
                  </div>
                </div>
              )}
            </div>
            <input id="fileInput" type="file" className="hidden" onChange={handleFileChange} />

            {/* Buttons */}
            <div className="flex gap-3">
              <button type="button" onClick={onClose}
                className="flex-1 py-3.5 rounded-2xl font-bold text-sm transition-all"
                style={{ background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.6)', border: '1px solid rgba(255,255,255,0.1)' }}>
                Cancel
              </button>
              <button type="submit" disabled={loading}
                className="flex-1 py-3.5 rounded-2xl font-bold text-sm text-white transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                style={{ background: 'linear-gradient(135deg, #00848e, #005f66)' }}>
                {loading
                  ? <><span className="material-symbols-outlined text-base animate-spin">progress_activity</span> Uploading...</>
                  : <><span className="material-symbols-outlined text-base">{editId ? 'save' : 'upload'}</span> {editId ? 'Update' : 'Upload'}</>}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../api/api';
import { saveToken } from '../utils/auth';

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); setError('');
    try {
      const res = await login(form);
      if (!res.ok) { setError('Invalid email or password'); return; }
      const data = await res.json();
      saveToken(data.token);
      navigate('/dashboard');
    } catch { setError('Server error. Make sure backend is running.'); }
    finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen flex relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #000d1a 0%, #001f3f 35%, #002c53 65%, #003034 100%)' }}>

      {/* Animated background orbs */}
      <style>{`
        @keyframes float { 0%,100%{transform:translateY(0) scale(1)} 50%{transform:translateY(-40px) scale(1.08)} }
        @keyframes pulse { 0%,100%{opacity:0.4} 50%{opacity:0.8} }
        @keyframes shimmer { 0%{background-position:200% center} 100%{background-position:-200% center} }
      `}</style>

      <div style={{ position:'absolute', width:700, height:700, borderRadius:'50%', top:'-200px', left:'-200px', animation:'float 10s ease-in-out infinite', background:'radial-gradient(circle, rgba(0,132,142,0.2) 0%, transparent 65%)' }} />
      <div style={{ position:'absolute', width:500, height:500, borderRadius:'50%', bottom:'-150px', right:'-100px', animation:'float 13s ease-in-out infinite reverse', background:'radial-gradient(circle, rgba(165,201,253,0.15) 0%, transparent 65%)' }} />
      <div style={{ position:'absolute', width:300, height:300, borderRadius:'50%', top:'50%', left:'60%', animation:'float 8s ease-in-out infinite', background:'radial-gradient(circle, rgba(122,213,221,0.1) 0%, transparent 65%)' }} />

      {/* Left branding panel */}
      <div className="hidden lg:flex flex-col justify-center px-16 w-1/2 relative z-10">
        <div className="flex items-center gap-3 mb-12">
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-2xl"
            style={{ background: 'linear-gradient(135deg, #00848e, #005f66)' }}>
            <span className="material-symbols-outlined text-white text-2xl">school</span>
          </div>
          <span className="text-3xl font-extrabold text-white" style={{ fontFamily: 'Manrope, sans-serif' }}>
            Study<span style={{ color: '#7ad5dd' }}>Vault</span>
          </span>
        </div>
        <h2 className="text-5xl font-extrabold text-white leading-tight mb-6" style={{ fontFamily: 'Manrope, sans-serif' }}>
          Your Academic<br /><span style={{ color: '#7ad5dd' }}>Repository</span>
        </h2>
        <p className="text-blue-200/60 text-lg leading-relaxed max-w-md">
          A unified platform for faculty and students to share, access and manage academic resources.
        </p>
        <div className="flex gap-6 mt-12">
          {[['folder_copy','Files Shared'],['group','Active Users'],['verified','Secure']].map(([icon, label]) => (
            <div key={label} className="flex flex-col items-center gap-2">
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)' }}>
                <span className="material-symbols-outlined text-[#7ad5dd]">{icon}</span>
              </div>
              <span className="text-xs text-blue-200/50 font-medium">{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Right form panel */}
      <div className="flex flex-1 items-center justify-center px-6 py-12 relative z-10">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="flex lg:hidden items-center justify-center gap-3 mb-10">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #00848e, #005f66)' }}>
              <span className="material-symbols-outlined text-white text-xl">school</span>
            </div>
            <span className="text-2xl font-extrabold text-white" style={{ fontFamily: 'Manrope, sans-serif' }}>
              Study<span style={{ color: '#7ad5dd' }}>Vault</span>
            </span>
          </div>

          <div className="rounded-3xl p-8 shadow-2xl" style={{ background: 'rgba(255,255,255,0.07)', backdropFilter: 'blur(24px)', border: '1px solid rgba(255,255,255,0.12)' }}>
            <div className="mb-8">
              <h1 className="text-2xl font-extrabold text-white mb-1" style={{ fontFamily: 'Manrope, sans-serif' }}>Welcome back 👋</h1>
              <p className="text-blue-200/50 text-sm">Sign in to continue to your dashboard</p>
            </div>

            {error && (
              <div className="flex items-center gap-2 bg-red-500/15 border border-red-400/25 text-red-300 text-sm px-4 py-3 rounded-2xl mb-6">
                <span className="material-symbols-outlined text-base">error</span>{error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div>
                <label className="text-xs font-bold text-blue-200/70 mb-2 block uppercase tracking-wider">Email Address</label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-white/30 text-lg">mail</span>
                  <input type="email" required value={form.email}
                    onChange={e => setForm({ ...form, email: e.target.value })}
                    className="w-full pl-11 pr-4 py-3.5 rounded-2xl text-white text-sm placeholder-white/25 focus:outline-none transition-all"
                    style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)' }}
                    placeholder="you@example.com" />
                </div>
              </div>
              <div>
                <label className="text-xs font-bold text-blue-200/70 mb-2 block uppercase tracking-wider">Password</label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-white/30 text-lg">lock</span>
                  <input type={showPassword ? 'text' : 'password'} required value={form.password}
                    onChange={e => setForm({ ...form, password: e.target.value })}
                    className="w-full pl-11 pr-12 py-3.5 rounded-2xl text-white text-sm placeholder-white/25 focus:outline-none transition-all"
                    style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)' }}
                    placeholder="••••••••" />
                  <button type="button" onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/70 transition-colors">
                    <span className="material-symbols-outlined text-lg">{showPassword ? 'visibility' : 'visibility_off'}</span>
                  </button>
                </div>
              </div>
              <button type="submit" disabled={loading}
                className="w-full py-4 rounded-2xl font-extrabold text-sm transition-all disabled:opacity-50 mt-1 flex items-center justify-center gap-2 shadow-xl"
                style={{ background: 'linear-gradient(135deg, #00848e, #005f66)', color: 'white' }}>
                {loading ? <><span className="material-symbols-outlined text-base animate-spin">progress_activity</span> Signing in...</> : <><span className="material-symbols-outlined text-base">login</span> Sign In</>}
              </button>
            </form>

            <div className="flex items-center gap-3 my-6">
              <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.1)' }} />
              <span className="text-xs text-white/30">or</span>
              <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.1)' }} />
            </div>

            <p className="text-center text-sm text-blue-200/40">
              New to StudyVault?{' '}
              <Link to="/register" className="text-[#7ad5dd] font-bold hover:text-white transition-colors">Create account →</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

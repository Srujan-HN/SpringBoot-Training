import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { register } from '../api/api';

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'STUDENT' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault(); setLoading(true); setError('');
    try {
      const res = await register(form);
      const text = await res.text();
      if (!res.ok) { setError(text || 'Registration failed'); return; }
      navigate('/login');
    } catch { setError('Server error. Make sure backend is running.'); }
    finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen flex relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #000d1a 0%, #001f3f 35%, #002c53 65%, #003034 100%)' }}>

      <style>{`
        @keyframes float { 0%,100%{transform:translateY(0) scale(1)} 50%{transform:translateY(-40px) scale(1.08)} }
      `}</style>

      <div style={{ position:'absolute', width:600, height:600, borderRadius:'50%', top:'-150px', right:'-150px', animation:'float 11s ease-in-out infinite', background:'radial-gradient(circle, rgba(0,132,142,0.18) 0%, transparent 65%)' }} />
      <div style={{ position:'absolute', width:500, height:500, borderRadius:'50%', bottom:'-100px', left:'-100px', animation:'float 9s ease-in-out infinite reverse', background:'radial-gradient(circle, rgba(165,201,253,0.12) 0%, transparent 65%)' }} />

      {/* Left branding */}
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
          Join the<br /><span style={{ color: '#7ad5dd' }}>Community</span>
        </h2>
        <p className="text-blue-200/60 text-lg leading-relaxed max-w-md">
          Register as a student to access resources, or as faculty to upload and manage academic materials.
        </p>
        <div className="mt-12 p-6 rounded-3xl" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}>
          <div className="flex items-center gap-3 mb-3">
            <span className="material-symbols-outlined text-[#7ad5dd]">verified_user</span>
            <span className="text-white font-bold text-sm">Secure & Private</span>
          </div>
          <p className="text-blue-200/40 text-xs leading-relaxed">Your data is protected with JWT authentication and encrypted passwords.</p>
        </div>
      </div>

      {/* Right form */}
      <div className="flex flex-1 items-center justify-center px-6 py-12 relative z-10">
        <div className="w-full max-w-md">
          <div className="flex lg:hidden items-center justify-center gap-3 mb-10">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #00848e, #005f66)' }}>
              <span className="material-symbols-outlined text-white text-xl">school</span>
            </div>
            <span className="text-2xl font-extrabold text-white" style={{ fontFamily: 'Manrope, sans-serif' }}>
              Study<span style={{ color: '#7ad5dd' }}>Vault</span>
            </span>
          </div>

          <div className="rounded-3xl p-8 shadow-2xl" style={{ background: 'rgba(255,255,255,0.07)', backdropFilter: 'blur(24px)', border: '1px solid rgba(255,255,255,0.12)' }}>
            <div className="mb-6">
              <h1 className="text-2xl font-extrabold text-white mb-1" style={{ fontFamily: 'Manrope, sans-serif' }}>Create account ✨</h1>
              <p className="text-blue-200/50 text-sm">Join the academic community today</p>
            </div>

            {error && (
              <div className="flex items-center gap-2 bg-red-500/15 border border-red-400/25 text-red-300 text-sm px-4 py-3 rounded-2xl mb-5">
                <span className="material-symbols-outlined text-base">error</span>{error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {/* Name */}
              <div>
                <label className="text-xs font-bold text-blue-200/70 mb-2 block uppercase tracking-wider">Full Name</label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-white/30 text-lg">person</span>
                  <input type="text" required value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                    className="w-full pl-11 pr-4 py-3.5 rounded-2xl text-white text-sm placeholder-white/25 focus:outline-none"
                    style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)' }}
                    placeholder="John Doe" />
                </div>
              </div>
              {/* Email */}
              <div>
                <label className="text-xs font-bold text-blue-200/70 mb-2 block uppercase tracking-wider">Email Address</label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-white/30 text-lg">mail</span>
                  <input type="email" required value={form.email}
                    onChange={e => setForm({ ...form, email: e.target.value })}
                    className="w-full pl-11 pr-4 py-3.5 rounded-2xl text-white text-sm placeholder-white/25 focus:outline-none"
                    style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)' }}
                    placeholder="you@example.com" />
                </div>
              </div>
              {/* Password */}
              <div>
                <label className="text-xs font-bold text-blue-200/70 mb-2 block uppercase tracking-wider">Password</label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-white/30 text-lg">lock</span>
                  <input type={showPassword ? 'text' : 'password'} required value={form.password}
                    onChange={e => setForm({ ...form, password: e.target.value })}
                    className="w-full pl-11 pr-12 py-3.5 rounded-2xl text-white text-sm placeholder-white/25 focus:outline-none"
                    style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)' }}
                    placeholder="••••••••" />
                  <button type="button" onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/70 transition-colors">
                    <span className="material-symbols-outlined text-lg">{showPassword ? 'visibility' : 'visibility_off'}</span>
                  </button>
                </div>
              </div>
              {/* Role */}
              <div>
                <label className="text-xs font-bold text-blue-200/70 mb-2 block uppercase tracking-wider">I am a...</label>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { value: 'STUDENT', label: '🎓 Student', desc: 'Browse & download' },
                    { value: 'TEACHER', label: '📚 Faculty', desc: 'Upload & manage' },
                  ].map(r => (
                    <button key={r.value} type="button" onClick={() => setForm({ ...form, role: r.value })}
                      className="relative p-4 rounded-2xl text-left transition-all duration-200"
                      style={{
                        background: form.role === r.value ? 'linear-gradient(135deg, rgba(0,132,142,0.3), rgba(0,44,83,0.3))' : 'rgba(255,255,255,0.05)',
                        border: form.role === r.value ? '2px solid rgba(122,213,221,0.6)' : '2px solid rgba(255,255,255,0.1)',
                        boxShadow: form.role === r.value ? '0 0 24px rgba(122,213,221,0.15)' : 'none'
                      }}>
                      {form.role === r.value && (
                        <span className="absolute top-2 right-2 w-5 h-5 rounded-full flex items-center justify-center text-[#002c53]"
                          style={{ background: '#7ad5dd' }}>
                          <span className="material-symbols-outlined text-xs">check</span>
                        </span>
                      )}
                      <p className="font-bold text-sm text-white mb-0.5">{r.label}</p>
                      <p className="text-[11px]" style={{ color: form.role === r.value ? 'rgba(122,213,221,0.8)' : 'rgba(255,255,255,0.3)' }}>{r.desc}</p>
                    </button>
                  ))}
                </div>
              </div>

              <button type="submit" disabled={loading}
                className="w-full py-4 rounded-2xl font-extrabold text-sm text-white transition-all disabled:opacity-50 mt-1 flex items-center justify-center gap-2 shadow-xl"
                style={{ background: 'linear-gradient(135deg, #00848e, #005f66)' }}>
                {loading ? <><span className="material-symbols-outlined text-base animate-spin">progress_activity</span> Creating...</> : <><span className="material-symbols-outlined text-base">person_add</span> Create Account</>}
              </button>
            </form>

            <div className="flex items-center gap-3 my-5">
              <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.1)' }} />
              <span className="text-xs text-white/30">or</span>
              <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.1)' }} />
            </div>

            <p className="text-center text-sm text-blue-200/40">
              Already have an account?{' '}
              <Link to="/login" className="text-[#7ad5dd] font-bold hover:text-white transition-colors">Sign in →</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

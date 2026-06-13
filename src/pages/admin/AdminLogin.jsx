import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShieldCheck, Lock, Fingerprint, Eye, EyeOff } from 'lucide-react';
import API_BASE_URL from '../../apiConfig.js';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });
      const data = await response.json();
      if (response.ok && data.success) {
        localStorage.setItem('adminLoggedIn', 'true');
        localStorage.setItem('adminUser', JSON.stringify(data.admin));
        navigate('/admin/dashboard');
      } else {
        setError(data.error || 'Invalid credentials. Access Denied.');
      }
    } catch (err) {
      console.error(err);
      setError('Error connecting to authentication server.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center relative overflow-hidden">
      {/* Security Scanning Effect Background */}
      <div 
        className="absolute inset-0 opacity-15 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(45deg, #0f172a 25%, transparent 25%), 
            linear-gradient(-45deg, #0f172a 25%, transparent 25%), 
            linear-gradient(45deg, transparent 75%, #0f172a 75%), 
            linear-gradient(-45deg, transparent 75%, #0f172a 75%)
          `,
          backgroundSize: '20px 20px',
          backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px'
        }}
      ></div>
      <motion.div
        animate={{ y: ["-100%", "200%"] }}
        transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
        className="absolute w-full h-1 bg-green-500/30 shadow-[0_0_20px_rgba(34,197,94,0.5)] pointer-events-none"
      ></motion.div>

      <div className="max-w-md w-full px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-3xl p-10 shadow-2xl shadow-green-900/20"
        >
          <div className="flex flex-col items-center mb-8">
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
              className="w-20 h-20 bg-slate-800 rounded-full flex items-center justify-center mb-4 relative"
            >
              <ShieldCheck className="w-10 h-10 text-green-500 z-10" />
              <div className="absolute inset-0 border-2 border-green-500/30 rounded-full animate-ping"></div>
            </motion.div>
            <h2 className="text-3xl font-poppins font-bold text-white tracking-widest uppercase">Admin Portal</h2>
            <p className="text-green-500/80 text-sm mt-2 font-mono flex items-center gap-2">
              <Lock className="w-3 h-3" /> Level 5 Clearance Required
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            {error && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-red-500/10 border border-red-500/50 text-red-500 p-3 rounded-xl text-sm text-center font-mono">
                {error}
              </motion.div>
            )}

            <div className="space-y-2">
              <label className="text-slate-400 text-xs font-mono uppercase tracking-wider">Authentication ID</label>
              <div className="relative">
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 text-white px-5 py-4 rounded-xl focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-all font-mono"
                  placeholder="Enter ID"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-slate-400 text-xs font-mono uppercase tracking-wider">Security Passcode</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 text-white px-5 py-4 rounded-xl focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-all font-mono"
                  placeholder="••••••••"
                  required
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-green-500">
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-500 text-white font-bold py-4 rounded-xl transition-all shadow-[0_0_15px_rgba(22,163,74,0.4)] hover:shadow-[0_0_25px_rgba(22,163,74,0.6)] flex items-center justify-center gap-3 font-mono tracking-wider uppercase mt-4 group"
            >
              <Fingerprint className="w-5 h-5 group-hover:scale-110 transition-transform" />
              Authorize Access
            </button>
          </form>

        </motion.div>
      </div>
    </div>
  );
};

export default AdminLogin;

'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';

export default function ContactForm() {
    const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
    const [status, setStatus] = useState({ loading: false, msg: '', success: null });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus({ loading: true, msg: '', success: null });

        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            
            const data = await res.json();
            if (res.ok) {
                setStatus({ loading: false, msg: ' Message sent successfully!', success: true });
                setFormData({ name: '', email: '', phone: '', message: '' });
            } else {
                throw new Error(data.message || 'Something went wrong');
            }
        } catch (err) {
            setStatus({ loading: false, msg: ` ${err.message}`, success: false });
        }
    };

    return (
        <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="w-full max-w-lg p-8 rounded-3xl bg-slate-900/80 backdrop-blur-md border border-slate-800 shadow-2xl"
        >
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-white tracking-tight">
                    Let's Build Something <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500">Great</span>
                </h2>
                <p className="text-slate-400 mt-2 text-sm">Have an idea? Drop us a message!</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                {['name', 'email', 'phone', 'message'].map((field) => (
                    <div key={field} className="relative">
                        {field !== 'message' ? (
                            <input
                                type={field === 'email' ? 'email' : field === 'phone' ? 'tel' : 'text'}
                                required
                                value={formData[field]}
                                onChange={(e) => setFormData({ ...formData, [field]: e.target.value })}
                                placeholder=" "
                                className="w-full px-4 py-4 bg-slate-950/60 border border-slate-800 rounded-xl outline-none text-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all peer"
                            />
                        ) : (
                            <textarea
                                required
                                rows="4"
                                value={formData[field]}
                                onChange={(e) => setFormData({ ...formData, [field]: e.target.value })}
                                placeholder=" "
                                className="w-full px-4 py-4 bg-slate-950/60 border border-slate-800 rounded-xl outline-none text-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all peer resize-none"
                            />
                        )}
                        <label className="absolute left-4 top-4 text-slate-500 pointer-events-none transition-all duration-300 peer-focus:-top-3 peer-focus:left-3 peer-focus:text-xs peer-focus:bg-slate-900 peer-focus:px-2 peer-focus:text-indigo-400 peer-[:not(:placeholder-shown)]:-top-3 peer-[:not(:placeholder-shown)]:left-3 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:bg-slate-900 peer-[:not(:placeholder-shown)]:px-2 capitalize">
                            {field === 'phone' ? 'Phone Number' : field === 'email' ? 'Email Address' : `Your ${field}`}
                        </label>
                    </div>
                ))}

                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={status.loading}
                    className="w-full py-4 font-semibold text-white rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 hover:opacity-90 transition-all shadow-lg shadow-indigo-500/20 disabled:opacity-50"
                >
                    {status.loading ? 'Sending...' : 'Send Message'}
                </motion.button>
            </form>

            {status.msg && (
                <p className={`mt-4 text-center text-sm font-semibold ${status.success ? 'text-emerald-400' : 'text-rose-500'}`}>
                    {status.msg}
                </p>
            )}
        </motion.div>
    );
}
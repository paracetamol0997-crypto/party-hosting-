'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Users,
  Search,
  Download,
  Trash2,
  RefreshCw,
  LogOut,
  Lock,
  Calendar,
  CheckCircle,
  Phone,
  Mail,
  ArrowLeft,
  AlertTriangle,
  IndianRupee,
} from 'lucide-react';
import { CrownDoodle } from '@/components/Doodles';

interface RegistrationItem {
  id: string;
  full_name: string;
  phone: string;
  email: string;
  number_of_people: number;
  message?: string;
  status: string;
  registered_at: string;
}

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState<string | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const [registrations, setRegistrations] = useState<RegistrationItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  // Check login on load
  useEffect(() => {
    fetchRegistrations();
  }, []);

  const fetchRegistrations = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/registrations');
      if (res.status === 401) {
        setIsAuthenticated(false);
        setLoading(false);
        return;
      }
      const json = await res.json();
      if (json.success) {
        setIsAuthenticated(true);
        setRegistrations(json.data.registrations || []);
      } else {
        setIsAuthenticated(false);
      }
    } catch {
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    setLoginError(null);

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      const json = await res.json();

      if (json.success) {
        setIsAuthenticated(true);
        setPassword('');
        fetchRegistrations();
      } else {
        setLoginError(json.error || 'Invalid admin password.');
      }
    } catch {
      setLoginError('Could not sign in. Try again.');
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' });
    setIsAuthenticated(false);
    setRegistrations([]);
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/admin/registrations?id=${id}`, {
        method: 'DELETE',
      });
      const json = await res.json();
      if (json.success) {
        setRegistrations((prev) => prev.filter((r) => r.id !== id));
        setDeleteConfirmId(null);
      } else {
        alert(json.error || 'Failed to delete registration');
      }
    } catch (e) {
      alert('Error deleting registration');
    }
  };

  const handleExportCSV = () => {
    if (registrations.length === 0) {
      alert('No registrations to export.');
      return;
    }

    const headers = ['ID', 'Full Name', 'Phone', 'Email', 'People Count', 'Total Share (INR)', 'Message', 'Status', 'Registered At (IST)'];
    const rows = registrations.map((r) => [
      r.id,
      `"${r.full_name.replace(/"/g, '""')}"`,
      r.phone,
      r.email,
      r.number_of_people,
      r.number_of_people * 300,
      `"${(r.message || '').replace(/"/g, '""')}"`,
      r.status,
      new Date(r.registered_at).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
    ]);

    const csvContent = [headers.join(','), ...rows.map((row) => row.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `night_out_registrations_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filtered registrations
  const filtered = registrations.filter((r) => {
    const q = searchTerm.toLowerCase();
    return (
      r.full_name.toLowerCase().includes(q) ||
      r.phone.includes(q) ||
      r.email.toLowerCase().includes(q) ||
      (r.message && r.message.toLowerCase().includes(q))
    );
  });

  const totalPeople = registrations.reduce((sum, r) => sum + (r.number_of_people || 1), 0);
  const totalCollections = totalPeople * 300;

  // 1. Loading State
  if (loading && isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-night-950 flex items-center justify-center text-white">
        <RefreshCw className="w-8 h-8 animate-spin text-neon-yellow" />
      </div>
    );
  }

  // 2. Unauthenticated Login Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-night-950 text-white flex flex-col justify-center items-center px-4 relative overflow-hidden">
        <div className="absolute top-1/4 -left-20 w-80 h-80 bg-purple-600/20 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-neon-yellow/15 rounded-full blur-[100px] pointer-events-none" />

        <div className="w-full max-w-md bg-night-900/90 border-2 border-zinc-800 focus-within:border-neon-yellow rounded-3xl p-8 backdrop-blur-xl shadow-2xl">
          <div className="text-center mb-6">
            <CrownDoodle className="w-10 h-10 text-neon-yellow mx-auto mb-2" />
            <h1 className="font-display text-3xl font-black tracking-wider uppercase text-white">
              HOST ACCESS
            </h1>
            <p className="text-xs text-zinc-400 mt-1">
              Enter host passcode to access Hitesh&apos;s Party Dashboard
            </p>
          </div>

          {loginError && (
            <div className="mb-4 p-3 bg-red-950/80 border border-red-500 rounded-xl text-red-200 text-xs text-center">
              {loginError}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-1.5">
                Admin Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-500">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter host passcode"
                  className="w-full pl-10 pr-4 py-3 bg-night-950 border border-zinc-800 rounded-xl text-white placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-neon-yellow text-sm"
                  autoFocus
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoggingIn}
              className="w-full py-3.5 bg-neon-yellow text-night-950 font-bold uppercase tracking-wider rounded-xl hover:bg-amber-400 transition-colors shadow-lg text-sm"
            >
              {isLoggingIn ? 'Verifying...' : 'Unlock Dashboard'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs text-zinc-500 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Invitation</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // 3. Authenticated Dashboard
  return (
    <div className="min-h-screen bg-night-950 text-white pb-20">
      {/* Top Navbar */}
      <header className="border-b border-zinc-800/80 bg-night-900/80 backdrop-blur-md sticky top-0 z-30 px-4 sm:px-8 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <CrownDoodle className="w-7 h-7 text-neon-yellow" />
            <div>
              <h1 className="font-display text-2xl font-black tracking-wide text-white uppercase">
                NIGHT OUT • <span className="text-neon-yellow">HOST DASHBOARD</span>
              </h1>
              <p className="text-[11px] text-zinc-400">Oct 12, 2026 @ Hitesh&apos;s House</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-lg border border-zinc-700 text-zinc-300 hover:text-white hover:bg-zinc-800 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Public Page</span>
            </Link>
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-lg bg-red-950/60 border border-red-800/80 text-red-300 hover:bg-red-900 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-8 pt-8">
        {/* Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          <div className="bg-night-900 border border-zinc-800 p-6 rounded-2xl shadow-lg">
            <div className="flex items-center justify-between text-zinc-400 text-xs font-bold uppercase tracking-wider mb-2">
              <span>Total Registrations</span>
              <Users className="w-5 h-5 text-neon-yellow" />
            </div>
            <div className="font-display text-4xl sm:text-5xl font-black text-white">
              {registrations.length}
            </div>
            <span className="text-xs text-zinc-500 mt-1 block">Confirmed RSVP entries</span>
          </div>

          <div className="bg-night-900 border border-zinc-800 p-6 rounded-2xl shadow-lg">
            <div className="flex items-center justify-between text-zinc-400 text-xs font-bold uppercase tracking-wider mb-2">
              <span>Total Headcount</span>
              <Users className="w-5 h-5 text-cyan-400" />
            </div>
            <div className="font-display text-4xl sm:text-5xl font-black text-cyan-400">
              {totalPeople}
            </div>
            <span className="text-xs text-zinc-500 mt-1 block">Guests expected at the party</span>
          </div>

          <div className="bg-night-900 border border-zinc-800 p-6 rounded-2xl shadow-lg">
            <div className="flex items-center justify-between text-zinc-400 text-xs font-bold uppercase tracking-wider mb-2">
              <span>Total Pool Share</span>
              <IndianRupee className="w-5 h-5 text-emerald-400" />
            </div>
            <div className="font-display text-4xl sm:text-5xl font-black text-emerald-400">
              ₹{totalCollections.toLocaleString('en-IN')}
            </div>
            <span className="text-xs text-zinc-500 mt-1 block">₹300/head for food & liquids</span>
          </div>
        </div>

        {/* Action Bar: Search, Refresh, Export CSV */}
        <div className="bg-night-900 border border-zinc-800 rounded-2xl p-4 sm:p-5 mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-80">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-500">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by name, phone, email..."
              className="w-full pl-10 pr-4 py-2 bg-night-950 border border-zinc-800 rounded-xl text-white placeholder-zinc-500 text-sm focus:outline-none focus:ring-1 focus:ring-neon-yellow"
            />
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            <button
              onClick={fetchRegistrations}
              className="p-2.5 rounded-xl border border-zinc-700 bg-night-950 hover:bg-zinc-800 text-zinc-300 transition-colors"
              title="Refresh list"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            </button>
            <button
              onClick={handleExportCSV}
              className="flex items-center gap-2 px-4 py-2 bg-neon-yellow text-night-950 font-bold rounded-xl text-xs uppercase tracking-wider hover:bg-amber-400 transition-colors shadow-md"
            >
              <Download className="w-4 h-4" />
              <span>Export CSV</span>
            </button>
          </div>
        </div>

        {/* Registrations Table */}
        <div className="bg-night-900 border border-zinc-800 rounded-2xl overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-zinc-300">
              <thead className="bg-night-950/80 text-[11px] font-black uppercase tracking-wider text-zinc-400 border-b border-zinc-800">
                <tr>
                  <th className="py-4 px-4 sm:px-6">Guest Name</th>
                  <th className="py-4 px-4">Contact</th>
                  <th className="py-4 px-4 text-center">People</th>
                  <th className="py-4 px-4">Share (₹)</th>
                  <th className="py-4 px-4">Message</th>
                  <th className="py-4 px-4">Registered At</th>
                  <th className="py-4 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/60">
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-12 text-center text-zinc-500">
                      {searchTerm ? 'No guests found matching your search.' : 'No registrations yet. Send the invitation link to friends!'}
                    </td>
                  </tr>
                ) : (
                  filtered.map((item) => (
                    <tr key={item.id} className="hover:bg-zinc-800/30 transition-colors">
                      <td className="py-4 px-4 sm:px-6 font-bold text-white whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <span>{item.full_name}</span>
                          <span className="w-2 h-2 rounded-full bg-emerald-400" title="Confirmed" />
                        </div>
                      </td>

                      <td className="py-4 px-4 whitespace-nowrap">
                        <div className="flex flex-col text-xs">
                          <a
                            href={`https://wa.me/91${item.phone}`}
                            target="_blank"
                            rel="noreferrer"
                            className="text-neon-yellow hover:underline flex items-center gap-1 font-mono font-medium"
                          >
                            <Phone className="w-3 h-3" />
                            +91 {item.phone}
                          </a>
                          <span className="text-zinc-500 flex items-center gap-1 mt-0.5">
                            <Mail className="w-3 h-3" />
                            {item.email}
                          </span>
                        </div>
                      </td>

                      <td className="py-4 px-4 text-center whitespace-nowrap">
                        <span className="inline-block px-2.5 py-1 rounded-full text-xs font-black bg-zinc-800 text-white border border-zinc-700">
                          {item.number_of_people}
                        </span>
                      </td>

                      <td className="py-4 px-4 font-bold text-white whitespace-nowrap">
                        ₹{item.number_of_people * 300}
                      </td>

                      <td className="py-4 px-4 max-w-xs truncate text-xs text-zinc-400" title={item.message || ''}>
                        {item.message || <span className="text-zinc-600">—</span>}
                      </td>

                      <td className="py-4 px-4 whitespace-nowrap text-xs text-zinc-400">
                        {new Date(item.registered_at).toLocaleString('en-IN', {
                          timeZone: 'Asia/Kolkata',
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </td>

                      <td className="py-4 px-4 text-right whitespace-nowrap">
                        {deleteConfirmId === item.id ? (
                          <div className="inline-flex items-center gap-2">
                            <button
                              onClick={() => handleDelete(item.id)}
                              className="px-2 py-1 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded"
                            >
                              Confirm
                            </button>
                            <button
                              onClick={() => setDeleteConfirmId(null)}
                              className="px-2 py-1 bg-zinc-700 text-zinc-300 text-xs rounded"
                            >
                              Cancel
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => setDeleteConfirmId(item.id)}
                            className="p-1.5 text-zinc-500 hover:text-red-400 transition-colors"
                            title="Delete registration"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}

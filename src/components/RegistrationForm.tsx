'use client';

import React, { useState } from 'react';
import { CrownDoodle } from './Doodles';
import SuccessPass, { ConfirmedGuestData } from './SuccessPass';
import { User, Phone, Mail, Users, MessageSquare, Check, AlertCircle, Loader2, Sparkles } from 'lucide-react';
import { normalizeIndianPhone, indianPhoneRegex } from '@/lib/validation';

export default function RegistrationForm() {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    numberOfPeople: 1,
    message: '',
    confirmed: false,
  });

  const [touched, setTouched] = useState<{ [key: string]: boolean }>({});
  const [clientErrors, setClientErrors] = useState<{ [key: string]: string }>({});
  const [serverError, setServerError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successGuest, setSuccessGuest] = useState<ConfirmedGuestData | null>(null);

  const validateField = (field: string, value: any) => {
    let err = '';
    if (field === 'fullName') {
      if (!value || value.trim().length < 2) {
        err = 'Please enter your full name (at least 2 letters).';
      }
    }
    if (field === 'phone') {
      const clean = normalizeIndianPhone(value);
      if (!clean) {
        err = 'Phone number is required.';
      } else if (!indianPhoneRegex.test(clean)) {
        err = 'Please enter a valid 10-digit Indian phone number.';
      }
    }
    if (field === 'email') {
      if (!value || !value.includes('@') || !value.includes('.')) {
        err = 'Please enter a valid email address.';
      }
    }
    if (field === 'numberOfPeople') {
      const num = Number(value);
      if (isNaN(num) || num < 1) {
        err = 'Number of people must be at least 1.';
      }
    }
    if (field === 'confirmed') {
      if (!value) {
        err = 'Please confirm your information is correct.';
      }
    }
    return err;
  };

  const handleBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const err = validateField(field, (formData as any)[field]);
    setClientErrors((prev) => ({ ...prev, [field]: err }));
  };

  const handleChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setServerError(null);
    if (touched[field]) {
      const err = validateField(field, value);
      setClientErrors((prev) => ({ ...prev, [field]: err }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError(null);

    // Validate all fields
    const errors: { [key: string]: string } = {};
    errors.fullName = validateField('fullName', formData.fullName);
    errors.phone = validateField('phone', formData.phone);
    errors.email = validateField('email', formData.email);
    errors.numberOfPeople = validateField('numberOfPeople', formData.numberOfPeople);
    errors.confirmed = validateField('confirmed', formData.confirmed);

    setTouched({
      fullName: true,
      phone: true,
      email: true,
      numberOfPeople: true,
      confirmed: true,
    });
    setClientErrors(errors);

    const hasErrors = Object.values(errors).some((msg) => Boolean(msg));
    if (hasErrors) {
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: formData.fullName,
          phone: formData.phone,
          email: formData.email,
          numberOfPeople: Number(formData.numberOfPeople),
          message: formData.message,
          confirmed: formData.confirmed,
        }),
      });

      const json = await res.json();

      if (!res.ok || !json.success) {
        if (res.status === 409 || json.isDuplicate) {
          setServerError("You're already on the guest list 👀");
        } else {
          setServerError(json.error || 'Something went wrong. Please try again.');
        }
        setIsSubmitting(false);
        return;
      }

      // Success
      setSuccessGuest(json.data);
    } catch (err) {
      console.error('Registration fetch error:', err);
      setServerError('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (successGuest) {
    return (
      <section id="register" className="relative z-10 py-12 scroll-mt-10">
        <SuccessPass
          guest={successGuest}
          onReset={() => {
            setSuccessGuest(null);
            setFormData({
              fullName: '',
              phone: '',
              email: '',
              numberOfPeople: 1,
              message: '',
              confirmed: false,
            });
            setTouched({});
            setClientErrors({});
            setServerError(null);
          }}
        />
      </section>
    );
  }

  return (
    <section id="register" className="relative z-10 w-full max-w-3xl mx-auto px-4 py-16 scroll-mt-10">
      {/* Title & Subtitle */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 mb-2">
          <CrownDoodle className="w-6 h-6 text-neon-yellow" />
          <span className="font-display tracking-[0.2em] text-xs uppercase text-zinc-400 font-bold">
            GUEST REGISTRATION
          </span>
          <CrownDoodle className="w-6 h-6 text-neon-yellow" />
        </div>
        <h2 className="font-display text-4xl sm:text-6xl font-black uppercase text-white tracking-wide">
          RESERVE YOUR <span className="text-neon-yellow">SPOT</span>
        </h2>
        <p className="font-chalk text-zinc-300 text-lg sm:text-xl mt-1">
          Good food. Good people. One unforgettable night.
        </p>
      </div>

      {/* Registration Card Form */}
      <div className="relative bg-night-900/90 border-2 border-zinc-800 focus-within:border-neon-yellow/60 rounded-3xl p-6 sm:p-10 backdrop-blur-xl shadow-[0_10px_40px_rgba(0,0,0,0.6)] transition-all">
        {serverError && (
          <div className="mb-6 p-4 rounded-2xl bg-red-950/70 border-2 border-red-500/80 text-red-200 flex items-center gap-3 animate-shake">
            <AlertCircle className="w-6 h-6 text-red-400 shrink-0" />
            <div className="font-bold text-sm">{serverError}</div>
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate className="space-y-6">
          {/* Full Name */}
          <div>
            <label className="block text-xs font-extrabold uppercase tracking-wider text-zinc-300 mb-2">
              Full Name <span className="text-neon-yellow">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-zinc-500">
                <User className="w-5 h-5" />
              </div>
              <input
                type="text"
                value={formData.fullName}
                onChange={(e) => handleChange('fullName', e.target.value)}
                onBlur={() => handleBlur('fullName')}
                placeholder="e.g. Rahul Sharma"
                autoComplete="name"
                className={`w-full pl-12 pr-4 py-3.5 bg-night-950/80 border rounded-2xl text-white placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-neon-yellow transition-all ${
                  touched.fullName && clientErrors.fullName
                    ? 'border-red-500 focus:ring-red-500'
                    : 'border-zinc-800 focus:border-neon-yellow'
                }`}
              />
            </div>
            {touched.fullName && clientErrors.fullName && (
              <p className="mt-1.5 text-xs text-red-400 font-medium">{clientErrors.fullName}</p>
            )}
          </div>

          {/* Phone & Email Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Phone */}
            <div>
              <label className="block text-xs font-extrabold uppercase tracking-wider text-zinc-300 mb-2">
                Phone Number <span className="text-neon-yellow">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-zinc-500">
                  <Phone className="w-5 h-5" />
                </div>
                <input
                  type="tel"
                  inputMode="tel"
                  value={formData.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  onBlur={() => handleBlur('phone')}
                  placeholder="9876543210"
                  autoComplete="tel"
                  className={`w-full pl-12 pr-4 py-3.5 bg-night-950/80 border rounded-2xl text-white placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-neon-yellow transition-all ${
                    touched.phone && clientErrors.phone
                      ? 'border-red-500 focus:ring-red-500'
                      : 'border-zinc-800 focus:border-neon-yellow'
                  }`}
                />
              </div>
              {touched.phone && clientErrors.phone && (
                <p className="mt-1.5 text-xs text-red-400 font-medium">{clientErrors.phone}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-extrabold uppercase tracking-wider text-zinc-300 mb-2">
                Email Address <span className="text-neon-yellow">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-zinc-500">
                  <Mail className="w-5 h-5" />
                </div>
                <input
                  type="email"
                  inputMode="email"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  onBlur={() => handleBlur('email')}
                  placeholder="yourname@gmail.com"
                  autoComplete="email"
                  className={`w-full pl-12 pr-4 py-3.5 bg-night-950/80 border rounded-2xl text-white placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-neon-yellow transition-all ${
                    touched.email && clientErrors.email
                      ? 'border-red-500 focus:ring-red-500'
                      : 'border-zinc-800 focus:border-neon-yellow'
                  }`}
                />
              </div>
              {touched.email && clientErrors.email && (
                <p className="mt-1.5 text-xs text-red-400 font-medium">{clientErrors.email}</p>
              )}
            </div>
          </div>

          {/* Number of People */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-extrabold uppercase tracking-wider text-zinc-300">
                Number of People <span className="text-neon-yellow">*</span>
              </label>
              <span className="text-xs font-chalk text-neon-yellow">
                Total Share: ₹{Math.max(1, Number(formData.numberOfPeople || 1)) * 300}
              </span>
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-zinc-500">
                <Users className="w-5 h-5" />
              </div>
              <input
                type="number"
                min="1"
                max="25"
                value={formData.numberOfPeople}
                onChange={(e) => handleChange('numberOfPeople', e.target.value)}
                onBlur={() => handleBlur('numberOfPeople')}
                className={`w-full pl-12 pr-4 py-3.5 bg-night-950/80 border rounded-2xl text-white placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-neon-yellow transition-all ${
                  touched.numberOfPeople && clientErrors.numberOfPeople
                    ? 'border-red-500 focus:ring-red-500'
                    : 'border-zinc-800 focus:border-neon-yellow'
                }`}
              />
            </div>
            {touched.numberOfPeople && clientErrors.numberOfPeople && (
              <p className="mt-1.5 text-xs text-red-400 font-medium">{clientErrors.numberOfPeople}</p>
            )}
          </div>

          {/* Optional Message */}
          <div>
            <label className="block text-xs font-extrabold uppercase tracking-wider text-zinc-300 mb-2">
              Optional Message for Hitesh
            </label>
            <div className="relative">
              <div className="absolute top-3.5 left-4 pointer-events-none text-zinc-500">
                <MessageSquare className="w-5 h-5" />
              </div>
              <textarea
                rows={3}
                value={formData.message}
                onChange={(e) => handleChange('message', e.target.value)}
                placeholder="Song requests for DJ Prince Pavan, spice preferences, or party hype..."
                maxLength={500}
                className="w-full pl-12 pr-4 py-3.5 bg-night-950/80 border border-zinc-800 rounded-2xl text-white placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-neon-yellow focus:border-neon-yellow transition-all resize-none"
              />
            </div>
          </div>

          {/* Confirmation Checkbox */}
          <div className="pt-2">
            <label className="flex items-start gap-3 cursor-pointer group select-none">
              <input
                type="checkbox"
                checked={formData.confirmed}
                onChange={(e) => handleChange('confirmed', e.target.checked)}
                className="mt-1 w-4 h-4 rounded text-neon-yellow accent-amber-400 bg-night-950 border-zinc-700 focus:ring-neon-yellow cursor-pointer"
              />
              <span className="text-xs text-zinc-300 group-hover:text-white transition-colors leading-relaxed">
                I confirm that the information provided is correct and I will be there at Hitesh&apos;s place on October 12th! 🔥
              </span>
            </label>
            {touched.confirmed && clientErrors.confirmed && (
              <p className="mt-1.5 text-xs text-red-400 font-medium">{clientErrors.confirmed}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full relative py-4 sm:py-5 bg-gradient-to-r from-neon-yellow via-amber-400 to-neon-yellow text-night-950 font-display text-2xl sm:text-3xl font-black uppercase tracking-wider rounded-2xl shadow-[0_0_30px_rgba(255,230,0,0.4)] hover:shadow-[0_0_50px_rgba(255,230,0,0.7)] hover:scale-[1.01] active:scale-[0.99] transition-all disabled:opacity-60 disabled:pointer-events-none flex items-center justify-center gap-3"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-6 h-6 animate-spin text-night-950" />
                <span>CONFIRMING SPOT...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-6 h-6 text-night-950" />
                <span>CONFIRM MY SPOT</span>
              </>
            )}
          </button>
        </form>
      </div>
    </section>
  );
}

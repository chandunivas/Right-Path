import React, { useState } from "react";
import { UserProfile } from "../types";
import { COUNTRIES } from "../data/countries";
import { X, User, ShieldCheck, Upload, CheckCircle2, Lock, Phone, Mail, Globe, MapPin, Languages } from "lucide-react";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (profile: UserProfile) => void;
  currentProfile?: UserProfile | null;
}

const PRESET_AVATARS = [
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150",
  "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=150",
];

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
  currentProfile,
}) => {
  const [mode, setMode] = useState<"signup" | "login">("signup");

  // Form Fields
  const [firstName, setFirstName] = useState(currentProfile?.firstName || "");
  const [middleName, setMiddleName] = useState(currentProfile?.middleName || "");
  const [lastName, setLastName] = useState(currentProfile?.lastName || "");
  const [mobileNumber, setMobileNumber] = useState(currentProfile?.mobileNumber || "");
  const [email, setEmail] = useState(currentProfile?.email || "");
  const [country, setCountry] = useState(currentProfile?.country || "India");
  const [state, setState] = useState(currentProfile?.state || "Delhi");
  const [preferredLanguage, setPreferredLanguage] = useState(
    currentProfile?.preferredLanguage || "English"
  );
  const [profilePicture, setProfilePicture] = useState(
    currentProfile?.profilePicture || PRESET_AVATARS[0]
  );
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  if (!isOpen) return null;

  const selectedCountryObj = COUNTRIES.find((c) => c.name === country) || COUNTRIES[0];

  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newCountry = e.target.value;
    setCountry(newCountry);
    const cObj = COUNTRIES.find((c) => c.name === newCountry);
    if (cObj) {
      if (cObj.states.length > 0) {
        setState(cObj.states[0]);
      }
      if (cObj.languages.length > 0) {
        setPreferredLanguage(cObj.languages[0].code);
      }
    }
  };

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicture(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (mode === "signup") {
      if (!firstName.trim()) {
        setErrorMsg("First Name is required.");
        return;
      }
      if (!lastName.trim()) {
        setErrorMsg("Last Name is required.");
        return;
      }
      if (!mobileNumber.trim() || mobileNumber.length < 8) {
        setErrorMsg("Please enter a valid Mobile Number.");
        return;
      }
      if (!password || password.length < 6) {
        setErrorMsg("Password must be at least 6 characters long.");
        return;
      }
    } else {
      if (!mobileNumber.trim() && !email.trim()) {
        setErrorMsg("Enter Mobile Number or Email to Sign In.");
        return;
      }
      if (!password) {
        setErrorMsg("Please enter your password.");
        return;
      }
    }

    const newProfile: UserProfile = {
      id: currentProfile?.id || `user_${Date.now()}`,
      firstName: firstName || "User",
      middleName: middleName || undefined,
      lastName: lastName || "Citizen",
      mobileNumber: mobileNumber || "9876543210",
      email: email || undefined,
      country,
      state: state || undefined,
      preferredLanguage,
      profilePicture,
      isLoggedIn: true,
    };

    onLoginSuccess(newProfile);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-8">
        {/* Modal Header */}
        <div className="bg-slate-900 text-white px-6 py-5 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-500/20 text-emerald-400 rounded-xl border border-emerald-500/30">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg font-bold tracking-tight">
                {mode === "signup" ? "Create RightsGuard Account" : "Sign In to RightsGuard"}
              </h2>
              <p className="text-xs text-slate-400">
                Personalized legal rights & anti-fraud verification based on your country
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Toggle */}
        <div className="flex border-b border-slate-200 bg-slate-50">
          <button
            type="button"
            onClick={() => setMode("signup")}
            className={`flex-1 py-3 text-xs font-semibold text-center transition-all border-b-2 ${
              mode === "signup"
                ? "border-emerald-600 text-slate-900 bg-white"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            Sign Up (New Account)
          </button>
          <button
            type="button"
            onClick={() => setMode("login")}
            className={`flex-1 py-3 text-xs font-semibold text-center transition-all border-b-2 ${
              mode === "login"
                ? "border-emerald-600 text-slate-900 bg-white"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            Sign In (Existing User)
          </button>
        </div>

        {/* Form Content */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
          {errorMsg && (
            <div className="p-3 text-xs text-red-700 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2">
              <X className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {mode === "signup" ? (
            <>
              {/* Profile Avatar Selection */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-2">
                  Profile Picture
                </label>
                <div className="flex items-center gap-4">
                  <img
                    src={profilePicture}
                    alt="Profile Preview"
                    className="w-14 h-14 rounded-full object-cover border-2 border-emerald-500 shadow-sm"
                  />
                  <div className="flex flex-col gap-2">
                    <div className="flex gap-2">
                      {PRESET_AVATARS.map((avatar, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setProfilePicture(avatar)}
                          className={`w-8 h-8 rounded-full overflow-hidden border-2 transition-all ${
                            profilePicture === avatar
                              ? "border-emerald-600 scale-110"
                              : "border-transparent opacity-70 hover:opacity-100"
                          }`}
                        >
                          <img src={avatar} alt="Preset avatar" className="w-full h-full object-cover" />
                        </button>
                      ))}
                    </div>
                    <label className="cursor-pointer text-xs font-semibold text-emerald-700 hover:text-emerald-800 flex items-center gap-1">
                      <Upload className="w-3.5 h-3.5" />
                      <span>Upload Custom Image</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleAvatarUpload}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>
              </div>

              {/* Names row */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    First Name <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      required
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      placeholder="e.g. Rahul"
                      className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Middle Name <span className="text-slate-400 font-normal">(Optional)</span>
                  </label>
                  <input
                    type="text"
                    value={middleName}
                    onChange={(e) => setMiddleName(e.target.value)}
                    placeholder="e.g. Kumar"
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Last Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="e.g. Sharma"
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                  />
                </div>
              </div>

              {/* Contact Information */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Mobile Number <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      type="tel"
                      required
                      value={mobileNumber}
                      onChange={(e) => setMobileNumber(e.target.value)}
                      placeholder="+91 98765 43210"
                      className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Email Address <span className="text-slate-400 font-normal">(Optional)</span>
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="rahul@example.com"
                      className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                    />
                  </div>
                </div>
              </div>

              {/* Location & Jurisdiction (Main Country) */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Country (Main Jurisdiction) <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Globe className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <select
                      value={country}
                      onChange={handleCountryChange}
                      className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-hidden bg-white"
                    >
                      {COUNTRIES.map((c) => (
                        <option key={c.code} value={c.name}>
                          {c.flag} {c.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    State / Province <span className="text-slate-400 font-normal">(Optional)</span>
                  </label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <select
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-hidden bg-white"
                    >
                      {selectedCountryObj.states.map((st) => (
                        <option key={st} value={st}>
                          {st}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Preferred Language <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Languages className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <select
                      value={preferredLanguage}
                      onChange={(e) => setPreferredLanguage(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-hidden bg-white"
                    >
                      {selectedCountryObj.languages.map((lang) => (
                        <option key={lang.code} value={lang.code}>
                          {lang.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Secure Password <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                  />
                </div>
                <p className="text-[10px] text-slate-500 mt-1">
                  Keep your password secure. Used to encrypt your saved fraud reports and profile history.
                </p>
              </div>
            </>
          ) : (
            <>
              {/* Login mode */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Mobile Number or Email <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    required
                    value={mobileNumber || email}
                    onChange={(e) => {
                      setMobileNumber(e.target.value);
                      setEmail(e.target.value);
                    }}
                    placeholder="e.g. +91 98765 43210 or email"
                    className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Password <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                  />
                </div>
              </div>

              {/* Jurisdiction Confirmation for Sign In */}
              <div className="p-3 bg-emerald-50/80 rounded-xl border border-emerald-200/80 space-y-2">
                <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-900">
                  <Globe className="w-4 h-4 text-emerald-600" />
                  <span>Select Target Legal Jurisdiction for Responses:</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                      Country <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={country}
                      onChange={handleCountryChange}
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-hidden bg-white font-medium"
                    >
                      {COUNTRIES.map((c) => (
                        <option key={c.code} value={c.name}>
                          {c.flag} {c.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                      State / Province <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-hidden bg-white font-medium"
                    >
                      {selectedCountryObj.states.map((st) => (
                        <option key={st} value={st}>
                          {st}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <p className="text-[10px] text-emerald-800 font-medium">
                  ⚖️ Your legal rights, statutory fines, and complaint helplines will be customized specifically for <strong>{country} ({state})</strong>.
                </p>
              </div>
            </>
          )}

          <div className="pt-2 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold shadow-md transition-all flex items-center gap-1.5"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{mode === "signup" ? "Complete Sign Up" : "Sign In"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

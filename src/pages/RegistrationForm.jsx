import React, { useState, useEffect } from "react";

const categories = {
  Participation: [
    "Dancing",
    "Singing",
    "Ramp Walk/Modeling",
    "Poetry",
    "Hackathon",
    "Debate Competition",
    "Quiz Competition",
    "Presentation",
    "Speech",
    "Painting/Drawing and Sketching"
  ],
  Visitor: ["General Access"]
};

import {
  CheckCircle,
} from "lucide-react";

const backendURL = import.meta.env.VITE_BACKEND_URL;

const ZonexRegistration = () => {
  // Restore from localStorage if available
  const getInitialState = (key, fallback) => {
    try {
      const val = localStorage.getItem(key);
      if (val !== null) return JSON.parse(val);
    } catch {}
    return fallback;
  };

  const [step, setStep] = useState(() => getInitialState('zonex_step', 1));
  const [loading, setLoading] = useState(false);
  const [hackathonTeamSize, setHackathonTeamSize] = useState(() => getInitialState('zonex_hackathonTeamSize', 3));
  const [formData, setFormData] = useState(() => getInitialState('zonex_formData', {
    // Step 1 - Basic Details
    fullName: "",
    mobile: "",
    email: "",
    college: "",
    courseYear: "",
    city: "",
    // Step 2 & 3 - Category & Subcategory
    category: "",
    subCategory: [],
    // Social Links
    portfolio: "",
    github: "",
    instagram: "",
    // Payment & Registration
    passType: "150",
    passName: "Pro Participation",
    amountPaid: 150,
    referralCode: "",
    registrationId: "",
    qrCode: "",
    paymentStatus: "pending",
  }));
  const [teamMembers, setTeamMembers] = useState(() => getInitialState('zonex_teamMembers', ["", "", ""])); // Minimum 3
  const [teamError, setTeamError] = useState("");

  // ===== NEW EFFECT: Recalculate amount when pass type, hackathon, or team size changes =====
  useEffect(() => {
    // If no pass type selected, do nothing
    if (!formData.passType) return;

    const hasHackathon = formData.subCategory.includes("Hackathon");
    let newAmount = formData.amountPaid; // fallback

    if (formData.passType === "visitor") {
      newAmount = 150;
    } else if (formData.passType === "150") {
      newAmount = hasHackathon ? 150 * hackathonTeamSize : 150;
    } else {
      return; // unknown pass type – do nothing
    }

    // Only update if amount actually changed to avoid infinite loops
    if (newAmount !== formData.amountPaid) {
      setFormData(prev => ({ ...prev, amountPaid: newAmount }));
    }
  }, [formData.passType, formData.subCategory, hackathonTeamSize]); // Dependencies

  const handleInput = (e) => {
    // If changing category, reset subCategory appropriately
    if (e.target.name === "category") {
      if (e.target.value === "Participation") {
        setFormData({
          ...formData,
          category: e.target.value,
          subCategory: formData.subCategory.filter((item) => item !== "General Access"),
        });
      } else if (e.target.value === "Visitor") {
        setFormData({
          ...formData,
          category: e.target.value,
          subCategory: formData.subCategory.includes("General Access") ? ["General Access"] : [],
        });
      } else {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      }
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubCategoryChange = (e) => {
    const value = e.target.value;
    let updated = [...formData.subCategory];
    if (formData.category === "Participation") {
      // Remove General Access if present
      updated = updated.filter((item) => item !== "General Access");
      if (e.target.checked) {
        if (updated.length < 3) {
          updated.push(value);
        }
      } else {
        updated = updated.filter((item) => item !== value);
      }
    } else if (formData.category === "Visitor") {
      // Only allow General Access
      if (e.target.checked && value === "General Access") {
        updated = ["General Access"];
      } else {
        updated = [];
      }
    }
    setFormData({ ...formData, subCategory: updated });
  };

  // Auto-update amountPaid when Hackathon/team size/pass changes
  useEffect(() => {
    let amt = formData.amountPaid;
    if (formData.passType === "150") {
      amt = formData.subCategory.includes("Hackathon") ? 150 * hackathonTeamSize : 150;
    } else if (formData.passType === "visitor") {
      amt = 150;
    }
    if (formData.amountPaid !== amt) {
      setFormData((prev) => ({ ...prev, amountPaid: amt }));
    }
  }, [formData.subCategory, hackathonTeamSize, formData.passType, formData.category]);

  const handleTeamMemberChange = (idx, value) => {
    const updated = [...teamMembers];
    updated[idx] = value;
    setTeamMembers(updated);
  };

  const nextStep = () => {
    const newStep = step + 1;
    setStep(newStep);
    localStorage.setItem('zonex_step', JSON.stringify(newStep));
  };
  
  const prevStep = () => {
    const newStep = step - 1;
    setStep(newStep);
    localStorage.setItem('zonex_step', JSON.stringify(newStep));
  };

  // Save form progress to localStorage on change
  useEffect(() => {
    localStorage.setItem('zonex_formData', JSON.stringify(formData));
  }, [formData]);
  
  useEffect(() => {
    localStorage.setItem('zonex_teamMembers', JSON.stringify(teamMembers));
  }, [teamMembers]);
  
  useEffect(() => {
    localStorage.setItem('zonex_hackathonTeamSize', JSON.stringify(hackathonTeamSize));
  }, [hackathonTeamSize]);
  
  useEffect(() => {
    localStorage.setItem('zonex_step', JSON.stringify(step));
  }, [step]);

  const handlePayment = async () => {
    try {
      setLoading(true);

      // Prepare team members data
      let teamMembersList = [];
      if (formData.subCategory.includes("Hackathon")) {
        teamMembersList = teamMembers.filter(name => name.trim() !== "");
      }

      // ---------- 1️⃣ REGISTER USER (with amountPaid) ----------
      const registerRes = await fetch(`${backendURL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: formData.fullName,
          mobile: formData.mobile,
          email: formData.email,
          college: formData.college,
          courseYear: formData.courseYear,
          city: formData.city,
          category: formData.category,
          subCategory: formData.subCategory,
          portfolio: formData.portfolio,
          github: formData.github,
          instagram: formData.instagram,
          teamMembers: teamMembersList,
          referralCode: formData.referralCode,
          passName: formData.passName,
          amountPaid: formData.amountPaid,
        }),
      });

      const registerData = await registerRes.json();
      if (!registerRes.ok) {
        alert(registerData.msg || "Registration failed");
        setLoading(false);
        return;
      }

      const userId = registerData._id;

      // ---------- 2️⃣ CREATE RAZORPAY ORDER ----------
      const orderRes = await fetch(`${backendURL}/payment/create-order`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
      });

      const orderData = await orderRes.json();
      if (!orderRes.ok) {
        alert(orderData.msg || "Order creation failed");
        setLoading(false);
        return;
      }

      // ---------- 3️⃣ OPEN RAZORPAY CHECKOUT ----------
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: orderData.amount,
        currency: orderData.currency,
        name: "Zonex 2026",
        description: `${formData.passName} - ${formData.category}`,
        image: "https://techmnhub.com/logo.png", // Add your logo URL
        order_id: orderData.id,
        handler: async function (response) {
          try {
            // ---------- 4️⃣ VERIFY PAYMENT ----------
            const verifyRes = await fetch(`${backendURL}/payment/verify`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              }),
            });

            const verifyData = await verifyRes.json();
            
            if (verifyRes.ok) {
              setFormData((prev) => ({
                ...prev,
                registrationId: verifyData.registrationId,
                qrCode: verifyData.qrCode,
              }));
              
              // Clear localStorage after successful registration
              localStorage.removeItem('zonex_formData');
              localStorage.removeItem('zonex_teamMembers');
              localStorage.removeItem('zonex_hackathonTeamSize');
              localStorage.removeItem('zonex_step');
              
              setStep(4); // ✅ CORRECTED: Changed from 5 to 4
              
              // Show message if email failed
              if (verifyData.emailFailed) {
                alert("Payment successful but email delivery failed. Please download your ticket manually.");
              }
            } else {
              alert("Payment verification failed: " + (verifyData.msg || "Unknown error"));
            }
          } catch (error) {
            console.error("Verification error:", error);
            alert("Payment verification failed. Please contact support with your payment ID.");
          } finally {
            setLoading(false);
          }
        },
        modal: {
          ondismiss: function() {
            setLoading(false);
            alert("Payment cancelled");
          },
        },
        prefill: {
          name: formData.fullName,
          email: formData.email,
          contact: formData.mobile,
        },
        theme: { color: "#06b6d4" },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (err) {
      console.error("Payment error:", err);
      alert("Something went wrong. Please try again or contact support.");
      setLoading(false);
    }
  };

  // Validate Step 1
  const validateStep1 = () => {
    const { fullName, mobile, email, college, courseYear, city } = formData;
    if (!fullName || !mobile || !email || !college || !courseYear || !city) {
      alert("Please fill all required fields");
      return false;
    }
    if (mobile.length !== 10 || !/^\d+$/.test(mobile)) {
      alert("Please enter a valid 10-digit mobile number");
      return false;
    }
    if (!email.includes("@") || !email.includes(".")) {
      alert("Please enter a valid email address");
      return false;
    }
    return true;
  };

  // Download ticket function
  const downloadTicket = () => {
    const ticketHTML = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Zonex 2026 - Ticket</title>
        <style>
          body { font-family: Arial, sans-serif; background: #0f172a; color: white; display: flex; justify-content: center; padding: 20px; }
          .ticket { max-width: 500px; background: #1e293b; border-radius: 20px; padding: 30px; border: 2px solid #06b6d4; }
          .header { text-align: center; margin-bottom: 30px; }
          .title { font-size: 36px; font-weight: bold; color: #06b6d4; margin: 0; }
          .subtitle { color: #94a3b8; }
          .qr-code { text-align: center; margin: 20px 0; }
          .qr-code img { width: 200px; height: 200px; border-radius: 10px; }
          .details { background: #0f172a; padding: 20px; border-radius: 10px; }
          .detail-row { display: flex; justify-content: space-between; margin: 10px 0; }
          .label { color: #94a3b8; }
          .value { color: white; font-weight: bold; }
          .registration-id { font-size: 24px; color: #06b6d4; text-align: center; letter-spacing: 2px; }
          .footer { text-align: center; margin-top: 20px; color: #64748b; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="ticket">
          <div class="header">
            <h1 class="title">ZONEX 2026</h1>
            <p class="subtitle">Where Talent Takes Shape</p>
          </div>
          
          <div class="qr-code">
            <img src="${formData.qrCode}" alt="QR Code" />
          </div>
          
          <div class="registration-id">
            ${formData.registrationId}
          </div>
          
          <div class="details">
            <div class="detail-row">
              <span class="label">Name:</span>
              <span class="value">${formData.fullName}</span>
            </div>
            <div class="detail-row">
              <span class="label">Email:</span>
              <span class="value">${formData.email}</span>
            </div>
            <div class="detail-row">
              <span class="label">Category:</span>
              <span class="value">${formData.category}</span>
            </div>
            <div class="detail-row">
              <span class="label">Activities:</span>
              <span class="value">${formData.subCategory.join(', ')}</span>
            </div>
            <div class="detail-row">
              <span class="label">Pass Type:</span>
              <span class="value">${formData.passName}</span>
            </div>
            <div class="detail-row">
              <span class="label">Amount Paid:</span>
              <span class="value">₹${formData.amountPaid}</span>
            </div>
          </div>
          
          <div class="footer">
            <p>📅 7 March 2026 | 📍 MUZAFFARNAGAR</p>
            <p>Show this QR code at the venue for entry</p>
            <p>© 2026 TechMNHub. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `;
    
    const blob = new Blob([ticketHTML], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Zonex2026_${formData.registrationId}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans selection:bg-cyan-500">
      {/* HERO SECTION */}
      <section className="relative h-[60vh] flex flex-col items-center justify-center text-center px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-600/20 to-transparent z-0" />
        <div className="absolute top-20 left-10 w-64 h-64 bg-purple-600/10 rounded-full blur-[100px]" />

        <div className="relative z-10 animate-fade-in">
          <span className="bg-red-600 text-white px-4 py-1 rounded-full text-sm font-bold tracking-widest uppercase">
            TechMNHub Presents
          </span>
          <h1 className="text-6xl md:text-8xl font-black mt-4 mb-2 tracking-tighter italic">
            ZONEX{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-lime-400">
              2026
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-300 max-w-2xl mx-auto">
            Where Talent Takes Shape
          </p>

          <div className="flex flex-wrap justify-center gap-6 mt-8 text-sm font-medium border-t border-white/10 pt-6">
            <span className="flex items-center gap-2 font-mono">
              <span className="text-cyan-400">📅</span> 7 March 2026
            </span>
            <span className="flex items-center gap-2 font-mono">
              <span className="text-cyan-400">📍</span> MUZAFFARNAGAR
            </span>
            <span className="flex items-center gap-2 font-mono">
              <span className="text-cyan-400">⏰</span> 9:00 AM - 5:00 PM
            </span>
          </div>
        </div>
      </section>

      {/* MAIN REGISTRATION FLOW */}
      <section className="max-w-4xl mx-auto px-6 pb-20">
        <div className="bg-slate-900/50 border border-white/10 rounded-3xl p-8 backdrop-blur-xl shadow-2xl">
          {/* Progress Bar */}
          <div className="flex justify-between mb-12 relative">
            <div className="absolute top-1/2 left-0 w-full h-0.5 bg-white/10 -z-10" />
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all 
                  ${step > i ? "bg-cyan-500" : step === i ? "bg-cyan-500 scale-110 shadow-[0_0_15px_rgba(6,182,212,0.5)]" : "bg-slate-800"}`}
              >
                {step > i ? <CheckCircle size={20} /> : i}
              </div>
            ))}
          </div>

          {/* Step 1: Basic Details */}
          {step === 1 && (
            <div className="space-y-6 animate-in slide-in-from-right-4">
              <h2 className="text-3xl font-bold">Basic Information</h2>
              <p className="text-slate-400 text-sm">All fields are required</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input
                  name="fullName"
                  value={formData.fullName}
                  placeholder="Full Name *"
                  onChange={handleInput}
                  className="bg-white/5 border border-white/10 p-4 rounded-xl focus:outline-none focus:border-cyan-500"
                />
                <input
                  name="mobile"
                  value={formData.mobile}
                  placeholder="Mobile Number *"
                  onChange={handleInput}
                  maxLength="10"
                  className="bg-white/5 border border-white/10 p-4 rounded-xl focus:outline-none focus:border-cyan-500"
                />
                <input
                  name="email"
                  value={formData.email}
                  type="email"
                  placeholder="Email *"
                  onChange={handleInput}
                  className="bg-white/5 border border-white/10 p-4 rounded-xl focus:outline-none focus:border-cyan-500"
                />
                <input
                  name="college"
                  value={formData.college}
                  placeholder="College/School *"
                  onChange={handleInput}
                  className="bg-white/5 border border-white/10 p-4 rounded-xl focus:outline-none focus:border-cyan-500"
                />
                <input
                  name="courseYear"
                  value={formData.courseYear}
                  placeholder="Course & Year *"
                  onChange={handleInput}
                  className="bg-white/5 border border-white/10 p-4 rounded-xl focus:outline-none focus:border-cyan-500"
                />
                <input
                  name="city"
                  value={formData.city}
                  placeholder="City *"
                  onChange={handleInput}
                  className="bg-white/5 border border-white/10 p-4 rounded-xl"
                />
              </div>
              <button
                onClick={() => {
                  if (validateStep1()) nextStep();
                }}
                className="w-full bg-cyan-600 hover:bg-cyan-500 py-4 rounded-xl font-bold text-lg transition-all mt-6"
              >
                Next: Select Category
              </button>
            </div>
          )}

          {/* Step 2: Category */}
          {step === 2 && (
            <div className="space-y-6 animate-in slide-in-from-right-4">
              <h2 className="text-3xl font-bold">Choose Your Category</h2>
              <div className="grid grid-cols-1 gap-4">
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInput}
                  className="bg-slate-800 border border-white/10 p-4 rounded-xl appearance-none"
                >
                  <option value="">Select Main Category *</option>
                  {Object.keys(categories).map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>

                {formData.category === "Participation" && (
                  <div className="mt-4">
                    <h3 className="text-xl font-semibold mb-3">
                      Select up to 3 Activities
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {categories[formData.category].map((sub) => (
                        <label key={sub} className={`flex items-center gap-2 bg-slate-800 border border-white/10 p-3 rounded-xl cursor-pointer ${formData.subCategory.length >= 3 && !formData.subCategory.includes(sub) ? 'opacity-50' : ''}`}>
                          <input
                            type="checkbox"
                            value={sub}
                            checked={formData.subCategory.includes(sub)}
                            onChange={handleSubCategoryChange}
                            disabled={!formData.subCategory.includes(sub) && formData.subCategory.length >= 3}
                          />
                          <span>{sub}</span>
                        </label>
                      ))}
                    </div>
                    <div className="text-xs text-slate-400 mt-2">
                      {formData.subCategory.length === 3
                        ? "Maximum 3 activities selected."
                        : "You can select up to 3 activities."}
                    </div>
                  </div>
                )}

                {formData.category === "Visitor" && (
                  <div className="mt-4">
                    <h3 className="text-xl font-semibold mb-3">Visitor Access</h3>
                    <div className="bg-slate-800 border border-white/10 p-4 rounded-xl">
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          value="General Access"
                          checked={formData.subCategory.includes("General Access")}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setFormData({ ...formData, subCategory: ["General Access"] });
                            } else {
                              setFormData({ ...formData, subCategory: [] });
                            }
                          }}
                        />
                        <span>General Access (Full Venue Access)</span>
                      </label>
                    </div>
                  </div>
                )}
              </div>

              {formData.category === "Participation" && formData.subCategory.includes("Hackathon") && (
                <div className="mt-6 bg-slate-800/60 p-4 rounded-xl border border-cyan-500">
                  <h4 className="font-bold text-cyan-400 mb-2">Hackathon Team Details</h4>
                  <label className="block mb-2 text-xs text-slate-300">Select number of team members (3-6, including yourself):</label>
                  <select
                    value={hackathonTeamSize}
                    onChange={e => {
                      const n = Number(e.target.value);
                      setHackathonTeamSize(n);
                      setTeamMembers(Array(n).fill(""));
                    }}
                    className="bg-white/10 border border-white/10 p-2 rounded mb-4 text-white w-full"
                  >
                    {[3,4,5,6].map(n => <option key={n} value={n}>{n} Members</option>)}
                  </select>
                  <h4 className="font-bold text-cyan-400 mb-2">Team Member Names</h4>
                  <p className="text-xs text-slate-300 mb-2">Enter names of all team members (First member is Team Leader):</p>
                  {teamMembers.map((name, idx) => (
                    <input
                      key={idx}
                      type="text"
                      value={name}
                      onChange={e => handleTeamMemberChange(idx, e.target.value)}
                      placeholder={idx === 0 ? "Team Leader Name *" : `Team Member ${idx + 1} Name *`}
                      className="bg-white/10 border border-white/10 p-2 rounded mb-2 w-full text-white placeholder:text-slate-400"
                    />
                  ))}
                  {teamError && <div className="text-red-400 text-xs mt-2">{teamError}</div>}
                </div>
              )}

              {/* Social Links (Optional) */}
              <div className="mt-6">
                <h3 className="text-xl font-semibold mb-3">Social Links (Optional)</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <input
                    name="portfolio"
                    value={formData.portfolio}
                    placeholder="Portfolio URL"
                    onChange={handleInput}
                    className="bg-white/5 border border-white/10 p-3 rounded-xl"
                  />
                  <input
                    name="github"
                    value={formData.github}
                    placeholder="GitHub URL"
                    onChange={handleInput}
                    className="bg-white/5 border border-white/10 p-3 rounded-xl"
                  />
                  <input
                    name="instagram"
                    value={formData.instagram}
                    placeholder="Instagram URL"
                    onChange={handleInput}
                    className="bg-white/5 border border-white/10 p-3 rounded-xl"
                  />
                </div>
              </div>

              <div className="flex gap-4 mt-8">
                <button
                  onClick={prevStep}
                  className="w-1/3 bg-slate-800 py-4 rounded-xl font-bold hover:bg-slate-700 transition"
                >
                  Back
                </button>
                <button
                  onClick={() => {
                    if (!formData.category) {
                      alert("Please select a category");
                      return;
                    }
                    if (formData.category === "Participation" && (!formData.subCategory || formData.subCategory.length < 1)) {
                      alert("Please select at least 1 activity");
                      return;
                    }
                    if (formData.category === "Visitor" && !formData.subCategory.includes("General Access")) {
                      alert("Please select Visitor Access");
                      return;
                    }
                    if (formData.subCategory.includes("Hackathon")) {
                      const validNames = teamMembers.filter(n => n.trim() !== "");
                      if (validNames.length !== hackathonTeamSize) {
                        setTeamError(`Please enter all ${hackathonTeamSize} team member names.`);
                        return;
                      }
                      setTeamError("");
                    }
                    nextStep();
                  }}
                  className="w-2/3 bg-cyan-600 py-4 rounded-xl font-bold hover:bg-cyan-500 transition"
                >
                  Next: Select Pass
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Pass Selection & Payment */}
          {step === 3 && (
            <div className="space-y-6 animate-in slide-in-from-right-4">
              <h2 className="text-3xl font-bold mb-4 text-center">
                Select Your Pass
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Pro Participation */}
                <div
                  onClick={() => {
                    setFormData({
                      ...formData,
                      passType: "150",
                      passName: "Pro Participation",
                      // amountPaid removed
                    });
                  }}
                  className={`p-5 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between 
                    ${formData.passType === "150" ? "border-lime-500 bg-lime-500/10" : "border-white/10 bg-white/5"}`}
                >
                  <div>
                    <span className="text-[10px] bg-lime-500 text-black px-2 py-0.5 rounded-full font-bold">
                      BEST SELLER
                    </span>
                    <h3 className="text-lg font-bold mt-1">
                      Pro Participation
                    </h3>
                    <p className="text-2xl font-black text-lime-400 mt-1">
                      ₹{formData.subCategory.includes("Hackathon") ? 150 * hackathonTeamSize : 150}
                    </p>
                    <ul className="text-xs text-slate-300 mt-3 space-y-1 font-medium">
                      <li>• Entry to 2-3 Skill Zone</li>
                      <li>• Hard Copy Certificate</li>
                      <li>• Physical Event ID Card</li>
                      <li>• Access to Food Carnival</li>
                    </ul>
                  </div>
                </div>

                {/* Visitor Pass */}
                <div
                  onClick={() => {
                    // Prevent selecting Visitor pass if Participation is selected
                    if (formData.category === "Participation") {
                      alert("You cannot select Visitor Pass when Participation is selected.");
                      return;
                    }
                    setFormData({
                      ...formData,
                      passType: "visitor",
                      passName: "Visitor Pass",
                      amountPaid: 150,
                    });
                  }}
                  className={`p-5 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between 
                    ${
                      formData.passType === "visitor"
                        ? "border-purple-500 bg-purple-500/10"
                        : "border-white/10 bg-white/5"
                    }`}
                >
                  <div>
                    <h3 className="text-lg font-bold">Visitor Pass</h3>
                    <p className="text-2xl font-black text-purple-400 mt-1">
                      ₹150
                    </p>
                    <ul className="text-xs text-slate-400 mt-3 space-y-1">
                      <li>• Full Venue Access</li>
                      <li>• Watch All Performances</li>
                      <li>• Food Carnival Access</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Referral Code (Optional) */}
              <div className="mt-4">
                <input
                  name="referralCode"
                  value={formData.referralCode}
                  placeholder="Referral Code (Optional)"
                  onChange={handleInput}
                  className="w-full bg-white/5 border border-white/10 p-4 rounded-xl"
                />
              </div>

              {/* Summary & Payment Button */}
              <div className="pt-6 border-t border-white/10">
                <div className="bg-white/5 p-4 rounded-xl mb-6">
                  <h3 className="font-bold mb-2">Registration Summary</h3>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <span className="text-slate-400">Name:</span>
                    <span>{formData.fullName}</span>
                    <span className="text-slate-400">Email:</span>
                    <span>{formData.email}</span>
                    <span className="text-slate-400">Category:</span>
                    <span>{formData.category}</span>
                    <span className="text-slate-400">Activities:</span>
                    <span>{formData.subCategory.join(", ")}</span>
                    <span className="text-slate-400">Pass:</span>
                    <span>{formData.passName}</span>
                    <span className="text-slate-400">Amount:</span>
                    <span className="text-lime-400 font-bold">
                      ₹{formData.amountPaid}
                    </span>
                  </div>
                </div>

                <button
                  onClick={handlePayment}
                  disabled={loading}
                  className="w-full bg-white text-black py-4 rounded-xl font-black text-xl hover:bg-cyan-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading
                    ? "Processing..."
                    : `PAY ₹${formData.amountPaid} & REGISTER`}
                </button>

                <div className="flex justify-center gap-4 mt-4">
                  <button
                    onClick={prevStep}
                    className="text-slate-400 text-sm underline hover:text-white transition"
                  >
                    Back to edit
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Success & Registration ID */}
          {step === 4 && (
            <div className="space-y-6 animate-in slide-in-from-right-4 text-center">
              <div className="flex justify-center">
                <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center">
                  <CheckCircle size={40} className="text-green-500" />
                </div>
              </div>

              <h2 className="text-3xl font-bold">Registration Successful!</h2>

              <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                <p className="text-sm text-slate-400 mb-2">
                  Your Registration ID
                </p>
                <p className="text-4xl font-mono font-bold text-cyan-400">
                  {formData.registrationId}
                </p>

                {formData.qrCode && (
                  <div className="mt-6">
                    <img
                      src={formData.qrCode}
                      alt="QR Code"
                      className="w-40 h-40 mx-auto"
                    />
                    <p className="text-xs text-slate-400 mt-2">
                      Scan this QR code at the venue
                    </p>
                  </div>
                )}

                <div className="mt-6 p-4 bg-slate-800/50 rounded-lg text-left">
                  <h3 className="font-bold mb-2">📧 Confirmation</h3>
                  <p className="text-sm text-slate-300">
                    We've sent the details to {formData.email}
                  </p>
                  <p className="text-sm text-slate-400 mt-2">
                    If you don't receive the email, you can download your ticket below
                  </p>
                </div>
              </div>

              <div className="flex gap-4 justify-center">
                <button
                  onClick={downloadTicket}
                  className="px-6 py-3 bg-slate-800 rounded-xl font-bold hover:bg-slate-700 transition"
                >
                  📥 Download Ticket
                </button>
                <button
                  onClick={() => {
                    // Reset form for new registration
                    setStep(1);
                    setFormData({
                      fullName: "",
                      mobile: "",
                      email: "",
                      college: "",
                      courseYear: "",
                      city: "",
                      category: "",
                      subCategory: [],
                      portfolio: "",
                      github: "",
                      instagram: "",
                      passType: "150",
                      passName: "Pro Participation",
                      amountPaid: 150,
                      referralCode: "",
                      registrationId: "",
                      qrCode: "",
                      paymentStatus: "pending",
                    });
                    setTeamMembers(["", "", ""]);
                    setHackathonTeamSize(3);
                    
                    // Clear localStorage
                    localStorage.removeItem('zonex_formData');
                    localStorage.removeItem('zonex_teamMembers');
                    localStorage.removeItem('zonex_hackathonTeamSize');
                    localStorage.setItem('zonex_step', JSON.stringify(1));
                  }}
                  className="px-6 py-3 bg-cyan-600 rounded-xl font-bold hover:bg-cyan-500 transition"
                >
                  Register Another
                </button>
              </div>

              <div className="text-sm text-slate-400 mt-4">
                <p>📱 Show this QR code at the venue for entry</p>
                <p className="mt-2">For any issues, contact: techmnhub.team@gmail.com</p>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default ZonexRegistration;
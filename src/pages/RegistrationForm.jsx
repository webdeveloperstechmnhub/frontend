import React, { useState, useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";

const DEFAULT_CATEGORY_OPTIONS = {
  Participation: [
    "Dancing",
    "Singing",
    "Ramp Walk/Modeling",
    "Poetry",
    "Hackathon",
    "Quiz Competition",
    "Speech",
    "Painting/Drawing and Sketching"
  ],
  Visitor: ["General Access"]
};

import {
  CheckCircle,
} from "lucide-react";

const backendURL = import.meta.env.VITE_BACKEND_URL;

const DEFAULT_TICKET_TYPES = [
  {
    key: "pro-participation",
    name: "Pro Participation",
    price: 150,
    total: 0,
    sold: 0,
    remaining: null,
    soldOut: false,
    appliesTo: "Participation",
    description: "Entry to 2-3 skill zones with event access.",
  },
  {
    key: "visitor-pass",
    name: "Visitor Pass",
    price: 150,
    total: 0,
    sold: 0,
    remaining: null,
    soldOut: false,
    appliesTo: "Visitor",
    description: "Venue access for visitors.",
  },
];

const DEFAULT_ZONEX_EVENT_META = {
  shortName: "Zonex 2026",
  date: "7 March 2026",
  city: "Muzaffarnagar",
  time: "9:00 AM - 5:00 PM",
  tagline: "Where Talent Takes Shape",
  categories: DEFAULT_CATEGORY_OPTIONS.Participation,
  contactEmail: "techmnhub.team@gmail.com",
  entryFee: {
    pro: "Rs 150",
    visitor: "Rs 150",
  },
  status: "active",
  ticketTypes: DEFAULT_TICKET_TYPES,
};

const DEFAULT_GENERIC_EVENT_META = {
  shortName: "Event Registration",
  date: "Date to be announced",
  city: "TBA",
  time: "Time to be announced",
  tagline: "Complete your details to confirm your spot.",
  categories: [],
  contactEmail: "techmnhub.team@gmail.com",
  entryFee: {
    pro: "Rs 150",
    visitor: "Rs 150",
  },
  status: "active",
  ticketTypes: DEFAULT_TICKET_TYPES,
};

const extractAmount = (value, fallback = 150) => {
  if (typeof value === "number" && Number.isFinite(value)) {
    return value;
  }

  if (typeof value === "string") {
    const match = value.match(/\d+/);
    if (match) {
      return Number(match[0]);
    }
  }

  return fallback;
};

const buildCategoryOptions = (eventCategories) => {
  if (!Array.isArray(eventCategories) || eventCategories.length === 0) {
    return DEFAULT_CATEGORY_OPTIONS;
  }

  const cleaned = eventCategories
    .map((item) => String(item || "").trim())
    .filter(Boolean);

  if (cleaned.length === 0) {
    return DEFAULT_CATEGORY_OPTIONS;
  }

  const hasVisitor = cleaned.some((item) => item.toLowerCase().includes("visitor"));
  const participation = cleaned.filter((item) => !item.toLowerCase().includes("visitor"));

  const options = {
    Participation:
      participation.length > 0
        ? participation
        : DEFAULT_CATEGORY_OPTIONS.Participation,
  };

  if (hasVisitor) {
    options.Visitor = ["General Access"];
  }

  return options;
};

const normalizeTicketTypes = (ticketTypes, entryFee) => {
  const source = Array.isArray(ticketTypes) && ticketTypes.length > 0
    ? ticketTypes
    : DEFAULT_TICKET_TYPES.map((ticketType) => ({
        ...ticketType,
        price: ticketType.key === "visitor-pass"
          ? extractAmount(entryFee?.visitor, ticketType.price)
          : extractAmount(entryFee?.pro, ticketType.price),
      }));

  return source.map((ticketType, index) => {
    const total = Number(ticketType.total || 0);
    const sold = Number(ticketType.sold || 0);
    const remaining =
      ticketType.remaining !== undefined && ticketType.remaining !== null
        ? Number(ticketType.remaining)
        : total > 0
          ? Math.max(total - sold, 0)
          : null;

    return {
      key: String(ticketType.key || `ticket-${index + 1}`),
      name: ticketType.name || `Ticket ${index + 1}`,
      price: extractAmount(ticketType.price, 0),
      total,
      sold,
      remaining,
      soldOut: Boolean(ticketType.soldOut) || (total > 0 && sold >= total),
      appliesTo: ["Participation", "Visitor", "All"].includes(ticketType.appliesTo)
        ? ticketType.appliesTo
        : "All",
      description: ticketType.description || "",
    };
  });
};

const INITIAL_FORM_DATA = {
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
  passType: "pro-participation",
  passName: "Pro Participation",
  amountPaid: 150,
  referralCode: "",
  registrationId: "",
  qrCode: "",
  paymentStatus: "pending",
};

const RegistrationForm = () => {
  const { eventId } = useParams();
  const storagePrefix = eventId ? `event_${eventId}` : "zonex";
  const storageKey = (name) => `${storagePrefix}_${name}`;

  // Restore from localStorage if available
  const getInitialState = (key, fallback) => {
    try {
      const val = localStorage.getItem(key);
      if (val !== null) return JSON.parse(val);
    } catch {}
    return fallback;
  };

  const [eventMeta, setEventMeta] = useState(
    eventId ? DEFAULT_GENERIC_EVENT_META : DEFAULT_ZONEX_EVENT_META,
  );
  const [eventMetaLoading, setEventMetaLoading] = useState(Boolean(eventId));
  const [eventMetaError, setEventMetaError] = useState("");

  const [step, setStep] = useState(() => getInitialState(storageKey("step"), 1));
  const [loading, setLoading] = useState(false);
  const [hackathonTeamSize, setHackathonTeamSize] = useState(() => getInitialState(storageKey("hackathonTeamSize"), 3));
  const [formData, setFormData] = useState(() => getInitialState(storageKey("formData"), INITIAL_FORM_DATA));
  const [teamMembers, setTeamMembers] = useState(() => getInitialState(storageKey("teamMembers"), ["", "", ""])); // Minimum 3
  const [teamError, setTeamError] = useState("");

  useEffect(() => {
    const loadEventMeta = async () => {
      if (!eventId) {
        setEventMeta(DEFAULT_ZONEX_EVENT_META);
        setEventMetaLoading(false);
        setEventMetaError("");
        return;
      }

      try {
        setEventMetaLoading(true);
        setEventMetaError("");

        const res = await fetch(`${backendURL}/events/${eventId}`);
        const data = await res.json();

        if (res.ok) {
          const normalizedTicketTypes = normalizeTicketTypes(
            data.ticketTypes || data.ticketAvailability,
            data.entryFee,
          );

          setEventMeta({
            shortName: data.shortName || data.name || DEFAULT_GENERIC_EVENT_META.shortName,
            date: data.date || DEFAULT_GENERIC_EVENT_META.date,
            city: data.city || DEFAULT_GENERIC_EVENT_META.city,
            time: data.time || DEFAULT_GENERIC_EVENT_META.time,
            tagline: data.description || DEFAULT_GENERIC_EVENT_META.tagline,
            categories: Array.isArray(data.categories) ? data.categories : [],
            contactEmail: data.contact?.email || DEFAULT_GENERIC_EVENT_META.contactEmail,
            entryFee: {
              pro: data.entryFee?.pro || DEFAULT_GENERIC_EVENT_META.entryFee.pro,
              visitor: data.entryFee?.visitor || DEFAULT_GENERIC_EVENT_META.entryFee.visitor,
            },
            status: data.status === "closed" ? "closed" : "active",
            ticketTypes: normalizedTicketTypes,
          });
        } else {
          setEventMeta(DEFAULT_GENERIC_EVENT_META);
          setEventMetaError(data.msg || "Could not load event details for this link.");
        }
      } catch (error) {
        console.error("Failed to load event details:", error);
        setEventMeta(DEFAULT_GENERIC_EVENT_META);
        setEventMetaError("Could not load event details for this link.");
      } finally {
        setEventMetaLoading(false);
      }
    };

    loadEventMeta();
  }, [eventId]);

  useEffect(() => {
    setStep(getInitialState(storageKey("step"), 1));
    setHackathonTeamSize(getInitialState(storageKey("hackathonTeamSize"), 3));
    setFormData(getInitialState(storageKey("formData"), INITIAL_FORM_DATA));
    setTeamMembers(getInitialState(storageKey("teamMembers"), ["", "", ""]));
    setTeamError("");
  }, [storagePrefix]);

  const categoryOptions = useMemo(
    () => buildCategoryOptions(eventMeta.categories),
    [eventMeta.categories],
  );

  const visitorPassEnabled = Boolean(categoryOptions.Visitor);
  const isEventClosed = eventMeta.status === "closed";

  const availableTicketTypes = useMemo(() => {
    return (eventMeta.ticketTypes || []).filter((ticketType) => {
      if (!formData.category) return true;
      if (ticketType.appliesTo === "All") return true;
      return ticketType.appliesTo === formData.category;
    });
  }, [eventMeta.ticketTypes, formData.category]);

  const selectedTicketType = useMemo(
    () => availableTicketTypes.find((ticketType) => ticketType.key === formData.passType) || availableTicketTypes[0] || null,
    [availableTicketTypes, formData.passType],
  );

  const selectedPassSoldOut = Boolean(selectedTicketType?.soldOut);
  const isFreeTicketRegistration = Number(formData.amountPaid) === 0;

  const hasHackathonOption = useMemo(
    () =>
      (categoryOptions.Participation || []).some(
        (item) => item.toLowerCase() === "hackathon",
      ),
    [categoryOptions],
  );

  // Recalculate amount when pass type, selected activity, event fee, or team size changes.
  useEffect(() => {
    if (!formData.passType) return;

    const hasHackathon = hasHackathonOption && formData.subCategory.includes("Hackathon");
    let newAmount = formData.amountPaid;

    if (selectedTicketType) {
      newAmount = hasHackathon && formData.category !== "Visitor"
        ? selectedTicketType.price * hackathonTeamSize
        : selectedTicketType.price;
    } else {
      return;
    }

    if (newAmount !== formData.amountPaid) {
      setFormData((prev) => ({ ...prev, amountPaid: newAmount }));
    }
  }, [
    formData.passType,
    formData.subCategory,
    formData.amountPaid,
    hackathonTeamSize,
    hasHackathonOption,
    selectedTicketType,
    formData.category,
  ]);

  useEffect(() => {
    if (formData.category === "Visitor" && !visitorPassEnabled) {
      setFormData((prev) => ({ ...prev, category: "", subCategory: [] }));
    }
  }, [formData.category, visitorPassEnabled]);

  useEffect(() => {
    if (!selectedTicketType && availableTicketTypes.length > 0) {
      setFormData((prev) => ({
        ...prev,
        passType: availableTicketTypes[0].key,
        passName: availableTicketTypes[0].name,
      }));
      return;
    }

    if (selectedTicketType?.soldOut) {
      const fallbackType = availableTicketTypes.find((ticketType) => !ticketType.soldOut);
      if (fallbackType) {
        setFormData((prev) => ({
          ...prev,
          passType: fallbackType.key,
          passName: fallbackType.name,
        }));
      }
    }
  }, [selectedTicketType, availableTicketTypes]);

  const handleInput = (e) => {
    if (e.target.name === "category") {
      const selectedCategory = e.target.value;

      if (selectedCategory === "Participation") {
        const allowed = categoryOptions.Participation || [];
        setFormData({
          ...formData,
          category: selectedCategory,
          subCategory: formData.subCategory
            .filter((item) => item !== "General Access")
            .filter((item) => allowed.includes(item)),
        });
      } else if (selectedCategory === "Visitor") {
        if (!visitorPassEnabled) {
          alert("Visitor pass is not enabled for this event.");
          return;
        }
        setFormData({
          ...formData,
          category: selectedCategory,
          subCategory: ["General Access"],
        });
      } else {
        setFormData({ ...formData, category: selectedCategory, subCategory: [] });
      }
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubCategoryChange = (e) => {
    const value = e.target.value;
    let updated = [...formData.subCategory];
    if (formData.category === "Participation") {
      const allowed = categoryOptions.Participation || [];
      if (!allowed.includes(value)) {
        return;
      }
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

  const handleTeamMemberChange = (idx, value) => {
    const updated = [...teamMembers];
    updated[idx] = value;
    setTeamMembers(updated);
  };

  const nextStep = () => {
    const newStep = step + 1;
    setStep(newStep);
    localStorage.setItem(storageKey("step"), JSON.stringify(newStep));
  };
  
  const prevStep = () => {
    const newStep = step - 1;
    setStep(newStep);
    localStorage.setItem(storageKey("step"), JSON.stringify(newStep));
  };

  // Save form progress to localStorage on change
  useEffect(() => {
    localStorage.setItem(storageKey("formData"), JSON.stringify(formData));
  }, [formData]);
  
  useEffect(() => {
    localStorage.setItem(storageKey("teamMembers"), JSON.stringify(teamMembers));
  }, [teamMembers]);
  
  useEffect(() => {
    localStorage.setItem(storageKey("hackathonTeamSize"), JSON.stringify(hackathonTeamSize));
  }, [hackathonTeamSize]);
  
  useEffect(() => {
    localStorage.setItem(storageKey("step"), JSON.stringify(step));
  }, [step]);

  const handlePayment = async () => {
    if (isEventClosed) {
      alert("Registration for this event is closed.");
      return;
    }

    if (selectedPassSoldOut) {
      alert("Selected ticket type is sold out. Please choose another pass.");
      return;
    }

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
          eventId: eventId || null,
          eventShortName: eventMeta.shortName,
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
          passName: selectedTicketType?.name || formData.passName,
          passType: selectedTicketType?.key || formData.passType,
          amountPaid: formData.amountPaid,
        }),
      });

      const registerData = await registerRes.json();
      if (!registerRes.ok) {
        alert(registerData.msg || "Registration failed");
        setLoading(false);
        return;
      }

      const isFreeTicket = Number(registerData.amountPaid) === 0;

      if (isFreeTicket) {
        setFormData((prev) => ({
          ...prev,
          registrationId: registerData.registrationId,
          qrCode: registerData.qrCode,
        }));

        localStorage.removeItem(storageKey("formData"));
        localStorage.removeItem(storageKey("teamMembers"));
        localStorage.removeItem(storageKey("hackathonTeamSize"));
        localStorage.removeItem(storageKey("step"));

        setStep(4);

        if (registerData.emailFailed) {
          alert("Registration successful but email delivery failed. Please download your ticket manually.");
        }

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
        name: eventMeta.shortName,
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
              localStorage.removeItem(storageKey("formData"));
              localStorage.removeItem(storageKey("teamMembers"));
              localStorage.removeItem(storageKey("hackathonTeamSize"));
              localStorage.removeItem(storageKey("step"));
              
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
    const safeEventName = (eventMeta.shortName || "event")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

    const ticketHTML = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>${eventMeta.shortName} - Ticket</title>
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
            <h1 class="title">${eventMeta.shortName}</h1>
            <p class="subtitle">${eventMeta.tagline}</p>
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
            <p>📅 ${eventMeta.date} | 📍 ${String(eventMeta.city || "TBA").toUpperCase()}</p>
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
    a.download = `${safeEventName || "event"}_${formData.registrationId}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (eventMetaLoading) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center px-6">
        <div className="text-center">
          <p className="text-2xl font-bold">Loading Event Details...</p>
          <p className="text-slate-400 mt-2">Please wait while we prepare your registration page.</p>
        </div>
      </div>
    );
  }

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
          <h1 className="text-5xl md:text-7xl font-black mt-4 mb-2 tracking-tighter italic">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-lime-400">
              {eventMeta.shortName}
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-300 max-w-2xl mx-auto">
            {eventMeta.tagline}
          </p>

          <div className="flex flex-wrap justify-center gap-6 mt-8 text-sm font-medium border-t border-white/10 pt-6">
            <span className="flex items-center gap-2 font-mono">
              <span className="text-cyan-400">📅</span> {eventMeta.date}
            </span>
            <span className="flex items-center gap-2 font-mono">
              <span className="text-cyan-400">📍</span> {String(eventMeta.city || "TBA").toUpperCase()}
            </span>
            <span className="flex items-center gap-2 font-mono">
              <span className="text-cyan-400">⏰</span> {eventMeta.time}
            </span>
          </div>
        </div>
      </section>

      {/* MAIN REGISTRATION FLOW */}
      <section className="max-w-4xl mx-auto px-6 pb-20">
        {eventMetaError && (
          <div className="mb-6 bg-amber-500/10 border border-amber-400/30 text-amber-200 rounded-xl p-4 text-sm">
            {eventMetaError}
          </div>
        )}
        {isEventClosed && (
          <div className="mb-6 bg-red-500/10 border border-red-400/30 text-red-200 rounded-xl p-4 text-sm">
            Registration for this event is closed. You can still view event information on this page.
          </div>
        )}

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
                  {Object.keys(categoryOptions).map((cat) => (
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
                      {(categoryOptions[formData.category] || []).map((sub) => (
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

              {formData.category === "Participation" && hasHackathonOption && formData.subCategory.includes("Hackathon") && (
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
                    if (hasHackathonOption && formData.subCategory.includes("Hackathon")) {
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
                {availableTicketTypes.length === 0 ? (
                  <div className="col-span-full bg-white/5 border border-white/10 rounded-2xl p-6 text-center text-slate-300">
                    No ticket types are available for the selected category.
                  </div>
                ) : (
                  availableTicketTypes.map((ticketType, index) => {
                    const isSelected = selectedTicketType?.key === ticketType.key;
                    const displayedPrice =
                      formData.category !== "Visitor" && formData.subCategory.includes("Hackathon")
                        ? ticketType.price * hackathonTeamSize
                        : ticketType.price;

                    return (
                      <div
                        key={ticketType.key}
                        onClick={() => {
                          if (ticketType.soldOut) {
                            alert(`${ticketType.name} is sold out for this event.`);
                            return;
                          }
                          setFormData({
                            ...formData,
                            passType: ticketType.key,
                            passName: ticketType.name,
                            amountPaid: displayedPrice,
                          });
                        }}
                        className={`p-5 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between ${isSelected ? "border-lime-500 bg-lime-500/10" : "border-white/10 bg-white/5"} ${ticketType.soldOut ? "opacity-50 cursor-not-allowed" : ""}`}
                      >
                        <div>
                          <span className="text-[10px] bg-lime-500 text-black px-2 py-0.5 rounded-full font-bold">
                            {ticketType.soldOut ? "SOLD OUT" : index === 0 ? "BEST SELLER" : ticketType.appliesTo}
                          </span>
                          <h3 className="text-lg font-bold mt-1">{ticketType.name}</h3>
                          <p className="text-2xl font-black text-lime-400 mt-1">₹{displayedPrice}</p>
                          <p className="text-xs text-slate-400 mt-1">
                            {ticketType.remaining === null
                              ? "Unlimited tickets"
                              : `${ticketType.remaining} tickets left`}
                          </p>
                          {ticketType.description && (
                            <p className="text-xs text-slate-300 mt-3 leading-5">{ticketType.description}</p>
                          )}
                        </div>
                      </div>
                    );
                  })
                )}
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
                  disabled={loading || isEventClosed || selectedPassSoldOut}
                  className="w-full bg-white text-black py-4 rounded-xl font-black text-xl hover:bg-cyan-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading
                    ? "Processing..."
                    : isEventClosed
                      ? "REGISTRATION CLOSED"
                      : selectedPassSoldOut
                        ? "SELECT AN AVAILABLE TICKET"
                        : isFreeTicketRegistration
                          ? "GET FREE TICKET"
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
                    setFormData(INITIAL_FORM_DATA);
                    setTeamMembers(["", "", ""]);
                    setHackathonTeamSize(3);
                    
                    // Clear localStorage
                    localStorage.removeItem(storageKey("formData"));
                    localStorage.removeItem(storageKey("teamMembers"));
                    localStorage.removeItem(storageKey("hackathonTeamSize"));
                    localStorage.setItem(storageKey("step"), JSON.stringify(1));
                  }}
                  className="px-6 py-3 bg-cyan-600 rounded-xl font-bold hover:bg-cyan-500 transition"
                >
                  Register Another
                </button>
              </div>

              <div className="text-sm text-slate-400 mt-4">
                <p>📱 Show this QR code at the venue for entry</p>
                <p className="mt-2">For any issues, contact: {eventMeta.contactEmail || "techmnhub.team@gmail.com"}</p>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default RegistrationForm;
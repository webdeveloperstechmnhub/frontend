import React, { useMemo, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    details: "",
  });

  const mailTo = useMemo(() => "YOUR_EMAIL_HERE", []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const subject = "TechMNHub Contact Message";
    const body = `Name: ${form.name}
Phone: ${form.phone}
Email: ${form.email}

Message:
${form.details}`;

    const params = new URLSearchParams({ subject, body });
    window.location.href = `mailto:${mailTo}?${params.toString()}`;
  };

  return (
    <section className="min-h-screen bg-gradient-to-b from-white to-blue-50 font-sans">
      <Navbar />

      <div className="max-w-4xl mx-auto px-6 py-24">
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 transition-all duration-300">

          {/* Badge */}
          <div className="inline-block px-4 py-1 text-xs font-semibold tracking-wider uppercase bg-blue-100 text-blue-800 rounded-full">
            Contact Us
          </div>

          {/* Title */}
          <h1 className="mt-6 text-4xl md:text-5xl font-bold text-slate-900">
            Send us a message.
          </h1>

          <p className="mt-4 text-lg text-slate-600 max-w-xl">
            Share your query or collaboration idea. We will respond as soon as possible.
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="mt-10 space-y-6">

            {/* Name + Phone */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex flex-col space-y-2">
                <label className="font-semibold text-slate-800">Name</label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  placeholder="Your full name"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                />
              </div>

              <div className="flex flex-col space-y-2">
                <label className="font-semibold text-slate-800">Phone No.</label>
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  required
                  placeholder="Your phone number"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                />
              </div>
            </div>

            {/* Email */}
            <div className="flex flex-col space-y-2">
              <label className="font-semibold text-slate-800">Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                placeholder="your@email.com"
                className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
              />
            </div>

            {/* Message */}
            <div className="flex flex-col space-y-2">
              <label className="font-semibold text-slate-800">
                Detailed explanation
              </label>
              <textarea
                name="details"
                value={form.details}
                onChange={handleChange}
                required
                rows={6}
                placeholder="Write your message here..."
                className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:outline-none transition resize-none"
              />
            </div>

            {/* Button */}
            <div>
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-full shadow-md transition-all duration-300 hover:scale-105"
              >
                Send message
              </button>
            </div>
          </form>
        </div>
      </div>

      <Footer />
    </section>
  );
};

export default Contact;

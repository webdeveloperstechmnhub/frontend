import React, { useMemo, useState } from "react";
import TmhCard from "../components/ui/TmhCard";
import TmhButton from "../components/ui/TmhButton";
import TmhInput from "../components/ui/TmhInput";
import PageScaffold from "../components/layout/PageScaffold";
import SectionWrapper from "../components/ui/SectionWrapper";
import StateNotice from "../components/ui/StateNotice";
import { apiRequest } from "../utils/api";

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    details: "",
  });
  const [status, setStatus] = useState({ type: "", text: "" });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setStatus({ type: "", text: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name.trim() || !form.email.trim() || !form.phone.trim() || !form.details.trim()) {
      setStatus({ type: "error", text: "Please complete all fields before sending your message." });
      return;
    }

    setSubmitting(true);
    try {
      const result = await apiRequest('/site/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          phone: form.phone,
          email: form.email,
          details: form.details,
          source: 'contact',
        }),
      });

      if (!result.ok) {
        setStatus({ type: "error", text: result.msg || "Failed to send your message." });
        return;
      }

      setStatus({ type: "success", text: "Message sent successfully. Our team will contact you shortly." });
      setForm({ name: "", phone: "", email: "", details: "" });
    } catch (error) {
      console.error(error);
      setStatus({ type: "error", text: "Unable to connect right now. Please try again." });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <PageScaffold>
      <SectionWrapper maxWidth="max-w-4xl" className="font-sans">
        <TmhCard className="p-8 md:p-12" floating={false}>

          {/* Badge */}
          <div className="inline-block px-4 py-1 text-xs font-semibold tracking-wider uppercase bg-yellow-500/15 text-yellow-300 rounded-full border border-yellow-500/30">
            Contact Us
          </div>

          {/* Title */}
          <h1 className="mt-6 text-4xl md:text-5xl font-bold text-white">
            Send us a message.
          </h1>

          <p className="mt-4 text-lg text-[#A0A0A0] max-w-xl">
            Share your query or collaboration idea. We will respond as soon as possible.
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="mt-10 space-y-6">

            {/* Name + Phone */}
            <div className="grid md:grid-cols-2 gap-6">
              <TmhInput id="name" label="Name" name="name" type="text" value={form.name} onChange={handleChange} required />
              <TmhInput id="phone" label="Phone No." name="phone" type="tel" value={form.phone} onChange={handleChange} required />
            </div>

            {/* Email */}
            <TmhInput id="email" label="Email" name="email" type="email" value={form.email} onChange={handleChange} required />

            {/* Message */}
            <div className="flex flex-col space-y-2">
              <label className="font-semibold text-white">
                Detailed explanation
              </label>
              <textarea
                name="details"
                value={form.details}
                onChange={handleChange}
                required
                rows={6}
                placeholder="Write your message here..."
                className="w-full rounded-xl border border-yellow-500/25 bg-[#0D0D0D]/70 px-4 py-3 text-white focus:ring-0 focus:border-yellow-400 focus:shadow-[0_0_0_1px_rgba(212,175,55,0.3),0_0_18px_rgba(212,175,55,0.22)] focus:outline-none transition resize-none"
              />
            </div>

            {/* Button */}
            <div>
              <TmhButton type="submit" className="px-8 py-3 rounded-full">
                {submitting ? 'Sending...' : 'Send message'}
              </TmhButton>
            </div>

            {status.text ? <StateNotice type={status.type === 'success' ? 'success' : 'error'} message={status.text} /> : null}
          </form>
        </TmhCard>
      </SectionWrapper>
    </PageScaffold>
  );
};

export default Contact;

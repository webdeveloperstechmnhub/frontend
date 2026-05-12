import React, { useMemo, useState } from "react";
import TmhCard from "../components/ui/TmhCard";
import TmhButton from "../components/ui/TmhButton";
import TmhInput from "../components/ui/TmhInput";
import PageScaffold from "../components/layout/PageScaffold";
import SectionWrapper from "../components/ui/SectionWrapper";
import StateNotice from "../components/ui/StateNotice";

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    details: "",
  });
  const [status, setStatus] = useState("");

  const mailTo = useMemo(() => "YOUR_EMAIL_HERE", []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setStatus("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name.trim() || !form.email.trim() || !form.phone.trim() || !form.details.trim()) {
      setStatus("Please complete all fields before sending your message.");
      return;
    }

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
                Send message
              </TmhButton>
            </div>

            {status ? <StateNotice type="error" message={status} /> : null}
          </form>
        </TmhCard>
      </SectionWrapper>
    </PageScaffold>
  );
};

export default Contact;

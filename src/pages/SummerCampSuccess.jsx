import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';

const DEFAULT_SUCCESS_DATA = {
  studentName: 'Student Name',
  passLabel: 'Premium Pass',
  venue: 'TechMNHub Learning Centre',
  reportingTime: '09:00 AM, 1st June 2026',
  contactPhone: '+91 98765 43210',
  contactEmail: 'support@techmnhub.com',
  registrationId: 'TMH-SC-000123',
  eventDate: '1 June 2026',
  eventLocation: 'Your City Campus',
  whatsappNumber: '919876543210',
  whatsappMessage: 'Hello%20TechMNHub%20team%2C%20I%20have%20registered%20for%20the%20Future%20Skills%20Summer%20Camp.',
};

const SummerCampTicket = ({ details }) => {
  const qrValue = `https://techmnhub.in/summer-camp/${details.registrationId}`;
  const qrSrc = `https://api.qrserver.com/v1/create-qr-code/?size=280x280&data=${encodeURIComponent(qrValue)}`;

  return (
    <div className="rounded-[2rem] border border-white/10 bg-[#111111]/90 p-6 shadow-2xl">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.28em] text-yellow-300">Downloadable Ticket</p>
          <h2 className="mt-4 text-3xl font-black text-white">Your camp access pass</h2>
          <p className="mt-3 max-w-xl text-sm leading-6 text-[#C8C8C8]">Keep this ticket safe and show it at the venue for fastest check-in.</p>
        </div>
        <div className="rounded-3xl border border-white/10 bg-[#0D0D0D] p-5 text-center">
          <img className="mx-auto h-40 w-40 rounded-3xl" src={qrSrc} alt="Summer camp ticket QR code" />
          <p className="mt-4 text-sm text-[#B8B8B8]">Scan to verify registration</p>
        </div>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <div className="rounded-3xl border border-white/10 bg-[#0B0B0D] p-5">
          <p className="text-sm uppercase tracking-[0.26em] text-[#E6D991]">Pass</p>
          <p className="mt-2 text-xl font-semibold text-white">{details.passLabel}</p>
        </div>
        <div className="rounded-3xl border border-white/10 bg-[#0B0B0D] p-5">
          <p className="text-sm uppercase tracking-[0.26em] text-[#E6D991]">Registration ID</p>
          <p className="mt-2 text-xl font-semibold text-white">{details.registrationId}</p>
        </div>
      </div>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="button"
          onClick={() => {
            const ticketText = `TechMNHub Summer Camp Ticket\n\nStudent: ${details.studentName}\nPass: ${details.passLabel}\nVenue: ${details.venue}\nReporting Time: ${details.reportingTime}\nRegistration ID: ${details.registrationId}\n`;
            const blob = new Blob([ticketText], { type: 'text/plain;charset=utf-8' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `${details.registrationId}-ticket.txt`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
          }}
          className="w-full rounded-full bg-gradient-to-r from-yellow-400 to-amber-500 px-5 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-black transition hover:brightness-110 sm:w-auto"
        >
          Download Ticket
        </button>
        <a
          href={`https://wa.me/${details.whatsappNumber}?text=${details.whatsappMessage}`}
          target="_blank"
          rel="noreferrer"
          className="w-full rounded-full border border-white/10 bg-white/5 px-5 py-3 text-center text-sm font-semibold text-white transition hover:border-yellow-300/40 sm:w-auto"
        >
          Join WhatsApp Group
        </a>
      </div>
    </div>
  );
};

const SummerCampSuccess = () => {
  const location = useLocation();
  const data = useMemo(() => ({ ...DEFAULT_SUCCESS_DATA, ...(location.state || {}) }), [location.state]);

  const downloadCalendar = () => {
    const startDate = '20240601T090000';
    const endDate = '20240601T130000';
    const details = `BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//TechMNHub//Summer Camp//EN\nBEGIN:VEVENT\nUID:${data.registrationId}@techmnhub.com\nDTSTAMP:${new Date().toISOString().replace(/[-:.]/g, '').split('Z')[0]}Z\nDTSTART:${startDate}\nDTEND:${endDate}\nSUMMARY:TechMNHub Future Skills Summer Camp\nLOCATION:${data.venue}\nDESCRIPTION:Reporting Time ${data.reportingTime} at ${data.venue}.\nEND:VEVENT\nEND:VCALENDAR`;
    const blob = new Blob([details], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'TechMNHub-SummerCamp.ics';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-[#050507] text-white py-10 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl space-y-8">
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="rounded-[2rem] border border-white/10 bg-[#0B0B10]/90 p-8 shadow-2xl"
        >
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-3xl">
              <p className="inline-flex items-center gap-2 rounded-full border border-yellow-300/25 bg-yellow-400/10 px-4 py-2 text-sm font-semibold uppercase tracking-[0.3em] text-yellow-200">Registration Successful 🚀</p>
              <h1 className="mt-6 text-4xl font-black tracking-tight text-white sm:text-5xl">Get Ready For The Future</h1>
              <p className="mt-4 max-w-2xl text-base leading-8 text-[#D3D3D3]">Your seat is confirmed for the premium TechMNHub summer camp experience. Check your ticket details below and prepare for high-energy learning.</p>
            </div>
            <div className="rounded-[1.5rem] border border-white/10 bg-black/40 p-6 text-center shadow-xl">
              <p className="text-sm uppercase tracking-[0.3em] text-[#F8E3A8]">Fast access</p>
              <p className="mt-4 text-3xl font-black text-white">{data.eventDate}</p>
              <p className="mt-2 text-sm text-[#C8C8C8]">Ready by {data.reportingTime}</p>
            </div>
          </div>
        </motion.section>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut', delay: 0.1 }}
          className="grid gap-6 xl:grid-cols-[0.95fr_0.65fr]"
        >
          <div className="space-y-6">
            <div className="rounded-[2rem] border border-white/10 bg-[#111117]/95 p-8 shadow-2xl">
              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  { label: 'Student Name', value: data.studentName },
                  { label: 'Selected Pass', value: data.passLabel },
                  { label: 'Camp Venue', value: data.venue },
                  { label: 'Reporting Time', value: data.reportingTime },
                ].map((item) => (
                  <div key={item.label} className="rounded-3xl border border-white/10 bg-[#0D0D11] p-5">
                    <p className="text-sm uppercase tracking-[0.24em] text-[#F5D97D]">{item.label}</p>
                    <p className="mt-3 text-lg font-semibold text-white">{item.value}</p>
                  </div>
                ))}
              </div>

              <div className="mt-6 rounded-[1.75rem] border border-white/10 bg-[#0B0B0F] p-6">
                <p className="text-sm uppercase tracking-[0.24em] text-yellow-300">Contact details</p>
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-3xl bg-[#111113] p-4">
                    <p className="text-sm text-[#B8B8B8]">Phone</p>
                    <p className="mt-2 text-lg font-semibold text-white">{data.contactPhone}</p>
                  </div>
                  <div className="rounded-3xl bg-[#111113] p-4">
                    <p className="text-sm text-[#B8B8B8]">Email</p>
                    <p className="mt-2 text-lg font-semibold text-white">{data.contactEmail}</p>
                  </div>
                </div>
              </div>
            </div>

            <SummerCampTicket details={data} />
          </div>

          <aside className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.45, ease: 'easeOut', delay: 0.2 }}
              className="rounded-[2rem] border border-white/10 bg-[#111112]/95 p-8 shadow-2xl"
            >
              <p className="text-sm uppercase tracking-[0.24em] text-yellow-300">Futuristic camp preview</p>
              <h2 className="mt-4 text-2xl font-bold text-white">What to expect next</h2>
              <ul className="mt-6 space-y-4 text-[#C8C8C8]">
                <li>• High-energy AI labs, coding labs, and creative challenges.</li>
                <li>• Expert mentor coaching and peer showcase sessions.</li>
                <li>• Certificates, reward bundles, and future skill credentials.</li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.45, ease: 'easeOut', delay: 0.3 }}
              className="rounded-[2rem] border border-white/10 bg-[#111112]/95 p-8 shadow-2xl"
            >
              <p className="text-sm uppercase tracking-[0.24em] text-yellow-300">Action items</p>
              <div className="mt-6 space-y-4">
                <button
                  type="button"
                  onClick={downloadCalendar}
                  className="w-full rounded-full bg-gradient-to-r from-yellow-400 to-amber-500 px-5 py-3 text-sm font-semibold uppercase tracking-[0.14em] text-black transition hover:brightness-110"
                >
                  Add to calendar
                </button>
                <a
                  href={`https://wa.me/${data.whatsappNumber}?text=${data.whatsappMessage}`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:border-yellow-300/40"
                >
                  Join WhatsApp community
                </a>
                <Link
                  to="/"
                  className="w-full inline-flex items-center justify-center rounded-full border border-white/10 bg-[#1A1A24] px-5 py-3 text-sm font-semibold text-white transition hover:border-yellow-300/40"
                >
                  Back to home
                </Link>
              </div>
            </motion.div>
          </aside>
        </motion.div>
      </div>
    </div>
  );
};

export default SummerCampSuccess;

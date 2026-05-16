import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';

const backendURL = import.meta.env.VITE_BACKEND_URL;

const DEFAULT_FORM_FIELDS = [
  { id: 'fullName', label: 'Full Name', placeholder: 'Enter your full name', type: 'text', required: true, enabled: true, options: [] },
  { id: 'mobile', label: 'Mobile Number', placeholder: 'Enter your mobile number', type: 'text', required: true, enabled: true, options: [] },
  { id: 'email', label: 'Email Address', placeholder: 'Enter your email address', type: 'email', required: true, enabled: true, options: [] },
  { id: 'college', label: 'College / School', placeholder: 'Enter your college or school', type: 'text', required: true, enabled: true, options: [] },
  { id: 'city', label: 'City', placeholder: 'Enter your city', type: 'text', required: true, enabled: true, options: [] },
];

const safeValue = (value) => (value === undefined || value === null ? '' : value);

const normalizeTicketTypes = (event) => {
  if (Array.isArray(event?.ticketTypes) && event.ticketTypes.length > 0) {
    return event.ticketTypes.map((ticketType, index) => ({
      key: String(ticketType.key || ticketType.name || `ticket-${index + 1}`),
      name: String(ticketType.name || `Pass ${index + 1}`),
      price: Number(ticketType.price || 0),
      description: String(ticketType.description || ''),
    }));
  }

  if (event?.entryFee) {
    return [
      {
        key: 'standard',
        name: 'Standard Pass',
        price: Number(event.entryFee?.pro || 0) || Number(event.entryFee?.visitor || 0) || 0,
        description: 'Early access pass for summer camp participants.',
      },
    ];
  }

  return [];
};

const SOCIAL_SCHOOL_LOGOS = ['School A', 'School B', 'School C', 'School D'];
const SOCIAL_IMAGE_LABELS = ['Workshop talk', 'Project showcase', 'Coding session', 'Happy learners'];
const PARENT_TRUST_POINTS = [
  'Future Skills Exposure',
  'Confidence Building',
  'Smart Technology Learning',
  'Interactive Environment',
  'Positive Use of AI',
];
const FAQ_ITEMS = [
  { question: 'Who can join?', answer: 'Students from Class 6th to 12th are welcome to join this summer camp.' },
  { question: 'Is certificate provided?', answer: 'Yes, all participants receive a certificate after completing the camp.' },
  { question: 'What should students bring?', answer: 'Bring a laptop, notebook, enthusiasm, and a willingness to learn.' },
  { question: 'Is coding experience required?', answer: 'No prior coding is required — the camp is designed for beginners and learners at all levels.' },
  { question: 'Is it beginner friendly?', answer: 'Absolutely — we start with fundamentals and build confidence through hands-on practice.' },
];

const SummerCampEventPage = ({ event: initialEvent }) => {
  const params = useParams();
  const eventId = initialEvent?._id || params.eventId;
  const [event, setEvent] = useState(initialEvent || null);
  const [loading, setLoading] = useState(!initialEvent);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const [formData, setFormData] = useState({
    fullName: '',
    mobile: '',
    email: '',
    college: '',
    courseYear: '',
    city: '',
    category: 'Participant',
    portfolio: '',
    github: '',
    instagram: '',
    referralCode: '',
  });
  const [customFields, setCustomFields] = useState({});
  const ticketTypes = useMemo(() => normalizeTicketTypes(event), [event]);
  const [selectedTicketKey, setSelectedTicketKey] = useState('');
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [countdownLabel, setCountdownLabel] = useState('Registrations Closing Soon');
  const selectedTicket = ticketTypes.find((ticket) => ticket.key === selectedTicketKey) || ticketTypes[0] || null;

  useEffect(() => {
    const deadline = event?.summerCampConfig?.registrationDeadline
      ? new Date(event.summerCampConfig.registrationDeadline)
      : new Date(Date.now() + 3 * 24 * 60 * 60 * 1000);

    const calculateRemaining = () => {
      const now = new Date();
      const delta = Math.max(0, deadline.getTime() - now.getTime());
      const days = Math.floor(delta / (1000 * 60 * 60 * 24));
      const hours = Math.floor((delta / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((delta / (1000 * 60)) % 60);
      const seconds = Math.floor((delta / 1000) % 60);

      setCountdown({ days, hours, minutes, seconds });
      setCountdownLabel(delta > 0 ? 'Registrations Closing Soon' : 'Registration Ends Today');
    };

    calculateRemaining();
    const timer = setInterval(calculateRemaining, 1000);
    return () => clearInterval(timer);
  }, [event]);

  useEffect(() => {
    let active = true;

    const loadEvent = async () => {
      if (initialEvent) return;
      setLoading(true);
      setError('');

      try {
        const res = await fetch(`${backendURL}/events/${eventId}`);
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.msg || 'Could not load event details.');
        }

        if (active) {
          setEvent(data);
        }
      } catch (err) {
        if (active) {
          setError(err.message || 'Unable to load event details.');
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    if (eventId) {
      loadEvent();
    } else {
      setError('Invalid event identifier.');
      setLoading(false);
    }

    return () => {
      active = false;
    };
  }, [eventId, initialEvent]);

  useEffect(() => {
    if (ticketTypes.length > 0 && !selectedTicketKey) {
      setSelectedTicketKey(ticketTypes[0].key);
    }
  }, [ticketTypes, selectedTicketKey]);

  const formFields = useMemo(() => {
    if (!event?.formFields || !Array.isArray(event.formFields) || event.formFields.length === 0) {
      return DEFAULT_FORM_FIELDS;
    }

    return event.formFields.filter((field) => field.enabled !== false);
  }, [event]);

  const handleInputChange = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleCustomFieldChange = (key, value) => {
    setCustomFields((prev) => ({ ...prev, [key]: value }));
  };

  const getCustomPayload = () => {
    const standardKeys = new Set([
      'fullName',
      'mobile',
      'email',
      'college',
      'courseYear',
      'city',
      'category',
      'portfolio',
      'github',
      'instagram',
      'referralCode',
      'passName',
      'passType',
      'amountPaid',
      'eventId',
      'eventShortName',
    ]);

    return Object.entries(customFields).reduce((result, [key, value]) => {
      if (!standardKeys.has(key)) {
        result[key] = value;
      }
      return result;
    }, {});
  };

  const handleRegisterSubmit = async () => {
    if (!event || !selectedTicket) {
      setStatusMessage('Please select a valid pass and complete the registration form.');
      return;
    }

    if (!formData.fullName || !formData.email || !formData.mobile) {
      setStatusMessage('Please fill in your name, email, and mobile number.');
      return;
    }

    setSubmitting(true);
    setStatusMessage('Submitting registration...');

    try {
      const payload = {
        eventId: event._id,
        eventShortName: event.shortName || event.name,
        fullName: formData.fullName,
        mobile: formData.mobile,
        email: formData.email,
        college: formData.college,
        courseYear: formData.courseYear,
        city: formData.city,
        category: formData.category,
        portfolio: formData.portfolio,
        github: formData.github,
        instagram: formData.instagram,
        referralCode: formData.referralCode,
        passType: selectedTicket.key,
        passName: selectedTicket.name,
        amountPaid: selectedTicket.price,
        ...getCustomPayload(),
      };

      const registerRes = await fetch(`${backendURL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const registerData = await registerRes.json();
      if (!registerRes.ok) {
        setStatusMessage(registerData.msg || 'Registration failed.');
        setSubmitting(false);
        return;
      }

      if (Number(registerData.amountPaid || 0) === 0 && registerData.paymentStatus === 'paid') {
        setStatusMessage('Registration complete! Check your email for details.');
        setSubmitting(false);
        return;
      }

      setStatusMessage('Preparing secure payment...');
      const orderRes = await fetch(`${backendURL}/payment/create-order`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: registerData._id }),
      });

      const orderData = await orderRes.json();
      if (!orderRes.ok) {
        setStatusMessage(orderData.msg || 'Unable to create payment order.');
        setSubmitting(false);
        return;
      }

      if (!window.Razorpay) {
        setStatusMessage('Payment provider not available. Please try again later.');
        setSubmitting(false);
        return;
      }

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: orderData.amount,
        currency: orderData.currency,
        name: event.shortName || event.name,
        description: `${selectedTicket.name} · ${event.shortName || event.name}`,
        order_id: orderData.id,
        handler: async (response) => {
          try {
            setStatusMessage('Verifying payment...');
            const verifyRes = await fetch(`${backendURL}/payment/verify`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              }),
            });

            const verifyData = await verifyRes.json();
            if (!verifyRes.ok) {
              setStatusMessage(`Payment verification failed: ${verifyData.msg || 'Unknown error'}`);
              return;
            }

            setStatusMessage('Registration successful! Your ticket is confirmed.');
          } catch (err) {
            console.error(err);
            setStatusMessage('Payment verification failed. Please contact support.');
          } finally {
            setSubmitting(false);
          }
        },
        modal: {
          ondismiss: () => {
            setStatusMessage('Payment was cancelled. You may retry when ready.');
            setSubmitting(false);
          },
        },
        prefill: {
          name: formData.fullName,
          email: formData.email,
          contact: formData.mobile,
        },
        theme: { color: '#D4AF37' },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (err) {
      console.error(err);
      setStatusMessage('Something went wrong. Please try again.');
      setSubmitting(false);
    }
  };

  const heroMessage = event?.summerCampConfig?.heroMessage || 'Future Skills Summer Camp';
  const focus = event?.summerCampConfig?.programFocus || 'Build advanced tech skills with live projects, mentors and hands-on sessions.';
  const highlights = Array.isArray(event?.summerCampConfig?.keyHighlights) ? event.summerCampConfig.keyHighlights : [];
  const showcaseVideo = event?.summerCampConfig?.showcaseVideoUrl || event?.summerCampConfig?.videoUrl || '';

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6 py-20 text-white">
        <div className="max-w-xl text-center">
          <p className="text-xl font-semibold">Loading summer camp experience...</p>
          <p className="mt-3 text-[#B0B0B0]">Hold tight while we load the special registration page.</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6 py-20 text-white">
        <div className="max-w-xl text-center bg-[#111111] border border-white/10 rounded-3xl p-10 shadow-xl">
          <p className="text-xl font-semibold">Unable to load summer camp</p>
          <p className="mt-3 text-[#B0B0B0]">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#050505] via-[#090909] to-[#111111] text-white">
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] items-start">
          <div className="space-y-8">
            <div className="rounded-[2rem] border border-yellow-400/10 bg-white/5 p-10 shadow-2xl">
              <span className="inline-flex items-center gap-2 rounded-full border border-yellow-300/25 bg-yellow-400/10 px-4 py-2 text-sm font-semibold text-yellow-300">
                Summer Camp Experience
              </span>
              <h1 className="mt-6 text-5xl font-black tracking-tight text-white">{event.shortName || event.name}</h1>
              <p className="mt-4 max-w-2xl text-lg leading-8 text-[#D8D8D8]">{heroMessage}</p>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <div className="rounded-3xl bg-[#0E0E0E] p-6 border border-white/10">
                  <p className="text-sm uppercase tracking-[0.24em] text-yellow-300">Camp Dates</p>
                  <p className="mt-3 text-xl font-semibold text-white">{event.summerCampConfig?.campDates || event.dateLabel || event.date || 'Coming soon'}</p>
                </div>
                <div className="rounded-3xl bg-[#0E0E0E] p-6 border border-white/10">
                  <p className="text-sm uppercase tracking-[0.24em] text-yellow-300">Mentor Highlights</p>
                  <p className="mt-3 text-xl font-semibold text-white">{event.summerCampConfig?.mentorHighlights?.slice(0, 1).join(', ') || 'Live mentor sessions'}</p>
                </div>
              </div>

              <div className="mt-10 grid gap-4 sm:grid-cols-2">
                {highlights.slice(0, 4).map((highlight, idx) => (
                  <div key={idx} className="rounded-3xl bg-[#0D0D0D] p-5 border border-white/10">
                    <p className="text-sm text-[#B0B0B0]">{highlight}</p>
                  </div>
                ))}
              </div>

              <div className="mt-10 grid gap-4 sm:grid-cols-3">
                <div className="rounded-[1.75rem] border border-yellow-400/15 bg-[#1D1200]/95 p-6 shadow-sm shadow-yellow-500/10">
                  <p className="text-sm uppercase tracking-[0.24em] text-yellow-300">{countdownLabel}</p>
                  <div className="mt-4 flex flex-wrap items-center gap-3 text-3xl font-black text-white">
                    <span>{String(countdown.days).padStart(2, '0')}d</span>
                    <span>{String(countdown.hours).padStart(2, '0')}h</span>
                    <span>{String(countdown.minutes).padStart(2, '0')}m</span>
                    <span>{String(countdown.seconds).padStart(2, '0')}s</span>
                  </div>
                  <p className="mt-4 text-sm text-[#C9C9C9]">Secure the last premium seats before enrollment closes.</p>
                </div>
                <div className="rounded-[1.75rem] border border-white/10 bg-[#0E0E0E]/95 p-6">
                  <p className="text-sm uppercase tracking-[0.24em] text-yellow-300">Limited Seats Available</p>
                  <p className="mt-4 text-4xl font-black text-white">{event?.summerCampConfig?.seatsRemaining ?? 18} Seats</p>
                  <p className="mt-3 text-sm text-[#B8B8B8]">Only a few seats remain on this premium batch.</p>
                </div>
                <div className="rounded-[1.75rem] border border-white/10 bg-[#0E0E0E]/95 p-6">
                  <p className="text-sm uppercase tracking-[0.24em] text-yellow-300">Trusted by schools</p>
                  <p className="mt-4 text-lg font-semibold text-white">Students from multiple schools joining</p>
                  <div className="mt-5 grid grid-cols-2 gap-3 text-sm text-[#B8B8B8]">
                    {SOCIAL_SCHOOL_LOGOS.map((logo) => (
                      <span key={logo} className="rounded-3xl border border-white/10 bg-white/5 px-3 py-2 text-center">{logo}</span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-10 grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
                <div className="space-y-4 rounded-[2rem] border border-white/10 bg-[#0B0B0D]/95 p-6">
                  <p className="text-sm uppercase tracking-[0.24em] text-yellow-300">Social proof</p>
                  <h3 className="text-2xl font-bold text-white">What students are doing at camp</h3>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {SOCIAL_IMAGE_LABELS.map((label) => (
                      <div key={label} className="rounded-3xl border border-white/10 bg-[#111111] p-4 text-sm text-[#C8C8C8]">
                        <p className="font-semibold text-white">{label}</p>
                        <p className="mt-2 text-[#A8A8A8]">Live projects, peer collaboration, and high-energy learning captured from our sessions.</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="rounded-[2rem] border border-white/10 bg-[#0D0D0D]/95 p-3">
                  {showcaseVideo ? (
                    <div className="relative overflow-hidden rounded-[1.75rem] bg-black pb-[56.25%]">
                      <iframe
                        className="absolute inset-0 h-full w-full rounded-[1.75rem]"
                        src={showcaseVideo}
                        title="Summer Camp Showcase"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                  ) : (
                    <div className="flex h-full min-h-[240px] items-center justify-center rounded-[1.75rem] border border-dashed border-white/10 bg-[#0A0A0A] text-center text-[#C8C8C8]">
                      <div>
                        <p className="text-lg font-semibold text-white">Summer camp reel coming soon</p>
                        <p className="mt-2 text-sm">Watch action, projects, and student energy in our next showcase.</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-[#0A0A0A]/80 p-10 shadow-2xl">
              <h2 className="text-3xl font-bold text-white">Why this summer camp is different</h2>
              <p className="mt-4 text-[#C8C8C8] leading-relaxed">{focus}</p>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <div className="rounded-3xl bg-[#111111] p-6 border border-white/10">
                  <h3 className="text-lg font-semibold text-white">Live Projects</h3>
                  <p className="mt-3 text-[#A8A8A8]">Hands-on builds and portfolio-ready outcomes.</p>
                </div>
                <div className="rounded-3xl bg-[#111111] p-6 border border-white/10">
                  <h3 className="text-lg font-semibold text-white">Mentor Support</h3>
                  <p className="mt-3 text-[#A8A8A8]">Dedicated guidance through every session.</p>
                </div>
                <div className="rounded-3xl bg-[#111111] p-6 border border-white/10">
                  <h3 className="text-lg font-semibold text-white">Skill Growth</h3>
                  <p className="mt-3 text-[#A8A8A8]">Learn the latest future-ready skills with real outcomes.</p>
                </div>
                <div className="rounded-3xl bg-[#111111] p-6 border border-white/10">
                  <h3 className="text-lg font-semibold text-white">Networking</h3>
                  <p className="mt-3 text-[#A8A8A8]">Connect with peers and experts.</p>
                </div>
              </div>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-[#0A0A0A]/80 p-10 shadow-2xl">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.24em] text-yellow-300">Why Parents Choose TechMNHub</p>
                  <h2 className="mt-3 text-3xl font-bold text-white">Trusted by families for future-ready learning</h2>
                </div>
                <div className="rounded-full border border-yellow-300/25 bg-yellow-400/10 px-4 py-2 text-sm font-semibold text-yellow-200">Safe. Smart. Practical.</div>
              </div>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {PARENT_TRUST_POINTS.map((point) => (
                  <div key={point} className="rounded-3xl bg-[#111111] p-6 border border-white/10">
                    <div className="flex items-center gap-3 text-yellow-300">✔</div>
                    <p className="mt-3 text-base font-semibold text-white">{point}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-[#0A0A0A]/80 p-10 shadow-2xl">
              <h2 className="text-3xl font-bold text-white">Frequently Asked Questions</h2>
              <div className="mt-8 space-y-4">
                {FAQ_ITEMS.map((item) => (
                  <div key={item.question} className="rounded-3xl border border-white/10 bg-[#111111] p-6">
                    <p className="text-base font-semibold text-white">{item.question}</p>
                    <p className="mt-3 text-sm text-[#B8B8B8]">{item.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <aside className="space-y-6">
            <div className="rounded-[2rem] border border-white/10 bg-[#111111]/90 p-8 shadow-2xl">
              <p className="text-sm uppercase tracking-[0.24em] text-yellow-300">Summer Camp details</p>
              <h2 className="mt-5 text-3xl font-bold text-white">{event.shortName || event.name}</h2>
              <p className="mt-4 text-[#B8B8B8]">{event.shortDescription || event.description}</p>
              <div className="mt-8 space-y-4">
                <div className="flex items-center justify-between rounded-3xl bg-[#0D0D0D] p-4 border border-white/10">
                  <span className="text-sm text-[#B8B8B8]">Start</span>
                  <span className="text-base font-semibold text-white">{event.dateLabel || event.date || 'TBA'}</span>
                </div>
                <div className="flex items-center justify-between rounded-3xl bg-[#0D0D0D] p-4 border border-white/10">
                  <span className="text-sm text-[#B8B8B8]">Location</span>
                  <span className="text-base font-semibold text-white">{event.venue || event.location || 'TBA'}</span>
                </div>
                <div className="flex items-center justify-between rounded-3xl bg-[#0D0D0D] p-4 border border-white/10">
                  <span className="text-sm text-[#B8B8B8]">Organized by</span>
                  <span className="text-base font-semibold text-white">{event.organizer || 'TechMNHub'}</span>
                </div>
              </div>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-[#111111]/90 p-8 shadow-2xl">
              <p className="text-sm uppercase tracking-[0.24em] text-yellow-300">Choose your pass</p>
              <div className="mt-6 space-y-4">
                {ticketTypes.map((ticket) => {
                  const isSelected = selectedTicket?.key === ticket.key;
                  return (
                    <button
                      type="button"
                      key={ticket.key}
                      onClick={() => setSelectedTicketKey(ticket.key)}
                      className={`w-full text-left rounded-3xl border p-5 transition ${isSelected ? 'border-yellow-400 bg-yellow-500/10' : 'border-white/10 bg-[#0D0D0D]'}`}
                    >
                      <div className="flex items-center justify-between gap-4">
                        <div>
                          <p className="text-base font-semibold text-white">{ticket.name}</p>
                          {ticket.description && <p className="mt-2 text-sm text-[#B8B8B8]">{ticket.description}</p>}
                        </div>
                        <span className="text-xl font-bold text-white">Rs {ticket.price}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-[#111111]/90 p-8 shadow-2xl">
              <p className="text-sm uppercase tracking-[0.24em] text-yellow-300">Spot benefits</p>
              <ul className="mt-6 space-y-3 text-[#B8B8B8]">
                <li>• Access to live workshops and mentorship</li>
                <li>• Project-based skill building</li>
                <li>• Summer camp certificate</li>
                <li>• Exclusive resources and networking</li>
              </ul>
            </div>
          </aside>
        </div>

        {showForm && (
          <div className="mt-16 rounded-[2rem] border border-white/10 bg-[#0A0A0A]/80 p-10 shadow-2xl">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.24em] text-yellow-300">Summer Camp registration</p>
                <h2 className="mt-3 text-3xl font-bold text-white">Complete your application</h2>
              </div>
              <p className="text-sm text-[#B0B0B0]">You can complete registration and payment securely in one flow.</p>
            </div>

            <div className="mt-10 grid gap-6 lg:grid-cols-2">
              {formFields.map((field) => (
                <div key={field.id} className="space-y-2">
                  <label htmlFor={field.id} className="block text-sm font-medium text-white">
                    {field.label}
                    {field.required && <span className="text-yellow-400"> *</span>}
                  </label>
                  {field.type === 'textarea' ? (
                    <textarea
                      id={field.id}
                      value={safeValue(formData[field.id] ?? customFields[field.id])}
                      onChange={(e) => (field.id in formData ? handleInputChange(field.id, e.target.value) : handleCustomFieldChange(field.id, e.target.value))}
                      placeholder={field.placeholder}
                      className="w-full rounded-3xl border border-white/10 bg-[#111111] px-4 py-3 text-white outline-none transition focus:border-yellow-400"
                    />
                  ) : field.type === 'select' ? (
                    <select
                      id={field.id}
                      value={safeValue(formData[field.id] ?? customFields[field.id])}
                      onChange={(e) => (field.id in formData ? handleInputChange(field.id, e.target.value) : handleCustomFieldChange(field.id, e.target.value))}
                      className="w-full rounded-3xl border border-white/10 bg-[#111111] px-4 py-3 text-white outline-none transition focus:border-yellow-400"
                    >
                      <option value="">Select</option>
                      {field.options.map((option) => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                  ) : (
                    <input
                      id={field.id}
                      type={field.type}
                      value={safeValue(formData[field.id] ?? customFields[field.id])}
                      onChange={(e) => (field.id in formData ? handleInputChange(field.id, e.target.value) : handleCustomFieldChange(field.id, e.target.value))}
                      placeholder={field.placeholder}
                      className="w-full rounded-3xl border border-white/10 bg-[#111111] px-4 py-3 text-white outline-none transition focus:border-yellow-400"
                    />
                  )}
                </div>
              ))}
            </div>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-[#B0B0B0]">Payment amount</p>
                <p className="mt-2 text-3xl font-bold text-white">Rs {selectedTicket?.price || 0}</p>
              </div>
              <button
                type="button"
                onClick={handleRegisterSubmit}
                disabled={submitting}
                className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-yellow-400 to-amber-500 px-8 py-4 text-sm font-semibold uppercase tracking-[0.16em] text-black shadow-lg shadow-yellow-500/20 transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {submitting ? 'Processing...' : 'Pay & Register'}
              </button>
            </div>

            {statusMessage && (
              <div className="mt-6 rounded-3xl border border-yellow-400/30 bg-yellow-400/10 p-5 text-sm text-[#F2E8C7]">
                {statusMessage}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SummerCampEventPage;

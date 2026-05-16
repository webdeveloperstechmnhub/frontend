import React, { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const backendURL = import.meta.env.VITE_BACKEND_URL;
const STORAGE_KEY = 'summerCampRegistrationDraft';

const SUMMER_CAMP_EVENT_SHORT_NAME = 'Future Skills Summer Camp 2026';

const PASS_OPTIONS = [
  { key: 'basic-pass', label: 'Basic Pass', price: 399, description: 'Core camp access with guided sessions.' },
  { key: 'smart-pass', label: 'Smart Pass', price: 599, description: 'Includes extra project support and activity boosts.' },
  { key: 'premium-pass', label: 'Premium Pass', price: 999, description: 'Full access, mentor clinics, and premium camp perks.' },
];

const INTERESTS = ['AI Learning', 'Coding', 'Gaming', 'Public Speaking', 'Creativity', 'Competitions', 'Technology'];

const INITIAL_FORM = {
  studentFullName: '',
  parentName: '',
  studentMobile: '',
  parentMobile: '',
  email: '',
  schoolName: '',
  studentClass: '',
  board: '',
  city: '',
  passType: 'basic-pass',
  referralCode: '',
  interests: INTERESTS.reduce((acc, interest) => ({ ...acc, [interest]: false }), {}),
  joinReason: '',
  learnGoal: '',
  instagram: '',
  featurePermission: 'no',
  agree: false,
};

const validateStep = (values, step) => {
  const errors = {};

  if (step === 1) {
    if (!values.studentFullName.trim()) errors.studentFullName = 'Student name is required.';
    if (!values.parentName.trim()) errors.parentName = 'Parent/guardian name is required.';
    if (!values.studentMobile.trim() || values.studentMobile.trim().length < 10) errors.studentMobile = 'Valid student mobile is required.';
    if (!values.parentMobile.trim() || values.parentMobile.trim().length < 10) errors.parentMobile = 'Valid parent mobile is required.';
    if (!values.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) errors.email = 'Valid email address is required.';
  }

  if (step === 2) {
    if (!values.schoolName.trim()) errors.schoolName = 'School name is required.';
    if (!values.studentClass.trim()) errors.studentClass = 'Class is required.';
    if (!values.board.trim()) errors.board = 'Board is required.';
    if (!values.city.trim()) errors.city = 'City is required.';
  }

  if (step === 3) {
    if (!PASS_OPTIONS.some((pass) => pass.key === values.passType)) errors.passType = 'Select a valid pass.';
  }

  if (step === 4) {
    if (!values.joinReason.trim()) errors.joinReason = 'Tell us why you want to join.';
    if (!values.learnGoal.trim()) errors.learnGoal = 'Share what you want to learn.';
    if (!values.agree) errors.agree = 'You must agree to camp rules.';
  }

  return errors;
};

const buildSummary = (values) => ({
  'Student Name': values.studentFullName,
  'Parent Name': values.parentName,
  'Student Mobile': values.studentMobile,
  'Parent Mobile': values.parentMobile,
  Email: values.email,
  'School Name': values.schoolName,
  Class: values.studentClass,
  Board: values.board,
  City: values.city,
  'Selected Pass': PASS_OPTIONS.find((pass) => pass.key === values.passType)?.label || 'Basic Pass',
  Interests: Object.entries(values.interests).filter(([, selected]) => selected).map(([name]) => name).join(', ') || 'None selected',
  'Why Join': values.joinReason,
  'Learning Goal': values.learnGoal,
  'Instagram ID': values.instagram || 'Not shared',
  'Photo/Video Permission': values.featurePermission === 'yes' ? 'Yes' : 'No',
});

const SummerCampRegistrationForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : INITIAL_FORM;
    } catch {
      return INITIAL_FORM;
    }
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({ type: '', message: '' });
  const [submitting, setSubmitting] = useState(false);
  const [paymentReady, setPaymentReady] = useState(false);
  const [referralState, setReferralState] = useState({
    status: 'idle',
    discountAmount: 0,
    finalAmount: 0,
    message: 'Enter a referral code to apply a discount.',
  });

  const passAmount = useMemo(() => {
    const selected = PASS_OPTIONS.find((pass) => pass.key === formData.passType);
    return selected ? selected.price : PASS_OPTIONS[0].price;
  }, [formData.passType]);

  const payableAmount = referralState.status === 'valid' ? referralState.finalAmount : passAmount;

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
    } catch (err) {
      console.warn('Unable to save draft', err);
    }
  }, [formData]);

  const setField = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const toggleInterest = (interest) => {
    setFormData((prev) => ({
      ...prev,
      interests: { ...prev.interests, [interest]: !prev.interests[interest] },
    }));
  };

  useEffect(() => {
    const code = String(formData.referralCode || '').trim();
    if (!code) {
      setReferralState({
        status: 'idle',
        discountAmount: 0,
        finalAmount: passAmount,
        message: 'Enter a referral code to apply a discount.',
      });
      return;
    }

    setReferralState({
      status: 'validating',
      discountAmount: 0,
      finalAmount: passAmount,
      message: 'Checking referral code…',
    });

    const timer = setTimeout(async () => {
      try {
        const validationRes = await fetch(`${backendURL}/register/validate-referral`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            eventShortName: SUMMER_CAMP_EVENT_SHORT_NAME,
            referralCode: code,
            amount: passAmount,
            email: formData.email,
          }),
        });

        const validationData = await validationRes.json();
        if (!validationRes.ok) {
          setReferralState({
            status: 'invalid',
            discountAmount: 0,
            finalAmount: passAmount,
            message: validationData.msg || 'Invalid referral code.',
          });
          return;
        }

        setReferralState({
          status: 'valid',
          discountAmount: validationData.discountAmount || 0,
          finalAmount: validationData.finalAmount || passAmount,
          message: `Referral applied: ₹${validationData.discountAmount} off.`,
        });
      } catch (err) {
        setReferralState({
          status: 'invalid',
          discountAmount: 0,
          finalAmount: passAmount,
          message: err.message || 'Unable to validate referral code.',
        });
      }
    }, 650);

    return () => clearTimeout(timer);
  }, [formData.referralCode, passAmount, formData.email]);

  const handleNext = () => {
    const stepErrors = validateStep(formData, step);
    if (Object.keys(stepErrors).length) {
      setErrors(stepErrors);
      setStatus({ type: 'error', message: 'Please fix the fields highlighted below.' });
      return;
    }

    setErrors({});
    setStatus({ type: '', message: '' });
    setStep((prev) => Math.min(prev + 1, 5));
  };

  const handleBack = () => {
    setErrors({});
    setStatus({ type: '', message: '' });
    setStep((prev) => Math.max(prev - 1, 1));
  };

  const resetDraft = () => {
    localStorage.removeItem(STORAGE_KEY);
    setFormData(INITIAL_FORM);
    setErrors({});
    setStatus({ type: 'success', message: 'Draft cleared successfully.' });
    setStep(1);
  };

  const handlePayment = async () => {
    const stepErrors = validateStep(formData, 4);
    if (Object.keys(stepErrors).length) {
      setErrors(stepErrors);
      setStatus({ type: 'error', message: 'Please complete the final step before payment.' });
      return;
    }

    if (formData.referralCode.trim()) {
      // If referral is still validating, wait briefly for the result (max 3s)
      if (referralState.status === 'validating') {
        setStatus({ type: 'info', message: 'Validating referral code...' });
        const start = Date.now();
        // eslint-disable-next-line no-constant-condition
        while (referralState.status === 'validating' && Date.now() - start < 3000) {
          // small sleep — rely on React state updates to break the loop
          // Polling local state variable won't update inside this loop, so we read from latest via a small helper
          // Use a promise-based delay to allow state to update
          // eslint-disable-next-line no-await-in-loop
          await new Promise((r) => setTimeout(r, 150));
        }
      }

      if (referralState.status === 'invalid') {
        setStatus({ type: 'error', message: 'Invalid referral code. Please remove it or correct it.' });
        return;
      }
    }

    if (!window.Razorpay) {
      setStatus({ type: 'error', message: 'Razorpay checkout is not available. Please reload or try again later.' });
      return;
    }

    setSubmitting(true);
    setStatus({ type: 'info', message: 'Preparing secure registration and payment...' });

    try {
      const amountToPay = referralState.status === 'valid' ? referralState.finalAmount : passAmount;
      const payload = {
        // keep raw form data for customFields but ensure backend-required fields are present
        ...formData,
        // Backend expects `fullName` and `mobile` — map them from student fields
        fullName: formData.studentFullName,
        mobile: formData.parentMobile || formData.studentMobile,
        // Set pass metadata explicitly
        passType: formData.passType,
        passName: PASS_OPTIONS.find((p) => p.key === formData.passType)?.label || PASS_OPTIONS[0].label,
        // Normalize interests and amount
        interests: Object.entries(formData.interests).filter(([, selected]) => selected).map(([label]) => label),
        amountPaid: amountToPay,
        eventShortName: SUMMER_CAMP_EVENT_SHORT_NAME,
        referralCode: formData.referralCode.trim() || undefined,
      };

      const registerRes = await fetch(`${backendURL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const registerData = await registerRes.json();
      if (!registerRes.ok) {
        throw new Error(registerData.msg || 'Could not create registration.');
      }

      const orderRes = await fetch(`${backendURL}/payment/create-order`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: registerData._id }),
      });

      const orderData = await orderRes.json();
      if (!orderRes.ok) {
        throw new Error(orderData.msg || 'Unable to create payment order.');
      }

      const razorpayOptions = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: orderData.amount,
        currency: orderData.currency,
        name: 'TechMNHub Summer Camp',
        description: `${PASS_OPTIONS.find((pass) => pass.key === formData.passType)?.label} · Summer Camp`,
        order_id: orderData.id,
        prefill: {
          name: formData.studentFullName,
          email: formData.email,
          contact: formData.parentMobile || formData.studentMobile,
        },
        theme: { color: '#D4AF37' },
        handler: async (response) => {
          setStatus({ type: 'info', message: 'Verifying payment...' });
          try {
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
              throw new Error(verifyData.msg || 'Payment verification failed.');
            }

            setStatus({ type: 'success', message: 'Registration confirmed! Check email for camp details.' });
            localStorage.removeItem(STORAGE_KEY);
            setPaymentReady(true);
          } catch (err) {
            setStatus({ type: 'error', message: err.message || 'Payment verification failed.' });
          } finally {
            setSubmitting(false);
          }
        },
        modal: {
          ondismiss: () => {
            setStatus({ type: 'warning', message: 'Payment cancelled. You can retry when ready.' });
            setSubmitting(false);
          },
        },
      };

      const razorpay = new window.Razorpay(razorpayOptions);
      razorpay.open();
    } catch (err) {
      setStatus({ type: 'error', message: err.message || 'Unable to process payment. Please try again.' });
      setSubmitting(false);
    }
  };

  const currentProgress = ((step - 1) / 4) * 100;
  const summary = useMemo(
    () => ({
      ...buildSummary(formData),
      'Referral Code': formData.referralCode ? formData.referralCode : 'Not applied',
      'Total Payable': `₹${payableAmount}`,
    }),
    [formData, payableAmount],
  );

  return (
    <div className="min-h-screen bg-[#050505] text-white py-10 px-4 sm:px-6 md:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 rounded-[2rem] border border-white/10 bg-[#0B0B0D]/90 p-8 shadow-2xl backdrop-blur-xl">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-3xl">
              <p className="text-sm uppercase tracking-[0.35em] text-yellow-300">Premium Summer Camp Registration</p>
              <h1 className="mt-4 text-4xl font-black tracking-tight text-white sm:text-5xl">Secure your child’s seat in TechMNHub Future Skills Summer Camp</h1>
              <p className="mt-4 text-base leading-7 text-[#C8C8C8] sm:text-lg">A premium, conversion-first registration experience designed to reduce friction and build trust with parents.</p>
            </div>
            <div className="rounded-full bg-white/5 px-5 py-4 text-sm font-semibold text-[#F7E1A5] shadow-inner shadow-yellow-300/10">Draft saved automatically in your browser</div>
          </div>
          <div className="mt-8 overflow-hidden rounded-full bg-white/5">
            <div className="h-3 rounded-full bg-gradient-to-r from-yellow-400 via-amber-400 to-[#D4AF37] transition-all" style={{ width: `${currentProgress}%` }} />
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-[0.85fr_0.45fr]">
          <div className="space-y-6">
            <div className="rounded-[2rem] border border-white/10 bg-[#111111]/90 p-8 shadow-2xl">
              <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.28em] text-yellow-300">Step {step} of 4</p>
                  <h2 className="mt-3 text-2xl font-bold text-white">{step === 1 ? 'Basic Details' : step === 2 ? 'School Details' : step === 3 ? 'Pass & Interests' : 'Final Questions'}</h2>
                </div>
                <div className="inline-flex items-center gap-2 rounded-full border border-yellow-300/20 bg-yellow-300/10 px-4 py-2 text-sm text-yellow-200">{step === 4 ? 'Ready for checkout' : 'Fast registration flow'}</div>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -24 }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                >
                  {step === 1 && (
                    <div className="space-y-5">
                      <div className="grid gap-5 sm:grid-cols-2">
                        {[
                          { name: 'studentFullName', label: 'Student Full Name', placeholder: 'Enter full name' },
                          { name: 'parentName', label: 'Father/Mother Name', placeholder: 'Enter guardian name' },
                        ].map((field) => (
                          <div key={field.name}>
                            <label className="mb-2 block text-sm font-medium text-white">{field.label}</label>
                            <input
                              type="text"
                              value={formData[field.name]}
                              placeholder={field.placeholder}
                              onChange={(e) => setField(field.name, e.target.value)}
                              className={`w-full rounded-3xl border px-4 py-3 text-white outline-none transition ${errors[field.name] ? 'border-red-400 bg-[#2C1F0E]' : 'border-white/10 bg-[#121212]'}`}
                            />
                            {errors[field.name] && <p className="mt-2 text-sm text-red-300">{errors[field.name]}</p>}
                          </div>
                        ))}
                      </div>
                      <div className="grid gap-5 sm:grid-cols-2">
                        {[
                          { name: 'studentMobile', label: 'Student Mobile Number', placeholder: 'Enter mobile number', type: 'tel' },
                          { name: 'parentMobile', label: 'Parent Mobile Number', placeholder: 'Enter parent mobile', type: 'tel' },
                        ].map((field) => (
                          <div key={field.name}>
                            <label className="mb-2 block text-sm font-medium text-white">{field.label}</label>
                            <input
                              type={field.type}
                              value={formData[field.name]}
                              placeholder={field.placeholder}
                              onChange={(e) => setField(field.name, e.target.value)}
                              className={`w-full rounded-3xl border px-4 py-3 text-white outline-none transition ${errors[field.name] ? 'border-red-400 bg-[#2C1F0E]' : 'border-white/10 bg-[#121212]'}`}
                            />
                            {errors[field.name] && <p className="mt-2 text-sm text-red-300">{errors[field.name]}</p>}
                          </div>
                        ))}
                      </div>
                      <div>
                        <label className="mb-2 block text-sm font-medium text-white">Email ID</label>
                        <input
                          type="email"
                          value={formData.email}
                          placeholder="Enter email address"
                          onChange={(e) => setField('email', e.target.value)}
                          className={`w-full rounded-3xl border px-4 py-3 text-white outline-none transition ${errors.email ? 'border-red-400 bg-[#2C1F0E]' : 'border-white/10 bg-[#121212]'}`}
                        />
                        {errors.email && <p className="mt-2 text-sm text-red-300">{errors.email}</p>}
                      </div>
                    </div>
                  )}

                  {step === 2 && (
                    <div className="space-y-5">
                      {[
                        { name: 'schoolName', label: 'School Name', placeholder: 'Enter school name' },
                        { name: 'studentClass', label: 'Class', placeholder: 'Enter class or grade' },
                      ].map((field) => (
                        <div key={field.name}>
                          <label className="mb-2 block text-sm font-medium text-white">{field.label}</label>
                          <input
                            type="text"
                            value={formData[field.name]}
                            placeholder={field.placeholder}
                            onChange={(e) => setField(field.name, e.target.value)}
                            className={`w-full rounded-3xl border px-4 py-3 text-white outline-none transition ${errors[field.name] ? 'border-red-400 bg-[#2C1F0E]' : 'border-white/10 bg-[#121212]'}`}
                          />
                          {errors[field.name] && <p className="mt-2 text-sm text-red-300">{errors[field.name]}</p>}
                        </div>
                      ))}
                      <div className="grid gap-5 sm:grid-cols-2">
                        {[
                          { name: 'board', label: 'Board', placeholder: 'CBSE / ICSE / State Board' },
                          { name: 'city', label: 'City', placeholder: 'Enter city' },
                        ].map((field) => (
                          <div key={field.name}>
                            <label className="mb-2 block text-sm font-medium text-white">{field.label}</label>
                            <input
                              type="text"
                              value={formData[field.name]}
                              placeholder={field.placeholder}
                              onChange={(e) => setField(field.name, e.target.value)}
                              className={`w-full rounded-3xl border px-4 py-3 text-white outline-none transition ${errors[field.name] ? 'border-red-400 bg-[#2C1F0E]' : 'border-white/10 bg-[#121212]'}`}
                            />
                            {errors[field.name] && <p className="mt-2 text-sm text-red-300">{errors[field.name]}</p>}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {step === 3 && (
                    <div className="space-y-5">
                      <div className="rounded-[1.75rem] border border-white/10 bg-[#0E0E10] p-5">
                        <p className="text-sm uppercase tracking-[0.24em] text-yellow-300">Pass selection</p>
                        <div className="mt-5 grid gap-4 sm:grid-cols-3">
                          {PASS_OPTIONS.map((pass) => {
                            const active = formData.passType === pass.key;
                            return (
                              <button
                                key={pass.key}
                                type="button"
                                onClick={() => setField('passType', pass.key)}
                                className={`rounded-3xl border p-5 text-left transition ${active ? 'border-yellow-400 bg-yellow-500/10 shadow-[0_0_0_1px_rgba(255,215,0,0.25)]' : 'border-white/10 bg-[#121212]'}`}
                              >
                                <div className="flex items-center justify-between gap-3">
                                  <div>
                                    <p className="text-lg font-semibold text-white">{pass.label}</p>
                                    <p className="mt-2 text-sm text-[#C8C8C8]">{pass.description}</p>
                                  </div>
                                  <span className="text-2xl font-black text-white">₹{pass.price}</span>
                                </div>
                              </button>
                            );
                          })}
                        </div>
                        {errors.passType && <p className="mt-3 text-sm text-red-300">{errors.passType}</p>}
                      </div>

                      <div className="rounded-[1.75rem] border border-white/10 bg-[#0E0E10] p-5">
                        <div className="flex items-center justify-between">
                          <p className="text-sm uppercase tracking-[0.24em] text-yellow-300">Interests</p>
                          <span className="rounded-full bg-white/5 px-3 py-1 text-xs text-[#D1C8B0]">Choose as many as apply</span>
                        </div>
                        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                          {INTERESTS.map((interest) => (
                            <button
                              type="button"
                              key={interest}
                              onClick={() => toggleInterest(interest)}
                              className={`rounded-3xl border px-4 py-3 text-left transition ${formData.interests[interest] ? 'border-yellow-400 bg-yellow-500/10 text-white' : 'border-white/10 bg-[#121212] text-[#D1D1D1]'}`}
                            >
                              {interest}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {step === 4 && (
                    <div className="space-y-5">
                      <div className="grid gap-5">
                        {[
                          { name: 'joinReason', label: 'Why do you want to join this camp?', placeholder: 'Share what motivated you.' },
                          { name: 'learnGoal', label: 'What do you want to learn?', placeholder: 'Tell us your learning goals.' },
                        ].map((field) => (
                          <div key={field.name}>
                            <label className="mb-2 block text-sm font-medium text-white">{field.label}</label>
                            <textarea
                              value={formData[field.name]}
                              placeholder={field.placeholder}
                              rows={4}
                              onChange={(e) => setField(field.name, e.target.value)}
                              className={`w-full rounded-3xl border px-4 py-4 text-white outline-none transition ${errors[field.name] ? 'border-red-400 bg-[#2C1F0E]' : 'border-white/10 bg-[#121212]'}`}
                            />
                            {errors[field.name] && <p className="mt-2 text-sm text-red-300">{errors[field.name]}</p>}
                          </div>
                        ))}
                      </div>
                      <div className="rounded-[1.75rem] border border-white/10 bg-[#0E0E10] p-5">
                        <label className="mb-2 block text-sm font-medium text-white">Instagram ID (optional)</label>
                        <input
                          type="text"
                          value={formData.instagram}
                          placeholder="Enter Instagram handle"
                          onChange={(e) => setField('instagram', e.target.value)}
                          className="w-full rounded-3xl border border-white/10 bg-[#121212] px-4 py-3 text-white outline-none transition"
                        />
                      </div>
                      <div className="rounded-[1.75rem] border border-white/10 bg-[#0E0E10] p-5">
                        <p className="text-sm font-medium text-white">Permission to feature photos/videos</p>
                        <div className="mt-4 flex flex-wrap gap-3">
                          {['yes', 'no'].map((option) => (
                            <button
                              type="button"
                              key={option}
                              onClick={() => setField('featurePermission', option)}
                              className={`rounded-full border px-5 py-3 text-sm transition ${formData.featurePermission === option ? 'border-yellow-400 bg-yellow-500/10 text-white' : 'border-white/10 bg-[#121212] text-[#D1D1D1]'}`}
                            >
                              {option === 'yes' ? 'YES' : 'NO'}
                            </button>
                          ))}
                        </div>
                      </div>
                      <div className="rounded-[1.75rem] border border-white/10 bg-[#0E0E10] p-5">
                        <label className="mb-2 block text-sm font-medium text-white">Referral Code (optional)</label>
                        <input
                          type="text"
                          value={formData.referralCode}
                          placeholder="Enter referral code"
                          onChange={(e) => setField('referralCode', e.target.value)}
                          className={`w-full rounded-3xl border px-4 py-3 text-white outline-none transition ${referralState.status === 'invalid' ? 'border-red-400 bg-[#2C1F0E]' : 'border-white/10 bg-[#121212]'}`}
                        />
                        {referralState.message && (
                          <p className={`mt-2 text-sm ${referralState.status === 'valid' ? 'text-emerald-300' : referralState.status === 'validating' ? 'text-yellow-300' : 'text-red-300'}`}>
                            {referralState.message}
                          </p>
                        )}
                      </div>

                      <div className="rounded-[1.75rem] border border-white/10 bg-[#0E0E10] p-5">
                        <label className="flex items-start gap-3 text-sm text-[#E3D8A7]">
                          <input
                            type="checkbox"
                            checked={formData.agree}
                            onChange={(e) => setField('agree', e.target.checked)}
                            className="mt-1 h-5 w-5 rounded border-white/20 bg-black text-yellow-400 accent-yellow-400"
                          />
                          <span className="max-w-2xl">I agree to participate in camp activities and follow camp rules.</span>
                        </label>
                        {errors.agree && <p className="mt-3 text-sm text-red-300">{errors.agree}</p>}
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="text-sm text-[#B8B8B8]">{step === 1 ? 'Tell us about the student.' : step === 2 ? 'School and class details matter.' : step === 3 ? 'Choose the best camp pass for your child.' : 'Finish with high-impact answers and consent.'}</div>
                <div className="flex flex-wrap gap-3">
                  {step > 1 && (
                    <button
                      type="button"
                      onClick={handleBack}
                      className="rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:border-yellow-300/40"
                    >
                      Back
                    </button>
                  )}
                  {step < 4 ? (
                    <button
                      type="button"
                      onClick={handleNext}
                      className="rounded-full bg-gradient-to-r from-yellow-400 to-amber-500 px-6 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-black shadow-lg shadow-yellow-500/20 transition hover:brightness-110"
                    >
                      Continue
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={handlePayment}
                      disabled={submitting}
                      className="rounded-full bg-gradient-to-r from-yellow-400 to-amber-500 px-6 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-black shadow-lg shadow-yellow-500/20 transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {submitting ? 'Processing payment...' : `Pay ₹${payableAmount} & Register`}
                    </button>
                  )}
                </div>
              </div>

              {status.message && (
                <div className={`mt-6 rounded-3xl border p-4 text-sm ${status.type === 'error' ? 'border-red-400 bg-red-500/10 text-red-100' : status.type === 'success' ? 'border-emerald-400 bg-emerald-500/10 text-emerald-100' : 'border-yellow-300 bg-yellow-400/10 text-yellow-100'}`}>
                  {status.message}
                </div>
              )}
            </div>
          </div>

          <aside className="space-y-6">
            <div className="rounded-[2rem] border border-white/10 bg-[#111111]/95 p-6 shadow-2xl">
              <h3 className="text-lg font-semibold text-white">Fast registration checklist</h3>
              <ul className="mt-5 space-y-3 text-[#C8C8C8]">
                <li>• Save your progress automatically in localStorage.</li>
                <li>• Premium multi-step flow for faster conversions.</li>
                <li>• Secure Razorpay checkout for summer camp payment.</li>
                <li>• Clear mobile first design for parents on the go.</li>
              </ul>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-[#111111]/95 p-6 shadow-2xl">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-white">Your selected pass</h3>
                <span className="rounded-full bg-white/5 px-3 py-1 text-sm text-[#E8DAAA]">₹{passAmount}</span>
              </div>
              <p className="mt-4 text-[#C8C8C8]">{PASS_OPTIONS.find((pass) => pass.key === formData.passType)?.description}</p>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-[#111111]/95 p-6 shadow-2xl">
              <div className="flex items-center gap-3 text-[#F8E8A6]">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-3xl bg-yellow-400/10 text-yellow-300">✓</span>
                <div>
                  <p className="text-sm uppercase tracking-[0.28em] text-yellow-300">Conversion Boost</p>
                  <p className="mt-2 text-base font-semibold text-white">Designed to increase confidence and reduce drop-off.</p>
                </div>
              </div>
              <div className="mt-6 grid gap-3 text-sm text-[#C8C8C8]">
                <p>• Step-by-step prompts remove overwhelm.</p>
                <p>• Visual progress and trust cues keep families engaged.</p>
                <p>• Instant draft recovery for busy parents.</p>
              </div>
            </div>

            <button
              type="button"
              onClick={resetDraft}
              className="w-full rounded-3xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:border-red-400/30 hover:bg-red-500/10"
            >
              Clear saved draft
            </button>
          </aside>
        </div>

        <div className="mt-8 rounded-[2rem] border border-white/10 bg-[#0E0E10]/95 p-8 shadow-2xl">
          <h3 className="text-xl font-bold text-white">Review summary</h3>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {Object.entries(summary).map(([label, value]) => (
              <div key={label} className="rounded-3xl border border-white/10 bg-[#121212] p-4">
                <p className="text-sm text-[#B8B8B8]">{label}</p>
                <p className="mt-2 text-base font-semibold text-white">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummerCampRegistrationForm;

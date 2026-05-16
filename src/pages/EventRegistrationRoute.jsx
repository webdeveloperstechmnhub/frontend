import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import RegistrationForm from './RegistrationForm';
import SummerCampEventPage from './SummerCampEventPage';

const backendURL = import.meta.env.VITE_BACKEND_URL;

const EventRegistrationRoute = () => {
  const { eventId } = useParams();
  const [eventData, setEventData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;

    const loadEvent = async () => {
      setLoading(true);
      setError('');

      try {
        const res = await fetch(`${backendURL}/events/${eventId}`);
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.msg || 'Event not found');
        }

        if (active) {
          setEventData(data);
        }
      } catch (err) {
        if (active) {
          setError(err.message || 'Unable to load event details');
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
      setLoading(false);
      setError('Event ID is missing.');
    }

    return () => {
      active = false;
    };
  }, [eventId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6 py-20 text-white">
        <div className="max-w-xl text-center">
          <p className="text-xl font-semibold">Loading summer camp details...</p>
          <p className="mt-3 text-[#B0B0B0]">Please wait while we prepare your registration experience.</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6 py-20 text-white">
        <div className="max-w-xl text-center bg-[#111111] border border-white/10 rounded-3xl p-10 shadow-xl">
          <p className="text-xl font-semibold">Unable to open registration</p>
          <p className="mt-3 text-[#B0B0B0]">{error}</p>
        </div>
      </div>
    );
  }

  if (eventData?.eventType === 'summer_camp') {
    return <SummerCampEventPage event={eventData} />;
  }

  return <RegistrationForm />;
};

export default EventRegistrationRoute;

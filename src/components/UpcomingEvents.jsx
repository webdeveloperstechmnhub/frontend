import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Calendar, MapPin, Clock, Users, Award, Trophy, X } from "lucide-react";

const backendURL = import.meta.env.VITE_BACKEND_URL;

const legacyEvent = {
  id: "legacy-zonex-2026",
  name: "ZONEX 2026 - Where Talent Takes Shape",
  shortName: "Zonex 2026",
  date: "7 March, 2026",
  day: "Saturday",
  time: "9:00 AM - 5:00 PM",
  location: "S.D. College of Engineering and Technology, Jansath Road, Muzaffarnagar",
  venue: "S.D. College of Engineering and Technology, Jansath Road",
  city: "Muzaffarnagar",
  organizer: "TechMNHub",
  expectedParticipants: "800+",
  skillZones: "10+",
  prizes: "Cash Rewards",
  description:
    "ZONEX is a one-day skill discovery and opportunity festival bringing together students from multiple colleges and schools to showcase talent in technology, creativity, leadership, performance, and innovation.",
  highlights: [
    "800+ Expected Participants",
    "10+ Skill Zones",
    "Hackathon with Cash Prizes",
    "Influencer Meetup",
    "Food Carnival",
    "Live Performances",
    "Networking Sessions",
  ],
  categories: [
    "Performance",
    "Hackathon",
    "Startup Pitch",
    "Creative Arts",
    "Communication",
    "Visitor",
  ],
  entryFee: {
    pro: "Rs 150",
    visitor: "Rs 150",
  },
  contact: {
    email: "techmnhub.team@gmail.com",
    phone: "+91 9259586175",
  },
  registrationDeadline: "3 March, 2026",
  refundPolicy: "No refund after confirmation",
  tags: ["Festival", "Talent Show", "Hackathon", "Networking"],
  registrationLink: "/registration-form",
  status: "active",
  ticketTypes: [
    {
      key: "pro-participation",
      name: "Pro Participation",
      price: 150,
      total: 0,
      appliesTo: "Participation",
      description: "Entry to 2-3 skill zones with event access.",
    },
    {
      key: "visitor-pass",
      name: "Visitor Pass",
      price: 150,
      total: 0,
      appliesTo: "Visitor",
      description: "Venue access for visitors.",
    },
  ],
};

const normalizeTicketTypes = (event) => {
  if (Array.isArray(event.ticketTypes) && event.ticketTypes.length > 0) {
    return event.ticketTypes.map((ticketType, index) => ({
      key: ticketType.key || `ticket-${index + 1}`,
      name: ticketType.name || `Ticket ${index + 1}`,
      price: Number(ticketType.price || 0),
      total: Number(ticketType.total || 0),
      appliesTo: ticketType.appliesTo || "All",
      description: ticketType.description || "",
    }));
  }

  return [
    {
      key: "pro-participation",
      name: "Pro Participation",
      price: Number(String(event.entryFee?.pro || "150").match(/\d+/)?.[0] || 150),
      total: 0,
      appliesTo: "Participation",
      description: "",
    },
    {
      key: "visitor-pass",
      name: "Visitor Pass",
      price: Number(String(event.entryFee?.visitor || "150").match(/\d+/)?.[0] || 150),
      total: 0,
      appliesTo: "Visitor",
      description: "",
    },
  ];
};

const normalizeEvent = (event) => ({
  id: event._id,
  name: event.name || event.shortName || "Upcoming Event",
  shortName: event.shortName || event.name || "Event",
  date: event.date || "Date to be announced",
  day: event.day || "Upcoming",
  time: event.time || "Time to be announced",
  location: event.location || `${event.venue || "Venue"}, ${event.city || "City"}`,
  venue: event.venue || "Venue to be announced",
  city: event.city || "TBA",
  organizer: event.organizer || "TechMNHub",
  expectedParticipants: event.expectedParticipants || "TBA",
  skillZones: event.skillZones || "TBA",
  prizes: event.prizes || "TBA",
  description: event.description || "Details will be announced soon.",
  highlights: Array.isArray(event.highlights) ? event.highlights : [],
  categories: Array.isArray(event.categories) ? event.categories : [],
  entryFee: {
    pro: event.entryFee?.pro || "TBA",
    visitor: event.entryFee?.visitor || "TBA",
  },
  contact: {
    email: event.contact?.email || "techmnhub.team@gmail.com",
    phone: event.contact?.phone || "",
  },
  registrationDeadline: event.registrationDeadline || "Not announced",
  refundPolicy: event.refundPolicy || "Please check terms before payment",
  tags: Array.isArray(event.tags) ? event.tags : [],
  status: event.status === "closed" ? "closed" : "active",
  ticketTypes: normalizeTicketTypes(event),
  registrationLink:
    event.registrationLink && event.registrationLink !== "/registration-form"
      ? event.registrationLink
      : (event.shortName || "").toLowerCase().includes("zonex")
        ? "/registration-form"
        : `/registration-form/${event._id}`,
});

const UpcomingEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const loadEvents = async () => {
      try {
        const res = await fetch(`${backendURL}/events/public`);
        const data = await res.json();

        if (res.ok && Array.isArray(data)) {
          setEvents(data.map(normalizeEvent));
        } else {
          setEvents([]);
        }
      } catch (error) {
        console.error("Failed to load events:", error);
        setEvents([]);
      } finally {
        setLoading(false);
      }
    };

    loadEvents();
  }, []);

  const openEventDetails = (event) => {
    setSelectedEvent(event);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedEvent(null);
  };

  const renderRegisterAction = (event, className) => {
    if (event.status === "closed") {
      return (
        <button
          type="button"
          className={`${className} opacity-60 cursor-not-allowed`}
          disabled
          title="Registration closed"
        >
          Closed
        </button>
      );
    }

    const link = event.registrationLink || "/registration-form";
    const isExternal = /^https?:\/\//i.test(link);

    if (isExternal) {
      return (
        <a href={link} className="flex-1" target="_blank" rel="noopener noreferrer">
          <button className={className}>Register Now</button>
        </a>
      );
    }

    return (
      <Link to={link} className="flex-1">
        <button className={className}>Register Now</button>
      </Link>
    );
  };

  const displayedEvents = events.length > 0 ? events : [legacyEvent];

  return (
    <>
      <section id="UpcomingEvents" className="py-20 bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-bold uppercase tracking-wider">
              Don&apos;t Miss Out
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-gray-800 mt-6 mb-4">Upcoming Events</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Events shown here are controlled directly from the TechMNHub admin panel.
            </p>
          </div>

          {loading ? (
            <div className="text-center text-gray-600">Loading events...</div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
              {displayedEvents.map((event) => (
                <div
                  key={event.id}
                  className="bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden group border border-gray-100"
                >
                  <div className="bg-gradient-to-r from-blue-600 to-cyan-500 p-6 text-white">
                    <div className="flex justify-between items-start">
                      <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold">
                        {event.day}
                      </span>
                      <span className="bg-yellow-400 text-gray-900 px-3 py-1 rounded-full text-xs font-bold">
                        {event.status === "closed"
                          ? "Closed"
                          : event.id === "legacy-zonex-2026"
                            ? "Limited Slots"
                            : "Active"}
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold mt-4 mb-2 leading-tight">{event.shortName}</h3>
                    <p className="text-white/90 text-sm line-clamp-2">{event.description}</p>
                  </div>

                  <div className="p-6">
                    <div className="space-y-3 mb-6">
                      <div className="flex items-center gap-3 text-gray-600">
                        <Calendar size={18} className="text-blue-600 flex-shrink-0" />
                        <span className="text-sm">{event.date}</span>
                      </div>
                      <div className="flex items-center gap-3 text-gray-600">
                        <Clock size={18} className="text-blue-600 flex-shrink-0" />
                        <span className="text-sm">{event.time}</span>
                      </div>
                      <div className="flex items-start gap-3 text-gray-600">
                        <MapPin size={18} className="text-blue-600 flex-shrink-0 mt-0.5" />
                        <span className="text-sm">{event.venue}, {event.city}</span>
                      </div>
                      <div className="flex items-center gap-3 text-gray-600">
                        <Users size={18} className="text-blue-600 flex-shrink-0" />
                        <span className="text-sm">{event.expectedParticipants} Expected</span>
                      </div>
                      <div className="flex items-center gap-3 text-gray-600">
                        <Trophy size={18} className="text-blue-600 flex-shrink-0" />
                        <span className="text-sm">Prize Pool {event.prizes}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {event.tags.slice(0, 3).map((tag, idx) => (
                        <span key={`${event.id}-tag-${idx}`} className="bg-gray-100 text-gray-700 px-2 py-1 rounded-md text-xs">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3">
                      {renderRegisterAction(
                        event,
                        "w-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-4 py-3 rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300",
                      )}
                      <button
                        onClick={() => openEventDetails(event)}
                        className="flex-1 bg-gray-100 text-gray-700 px-4 py-3 rounded-xl font-semibold hover:bg-gray-200 hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
                      >
                        <Award size={18} />
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {showModal && selectedEvent && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto"
          onClick={closeModal}
        >
          <div
            className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-8 text-white relative">
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 rounded-full p-2 transition-colors"
              >
                <X size={24} />
              </button>

              <span className="bg-yellow-400 text-gray-900 px-4 py-1 rounded-full text-sm font-bold inline-block mb-4">
                {selectedEvent.status === "closed" ? "CLOSED EVENT" : "ACTIVE EVENT"}
              </span>

              <h2 className="text-3xl md:text-4xl font-black mb-4">{selectedEvent.name}</h2>

              <div className="flex flex-wrap gap-4 text-white/90">
                <div className="flex items-center gap-2">
                  <Calendar size={18} />
                  <span>{selectedEvent.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={18} />
                  <span>{selectedEvent.time}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={18} />
                  <span>{selectedEvent.location}</span>
                </div>
              </div>
            </div>

            <div className="p-8">
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">About Event</h3>
                <p className="text-gray-600 leading-relaxed">{selectedEvent.description}</p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-blue-50 p-4 rounded-xl text-center">
                  <Users className="text-blue-600 mx-auto mb-2" size={24} />
                  <span className="block text-2xl font-bold text-gray-800">{selectedEvent.expectedParticipants}</span>
                  <span className="text-sm text-gray-600">Participants</span>
                </div>
                <div className="bg-green-50 p-4 rounded-xl text-center">
                  <Award className="text-green-600 mx-auto mb-2" size={24} />
                  <span className="block text-2xl font-bold text-gray-800">{selectedEvent.skillZones}</span>
                  <span className="text-sm text-gray-600">Skill Zones</span>
                </div>
                <div className="bg-purple-50 p-4 rounded-xl text-center">
                  <Trophy className="text-purple-600 mx-auto mb-2" size={24} />
                  <span className="block text-2xl font-bold text-gray-800">{selectedEvent.prizes}</span>
                  <span className="text-sm text-gray-600">Prize Pool</span>
                </div>
                <div className="bg-yellow-50 p-4 rounded-xl text-center">
                  <Calendar className="text-yellow-600 mx-auto mb-2" size={24} />
                  <span className="block text-sm font-bold text-gray-800">Last Date</span>
                  <span className="text-sm text-gray-600">{selectedEvent.registrationDeadline}</span>
                </div>
              </div>

              {selectedEvent.highlights.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">Event Highlights</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {selectedEvent.highlights.map((item, idx) => (
                      <div key={`${selectedEvent.id}-highlight-${idx}`} className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-green-600 text-sm">✓</span>
                        </div>
                        <span className="text-gray-700">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {selectedEvent.categories.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">Skill Zones and Categories</h3>
                  <div className="flex flex-wrap gap-3">
                    {selectedEvent.categories.map((cat, idx) => (
                      <span
                        key={`${selectedEvent.id}-category-${idx}`}
                        className="bg-gray-100 text-gray-800 px-4 py-2 rounded-full text-sm font-medium"
                      >
                        {cat}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="mb-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Registration Fees</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  {selectedEvent.ticketTypes.map((ticketType) => (
                    <div key={ticketType.key} className="border border-green-200 rounded-xl p-4 text-center bg-green-50">
                      <span className="text-sm text-gray-600">{ticketType.name}</span>
                      <span className="block text-2xl font-bold text-green-600">₹{ticketType.price}</span>
                      <span className="text-xs text-gray-500">{ticketType.appliesTo}</span>
                    </div>
                  ))}
                </div>
                <p className="text-sm text-gray-500 mt-2">{selectedEvent.refundPolicy}</p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-6 rounded-xl">
                  <h4 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                    <MapPin size={18} className="text-blue-600" />
                    Venue
                  </h4>
                  <p className="text-gray-700">{selectedEvent.location}</p>
                </div>
                <div className="bg-gray-50 p-6 rounded-xl">
                  <h4 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                    <Award size={18} className="text-blue-600" />
                    Contact
                  </h4>
                  <p className="text-gray-700">Email: {selectedEvent.contact.email}</p>
                  {selectedEvent.contact.phone && <p className="text-gray-700">Phone: {selectedEvent.contact.phone}</p>}
                </div>
              </div>
            </div>

            <div className="border-t border-gray-200 p-6 flex flex-col sm:flex-row gap-4 justify-end">
              <button
                onClick={closeModal}
                className="px-6 py-3 border border-gray-300 rounded-xl text-gray-700 font-semibold hover:bg-gray-50"
              >
                Close
              </button>
              {renderRegisterAction(
                selectedEvent,
                "px-8 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all",
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UpcomingEvents;
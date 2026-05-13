import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Calendar, MapPin, Clock, Users, Award, Trophy, X } from "lucide-react";
import { MotionItem, MotionSection } from "./ui/MotionSystem";
import { apiRequest } from "../utils/api";

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
  status: "closed",
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

const isPastEventSchedule = (event) => {
  const dateText = String(event?.date || "").trim();
  if (!dateText) return false;

  const timeText = String(event?.time || "").trim();
  const startTime = timeText.split("-")[0].trim();
  const candidate = new Date(`${dateText} ${startTime}`.trim());
  if (Number.isNaN(candidate.getTime())) return false;

  return Date.now() > candidate.getTime();
};

const isEventClosed = (event) => {
  const status = String(event?.status || "").trim().toLowerCase();
  if (status === "published" || status === "active") return false;
  if (status === "coming_soon") return false;
  if (status === "closed") return true;
  if (status && !["published", "active"].includes(status)) return true;
  if (event?.closedAt) return true;
  return isPastEventSchedule(event);
};

const normalizeEvent = (event) => ({
  id: event._id || event.id || `event-${String(event.shortName || event.name || "upcoming").toLowerCase().replace(/\s+/g, "-")}`,
  name: event.name || event.shortName || "Upcoming Event",
  shortName: event.shortName || event.name || "Event",
  date: event.comingSoon ? "Coming Soon" : event.dateLabel || event.date || "Date to be announced",
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
  status: event.comingSoon ? "coming_soon" : isEventClosed(event) ? "closed" : "active",
  comingSoon: Boolean(event.comingSoon),
  displayOptions: event.displayOptions || {},
  closedAt: event.closedAt || null,
  ticketTypes: normalizeTicketTypes(event),
  registrationLink:
    event.registrationLink && event.registrationLink !== "/registration-form"
      ? event.registrationLink
      : (event.shortName || "").toLowerCase().includes("zonex")
        ? "/registration-form"
        : `/registration-form/${event._id}`,
});

const UpcomingEvents = ({ content }) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    let active = true;

    const loadEvents = async () => {
      setLoading(true);

      try {
        const response = await apiRequest("/events/public", { method: "GET" });
        if (!active) return;

        const eventsData = Array.isArray(response.data)
          ? response.data
          : Array.isArray(response.data?.events)
            ? response.data.events
            : Array.isArray(response.data?.value)
              ? response.data.value
              : [];

        if (response.ok && eventsData.length > 0) {
          setEvents(eventsData.map(normalizeEvent));
        } else {
          setEvents([]);
        }
      } catch (error) {
        console.error("Failed to load events:", error);
        if (active) {
          setEvents([]);
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    loadEvents();

    return () => {
      active = false;
    };
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
    if (event.comingSoon || event.status === "coming_soon") {
      return (
        <button
          type="button"
          className={`${className} opacity-60 cursor-not-allowed`}
          disabled
          title="Registration coming soon"
        >
          Coming Soon
        </button>
      );
    }

    if (isEventClosed(event)) {
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

  const fallbackContentEvents =
    Array.isArray(content?.events) && content.events.length > 0
      ? content.events.map(normalizeEvent)
      : [];

  const displayedEvents = events.length > 0
    ? events
    : fallbackContentEvents.length > 0
      ? fallbackContentEvents
      : [legacyEvent];

  return (
    <>
      <MotionSection id="UpcomingEvents" className="py-20 bg-gradient-to-b from-[#0D0D0D] to-[#111111]">
        <div className="max-w-7xl mx-auto px-6">
          <MotionItem className="text-center mb-12">
            <span className="bg-[#D4AF37] text-white px-4 py-1 rounded-full text-sm font-bold uppercase tracking-wider">
              Don&apos;t Miss Out
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-white mt-6 mb-4">Upcoming Events</h2>
            <p className="text-xl text-[#A0A0A0] max-w-3xl mx-auto">
              {content?.subtitle || 'Events shown here are controlled directly from the TechMNHub admin panel.'}
            </p>
          </MotionItem>

          {loading ? (
            <div className="text-center text-[#A0A0A0]">Loading events...</div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
              {displayedEvents.map((event) => (
                <MotionItem
                  key={event.id}
                  hover
                    className="bg-[#111111] rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden group border border-[#D4AF37]/20"
                >
                  <div className="bg-gradient-to-r from-[#D4AF37] to-[#D4AF37] p-6 text-white">
                    <div className="flex justify-between items-start">
                      <span className="bg-[#111111] backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold">
                        {event.day}
                      </span>
                      <span className="bg-yellow-400 text-gray-900 px-3 py-1 rounded-full text-xs font-bold">
                        {event.comingSoon || event.status === "coming_soon"
                          ? "Coming Soon"
                          : isEventClosed(event)
                          ? "Closed"
                          : event.id === "legacy-zonex-2026"
                            ? "Limited Slots"
                            : "Active"}
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold mt-4 mb-2 leading-tight">{event.shortName}</h3>
                    <p className="text-white text-sm line-clamp-2">{event.description}</p>
                  </div>

                  <div className="p-6">
                    <div className="space-y-3 mb-6">
                      <div className="flex items-center gap-3 text-[#A0A0A0]">
                        <Calendar size={18} className="text-[#D4AF37] flex-shrink-0" />
                        <span className="text-sm">{event.date}</span>
                      </div>
                      <div className="flex items-center gap-3 text-[#A0A0A0]">
                        <Clock size={18} className="text-[#D4AF37] flex-shrink-0" />
                        <span className="text-sm">{event.time}</span>
                      </div>
                      <div className="flex items-start gap-3 text-[#A0A0A0]">
                        <MapPin size={18} className="text-[#D4AF37] flex-shrink-0 mt-0.5" />
                        <span className="text-sm">{event.venue}, {event.city}</span>
                      </div>
                      <div className="flex items-center gap-3 text-[#A0A0A0]">
                        <Users size={18} className="text-[#D4AF37] flex-shrink-0" />
                        <span className="text-sm">{event.expectedParticipants} Expected</span>
                      </div>
                      <div className="flex items-center gap-3 text-[#A0A0A0]">
                        <Trophy size={18} className="text-[#D4AF37] flex-shrink-0" />
                        <span className="text-sm">Prize Pool {event.prizes}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {event.tags.slice(0, 3).map((tag, idx) => (
                        <span key={`${event.id}-tag-${idx}`} className="bg-[#D4AF37]/10 text-[#D4AF37] px-2 py-1 rounded-md text-xs">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3">
                      {renderRegisterAction(
                        event,
                        "w-full bg-gradient-to-r from-[#D4AF37] to-[#D4AF37] text-white px-4 py-3 rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300",
                      )}
                      <button
                        onClick={() => openEventDetails(event)}
                        className="flex-1 bg-white/10 text-white px-4 py-3 rounded-xl font-semibold hover:bg-white/15 hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
                      >
                        <Award size={18} />
                        View Details
                      </button>
                    </div>
                  </div>
                </MotionItem>
              ))}
            </div>
          )}
        </div>
      </MotionSection>

      {showModal && selectedEvent && (
        <div
          className="fixed inset-0 bg-[#0D0D0D]/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto"
          onClick={closeModal}
        >
          <div
            className="bg-[#111111] rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-gradient-to-r from-[#D4AF37] to-[#D4AF37] p-8 text-white relative">
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 bg-[#111111] hover:bg-[#111111]/30 rounded-full p-2 transition-colors"
              >
                <X size={24} />
              </button>

              <span className="bg-yellow-400 text-gray-900 px-4 py-1 rounded-full text-sm font-bold inline-block mb-4">
                {selectedEvent.comingSoon || selectedEvent.status === "coming_soon"
                  ? "COMING SOON"
                  : isEventClosed(selectedEvent)
                    ? "CLOSED EVENT"
                    : "ACTIVE EVENT"}
              </span>

              <h2 className="text-3xl md:text-4xl font-black mb-4">{selectedEvent.name}</h2>

              <div className="flex flex-wrap gap-4 text-white">
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
                <h3 className="text-2xl font-bold text-white mb-4">About Event</h3>
                <p className="text-[#A0A0A0] leading-relaxed">{selectedEvent.description}</p>
              </div>

              {selectedEvent.displayOptions?.statsTile !== false && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-[#0D0D0D] border border-[#D4AF37]/15 p-4 rounded-xl text-center">
                  <Users className="text-[#D4AF37] mx-auto mb-2" size={24} />
                  <span className="block text-2xl font-bold text-white">{selectedEvent.expectedParticipants}</span>
                  <span className="text-sm text-[#A0A0A0]">Participants</span>
                </div>
                <div className="bg-[#0D0D0D] border border-emerald-500/25 p-4 rounded-xl text-center">
                  <Award className="text-emerald-400 mx-auto mb-2" size={24} />
                  <span className="block text-2xl font-bold text-white">{selectedEvent.skillZones}</span>
                  <span className="text-sm text-[#A0A0A0]">Skill Zones</span>
                </div>
                <div className="bg-[#0D0D0D] border border-[#D4AF37]/15 p-4 rounded-xl text-center">
                  <Trophy className="text-[#D4AF37] mx-auto mb-2" size={24} />
                  <span className="block text-2xl font-bold text-white">{selectedEvent.prizes}</span>
                  <span className="text-sm text-[#A0A0A0]">Prize Pool</span>
                </div>
                <div className="bg-[#0D0D0D] border border-yellow-500/25 p-4 rounded-xl text-center">
                  <Calendar className="text-yellow-400 mx-auto mb-2" size={24} />
                  <span className="block text-sm font-bold text-white">Last Date</span>
                  <span className="text-sm text-[#A0A0A0]">{selectedEvent.registrationDeadline}</span>
                </div>
              </div>
              )}

              {selectedEvent.displayOptions?.highlightsTile !== false && selectedEvent.highlights.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-2xl font-bold text-white mb-4">Event Highlights</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {selectedEvent.highlights.map((item, idx) => (
                      <div key={`${selectedEvent.id}-highlight-${idx}`} className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-green-600 text-sm">✓</span>
                        </div>
                        <span className="text-[#E5E7EB]">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {selectedEvent.displayOptions?.eligibilityTile !== false && selectedEvent.categories.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-2xl font-bold text-white mb-4">Skill Zones and Categories</h3>
                  <div className="flex flex-wrap gap-3">
                    {selectedEvent.categories.map((cat, idx) => (
                      <span
                        key={`${selectedEvent.id}-category-${idx}`}
                        className="bg-white/10 text-[#E5E7EB] px-4 py-2 rounded-full text-sm font-medium"
                      >
                        {cat}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {selectedEvent.displayOptions?.passesTile !== false && (
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-white mb-4">Registration Fees</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  {selectedEvent.ticketTypes.map((ticketType) => (
                    <div key={ticketType.key} className="border border-emerald-500/25 rounded-xl p-4 text-center bg-[#0D0D0D]">
                      <span className="text-sm text-[#A0A0A0]">{ticketType.name}</span>
                      <span className="block text-2xl font-bold text-green-600">₹{ticketType.price}</span>
                      <span className="text-xs text-[#A0A0A0]">{ticketType.appliesTo}</span>
                    </div>
                  ))}
                </div>
                <p className="text-sm text-[#A0A0A0] mt-2">{selectedEvent.refundPolicy}</p>
              </div>
              )}

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-[#0D0D0D] border border-white/10 p-6 rounded-xl">
                  <h4 className="font-bold text-white mb-3 flex items-center gap-2">
                    <MapPin size={18} className="text-[#D4AF37]" />
                    Venue
                  </h4>
                  <p className="text-[#A0A0A0]">{selectedEvent.location}</p>
                </div>
                <div className="bg-[#0D0D0D] border border-white/10 p-6 rounded-xl">
                  <h4 className="font-bold text-white mb-3 flex items-center gap-2">
                    <Award size={18} className="text-[#D4AF37]" />
                    Contact
                  </h4>
                  <p className="text-[#A0A0A0]">Email: {selectedEvent.contact.email}</p>
                  {selectedEvent.contact.phone && <p className="text-[#A0A0A0]">Phone: {selectedEvent.contact.phone}</p>}
                </div>
              </div>
            </div>

            <div className="border-t border-white/10 p-6 flex flex-col sm:flex-row gap-4 justify-end">
              <button
                onClick={closeModal}
                className="px-6 py-3 border border-white/15 rounded-xl text-white font-semibold hover:bg-white/10"
              >
                Close
              </button>
              {renderRegisterAction(
                selectedEvent,
                "px-8 py-3 bg-gradient-to-r from-[#D4AF37] to-[#D4AF37] text-white rounded-xl font-semibold hover:shadow-lg transition-all",
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UpcomingEvents;

import React from "react";
import {
  GraduationCap,
  School,
  BookOpen,
  Calendar,
  ShoppingBag,
} from "lucide-react";
import { MotionItem, MotionSection } from "./ui/MotionSystem";

const defaultContent = {
  title: "Who Is It For?",
  users: [
  {
    title: "Students",
    description:
      "Build your verified skill profile, earn recognition, and unlock real opportunities.",
  },
  {
    title: "Schools & Colleges",
    description:
      "Showcase student achievements, activities and institutional impact in one unified platform.",
  },
  {
    title: "Institutes / Coaching",
    description:
      "Offer certifications, skill programs and gain verified student reach.",
  },
  {
    title: "Event Organizers",
    description:
      "Host competitions, hackathons and reward talent with verified credentials.",
  },
  {
    title: "Vendors (Coming Soon)",
    description:
      "Support student growth with tools, services and ecosystem partnerships.",
  },
  ],
};

const iconMap = {
  Students: <GraduationCap size={40} />,
  "Schools & Colleges": <School size={40} />,
  "Institutes / Coaching": <BookOpen size={40} />,
  "Event Organizers": <Calendar size={40} />,
  "Vendors (Coming Soon)": <ShoppingBag size={40} />,
};

const WhoIsItFor = ({ content }) => {
  const section = content || defaultContent;

  return (
    <MotionSection className="py-20 bg-[#0D0D0D]">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <MotionItem as="h2" className="text-4xl font-bold text-white mb-12">
          {section.title}
        </MotionItem>

        <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-8">
          {(section.users || defaultContent.users).map((user, index) => (
            <MotionItem
              key={index}
              hover
              className="bg-[#111111] p-6 rounded-2xl border border-[#D4AF37]/15 shadow-[0_18px_45px_rgba(0,0,0,0.34)] transition duration-300 hover:-translate-y-2 hover:border-[#D4AF37]/40 hover:shadow-[0_0_26px_rgba(212,175,55,0.12)]"
            >
              <div className="text-[#D4AF37] mb-4 flex justify-center">
                {iconMap[user.title] || <GraduationCap size={40} />}
              </div>

              <h3 className="text-xl font-semibold text-white mb-2">
                {user.title}
              </h3>

              <p className="text-[#A0A0A0] text-sm">
                {user.description}
              </p>
            </MotionItem>
          ))}
        </div>
      </div>
    </MotionSection>
  );
};

export default WhoIsItFor;

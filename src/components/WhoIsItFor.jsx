import React from "react";
import {
  GraduationCap,
  School,
  BookOpen,
  Calendar,
  ShoppingBag,
} from "lucide-react";

const users = [
  {
    title: "Students",
    description:
      "Build your verified skill profile, earn recognition, and unlock real opportunities.",
    icon: <GraduationCap size={40} />,
  },
  {
    title: "Schools & Colleges",
    description:
      "Showcase student achievements, activities and institutional impact in one unified platform.",
    icon: <School size={40} />,
  },
  {
    title: "Institutes / Coaching",
    description:
      "Offer certifications, skill programs and gain verified student reach.",
    icon: <BookOpen size={40} />,
  },
  {
    title: "Event Organizers",
    description:
      "Host competitions, hackathons and reward talent with verified credentials.",
    icon: <Calendar size={40} />,
  },
  {
    title: "Vendors (Coming Soon)",
    description:
      "Support student growth with tools, services and ecosystem partnerships.",
    icon: <ShoppingBag size={40} />,
  },
];

const WhoIsItFor = () => {
  return (
    <section className="py-20 bg-blue-50">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold text-gray-800 mb-12">
          Who Is It For?
        </h2>

        <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-8">
          {users.map((user, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-2xl shadow-md border hover:shadow-xl hover:border-blue-500 transition duration-300 hover:-translate-y-2"
            >
              <div className="text-blue-600 mb-4 flex justify-center">
                {user.icon}
              </div>

              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {user.title}
              </h3>

              <p className="text-gray-600 text-sm">
                {user.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhoIsItFor;

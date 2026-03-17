import React from "react";

const steps = [
  "Skills",
  "Activities",
  "Proof Upload",
  "Skill Points",
  "Certificates",
  "Rankings",
];

const SkillEcosystemPreview = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold text-gray-800 mb-12">
          Skill Ecosystem Preview
        </h2>

        <div className="flex flex-wrap justify-center items-center gap-4">
          {steps.map((step, index) => (
            <React.Fragment key={index}>
              <div className="bg-blue-600 text-white px-6 py-3 rounded-full shadow-md text-sm font-medium">
                {step}
              </div>

              {index !== steps.length - 1 && (
                <span className="text-blue-400 text-2xl font-bold">→</span>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillEcosystemPreview;

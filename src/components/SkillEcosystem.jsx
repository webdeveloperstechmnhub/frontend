import React from "react";
import { MotionItem, MotionSection } from "./ui/MotionSystem";

const defaultContent = {
  title: "Skill Ecosystem Preview",
  subtitle: "From activity to proof, the system turns student progress into something easy to verify and share.",
  steps: [
  "Skills",
  "Activities",
  "Proof Upload",
  "Skill Points",
  "Certificates",
  "Rankings",
  ],
};

const SkillEcosystemPreview = ({ content }) => {
  const section = content || defaultContent;
  const steps = section.steps || defaultContent.steps;

  return (
    <MotionSection className="py-20 bg-[#111111]">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <MotionItem as="h2" className="text-4xl font-bold text-white mb-12">
          {section.title}
        </MotionItem>
        <MotionItem className="text-[#A0A0A0] max-w-3xl mx-auto mb-10">
          {section.subtitle}
        </MotionItem>

        <div className="flex flex-wrap justify-center items-center gap-4">
          {steps.map((step, index) => (
            <React.Fragment key={step}>
              <MotionItem hover className="bg-[#D4AF37] text-white px-6 py-3 rounded-full shadow-md text-sm font-medium">
                {step}
              </MotionItem>

              {index !== steps.length - 1 && (
                <MotionItem as="span" className="text-[#D4AF37] text-2xl font-bold">
                  →
                </MotionItem>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </MotionSection>
  );
};

export default SkillEcosystemPreview;

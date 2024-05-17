import React from "react";

interface MultiStepHeaderProps {
  currentStep: number;
  totalSteps: number;
}

const MultiStepHeader: React.FC<MultiStepHeaderProps> = ({ currentStep, totalSteps }) => {
  const progressPercentage = (currentStep / totalSteps) * 100;

  return (
    <div className="flex flex-col items-center mb-6">
      <div className="RSPBprogressBar">
        <div
          className="RSPBprogression"
          style={{ width: `${progressPercentage}%` }}
        ></div>
        {Array.from({ length: totalSteps }, (_, index) => (
          <div
            key={index}
            className={`RSPBstep ${index + 1 <= currentStep ? "accomplished" : ""}`}
            style={{ left: `${(index / (totalSteps - 1)) * 100}%` }}
          >
            <div className={`indexedStep ${index + 1 <= currentStep ? "accomplished" : ""}`}>
              {index + 1}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MultiStepHeader;

"use client";

import React from "react";
import { useRouter } from "next/navigation"; // Corrected import to next/navigation

interface MultiStepHeaderProps {
  currentStep: number;
  totalSteps: number;
  userId: string;
}

const MultiStepHeader: React.FC<MultiStepHeaderProps> = ({ currentStep, totalSteps, userId }) => {
  const router = useRouter();
  const progressPercentage = (currentStep / totalSteps) * 100;

  const handleStepClick = (step: number) => {
    const urls = [
      `/thong-tin-ca-nhan?id=${userId}`,
      `/thong-tin-ho-chieu?id=${userId}`,
      `/thong-tin-cong-viec-hien-tai?id=${userId}`,
      `/thong-tin-cong-viec-truoc-day?id=${userId}`,
      `/trinh-do-hoc-van?id=${userId}`,
      `/thong-tin-gia-dinh?id=${userId}`,
      `/thong-tin-du-lich?id=${userId}`,
    ];

    if (step <= currentStep) {
      router.push(urls[step - 1]);
    } else {
      alert("Xin bổ sung thông tin");
    }
  };

  return (
    <div className="flex flex-col p-1 sm:p-1 md:p-2 lg:p-2 items-center mb-6">
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
            onClick={() => handleStepClick(index + 1)}
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

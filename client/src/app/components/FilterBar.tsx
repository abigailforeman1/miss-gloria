"use client";

import React, { Dispatch, SetStateAction } from "react";
import { Service } from "@/lib/sanity.types";

interface filterBarProps {
  services: Service[];
  selectedService: string | null;
  setSelectedService: Dispatch<SetStateAction<string>>;
}

export default function FilterBar({
  services,
  selectedService,
  setSelectedService,
}: filterBarProps) {
  return (
    <div className="flex justify-center text-md font-[family-name:var(--font-inter)] font-medium gap-[20px] text-pink-100 m-[50px]">
      <button
        onMouseEnter={(e) => {
          e.currentTarget.style.opacity = "1";
        }}
        onMouseLeave={(e) => {
          if (selectedService !== "all") {
            e.currentTarget.style.opacity = "0.5";
          }
        }}
        onClick={() => setSelectedService("all")}
        style={{ opacity: `${selectedService === "all" ? "1" : "0.5"}` }}
        className="cursor-pointer	"
      >
        All
      </button>
      {services.map((service: Service) => (
        <button
          key={service._id}
          onClick={() => setSelectedService(service._id)}
          onMouseEnter={(e) => {
            e.currentTarget.style.opacity = "1";
          }}
          onMouseLeave={(e) => {
            if (selectedService !== service._id) {
              e.currentTarget.style.opacity = "0.5";
            }
          }}
          style={{
            opacity: `${selectedService === service._id ? "1" : "0.5"}`,
          }}
          className="cursor-pointer	"
        >
          {service.title}
        </button>
      ))}
    </div>
  );
}

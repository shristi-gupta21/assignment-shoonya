import React from "react";
import { LargeCard } from "../layouts/LargeCard";

export const Body = () => {
  return (
    <div className="w-full max-w-screen-1.5xl mx-auto">
      <LargeCard
        title={"Discover Your Inner Peace"}
        description={
          "Join us for a series of wellness retreats designed to help you find tranquility and rejuvenation."
        }
      />
    </div>
  );
};

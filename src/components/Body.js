import React from "react";
import { LargeCard } from "../layouts/LargeCard";
import { SmallCard } from "../layouts/SmallCard";

export const Body = () => {
  return (
    <div className="w-full max-w-screen-1.5xl mx-auto flex flex-col gap-4">
      <LargeCard
        title={"Discover Your Inner Peace"}
        description={
          "Join us for a series of wellness retreats designed to help you find tranquility and rejuvenation."
        }
      />

      <div></div>

      <div className="flex gap-4 w-full">
        <SmallCard />
        <SmallCard />
        <SmallCard />
      </div>
    </div>
  );
};

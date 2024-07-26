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

      <div className="flex justify-between">
        <div className="flex gap-4">
          <div className=" bg-blue-1000 py-2 px-2 rounded-md">
            <label className="text-white text-sm">Filter by Date</label>
            <select className="bg-transparent">Filter by date</select>
          </div>
          <div className=" bg-blue-1000 py-2 px-2 rounded-md">
            <label className="text-white text-sm">Filter by Type</label>
            <select className="bg-transparent"></select>
          </div>
        </div>
        <div className="w-[25rem]">
          <input
            className="bg-blue-1000 text-white w-full focus:outline-none placeholder:text-white p-2 rounded-md  placeholder:text-sm"
            placeholder="Search retreats by title"
          />
        </div>
      </div>

      <div className="flex gap-4 w-full">
        <SmallCard />
        <SmallCard />
        <SmallCard />
      </div>
    </div>
  );
};

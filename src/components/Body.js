import React, { useState } from "react";
import { LargeCard } from "../layouts/LargeCard";
import { SmallCard } from "../layouts/SmallCard";

export const Body = () => {
  const [selectedDate, setSelectedDate] = useState("Filter by Date");

  const handleChange = (event) => {
    setSelectedDate(event.target.value);
  };
  console.log(selectedDate);
  return (
    <div className="w-full max-w-screen-1.5xl px-4 1.5xl:px-0 mx-auto flex flex-col gap-6">
      <LargeCard
        title={"Discover Your Inner Peace"}
        description={
          "Join us for a series of wellness retreats designed to help you find tranquility and rejuvenation."
        }
      />

      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="sm:flex-row flex flex-col gap-4">
          <select
            onChange={handleChange}
            value={selectedDate}
            className=" text-zinc-600 sm:text-white text-sm bg-gray h-10 border border-dark-gray sm:bg-blue-1000 py-2 px-2 rounded-md flex justify-between focus:outline-none"
          >
            <option>Filter by Date</option>
            <option value="2023-2024">2023-2024</option>
            <option value="2024-2025">2024-2025</option>
          </select>

          <select className=" text-zinc-600 sm:text-white text-sm bg-gray h-10 border border-dark-gray sm:bg-blue-1000 py-2 px-2 rounded-md flex justify-between focus:outline-none">
            <option>Filter by Type</option>
            <option>Option 1</option>
            <option>Option 2</option>
            <option>Option 3</option>
          </select>
        </div>
        <div className="w-full sm:w-[25rem]">
          <input
            className="sm:bg-blue-1000 border border-dark-gray sm:text-white w-full focus:outline-none sm:placeholder:text-white p-2 rounded-md  placeholder:text-sm"
            placeholder="Search retreats by title"
          />
        </div>
      </div>

      <div className="flex flex-col items-center sm:flex-row gap-6 w-full">
        <SmallCard />
        <SmallCard />
        <SmallCard />
      </div>
      <div className="flex gap-6 justify-center items-center">
        <button className="bg-blue-1000 text-white py-3 px-6 rounded-md">
          Previous
        </button>
        <button className="bg-blue-1000 text-white py-3 px-6 rounded-md">
          Next
        </button>
      </div>
    </div>
  );
};

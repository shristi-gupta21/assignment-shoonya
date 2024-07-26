import React from "react";

export const SmallCard = () => {
  return (
    <div className="bg-beige rounded-md w-full p-7 flex flex-col gap-4 text-sm">
      <div className="border border-black rounded-2xl w-40 h-32 ">image</div>
      <p className="text-xl font-semibold">Forest Yoga Retreat </p>
      <span>
        Join us for a rejuvenating yoga retreat in the heart of the forest.
        Experience tranquility and peace.
      </span>
      <p>Date: June 10-15, 2024</p>
      <p>Location: Redwood Forest, CA</p>
      <p>Price: $1200</p>
    </div>
  );
};

import React from "react";

export const LargeCard = ({ title, description }) => {
  return (
    <div className="sm:block hidden w-full bg-beige rounded-md px-8 xl:px-12 pt-4 xl:pt-6 pb-6 xl:pb-8 shadow-md">
      <img
        src="/images/inner-peace.jpeg"
        className=" h-64 w-full object-cover rounded-md"
        alt=""
      />
      <div className=" flex flex-col gap-2 mt-6">
        <p className="text-2xl">{title}</p>
        <span>{description}</span>
      </div>
    </div>
  );
};

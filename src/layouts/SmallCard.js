import React from "react";

export const SmallCard = ({
  title,
  description,
  date,
  location,
  image,
  price,
  duration,
}) => {
  const formatDateRange = (startTimestamp, durationDays) => {
    const startDate = new Date(startTimestamp * 1000);
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + durationDays);

    const options = { year: "numeric", month: "long", day: "numeric" };
    const startDateString = startDate.toLocaleDateString("en-US", options);
    const endDateString = endDate.toLocaleDateString("en-US", {
      day: "numeric",
    });

    return `${
      startDateString.split(",")[0]
    }-${endDateString}, ${startDate.getFullYear()}`;
  };

  return (
    <div className="bg-beige rounded-md w-[21.43rem] sm:min-w-[29rem]  p-4 text-sm h-80 sm:h-72 ">
      <div className=" h-32 w-full sm:w-40">
        <img
          src={image}
          alt=""
          className=" h-32 object-cover w-full rounded-md"
        />
      </div>
      <p className="text-xl mt-2 font-semibold text-ellipsis line-clamp-1">
        {title}
      </p>
      <span className="my-1 text-gray-900 sm:text-black text-ellipsis line-clamp-2">
        {description}
      </span>
      <p className="text-gray-900 sm:text-black">
        Date:
        <span className="pl-1 ">{formatDateRange(date, duration)}</span>
      </p>
      <p className="text-gray-900 sm:text-black">
        Location: <span className="pl-1">{location}</span>
      </p>
      <p className="py-1 sm:py-0 font-semibold sm:font-normal">
        Price: $<span className="pl-1">{price}</span>
      </p>
    </div>
  );
};

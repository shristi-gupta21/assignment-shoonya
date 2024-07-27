import React from "react";

export const SmallCard = ({
  key,
  title,
  description,
  date,
  location,
  image,
  price,
  duration,
}) => {
  console.log(key);
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
    <div
      key={key}
      className="bg-beige rounded-md w-[21.43rem] sm:w-full p-4 text-sm h-72"
    >
      <div className=" h-32 w-full sm:w-40">
        <img
          src={image}
          alt=""
          className=" h-32 object-cover w-full rounded-md"
        />
      </div>
      <p className="text-xl mt-2 font-semibold text-ellipsis line-clamp-1">
        {title}{" "}
      </p>
      <span className="mb-1 text-ellipsis line-clamp-2">{description}</span>
      <p>
        Date:
        {formatDateRange(date, duration)}
      </p>
      <p>Location: {location}</p>
      <p>Price: ${price}</p>
    </div>
  );
};

import React, { useEffect, useState } from "react";
import { LargeCard } from "../layouts/LargeCard";
import { SmallCard } from "../layouts/SmallCard";
import { Footer } from "./Footer";

export const Body = () => {
  const [items, setItems] = useState([]);
  const [originalItems, setOriginalItems] = useState([]);
  const [selectedDate, setSelectedDate] = useState("Filter by Date");
  const [selectedType, setSelectedType] = useState("Filter by Type");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  useEffect(() => {
    const fetchData = async (retryCount = 0) => {
      try {
        const response = await fetch(
          "https://669f704cb132e2c136fdd9a0.mockapi.io/api/v1/retreats"
        );
        if (response.status === 429 && retryCount < 5) {
          setTimeout(() => fetchData(retryCount + 1), 1000 * (retryCount + 1));
          return;
        }
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setItems(data);
        setOriginalItems(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);

  const handleChangeDate = (event) => {
    setSelectedDate(event.target.value);
  };

  const handleChangeType = (event) => {
    setSelectedType(event.target.value);
    let newItems = originalItems.filter(
      (item) => item.type == event.target.value
    );
    setItems(newItems);
    setCurrentPage(1);
  };

  const handleNextPage = () => {
    if (currentPage < Math.ceil(items.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="mb-16 sm:mb-0 w-full">
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
              onChange={handleChangeDate}
              value={selectedDate}
              className=" text-zinc-600 sm:text-white text-sm bg-gray h-10 border border-dark-gray sm:bg-blue-1000 py-2 px-2 rounded-md flex justify-between focus:outline-none"
            >
              <option>Filter by Date</option>
              <option value="2023-2024">2023-2024</option>
              <option value="2024-2025">2024-2025</option>
            </select>

            <select
              onChange={handleChangeType}
              value={selectedType}
              className=" text-zinc-600 sm:text-white text-sm bg-gray h-10 border border-dark-gray sm:bg-blue-1000 py-2 px-2 rounded-md flex justify-between focus:outline-none"
            >
              <option>Filter by Type</option>
              <option value="Signature">Signature</option>
              <option value="Standalone">Standalone</option>
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

        <div className=" flex items-center w-full justify-center mx-auto">
          <div className=" grid grid-rows-3 grid-cols-1 sm:grid-rows-1 sm:grid-cols-3 gap-6">
            {currentItems.map((item) => (
              <SmallCard
                key={item.id}
                title={item.title}
                description={item.description}
                date={item.date}
                location={item.location}
                image={item.image}
                price={item.price}
                duration={item.duration}
              />
            ))}
          </div>
        </div>
        <div className="flex gap-4 sm:gap-6 justify-center items-center">
          <button
            onClick={handlePreviousPage}
            className="bg-blue-1000 text-white py-2 sm:py-3 px-6 rounded-full sm:rounded-md"
          >
            Previous
          </button>
          <button
            onClick={handleNextPage}
            className="bg-blue-1000 text-white py-2 sm:py-3 px-6 rounded-full sm:rounded-md"
          >
            Next
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

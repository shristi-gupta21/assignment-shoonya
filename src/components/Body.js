import React, { useEffect, useState } from "react";
import { LargeCard } from "../layouts/LargeCard";
import { SmallCard } from "../layouts/SmallCard";
import { Footer } from "./Footer";

export const Body = () => {
  const [items, setItems] = useState([]);
  const [originalItems, setOriginalItems] = useState([]);
  const [selectedDate, setSelectedDate] = useState("date");
  const [selectedType, setSelectedType] = useState("type");
  const [searchText, setSearchText] = useState("");
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
    if (selectedType !== "type") {
      filterItems(event.target.value, selectedType, searchText);
    } else {
      filterItems(event.target.value, false, searchText);
    }
    setCurrentPage(1);
  };

  const filterByDateRange = (items, yearRange) => {
    let startYear, endYear;
    if (yearRange === "2023-2024") {
      startYear = 2023;
      endYear = 2023;
    } else if (yearRange === "2024-2025") {
      startYear = 2024;
      endYear = 2024;
    }
    return items.filter((item) => {
      const itemDate = new Date(item.date * 1000);
      const itemYear = itemDate.getFullYear();
      return itemYear >= startYear && itemYear <= endYear;
    });
  };
  const filterItems = (dateRange, type, text) => {
    let filteredItems = originalItems;

    if (dateRange) {
      filteredItems = filterByDateRange(filteredItems, dateRange);
    }

    if (type) {
      filteredItems = filteredItems.filter((item) => item.tag.includes(type));
    }
    if (text) {
      filteredItems = filteredItems.filter((item) =>
        item.title.toLowerCase().includes(text.toLowerCase())
      );
    }
    setItems(filteredItems);
  };

  const handleChangeType = (event) => {
    setSelectedType(event.target.value);
    if (selectedDate !== "date") {
      filterItems(selectedDate, event.target.value, searchText);
    } else {
      filterItems(false, event.target.value, searchText);
    }
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
  const handleSearch = (event) => {
    setSearchText(event.target.value);
    if (selectedDate !== "date") {
      filterItems(selectedDate, false, event.target.value);
    } else if (selectedType !== "type") {
      filterItems(false, selectedType, event.target.value);
    } else if (selectedDate !== "date" && selectedType !== "type") {
      filterItems(selectedDate, selectedType, event.target.value);
    } else {
      filterItems(false, false, event.target.value);
    }
  };
  console.log(searchText);
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
              <option value="date">Filter by Date</option>
              <option value="2023-2024">2023-2024</option>
              <option value="2024-2025">2024-2025</option>
            </select>

            <select
              onChange={handleChangeType}
              value={selectedType}
              className=" text-zinc-600 sm:text-white text-sm bg-gray h-10 border border-dark-gray sm:bg-blue-1000 py-2 px-2 rounded-md flex justify-between focus:outline-none"
            >
              <option value="type">Filter by Type</option>
              <option value="yoga">yoga</option>
              <option value="weight loss">weight loss</option>
              <option value="camp">camp</option>
              <option value="diet">diet</option>
              <option value="weekend">weekend</option>
              <option value="workshop">workshop</option>
              <option value="meditation">meditation</option>
              <option value="fitness">fitness</option>
              <option value="detox">detox</option>
              <option value="cleanse">cleanse</option>
              <option value="pre-natal">pre-natal</option>
              <option value="post-natal">post-natal</option>
              <option value="fitness">fitness</option>
              <option value="mental wellness">mental wellness</option>
              <option value="flexibility">flexibility</option>
              <option value="relaxation">relaxation</option>
              <option value="spiritual growth">spiritual growth</option>
              <option value="pain management">pain management</option>
            </select>
          </div>
          <div className="w-full sm:w-[25rem]">
            <input
              onChange={handleSearch}
              value={searchText}
              className="sm:bg-blue-1000 border border-dark-gray sm:text-white w-full focus:outline-none sm:placeholder:text-white p-2 rounded-md  placeholder:text-sm"
              placeholder="Search retreats by title"
            />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row flex-wrap w-full gap-6 items-center sm:items-start justify-center">
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
        <div className="flex gap-4 sm:gap-6 justify-center items-center">
          <button
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            className="disabled:bg-blue-900 disabled:text-zinc-200 disabled:cursor-not-allowed bg-blue-1000  text-white py-2 sm:py-3 px-6 rounded-full sm:rounded-md"
          >
            Previous
          </button>
          <button
            disabled={currentPage === Math.ceil(items.length / itemsPerPage)}
            onClick={handleNextPage}
            className=" disabled:bg-blue-700 bg-blue-1000 text-white py-2 sm:py-3 px-6 rounded-full sm:rounded-md"
          >
            Next
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

import React, { useEffect, useState } from "react";
import { LargeCard } from "../layouts/LargeCard";
import { SmallCard } from "../layouts/SmallCard";
import { Footer } from "./Footer";

export const Body = () => {
  const [items, setItems] = useState([]);
  const [originalItems, setOriginalItems] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
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
        setSearchText("");
        setSelectedDate("");
        setSelectedLocation("");
        setSelectedType("");
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
    filterItems(event.target.value, selectedType, searchText, selectedLocation);
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
  const filterItems = (dateRange, type, text, location) => {
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
    if (location) {
      filteredItems = filteredItems.filter(
        (item) => item.location === location
      );
    }
    setItems(filteredItems);
  };

  const handleChangeType = (event) => {
    setSelectedType(event.target.value);
    filterItems(selectedDate, event.target.value, searchText, selectedLocation);
    setCurrentPage(1);
  };
  const handleChangeLocation = (event) => {
    setSelectedLocation(event.target.value);
    filterItems(selectedDate, selectedType, searchText, event.target.value);
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
    filterItems(selectedDate, selectedType, event.target.value);
  };
  return (
    <div className="mb-16 sm:mb-0 w-full ">
      <div className="w-full  max-w-screen-1.5xl px-4 1.5xl:px-0 mx-auto flex flex-col gap-6">
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
              <option value="">Filter by Date</option>
              <option value="2023-2024">2023-2024</option>
              <option value="2024-2025">2024-2025</option>
            </select>

            <select
              onChange={handleChangeType}
              value={selectedType}
              className=" text-zinc-600 sm:text-white text-sm bg-gray h-10 border border-dark-gray sm:bg-blue-1000 py-2 px-2 rounded-md flex justify-between focus:outline-none"
            >
              <option value="">Filter by Type</option>
              <option className=" capitalize" value="yoga">
                yoga
              </option>
              <option className=" capitalize" value="weight loss">
                weight loss
              </option>
              <option className=" capitalize" value="camp">
                camp
              </option>
              <option className=" capitalize" value="diet">
                diet
              </option>
              <option className=" capitalize" value="weekend">
                weekend
              </option>
              <option className=" capitalize" value="workshop">
                workshop
              </option>
              <option className=" capitalize" value="meditation">
                meditation
              </option>
              <option className=" capitalize" value="fitness">
                fitness
              </option>
              <option className=" capitalize" value="detox">
                detox
              </option>
              <option className=" capitalize" value="cleanse">
                cleanse
              </option>
              <option className=" capitalize" value="pre-natal">
                pre-natal
              </option>
              <option className=" capitalize" value="post-natal">
                post-natal
              </option>
              <option className=" capitalize" value="fitness">
                fitness
              </option>
              <option className=" capitalize" value="mental wellness">
                mental wellness
              </option>
              <option className=" capitalize" value="flexibility">
                flexibility
              </option>
              <option className=" capitalize" value="relaxation">
                relaxation
              </option>
              <option className=" capitalize" value="spiritual growth">
                spiritual growth
              </option>
              <option className=" capitalize" value="pain management">
                pain management
              </option>
            </select>

            <select
              onChange={handleChangeLocation}
              value={selectedLocation}
              className=" text-zinc-600 sm:text-white text-sm bg-gray h-10 border border-dark-gray sm:bg-blue-1000 py-2 px-2 rounded-md flex justify-between focus:outline-none"
            >
              <option value="">Filter by Location</option>
              <option value="Goa">Goa</option>
              <option value="Rishikesh">Rishikesh</option>
              <option value="Kerala">Kerala</option>
              <option value="Mumbai">Mumbai</option>
              <option value="Chennai">Chennai</option>
              <option value="Delhi">Delhi</option>
              <option value="Varanasi">Varanasi</option>
              <option value="Kolkata">Kolkata</option>
              <option value="Agra">Agra</option>
              <option value="Pune">Pune</option>
              <option value="Hyderabad">Hyderabad</option>
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
          {currentItems.length === 0 && (
            <div className="h-80 text-lg font-semibold flex justify-center items-center">
              <p>No records found</p>
            </div>
          )}
        </div>
        <div className="flex gap-4 sm:gap-6 justify-center items-center">
          <button
            onClick={handlePreviousPage}
            disabled={currentPage <= 1}
            className="disabled:bg-slate-300 disabled:opacity-50 disabled:text-black disabled:cursor-not-allowed bg-blue-1000  text-white py-2  px-6 rounded-full sm:rounded-md"
          >
            Previous
          </button>
          <button
            disabled={
              currentPage === Math.ceil(items.length / itemsPerPage) ||
              Math.ceil(items.length / itemsPerPage) === 0
            }
            onClick={handleNextPage}
            className=" disabled:bg-slate-300 disabled:opacity-50 disabled:text-black disabled:cursor-not-allowed bg-blue-1000 text-white py-2  px-6 rounded-full sm:rounded-md"
          >
            Next
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

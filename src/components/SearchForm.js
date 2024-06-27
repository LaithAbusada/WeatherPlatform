import React, { useContext } from "react";
import { WeatherContext } from "./WeatherContext";

function SearchForm() {
  const { inputCity, setInputCity, setCity } = useContext(WeatherContext);

  function handleKeyPress(e) {
    if (e.key === "Enter") {
      setCity(inputCity.toLowerCase().trim());
      document.getElementById("search").value = "";
    }
  }
  function debounce(func, timeout = 100) {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        func.apply(this, args);
      }, timeout);
    };
  }
  function saveInput(value) {
    setInputCity(value);
  }
  const debouncedSaveInput = debounce(saveInput);

  function handleChange(e) {
    const { value } = e.target;
    debouncedSaveInput(value);
  }

  return (
    <div className="flex justify-center mt-10">
      <input
        id="search"
        className="w-2/3 sm:w-1/4 h-12 p-4 text-center text-white text-lg rounded-full border-4 border-white-600 bg-transparent bg-opacity-50 placeholder-gray-500 focus:outline-none focus:ring-0"
        placeholder="Enter city name"
        onChange={handleChange}
        onKeyPress={handleKeyPress}
      />
    </div>
  );
}

export default SearchForm;

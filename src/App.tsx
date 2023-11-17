import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button } from "./components/Button";
import SearchBar from "./components/SearchBar";
import Spinner from "./components/Spinner";
import MainCard from "./components/card/MainCard";
import { SearchWeather, SearchWeatherForecast } from "./utils/ApiCalls";

function App() {
  const [searchParams, setSearchParams] = useState<string>("");
  const [data, setData] = useState<any>();
  const [forecastData, setForecastData] = useState<any>();

  const showErrorToast = () => toast.error("Couldn't find the city!");

  const SearchWeatherData = () => {
    SearchWeather({ searchParams, setData, showErrorToast });
    SearchWeatherForecast({
      searchParams,
      setData: setForecastData,
      showErrorToast,
    });
    setSearchParams("");
  };

  useEffect(() => {
    SearchWeather({ searchParams: "Dhaka", setData, showErrorToast });
    SearchWeatherForecast({
      searchParams: "Dhaka",
      setData: setForecastData,
      showErrorToast,
    });
  }, []);

  useEffect(() => {
    console.log(forecastData);
  }, [forecastData]);

  return (
    <div className="min-h-screen mt-10 max-w-4xl mx-auto">
      <div className="flex space-x-4 items-center w-full">
        <div className="flex-1">
          <SearchBar val={searchParams} setVal={setSearchParams} />
        </div>
        <Button title="Search" onClick={SearchWeatherData} />
      </div>
      <div className="flex justify-center mt-10">
        {!data ? (
          <Spinner />
        ) : (
          // Main Card
          <MainCard data={data} />
        )}
      </div>
      <ToastContainer />
    </div>
  );
}

export default App;

import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button } from "./components/Button";
import SearchBar from "./components/SearchBar";
import Spinner from "./components/Spinner";
import ForecastDataCard from "./components/card/ForecastDataCard";
import MainCard from "./components/card/MainCard";
import LineChartComponent from "./components/charts/LineChart";
import { SearchWeather, SearchWeatherForecast } from "./utils/ApiCalls";
import { ConvertToChartData, ConvertToForecastData } from "./utils/functions";
import { ChartDataType, ForeCastDataType } from "./utils/interface";

function App() {
  const [searchParams, setSearchParams] = useState<string>("");
  const [data, setData] = useState<any>();
  const [forecastData, setForecastData] = useState<any>();
  const [chartData, setChartData] = useState<ChartDataType[]>();
  const [filteredForecastData, setFilteredForecastData] =
    useState<ForeCastDataType[]>();

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
    // console.log(forecastData);
    if (forecastData) {
      ConvertToChartData(forecastData, setChartData);
      ConvertToForecastData(forecastData, setFilteredForecastData);
    }
  }, [forecastData]);

  return (
    <div className="min-h-screen pt-10 max-w-7xl mx-auto flex flex-col px-2 lg:px-0">
      <div className="flex space-x-4 items-center min-w-fit max-w-2xl justify-center mx-auto">
        <div className="">
          <SearchBar val={searchParams} setVal={setSearchParams} />
        </div>
        <Button title="Search" onClick={SearchWeatherData} />
      </div>
      <div className="flex justify-center mt-10">
        {!data ? (
          <Spinner />
        ) : (
          // Main Card
          <div className="space-x-4">
            <MainCard data={data} />
          </div>
        )}
      </div>

      {/* Line Chart */}
      <div className="">
        <LineChartComponent data={chartData!} />
      </div>

      {/* Forecast Data */}
      <ForecastDataCard data={filteredForecastData!} />
      <ToastContainer />
    </div>
  );
}

export default App;

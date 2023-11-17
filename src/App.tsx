import axios from "axios";
import { useEffect, useState } from "react";
import Spinner from "./components/Spinner";

function App() {
  const [currentLat, setCurrentLat] = useState<number>(23.7644025);
  const [currentLong, setCurrentLong] = useState<number>(90.389015);

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_API_GEO}q=London&limit=1&appid=${process.env.REACT_APP_API_KEY}`
      )
      .then((res) => {
        console.log(res.data);
        setCurrentLat(res.data[0].lat);
        setCurrentLong(res.data[0].lon);
      });
  }, []);

  useEffect(() => {
    console.log(currentLat, currentLong);
  }, [currentLat, currentLong]);
  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <div className="my-4 h-40 w-40 bg-white rounded-md opacity-20 shadow-lg shadow-black">
        <Spinner />
      </div>
      <p className="text-3xl font-bold underline">Hello world!</p>
    </div>
  );
}

export default App;

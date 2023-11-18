import { useEffect, useState } from "react";
import { GetTimeAndDate } from "../utils/functions";

type Props = {
  offset: number;
};

const CurrentDateAndTime = ({ offset }: Props) => {
  const [formattedDate, setFormattedDate] = useState("");

  useEffect(() => {
    // Update the date initially
    GetTimeAndDate(setFormattedDate, offset);

    // Set up a timer to update the date every second (adjust as needed)
    const intervalId = setInterval(
      () => GetTimeAndDate(setFormattedDate, offset),
      1000
    );

    // Clear the interval on component unmount to avoid memory leaks
    return () => clearInterval(intervalId);
  }, [offset]);

  return (
    <div>
      <p>{formattedDate}</p>
    </div>
  );
};

export default CurrentDateAndTime;

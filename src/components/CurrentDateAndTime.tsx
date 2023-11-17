import { useEffect, useState } from "react";

const CurrentDateAndTime = () => {
  const [formattedDate, setFormattedDate] = useState("");

  useEffect(() => {
    const updateDate = () => {
      const currentDate = new Date();
      // Example: Add 1 hour to the current time
      currentDate.setHours(currentDate.getHours() + 1);

      // Format the date as "MMM DD, hh:mma"
      const month = new Intl.DateTimeFormat("en-US", { month: "short" }).format(
        currentDate
      );
      const day = currentDate.getDate();

      const timeOptions = {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      } as Intl.DateTimeFormatOptions;
      const formattedTime = currentDate.toLocaleString("en-US", timeOptions);

      const formattedDate = `${month} ${day}, ${formattedTime}`;

      setFormattedDate(formattedDate);
    };

    // Update the date initially
    updateDate();

    // Set up a timer to update the date every second (adjust as needed)
    const intervalId = setInterval(updateDate, 1000);

    // Clear the interval on component unmount to avoid memory leaks
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div>
      <p>{formattedDate}</p>
    </div>
  );
};

export default CurrentDateAndTime;

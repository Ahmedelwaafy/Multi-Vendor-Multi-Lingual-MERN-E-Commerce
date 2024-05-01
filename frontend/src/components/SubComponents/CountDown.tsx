import axios from "axios";
import React, { useEffect, useState } from "react";
type timeLeft = {
  days?: number;
  hours?: number;
  minutes?: number;
  seconds?: number;
};
const CountDown = ({ data }: { data: { _id: number; finish_Date: Date } }) => {
  const [timeLeft, setTimeLeft] = useState<timeLeft>(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    if (
      typeof timeLeft?.days === "undefined" &&
      typeof timeLeft?.hours === "undefined" &&
      typeof timeLeft?.minutes === "undefined" &&
      typeof timeLeft?.seconds === "undefined"
    ) {
      //axios.delete(`${server}/event/delete-shop-event/${data._id}`);
    }
    return () => clearTimeout(timer);
  });

  function calculateTimeLeft() {
    const difference = +new Date(data.finish_Date) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  }

  const timerComponents = Object.keys(timeLeft).map((interval:string) => {
    if (!timeLeft[interval]) {
      return null;
    }

    return (
      <span className="text-[25px] text-accent">
        {timeLeft[interval]} {interval}{" "}
      </span>
    );
  });

  return (
    <div>
      {timerComponents.length ? (
        timerComponents
      ) : (
        <span className="text-error text-[25px]">Time's Up</span>
      )}
    </div>
  );
};

export default CountDown;

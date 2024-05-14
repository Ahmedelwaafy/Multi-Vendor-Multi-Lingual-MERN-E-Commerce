import { usePostData } from "@/Hooks/useAxios";
import { PUBLIC } from "@/Utilities/Constants/Queries";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
type timeLeft = {
  days?: number;
  hours?: number;
  minutes?: number;
  seconds?: number;
};
const CountDown = ({ data }: { data: { _id: number; endDate: Date } }) => {
  const [timeLeft, setTimeLeft] = useState<timeLeft>(calculateTimeLeft());
  const [requestSent, setRequestSent] = useState(false);
  const queryClient = useQueryClient();

  const { mutate } = usePostData(false, () => {
    window.location.reload();
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    if (
      typeof timeLeft?.days === "undefined" &&
      typeof timeLeft?.hours === "undefined" &&
      typeof timeLeft?.minutes === "undefined" &&
      typeof timeLeft?.seconds === "undefined" &&
      !requestSent
    ) {
      mutate({
        api: import.meta.env.VITE_DELETE_EXPIRED_EVENT,
        data: { eventId: data?._id },
        method: "DELETE",
      });
      setRequestSent(true);
    }
    return () => clearTimeout(timer);
  }, [
    timeLeft.days,
    timeLeft.hours,
    timeLeft.minutes,
    timeLeft.seconds,
    requestSent,
    mutate,
    data._id,
  ]);

  function calculateTimeLeft() {
    const difference = +new Date(data?.endDate) - +new Date();
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

  const timerComponents = Object.keys(timeLeft).map((interval: string) => {
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

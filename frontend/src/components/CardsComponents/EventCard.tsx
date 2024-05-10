import { IEventType } from "@/types/CardsTypes";
import { CountDown, ProductPrice } from "../SubComponents";
import { cn } from "@/lib/utils";
import { TFunction } from "i18next";

function EventCard({
  event,
  t,
  className,
}: {
  event: IEventType;
  t: TFunction;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "w-full grid grid-cols-2 md:grid-cols-1 gap-10 ",
        className
      )}
    >
      <div className="event__left w-full  ">
        <img
          className="w-10/12 sm:w-full object-cover max-w-[550px]"
          src={event?.images?.[0]?.url}
          alt={event?.name}
        />
      </div>
      <div className="event__right w-full flex flex-col justify-center ">
        <h3 className="text-3xl font-semibold sm:text-center">{event?.name}</h3>
        <h3 className="text-lg opacity-70 text-justify">
          {event?.description}
        </h3>
        <ProductPrice product={event} t={t} />
        <CountDown data={{ _id: event?._id, endDate: event?.endDate }} />
      </div>
    </div>
  );
}

export default EventCard;

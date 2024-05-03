import { IEventType } from "@/types/CardsTypes";
import { CountDown } from "../SubComponents";
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
        <div className="event__price--sold mt-4 flex justify-between items-center mb-6">
          <h6 className="event__price--original text-lg font-semibold">
            {t("event_card.count_formatted", {
              count: event?.original_price,
            })}
            $
            {event?.discount_Price && (
              <sup className="event__price--discount line-through mx-1 text-accent">
                {t("event_card.count_formatted", {
                  count: event?.discount_Price,
                })}
                $
              </sup>
            )}
          </h6>
          <p className="event__sold text-sm text-accent font-semibold">
            {t("event_card.count_formatted", {
              count: event?.sold_out,
              context: "sold",
            })}
          </p>
        </div>
        <CountDown data={{ _id: event?.id, finish_Date: event?.finish_Date }} />
      </div>
    </div>
  );
}

export default EventCard;

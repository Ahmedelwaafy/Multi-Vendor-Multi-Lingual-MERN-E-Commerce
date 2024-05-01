import { IEventType } from "@/types/CardsTypes";
import { CountDown } from "../SubComponents";

function EventCard({ event, t }: { event: IEventType; t: TFunction }) {
  return (
    <div className="w-full flex items-center md:flex-col gap-10">
      <div className="event__left w-1/2 md:w-full  ">
        <img
          className="w-10/12  object-cover   max-w-[550px]"
          src={event?.images?.[0]?.url}
          alt={event?.name}
        />
      </div>
      <div className="event__right w-1/2 md:w-full flex flex-col justify-center ">
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

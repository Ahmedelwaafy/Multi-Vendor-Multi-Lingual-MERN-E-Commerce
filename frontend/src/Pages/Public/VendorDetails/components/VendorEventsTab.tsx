import { EventCard } from "@/components/CardsComponents";
import { events } from "@/constants";
import { TFunction } from "i18next";
import { useParams } from "react-router-dom";

function VendorEventsTab({ t }: { t: TFunction }) {
  const { vendorID } = useParams();

  return (
    <ul className="!w-full space-y-8 bg-red-4 00">
      {events?.length === 0 ? (
        <p className="text-center mt-10">{t("no_events")}</p>
      ) : (
        events?.map((event) => (
          <EventCard
            className="border shadow-md p-5 odd:bg-gray-100 xl:grid-cols-1"
            t={t}
            event={event}
          />
        ))
      )}
    </ul>
  );
}

export default VendorEventsTab;

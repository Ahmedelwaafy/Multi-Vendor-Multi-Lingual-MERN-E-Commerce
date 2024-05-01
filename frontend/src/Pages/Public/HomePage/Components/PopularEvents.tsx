import { IEventType } from "@/types/CardsTypes";
import { TFunction } from "i18next";
import { EventCard } from "@/components/CardsComponents";
import { Container, HeadingTwo } from "@/components/MainComponents";

type props = {
  title: string;
  event: IEventType;
  t: TFunction;
};
function PopularEvents({ title, event, t }: props) {
  return (
    <section className="bg-gray-200 py-10">
      <Container >
        <HeadingTwo className=" text-secondary text- mb-7">
          {title ?? ""}
        </HeadingTwo>
        <EventCard t={t} event={event} />
      </Container>
    </section>
  );
}

export default PopularEvents;

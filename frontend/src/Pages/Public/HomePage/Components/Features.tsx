import { Container } from "@/components/MainComponents";
import {
  faHandHoldingDollar,
  faGift,
  faStore,
  faTruckFast,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { TFunction } from "i18next";

function Features({ t }: { t: TFunction }) {
  const data = [faTruckFast, faGift, faHandHoldingDollar, faStore];
  return (
    <Container>
      <ul className="grid grid-cols-4 2xl:grid-cols-2 md:grid-cols-1 md:justify-items-center gap-7 bg-muted  w-full min-h-40 py-5 rounded-3xl">
        {data?.map((item, index) => (
          <li className="flex-center gap-5 group select-none md:min-w-[220px]  md:w-fit md:justify-start">
            <FontAwesomeIcon
              className="text-2xl group-hover:animate-wiggle-more"
              icon={item}
            />{" "}
            <div>
              <h3 className="font-bold">{t(`Features.${index}.title`)}</h3>
              <h4 className="text-sm opacity-70">
                {t(`Features.${index}.sub_title`)}
              </h4>
            </div>
          </li>
        ))}
      </ul>
    </Container>
  );
}

export default Features;

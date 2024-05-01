import { Container } from "@/components/MainComponents";
import {
  faCartArrowDown
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Features() {
  return (
    <Container>
      <ul className="grid grid-cols-4 2xl:grid-cols-2 md:grid-cols-1 gap-7 bg-muted  w-full min-h-40 py-5 rounded-3xl">
        <li className="flex-center gap-5 group select-none">
          <FontAwesomeIcon
            className="text-2xl group-hover:animate-wiggle-more"
            icon={faCartArrowDown}
          />{" "}
          <div>
            <h3 className="font-bold">Free Shipping</h3>
            <h4 className="text-sm opacity-70">From all orders over 1000$</h4>
          </div>
        </li>
        <li className="flex-center gap-5 group select-none">
          <FontAwesomeIcon
            className="text-2xl group-hover:animate-wiggle-more"
            icon={faCartArrowDown}
          />{" "}
          <div>
            <h3 className="font-bold">Free Shipping</h3>
            <h4 className="text-sm opacity-70">From all orders over 1000$</h4>
          </div>
        </li>
        <li className="flex-center gap-5 group select-none">
          <FontAwesomeIcon
            className="text-2xl group-hover:animate-wiggle-more"
            icon={faCartArrowDown}
          />{" "}
          <div>
            <h3 className="font-bold">Free Shipping</h3>
            <h4 className="text-sm opacity-70">From all orders over 1000$</h4>
          </div>
        </li>
        <li className="flex-center gap-5 group select-none">
          <FontAwesomeIcon
            className="text-2xl group-hover:animate-wiggle-more"
            icon={faCartArrowDown}
          />{" "}
          <div>
            <h3 className="font-bold">Free Shipping</h3>
            <h4 className="text-sm opacity-70">From all orders over 1000$</h4>
          </div>
        </li>
      </ul>
    </Container>
  );
}

export default Features;

import useDebounce from "@/Hooks/useDebounce";
import { cn } from "@/lib/utils";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

function NavSearch({
  placeholder,
  className,
  lng,
}: {
  placeholder: string;
  lng: string;
  className?: string;
}) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [filteredText, setFilteredText] = useState(
    searchParams.get("q")?.replace(/-/g, " ") || ""
  );
  const debouncedFilteredText = useDebounce(filteredText);
  useEffect(() => {
    if (debouncedFilteredText) {
      //TODO: call search api
    }
  }, [debouncedFilteredText]);
  const [togglePlaceholder, setTogglePlaceholder] = useState(true);

  function handleTyping(e: React.KeyboardEvent<HTMLInputElement>) {
    const Target = e.target as HTMLInputElement;

    if (e.key === "Enter" && Target.value !== "") {
      navigate(`/${lng}/products?q=${Target.value?.replace(/\s/g, "-")}`);
    }
  }
  useEffect(() => {
    if (searchParams.get("q") === "" || !searchParams.get("q")) {
      setFilteredText("");
      setTogglePlaceholder(true);
    } else {
      setFilteredText(searchParams.get("q")?.replace(/-/g, " ") || "");
    }
  }, [searchParams]);

  return (
    <div className={cn("w-[500px] lg:w-[330px] h-10", className)}>
      <label
        className="relative h-full w-full text-primary"
        htmlFor="NavSearch"
      >
        <div
          className={` pointer-events-none trns flex-center nav__search--placeholder absolute inset-0  gap-2 min-w-full min-h-full `}
        >
          <Link
            className={`w-5 max-w-[20px] max-h-[20px] pointer-events-auto trns ${
              filteredText || !togglePlaceholder
                ? "-translate-x-[110px] lg:-translate-x-7 rtl:translate-x-[110px]  rtl:lg:translate-x-7"
                : " "
            } `}
            to={
              debouncedFilteredText
                ? `/${lng}/products?q=${(
                    debouncedFilteredText as string
                  )?.replace(/\s/g, "-")}`
                : `/${lng}/products`
            }
          >
            <FontAwesomeIcon
              className="w-full max-w-full max-h-full "
              icon={faMagnifyingGlass}
            />
          </Link>
          <span
            className={`  w-fit trns font- ${
              filteredText || !togglePlaceholder
                ? "opacity-0 translate-x-14 rtl:-translate-x-14"
                : "opacity-50 "
            }`}
          >
            {placeholder}
          </span>
        </div>
        <input
          className="w-full h-full dark-bg-inputs shadow-muted focus:shadow-muted text-center pl-11 lg:pl-9 rtl:pl-4 rtl:lg:pl-1 rtl:pr-11 rtl:lg:pr-9 !text-primary rounded-full"
          type="search"
          onKeyUp={handleTyping}
          value={filteredText}
          onFocus={() => setTogglePlaceholder(false)}
          onBlur={() => {
            if (!filteredText) setTogglePlaceholder(true);
          }}
          onChange={(e) => setFilteredText(e.target.value)}
          name="NavSearch"
          autoComplete="off"
          id="NavSearch"
        />
      </label>
    </div>
  );
}

export default NavSearch;

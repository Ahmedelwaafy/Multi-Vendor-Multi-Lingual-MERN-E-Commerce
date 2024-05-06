import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { IComboBoxProps } from "@/types";
import { faCheck, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { ScrollArea } from "../ui/scroll-area";

export default function ComboBox({
  className = "w-full",
  setSearchParams,
  searchParams,
  stateName,
  placeholder,
  data,
  light = false,
  NotFoundMessage = "No data found",
  getDefaultValueFromURL,
  selectBox,
  isSuccess,
  callBcFn,
}: IComboBoxProps) {
  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState("");
  const { setValue } = useFormContext();

  useEffect(() => {
    if (isSuccess) {
      setSelectedItem("");
    }
  }, [isSuccess]);

  useEffect(() => {
    if (data && searchParams) {
      const name = data?.find(
        (item) =>
          Number(item.id) ===
          Number(searchParams.get(`${getDefaultValueFromURL}`))
      )?.name;

      if (name) {
        //!to handle the case if the user enters in the url an id tat doesn't exist, so it prevents setting the value to undefined or ull
        setSelectedItem(name.toLowerCase());
      } else setSelectedItem(null);
    }
  }, [data, getDefaultValueFromURL, searchParams]);

  const { i18n } = useTranslation();

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        //! here we control the shadow
        className={cn(
          ` transition-shadow w-full ${
            open ? "shadow-[0_0_0_2px]" : "shadow-[0_0_0_1px]"
          } shadow-input  rounded-[6px] overflow-hidden h-10 outline-none`,
          className
        )}
      >
        <div
          //! here we control the background

          className={`selected-item text-base flex outline-none round justify-between w-full px-3 items-center gap-5 ${
            light ? "bg-background" : " bg-transparent"
          }  w-full h-full  cursor-pointer  ${
            selectedItem ? "text-input" : "text-input  "
          }`}
        >
          <span
            className={` grow text-start ${
              selectedItem ? "opacity-100" : " opacity-50 "
            }`}
          >
            {selectedItem
              ? data?.find((item) => item?.name?.toLowerCase() === selectedItem)
                  ?.name
              : placeholder}
          </span>
          <FontAwesomeIcon
            className={`transition-all text-[0.9rem] max-w-[20px] max-h-[20px] duration-200 ease-in-out ${
              selectedItem ? "opacity-100" : "opacity-50"
            } ${open ? "rotate-180" : "rotate-0"}`}
            icon={faChevronDown}
          />
        </div>
      </PopoverTrigger>
      <PopoverContent className="PopoverContent  p-0">
        <Command
          className={` ${
            light
              ? "bg-background border-primary "
              : "bg-background border-background"
          }`}
        >
          <div
            className={`search-wrapper ${
              selectBox ? "h-0 opacity-0 pointer-events-none " : "h-12 "
            }  w-full   ${
              light ? "bg-background justify-" : "bg-background justify-"
            } `}
          >
            <CommandInput
              className={` placeholder:text-input placeholder:opacity-50 placeholder:font-medium rounded-[6px] text-foreground`}
              autoFocus={light ? false : true}
              placeholder={`${
                i18n?.language === "ar" ? "ابحث ..." : "Search ..."
              } `}
            />
          </div>
          <CommandEmpty>
            {i18n?.language === "ar" ? "لا يوجد نتائج" : NotFoundMessage}
          </CommandEmpty>{" "}
          <ScrollArea className="max-h-72 overflow-y-auto">
            <CommandGroup className="">
              {data?.map((item) => (
                <CommandItem
                  className={`   hover:bg-input 
                text-input  ${
                  light
                    ? "aria-selected:bg-input aria-selected:text-background"
                    : "aria-selected:bg-input aria-selected:text-background"
                } ${
                    selectedItem === item?.name?.toLowerCase()
                      ? "bg-input text-background"
                      : "pl-8 rtl:pl-0 rtl:pr-8"
                  } `}
                  key={item?.id}
                  value={item?.name}
                  onSelect={(currentValue) => {
                    //!it converts to lower case by default
                    setSelectedItem(
                      currentValue === selectedItem ? "" : currentValue
                    );
                    setValue && setValue(stateName, item?.id);
                    setSearchParams &&
                      setSearchParams((params) => {
                        params.set("srt", item?.id);
                        return params;
                      });
                    callBcFn && callBcFn(item?.id);
                    setOpen(false);
                  }}
                >
                  {selectedItem === item?.name?.toLowerCase() && (
                    <FontAwesomeIcon
                      className={cn("mr-2 rtl:mr-0 rtl:ml-2 h-4 w-4")}
                      icon={faCheck}
                    />
                  )}

                  {item?.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </ScrollArea>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

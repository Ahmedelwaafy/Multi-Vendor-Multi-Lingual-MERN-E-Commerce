import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { DateRange } from "react-day-picker";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar, faCalendarDays } from "@fortawesome/free-solid-svg-icons";

export default function DateRangePicker({
  date,
  setDate,
  className,
  lng,
  disabled,
}: {
  date: DateRange | undefined;
  setDate: React.Dispatch<React.SetStateAction<DateRange | undefined>>;
  lng: string;
  disabled?: any;
  className?: string;
}) {
  return (
    <div className={cn("!grid gap-2 w-full", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <button
            id="date"
            className={cn(
              "w-full inline-flex justify-start items-center gap-2 rounded-md border-none shadow-[0_0_0_1px] focus:shadow-[0_0_0_2px] hover:scale-100 hover:rounded-md focus:outline-none focus:border-none h-10 min-h-[40px] px-3 truncate sm:text-sm ",
              !date && ""
            )}
          >
            <FontAwesomeIcon
              className={`shrink-0 ${!date && "opacity-50"}`}
              icon={faCalendarDays}
            />{" "}
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span className={`shrink-0 ${!date && "opacity-50"}`}>
                {lng === "ar" ? "اختر تاريخ" : "Pick a date"}
              </span>
            )}
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
            disabled={disabled}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}

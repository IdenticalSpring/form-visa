"use client";

import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import Calendar, { CalendarProps } from "react-calendar";
import "react-calendar/dist/Calendar.css";

interface Props extends CalendarProps {
  date: Date | undefined;
  setDate: (date: Date) => void;
}

export function DatePicker2({
  date,
  setDate,
  activeStartDate,
  ...rest
}: Props) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "custom-date-picker w-full justify-start", // Ensure button content is left-aligned
            !date && "text-muted-foreground"
          )}
          style={{ borderWidth: "1px", borderColor: "#3b6b87" }} // Ensure border style
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? (
            format(date || new Date(), "yyyy-MM-dd")
          ) : (
            <span>Chọn ngày</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          onChange={(date) => setDate((date ?? new Date())! as Date)}
          locale="vi"
          value={date}
          {...rest}
        />
      </PopoverContent>
    </Popover>
  );
}

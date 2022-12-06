import { Interval } from "luxon";
import { CalendarImage } from "./CalendarImage";

export type CalendarConfig = {
  interval: Interval;
  locale: string;
  images: CalendarImage[];
};

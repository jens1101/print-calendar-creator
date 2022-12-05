import { DateTime, Info, Interval } from "luxon";
import React from "react";

export const CalendarPreview = React.forwardRef(function (
  props: {
    locale: string;
    interval: Interval;
  },
  ref: React.Ref<any>
) {
  const renderCalendars = () => {
    return [...new Array(props.interval.count("months"))].map((_, index) => (
      <div className={"sheet text-bg-light"} key={`month-${index}`}>
        {renderCalendar(props.interval.start.plus({ month: index }))}
      </div>
    ));
  };

  const renderCalendar = (monthStartDate: DateTime) => {
    const weekdays = Info.weekdays("long", { locale: props.locale });

    return weekdays.join();
  };

  return (
    <div className={"d-flex flex-column"} ref={ref}>
      {renderCalendars()}
    </div>
  );
});

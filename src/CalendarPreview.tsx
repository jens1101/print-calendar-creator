import { DateTime, Info, Interval } from "luxon";
import React from "react";

export function CalendarPreview(props: { interval: Interval; locale: string }) {
  const renderCalendars = () => {
    return [...new Array(props.interval.count("months"))].map((_, index) => {
      const monthStartDate = props.interval.start.plus({ month: index });
      return (
        <div key={`month-${index}`} className={"sheet text-bg-light"}>
          <h1 className={"text-center"}>
            {monthStartDate.toFormat("MMMM yyyy", { locale: props.locale })}
          </h1>
          {renderMonthTable(monthStartDate)}
        </div>
      );
    });
  };

  const renderMonthTable = (monthStartDate: DateTime) => {
    const weekdays = Info.weekdays("long", { locale: props.locale });
    const monthInterval = Interval.fromDateTimes(
      monthStartDate,
      monthStartDate.endOf("month")
    );

    return (
      <table className={"table table-bordered calendar-month"}>
        <thead>
          <tr>
            {weekdays.map((weekday) => (
              <th
                key={weekday}
                className={"small"}
                style={{
                  width: `${(100 / weekdays.length).toFixed(4)}%`,
                }}
              >
                {weekday}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {[...new Array(monthInterval.count("weeks"))].map((_, weekIndex) => (
            <tr key={`week-${weekIndex}`}>
              {weekdays.map((_, weekdayIndex) => {
                const day = monthStartDate
                  .plus({ week: weekIndex })
                  .set({ weekday: weekdayIndex + 1 });

                return (
                  <td key={`week-${weekIndex}-${weekdayIndex}`}>
                    <div
                      className={`calendar-month__day ${
                        monthInterval.contains(day) ? "" : "small text-muted"
                      }`}
                    >
                      {day.toFormat("d", { locale: props.locale })}
                    </div>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div className={"d-flex flex-column calendar-preview"}>
      {renderCalendars()}
    </div>
  );
}

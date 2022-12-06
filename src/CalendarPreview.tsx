import { DateTime, Info, Interval } from "luxon";
import React from "react";
import { CalendarConfig } from "./CalendarConfig";
import { CalendarImage } from "./CalendarImage";

export function CalendarPreview(props: { config: CalendarConfig }) {
  const renderCalendars = () => {
    return [...new Array(props.config.interval.count("months"))].map(
      (_, index) => {
        const monthStartDate = props.config.interval.start.plus({
          month: index,
        });

        const image: CalendarImage | undefined = props.config.images[index];

        return (
          <div
            key={`month-${index}`}
            className={"sheet text-bg-light d-flex flex-column"}
          >
            {!!image && (
              <div className={"flex-grow-1 mb-2 overflow-hidden"}>
                <img
                  src={image.objectUrl}
                  alt={image.name}
                  className={"image-fill-cover"}
                />
              </div>
            )}

            <h1 className={"text-center mb-2"}>
              {monthStartDate.toFormat("MMMM yyyy", {
                locale: props.config.locale,
              })}
            </h1>

            {renderMonthTable(monthStartDate)}
          </div>
        );
      }
    );
  };

  const renderMonthTable = (monthStartDate: DateTime) => {
    const weekdays = Info.weekdays("long", { locale: props.config.locale });
    const monthInterval = Interval.fromDateTimes(
      monthStartDate,
      monthStartDate.endOf("month")
    );

    return (
      <table className={"table table-bordered calendar-month m-0"}>
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
                      {day.toFormat("d", { locale: props.config.locale })}
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

import React, { Fragment, useRef, useState } from "react";
import { ConfigForm } from "./ConfigForm";
import { Container } from "react-bootstrap";
import "./styles.css";
import { DateTime, Interval, Settings } from "luxon";
import { CalendarPreview } from "./CalendarPreview";
import { useReactToPrint } from "react-to-print";

function App() {
  const [interval, setInterval] = useState(
    Interval.fromDateTimes(
      DateTime.now().plus({ year: 1 }).startOf("year"),
      DateTime.now().plus({ year: 1 }).endOf("year")
    )
  );

  const [locale, setLocale] = useState(
    Settings.defaultLocale || navigator.language
  );

  const calendarRef = useRef<HTMLDivElement | null>(null);

  const onPrint = useReactToPrint({
    content: () => calendarRef.current,
  });

  return (
    <Fragment>
      <Container className={"py-3 d-print-none"}>
        <h1>Calendar Creator</h1>

        <ConfigForm
          initialStartDate={interval.start}
          initialEndDate={interval.end}
          initialLocale={locale}
          onSubmit={(startDate, endDate, locale) => {
            setInterval(Interval.fromDateTimes(startDate, endDate));
            setLocale(locale);
          }}
          onPrint={onPrint}
        />

        <CalendarPreview
          locale={locale}
          interval={interval}
          ref={calendarRef}
        />
      </Container>
    </Fragment>
  );
}

export default App;

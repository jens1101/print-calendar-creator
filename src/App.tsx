import React, { Fragment, useState } from "react";
import { ConfigForm } from "./ConfigForm";
import { Container } from "react-bootstrap";
import "./styles.css";
import { DateTime, Interval, Settings } from "luxon";
import { CalendarPreview } from "./CalendarPreview";

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

  return (
    <Fragment>
      <div className={"py-3 d-print-none shadow position-relative"}>
        <Container>
          <h1>Calendar Creator</h1>

          <ConfigForm
            initialStartDate={interval.start}
            initialEndDate={interval.end}
            initialLocale={locale}
            onSubmit={(startDate, endDate, locale) => {
              setInterval(Interval.fromDateTimes(startDate, endDate));
              setLocale(locale);
            }}
            onPrint={window.print}
          />
        </Container>
      </div>

      <CalendarPreview interval={interval} locale={locale} />
    </Fragment>
  );
}

export default App;

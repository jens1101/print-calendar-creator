import { DateTime, Interval, Settings } from "luxon";
import React, { Fragment, useState } from "react";
import { Container } from "react-bootstrap";
import { CalendarConfig } from "./CalendarConfig";
import { CalendarPreview } from "./CalendarPreview";
import { ConfigForm } from "./ConfigForm";
import "./styles.css";

function App() {
  const [config, setConfig] = useState<CalendarConfig>({
    interval: Interval.fromDateTimes(
      DateTime.now().plus({ year: 1 }).startOf("year"),
      DateTime.now().plus({ year: 1 }).endOf("year")
    ),
    locale: Settings.defaultLocale || navigator.language,
    images: [],
  });

  return (
    <Fragment>
      <div className={"py-3 d-print-none shadow position-relative"}>
        <Container>
          <h1>Calendar Creator</h1>

          <ConfigForm
            initialConfig={config}
            onSubmit={(config) => setConfig(config)}
            onPrint={window.print}
          />
        </Container>
      </div>

      <CalendarPreview config={config} />
    </Fragment>
  );
}

export default App;

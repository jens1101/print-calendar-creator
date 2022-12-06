import { Button, Col, Form, Row } from "react-bootstrap";
import React, { useMemo, useState } from "react";
import { DateTime, Interval } from "luxon";

const MONTH_FORMAT = "yyyy-MM";

export function ConfigForm(props: {
  initialStartDate: DateTime;
  initialEndDate: DateTime;
  initialLocale: string;
  onSubmit: (startDate: DateTime, endDate: DateTime, locale: string) => void;
  onPrint: () => void;
}) {
  const [startDate, setStartDate] = useState(props.initialStartDate);
  const [endDate, setEndDate] = useState(props.initialEndDate);
  const [locale, setLocale] = useState(props.initialLocale);

  const isIntervalValid = useMemo(
    () => Interval.fromDateTimes(startDate, endDate).isValid,
    [startDate, endDate]
  );

  const isLocaleValid = useMemo(() => {
    try {
      new Intl.DateTimeFormat(locale);
      return true;
    } catch {
      return false;
    }
  }, [locale]);

  const isFormValid = isIntervalValid && isLocaleValid;

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!isFormValid) {
      return;
    }

    props.onSubmit(startDate, endDate, locale);
  };

  return (
    <Form noValidate onSubmit={onSubmit}>
      <Row>
        <Col>
          <Form.Group className="mb-3" controlId="startMonth">
            <Form.Label>Start month</Form.Label>
            <Form.Control
              type="month"
              isInvalid={!isIntervalValid}
              value={startDate.toFormat(MONTH_FORMAT)}
              max={endDate.toFormat(MONTH_FORMAT)}
              onChange={(event) => {
                setStartDate(DateTime.fromISO(event.target.value));
              }}
            />
            <Form.Control.Feedback type="invalid">
              The start date cannot be after the end date
            </Form.Control.Feedback>
          </Form.Group>
        </Col>

        <Col>
          <Form.Group className="mb-3" controlId="endMonth">
            <Form.Label>End month</Form.Label>
            <Form.Control
              type="month"
              isInvalid={!isIntervalValid}
              value={endDate.toFormat(MONTH_FORMAT)}
              min={startDate.toFormat(MONTH_FORMAT)}
              onChange={(event) => {
                setEndDate(DateTime.fromISO(event.target.value));
              }}
            />
            <Form.Control.Feedback type="invalid">
              The end date cannot be before the start date
            </Form.Control.Feedback>
          </Form.Group>
        </Col>

        <Col>
          <Form.Group className="mb-3" controlId="locale">
            <Form.Label>Locale</Form.Label>
            <Form.Control
              type="text"
              isInvalid={!isLocaleValid}
              value={locale}
              onChange={(event) => {
                setLocale(event.target.value);
              }}
            />
            <Form.Control.Feedback type="invalid">
              The locale string is invalid
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Row>

      <Row>
        <Col>
          <Button
            className={"w-100"}
            variant="primary"
            type="submit"
            disabled={!isFormValid}
          >
            Update Calendar
          </Button>
        </Col>

        <Col>
          <Button
            className={"w-100"}
            variant="outline-primary"
            type={"button"}
            onClick={props.onPrint}
          >
            Print
          </Button>
        </Col>
      </Row>
    </Form>
  );
}

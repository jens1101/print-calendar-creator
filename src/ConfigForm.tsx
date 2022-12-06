import { DateTime, Interval } from "luxon";
import React, { useMemo, useState } from "react";
import { Button, Card, CloseButton, Col, Form, Row } from "react-bootstrap";
import { CalendarImage } from "./CalendarImage";

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
  const [images, setImages] = useState<CalendarImage[]>([]);

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

  const onFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files;

    if (!selectedFiles) {
      return;
    }

    setImages([
      ...images,
      ...Array.from(selectedFiles).map((file) => ({
        objectUrl: URL.createObjectURL(file),
        name: file.name,
      })),
    ]);
    event.target.value = "";
  };

  const onRemoveImage = (image: CalendarImage) => {
    setImages(images.filter((currentImage) => currentImage !== image));
    URL.revokeObjectURL(image.objectUrl);
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
          <Form.Group className={"mb-3"} controlId={"endMonth"}>
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
          <Form.Group className={"mb-3"} controlId={"locale"}>
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
        <Col xs={12} sm={6} lg={4} xl={3}>
          <Card className={"image-preview mb-3"}>
            <Card.Body
              className={"d-flex align-items-center justify-content-center"}
            >
              <Form.Group controlId={"images"}>
                <Form.Label className={"btn btn-outline-primary"}>
                  Add Images
                </Form.Label>
                <Form.Control
                  type={"file"}
                  accept={"image/*"}
                  hidden={true}
                  multiple={true}
                  onChange={onFileInputChange}
                />
              </Form.Group>
            </Card.Body>
          </Card>
        </Col>

        {images.map((image) => (
          <Col xs={12} sm={6} lg={4} xl={3} key={image.objectUrl}>
            <Card className={"image-preview mb-3"}>
              <Card.Img
                className={"image-preview__image"}
                src={image.objectUrl}
                alt={image.name}
              />
              <Card.ImgOverlay>
                <CloseButton onClick={() => onRemoveImage(image)} />
              </Card.ImgOverlay>
            </Card>
          </Col>
        ))}
      </Row>

      <Row>
        <Col>
          <Button
            className={"w-100"}
            variant={"primary"}
            type={"submit"}
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

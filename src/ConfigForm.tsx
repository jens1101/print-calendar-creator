import { DateTime } from "luxon";
import React, { useMemo, useState } from "react";
import { Button, Card, CloseButton, Col, Form, Row } from "react-bootstrap";
import { CalendarConfig } from "./CalendarConfig";
import { CalendarImage } from "./CalendarImage";

const MONTH_FORMAT = "yyyy-MM";

export function ConfigForm(props: {
  initialConfig: CalendarConfig;
  onSubmit: (config: CalendarConfig) => void;
  onPrint: () => void;
}) {
  const [config, setConfig] = useState<CalendarConfig>(props.initialConfig);

  const isLocaleValid = useMemo(() => {
    try {
      new Intl.DateTimeFormat(config.locale);
      return true;
    } catch {
      return false;
    }
  }, [config.locale]);

  const isFormValid = config.interval.isValid && isLocaleValid;

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!isFormValid) {
      return;
    }

    props.onSubmit(config);
  };

  const onFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files;

    if (!selectedFiles) {
      return;
    }

    const additionalImages = Array.from(selectedFiles).map((file) => ({
      objectUrl: URL.createObjectURL(file),
      name: file.name,
    }));

    setConfig((config) => ({
      ...config,
      images: [...config.images, ...additionalImages],
    }));
    event.target.value = "";
  };

  const onRemoveImage = (image: CalendarImage) => {
    setConfig((config) => ({
      ...config,
      images: config.images.filter((currentImage) => currentImage !== image),
    }));

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
              isInvalid={!config.interval.isValid}
              value={config.interval.start.toFormat(MONTH_FORMAT)}
              max={config.interval.end.toFormat(MONTH_FORMAT)}
              onChange={(event) =>
                setConfig((config) => ({
                  ...config,
                  interval: config.interval.set({
                    start: DateTime.fromISO(event.target.value),
                  }),
                }))
              }
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
              isInvalid={!config.interval.isValid}
              value={config.interval.end.toFormat(MONTH_FORMAT)}
              min={config.interval.start.toFormat(MONTH_FORMAT)}
              onChange={(event) =>
                setConfig((config) => ({
                  ...config,
                  interval: config.interval.set({
                    end: DateTime.fromISO(event.target.value),
                  }),
                }))
              }
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
              value={config.locale}
              onChange={(event) =>
                setConfig((config) => ({
                  ...config,
                  locale: event.target.value,
                }))
              }
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

        {config.images.map((image) => (
          <Col xs={12} sm={6} lg={4} xl={3} key={image.objectUrl}>
            <Card className={"image-preview mb-3"}>
              <Card.Img
                className={"image-fill-cover"}
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

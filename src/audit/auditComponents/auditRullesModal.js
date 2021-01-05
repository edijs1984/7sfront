import React from "react";
import { Form, Select } from "semantic-ui-react";
import { Modal, Button } from "react-bootstrap";
import { useForm, Controller } from "react-hook-form";
const AuditRulleModal = ({
  openModal,
  setOpenModal,
  familyOption,
  handle,
  createData
}) => {
  const closemodal = () => {
    setOpenModal(!openModal);
  };

  const defaultValues = {
    issue: "",
    inspectable: "",
    point1value: "",
    point1rulles: "",
    point2value: "",
    point2rulles: "",
    point3value: "",
    point3rulles: ""
  };

  const { control, handleSubmit, reset } = useForm({ defaultValues });

  const onSubmit = async data => {
    await createData(data);
    reset(defaultValues);
  };

  return (
    <Modal show={openModal} size="lg">
      <Modal.Header>
        <Modal.Title>Create Rule</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          {/* <Form onSubmit={handleSubmit(onSubmit)}> */}
          <Form.Group>
            <label className="label2">Select Family</label>

            <Select
              className="select"
              placeholder="Select Family"
              selection={familyOption.value}
              options={familyOption}
              name="family"
              onChange={handle}
            />
          </Form.Group>

          <Form.Group widths="equal">
            <label className="label">Issue</label>
            <Controller
              as={<Form.Input placeholder="What issue you must look for" />}
              name="issue"
              control={control}
            />
          </Form.Group>
          <Form.Group widths="equal">
            <label className="label">Inspectable</label>
            <Controller
              as={<Form.Input placeholder="Where to look for that issue" />}
              name="inspectable"
              control={control}
            />
          </Form.Group>

          <Form.Group>
            <label className="label">Points</label>
            <Controller
              as={<Form.Input className="smallinputs" type="number" />}
              name="point1value"
              control={control}
            />
            <Controller
              as={
                <Form.Input
                  className="biginputs"
                  placeholder="Rules for Points"
                />
              }
              name="point1rulles"
              control={control}
            />
          </Form.Group>
          <Form.Group>
            <label className="label">Points</label>
            <Controller
              as={<Form.Input className="smallinputs" type="number" />}
              name="point2value"
              control={control}
            />
            <Controller
              as={
                <Form.Input
                  className="biginputs"
                  placeholder="Rules for Points"
                />
              }
              name="point2rulles"
              control={control}
            />
          </Form.Group>

          <Form.Group>
            <label className="label">Points</label>
            <Controller
              as={<Form.Input className="smallinputs" type="number" />}
              name="point3value"
              control={control}
            />
            <Controller
              as={
                <Form.Input
                  className="biginputs"
                  placeholder="Rules for Points"
                />
              }
              name="point3rulles"
              control={control}
            />
          </Form.Group>
          {/* <Input type="submit" fluid /> */}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <div className="actionz">
          <Button onClick={() => closemodal()} size="sm" variant="danger">
            Exit
          </Button>
          <Button onClick={handleSubmit(onSubmit)} size="sm" variant="success">
            Submit
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default AuditRulleModal;

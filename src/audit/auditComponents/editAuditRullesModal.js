import React from "react";
import { Form, Select } from "semantic-ui-react";
import { Modal, Button } from "react-bootstrap";
import { useForm, Controller } from "react-hook-form";
const EditAuditRulleModal = ({
  editOpenModal,
  setEditOpenModal,
  familyOption,
  handle,
  handleEdit,
  editData,
  sofs
}) => {
  const closemodal = () => {
    setEditOpenModal(!editOpenModal);
  };

  const { control, handleSubmit } = useForm({ editData });

  const onSubmit = async data => {
    await handleEdit(data);
    // console.log(data);
  };

  return (
    <Modal show={editOpenModal} size="lg">
      <Modal.Header>
        <Modal.Title>Edit Rule</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <label className="label2">Select Family</label>

            <Select
              className="select"
              placeholder="Select Family"
              selection={familyOption.value}
              options={familyOption}
              name="family"
              onChange={handle}
              value={sofs || editData.sofs}
            />
          </Form.Group>

          <Form.Group widths="equal">
            <label className="label">Issue</label>
            <Controller
              as={<Form.Input placeholder="What issue you must look for" />}
              name="issue"
              control={control}
              defaultValue={editData.issue}
            />
          </Form.Group>
          <Form.Group widths="equal">
            <label className="label">Inspectable</label>
            <Controller
              as={<Form.Input placeholder="Where to look for that issue" />}
              name="inspectable"
              control={control}
              defaultValue={editData.inspectable}
            />
          </Form.Group>

          <Form.Group>
            <label className="label">Points</label>
            <Controller
              as={<Form.Input className="smallinputs" type="number" />}
              name="point1value"
              control={control}
              defaultValue={editData.rating ? editData.rating[0].point1 : ""}
            />
            <Controller
              as={
                <Form.Input
                  className="biginputs"
                  placeholder="Rulles for Points"
                />
              }
              name="point1rulles"
              control={control}
              defaultValue={editData.rating ? editData.rating[0].rulle1 : ""}
            />
          </Form.Group>
          <Form.Group>
            <label className="label">Points</label>
            <Controller
              as={<Form.Input className="smallinputs" type="number" />}
              name="point2value"
              control={control}
              defaultValue={editData.rating ? editData.rating[1].point2 : ""}
            />
            <Controller
              as={
                <Form.Input
                  className="biginputs"
                  placeholder="Rulles for Points"
                />
              }
              name="point2rulles"
              control={control}
              defaultValue={editData.rating ? editData.rating[1].rulle2 : ""}
            />
          </Form.Group>

          <Form.Group>
            <label className="label">Points</label>
            <Controller
              as={<Form.Input className="smallinputs" type="number" />}
              name="point3value"
              control={control}
              defaultValue={editData.rating ? editData.rating[2].point3 : ""}
            />
            <Controller
              as={
                <Form.Input
                  className="biginputs"
                  placeholder="Rulles for Points"
                />
              }
              name="point3rulles"
              control={control}
              defaultValue={editData.rating ? editData.rating[2].rulle3 : ""}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <div className="actionz">
          <Button onClick={() => closemodal()} variant="danger" size="sm">
            Exit
          </Button>
          <Button onClick={handleSubmit(onSubmit)} variant="success" size="sm">
            Submit
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default EditAuditRulleModal;

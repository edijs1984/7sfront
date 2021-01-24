// import React, { useContext, useState, useEffect } from "react";
// import ReusableModal from "../../comonComponents/reusableModal";
// import { Button, Col, Row, Form } from "react-bootstrap";

// import SelectResponsible from "../../comonComponents/comonDropdowns/SelectResponsible";
// import CustomStatus from "../../comonComponents/CustomStatus";
// import { ModalContext } from "../../context/modalContext";
// import { Post, UserName, User } from "../../comonComponents/axiosFunctions";
// import Datums from "../../comonComponents/CustomDatePicker";
// import ObservationTypeDropdown from "../../comonComponents/observationTypeDropdown";
// import PriorityDropdown from "../tasksComponents/priorityDropdown";
// import { apiUrl } from "../../config.json";

// const QuickTaskEditModal = ({ modal, item, updatePage, img }) => {
//   const [, setModalStatus] = useContext(ModalContext);
//   const [issue, setIsue] = useState("");
//   const [responsible, setResponsible] = useState("");
//   const [coments, setComent] = useState("");
//   const [status, setStatus] = useState("");
//   const [email, setEmail] = useState("");
//   const [deadline, setDeadline] = useState("");
//   const [ob, setObservation] = useState("");
//   const [safetyCategory, setSafetyCategory] = useState("");
//   const [priority, setPriority] = useState("");

//   useEffect(() => {
//     modal === true ? setModalStatus(true) : setModalStatus(false);
//   }, [modal, setModalStatus]);
//   useEffect(() => {
//     setComent(item.coment);
//     setIsue(item.issue);
//     setSafetyCategory(item.safetyCategory ? item.safetyCategory : "");
//   }, [item]);
//   const updateQuickTask = async () => {
//     await Post({
//       api: "/api/quicktask/update",
//       data: {
//         id: item._id,
//         status: status || item.status,
//         issue: issue || item.issue,
//         responsible: responsible || item.responsible,
//         coment: coments || item.coment,
//         email: email || item.email,
//         safetyCategory: safetyCategory || item.safetyCategory,
//         observation: ob || item.observation,
//         deadline: deadline || item.deadline,
//         creator: item.creator,
//         priority: priority || item.priority,
//         seq: item.seq[0],
//         place: item.area,
//       },
//       message: "Updated sucessefuly",
//     });
//     updatePage();
//   };

//   return (
//     <ReusableModal
//       buttonName="Exit"
//       buttonSize="sm"
//       size="xl"
//       header={"Edit observation-Departament: " + item.area}
//       body={
//         <div>
//           <Row>
//             <Col>
//               <h4>Description</h4>
//               <textarea
//                 style={{ width: "100%" }}
//                 type="text"
//                 name="apraksts"
//                 value={issue || ""}
//                 rows={5}
//                 onChange={(e) => setIsue(e.target.value)}
//               />
//             </Col>
//             <Col>
//               <h4>Actions</h4>
//               <textarea
//                 style={{ width: "100%" }}
//                 type="text"
//                 name="darbības"
//                 value={coments || ""}
//                 rows={5}
//                 onChange={(e) => setComent(e.target.value)}
//               />
//             </Col>
//           </Row>
//           <Row>
//             <Col>
//               <SelectResponsible
//                 mail={(res) => {
//                   setEmail(res);
//                 }}
//                 name={(res) => setResponsible(res)}
//                 defaultValue={item.email}
//               />
//             </Col>
//             <Col>
//               <h4>Status</h4>
//               <CustomStatus
//                 defaultValue={item.status === "new" ? "New" : item.status}
//                 prio={(res) => setStatus(res.selected)}
//               />
//             </Col>
//             <Col>
//               <h4>Deadline</h4>
//               <Datums setDate={(a) => setDeadline(a)} />
//             </Col>
//             <Col>
//               <h4>Priority</h4>
//               <PriorityDropdown
//                 prio={(e) => setPriority(e.selected)}
//                 defaultValue={item.priority}
//               />
//             </Col>
//             <Col>
//               <h4>Observation</h4>
//               <ObservationTypeDropdown
//                 defaultValue={item.observation}
//                 prio={(res) => setObservation(res.selected)}
//               />
//             </Col>
//           </Row>
//           <Row style={{ marginTop: "2%" }}>
//             <Col>
//               <h4>Safety category</h4>
//               <Form>
//                 <Form.Group controlId="formBasicCheckbox">
//                   <Form.Check
//                     type="checkbox"
//                     label="Unsafe environment"
//                     checked={
//                       safetyCategory === "Unsafe environment"
//                         ? true
//                         : false || ""
//                     }
//                     onChange={() =>
//                       setSafetyCategory(
//                         safetyCategory === "Unsafe environment"
//                           ? ""
//                           : "Unsafe environment"
//                       )
//                     }
//                     color="green"
//                   />
//                 </Form.Group>
//                 <Form.Group controlId="formBasicCheckbox">
//                   <Form.Check
//                     type="checkbox"
//                     label="Unsafe action"
//                     checked={
//                       safetyCategory === "Unsafe action" ? true : false || ""
//                     }
//                     onChange={() =>
//                       setSafetyCategory(
//                         safetyCategory === "Unsafe action"
//                           ? ""
//                           : "Unsafe action"
//                       )
//                     }
//                   />
//                 </Form.Group>
//                 <Form.Group controlId="formBasicCheckbox">
//                   <Form.Check
//                     type="checkbox"
//                     label="Accident"
//                     checked={safetyCategory === "Accident" ? true : false || ""}
//                     onChange={() =>
//                       setSafetyCategory(
//                         safetyCategory === "Accident" ? "" : "Accident"
//                       )
//                     }
//                   />
//                 </Form.Group>
//               </Form>
//             </Col>
//             <Col>
//               <h4>Foto</h4>
//               {!img[0] ? (
//                 ""
//               ) : (
//                 <img
//                   src={apiUrl + "/api/mnt/volume_fra1_01/images/" + img[0]}
//                   alt=""
//                   width="200"
//                   height="180"
//                 />
//               )}
//             </Col>
//             <Col></Col>
//             <Col></Col>
//           </Row>
//         </div>
//       }
//       submitButton={
//         <Button
//           onClick={() => updateQuickTask()}
//           size="sm"
//           variant="success"
//           disabled={
//             UserName === item.creator ||
//             UserName === item.responsible ||
//             User.isAdmin
//               ? false
//               : true
//           }
//         >
//           Submit
//         </Button>
//       }
//     />
//   );
// };

// export default QuickTaskEditModal;

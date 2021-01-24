// import React, { useContext, useState, useEffect } from "react";
// import ReusableModal from "../../comonComponents/reusableModal";
// import { Button, Col, Row, Form } from "react-bootstrap";
// import Axios from "axios";
// import SelectResponsible from "../../comonComponents/comonDropdowns/SelectResponsible";
// import CustomStatus from "../../comonComponents/CustomStatus";
// import { ModalContext } from "../../context/modalContext";
// import { User } from "../../comonComponents/axiosFunctions";
// import Datums from "../../comonComponents/CustomDatePicker";
// import ObservationTypeDropdown from "../../comonComponents/observationTypeDropdown";

// import { apiUrl } from "../../config.json";
// import { toast } from "react-toastify";

// const AuditCreateTAskModal = ({ modal, item, updatePage, img, place }) => {
//   const [, setModalStatus] = useContext(ModalContext);
//   const [issue, setIsue] = useState("");
//   const [responsible, setResponsible] = useState("");
//   const [coments, setComent] = useState("");
//   const [, setStatus] = useState("");
//   const [, setEmail] = useState("");
//   const [deadline, setDeadline] = useState("");
//   const [ob, setObservation] = useState("5S");
//   const [safetyCategory, setSafetyCategory] = useState("");
//   const [priority, setPriority] = useState("");
//   const [resMail, setResponsibleMail] = useState("");
//   // const [, setFileName] = useState("");

//   useEffect(() => {
//     modal === true ? setModalStatus(true) : setModalStatus(false);
//   }, [modal, setModalStatus]);
//   useEffect(() => {
//     setComent(item.coment);
//     setIsue(item.issue);
//   }, [item]);

//   useEffect(() => {
//     getResponsible();
//   }, []);

//   const token = localStorage.getItem("JwtToken");

//   const CreateQuickTask = async () => {
//     uploadData();
//   };

//   const getResponsible = async () => {
//     try {
//       const res = await Axios.post(
//         apiUrl + "/api/user/responsible",
//         {
//           company: User.company,
//           department: place,
//         },
//         { headers: { "auth-token": token } }
//       );
//       setResponsible(res.data.name);
//       setResponsibleMail(res.data.email);
//     } catch (e) {
//       toast.error("Palce doesnt have appointed Responsible");
//     }
//   };

//   const uploadData = async () => {
//     try {
//       await Axios.post(
//         apiUrl + "/api/quicktask/create",
//         {
//           company: User.company,
//           image: img,
//           issue: issue,
//           area: place, //nav
//           responsible: responsible,
//           coment: coments,
//           deadline: deadline,
//           creator: User.name,
//           creatorDep: User.department,
//           observation: ob, //nav
//           priority: priority,
//           safetyCategory: safetyCategory,

//           //
//         },
//         { headers: { "auth-token": token } }
//       );
//       setComent("");
//       setDeadline("");
//       setIsue("");
//       setObservation("5S");
//       setPriority("");
//       setResponsible("");
//       setSafetyCategory("");
//       setResponsibleMail("");
//       toast.success("Novērojums izveidots");
//     } catch (e) {
//       console.log(e);
//       toast.error("check if department has appointed responsible");
//     }
//   };

//   return (
//     <ReusableModal
//       buttonName="Exit"
//       buttonSize="sm"
//       size="xl"
//       header={"Header"}
//       body={
//         <div>
//           <Row>
//             <Col>
//               <h4>Description</h4>
//               <textarea
//                 style={{ width: "100%" }}
//                 type="text"
//                 name="apraksts"
//                 value={issue}
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
//                 defaultValue={resMail}
//               />
//             </Col>
//             <Col>
//               <h4>Status</h4>
//               <CustomStatus
//                 defaultValue={"New"}
//                 prio={(res) => setStatus(res.selected)}
//               />
//             </Col>
//             <Col>
//               <h4>Deadline</h4>
//               <Datums setDate={(a) => setDeadline(a)} />
//             </Col>
//             <Col>
//               <h4>Priority</h4>
//             </Col>
//             <Col>
//               <h4>Observation</h4>
//               <ObservationTypeDropdown
//                 defaultValue={"5S"}
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
//         <Button onClick={() => CreateQuickTask()} size="sm" variant="success">
//           Submit
//         </Button>
//       }
//     />
//   );
// };

// export default AuditCreateTAskModal;

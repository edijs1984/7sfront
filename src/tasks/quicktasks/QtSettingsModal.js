// import React, { useState, useEffect } from "react";
// import { Modal, Button } from "react-bootstrap";
// import CustomDropdown from "../../comonComponents/customDropdown";
// import FilterDepartmentTable from "./filterDepartmentTable";
// import CustomCheckBox from "../../comonComponents/customCheckBox";

// const QtSettingsModal = ({
//   modalStatus,
//   settingsModal,
//   updateMysettings,
//   apiUrl,
//   Axios,
//   user,
//   token,
// }) => {
//   const [department, setDepartment] = useState([]);
//   const [myDepartments, setMydepartments] = useState([]);
//   const [pabeigts, setpabeigt] = useState(true);
//   const [apsPabeigts, setApsPabeigts] = useState(true);
//   const [drošaRīcība, setDrošaRīcība] = useState(true);
//   const remove = (val) => {
//     myDepartments.splice(val, 1);
//     setMydepartments([...myDepartments]);
//   };

//   useEffect(() => {
//     const update = async () => {
//       const result = await Axios.post(
//         apiUrl + "/api/personalsettings/mysettings",
//         {
//           userId: user._id,
//           company: user.company,
//         },
//         { headers: { "auth-token": token } }
//       );
//       if (result.data[0] === undefined) {
//         return null;
//       } else {
//         setMydepartments(result.data[0].area);
//         setApsPabeigts(result.data[0].statusApPabeigts);
//         setpabeigt(result.data[0].statusPabeigts);
//         setDrošaRīcība(result.data[0].drosaRiciba);
//       }
//     };
//     update();
//   }, [Axios, apiUrl, token, user]);

//   return (
//     <Modal show={modalStatus} size="large">
//       <Modal.Header>
//         <h3 style={{ fontWeight: "bold", color: "#ff6600" }}>My filters</h3>
//       </Modal.Header>
//       <Modal.Body>
//         <div>
//           <div style={{ border: "1px solid #eee", padding: "1%" }}>
//             <h4>Status</h4>
//             <div
//               style={{
//                 display: "flex",
//                 flexDirection: "row",
//               }}
//             >
//               <div style={{ marginRight: "4%", textAlign: "center" }}>
//                 <h5>Done</h5>
//                 <CustomCheckBox
//                   change={() => setpabeigt(!pabeigts)}
//                   value={pabeigts}
//                 />
//               </div>
//               <div style={{ textAlign: "center" }}>
//                 <h5>Approved done</h5>
//                 <CustomCheckBox
//                   change={() => setApsPabeigts(!apsPabeigts)}
//                   value={apsPabeigts}
//                 />
//               </div>
//             </div>
//           </div>

//           <div
//             style={{ border: "1px solid #eee", padding: "1%", marginTop: "2%" }}
//           >
//             <h4>Observations</h4>
//             <div
//               style={{
//                 display: "flex",
//                 flexDirection: "row",
//               }}
//             ></div>
//           </div>
//         </div>
//         <div style={{ marginBottom: "1%" }}>
//           <h4>Places</h4>

//           <CustomDropdown
//             api={"/api/plant/all/department"}
//             placeholders={"Places"}
//             setValue={(value) => setDepartment(value.name)}
//             jsonName2="departmentName"
//             jsonName="departmentName"
//           />
//         </div>
//         <div style={{ marginLeft: "23%", marginBottom: "3%" }}>
//           <Button
//             size="sm"
//             onClick={() => setMydepartments([...myDepartments, department])}
//           >
//             Add
//           </Button>
//         </div>

//         <FilterDepartmentTable
//           value={!myDepartments ? [] : myDepartments}
//           remove={(val) => remove(val)}
//         />
//       </Modal.Body>
//       <Modal.Footer>
//         <Button
//           floated="left"
//           variant="danger"
//           size="sm"
//           onClick={() => settingsModal()}
//         >
//           Exit
//         </Button>
//         <Button
//           size="sm"
//           variant="success"
//           onClick={() =>
//             updateMysettings({
//               myDepartments,
//               pabeigts,
//               apsPabeigts,
//               drošaRīcība,
//             })
//           }
//         >
//           Submit
//         </Button>
//       </Modal.Footer>
//     </Modal>
//   );
// };
// export default QtSettingsModal;

// import React, { useState } from "react";

// import { Button, ButtonGroup } from "react-bootstrap";
// import CustomDropdown from "../../comonComponents/customDropdown";
// import CustomDatePicker from "../../comonComponents/CustomDatePicker";
// import { Icon } from "semantic-ui-react";
// import CustomStatusFilter from "../../comonComponents/CustomStatusFilter";

// const QuickTaskHead = ({ filter, updateList, settingsModal, createModal }) => {
//   const ContainerStyle = {
//     display: "flex",
//     justifyContent: "flex-end",
//     flex: 1,
//     marginBottom: "1%",
//     marginRight: "1.5%",
//   };
//   const [department, setDepartment] = useState("");
//   const [Status, setStatus] = useState("");
//   const [responsible, setResponsible] = useState("");
//   const [datums, setDate] = useState("");

//   const resetAll = () => {
//     updateList();
//     setStatus("");
//     setResponsible("");
//     setDate("");
//     setDepartment("");
//   };

//   return (
//     <div style={{ flexDirection: "row" }}>
//       <div
//         style={{
//           width: "15%",
//           marginTop: "1.5%",
//           display: "flex",
//           flexDirection: "row",
//         }}
//       >
//         <Button onClick={() => createModal()}>Create</Button>

//         <Button style={{ marginLeft: "1%" }} onClick={() => settingsModal()}>
//           My main filters
//         </Button>
//       </div>

//       <div style={ContainerStyle}>
//         {/* <div style={{  marginRight: "1%" }}>
//           <Button onClick={() => settingsModal()}>
//             My main filters
//           </Button>
//         </div> */}
//         <div>
//           <h5 style={{ marginTop: "-20%" }}>Departament</h5>

//           <CustomDropdown
//             api={"/api/plant/all/department"}
//             jsonName2="departmentName"
//             jsonName="departmentName"
//             setValue={(value) => setDepartment(value.name)}
//             defaultValue={department}
//           />
//         </div>
//         <div style={{ marginLeft: "1%" }}>
//           <h5 style={{ marginTop: "-20%" }}>Status</h5>
//           <CustomStatusFilter
//             prio={(e) => setStatus(e.selected)}
//             defaultValue={Status}
//           />
//         </div>
//         <div style={{ marginLeft: "1%" }}>
//           <h5 style={{ marginTop: "-20%" }}>Responsible</h5>
//           <CustomDropdown
//             api={"/api/user/all"}
//             jsonName="name"
//             jsonName2="name"
//             setValue={(value) => setResponsible(value.name)}
//             defaultValue={responsible}
//           />
//         </div>
//         <div style={{ marginLeft: "1%" }}>
//           <h5 style={{ marginTop: "-35%" }}>Deadline</h5>
//           <CustomDatePicker setDate={(e) => setDate(e)} />
//         </div>
//         <div
//           style={{
//             marginTop: "-1%",
//             marginLeft: "1%",
//           }}
//         >
//           <h5 style={{ marginTop: "-22%" }}>Filter</h5>

//           <Button
//             // variant="dark"
//             onClick={() => filter({ department, Status, responsible, datums })}
//           >
//             <Icon name="filter" />
//           </Button>
//           <Button variant="danger" onClick={() => resetAll()}>
//             <Icon name="delete" />
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// };
// export default QuickTaskHead;

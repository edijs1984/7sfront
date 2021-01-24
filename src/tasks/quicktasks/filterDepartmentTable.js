// import React from "react";
// import { Table } from "react-bootstrap";
// import { Icon } from "semantic-ui-react";
// const FilterDepartmentTable = ({ value, remove }) => {
//   return (
//     <div>
//       <Table size="sm">
//         <thead>
//           <tr style={{ fontSize: 15, textAlign: "center" }}>
//             <td>Place in tabel:</td>
//             <td>Remove</td>
//           </tr>
//         </thead>
//         <tbody>
//           {value.map((item) => {
//             return (
//               <tr key={item} style={{ textAlign: "center" }}>
//                 <td>{item}</td>
//                 <td>
//                   <div onClick={() => remove(value.indexOf(item))}>
//                     <Icon name="delete" color="red" />
//                   </div>
//                 </td>
//               </tr>
//             );
//           })}
//         </tbody>
//       </Table>
//     </div>
//   );
// };

// export default FilterDepartmentTable;

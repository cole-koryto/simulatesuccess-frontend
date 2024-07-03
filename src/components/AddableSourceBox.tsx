// import React, { useState, useRef } from 'react'
// import ReactDOM from "react-dom";
// //https://codesandbox.io/s/react-dynamic-form-xez6d?file=/src/App.js:230-299

// //@ts-ignore
// const AddableInputBox = ({fields, setFields}) => {

//     const fieldsIsValid = fields.length >= 1 && fields.every((field: any) => field.trim() !== "");

//     function handleChange(i: number, event: any) {
//         const values = [...fields];
//         values[i] = event.target.value;
//         setFields(values);
//     }

//     function handleAdd() {
//         const values = [...fields];
//         values.push("");
//         setFields(values);
//     }

//     function handleRemove(i: number) {
//         const values = [...fields];
//         values.splice(i, 1);
//         setFields(values);
//     }

//     return (
//         <div className="AddableSourceBox">

//             <button type="button" onClick={() => handleAdd()}>
//               Add Input
//             </button>
//             {!fieldsIsValid && <p className="error">Input is required</p>}
//             {fields.map((field: any, idx: any) => {
//               return (
//                 <div key={`${"source"}-${idx}`}>
//                     <span className="flex">
//                         <input
//                             type="text"
//                             placeholder="Enter percentile"
//                             value={field || ""}
//                             className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                             onChange={(e) => handleChange(idx, e)}
//                         />
//                         <button type="button" onClick={() => handleRemove(idx)}>
//                             X
//                         </button>
//                     </span>
//                 </div>
//               );
//             })}
//         </div>
//     )
// }

// export default AddableInputBox;

import React from 'react';

//@ts-ignore
const AddableInputBox = ({ groups, setGroups }) => {

  const groupsIsValid = groups.every((group: any) => group.every((field: any) => field.trim() !== ''));

  const handleChange = (groupIndex: any, fieldIndex: any, event: any) => {
    const updatedGroups = [...groups];
    updatedGroups[groupIndex][fieldIndex] = event.target.value;
    setGroups(updatedGroups);
  };

  const handleAddGroup = () => {
    const updatedGroups = [...groups];
    updatedGroups.push(["", "", "", ""]);
    setGroups(updatedGroups);
  };

  const handleRemoveGroup = (groupIndex: any) => {
    const updatedGroups = [...groups];
    updatedGroups.splice(groupIndex, 1);
    setGroups(updatedGroups);
  };

  return (
    <div className="AddableSourceBox">
      <button type="button" onClick={handleAddGroup}>
        Add Group
      </button>
      {!groupsIsValid && <p className="error">All inputs in all groups are required</p>}
      {groups.map((group: any, groupIndex: any) => (
        <div key={`group-${groupIndex}`} className="group">
            <span className="flex gap-1">
                {group.map((field: any, fieldIndex: any) => (
                <input
                    key={`input-${groupIndex}-${fieldIndex}`}
                    type="text"
                    value={field}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    onChange={(e) => handleChange(groupIndex, fieldIndex, e)}
                />))}
                <button type="button" onClick={() => handleRemoveGroup(groupIndex)}>
                    X
                </button>
            </span>
        </div>
      ))}
    </div>
  );
};

export default AddableInputBox;

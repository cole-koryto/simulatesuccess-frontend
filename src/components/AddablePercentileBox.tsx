// import React, { useState, useRef } from 'react'
// import ReactDOM from "react-dom";
// //https://codesandbox.io/s/react-dynamic-form-xez6d?file=/src/App.js:230-299

// //@ts-ignore
// const AddablePercentileBox = ({fields, setFields}) => {
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
//         <div className="AddablePercentileBox">

//             <button type="button" onClick={() => handleAdd()}>
//               Add Input
//             </button>
//             {!fieldsIsValid && <p className="error">Input is required</p>}
//             {fields.map((field: any, idx: any) => {
//               return (
//                 <div key={`${"percentile"}-${idx}`}>
//                     <span className="flex mb-1">
//                         <input
//                             type="text"
//                             placeholder="Enter percentile"
//                             value={field || ""}
//                             className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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

// export default AddablePercentileBox;


import { useEffect } from "react";
// Based on https://sadam-bapunawar.medium.com/add-and-remove-form-fields-dynamically-using-react-and-react-hooks-3b033c3c0bf5

//@ts-ignore
const AddablePercentileBox = ({ fields, setFields }) => {
  
  let handleChange = (i: any, e: any) => {
    const newFieldValues = [...fields];
    newFieldValues[i] = e.target.value;
    setFields(newFieldValues);
  }

let addFormFields = () => {
    setFields([...fields, ""])
  }

let removeFormFields = (i: any) => {
    const newFieldValues = [...fields];
    newFieldValues.splice(i, 1);
    setFields(newFieldValues)
}

return (
    <div>
      {fields.map((element: any, index: any) => (
        <div className="flex" key={index}>
          <input
            required  
            type="text" 
            name="percentile" 
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={element || ""} 
            placeholder="Enter percentile"
            onChange={e => handleChange(index, e)} />
          <button type="button"  className="button remove" onClick={() => removeFormFields(index)}>Remove</button> 
        </div>
      ))}
      <button type="button" onClick={() => addFormFields()}>Add</button>
  </div>
)
}

export default AddablePercentileBox;

import React, { useState, useRef } from 'react'
import ReactDOM from "react-dom";
//https://codesandbox.io/s/react-dynamic-form-xez6d?file=/src/App.js:230-299

//@ts-ignore
const AddablePercentileBox = ({fields, setFields}) => {
    

    const fieldRef = useRef();

    const fieldsIsValid = fields.length >= 1 && fields.every((field: any) => field.trim() !== "");

    function handleChange(i: number, event: any) {
        const values = [...fields];
        values[i] = event.target.value;
        setFields(values);
    }

    function handleAdd() {
        const values = [...fields];
        values.push("");
        setFields(values);
    }

    function handleRemove(i: number) {
        const values = [...fields];
        values.splice(i, 1);
        setFields(values);
    }

    return (
        <div className="AddablePercentileBox">

            <button type="button" onClick={() => handleAdd()}>
              Add Input
            </button>
            {!fieldsIsValid && <p className="error">Input is required</p>}
            {fields.map((field: any, idx: any) => {
              return (
                <div key={`${"percentile"}-${idx}`}>
                    <span className="flex">
                        <input
                            type="text"
                            placeholder="Enter percentile"
                            value={field || ""}
                            className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            onChange={(e) => handleChange(idx, e)}
                        />
                        <button type="button" onClick={() => handleRemove(idx)}>
                            X
                        </button>
                    </span>
                </div>
              );
            })}
        </div>
    )
}

export default AddablePercentileBox;
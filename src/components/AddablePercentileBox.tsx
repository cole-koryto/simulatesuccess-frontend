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
        <div className="flex mb-2 border border-gray-600 rounded-lg bg-gray-700 placeholder-gray-400 text-white overflow-hidden" key={index}>
          <input
            required  
            type="text" 
            name="percentile" 
            inputMode="decimal"
            maxLength={16}
            className="bg-gray-700 border border-gray-600 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 placeholder-gray-400"
            value={element} 
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

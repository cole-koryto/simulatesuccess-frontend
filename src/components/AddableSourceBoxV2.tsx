// Based on https://sadam-bapunawar.medium.com/add-and-remove-form-fields-dynamically-using-react-and-react-hooks-3b033c3c0bf5

//@ts-ignore
const AddableInputBoxV2 = ({ groups, setGroups }) => {

  let handleChange = (i: any, e: any) => {
    const newGroupValues = [...groups];
    if (e.target.name == "amount")
      newGroupValues[i][e.target.name] = e.target.value.replace(/[,\D]/g, "");
    else
      newGroupValues[i][e.target.name] = e.target.value;
    setGroups(newGroupValues);
  }

  let addFormFields = () => {
    setGroups([...groups, { title: "", amount: "", starting_age: "", ending_age: "", growth: "0.00" }])
  }

  let removeFormFields = (i: any) => {
    const newGroupValues = [...groups];
    newGroupValues.splice(i, 1);
    setGroups(newGroupValues)
  }

  return (
    <div>
      {groups.map((element: any, index: any) => (
        <div className="flex mb-2 border border-gray-600 rounded-lg placeholder-gray-400 text-white overflow-hidden" key={index}>
          <input
            required
            type="text"
            name="title"
            className="bg-gray-700 border border-gray-600 text-white text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 placeholder-gray-400"
            value={element.title || ""}
            placeholder="Title"
            onChange={e => handleChange(index, e)} />
          <input
            required
            type="text"
            name="amount"
            inputMode="decimal"
            className="bg-gray-700 border border-gray-600 text-white text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 placeholder-gray-400"
            value={element.amount ? Number(element.amount).toLocaleString() : ""}
            placeholder="Amount"
            onChange={e => handleChange(index, e)} />
          <input
            required
            type="text"
            name="starting_age"
            inputMode="decimal"
            className="bg-gray-700 border border-gray-600 text-white text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 placeholder-gray-400"
            value={element.starting_age || ""}
            placeholder="Starting age"
            onChange={e => handleChange(index, e)} />
          <input
            required
            type="text"
            name="ending_age"
            inputMode="decimal"
            className="bg-gray-700 border border-gray-600 text-white text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 placeholder-gray-400"
            value={element.ending_age || ""}
            placeholder="Ending age"
            onChange={e => handleChange(index, e)} />
          <input
            required
            type="text"
            name="growth"
            inputMode="decimal"
            className="bg-gray-700 border border-gray-600 text-white text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 placeholder-gray-400"
            value={element.growth}
            placeholder="Growth"
            onChange={e => handleChange(index, e)} />
          <button type="button" className="button remove" onClick={() => removeFormFields(index)}>Remove</button>
        </div>
      ))}
      <button type="button" onClick={() => addFormFields()}>Add</button>
    </div>
  )
}
export default AddableInputBoxV2;
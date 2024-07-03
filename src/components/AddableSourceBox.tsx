import React from 'react';

// //https://codesandbox.io/s/react-dynamic-form-xez6d?file=/src/App.js:230-299


//@ts-ignore
const AddableInputBox = ({ groups, setGroups }) => {
    console.log(groups)

  const groupsIsValid = groups.every((group: any) => group.every((field: any) => field.trim() !== ''));

  const handleChange = (groupIndex: any, fieldIndex: any, event: any) => {
    const updatedGroups = [...groups];
    updatedGroups[groupIndex][fieldIndex] = event.target.value;
    setGroups(updatedGroups);
  };

  const handleAddGroup = () => {
    const updatedGroups = [...groups];
    updatedGroups.push(["", "", "", "", ""]);
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

//@ts-ignore
const IncomeTable = ({ NetIncomeData }) => {
  console.log(NetIncomeData)
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg p-5">
      <table className="w-full text-sm text-left rtl:text-right bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
        <thead>
          <tr>
            <th scope="col" className="px-6 py-3">Age</th>
            <th scope="col" className="px-6 py-3">Net Income</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(NetIncomeData).map((key: any) => (
            <tr key={key} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <th scope="row" className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">{key}</th>
              <td className="px-6 py-2">{NetIncomeData[key].toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default IncomeTable
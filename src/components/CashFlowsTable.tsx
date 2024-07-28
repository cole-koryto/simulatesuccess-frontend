//@ts-ignore
const CashFLowsTable = ({ TotalIncomeData, TotalSpendingData, NetIncomeData }) => {
  return (
    <div className="relative overflow-x-auto sm:rounded py-5">
      <table className="w-full text-sm text-left rtl:text-right bg-gray-700 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 border-gray-600 placeholder-gray-400">
        <thead>
          <tr>
            <th scope="col" className="px-6 py-3">Age</th>
            <th scope="col" className="px-6 py-3">Total Income</th>
            <th scope="col" className="px-6 py-3">Total Spending</th>
            <th scope="col" className="px-6 py-3">Net Income</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(NetIncomeData).map((key: any) => (
            <tr key={key} className="bg-gray-800 border-b border-gray-700">
              <th scope="row" className="px-6 py-2 font-normal text-white whitespace-nowrap">{key}</th>
              <td className="px-6 py-2">{Number(TotalIncomeData[key].toFixed(2)).toLocaleString()}</td>
              <td className="px-6 py-2">{Number(TotalSpendingData[key].toFixed(2)).toLocaleString()}</td>
              <td className="px-6 py-2">{Number(NetIncomeData[key].toFixed(2)).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default CashFLowsTable
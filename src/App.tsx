import { useState } from 'react'
import ExportData from './components/ExportData'
import IncomeTable from './components/IncomeTable'
import InputBox from './components/InputBox'
import PercentileGraph from './components/PercentileGraph'
import SimulationSimmary from './components/SimulationSummary'

function App() {
  const [simulationData, setSimulationData] = useState()
  const [simulationInputs, setSimulationInputs] = useState()

  return (
    <div className="flex m-0 p-6 text-center">
      <div className="w-1/2 m-4">
        <InputBox setSimulationInputs={setSimulationInputs} setSimulationData={setSimulationData} />
        {simulationData && <ExportData simulationData={simulationData} />}
        {simulationData && <SimulationSimmary simulationSummary={simulationData["simulation_summary"]} />}
      </div>
      <div className="w-1/2 m-4">
        {simulationData && <PercentileGraph percentileHistory={simulationData["percentile_balance_history"]} />}
        {simulationData && <IncomeTable NetIncomeData={simulationData["net_income_by_year"]} />}
      </div>
    </div>
  )
}
export default App
import { useState } from 'react'
import './App.css'
import ExportData from './components/ExportData'
import InputBox from './components/InputBox'
import PercentileGraph from './components/PercentileGraph'
import SimulationSimmary from './components/SimulationSummary'
import IncomeTable from './components/IncomeTable'

function App() {
  const [simulationData, setSimulationData] = useState()

  return (
    <div className="min-h-screen flex">
      <div className="flex-1 p-2 ">
        <InputBox setSimulationData={setSimulationData} />
        {simulationData && <ExportData simulationData={simulationData}/>}
        {simulationData && <SimulationSimmary simulationData={simulationData}/>}
      </div>
      <div className="flex-1 p-2">
        {simulationData && <PercentileGraph percentileHistory={simulationData["percentile_balance_history"]}/>}
        {simulationData && <IncomeTable NetIncomeData={simulationData["net_income_by_year"]}/>}
      </div>
    </div>
  )
}

export default App

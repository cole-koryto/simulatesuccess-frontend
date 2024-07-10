import { useState } from 'react'
import './App.css'
import ExportData from './components/ExportData'
import InputBox from './components/InputBox'
import PercentileGraph from './components/PercentileGraph'
import SimulationSimmary from './components/SimulationSummary'

function App() {
  const [simulationData, setSimulationData] = useState()

  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="col-start-1 col-span-1 ">
        <InputBox setSimulationData={setSimulationData} />
      </div>
      <div className="col-start-2 col-span-1">
        {simulationData && <PercentileGraph percentileHistory={simulationData["percentile_balance_history"]}/>}
      </div>
      <div className="col-start-1">
        {simulationData && <ExportData simulationData={simulationData}/>}
      </div>
      <div className="col-start-1">
        {simulationData && <SimulationSimmary simulationData={simulationData}/>}
      </div>
    </div>
  )
}

export default App

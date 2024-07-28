import { injectSpeedInsights } from '@vercel/speed-insights';
import { useState } from 'react'
import CashFLowsTable from './components/CashFlowsTable'
import ExportData from './components/ExportData'
import InputBox from './components/InputBox'
import PercentileGraph from './components/PercentileGraph'
import SimulationSummary from './components/SimulationSummary'

injectSpeedInsights();

function App() {
  const [simulationData, setSimulationData] = useState()
  const [simulationInputs, setSimulationInputs] = useState()

  return (
    <div>
      <div className="bg-gray-700 p-4 m-4 rounded">
          <h1 className="text-3xl font-bold text-white text-center">Simulate Success - Monte Carlo Retirement Calculator</h1>
      </div>
      <div className="flex flex-col md:flex-row text-center">
        
        <div className="w-full md:w-1/2 p-4">
          <InputBox setSimulationInputs={setSimulationInputs} setSimulationData={setSimulationData} />
          {simulationData && <ExportData data={simulationInputs} displayText="Export Simulation Inputs to JSON" fileName="simulation_inputs.json" />}
          {simulationData && <ExportData data={simulationData} displayText="Export Results to JSON" fileName="simulation_results.json" />}
          {simulationData && <SimulationSummary simulationSummary={simulationData["simulation_summary"]} />}
        </div>
        <div className="w-full md:w-1/2 p-4">
          {simulationData && <PercentileGraph percentileHistory={simulationData["percentile_balance_history"]} />}
          {simulationData && <CashFLowsTable TotalIncomeData={simulationData["income_by_year"]} TotalSpendingData={simulationData["spending_by_year"]} NetIncomeData={simulationData["net_income_by_year"]} />}
        </div>
      </div>
    </div>
  )
}
export default App
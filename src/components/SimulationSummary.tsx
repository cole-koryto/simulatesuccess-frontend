import React from 'react'

//@ts-ignore
const SimulationSimmary = ({ simulationData }) => {
    return (
        
        <div className="flex-wrap flex-column">
            <h2 className="text-2xl font-bold bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">Success Rate: {(simulationData["simulation_summary"]["success_rate"]*100).toFixed(2)}%</h2>
            <h2 className="text-2xl leading-6 font-medium m-4">Balance Summary</h2>
            <div className="flex flex-row bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <div className="flex-column grow text-left m-2">
                    <h3 className="text-sm leading-6 font-medium">Min Balance</h3>
                    <p className="text-xl font-bold">{simulationData["simulation_summary"]["balance_summary"]["min"].toFixed(2)}</p>
                </div>
                <div className="flex-column grow text-left m-2">
                    <h3 className="text-sm leading-6 font-medium">Max Balance</h3>
                    <p className="text-xl font-bold">{simulationData["simulation_summary"]["balance_summary"]["max"].toFixed(2)}</p>
                </div>
                <div className="flex-column grow text-left m-2">
                    <h3 className="text-sm leading-6 font-medium">Average Balance</h3>
                    <p className="text-xl font-bold">{simulationData["simulation_summary"]["balance_summary"]["mean"].toFixed(2)}</p>
                </div>
                <div className="flex-column grow text-left m-2">
                    <h3 className="text-sm leading-6 font-medium">Balance Std</h3>
                    <p className="text-xl font-bold">{simulationData["simulation_summary"]["balance_summary"]["std"].toFixed(2)}</p>
                </div>
            </div>
            <h2 className="text-2xl leading-6 font-medium m-4">Return Summary</h2>
            <div className="flex flex-row bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <div className="flex-column grow text-left m-2">
                    <h3 className="text-sm leading-6 font-medium">Min Return</h3>
                    <p className="text-xl font-bold">{(simulationData["simulation_summary"]["return_summary"]["min"]*100).toFixed(2)}%</p>
                </div>
                <div className="flex-column grow text-left m-2">
                    <h3 className="text-sm leading-6 font-medium">Max Return</h3>
                    <p className="text-xl font-bold">{(simulationData["simulation_summary"]["return_summary"]["max"]*100).toFixed(2)}%</p>
                </div>
                <div className="flex-column grow text-left m-2">
                    <h3 className="text-sm leading-6 font-medium">Average Return</h3>
                    <p className="text-xl font-bold">{(simulationData["simulation_summary"]["return_summary"]["mean"]*100).toFixed(2)}%</p>
                </div>
                <div className="flex-column grow text-left m-2">
                    <h3 className="text-sm leading-6 font-medium">Return Std</h3>
                    <p className="text-xl font-bold">{(simulationData["simulation_summary"]["return_summary"]["std"]*100).toFixed(2)}%</p>
                </div>
            </div>
        </div>
    )
}
export default SimulationSimmary
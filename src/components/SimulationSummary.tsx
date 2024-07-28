//@ts-ignore
const SimulationSummary = ({ simulationSummary }) => {
    return (
        <div className="flex-wrap flex-column bg-gray-800 border-b border-gray-700 p-5 rounded">
            <h2 className="text-2xl font-bold bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 placeholder-gray-400">
                Success Rate: {(simulationSummary["success_rate"] * 100).toFixed(2)}%
            </h2>
            <h2 className="text-2xl leading-6 font-bold text-white m-4 mt-8">Balance Summary</h2>
            <div className="flex flex-wrap bg-gray-700 border border-gray-600 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 placeholder-gray-400">
                <div className="flex flex-col grow text-left m-2 break-words">
                    <h3 className="text-sm leading-6 font-normal">Min Balance</h3>
                    <p className="text-xl font-bold">{Number(simulationSummary["balance_summary"]["min"].toFixed(2)).toLocaleString()}</p>
                </div>
                <div className="flex flex-col grow text-left m-2 break-words">
                    <h3 className="text-sm leading-6 font-normal">Max Balance</h3>
                    <p className="text-xl font-bold">{Number(simulationSummary["balance_summary"]["max"].toFixed(2)).toLocaleString()}</p>
                </div>
                <div className="flex flex-col grow text-left m-2 break-words">
                    <h3 className="text-sm leading-6 font-normal">Average Balance</h3>
                    <p className="text-xl font-bold">{Number(simulationSummary["balance_summary"]["mean"].toFixed(2)).toLocaleString()}</p>
                </div>
                <div className="flex flex-col grow text-left m-2 break-words">
                    <h3 className="text-sm leading-6 font-normal">Balance Standard Dev.</h3>
                    <p className="text-xl font-bold">{Number(simulationSummary["balance_summary"]["std"].toFixed(2)).toLocaleString()}</p>
                </div>
            </div>
            <h2 className="text-2xl leading-6 font-bold text-white m-4 mt-8">Return Summary</h2>
            <div className="flex flex-wrap bg-gray-700 border border-gray-600 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 placeholder-gray-400">
                <div className="flex flex-col grow text-left m-2 break-words">
                    <h3 className="text-sm leading-6 font-normal">Min Return</h3>
                    <p className="text-xl font-bold">{(Number(simulationSummary["return_summary"]["min"] * 100).toFixed(2)).toLocaleString()}%</p>
                </div>
                <div className="flex flex-col grow text-left m-2 break-words">
                    <h3 className="text-sm leading-6 font-normal">Max Return</h3>
                    <p className="text-xl font-bold">{(Number(simulationSummary["return_summary"]["max"] * 100).toFixed(2)).toLocaleString()}%</p>
                </div>
                <div className="flex flex-col grow text-left m-2 break-words">
                    <h3 className="text-sm leading-6 font-normal">Average Return</h3>
                    <p className="text-xl font-bold">{(Number(simulationSummary["return_summary"]["mean"] * 100).toFixed(2)).toLocaleString()}%</p>
                </div>
                <div className="flex flex-col grow text-left m-2 break-words">
                    <h3 className="text-sm leading-6 font-normal">Return Standard Dev.</h3>
                    <p className="text-xl font-bold">{(Number(simulationSummary["return_summary"]["std"] * 100).toFixed(2)).toLocaleString()}%</p>
                </div>
            </div>
        </div>
    )
}

export default SimulationSummary;

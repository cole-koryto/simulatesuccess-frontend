import { useState } from 'react'
import AddablePercentileBox from './AddablePercentileBox'
import AddableSourceBoxV2 from './AddableSourceBoxV2'
import axios from 'axios';

//@ts-ignore
const InputBox = ({ setSimulationInputs, setSimulationData }) => {
    const [percentiles, setPercentiles] = useState(["25", "50", "75"]);
    const [incomeSources, setIncomeSources] = useState([{title: "", amount: "", starting_age: "", ending_age: "", growth: "0.00"}]);
    const [spendingSources, setSpendingSources] = useState([{title: "", amount: "", starting_age: "", ending_age: "", growth: "0.00"}]);
    const [loading, setLoading] = useState(false);
    const [file, setFile] = useState();
    const [fileContent, setFileContent] = useState();

    const expectedResponseKeys = ["simulation_summary", "percentile_sets", "balance_history", "return_history", "percentile_balance_history", "income_by_year", "spending_by_year", "net_income_by_year"]

    const [currentBalance, setCurrentBalance] = useState("");
    const [numSimulations, setNumSimulations] = useState("1000");

    // Checks if the response from the api is in the expected format
    const isResponseValid = (responseData: any) => {
        if(!(JSON.stringify(expectedResponseKeys) == JSON.stringify(Object.keys(responseData))))
        {
            console.error("Error response received but not in expected format. Please try disabling adblock tools.")
            alert("Error response received but not in expected format. Please try disabling adblock tools.")
            return false
        }

        return true
    }

    // Updates selected file based on user selection
    const handleFileChange = (event: any) => {
        try{
            if (!event.target.files)
                throw new Error("Error files do not exist in submission event.")
            const localFile = event.target.files[0];
            const fileReader = new FileReader();
            fileReader.readAsText(localFile, "UTF-8");
            fileReader.onload = event => {
                const reader = event.target as FileReader;
                setFileContent(JSON.parse(reader.result as string));
        }
        setFile(localFile)
        }
        catch (error){
            alert("Error processing json file. Check your json file and try again.\n" + error);
            console.error(error);
        }  
    }

    // Converts types of data and does error checking
    const processInputs = (data: any) => {
        try{
            // Converts singular data values to numbers
            data.annual_return = Number(data.annual_return)
            data.return_std = Number(data.return_std)
            data.current_balance = Number(data.current_balance)
            data.current_age = Number(data.current_age)
            data.life_expectancy = Number(data.life_expectancy)
            data.inflation = Number(data.inflation)
            data.num_simulations = Number(data.num_simulations)
            data.distribution_type = String(data.distribution_type)
            data.random_state = Number(data.random_state)
            data.random_state == 0 ? data.random_state = null: data.random_state = data.random_state

            // Check singular data values
            if (!data.annual_return && data.annual_return != 0)
                throw new Error("annual_return is not a number.")
            if (!data.return_std && data.return_std != 0)
                throw new Error("return_std is not a number.")
            if (!data.current_balance && data.current_balance != 0)
                throw new Error("current_balance is not a number.")
            if (!Number.isInteger(data.current_age) || !(data.current_age >= 0))
                throw new Error("current_age is not an integer or not >= 0.")
            if (!Number.isInteger(data.life_expectancy) || !(data.life_expectancy >= 0) || !(data.life_expectancy > data.current_age))
                throw new Error("life_expectancy is not an integer or not >= 0 or not greater than current_age.")
            if (!data.inflation && data.inflation != 0)
                throw new Error("inflation is not a number.")
            if (!Number.isInteger(data.num_simulations) || !(data.num_simulations <= 10000) || !(data.num_simulations >= 1))
                throw new Error("num_simulations is not an integer or not <= 10000 or not >= 1.")
            if (!Number.isInteger(data.random_state) && !(data.random_state == null))
                throw new Error("random_state is not an integer or not null.")
            
            // Convert and check percentiles
            if (data.percentiles.length < 1)
            {
                throw new Error("There must be at least one percentile.")
            }
            for (let i = 0; i < data.percentiles.length; i++)
            {
                data.percentiles[i] = Number(data.percentiles[i])
                if (!(0 <= data.percentiles[i] && data.percentiles[i] <= 100))
                    throw new Error("Percentile is not between 0 and 100 inclusive")
            }

            // Convert and check income sources
            for (let i = 0; i < data.income_sources.length; i++)
            {   
                data.income_sources[i]["title"] = String(data.income_sources[i]["title"])
                data.income_sources[i]["amount"] = Number(data.income_sources[i]["amount"])
                data.income_sources[i]["starting_age"] = Number(data.income_sources[i]["starting_age"])
                data.income_sources[i]["ending_age"] = Number(data.income_sources[i]["ending_age"])
                data.income_sources[i]["growth"] = Number(data.income_sources[i]["growth"])
                if (!data.income_sources[i]["amount"] && data.income_sources[i]["amount"] != 0)
                    throw new Error("Income source amount is not a number.")
                if (!Number.isInteger(data.income_sources[i]["starting_age"]) || !(data.income_sources[i]["starting_age"] >= 0) || !(data.income_sources[i]["starting_age"] >= data.current_age))
                    throw new Error("Income source starting_age is not an integer or not >= 0 or not >= current_age.")
                if (!Number.isInteger(data.income_sources[i]["ending_age"]) || !(data.income_sources[i]["ending_age"] >= 0) || !(data.income_sources[i]["ending_age"] > data.income_sources[i]["starting_age"]))
                    throw new Error("Income source ending_age is not an integer or not >= 0 or not greater than starting age.")
                if (!data.income_sources[i]["growth"] && data.income_sources[i]["growth"] != 0)
                    throw new Error("Income source growth is not a number.")
            }

            // Convert and check spending sources
            for (let i = 0; i < data.spending_sources.length; i++)
            {
                data.spending_sources[i]["title"] = String(data.spending_sources[i]["title"])
                data.spending_sources[i]["amount"] = Number(data.spending_sources[i]["amount"])
                data.spending_sources[i]["starting_age"] = Number(data.spending_sources[i]["starting_age"])
                data.spending_sources[i]["ending_age"] = Number(data.spending_sources[i]["ending_age"])
                data.spending_sources[i]["growth"] = Number(data.spending_sources[i]["growth"])
                if (!data.spending_sources[i]["amount"] && data.spending_sources[i]["amount"] != 0)
                    throw new Error("Spending source amount is not a number.")
                if (!Number.isInteger(data.spending_sources[i]["starting_age"]) || !(data.spending_sources[i]["starting_age"] >= 0) || !(data.spending_sources[i]["starting_age"] >= data.current_age))
                    throw new Error("Spending source starting_age is not an integer or not >= 0 or not >= current_age.")
                if (!Number.isInteger(data.spending_sources[i]["ending_age"]) || !(data.spending_sources[i]["ending_age"] >= 0) || !(data.spending_sources[i]["ending_age"] > data.spending_sources[i]["starting_age"]))
                    throw new Error("Spending source ending_age is not an integer or >= 0 or not greater than starting age.")
                if (!data.spending_sources[i]["growth"] && data.spending_sources[i]["growth"] != 0)
                    throw new Error("Spending source growth is not a number.")
            }
            return data
        }
        catch (error)
        {
            alert("Error invalid inputs. Check your inputs and try again.\n" + error)
            console.error(error)
            return null
        }
    }

    // Takes data from form submission event and moves it into a structure
    const getDataFromForm = (event: any) => {
        let data = {
            annual_return: event.target.annual_return.value,
            return_std: event.target.return_std.value,
            current_balance: currentBalance,
            current_age: event.target.current_age.value,
            life_expectancy: event.target.life_expectancy.value,
            inflation: event.target.inflation.value,
            num_simulations: numSimulations,
            distribution_type: event.target.distribution_type.value,
            random_state: event.target.random_state.value,
            percentiles: percentiles,
            income_sources: incomeSources,
            spending_sources: spendingSources
        };
        return data;
    }

    // Takes event from user form submission and tries to send api request 
    const handleSubmit = (event: any) => {
        event.preventDefault()
        if(loading)
        {
            alert("Cannot submit another request. Currently loading previous request.")
            return
        }

        // Collects data from from or json and converts types and does error checking
        let data = null;
        if(event.target.id == "form")
            data = getDataFromForm(event);
        else if(event.target.id == "json_form")
        {
            if(!file)
            {
                alert("Cannot submit from json file without file selected.")
                return
            }
            data = fileContent;
        }
        else
        {
            alert("Error submission from invalid source")
            return
        }
        console.log("data", data)

        const typedData = processInputs(data);
        console.log("typedData", typedData)

        // If data is processed correctly send api request to backend
        if (typedData != null)
        {
            setLoading(true)
            axios.post('https://simulatesuccess.info/', typedData)
            .then((response) => {
                setLoading(false);
                console.log("response", response.data);
                if(!isResponseValid(response.data))
                    return
                setSimulationInputs(typedData);
                setSimulationData(response.data);
            })
            .catch((error) => {
                setLoading(false);
                console.error('Error:', error);
                alert('Error: ' + error)
            });
        }
    }

    return (
        <div className="bg-gray-800 border-gray-700 p-5 rounded">
            <form id="form" className="grid grid-cols-4 gap-2 items-end" onSubmit={handleSubmit}>
                <div className="col-start-1 mb-3">
                    <label htmlFor="current_balance" className="block mb-3 font-normal text-white">Current Balance</label>
                    <input required 
                        name="current_balance"
                        id="current_balance" 
                        value={currentBalance ? Number(currentBalance).toLocaleString() : ""}
                        onChange={(e) => setCurrentBalance(e.target.value.replace(/[,\D]/g, ""))}
                        inputMode="decimal"
                        maxLength={21}
                        className="bg-gray-700 border border-gray-600 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 placeholder-gray-400">
                    </input>
                </div>
                <div className="mb-3">
                    <label htmlFor="annual_return" className="block mb-3 font-normal text-white">Annual Return</label>
                    <input required name="annual_return" id="annual_return" inputMode="decimal" maxLength={16} className="bg-gray-700 border border-gray-600 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 placeholder-gray-400"></input>
                </div>
                <div className="mb-3">
                    <label htmlFor="return_std" className="block mb-3 font-normal text-white">Return Standard Dev.</label>
                    <input required name="return_std" id="return_std" inputMode="decimal" maxLength={16} className="bg-gray-700 border border-gray-600 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 placeholder-gray-400"></input>
                </div>
                <div className="mb-3">
                    <label htmlFor="current_age" className="block mb-3 font-normal text-white">Current Age</label>
                    <input required name="current_age" id="current_age" inputMode="decimal" maxLength={16} className="bg-gray-700 border border-gray-600 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 placeholder-gray-400"></input>
                </div>
                <div className="col-start-1 mb-3">
                    <label htmlFor="life_expectancy" className="block mb-3 font-normal text-white">Life Expectancy</label>
                    <input required defaultValue="92" name="life_expectancy" id="life_expectancy" maxLength={16} inputMode="decimal" className="bg-gray-700 border border-gray-600 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 placeholder-gray-400"></input>
                </div>
                <div className="mb-3">
                    <label htmlFor="inflation" className="block mb-3 font-normal text-white">Inflation</label>
                    <input required defaultValue="0.03" name="inflation" id="inflation" inputMode="decimal" maxLength={16} className="bg-gray-700 border border-gray-600 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 placeholder-gray-400"></input>
                </div>
                <div className="mb-3">
                    <label htmlFor="num_simulations" className="block mb-3 font-normal text-white">Number of Simulations</label>
                    <input required 
                        name="num_simulations"
                        id="num_simulations" 
                        value={numSimulations ? Number(numSimulations).toLocaleString() : ""}
                        onChange={(e) => setNumSimulations(e.target.value.replace(/[,\D]/g, ""))}
                        inputMode="decimal"
                        maxLength={21}
                        className="bg-gray-700 border border-gray-600 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 placeholder-gray-400">
                    </input>
                </div>
                <div className="mb-3">
                    <label htmlFor="random_state" className="block mb-3 font-normal text-white">Repeatable Results</label>
                    <select name="random_state" id="random_state" className="bg-gray-700 border border-gray-600 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 placeholder-gray-400">
                        <option value="">False</option>
                        <option value="1">True</option>
                    </select>
                </div>
                <div className="col-start-1 col-span-4 mb-3">
                    <p className="block mb-1 font-normal text-white">Income Sources</p>
                    <p className="block mb-1 font-light text-sm text-white">(title, amount, starting age, ending age, growth)</p>
                    <AddableSourceBoxV2 groups={incomeSources} setGroups={setIncomeSources}/>
                </div>
                <div className="col-start-1 col-span-4 mb-3">
                    <p className="block mb-1 font-normal text-white">Spending Sources</p>
                    <p className="block mb-1 font-light text-sm text-white">(title, amount, starting age, ending age, growth)</p>
                    <AddableSourceBoxV2 groups={spendingSources} setGroups={setSpendingSources}/>
                </div>
                <div className="col-start-1 col-span-2 mb-3">
                    <p className="block mb-3 font-normal text-white">Final Balance Percentiles</p>
                    <AddablePercentileBox fields={percentiles} setFields={setPercentiles}/>
                </div>
                <div className="col-span-2 self-start mb-3">
                    <label htmlFor="distribution_type" className="block mb-3 font-normal text-white">Select Distribution Type</label>
                    <select name="distribution_type" id="distribution_type" className="bg-gray-700 border border-gray-600 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 placeholder-gray-400">
                        <option value="normal">Normal</option>
                        <option value="laplace">Laplace</option>
                    </select>
                </div>
                <button type="submit" className="col-start-2 col-span-2 text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-800 font-normal rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">{loading ? <>Loading...</> : <>Submit Form Inputs</>}</button>
            </form>
            <form id="json_form" onSubmit={handleSubmit} className="mt-5">
                <input type="file" accept=".json,application/json" className="text-white p-2" onChange={handleFileChange}/>
                <button type="submit" className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-800 font-normal rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">{loading ? <>Loading...</> : <>Submit Inputs From JSON</>}</button>
            </form>
        </div>
    )
}
export default InputBox
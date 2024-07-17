import React, { useState } from 'react'
import AddablePercentileBox from './AddablePercentileBox'
import AddableSourceBox from './AddableSourceBox'
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

    const handleFileChange = (event: any) => {
        try{
        const localFile = event.target.files[0]
        const fileReader = new FileReader();
        fileReader.readAsText(localFile, "UTF-8");
        fileReader.onload = event => {
            setFileContent(JSON.parse(event.target.result));
        }
        setFile(localFile)
        }
        catch (error){
            alert("Error processing json file. Check your json file and try again.\n" + error)
            console.error(error)
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
                throw new Error("annual_return is not a number")
            if (!data.return_std && data.return_std != 0)
                throw new Error("return_std is not a number")
            if (!data.current_balance && data.current_balance != 0)
                throw new Error("current_balance is not a number")
            if (!Number.isInteger(data.current_age) || !(data.current_age >= 0))
                throw new Error("current_age is not an integer or >= 0")
            if (!Number.isInteger(data.life_expectancy) || !(data.life_expectancy >= 0) || !(data.life_expectancy > data.current_age))
                throw new Error("life_expectancy is not an integer or >= 0 or greater than current_age")
            if (!data.inflation && data.inflation != 0)
                throw new Error("inflation is not a number")
            if (!Number.isInteger(data.num_simulations) || !(data.num_simulations >= 1))
                throw new Error("num_simulations is not an integer or >= 1")
            if (!Number.isInteger(data.random_state) && !(data.random_state == null))
                throw new Error("random_state is not an integer or null")
            
            // Convert and check percentiles
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
                    throw new Error("Income source amount is not a number")
                console.log(data.income_sources[i]["growth"])
                if (!Number.isInteger(data.income_sources[i]["starting_age"]) || !(data.income_sources[i]["starting_age"] >= 0))
                    throw new Error("Income source starting_age is not an integer or >= 0")
                if (!Number.isInteger(data.income_sources[i]["ending_age"]) || !(data.income_sources[i]["ending_age"] >= 0) || !(data.income_sources[i]["ending_age"] > data.income_sources[i]["starting_age"]))
                    throw new Error("Income source ending_age is not an integer or >= 0 or greater than starting age")
                if (!data.income_sources[i]["growth"] && data.income_sources[i]["growth"] != 0)
                    throw new Error("Income source growth is not a number")
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
                    throw new Error("Spending source amount is not a number")
                if (!Number.isInteger(data.spending_sources[i]["starting_age"]) || !(data.spending_sources[i]["starting_age"] >= 0))
                    throw new Error("Spending source starting_age is not an integer or >= 0")
                if (!Number.isInteger(data.spending_sources[i]["ending_age"]) || !(data.spending_sources[i]["ending_age"] >= 0) || !(data.spending_sources[i]["ending_age"] > data.spending_sources[i]["starting_age"]))
                    throw new Error("Spending source ending_age is not an integer or >= 0 or greater than starting age")
                if (!data.spending_sources[i]["growth"] && data.spending_sources[i]["growth"] != 0)
                    throw new Error("Spending source growth is not a number")
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

    const getDataFromForm = (event: any) => {
        let data = {
            annual_return: event.target.annual_return.value,
            return_std: event.target.return_std.value,
            current_balance: event.target.current_balance.value,
            current_age: event.target.current_age.value,
            life_expectancy: event.target.life_expectancy.value,
            inflation: event.target.inflation.value,
            num_simulations: event.target.num_simulations.value,
            distribution_type: event.target.distribution_type.value,
            random_state: event.target.random_state.value,
            percentiles: percentiles,
            income_sources: incomeSources,
            spending_sources: spendingSources
        };
        return data;
    }

    const handleSubmit = (event: any) => {
        event.preventDefault()
        if(loading)
        {
            alert("Cannot submit another request. Currently loading previous request.")
            return
        }
        if(!file)
        {
            alert("Cannot submit without file selected.")
            return
        }

        // Collects data from from or json and converts types and does error checking
        console.log(event.target.id)
        let data = null;
        if(event.target.id == "form")
            data = getDataFromForm(event);
        else if(event.target.id == "json_form")
            data = fileContent;
        else
        {
            alert("Error submission from invalid source")
            return
        }
        console.log("data", data)

        const typedData = processInputs(data);
        console.log("typedData", typedData)

        // If data is processed correctly send api requst to backend
        if (typedData != null){
            setLoading(true)
            axios.post('http://127.0.0.1:8000/main/', typedData)
            .then((response) => {
                setLoading(false);
                console.log(response.data);
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
        <div className="bg-zinc-300 border-b dark:bg-gray-800 dark:border-gray-700 p-5 rounded">
            <form id="form" className="grid grid-cols-4 gap-2 " onSubmit={handleSubmit}>
                <div className="col-start-1 mb-5">
                    <label htmlFor="current_balance" className="block mb-2 font-medium text-gray-900 dark:text-white">Current Balance</label>
                    <input required name="current_balance" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"></input>
                </div>
                <div className="mb-5">
                    <label htmlFor="annual_return" className="block mb-2 font-medium text-gray-900 dark:text-white">Annual Return</label>
                    <input required name="annual_return" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"></input>
                </div>
                <div className="mb-5">
                    <label htmlFor="return_std" className="block mb-2 font-medium text-gray-900 dark:text-white">Return Standard Dev.</label>
                    <input required name="return_std" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"></input>
                </div>
                <div className="mb-5">
                    <label htmlFor="current_age" className="block mb-2 font-medium text-gray-900 dark:text-white">Current Age</label>
                    <input required name="current_age" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"></input>
                </div>
                <div className="col-start-1 mb-5">
                    <label htmlFor="life_expectancy" className="block mb-2 font-medium text-gray-900 dark:text-white">Life Expectancy</label>
                    <input required defaultValue="92" name="life_expectancy" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"></input>
                </div>
                <div className="mb-5">
                    <label htmlFor="inflation" className="block mb-2 font-medium text-gray-900 dark:text-white">Inflation</label>
                    <input required defaultValue="0.03" name="inflation" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"></input>
                </div>
                <div className="mb-5">
                    <label htmlFor="num_simulations" className="block mb-2 font-medium text-gray-900 dark:text-white">Number of Simulations</label>
                    <input required defaultValue="1000" name="num_simulations" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"></input>
                </div>
                <div className="mb-5">
                    <label htmlFor="random_state" className="block mb-2 font-medium text-gray-900 dark:text-white">Random State</label>
                    <input name="random_state" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"></input>
                </div>
                <div className="col-start-1 col-span-4 mb-5">
                    <p className="block mb-2 font-medium text-gray-900 dark:text-white">Enter income sources (title, amount, starting age, ending age, growth)</p>
                    <AddableSourceBoxV2 groups={incomeSources} setGroups={setIncomeSources}/>
                </div>
                <div className="col-start-1 col-span-4 mb-5">
                    <p className="block mb-2 font-medium text-gray-900 dark:text-white">Enter spending sources (title, amount, starting age, ending age, growth)</p>
                    <AddableSourceBoxV2 groups={spendingSources} setGroups={setSpendingSources}/>
                </div>
                <div className="col-start-1 col-span-2">
                    <p className="block mb-2 font-medium text-gray-900 dark:text-white">Enter balance percentiles</p>
                    <AddablePercentileBox fields={percentiles} setFields={setPercentiles}/>
                </div>
                <div className="col-span-2">
                    <label htmlFor="distribution_type" className="block mb-2 font-medium text-gray-900 dark:text-white">Select Distribution Type</label>
                    <select name="distribution_type" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        <option value="normal">Normal</option>
                        <option value="laplace">Laplace</option>
                    </select>
                </div>
                <button type="submit" className="col-start-2 col-span-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">{loading ? <>Loading...</> : <>Submit Form Inputs</>}</button>
            </form>
            <form id="json_form" onSubmit={handleSubmit} className="mt-5">
                <input type="file" accept=".json,application/json" className="text-gray-900 dark:text-white" onChange={handleFileChange}/>
                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit Inputs From JSON</button>
            </form>
        </div>
    )
}

export default InputBox

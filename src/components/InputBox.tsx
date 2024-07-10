import React, { useState, FC, useEffect } from 'react'
import AddablePercentileBox from './AddablePercentileBox'
import AddableSourceBox from './AddableSourceBox'
import AddableSourceBoxV2 from './AddableSourceBoxV2'
import axios from 'axios';

//@ts-ignore
const InputBox = ({ setSimulationData }) => {
    const [percentiles, setPercentiles] = useState([""]);
    const [incomeSources, setIncomeSources] = useState([{title: "", amount: "", starting_age: "", ending_age: "", growth: ""}]);
    const [spendingSources, setSpendingSources] = useState([{title: "", amount: "", starting_age: "", ending_age: "", growth: ""}]);

    const convertTypes = (data: any) => {
        try{
            data.annual_return = Number(data.annual_return)
            data.return_std = Number(data.return_std)
            data.current_balance = Number(data.current_balance)
            data.current_age = Number(data.current_age)
            data.life_expectancy = Number(data.life_expectancy)
            data.inflation = Number(data.inflation)
            data.num_simulations = Number(data.num_simulations)
            data.distribution_type = String(data.distribution_type)
            data.random_state = Number(data.random_state)

            if (!data.annual_return)
                throw new Error("annual_return is not a number")
            if (!data.return_std)
                throw new Error("return_std is not a number")
            if (!data.current_balance)
                throw new Error("current_balance is not a number")
            if (!Number.isInteger(data.current_age) || !data.current_age)
                throw new Error("current_age is not an integer")
            if (!Number.isInteger(data.life_expectancy) || !data.life_expectancy)
                throw new Error("life_expectancy is not an integer")
            if (!data.inflation)
                throw new Error("inflation is not a number")
            if (!Number.isInteger(data.num_simulations) || !data.num_simulations)
                throw new Error("num_simulations is not an integer")

            
            for (let i = 0; i < data.income_sources.length; i++)
            {   
                data.income_sources[i]["title"] = String(data.income_sources[i]["title"])
                data.income_sources[i]["amount"] = Number(data.income_sources[i]["amount"])
                data.income_sources[i]["starting_age"] = Number(data.income_sources[i]["starting_age"])
                data.income_sources[i]["ending_age"] = Number(data.income_sources[i]["ending_age"])
                data.income_sources[i]["growth"] = Number(data.income_sources[i]["growth"])
            }
            for (let i = 0; i < data.spending_sources.length; i++)
            {
                data.spending_sources[i]["title"] = String(data.spending_sources[i]["title"])
                data.spending_sources[i]["amount"] = Number(data.spending_sources[i]["amount"])
                data.spending_sources[i]["starting_age"] = Number(data.spending_sources[i]["starting_age"])
                data.spending_sources[i]["ending_age"] = Number(data.spending_sources[i]["ending_age"])
                data.spending_sources[i]["growth"] = Number(data.spending_sources[i]["growth"])
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

    const handleSubmit = (event: any) => {
        event.preventDefault()
        // console.log("current_balance=" + event.target.current_balance.value)
        // console.log("annual_return=" + event.target.annual_return.value)
        // console.log("return_std=" + event.target.return_std.value)
        // console.log("current_age=" + event.target.current_age.value)
        // console.log("life_expectancy=" + event.target.life_expectancy.value)
        // console.log("inflation=" + event.target.inflation.value)
        // console.log(percentiles)
        // console.log("distribution_type=" + event.target.distribution_type.value)
        // console.log("random_state=" + event.target.random_state.value)
        // console.log("income_sources=")
        // console.log(incomeSources)
        // console.log("spending_sources=")
        // console.log(spendingSources)

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
        console.log(data)
        
        const typedData = convertTypes(data);

        if (typedData != null){

            axios.post('http://127.0.0.1:8000/main/', typedData)
            .then((response) => {
                console.log(response.data);
                setSimulationData(response.data);
            })
            .catch((error) => {
                console.error('Error:', error);
                alert('Error: ' + error)
            });
        }
    }

    return (
        <div>
            <form className="grid grid-cols-4 gap-2" onSubmit={handleSubmit}>
                <div className="col-start-1 mb-5">
                    <label htmlFor="current_balance" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Current Balance</label>
                    <input required name="current_balance" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"></input>
                </div>
                <div className="mb-5">
                    <label htmlFor="annual_return" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Annual Return</label>
                    <input required defaultValue="0.06" name="annual_return" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"></input>
                </div>
                <div className="mb-5">
                    <label htmlFor="return_std" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Return Standard Deviation</label>
                    <input required defaultValue="0.06" name="return_std" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"></input>
                </div>
                <div className="mb-5">
                    <label htmlFor="current_age" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Current Age</label>
                    <input required name="current_age" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"></input>
                </div>
                <div className="col-start-1 mb-5">
                    <label htmlFor="life_expectancy" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Life Expectancy</label>
                    <input required defaultValue="92" name="life_expectancy" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"></input>
                </div>
                <div className="mb-5">
                    <label htmlFor="inflation" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Inflation</label>
                    <input required defaultValue="0.03" name="inflation" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"></input>
                </div>
                <div className="mb-5">
                    <label htmlFor="num_simulations" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Number of Simulations</label>
                    <input required defaultValue="1000" name="num_simulations" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"></input>
                </div>
                <div className="mb-5">
                    <label htmlFor="random_state" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Random State</label>
                    <input name="random_state" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"></input>
                </div>
                <div className="col-start-1 col-span-4 mb-5">
                    <p>Enter income sources (title, amount, starting age, ending age, growth)</p>
                    <AddableSourceBoxV2 groups={incomeSources} setGroups={setIncomeSources}/>
                </div>
                <div className="col-start-1 col-span-4 mb-5">
                    <p>Enter spending sources (title, amount, starting age, ending age, growth)</p>
                    <AddableSourceBoxV2 groups={spendingSources} setGroups={setSpendingSources}/>
                </div>
                <div className="col-start-1 col-span-2 mb-5">
                    <p>Enter balance percentiles</p>
                    <AddablePercentileBox fields={percentiles} setFields={setPercentiles}/>
                </div>
                <div className="col-span-2 mb-5">
                    <label htmlFor="distribution_type" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select Distribution Type</label>
                    <select name="distribution_type" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        <option value="normal">Normal</option>
                        <option value="laplace">Laplace</option>
                    </select>
                </div>
                <button type="submit" className="col-start-2 col-span-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
            </form>
        </div>
    )
}

export default InputBox

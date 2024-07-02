import React, { useState, FC } from 'react'
import AddablePercentileBox from './AddablePercentileBox'
import AddableSourceBox from './AddableSourceBox'
import axios from 'axios';


// interface MyInputProps 
// {
//     inputNameArray: Array<string>;
// }


// const InputBox = ({inputNameArray}: MyInputProps) => {
//   return (
//     <div>
//         <form className="max-w-sm mx-auto">
//             {inputNameArray.map((item, ) => (
//                 <div className="mb-5">
//                     <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{item}</label>
//                     <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"></input>
//                 </div> 
//             ))}
//         </form>
//     </div>
//   )
// }

const InputBox = () => {
    const [percentiles, setPercentiles] = useState([""]);
    const [incomeSources, setIncomeSources] = useState([""]);
    const [spendingSources, setSpendingSources] = useState([""]);

    const handleSubmit = (event: any) => {
        event.preventDefault()
        console.log("current_balance=" + event.target.current_balance.value)
        console.log("annual_return=" + event.target.annual_return.value)
        console.log("return_std=" + event.target.return_std.value)
        console.log("current_age=" + event.target.current_age.value)
        console.log("life_expectancy=" + event.target.life_expectancy.value)
        console.log("inflation=" + event.target.inflation.value)
        console.log(percentiles)
        console.log("distribution_type=" + event.target.distribution_type.value)
        console.log("random_state=" + event.target.random_state.value)


        // let data = {
        //     current_balance: event.target.current_balance.value,
        //     annual_return: event.target.annual_return.value,
        //     return_std: event.target.return_std.value,
        //     current_age: event.target.current_age.value,
        //     life_expectancy: event.target.life_expectancy.value,
        //     inflation: event.target.inflation.value,
        //     distribution_type: event.target.distribution_type.value,
        //     random_state: event.target.random_state.value,
        // };
        
        // axios.post('Your-API-Endpoint-Here', data)
        // .then((response) => {
        //     console.log(response.data);
        // })
        // .catch((error) => {
        //     console.error('Error:', error);
        // });
    }

    return (
        <div>
            <form className="max-w-sm mx-auto" onSubmit={handleSubmit}>
                <div className="mb-5">
                    <label htmlFor="current_balance" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Current Balance</label>
                    <input name="current_balance" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"></input>
                </div>
                <div className="mb-5">
                    <label htmlFor="annual_return" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Annual Return</label>
                    <input name="annual_return" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"></input>
                </div>
                <div className="mb-5">
                    <label htmlFor="return_std" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Return Standard Deviation</label>
                    <input name="return_std" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"></input>
                </div>
                <div className="mb-5">
                    <label htmlFor="current_age" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Current Age</label>
                    <input name="current_age" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"></input>
                </div>
                <div className="mb-5">
                    <label htmlFor="life_expectancy" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Life Expectancy</label>
                    <input name="life_expectancy" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"></input>
                </div>
                <div className="mb-5">
                    <label htmlFor="inflation" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Inflation</label>
                    <input name="inflation" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"></input>
                </div>
                <div className="mb-5">
                    <label htmlFor="num_simulations" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Number of Simulations</label>
                    <input name="num_simulations" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"></input>
                </div>
                <div className="mb-5">
                    <AddablePercentileBox fields={percentiles} setFields={setPercentiles}/>
                </div>
                <label htmlFor="distribution_type" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select Distribution Type</label>
                <select name="distribution_type" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <option value="normal">Normal</option>
                    <option value="laplace">Laplace</option>
                </select>
                <div className="mb-5">
                    <label htmlFor="random_state" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Random State</label>
                    <input name="random_state" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"></input>
                </div>
                <div className="mb-5">
                    <AddableSourceBox fields={incomeSources} setFields={setIncomeSources}/>
                </div>
                <div className="mb-5">
                    <AddableSourceBox fields={spendingSources} setFields={setSpendingSources}/>
                </div>

                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
            </form>
        </div>
    )
}

export default InputBox
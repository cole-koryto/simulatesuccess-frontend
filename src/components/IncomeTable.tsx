import React from 'react'

//@ts-ignore
const IncomeTable = ({ NetIncomeData }) =>
{
    const createHeaders = () => {
        NetIncomeData.map((plan) => {
          return <th>{plan}</th>
        });
      }
      
      const createContent = () => {
        this.props.table.planPrices.map((price) => {
          return <tr>{price}</tr>
        });
      }
      
      
      
        return(
          <table>
            <tr>
              {createHeaders}
            </tr>
            <tr>
              {this.createContent}
            </tr>
          </table>
        )
}
export default IncomeTable
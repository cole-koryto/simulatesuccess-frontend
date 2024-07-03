import React from 'react';
import { Line } from 'react-chartjs-2';

class PercentileBalances extends React.Component {
    constructor(props: any) {
        super(props);
        this.state = {
            data: {
                labels: [], // This should be your years
                datasets: [] // This should be your percentile balance data
            }
        };
    }

    // Assuming you fetch data in this lifecycle method
    componentDidMount() {
        // Fetch data and update state here
    }

    render() {
        return (
            <div>
                <h2>Percentile Balances</h2>
                <Line 
                    data={this.state.data} 
                    options={{
                        scales: {
                            yAxes: [{
                                ticks: {
                                    beginAtZero: true
                                }
                            }]
                        },
                        legend: {
                            display: true,
                            position: 'bottom'
                        }
                    }}
                />
            </div>
        );
    }
}

export default PercentileBalances;
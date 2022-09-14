import { ChartData, ChartDataset, ChartOptions, Tick } from "chart.js"
import { Chart as ChartJS } from 'react-chartjs-2'
import { 
    Chart, 
    CategoryScale, 
    LinearScale, 
    PointElement, 
    LineElement,
    Tooltip
} from "chart.js"
import styles from './MortgageAmortizationChart.module.css'
import MortgageInformation from "../../models/Mortgage/MortgageInformation"

// Must register for tree-shaking. The following doc has all the controllers, elements, scales and plugins.
// Documentation: https://www.chartjs.org/docs/3.3.0/getting-started/integration.html#bundlers-webpack-rollup-etc
Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip)

export interface MortgageAmortizationChartProps {
    mortgageInformation: MortgageInformation
}

export default function MortgageAmortizationChart(props: MortgageAmortizationChartProps) {
    const { mortgageInformation } = props
    const chartType = 'line'
    const options: ChartOptions = {
        scales: {
            x: {
                title: {
                    color: 'black',
                    display: true,
                    text: 'Month'
                }
            },
            y: {
                ticks: {
                    // Include a dollar sign in the ticks
                    callback: function(value: string | number, index: number, ticks: Tick[]) {
                        return '$' + value;
                    }
                },
                title: {
                    color: 'black',
                    display: true,
                    text: 'USD'
                }
            }
        },
        plugins: {
            legend: {
                display: true,
                position: 'left',
                align: 'start'
            }
        }
    }

    /**
     * Sets the charts datasets
     * @returns ChartData for mortgage amortization
     */
    function getChartData(): ChartData {
        let result: ChartData = {
            labels: getChartXAxisLabel(),
            datasets: []
        }

        if (mortgageInformation.Schedule?.length > 0) {
            // Get datasets
            result.datasets = getDatasets()
        }

        return result
    }

    /**
     * Calculates the full mortgage amortization schedule dataset given the mortgage information
     * @returns ChartData's dataset
     */
    function getDatasets(): [ChartDataset, ChartDataset] {
        const principalDataset: ChartDataset = {
            label: 'Principal',
            fill: false,
            tension: 0.1,
            borderColor: 'rgb(40, 255, 40)',
            data: []
        }
        const interestDataset: ChartDataset = {
            label: 'Interest',
            fill: false,
            tension: 0.1,
            borderColor: 'rgb(255, 40, 40)',
            data: []
        }

        if (mortgageInformation && mortgageInformation.Schedule) {
            for(let i = 0; i < mortgageInformation.Schedule.length; i++) {
                principalDataset.data.push(mortgageInformation.Schedule[i].Principal)
                interestDataset.data.push(mortgageInformation.Schedule[i].Interest)
            }
        }

        return [principalDataset, interestDataset]
    }

    function getChartXAxisLabel(): string[] {
        const result = []

        for(let i = 1; i < mortgageInformation.Schedule.length + 1; i++) {
            result.push(`${i}`)
        }

        return result
    }

    return (
        // Must wrap in an empty div or else the dimensions will grow "indefinitely"
        <section> 
            <ChartJS type={chartType}
                className={styles.mortgageAmortizationChart}
                height='500px'
                width='800px'
                data={getChartData()}
                options={options}/>
        </section>
    )
}
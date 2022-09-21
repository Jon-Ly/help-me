import { ChangeEvent, useState } from "react"
import MortgageAmortizationChart from "../../components/mortgage-amortization-chart"
import MortgageCalculatorForm from "../../components/mortgage-calculator-form"
import MortgageSummary from "../../components/mortgage-summary"
import Mortgage from "../../models/Mortgage/Mortgage"
import MortgageInformation from "../../models/Mortgage/MortgageInformation"
import MathUtility from "../../utility/MathUtility"
import styles from './MortgagePage.module.css'

export default function MortgageIndex() {
    const [mortgageInformation, setMortgageInformation] = useState<MortgageInformation>(new MortgageInformation())

    const fieldNames: { [key: string]: string } = {
        HomePrice: 'HomePrice',
        DownPayment: 'DownPayment',
        DownPaymentPercent: 'DownPaymentPercent',
        Interest: 'Interest',
        PropertyTax: 'PropertyTax',
        PrivateMortgageInsurance: 'PrivateMortgageInsurance',
        HomeOwnerInsurance: 'HomeOwnerInsurance',
        Term: 'Term',
        MonthlyExtra: 'MonthlyExtra'
    }

    /**
     * Updates the mortgage information when a form's field is changed.
     * @param event Change event from the various inputs
     */
    function onChange(event: ChangeEvent<HTMLInputElement>): void {
        const {name, value}: {name: string, value: string} = event?.target
        let newValue: number = Number(value)

        if (!isNaN(newValue) && name) {
            setMortgageInformation((prev: MortgageInformation) => {
                // Automatically recalculates Downpayment based on downPaymentPercentage
                // Can be annoying if you wanted to put in a flat amount without the amount changing
                if (name === fieldNames.HomePrice) {
                    prev.Mortgage.DownPayment = recalculateDownPaymentByHomePrice(newValue)
                } else if (name === fieldNames.DownPaymentPercent) {
                    newValue = MathUtility.clamp(newValue, 0, 100)
                    prev.Mortgage.DownPayment = recalculateDownPaymentByPercentage(newValue)
                } else if (name === fieldNames.DownPayment) {
                    newValue = MathUtility.clamp(newValue, 0, mortgageInformation.Mortgage.HomePrice ?? 0)
                    prev.Mortgage.DownPaymentPercent = recalculateDownPaymentPercentage(newValue)
                } else if (name === fieldNames.Interest) {
                    newValue = MathUtility.clamp(newValue, 0, 100)
                } else if (name === fieldNames.MonthlyExtra) {
                    newValue = MathUtility.clamp(newValue, 0, 99999999)
                }

                prev.Mortgage[name as keyof Mortgage] = value ? newValue : undefined
    
                return new MortgageInformation(prev)
            })
        }
    }

    function recalculateDownPaymentByPercentage(percentage: number): number {
        return Number(((mortgageInformation?.Mortgage?.HomePrice ?? 0) * (percentage / 100)).toFixed(2))
    }
    
    function recalculateDownPaymentByHomePrice(newHomePrice: number): number {
        return Number((newHomePrice * (mortgageInformation?.Mortgage?.DownPaymentPercent ?? 0) / 100).toFixed(2))
    }

    function recalculateDownPaymentPercentage(flatAmount: number): number {
        if (mortgageInformation?.Mortgage?.HomePrice) {
            return flatAmount > mortgageInformation?.Mortgage?.HomePrice ? 100 : Number(((flatAmount / mortgageInformation?.Mortgage?.HomePrice) * 100).toFixed(2))
        }

        return 100
    }
    
    return (
        <>
            <h1>Mortgage Calculator</h1>
            <article className={styles.mortgageCalculator}>
                <MortgageCalculatorForm fieldNames={fieldNames} onChange={onChange} mortgageInformation={mortgageInformation}/>
                <MortgageSummary mortgageInformation={mortgageInformation}/>
                <MortgageAmortizationChart mortgageInformation={mortgageInformation}/>
            </article>
        </>
    )
}
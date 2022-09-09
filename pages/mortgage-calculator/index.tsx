import { ChangeEvent, useState } from "react"
import MortgageAmortizationChart from "../../components/mortgage-amortization-chart"
import MortgageCalculatorForm from "../../components/mortgage-calculator-form"
import MortgageSummary from "../../components/mortgage-summary"
import Mortgage from "../../models/Mortgage/Mortgage"
import MortgageInformation from "../../models/Mortgage/MortgageInformation"
import MathUtility from "../../utility/MathUtility"
import RegexUtility from "../../utility/RegexUtility"
import styles from './MortgageCalculatorPage.module.css'

export default function MortgageIndex() {
    const [mortgageInformation, setMortgageInformation] = useState<MortgageInformation>(new MortgageInformation())

    const fieldNames = {
        HomePrice: 'HomePrice',
        DownPayment: 'DownPayment',
        DownPaymentPercent: 'DownPaymentPercent',
        Interest: 'Interest',
        PropertyTax: 'PropertyTax',
        PrivateMortgageInsurance: 'PrivateMortgageInsurance',
        HomeOwnerInsurance: 'HomeOwnerInsurance',
        Term: 'Term'
    }

    /**
     * Updates the mortgage information when a form's field is changed.
     * @param event Change event from the various inputs
     */
    function onChange(event: ChangeEvent<any>) {
        const {name, value} = event?.target
        let newValue: number = Number(value)

        if (!isNaN(newValue)) {
            setMortgageInformation((prev: MortgageInformation) => {
                // Automatically recalculates Downpayment based on downPaymentPercentage
                // Can be annoying if you wanted to put in a flat amount without the amount changing
                if (name === fieldNames.HomePrice) {
                    prev.Mortgage.DownPayment = recalculateDownPaymentByHomePrice(newValue)
                } else if (name === fieldNames.DownPaymentPercent) {
                    if (RegexUtility.IsUSD(value) && value[value.length - 1] != '.') {
                        newValue = MathUtility.clamp(Number(value), 0, 100)
                        prev.Mortgage.DownPayment = recalculateDownPaymentByPercentage(newValue)
                    }
                } else if (name === fieldNames.DownPayment) {
                    newValue = MathUtility.clamp(Number(value), 0, Number.MAX_SAFE_INTEGER)
                    prev.Mortgage.DownPaymentPercent = recalculateDownPaymentPercentage(newValue)
                }
    
                prev.Mortgage[name as keyof Mortgage] = newValue
                return new MortgageInformation(prev)
            })
        }
    }

    function recalculateDownPaymentByPercentage(percentage: number) {
        return (mortgageInformation.Mortgage.HomePrice ?? 0) * (percentage / 100)
    }
    
    function recalculateDownPaymentByHomePrice(newHomePrice: number) {
        return newHomePrice * (mortgageInformation.Mortgage.DownPaymentPercent ?? 0) / 100
    }

    function recalculateDownPaymentPercentage(flatAmount: number) {
        if (mortgageInformation.Mortgage.HomePrice) {
            return flatAmount > mortgageInformation.Mortgage.HomePrice ? 100 : Number(((flatAmount / mortgageInformation.Mortgage.HomePrice) * 100).toFixed(2))
        }

        return 100
    }
    
    return (
        <article className={styles.mortgageCalculatorPage}>
            <MortgageCalculatorForm fieldNames={fieldNames} onChange={onChange} mortgageInformation={mortgageInformation}/>
            <MortgageSummary mortgageInformation={mortgageInformation}/>
            <MortgageAmortizationChart mortgageInformation={mortgageInformation}/>
        </article>
    )
}
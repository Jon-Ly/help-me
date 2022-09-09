import { useState } from "react"
import MortgageAmortizationChart from "../../components/mortgage-amortization-chart"
import MortgageCalculatorForm from "../../components/mortgage-calculator-form"
import MortgageSummary from "../../components/mortgage-summary"
import Mortgage from "../../models/Mortgage/Mortgage"
import MortgageInformation from "../../models/Mortgage/MortgageInformation"
import MathUtility from "../../utility/MathUtility"
import RegexUtility from "../../utility/RegexUtility"
import styles from './MortgageCalculatorPage.module.css'

export default function MortgageIndex() {
    const [mortgage, setMortgageData] = useState<Mortgage>({
        homePrice: 0,
        downPayment: 0,
        downPaymentPercent: 0,
        interest: 0,
        propertyTax: 0,
        privateMortgageInsurance: 0,
        homeOwnerInsurance: 0,
        term: 30,
    })

    const [mortgageInformation, setMortgageInformation] = useState<MortgageInformation>(new MortgageInformation())

    const fieldNames = {
        homePrice: 'homePrice',
        downPayment: 'downPayment',
        downPaymentPercent: 'downPaymentPercent',
        interest: 'interest',
        propertyTax: 'propertyTax',
        privateMortgageInsurance: 'privateMortgageInsurance',
        homeOwnerInsurance: 'homeOwnerInsurance',
        term: 'term'
    }

    /**
     * TODO: Refactor - consolidate Mortgage & MortgageInformation usage. Rename MortgageInformation to Mortgage & Mortgage to MortgageInput
     * Updates the mortgage information when a form's field is changed.
     * @param name 
     * @param value 
     */
    function onChange(name: string, value: string) {
        let newValue: number = Number(value)

        if (!isNaN(newValue)) {
            setMortgageData((prev: Mortgage) => {
                // Automatically recalculates Downpayment based on downPaymentPercentage
                // Can be annoying if you wanted to put in a flat amount without the amount changing
                if (name === fieldNames.homePrice) {
                    prev.downPayment = recalculateDownPaymentByHomePrice(newValue)
                } else if (name === fieldNames.downPaymentPercent) {
                    if (RegexUtility.IsUSD(value) && value[value.length - 1] != '.') {
                        newValue = MathUtility.clamp(Number(value), 0, 100)
                        prev.downPayment = recalculateDownPaymentByPercentage(newValue)
                    }
                } else if (name === fieldNames.downPayment) {
                    newValue = MathUtility.clamp(Number(value), 0, Number.MAX_SAFE_INTEGER)
                    prev.downPaymentPercent = recalculateDownPaymentPercentage(newValue)
                }
    
                prev[name as keyof Mortgage] = newValue
                setMortgageInformation(new MortgageInformation({...prev}))
                return {...prev}
            })
        }
    }

    function recalculateDownPaymentByPercentage(percentage: number) {
        return (mortgage.homePrice ?? 0) * (percentage / 100)
    }
    
    function recalculateDownPaymentByHomePrice(newHomePrice: number) {
        return newHomePrice * (mortgage.downPaymentPercent ?? 0) / 100
    }

    function recalculateDownPaymentPercentage(flatAmount: number) {
        if (mortgage.homePrice) {
            return flatAmount > mortgage.homePrice ? 100 : Number(((flatAmount / mortgage.homePrice) * 100).toFixed(2))
        }

        return 100
    }
    
    return (
        <article className={styles.mortgageCalculatorPage}>
            <MortgageCalculatorForm fieldNames={fieldNames} onChange={onChange} mortgage={mortgage}/>
            <MortgageSummary mortgageInformation={mortgageInformation}/>
            <MortgageAmortizationChart mortgageInformation={mortgageInformation}/>
        </article>
    )
}
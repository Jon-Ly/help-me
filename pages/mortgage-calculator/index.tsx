import { useState } from "react"
import MortgageCalculatorForm from "../../components/mortgage-calculator-form"
import MortgageSummary from "../../components/mortgage-summary"
import Mortgage from "../../interfaces/Mortgage"
import MathUtility from "../../utility/MathUtility"
import RegexUtility from "../../utility/RegexUtility"
import styles from './MortgageCalculatorPage.module.css'

export default function MortgageIndex() {
    const [mortgage, setMortgageData] = useState<Mortgage>({
        term: 30
    })

    const fieldNames = {
        homePrice: 'homePrice',
        downPayment: 'downPayment',
        downPaymentPercent: 'downPaymentPercent',
        interest: 'interest',
        propertyTax: 'propertyTax',
        privateMortgageInsurance: 'privateMortgageInsurance',
        homeOwnerInsurance: 'homeOwnerInsurance'
    }

    function onChange(name: string, value: any) {
        let newValue: any = ''

        setMortgageData((prev: Mortgage) => {
            // Automatically recalculates Downpayment based on downPaymentPercentage
            // Can be annoying if you wanted to put in a flat amount without the amount changing
            if (name === fieldNames.homePrice) {
                newValue = value
                prev.downPayment = recalculateDownPaymentByHomePrice(newValue)
            } else if (name === fieldNames.downPaymentPercent) {
                if (RegexUtility.IsUSD(value) && value[value.length - 1] != '.') {
                    newValue = MathUtility.clamp(Number(value), 0, 100)
                    prev.downPayment = recalculateDownPaymentByPercentage(newValue)
                }
            } else if (name === fieldNames.downPayment) {
                newValue = MathUtility.clamp(Number(value), 0, Number.MAX_SAFE_INTEGER)
                prev.downPaymentPercent = recalculateDownPaymentPercentage(newValue)
            } else {
                newValue = value
            }

            prev[name as keyof Mortgage] = newValue
            return {...prev}
        })
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
            <MortgageSummary mortgage={mortgage}/>
        </article>
    )
}
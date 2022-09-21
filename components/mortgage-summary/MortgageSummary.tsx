import { useEffect, useState } from 'react'
import Mortgage from '../../models/Mortgage/Mortgage'
import MortgageInformation from '../../models/Mortgage/MortgageInformation'
import styles from './MortgageSummary.module.css'

export interface MortgageSummaryProps {
    mortgageInformation: MortgageInformation
}

export default function MortgageSummary(props: MortgageSummaryProps) {
    const { mortgageInformation } = props
    const [mortgage, setMortgage] = useState<Mortgage>(mortgageInformation?.Mortgage ?? {})

    useEffect(() => {
        setMortgage(mortgageInformation?.Mortgage ?? {})
    }, [mortgageInformation])

    function getMonthlyPayment(): number {
        const principalInterest = getPrincipalInterest()
        const privateMortgageInsurance = getPMI()
        const propertyTax = getPropertyTax()
        const homeownerInsurance = getHomeownerInsurance()
        const monthlyExtra = (mortgage?.MonthlyExtra ?? 0)

        return isNaN(principalInterest) ? 0 : 
            Number((principalInterest + propertyTax + privateMortgageInsurance + homeownerInsurance + monthlyExtra).toFixed(2))
    }

    function getHomeownerInsurance(): number {
        return isNaN(Number(mortgage.HomeOwnerInsurance)) ? 0 : Number(mortgage.HomeOwnerInsurance)
    }

    function getPMI(): number {
        const pmi = isNaN(Number(mortgage.PrivateMortgageInsurance)) ? 0 : Number(mortgage.PrivateMortgageInsurance)

        return (mortgage.DownPaymentPercent ?? 0) >= 20 ? 0 : pmi
    }

    function getPropertyTax(): number {
        return isNaN(Number(mortgage.PropertyTax)) ? 0 : Number(mortgage.PropertyTax)
    }

    function getPrincipalInterest(): number {
        const loanAmount = (mortgage.HomePrice ?? 0) - (mortgage.DownPayment ?? 0)
        const monthlyInterestPercent = (mortgage.Interest ?? 0) / 100 / 12

        const result = loanAmount * 
            (monthlyInterestPercent * Math.pow(1 + monthlyInterestPercent, (mortgage.Term ?? 0) * 12)) / 
            (Math.pow(1 + monthlyInterestPercent, (mortgage.Term ?? 0) * 12) - 1)

        return isNaN(result) ? 0 : result
    }

    function getStartingInterest(): number {
        return ((mortgage.Interest ?? 0)/100/12) * ((mortgage.HomePrice ?? 0) - (mortgage.DownPayment ?? 0))
    }

    function getStartingPrincipal(): number {
        return Number((getPrincipalInterest() - getStartingInterest()).toFixed(2))
    }

    function getTotalInterestPaid(): number {
        let result = 0

        for(let i = 0; i < mortgageInformation?.Schedule?.length; i++) {
            result += mortgageInformation.Schedule[i].Interest
        }

        return isNaN(result) ? 0 : Number(result.toFixed(2))
    }

    function getTimeUntilPayOff(): string {
        const years = Math.floor(mortgageInformation?.Schedule?.length / 12)
        const months = mortgageInformation?.Schedule?.length % 12

        return (mortgageInformation && mortgageInformation.Schedule) ? `${years} yrs, ${months} months` : "" 
    }

    return (
        <section className={styles.mortgageSummarySection}>
            <h2>
                Monthly Payment
            </h2>
            <h4>
                ${getMonthlyPayment().toLocaleString('en-US')}
            </h4>
            <h4>
                Starting Monthly Interest
            </h4>
            <p>
                ${getStartingInterest().toLocaleString('en-US')}
            </p>
            <h4>
                Starting Monthly Principal
            </h4>
            <p>
                ${getStartingPrincipal().toLocaleString('en-US')}
            </p>
            <h4>
                Insurances, PMI, Tax
            </h4>
            <p>
                ${(getHomeownerInsurance() + getPMI() + getPropertyTax()).toLocaleString('en-US')}
            </p>
            <h4>
                Total Interest Paid
            </h4>
            <p>
                ${getTotalInterestPaid().toLocaleString('en-US')}
            </p>
            <h4>
                Time to pay off
            </h4>
            <p>
                {getTimeUntilPayOff()}
            </p>
        </section>
    )
}
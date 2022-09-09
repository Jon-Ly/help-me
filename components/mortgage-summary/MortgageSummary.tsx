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

        return isNaN(principalInterest) ? 0 : 
            Number((principalInterest + propertyTax + privateMortgageInsurance + homeownerInsurance).toFixed(2))
    }

    function getHomeownerInsurance(): number {
        return isNaN(Number(mortgage.homeOwnerInsurance)) ? 0 : Number(mortgage.homeOwnerInsurance)
    }

    function getPMI(): number {
        const pmi = isNaN(Number(mortgage.privateMortgageInsurance)) ? 0 : Number(mortgage.privateMortgageInsurance)

        return mortgage.downPaymentPercent ?? 0 >= 20 ? 0 : pmi
    }

    function getPropertyTax(): number {
        return isNaN(Number(mortgage.propertyTax)) ? 0 : Number(mortgage.propertyTax)
    }

    function getPrincipalInterest(): number {
        const loanAmount = (mortgage.homePrice ?? 0) - (mortgage.downPayment ?? 0)
        const monthlyInterestPercent = (mortgage.interest ?? 0) / 100 / 12

        const result = loanAmount * 
            (monthlyInterestPercent * Math.pow(1 + monthlyInterestPercent, (mortgage.term ?? 0) * 12)) / 
            (Math.pow(1 + monthlyInterestPercent, (mortgage.term ?? 0) * 12) - 1)

        return isNaN(result) ? 0 : result
    }

    function getStartingInterest(): number {
        return ((mortgage.interest ?? 0)/100/12) * ((mortgage.homePrice ?? 0) - (mortgage.downPayment ?? 0))
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
                ${getTotalInterestPaid()}
            </p>
        </section>
    )
}
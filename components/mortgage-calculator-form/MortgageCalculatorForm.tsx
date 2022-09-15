import { ChangeEventHandler } from "react";
import MortgageInformation from "../../models/Mortgage/MortgageInformation";
import NumberInput from "../inputs/number-input";
import TextInput from "../inputs/text-input";
import styles from './MortgageCalculatorForm.module.css'

export interface MortgageCalculatorFormProps {
    onChange: ChangeEventHandler,
    fieldNames: { [key: string] : string },
    mortgageInformation: MortgageInformation
}

export default function MortgageCalculatorForm(props: MortgageCalculatorFormProps) {
    const { onChange, fieldNames, mortgageInformation } = props

    return (
        <section className={styles.calculatorSection}>
            <h2>Mortgage Calculator</h2>
            <form className={styles.calculatorForm}>
                <label>
                    Home Price
                    <TextInput onChange={onChange} name={fieldNames?.HomePrice} value={mortgageInformation?.Mortgage?.HomePrice}/>
                </label>
                <label>
                    Down Payment
                    <TextInput onChange={onChange} name={fieldNames?.DownPayment} value={mortgageInformation?.Mortgage?.DownPayment}/>
                </label>
                <label>
                    Down Payment %
                    <NumberInput onChange={onChange} name={fieldNames?.DownPaymentPercent} value={mortgageInformation?.Mortgage?.DownPaymentPercent}/>
                </label>
                <label>
                    Interest Rate (APR)
                    <NumberInput onChange={onChange} name={fieldNames?.Interest} value={mortgageInformation?.Mortgage?.Interest}/>
                </label>
                <label>
                    Property Tax
                    <TextInput onChange={onChange} name={fieldNames?.PropertyTax} value={mortgageInformation?.Mortgage?.PropertyTax}/>
                </label>
                <label>
                    Private Mortgage Insurance (PMI)
                    <TextInput onChange={onChange} name={fieldNames?.PrivateMortgageInsurance} value={mortgageInformation?.Mortgage?.PrivateMortgageInsurance}/>
                </label>
                <label>
                    Homeowner's Insurance
                    <TextInput onChange={onChange} name={fieldNames?.HomeOwnerInsurance} value={mortgageInformation?.Mortgage?.HomeOwnerInsurance}/>
                </label>
                <label>
                    Loan Term
                    <select value={mortgageInformation.Mortgage.Term} name={fieldNames?.Term} onChange={onChange}>
                        <option value={30}>30</option>
                        <option value={20}>20</option>
                        <option value={15}>15</option>
                    </select>
                </label>
                <label>
                    Monthly Extra
                    <NumberInput onChange={onChange} name={fieldNames?.MonthlyExtra} value={mortgageInformation?.Mortgage?.MonthlyExtra}/>
                </label>
            </form>
        </section>
    )
}
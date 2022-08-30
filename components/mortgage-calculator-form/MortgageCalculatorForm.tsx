import Mortgage from "../../interfaces/Mortgage";
import TextInput from "../inputs/text-input";
import styles from './MortgageCalculatorForm.module.css'

export interface MortgageCalculatorFormProps {
    onChange: (name: string, value: any) => void,
    fieldNames: any,
    mortgage: Mortgage
}

export default function MortgageCalculatorForm(props: MortgageCalculatorFormProps) {
    const { onChange, fieldNames, mortgage } = props

    return (
        <section className={styles.calculatorSection}>
            <h2>Mortgage Calculator</h2>
            <form className={styles.calculatorForm}>
                <label>
                    Home Price
                    <TextInput onChange={onChange} name={fieldNames.homePrice} value={mortgage.homePrice}/>
                </label>
                <label>
                    Down Payment
                    <TextInput onChange={onChange} name={fieldNames.downPayment} value={mortgage.downPayment}/>
                </label>
                <label>
                    Down Payment %
                    <TextInput onChange={onChange} name={fieldNames.downPaymentPercent} value={mortgage.downPaymentPercent}/>
                </label>
                <label>
                    Interest Rate (APR)
                    <TextInput onChange={onChange} name={fieldNames.interest} value={mortgage.interest}/>
                </label>
                <label>
                    Property Tax
                    <TextInput onChange={onChange} name={fieldNames.propertyTax} value={mortgage.propertyTax}/>
                </label>
                <label>
                    Private Mortgage Insurance (PMI)
                    <TextInput onChange={onChange} name={fieldNames.privateMortgageInsurance} value={mortgage.privateMortgageInsurance}/>
                </label>
                <label>
                    Homeowner's Insurance
                    <TextInput onChange={onChange} name={fieldNames.homeOwnerInsurance} value={mortgage.homeOwnerInsurance}/>
                </label>
                <label>
                    Loan Term
                    <select value={mortgage.term}>
                        <option value={30}>30</option>
                        <option value={20}>20</option>
                        <option value={15}>15</option>
                    </select>
                </label>
            </form>
        </section>
    )
}
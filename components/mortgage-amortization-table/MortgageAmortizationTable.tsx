import MortgageInformation from "../../models/Mortgage/MortgageInformation"
import StringUtility from "../../utility/StringUtility"
import styles from './MortgageAmortizationTable.module.css'

export interface MortgageAmortizationTableProps {
    mortgageInformation: MortgageInformation,
    freezeHeaders?: boolean
}

export default function MortgageAmortizationTable(props: MortgageAmortizationTableProps) {
    const { mortgageInformation, freezeHeaders } = props

    function getExtraPaymentString(principal: number, remainingBalance: number): string {
        let monthlyExtra = mortgageInformation?.Mortgage?.MonthlyExtra ?? 0

        if (monthlyExtra === 0) {
            return '$0.00'
        }

        if ((monthlyExtra + principal) > remainingBalance) {
            monthlyExtra = (remainingBalance - principal) < 0 ? 0 : remainingBalance - principal
        }

        return monthlyExtra === 0 ? '$0.00' : StringUtility.formatNumberToUSD(monthlyExtra, true)
    }

    return (
        <table>
            <thead className={freezeHeaders ? styles.freezeHeaders : ''}>
                <tr>
                    <th>
                        Month
                    </th>
                    <th>
                        Principal
                    </th>
                    <th>
                        Extra Payment
                    </th>
                    <th>
                        Interest
                    </th>
                    <th>
                        Start Balance
                    </th>
                    <th>
                        End Balance
                    </th>
                </tr>
            </thead>
            <tbody>
                {
                    mortgageInformation?.Schedule?.map((x, index) => (
                        <tr key={x.StartBalance}>
                            <td>{index + 1}</td>
                            <td>{StringUtility.formatNumberToUSD(x.Principal, true)}</td>
                            <td>{getExtraPaymentString(x.Principal, x.StartBalance)}</td>
                            <td>{StringUtility.formatNumberToUSD(x.Interest, true)}</td>
                            <td>{StringUtility.formatNumberToUSD(x.StartBalance, true)}</td>
                            <td>{x.EndBalance < 0 ? '$0.00' : StringUtility.formatNumberToUSD(x.EndBalance, true)}</td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
    )
}
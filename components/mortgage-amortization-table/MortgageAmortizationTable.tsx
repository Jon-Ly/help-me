import { MortgageSchedule } from "../../models/Mortgage/MortgageSchedule";
import StringUtility from "../../utility/StringUtility";

export interface MortgageAmortizationTableProps {
    mortgageSchedule: MortgageSchedule[]
}

export default function MortgageAmortizationTable(props: MortgageAmortizationTableProps) {
    const { mortgageSchedule } = props

    return (
        <table>
            <thead>
                <tr>
                    <th>
                        Month
                    </th>
                    <th>
                        Principal
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
                    mortgageSchedule.map((x, index) => (
                        <tr key={x.StartBalance}>
                            <td>{index + 1}</td>
                            <td>{StringUtility.formatNumberToUSD(x.Principal, true)}</td>
                            <td>{StringUtility.formatNumberToUSD(x.Interest, true)}</td>
                            <td>{StringUtility.formatNumberToUSD(x.StartBalance, true)}</td>
                            <td>{x.EndBalance < 0 ? '$0.00' : StringUtility.formatNumberToUSD(x.EndBalance, true)}</td>
                        </tr>
                    ))
                }
                {
                    mortgageSchedule[mortgageSchedule.length - 1]?.EndBalance > 0 && (
                        <tr>
                            <td>{mortgageSchedule[mortgageSchedule.length - 1]?.StartBalance?.toFixed(2)}</td>
                            <td>0</td>
                            <td>{mortgageSchedule[mortgageSchedule.length - 1]?.StartBalance?.toFixed(2)}</td>
                            <td>0</td>
                        </tr>
                    )
                }
            </tbody>
        </table>
    )
}
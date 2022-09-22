import Mortgage from "./Mortgage";
import { MortgageSchedule } from "./MortgageSchedule";

export default class MortgageInformation {
    private _totalInterestPaid: number = 0
    private _mortgage: Mortgage = {}
    private _schedule: MortgageSchedule[] = []

    constructor(mortgageInformation?: MortgageInformation) {
        if (mortgageInformation) {
            this._mortgage = mortgageInformation.Mortgage

            if (!mortgageInformation?.Mortgage?.Term) {
                this._mortgage.Term = 30
            }
        }

        if (this._mortgage?.HomePrice) {
            this.SetSchedule()
        }
    }

    public get Mortgage(): Mortgage {
        return this._mortgage
    }

    public get Schedule(): MortgageSchedule[] {
        return this._schedule
    }

    /**
     * Calculates each data point for the Amortization schedule
     */
    private SetSchedule(): void {
        this._schedule = []
        const mortgage = this._mortgage

        let remainingBalance = (mortgage.HomePrice ?? 0) - (mortgage.DownPayment ?? 0)
        const loanAmount = (mortgage.HomePrice ?? 0) - (mortgage.DownPayment ?? 0)
        const monthlyInterestPercent = (mortgage.Interest ?? 0) / 100 / 12

        // P * (r * (1 + r)^n) / ((1 + r^n) - 1)
        // P = principal
        // r = monthly interest rate
        // n = number of payments over the loan's lifetime
        const principalInterest = loanAmount * 
            (monthlyInterestPercent * Math.pow(1 + monthlyInterestPercent, (mortgage.Term ?? 0) * 12)) / 
            (Math.pow(1 + monthlyInterestPercent, (mortgage.Term ?? 0) * 12) - 1)

        if (!isNaN(principalInterest)) {
            let month = 0
            while(month !== (mortgage.Term ?? 0) * 12 && remainingBalance > 0) {
                const interest = ((mortgage.Interest ?? 0)/100/12 * remainingBalance)
                const noInterestAmount = principalInterest - interest
    
                this._schedule.push({
                    Principal: noInterestAmount > remainingBalance ? Number(remainingBalance.toFixed(2)) : Number(noInterestAmount.toFixed(2)),
                    Interest: Number(interest.toFixed(2)),
                    StartBalance: remainingBalance,
                    EndBalance: remainingBalance - (principalInterest - interest)
                });
    
                remainingBalance -= (principalInterest - interest) + (mortgage.MonthlyExtra ?? 0)
                month++
            }
        }
    }

    public get TotalInterestPaid(): number {
        return this._totalInterestPaid
    }

    private set TotalInterestPaid(totalInterest: number) {
        this._totalInterestPaid = totalInterest
    }
}
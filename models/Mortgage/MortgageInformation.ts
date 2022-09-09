import Mortgage from "./Mortgage";
import { MortgageSchedule } from "./MortgageSchedule";

export default class MortgageInformation {
    private _totalInterestPaid: number = 0
    private _mortgage: Mortgage = {}
    private _schedule: MortgageSchedule[] = []

    constructor(mortgage?: Mortgage) {
        this._mortgage = mortgage || {}

        if (mortgage) {
            this.SetSchedule()
        }
    }

    public get Mortgage() {
        return this._mortgage
    }

    public get Schedule() {
        return this._schedule
    }

    private SetSchedule() {
        this._schedule = []
        const mortgage = this._mortgage

        let remainingBalance = (mortgage.homePrice ?? 0) - (mortgage.downPayment ?? 0)
        const loanAmount = (mortgage.homePrice ?? 0) - (mortgage.downPayment ?? 0)
        const monthlyInterestPercent = (mortgage.interest ?? 0) / 100 / 12

        const principalInterest = loanAmount * 
            (monthlyInterestPercent * Math.pow(1 + monthlyInterestPercent, (mortgage.term ?? 0) * 12)) / 
            (Math.pow(1 + monthlyInterestPercent, (mortgage.term ?? 0) * 12) - 1)

        while(remainingBalance > 0) {
            const interest = Number((((mortgage.interest ?? 0)/100/12) * remainingBalance).toFixed(2))

            this._schedule.push({
                Principal: principalInterest - interest,
                Interest: interest,
                StartBalance: remainingBalance,
                EndBalance: principalInterest - interest
            });

            remainingBalance -= (principalInterest - interest)
        }
    }

    public get TotalInterestPaid() {
        return this._totalInterestPaid
    }

    private set TotalInterestPaid(totalInterest: number) {
        this._totalInterestPaid = totalInterest
    }
}
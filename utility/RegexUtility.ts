class RegexUtility {
    /**
     * Determines with the value is in proper USD format (w/o the $ prefix)
     * @param value 
     * @returns 
     */
    static IsUSD(value: string) {
        return /^(0|[1-9][0-9]{0,2})(,\d{3})*(\.\d{1,2})?$/.test(value)
    }

    static IsPercentage(value: string) {
        return /^\d(.\d{0,2})*$/.test(value)
    }
}

export default RegexUtility
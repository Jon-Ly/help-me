class StringUtility {
    
    /**
     * Formats the value to USD format
     * @param value 
     * @param toTwoDecimal 
     * @param includeSign 
     * @returns 
     */
    static formatNumberToUSD(value: number, includeSign?: boolean): string {
        if (value) {
            return this.formatStringToUSD(value.toString(), includeSign)
        }

        return `Input ${value} is not valid for formatNumberToUSD`
    }

    /**
     * Formats the value to USD format
     * @param value Must be a string that will not return NaN when passed into the Number constructor
     * @param toTwoDecimal 
     * @param includeSign 
     * @returns 
     */
    static formatStringToUSD(value: string, includeSign?: boolean): string {
        const newValue = Number(value)

        if (value && !isNaN(newValue)) {
            let result = newValue.toString()
            const valueSplit = result.split('.')
            const wholeNumber = valueSplit[0]

            // Show trailing 0s up to two decimals spots & round the amount
            if (valueSplit && valueSplit.length === 2) {
                const decimal = valueSplit[1]

                if (decimal.length === 1) {
                    result += '0'
                } else {
                    result = Number(result).toFixed(2)
                }
            } else {
                result += '.00'
            }

            // Insert commas where appropriate
            if (wholeNumber.length > 3) {
                let numberGroup = ''
                const groups: string[] = []

                // breaks the whole number into groups of 3 digits where possible
                for(let i = wholeNumber.length-1; i >= 0; i--) {
                    numberGroup = `${result[i]}${numberGroup}`

                    if (numberGroup.length === 3 || i === 0) {
                        groups.unshift(numberGroup)
                        numberGroup = ''
                    }
                }

                const decimal = result.split('.')[1]
                result = `${groups.join(',')}.${decimal}`
            }

            if (includeSign) {
                result = `$${result}`
            }

            return result
        }

        return `Input ${value} is not valid for formatStringToUSD`
    }
}

export default StringUtility
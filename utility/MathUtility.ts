class MathUtility {
    /**
     * Clamps a value to the specified min/max
     * @param value 
     * @param min 
     * @param max 
     * @returns 
     */
    static clamp(value: number, min: number, max: number): number {
        return isNaN(value) ? min :
            value > max ? max :
            value < min ? min :
            value
    }
}

export default MathUtility
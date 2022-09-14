import { NumberProps } from "./input-props"

export default function NumberInput(props: NumberProps) {
    const { value, name, prefix, onChange } = props

    return (
        <>
            {
                prefix ? (
                    <>
                        {/* TODO: Set prefix's position within the input, add left/right as a prop */}
                        <span>{prefix}</span>
                        <input type='number'
                            value={value} 
                            name={name} 
                            onChange={onChange}
                        />
                    </>
                ) : (
                    <input type='number'
                        value={value} 
                        name={name} 
                        onChange={onChange}
                    />
                )
            }
        </>
    )
}
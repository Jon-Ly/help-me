import { NumberProps } from "./input-props"

export default function NumberInput(props: NumberProps) {
    const { value, name, prefix, onChange } = props

    return (
        <>
            {
                prefix ? (
                    <>
                        <span>{prefix}</span>
                        <input type='number'
                            defaultValue={value} 
                            value={value} 
                            name={name} 
                            onChange={e => onChange(e.target.name, e.target.value)}
                        />
                    </>
                ) : (
                    <input type='number'
                        defaultValue={value} 
                        value={value} 
                        name={name} 
                        onChange={e => onChange(e.target.name, e.target.value)}
                    />
                )
            }
        </>
    )
}
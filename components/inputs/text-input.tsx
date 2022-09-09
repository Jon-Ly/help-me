import { InputProps } from "./input-props"

export default function TextInput(props: InputProps) {
    const { value, name, onChange } = props

    return (
        <input type='text'
            defaultValue={value} 
            value={value} 
            name={name} 
            onChange={onChange}
        />
    )
}
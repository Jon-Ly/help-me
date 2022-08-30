export interface InputProps {
    value?: string | number | readonly string[] | undefined,
    name: string,
    onChange: (name: string, value: any) => void
}

export interface NumberProps extends InputProps{
    value?: number
    prefix?: string
}
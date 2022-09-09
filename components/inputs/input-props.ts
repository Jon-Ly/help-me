import { ChangeEventHandler } from "react"

export interface InputProps {
    value?: string | number | readonly string[] | undefined,
    name: string,
    onChange: ChangeEventHandler
}

export interface NumberProps extends InputProps{
    value?: number
    prefix?: string
}
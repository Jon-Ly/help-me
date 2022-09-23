import styles from './ModalFooter.module.css'

export interface ModalFooterProps {
    children?: React.ReactNode
}

export default function ModalFooter(props: ModalFooterProps) {
    const { children } = props

    return (
        <div className={styles.modalFooter}>
            {children}
        </div>
    )
}
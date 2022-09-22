import styles from './ModalContent.module.css'

export interface ModalContentProps {
    children?: React.ReactNode
}

export default function ModalContent(props: ModalContentProps) {
    const { children } = props

    return (
        <div className={styles.modalContent}>
            {children}
        </div>
    )
}
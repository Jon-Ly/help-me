import styles from './Modal.module.css'

export interface ModalProps {
    children?: React.ReactNode
    open?: boolean,
    onClose?: () => void
}

export default function Modal(props: ModalProps) {
    const { children, open, onClose } = props

    return (
        <>
            {
                open && (
                    <div role='modal' className={styles.modalContainer}>
                        <div className={styles.modalBackdrop} onClick={onClose}></div>
                        <div className={styles.modal}>
                            {children}
                        </div>
                    </div>
                )
            }
        </>
    )
}
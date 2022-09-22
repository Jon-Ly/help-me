import styles from './Navbar.module.css'

export interface NavbarProps {
    children?: React.ReactNode
}

export default function Navbar(props: NavbarProps) {
    const { children } = props

    return (
        <nav className={styles.mainNavigation}>
            <ul className={styles.itemList}>
                {children}
            </ul>
        </nav>
    )
}
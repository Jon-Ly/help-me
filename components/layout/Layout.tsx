import { NavbarItem } from '../navbar-item/NavbarItem'
import { Navbar } from '../navbar'
import styles from './Layout.module.css'

export interface LayoutProps {
    children?: React.ReactNode
}

export default function Layout(props: LayoutProps) {
    const { children } = props

    return (
    <div className={styles.container}>
        <Navbar>
            <NavbarItem link='/'>
                Home
            </NavbarItem>
            <NavbarItem link='/mortgage'>
                Buying a Home
            </NavbarItem>
        </Navbar>

        <main className={styles.main}>
            {children}
        </main>
    </div>
    )
}
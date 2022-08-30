import styles from './NavbarItem.module.css'
import Link from 'next/link'

export interface NavbarItemProps {
    link: string,
    children?: React.ReactNode
}

export function NavbarItem(props: NavbarItemProps) {
    const { link, children } = props
    
    return (
        <Link href={`${link}`}>
            <li className={styles.navbarItem}>
                {children}
            </li>
        </Link>
    )
}
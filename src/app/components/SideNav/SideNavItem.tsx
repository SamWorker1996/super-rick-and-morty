import classNames from "classnames";
import { FC, HTMLProps, PropsWithChildren } from "react";
import styles from './item.module.css';

interface SideNavItemProps extends PropsWithChildren<HTMLProps<HTMLLIElement>> {
    active: boolean
}

/**
 * 
 */
const SideNavItem: FC<SideNavItemProps> = ({ active, children, ...props }) => {
    return (
        <li className={classNames(
            styles.item,
            'cursor-pointer border border-gray-100 my-5 pl-7 rounded-lg',
            {
                'border-black': active,
                'bg-gray-800 text-white': active,
                'border-gray-100': !active,
                'bg-white text-black': !active
            }
        )} {...props}>
            {children}
        </li>
    )
}

export default SideNavItem;
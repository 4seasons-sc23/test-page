import { ReactNode } from 'react';

import Header from './Header';

import styles from './styles.module.scss';

interface Props {
    children: ReactNode;
}

export default function Layout({ children }: Props) {
    return (
        <>
            <Header />
            <div className={styles.container}>{children}</div>
        </>
    );
}

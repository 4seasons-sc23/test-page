import React from 'react';

import styles from './styles.module.scss';

export default function Info() {
    const userName = sessionStorage.getItem('name');
    const applicationId = sessionStorage.getItem('applicationId');
    const ApiKey = sessionStorage.getItem('ApiKey');

    return (
        <div className={styles.container}>
            <h1>기본 정보</h1>
            <div className={styles.text}>
                <div className={styles.text}>
                    <strong>name: </strong>
                    <span>{userName}</span>
                </div>
            </div>
            <div className={styles.text}>
                <div className={styles.text}>
                    <strong>applicationId: </strong>
                    <span>{applicationId}</span>
                </div>
            </div>
            <div className={styles.text}>
                <div className={styles.text}>
                    <strong>ApiKey: </strong>
                    <span>{ApiKey}</span>
                </div>
            </div>
        </div>
    );
}

import React from 'react';
import { useLocation } from 'react-router-dom';

import styles from './styles.module.scss';

import { Live, Chat } from 'instream-sdk';

export default function Stream() {
    const location = useLocation();
    const params = new URLSearchParams(location.search);

    const sessionId = params.get('sessionId');
    const ApiKey = params.get('ApiKey');

    const type = params.get('type');

    const participantId = sessionStorage.getItem('id');
    const nickname = sessionStorage.getItem('name');

    return (
        <div className={styles.page}>
            <div className={styles.container}>
                <Live
                    ApiKey={ApiKey}
                    sessionId={sessionId}
                    participantId={participantId}
                    nickname={nickname}
                    customControl
                />
            </div>
            {type === 'LIVE' && (
                <Chat
                    ApiKey={ApiKey || ''}
                    sessionId={sessionId || ''}
                    participantId={participantId || ''}
                    nickname={nickname || ''}
                />
            )}
        </div>
    );
}

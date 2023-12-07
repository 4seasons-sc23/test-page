import React from 'react';
import { useLocation } from 'react-router-dom';

// import InstreamLive from '../../components/Instream/Live/Instream';

import styles from './styles.module.scss';
// import Chat from '../../components/Instream/Chat';

import { Live, Chat } from 'instream-sdk';

export default function Stream() {
    const location = useLocation();
    const params = new URLSearchParams(location.search);

    const streamSessionId = params.get('streamSessionId');
    const streamApiKey = params.get('streamApiKey');

    const participantId = sessionStorage.getItem('id');
    const nickname = sessionStorage.getItem('name');

    return (
        <div className={styles.page}>
            <div className={styles.container}>
                <Live
                    ApiKey={streamApiKey}
                    sessionId={streamSessionId}
                    participantId={participantId}
                    nickname={nickname}
                    customControl
                />
            </div>
            {streamSessionId && streamApiKey && (
                <Chat
                    ApiKey={streamApiKey}
                    sessionId={streamSessionId}
                    participantId={participantId || ''}
                    nickname={nickname || ''}
                />
            )}
        </div>
    );
}

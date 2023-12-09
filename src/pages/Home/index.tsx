import { useNavigate } from 'react-router-dom';
import styles from './styles.module.scss';
// import Chat from '../../components/Instream/Chat';

import { Live, Chat } from 'instream-sdk';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Home() {
    const navigate = useNavigate();

    useEffect(() => {
        const getSessionList = async () => {
            try {
                const res = await axios.get(
                    `http://10.16.16.41:31371/api/v1/hosts/850b9f41-94ea-11ee-9aae-0242ac140002/applications?page=0&size=10&sort[name]=createdAt&sort[option]=ASC&firstView=true`
                );

                const streamingData = res.data.data
                    .filter(
                        (item: any) =>
                            (item.type === 'STREAMING' || item.type === 'LIVE') &&
                            item.session != null &&
                            item.session.deletedAt == null
                    )
                    .map((item: any) =>
                        item.type === 'STREAMING'
                            ? {
                                  streamSessionId: item.session.id,
                                  streamApiKey: item.apiKey,
                                  type: item.type,
                              }
                            : {
                                  streamSessionId: item.session.id,
                                  streamApiKey: item.apiKey,
                                  chatSessionId: item.session.id,
                                  chatApiKey: item.apiKey,
                                  type: item.type,
                              }
                    );

                setSessionList(streamingData);
            } catch (e) {
                console.log(e);
            }
        };

        getSessionList();
    }, []);

    const [sessionList, setSessionList] = useState([
        {
            streamSessionId: '',
            streamApiKey: '',
            chatSessionId: '',
            chatApiKey: '',
            type: '',
        },
    ]);

    return (
        <div className={styles.container}>
            <div>
                <h2>LIVE</h2>
            </div>
            <div className={styles.itemContainer}>
                {sessionList?.map((item, idx) => (
                    <div key={item.streamSessionId} className={styles.card}>
                        <div
                            className={styles.item}
                            onClick={() =>
                                navigate(
                                    `/stream?sessionId=${item.streamSessionId}&ApiKey=${item.streamApiKey}&type=${item.type}`
                                )
                            }
                        >
                            <div className={styles.live}>
                                <Live sessionId={item.streamSessionId} ApiKey={item.streamApiKey} />
                            </div>
                        </div>
                        <div className={styles.title}>[channel {idx + 1}]</div>
                    </div>
                ))}
            </div>
        </div>
    );
}

import React, { useEffect, useRef, useState } from 'react';

import { enterChatApplication, leaveChatApplication } from './utils';

import './styles.css';
import axios from 'axios';

interface IChatData {
    id: string;
    nickname: string;
    profilrImgUrl: string | null;
    message: string;
    createdAt: string;
}

interface Props {
    sessionId: string;
    ApiKey: string;
    participantId?: string | null;
    nickname?: string | null;
    title?: string;
}

export default function Chat({ sessionId, ApiKey, participantId, nickname, title }: Props) {
    const chatDataRef = useRef<HTMLDivElement>(null);

    const [isValid, setIsValid] = useState<boolean>(!!(sessionId && ApiKey));
    const [isAuth, setIsAuth] = useState<boolean>(!!(participantId && nickname));

    const [inputText, setInputText] = useState<string>('');

    const [chatData, setChatData] = useState<IChatData[]>([]);

    useEffect(() => {
        if (chatDataRef.current) {
            chatDataRef.current.scrollTop = chatDataRef.current.scrollHeight;
        }
    }, [chatData]);

    const sendMessage = async (message: string) => {
        try {
            await axios.post(
                `http://10.16.16.41:31371/api/v1/chats/${sessionId}/send`,
                { participantId, message },
                { headers: { ApiKey } }
            );
        } catch (error) {
            console.error('메시지 전송 실패:', error);
        }
    };

    const handleKeyUp = async (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && inputText.trim()) {
            e.preventDefault();
            await sendMessage(inputText);

            setInputText('');
        }
    };

    useEffect(() => {
        if (participantId && nickname)
            enterChatApplication(sessionId, ApiKey, participantId, nickname);

        const eventSource = new EventSource(
            `http://10.16.16.41:31426/api/v1/chats/sse-connect/${sessionId}`
        );

        eventSource.onmessage = (e) => {
            const newMessage = JSON.parse(e.data);

            if (newMessage.length > 0) {
                const parsedMessage = newMessage.map((message: string) => JSON.parse(message));
                setChatData((prev) => {
                    const updatedChatData = [...prev, ...parsedMessage];

                    if (updatedChatData.length > 100) {
                        return updatedChatData.slice(-100);
                    }

                    return updatedChatData;
                });
            }
        };

        return () => {
            if (participantId) leaveChatApplication(sessionId, ApiKey, participantId);
        };
    }, []);

    return (
        <div className="chat">
            <div className="chat_header">{title ? title : '실시간 채팅'}</div>
            <div className="chat_data" ref={chatDataRef}>
                {chatData.map((item) => (
                    <ChatBlock nickname={item.nickname} data={item.message} />
                ))}
            </div>
            <textarea
                placeholder={isAuth ? '채팅메시지를 입력해주세요' : '채팅 권한이 없습니다.'}
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyUp={handleKeyUp}
                disabled={!isAuth}
            />
        </div>
    );
}

function ChatBlock({ nickname, data }: { nickname: string; data: string }) {
    return (
        <div className="chatBox">
            <div>{nickname}</div>
            <div>{data}</div>
        </div>
    );
}

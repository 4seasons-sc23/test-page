import axios from 'axios';

export const enterChatApplication = async (
    sessionId: string,
    ApiKey: string,
    participantId: string,
    nickname: string
) => {
    try {
        await axios.post(
            `http://10.16.16.41:31371/api/v1/applications/sessions/${sessionId}/participants/enter`,
            { participantId, nickname },
            { headers: { ApiKey } }
        );
    } catch (e) {
        console.log(e);
    }
};

export const leaveChatApplication = async (
    sessionId: string,
    ApiKey: string,
    participantId: string
) => {
    try {
        await axios.post(
            `http://10.16.16.41:31371/api/v1/applications/sessions/${sessionId}/participants/leave`,
            { participantId },
            { headers: { ApiKey } }
        );
    } catch (e) {
        console.log(e);
    }
};

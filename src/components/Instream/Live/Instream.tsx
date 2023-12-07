import React, { useEffect, useRef, useState } from 'react';
import Hls from 'hls.js';
import axios from 'axios';
// import useNetworkStatus from "../utils/useNetworkStatus";

import './instream-local.css';
import { CustomControlBar } from './CustomControlBar';
import { toggleFullScreen, togglePlayPause } from './videoUtils';

interface Props {
    participantId?: string | null;
    nickname?: string | null;
    ApiKey?: string | null;
    sessionId: string | null;
    customControl?: boolean;
}

function InstreamLive({ participantId, nickname, ApiKey, sessionId, customControl }: Props) {
    const videoRef = useRef<HTMLVideoElement>(null);
    let hls_url = `https://cdn.aolda.net/instream/${sessionId}/1080/index.m3u8`;

    const [userResolution, setUserResolution] = useState<string>('1080');
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [volume, setVolume] = useState<number>(1);
    const [isFullScreen, setIsFullScreen] = useState(false);

    const [streamStatus, setStreamStatus] = useState<'live' | 'error' | 'idle'>('idle');

    const [sliderStyle, setSliderStyle] = useState<React.CSSProperties>({});

    const [firstEnter, setFirstEnter] = useState<boolean>(true);

    function changeResolution(url: string, newResolution: string) {
        return url.replace(/(360|720|1080)/, newResolution);
    }

    const handlePlayPauseClick = () => {
        togglePlayPause(videoRef.current);
        setIsPlaying(!isPlaying);
    };

    const handleVolumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newVolume = parseFloat(event.target.value);
        setVolume(newVolume);
        if (videoRef.current) {
            videoRef.current.muted = false;
            videoRef.current.volume = newVolume;
        }
    };

    const handleFullScreenClick = () => {
        toggleFullScreen(videoRef.current);
    };

    const enterParticipant = async () => {
        try {
            await axios.post(
                `http://10.16.16.41:31371/api/v1/applications/sessions/${sessionId}/participants/enter`,
                {
                    participantId,
                    nickname: nickname || '익명',
                },
                { headers: { ApiKey } }
            );
        } catch (e) {
            console.log(e);
        }
    };

    const leaveParticipant = async () => {
        await axios.post(
            `http://10.16.16.41:31371/api/v1/applications/sessions/${sessionId}/participants/leave`,
            {
                participantId,
            },
            { headers: { ApiKey } }
        );
    };

    useEffect(() => {
        const handleFullScreenChange = () => {
            setIsFullScreen(!!document.fullscreenElement);
        };

        document.addEventListener('fullscreenchange', handleFullScreenChange);

        return () => {
            document.removeEventListener('fullscreenchange', handleFullScreenChange);
        };
    }, []);

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.volume = volume;
        }

        setSliderStyle({
            background: `linear-gradient(to right, white ${volume * 100}%, gray ${volume * 100}%)`,
        });
    }, [volume]);

    useEffect(() => {
        if (streamStatus === 'live' && participantId) {
            if (firstEnter) {
                enterParticipant();
                setFirstEnter(false);
            }

            const video = videoRef.current;
            if (video) {
                const onPlay = () => {
                    console.log('Video play event');
                    // enterParticipant();
                };
                video.addEventListener('play', onPlay);

                return () => {
                    video.removeEventListener('play', onPlay);
                    leaveParticipant(); // 비디오 요소 제거 시 실행
                };
            }
        }
    }, [participantId, sessionId, streamStatus]);

    useEffect(() => {
        let hls: Hls | undefined;

        const initHls = async (url: string) => {
            const video = videoRef.current;
            if (!video) return;

            hls = new Hls();
            hls.loadSource(url);
            hls.attachMedia(video);

            try {
                await new Promise((resolve, reject) => {
                    hls!.on(Hls.Events.MANIFEST_PARSED, () => {
                        video.play().then(resolve).catch(reject);
                    });
                });
            } catch (error) {
                console.error('Error playing video', error);
            }

            hls.on(Hls.Events.ERROR, (event, data) => {
                if (data.fatal) {
                    switch (data.type) {
                        case Hls.ErrorTypes.NETWORK_ERROR:
                            console.error('Network error encountered:', data);
                            break;
                        case Hls.ErrorTypes.MEDIA_ERROR:
                            console.error('Media error encountered:', data);
                            break;
                        default:
                            console.error('HLS Error:', data);
                            break;
                    }
                }
            });
        };

        const updateVideoSource = async () => {
            const newUrl = changeResolution(hls_url, userResolution);

            if (hls) {
                hls.destroy();
            }

            if (Hls.isSupported()) {
                await initHls(newUrl);
                setStreamStatus('live');
            } else if (videoRef.current?.canPlayType('application/vnd.apple.mpegurl')) {
                videoRef.current.src = newUrl;
                await new Promise((resolve, reject) => {
                    videoRef.current?.addEventListener('loadedmetadata', () => {
                        videoRef.current?.play().then(resolve).catch(reject);
                    });
                });
                setStreamStatus('live');
            } else {
                setStreamStatus('error');
            }
        };

        updateVideoSource();

        return () => {
            if (hls) {
                hls.destroy();
            }
        };
    }, [userResolution]);

    return (
        <div className="video-container">
            {streamStatus !== 'live' && <div className="stream-error">방송중이지 않습니다</div>}
            <video
                style={{ display: streamStatus === 'live' ? 'block' : 'none' }}
                ref={videoRef}
                controls={false}
                muted
            >
                Your browser does not support live streaming videos.
            </video>
            {customControl && (
                <CustomControlBar
                    className={isFullScreen ? 'fullscreen' : ''}
                    onResolutionChange={(e) => setUserResolution(e.target.value)}
                    onPlayPauseClick={handlePlayPauseClick}
                    onVolumeChange={handleVolumeChange}
                    onFullScreenClick={handleFullScreenClick}
                    isPlaying={isPlaying}
                    sliderStyle={sliderStyle}
                />
            )}
        </div>
    );
}

export default InstreamLive;

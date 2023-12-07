export const togglePlayPause = (videoElement: HTMLVideoElement | null) => {
    if (!videoElement) return;

    if (videoElement.paused || videoElement.ended) {
        videoElement.play();
    } else {
        videoElement.pause();
    }
};

export const toggleFullScreen = (videoElement: HTMLVideoElement | null) => {
    if (videoElement) {
        if (!document.fullscreenElement) {
            videoElement.requestFullscreen().catch((err) => {
                console.error(
                    `Error attempting to enable full-screen mode: ${err.message} (${err.name})`
                );
            });
        } else {
            document.exitFullscreen();
        }
    }
};

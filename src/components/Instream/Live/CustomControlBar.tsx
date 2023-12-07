import React from 'react';

import './CustomControlBar-local.css';

interface Props {
    onResolutionChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    onPlayPauseClick: () => void;
    onVolumeChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onFullScreenClick: () => void;
    isPlaying: boolean;
    sliderStyle: React.CSSProperties;
    className?: string;
}

export function CustomControlBar({
    onResolutionChange,
    onPlayPauseClick,
    onVolumeChange,
    onFullScreenClick,
    isPlaying,
    sliderStyle,
    className,
}: Props) {
    return (
        <div className={`custom-controls ${className}`}>
            <button onClick={onPlayPauseClick}>{!isPlaying ? '일시정지' : '재생'}</button>
            <div className="custom-controls-right">
                <div className="custom-controls-volume">
                    <label>volume</label>
                    <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.1"
                        onChange={onVolumeChange}
                        style={sliderStyle}
                    />
                </div>
                <select className="resolution-selector" onChange={onResolutionChange}>
                    <option value="1080">1080p</option>
                    <option value="720">720p</option>
                    <option value="360">360p</option>
                </select>
                <button onClick={onFullScreenClick}>Full Screen</button>
            </div>
        </div>
    );
}

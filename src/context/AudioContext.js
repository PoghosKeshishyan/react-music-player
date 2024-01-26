import { createContext, useState } from 'react';

export const AudioContext = createContext({});
const audio = new Audio();

export function AudioProvider({ children }) {
    const [currentSong, setCurrentSong] = useState([]);
    const [isPlaying, setIsPlaying] = useState(false);
    const [audioEnded, setAudioEnded] = useState(false);
    
    audio.addEventListener('ended', function() {
        setAudioEnded(true);
        setIsPlaying(false);
    });

    const handleToggleAudio = (song) => {
        if (audioEnded) {
            setAudioEnded(false);
            setIsPlaying(true);
            audio.src = song.src;
            audio.currentTime = 0;
            audio.autoplay = true;
        }

        if (currentSong.id !== song.id) {
            setCurrentSong(song);
            setIsPlaying(true);
            audio.src = song.src;
            audio.currentTime = 0;
            audio.autoplay = true;
            return;
        }

        if (isPlaying) {
            audio.pause();
            setIsPlaying(false);
        } else {
            audio.play();
            setIsPlaying(true);
        }
    }

    function addZero(number) {
        if (number <= 9) {
            return `0${number}`
        }

        return number;
    }

    const value = { 
        audio, 
        addZero,
        isPlaying, 
        audioEnded,
        currentSong, 
        handleToggleAudio, 
    };

    return (
        <AudioContext.Provider value={value}>
            {children}
        </AudioContext.Provider>
    )
}
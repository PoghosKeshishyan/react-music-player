import { useCallback, useContext, useEffect, useState } from 'react';
import { AudioContext } from '../context/AudioContext';
import '../css/TimeControls.css';

export function TimeControls() {
    const [currentTime, setCurrentTime] = useState(0);
    const [audioCurrentTime, setAudioCurrentTime] = useState('00:00');
    const [currentSongDuration, setCurrentSongDuration] = useState('');
    const { audio, addZero } = useContext(AudioContext);

    useEffect(() => {
        // audio duration
        setTimeout(audioDurationFunc, 100)

        const timeInterval = setInterval(() => {
            // input - range
            setCurrentTime(audio.currentTime);

            // audio - current time
            let minutes = addZero(Math.floor(audio.currentTime / 60));
            let seconds = addZero(Math.floor(audio.currentTime % 60));
            setAudioCurrentTime(`${minutes}:${seconds}`);
        }, 1000)

        return () => {
            clearInterval(timeInterval);
        }
    }, [])

    const audioDurationFunc = () => {
        const minutes = addZero(Math.floor(audio.duration / 60));
        const seconds = addZero(Math.floor(audio.duration % 60));
        const result = `${minutes}:${seconds}`;
    
        if (result !== 'NaN:NaN') {
            setCurrentSongDuration(`${minutes}:${seconds}`);
        } else {
            setTimeout(audioDurationFunc, 100);
        }
    }

    const handleChangeInputRange = (e) => {
        const time = e.target.value;
        const minutes = addZero(Math.floor(time / 60));
        const seconds = addZero(Math.floor(time % 60));
        audio.currentTime = time;

        setAudioCurrentTime(`${minutes}:${seconds}`);
        setCurrentTime(time);
    }

    return (
        <div className='TimeControls'>
            <p>{audioCurrentTime}</p>

            <input
                type='range'
                min={0}
                step={1}
                max={`${audio.duration}`}
                value={currentTime}
                onChange={handleChangeInputRange}
            />

            <p>{currentSongDuration}</p>
        </div>
    )
}


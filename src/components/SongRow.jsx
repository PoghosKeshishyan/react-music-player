import { useContext } from 'react';
import { AudioContext } from '../context/AudioContext';
import { TimeControls } from './TimeControls';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload, faPause, faPlay } from '@fortawesome/free-solid-svg-icons';
import '../css/SongRow.css';

export function SongRow({ song, length }) {
  const { handleToggleAudio, audioEnded, currentSong, isPlaying } = useContext(AudioContext);
  const isCurrentSong = currentSong.id === song.id;

  const downloadAudio = () => {
    const link = document.createElement('a');
    link.href = song.src;
    link.download = song.songName;
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className={isCurrentSong & !audioEnded ? 'SongRow active' : 'SongRow'}>
      <div className='infoSong'>
        <img src='images/player-img.png' alt='Player Image' />

        <div className='buttonsSong' onClick={() => handleToggleAudio(song)}>
          {
            isCurrentSong && isPlaying && !audioEnded ?
              <FontAwesomeIcon icon={faPause} /> :
              <FontAwesomeIcon icon={faPlay} />
          }
        </div>

        <div className='credits'>
          <p className='songName'>{song.songName}</p>

          <div className='sub_credits'>
            <p className='artistName'>{song.artistName}</p>
            {
              isCurrentSong && !audioEnded && <span className='trackNumber'>
                {song.trackNumber} / {length}
              </span>
            }
          </div>
        </div>
      </div>

      {isCurrentSong && !audioEnded && <TimeControls />}

      <div
       title='Download track'
       onClick={downloadAudio}
       className={isCurrentSong && !audioEnded ? 'downloadSong active' : 'downloadSong'} 
      >
        <FontAwesomeIcon icon={faDownload} />
      </div>
    </div>
  )
}

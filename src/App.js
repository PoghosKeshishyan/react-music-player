import { useEffect, useState } from 'react';
import { SongList } from './components/SongList';
import { MusicUploadForm } from './components/MusicUploadForm';
import { PlayAllButton } from './components/PlayAllButton';
import { AddAllButton } from './components/AddAllButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import axios from './axios';
import './css/App.css';

export function App() {
  const [songs, setSongs] = useState([]);
  const [showUploadMusicModal, setShowUploadMusicModal] = useState(false);

  useEffect(() => {
    loadingSongs();
  }, [])

  const loadingSongs = async () => {
    const response = await axios.get('songs');
    setSongs(response.data);
  }

  const handleUploadShow = () => setShowUploadMusicModal(!showUploadMusicModal);

  return (
    <div className='Аpp'>
      <h1>React Music Player</h1>

      <div className='controls'>
        <PlayAllButton />
        <AddAllButton />

        <button className='btn' onClick={handleUploadShow}>
          <FontAwesomeIcon icon={faUpload} />
          Upload Music
        </button>

        {
          showUploadMusicModal && <MusicUploadForm 
            handleUploadShow={handleUploadShow} 
            setShowUploadMusicModal={setShowUploadMusicModal}
          />
        }
      </div>

      <SongList songs={songs} />
    </div>
  );
}


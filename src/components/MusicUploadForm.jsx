import { useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faUpload, faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import '../css/MusicUploadForm.css';

export function MusicUploadForm({ handleUploadShow, setShowUploadMusicModal }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    setUploading(true);

    let i = 0;

    const interval = setInterval(() => {
      if (i < 15) {
        setProgress(++i);
      } else {
        clearInterval(interval);
        setUploading(false);
        setProgress(0);
        setShowUploadMusicModal(false);
        console.log(`File '${selectedFile.name}' successfully loaded.`);
      }
    }, 150);
  };

  return (
    <div className='MusicUploadForm'>
      <form onSubmit={submitHandler}>
        <FontAwesomeIcon icon={faXmark} onClick={handleUploadShow} />
        <h2>Music Upload Form</h2>

        <p className='warning'>
          <FontAwesomeIcon icon={faTriangleExclamation} />
          You can only upload songs in .mp3 and .wav format.
        </p>

        <label htmlFor='file'>
          <FontAwesomeIcon icon={faUpload} />
          Choose file to upload
        </label>

        <input
          type='file'
          id='file'
          accept='.mp3, .wav'
          ref={fileInputRef}
          onChange={handleFileChange}
        />

        {
          selectedFile && <p className='selectedFile'>
            <b>Selected file:</b> <i>{selectedFile.name}</i>
          </p>
        }

        {
          uploading && (
            <div className='uploading'>
              <p>Loading...</p>
              <progress value={progress} max='15' />
            </div>
          )
        }

        <input
          type='submit'
          value='Upload'
          disabled={!selectedFile || uploading}
          className={selectedFile || uploading ? 'btn' : 'btn disabled'}
        />
      </form>
    </div>
  );
};












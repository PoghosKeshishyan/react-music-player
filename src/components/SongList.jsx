import { SongRow } from './SongRow';
import '../css/SongList.css';

export function SongList({ songs }) {
    return (
        <div className='SongList'>
            {
                songs.map(song => <SongRow
                    key={song.id}
                    song={song}
                    length={songs.length}
                />)
            }
        </div>
    );
};


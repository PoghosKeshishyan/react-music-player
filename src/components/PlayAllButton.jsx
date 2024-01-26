export function PlayAllButton() {
  const handlePlayAllBtn = () => {
    console.log('Play All clicked');
  };

  return (
    <button className='btn' onClick={handlePlayAllBtn}>
      Play All
    </button>
  );
};
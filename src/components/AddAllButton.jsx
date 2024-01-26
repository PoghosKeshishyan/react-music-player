export function AddAllButton() {
  const handleAddAllBtn = () => {
    console.log('Add All');
  };

  return (
    <button className='btn' onClick={handleAddAllBtn}>
      Add All
    </button>
  );
};

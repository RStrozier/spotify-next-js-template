// modal style types
export const loginModalStyle = {
    position: 'absolute' as const, // Use const assertion
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: '#121212',
    border: 'none',
    borderRadius: '3px',
    boxShadow: '0 3px 30px rgba(128, 0, 128, 0.3)',
    p: 4,
    transition: 'transform 0.3s ease-out',
  };
  
  export const favoritePlaylistModalStyle = {
    position: 'absolute' as const, // Use const assertion
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  
  export const testingModalstyle = {
    position: 'absolute' as const, // Use const assertion
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
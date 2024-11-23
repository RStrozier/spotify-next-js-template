import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

export default function LoadingIndicator() {
  return (
    <Box className="flex items-center justify-center h-screen bg-gradient-to-b from-red-500 to-blue-500">
      <div className="w-full max-w-sm p-4 bg-white rounded-lg shadow-md">
        <LinearProgress variant="indeterminate" className="bg-gray-200 h-2 rounded-full animate-pulse" />
      </div>
    </Box>
  );
}


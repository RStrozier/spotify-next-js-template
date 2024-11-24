import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";

export default function LoadingIndicator() {
  return (
    <Box className="flex items-center justify-center h-screen bg-gradient-to-b from-red-500 to-blue-500">
      <div className="w-full max-w-md px-4">
        <LinearProgress
          variant="indeterminate"
          sx={{
            "& .MuiLinearProgress-bar": {
              backgroundColor: "#C62828", // Rich red between bright and dark
            },
            backgroundColor: "rgba(220, 220, 220, 0.5)", // Light gray track
            height: "8px", // Adjust height of the bar
            borderRadius: "4px", // Rounded corners
          }}
        />
      </div>
    </Box>
  );
}
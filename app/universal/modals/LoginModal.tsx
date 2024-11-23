// "use client";

// import { Modal, Box } from "@mui/material"; // Import Modal and Box from Material-UI
// import Image from "next/image";
// import LoginToSpotifyBtn from "@/app/components/buttons/LoginToSpotifyBtn";

// export default function LoginModal({ open, onClose }: { open: boolean; onClose: () => void }) {
//   return (
//     <>
//       {/* Material-UI Modal */}
//       <Modal
//         open={open} // Modal visibility is controlled by the `open` prop
//         onClose={onClose} // Close the modal on background click or Escape key
//         aria-labelledby="modal-title"
//         aria-describedby="modal-description"
//       >
//         <Box
//           sx={{
//             position: "absolute",
//             top: "50%",
//             left: "50%",
//             transform: "translate(-50%, -50%)", // Centers the modal
//             width: 400, // Modal width
//             bgcolor: "background.paper", // Background color
//             boxShadow: 24, // Material-UI shadow
//             p: 4, // Padding
//             borderRadius: 2, // Rounded corners
//             display: "flex",
//             flexDirection: "column",
//             alignItems: "center",
//           }}
//         >
//           {/* Your existing content */}
//           <Image
//             src="/images/final-logo-pulse-playlist.png"
//             alt="Pulse Playlist Logo"
//             className="mb-4"
//             width={300}
//             height={100}
//           />
//           <LoginToSpotifyBtn />
//         </Box>
//       </Modal>
//     </>
//   );
// }
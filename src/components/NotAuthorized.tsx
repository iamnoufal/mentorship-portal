import { Typography, Box } from "@mui/material";
import Image from "next/image";
import notAuthorizedImage from "@/assets/images/not_authorized.webp";


function NotAuthorized() {
  return (
    <Box sx={{ width: "100%", height: "100%" }}>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Image src={notAuthorizedImage} alt="not authorized" />
      </Box>
      <Typography variant="h3" textAlign="center" sx={{ mt: 1 }}>
        You are not authorized to access this page
      </Typography>
      <Typography variant="h5" textAlign="center" sx={{ mt: 1 }}>
        This area is reserved for unicorns and wizards only. If you possess
        magical powers, let the wizards know.
      </Typography>
    </Box>
  );
}

export default NotAuthorized;

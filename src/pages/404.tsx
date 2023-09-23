import Layout from "@/components/Layout";
import { Box, Typography } from "@mui/material";
import Image from "next/image";
import errorImage from "@/assets/images/not_found.webp";

export default function NotFoundPage() {
  return (
    <Layout title="404 | Mentorship Portal">
      <Box>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Image src={errorImage} alt="Page not found" />
        </Box>
        <Typography textAlign="center" variant="h5">
          You seem to have stumbled upon a page that doesn&apos;t exist.
          Don&apos;t worry, we won&apos;t tell anyone that you got lost
        </Typography>
      </Box>
    </Layout>
  );
}

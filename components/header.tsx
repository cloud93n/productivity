import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Link from "@components/link";

export default function Header() {
  return (
    <>
      <Box
        display="flex"
        width="100vw"
        height="5vh"
        justifyContent="center"      
      >
        <Link href="/">
          Home
        </Link>
      </Box>
    </>
  );
}

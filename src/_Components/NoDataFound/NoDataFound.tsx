import { Typography, Box } from "@mui/material";

export default function NoDataFound() {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="80vh"
    >
      <Typography variant="h5" color="textSecondary">
        No Data Found
      </Typography>
    </Box>
  );
}

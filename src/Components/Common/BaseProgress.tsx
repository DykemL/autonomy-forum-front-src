import { Box, CircularProgress } from "@mui/material";

function BaseProgress() {
  return (
    <Box sx={{ mt: 5, display: 'flex', justifyContent: 'center' }}><CircularProgress /></Box>
  )
}

export default BaseProgress;
import { Grid, Box, Skeleton } from '@mui/material';

export default function PendingSkeleton() {
  return (
    <Grid container spacing={2}>
      {Array.from(new Array(4)).map((_, index) => (
        <Grid item xs={12} md={6} key={index}>
          <Box sx={{ width: '18.75rem', mt: '0.188rem' }}>
            <Skeleton variant="rectangular" width={210} height={130} />
            <Box sx={{ pt: 0.5 }}>
              <Skeleton />
              <Skeleton width="60%" />
            </Box>
          </Box>
        </Grid>
      ))}
    </Grid>
  );
}

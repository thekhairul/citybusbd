import DirectionsBusFilledTwoToneIcon from '@mui/icons-material/DirectionsBusFilledTwoTone';
import { Box, Card, CardContent, Typography } from '@mui/material';
import { motion } from 'framer-motion';

const NoResult = ({ from, to }) => {
  return (
    <motion.div
      initial={{ opacity: 0, translateY: '20px' }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card sx={{ bgcolor: '#fff', borderRadius: 2, overflow: 'hidden', boxShadow: 3 }}>
        <CardContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, padding: 3 }}>
            <DirectionsBusFilledTwoToneIcon sx={{ fontSize: 60, color: '#666' }} />
            <Typography variant="h5" component="div" className="font-sans" sx={{ fontWeight: 700, textAlign: 'center' }}>
              No Direct Bus Found
            </Typography>
            <Typography variant="body1" color="text.secondary" className="font-sans" sx={{ textAlign: 'center' }}>
              We couldn&apos;t find any buses for {from} to {to}. Please try a different combination of stops.
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default NoResult;

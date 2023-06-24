import React from 'react';
import LinearProgress, { LinearProgressProps } from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

function LinearProgressWithLabel(props: LinearProgressProps & { value: number } & ProgressProps) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ width: '100%', mr: 1 }}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 55 }}>
        <Typography variant="body2" color="text.secondary">
          {props.num + 1} / {props.total}
        </Typography>
      </Box>
    </Box>
  );
}

type ProgressProps = {
  total: number;
  num: number;
};

export const Progress: React.FC<ProgressProps> = (props) => {
  const { total, num } = props;
  const progress = Math.ceil(((num + 1) / total) * 100);
  const value = Math.min(progress, 100);
  return (
    <Box sx={{ width: '100%' }}>
      <LinearProgressWithLabel value={value} {...props} />
    </Box>
  );
};

export default Progress;

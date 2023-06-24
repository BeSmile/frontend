import * as React from 'react';
import { styled } from '@mui/material/styles';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import makeStyles from '@mui/styles/makeStyles';
import createStyles from '@mui/styles/createStyles';
import { Controls } from '@/pages/rocket/useControls';
import VolumeUpTwoToneIcon from '@mui/icons-material/VolumeUpTwoTone';
import AutoModeTwoToneIcon from '@mui/icons-material/AutoModeTwoTone';
import GTranslateTwoToneIcon from '@mui/icons-material/GTranslateTwoTone';
import VolumeOffTwoToneIcon from '@mui/icons-material/VolumeOffTwoTone';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Word } from '@/pages/rocket/types';
import { LENGTH } from '@/pages/rocket/constants';

const useStyles = makeStyles(() =>
  createStyles({
    container: {
      display: 'inline-block',
      float: 'right',
    },
  }),
);

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  '& .MuiToggleButtonGroup-grouped': {
    margin: theme.spacing(0.5),
    border: 0,
    '&.Mui-disabled': {
      border: 0,
    },
    '&:not(:first-of-type)': {
      borderRadius: theme.shape.borderRadius,
    },
    '&:first-of-type': {
      borderRadius: theme.shape.borderRadius,
    },
  },
}));

type ToolsBarProps = {
  dataSource: Word[];
  controls: Controls;
  toggleControls: (key: keyof Controls, flag?: boolean | number) => void;
};

const ToolsBar: React.FC<ToolsBarProps> = ({ controls, toggleControls, dataSource }) => {
  const styles = useStyles();
  const [alignment, setAlignment] = React.useState('left');
  const [formats, setFormats] = React.useState(() => ['italic']);

  const handleFormat = (_: React.MouseEvent<HTMLElement>, newFormats: string[]) => {
    setFormats(newFormats);
  };

  const handleAlignment = (_: React.MouseEvent<HTMLElement>, newAlignment: string) => {
    setAlignment(newAlignment);
  };

  const total = Math.ceil(dataSource.length / LENGTH);

  const handleChange = (event: SelectChangeEvent<typeof controls.chapterNum>) => {
    toggleControls('chapterNum', Number(event.target.value) || 0);
  };

  return (
    <div className={styles.container}>
      <Paper
        elevation={0}
        sx={{
          display: 'flex',
          border: (theme) => `1px solid ${theme.palette.divider}`,
          flexWrap: 'wrap',
        }}
      >
        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="demo-controlled-open-select-label">专八</InputLabel>
          <Select
            labelId="demo-controlled-open-select-label"
            id="demo-controlled-open-select"
            // open={true}
            label="章节"
            size="small"
            value={controls.chapterNum}
            onChange={handleChange}
          >
            {Array.from({ length: total }).map((_, i) => (
              <MenuItem key={i} value={i}>
                章节{i + 1}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <StyledToggleButtonGroup size="small" value={alignment} exclusive onChange={handleAlignment} aria-label="text alignment">
          <ToggleButton value="us" selected={controls.us} onClick={() => toggleControls('us', true)} aria-label="left aligned">
            US
          </ToggleButton>
          <ToggleButton value="uk" selected={!controls.us} onClick={() => toggleControls('us', false)} aria-label="centered">
            UK
          </ToggleButton>
        </StyledToggleButtonGroup>
        <Divider flexItem orientation="vertical" sx={{ mx: 0.5, my: 1 }} />
        <StyledToggleButtonGroup size="small" value={formats} onChange={handleFormat} aria-label="text formatting">
          {/*章节循环*/}
          <ToggleButton value="auto" selected={controls.loop} onClick={() => toggleControls('loop')} aria-label="auto">
            <AutoModeTwoToneIcon />
          </ToggleButton>
          {/*释意显示*/}
          <ToggleButton value="translate" selected={controls.paraphrase} onClick={() => toggleControls('paraphrase')} aria-label="translate">
            <GTranslateTwoToneIcon />
          </ToggleButton>
          {/*音效*/}
          <ToggleButton onClick={() => toggleControls('voice')} selected={controls.voice} value="voice" aria-label="voice">
            {controls.voice ? <VolumeUpTwoToneIcon /> : <VolumeOffTwoToneIcon />}
          </ToggleButton>
        </StyledToggleButtonGroup>
      </Paper>
    </div>
  );
};

export default ToolsBar;

import * as React from 'react';
import { useSafeState } from 'ahooks';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import { styled, Theme, useTheme } from '@mui/material/styles';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Divider, List } from '@mui/material';

const BootstrapInput = styled(InputBase)(({ theme }) => ({
  'label + &': {
    marginTop: theme.spacing(3),
  },
  '& .MuiInputBase-input': {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '10px 26px 10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    fontFamily: ['-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', '"Helvetica Neue"', 'Arial', 'sans-serif', '"Apple Color Emoji"', '"Segoe UI Emoji"', '"Segoe UI Symbol"'].join(','),
    '&:focus': {
      borderRadius: 4,
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
}));

const regModels = [
  {
    label: '全局模式查找',
    value: 'g',
  },
  {
    label: '不区分大小写',
    value: 'i',
  },
  {
    label: '表示多行匹配',
    value: 'm',
  },
  {
    label: '与/m相对，单行模式匹配',
    value: 's',
  },
  {
    label: '可执行模式，此为PHP专有参数',
    value: 'e',
  },
  {
    label: '忽略空格符, 只能应用于正则表达式本身',
    value: 'x',
  },
  {
    label: '忽略该字符及其之后第一个换行符之前的所有字符',
    value: '#',
  },
];

const RegList = [
  {
    label: '获取Url路径',
    value: /http(?:s)?:\/\/[-a-z0-9]+(\.[-a-z0-9]+)*\.(com|edu|info)\b(\/[-a-z0-9_:@&?=+,.!/~*'%$]*(?<![.,?!]))?/,
    mode: ['g', 'i'],
  },
  {
    label: '重复单词',
    value: /\b([a-z]+)((?:\s|<[^>]+>)+)(\1\b)/,
    mode: ['g'],
  },
];

const createStyle = (name: string, personName: readonly string[], theme: Theme) => {
  return {
    fontWeight: personName.indexOf(name) === -1 ? theme.typography.fontWeightRegular : theme.typography.fontWeightMedium,
  };
};

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const Reg: React.FC = () => {
  const theme = useTheme();
  const [models, setModels] = useSafeState<string[]>([]);

  const handleChange = (event: SelectChangeEvent<typeof models>) => {
    const {
      target: { value },
    } = event;
    setModels(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split('') : value,
    );
  };

  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', flexDirection: 'column' }}>
      <List component="div" sx={{ mb: 1 }}>
        {RegList.map((reg, i) => (
          <React.Fragment key={i}>
            <ListItem button>
              <ListItemText primary={reg.label} secondary={reg.value.toString()} />
            </ListItem>
            {i < RegList.length && <Divider />}
          </React.Fragment>
        ))}
      </List>
      <Paper component="form" sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}>
        <Typography
          component="div"
          // variant="subtitle1"
          color="inherit"
          sx={{
            position: 'relative',
            pl: 1,
            pr: 0.5,
          }}
        >
          /
        </Typography>
        <InputBase sx={{ ml: 1, flex: 1 }} placeholder="请输入正则" inputProps={{ 'aria-label': 'search google maps' }} />
        <Select
          multiple
          displayEmpty
          value={models}
          onChange={handleChange}
          input={<BootstrapInput />}
          renderValue={(selected) => {
            if (selected.length === 0) {
              return <em>/</em>;
            }

            return `/${selected.join('')}`;
          }}
          MenuProps={MenuProps}
          inputProps={{ 'aria-label': 'Without label' }}
        >
          <MenuItem disabled value="">
            <em>请输入匹配模式</em>
          </MenuItem>
          {regModels.map((reg) => (
            <MenuItem key={reg.value} value={reg.value} style={createStyle(reg.value, models, theme)}>
              {reg.label}
            </MenuItem>
          ))}
        </Select>
      </Paper>
      <FormControl fullWidth sx={{ mt: 1, mb: 1 }}>
        <TextField
          id="outlined-multiline-flexible"
          // label="Multiline"
          multiline
          rows={4}
          placeholder="请输入待匹配的正则表达式"
          maxRows={8}
        />
      </FormControl>
      <FormControl fullWidth sx={{ mt: 1, mb: 1 }}>
        <TextField id="outlined-multiline-flexible" label="匹配结果" multiline rows={4} maxRows={8} />
      </FormControl>
    </Box>
  );
};

export default Reg;

import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import { DictionaryBlocksExamples } from '@/services/dictionary';
import uniqueId from 'lodash/uniqueId';
import makeStyles from '@mui/styles/makeStyles';

type ExamplesProps = {
  dataSource: DictionaryBlocksExamples[];
  highlighted: string;
};

const useStyles = makeStyles({
  primary: {
    fontWeight: '500!important',
  },
  highlighted: {
    color: '#0052D9',
  },
});

const AlignItemsList: React.FC<ExamplesProps> = ({ dataSource, highlighted }) => {
  const classes = useStyles();
  const renderHighlighted = (trans: string) => {
    const reg = new RegExp(`(${highlighted})([a-zA-Z]+)?`, 'gi');
    const str = trans.replaceAll(reg, `<span class='${classes.highlighted}'>$1$2</span>`);
    return <span dangerouslySetInnerHTML={{ __html: str }} />;
  };
  return (
    <List sx={{ width: '100%', bgcolor: 'background.paper', marginTop: 0 }}>
      {dataSource.map((item, i) => (
        <React.Fragment key={uniqueId('example')}>
          <ListItem alignItems="flex-start">
            <ListItemText
              primary={renderHighlighted(item.eg)}
              classes={{ primary: classes.primary }}
              secondary={
                <React.Fragment>
                  <Typography
                    // sx={{ display: 'inline' }}
                    component="span"
                    variant="body2"
                    color="text.secondary"
                  >
                    {item.trans}
                  </Typography>
                </React.Fragment>
              }
            />
          </ListItem>
          {i < dataSource.length - 1 && <Divider key={uniqueId('divider')} component="li" />}
        </React.Fragment>
      ))}
    </List>
  );
};

export default AlignItemsList;

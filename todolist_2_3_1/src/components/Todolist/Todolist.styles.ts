import {SxProps} from '@mui/material';

export const styles: SxProps = {
  display: 'flex',
  justifyContent: 'space-between'
}

export const getListItemXs = (isDone: boolean) => ({width: '100%', display: 'flex', justifyContent: 'space-between', opacity: isDone ? .5 : 1});

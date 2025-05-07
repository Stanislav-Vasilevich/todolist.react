import {createTheme} from '@mui/material/styles';

export const getTheme = (themeMode) => {
  return createTheme({
    palette: {
      mode: themeMode,
      primary: {
        main: '#087EA4',
      },
    },
  })
}

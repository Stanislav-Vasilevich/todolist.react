import '@/app/App.css'
import {ThemeProvider} from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import {useSelector} from 'react-redux';
import {selectThemeMode} from '@/app/app-selectors';
import {getTheme} from '@/common/theme/theme';
import Header from '@/common/components/Header/Header';
import Main from '@/app/Main';

export const App = () => {
  const themeMode = useSelector(selectThemeMode);
  const theme = getTheme(themeMode);

  return (
    <ThemeProvider theme={theme}>
      <div className={'app'}>
        <CssBaseline/>
        <Header/>
        <Main/>
      </div>
    </ThemeProvider>
  )
}

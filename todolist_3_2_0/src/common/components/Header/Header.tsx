import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import {NavButton} from '@/common/components/NavButton/NavButton';
import Switch from '@mui/material/Switch';
import AppBar from '@mui/material/AppBar';
import {changeThemeModeAC} from '@/app/app-reducer';
import {useAppDispatch} from '@/common/hooks/useAppDispatch';
import {useAppSelector} from '@/common/hooks/useAppSelector';
import {selectThemeMode} from '@/app/app-selectors';
import {getTheme} from '@/common/theme/theme';
import {containerSx} from '@/common/styles/container.styles';

const Header = () => {
  const themeMode = useAppSelector(selectThemeMode)

  const dispatch = useAppDispatch()

  const theme = getTheme(themeMode);

  const changeMode = () => {
    dispatch(changeThemeModeAC({themeMode: themeMode === 'light' ? 'dark' : 'light'}))
  }

  return (
    <AppBar position="static" sx={{mb: '30px'}}>
      <Toolbar>
        <Container maxWidth={'lg'} sx={containerSx}>
          <IconButton color="inherit">
            <MenuIcon/>
          </IconButton>
          <div>
            <NavButton>Sign in</NavButton>
            <NavButton>Sign up</NavButton>
            <NavButton background={theme.palette.primary.dark}>Faq</NavButton>
            <Switch color={'default'} onChange={changeMode} />
          </div>
        </Container>
      </Toolbar>
    </AppBar>
  )
}

export default Header;

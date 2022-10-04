import { useState, useEffect, MouseEvent } from 'react'
import { Link } from 'react-router-dom'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Menu from '@mui/material/Menu'
import MenuIcon from '@mui/icons-material/Menu'
import Container from '@mui/material/Container'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import Tooltip from '@mui/material/Tooltip'
import MenuItem from '@mui/material/MenuItem'
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch'
import { useAppSelector, useAppDispatch } from '@hooks/redux.hooks'
import { pages, settingsAuthorized, settingsUnAuthorized } from './constants'
import { PAGE_ROUTES } from '@constants/routes'
import { SearchInput } from '@components/SearchInput'
import { authApi } from '@services/AuthServicies'
import { removeCredentials } from '@store/reducers/authSlice'

export const Header = () => {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null)
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null)
  const { isAuthorized, userName } = useAppSelector((store) => store.authReducer)
  const [logout, result] = authApi.useLogoutMutation()
  const { isSuccess, error } = result

  const dispatch = useAppDispatch()

  const handleOpenNavMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget)
  }
  const handleOpenUserMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }
  const handleLogout = async (event: MouseEvent<HTMLDivElement>) => {
    const buttonValue = event.currentTarget.textContent
    if (buttonValue === 'Logout') {
      await logout({})
      dispatch(removeCredentials())
    }
  }

  useEffect(() => {
    if (isSuccess) {
      console.log('logout success')
    } else {
      if (error) {
        console.log('error in logout')
      }
    }
  }, [])

  const settings = isAuthorized ? settingsAuthorized : settingsUnAuthorized

  return (
    <AppBar position='static'>
      <Container maxWidth='xl'>
        <Toolbar disableGutters>
          <RocketLaunchIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant='h6'
            noWrap
            component='a'
            href={PAGE_ROUTES.HOME}
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Meetup-app
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size='large'
              aria-label='account of current user'
              aria-controls='menu-appbar'
              aria-haspopup='true'
              onClick={handleOpenNavMenu}
              color='inherit'
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id='menu-appbar'
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map(({ page, path }) => (
                <MenuItem key={page} onClick={handleCloseNavMenu} component={Link} to={path}>
                  {page}
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <RocketLaunchIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant='h5'
            noWrap
            component='a'
            href=''
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Meetup-app
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map(({ page, path }) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
                component={Link}
                to={path}
              >
                {page}
              </Button>
            ))}
          </Box>

          <SearchInput />

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title={isAuthorized ? userName : 'Authorization'}>
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt={userName} src='/static/images/avatar/2.jpg' />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id='menu-appbar'
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map(({ page, path }) => (
                <MenuItem key={page} onClick={handleCloseUserMenu} component={Link} to={path}>
                  <Typography onClick={handleLogout}>{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}

import { useEffect, useState } from 'react'
import Avatar from '@mui/material/Avatar'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import LoadingButton from '@mui/lab/LoadingButton'
import Link from '@mui/material/Link'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import InputAdornment from '@mui/material/InputAdornment'
import IconButton from '@mui/material/IconButton'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import { useFormik } from 'formik'
import { useNavigate } from 'react-router-dom'
import { PAGE_ROUTES } from '@constants/routes'
import { TOAST_TIMEOUT } from '@constants/index'
import { validationSchema } from './schema'
import { initialValues } from './constants'
import { SignupError } from '@interfaces/index'
import { authApi } from '@services/AuthServicies'
import { useAppDispatch } from '@hooks/redux.hooks'
import { setCredentials } from '@store/reducers/authSlice'
import { ToastContainer, toast } from 'react-toastify'
import { GoogleAuth } from '@components/Login/GoogleAuth'
import 'react-toastify/dist/ReactToastify.css'

export const Login = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [login, result] = authApi.useLoginMutation()
  const { data, isSuccess, isLoading, error } = result
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      await login(values)
    },
  })

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>
    if (isSuccess) {
      dispatch(
        setCredentials({
          userName: data.user.email,
          userId: data.user.id,
          token: data.accessToken,
        }),
      )
      toast.success(data.message, { autoClose: TOAST_TIMEOUT })
      timeout = setTimeout(() => {
        navigate(PAGE_ROUTES.MEETUPS)
      }, TOAST_TIMEOUT)
    } else {
      if (error) {
        const message = (error as SignupError).data.message
        toast.error(message, { autoClose: TOAST_TIMEOUT })
      }
    }
    return () => {
      clearTimeout(timeout)
    }
  }, [isSuccess, error])

  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Sign in
        </Typography>
        <Box component='form' onSubmit={formik.handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin='normal'
            required
            fullWidth
            id='email'
            label='Email Address'
            name='email'
            autoComplete='email'
            autoFocus
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          <TextField
            margin='normal'
            required
            fullWidth
            name='password'
            label='Password'
            type={showPassword ? 'text' : 'password'}
            id='password'
            autoComplete='current-password'
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            InputProps={{
              endAdornment: (
                <InputAdornment position='end'>
                  <IconButton onClick={() => setShowPassword((prevState) => !prevState)} edge='end'>
                    {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <LoadingButton
            type='submit'
            loading={isLoading}
            fullWidth
            sx={{ mt: 3, mb: 2 }}
            variant='contained'
          >
            Sign in
          </LoadingButton>
          <GoogleAuth label='Login' />

          <ToastContainer />
          <Grid container justifyContent='flex-end'>
            <Grid item>
              <Link href={PAGE_ROUTES.SIGNUP} variant='body2'>
                Don&apos;t have an account? Sign Up
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  )
}

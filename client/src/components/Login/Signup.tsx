import { useState, useEffect } from 'react'
import Avatar from '@mui/material/Avatar'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import Link from '@mui/material/Link'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import InputAdornment from '@mui/material/InputAdornment'
import IconButton from '@mui/material/IconButton'
import LoadingButton from '@mui/lab/LoadingButton'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import { useFormik } from 'formik'
import { useNavigate } from 'react-router-dom'
import { PAGE_ROUTES } from '@constants/routes'
import { GoogleAuth } from '@components/Login/GoogleAuth'
import { TOAST_TIMEOUT, UserRoles } from '@constants/index'
import { validationSchema } from './schema'
import { initialValues } from './constants'
import { authApi } from '@services/AuthServicies'
import { SignupError } from '@interfaces/index'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export const Signup = () => {
  const [registerUser, result] = authApi.useRegistrationMutation()
  const { isLoading, data, error, isSuccess } = result

  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      const user = { ...values }
      await registerUser(user)
    },
  })

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>
    if (isSuccess) {
      toast.success(data.message, { autoClose: TOAST_TIMEOUT })
      timeout = setTimeout(() => {
        navigate(PAGE_ROUTES.LOGIN)
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
          Sign up
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
          <Select
            fullWidth
            labelId='demo-simple-select-helper-label'
            id='demo-simple-select-helper'
            label='Role'
            name='role'
            value={formik.values.role}
            onChange={formik.handleChange}
            error={formik.touched.role && Boolean(formik.errors.role)}
          >
            <MenuItem value={UserRoles.USER}>{UserRoles.USER}</MenuItem>
            <MenuItem value={UserRoles.ADMIN}>{UserRoles.ADMIN}</MenuItem>
          </Select>

          <LoadingButton
            type='submit'
            loading={isLoading}
            fullWidth
            sx={{ mt: 3, mb: 2 }}
            variant='contained'
          >
            Sign up
          </LoadingButton>
          <GoogleAuth label='Sign up' />
          <Grid container justifyContent='flex-end' mt={1}>
            <Grid item>
              <Link href={PAGE_ROUTES.LOGIN} variant='body2'>
                Already have an account? Login
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>

      <ToastContainer />
    </Container>
  )
}

import * as yup from 'yup'
import { UserRoles } from '@constants/index'

export const validationSchema = yup.object({
  email: yup.string().email('Enter a valid email').required('Email is required'),
  password: yup
    .string()
    .min(8, 'Password should be of minimum 8 characters length')
    .required('Password is required'),
  role: yup.mixed().oneOf([UserRoles.ADMIN, UserRoles.USER]),
})

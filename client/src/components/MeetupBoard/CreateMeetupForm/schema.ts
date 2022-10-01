import * as yup from 'yup'

export const validationSchema = yup.object({
  title: yup.string().min(3, 'Minimum 3 characters length').required('Title is required'),
  description: yup.string().required('Description is required'),
  place: yup.string().required('Place is required'),
  time: yup
    .date()
    .min(new Date(), 'Date could not be in past!')
    .required('Date and time is required'),
  tags: yup.string().min(3, 'Minimum 3 characters length').required('Date and time is required'),
})

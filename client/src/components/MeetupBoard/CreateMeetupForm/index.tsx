import { Box, Button, TextField, Typography } from '@mui/material'
import { useFormik } from 'formik'
import { CreateMeetupFormProps } from '@components/MeetupBoard/interfaces'
import { initialValues } from './constants'
import { validationSchema } from './schema'

export const CreateMeetupForm = ({ closeModal, isEdited, item }: CreateMeetupFormProps) => {
  const formik = useFormik({
    initialValues: isEdited ? { ...item, tags: item?.tags.join(',') } : initialValues,
    validationSchema,
    onSubmit: (values, { resetForm }) => {
      if (isEdited) {
        console.log('send request to update meetup')
      } else {
        console.log('send request to create meetup')
      }
      alert(JSON.stringify(values, null, 2))
      resetForm()
      closeModal()
    },
  })

  return (
    <Box component='form' onSubmit={formik.handleSubmit} noValidate>
      <Box component='div' sx={{ display: 'flex', justifyContent: 'space-between', color: 'gray' }}>
        <Typography variant='h4' component='h3'>
          Create Meetup
        </Typography>
      </Box>

      <TextField
        margin='normal'
        required
        fullWidth
        id='title'
        label='Title'
        name='title'
        autoComplete='title'
        autoFocus
        value={formik.values.title}
        onChange={formik.handleChange}
        error={formik.touched.title && Boolean(formik.errors.title)}
        helperText={formik.touched.title && formik.errors.title}
      />
      <TextField
        margin='normal'
        required
        fullWidth
        name='description'
        label='Description'
        type='description'
        id='description'
        autoComplete='description'
        value={formik.values.description}
        onChange={formik.handleChange}
        error={formik.touched.description && Boolean(formik.errors.description)}
        helperText={formik.touched.description && formik.errors.description}
      />
      <TextField
        margin='normal'
        required
        fullWidth
        name='place'
        label='Place'
        type='place'
        id='place'
        autoComplete='place'
        value={formik.values.place}
        onChange={formik.handleChange}
        error={formik.touched.place && Boolean(formik.errors.place)}
        helperText={formik.touched.place && formik.errors.place}
      />
      <TextField
        margin='normal'
        required
        fullWidth
        name='time'
        id='datetime-local'
        label='Time'
        type='datetime-local'
        InputLabelProps={{
          shrink: true,
        }}
        value={formik.values.time}
        onChange={formik.handleChange}
        error={formik.touched.time && Boolean(formik.errors.time)}
        helperText={formik.touched.time && formik.errors.time}
      />
      <TextField
        margin='normal'
        required
        fullWidth
        name='tags'
        label='Tags'
        type='tags'
        id='tags'
        autoComplete='tags'
        value={formik.values.tags}
        onChange={formik.handleChange}
        error={formik.touched.tags && Boolean(formik.errors.tags)}
        helperText={formik.touched.tags && formik.errors.tags}
      />
      <Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
        {isEdited ? 'Update' : 'Create'}
      </Button>
    </Box>
  )
}

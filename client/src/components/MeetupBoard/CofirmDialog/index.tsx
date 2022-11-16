import { Box, DialogTitle, Button, DialogActions, Typography } from '@mui/material'
import { ConfirmDialogProps } from '@components/MeetupBoard/interfaces'

export const ConfirmDialog = ({ handleConfirmModal }: ConfirmDialogProps) => {
  return (
    <Box>
      <DialogTitle>
        <Typography variant='h5' component='div' color='gray'>
          Do you really want to delete this meetup?
        </Typography>
      </DialogTitle>
      <DialogActions>
        <Button onClick={() => handleConfirmModal(false)} color='success' variant='contained'>
          <Typography component='div'>Cancel</Typography>
        </Button>
        <Button color='error' variant='contained' onClick={() => handleConfirmModal(true)}>
          <Typography component='div'>Delete</Typography>
        </Button>
      </DialogActions>
    </Box>
  )
}

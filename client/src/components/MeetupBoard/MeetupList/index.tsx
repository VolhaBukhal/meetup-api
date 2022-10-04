import { Grid, Button, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { MeetupItem } from '@components/MeetupBoard/MeetupItem'
import { MeetupListProps } from '@components/MeetupBoard/interfaces'
import { useAppSelector } from '@hooks/redux.hooks'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { PAGE_ROUTES } from '@constants/routes'
import { TOAST_TIMEOUT } from '@constants/index'

export const MeetupList = ({ meetups, closeModal }: MeetupListProps) => {
  const { isAuthorized } = useAppSelector((store) => store.authReducer)
  const navigate = useNavigate()

  const handleClick = () => {
    if (isAuthorized) {
      closeModal()
    } else {
      setTimeout(() => {
        navigate(PAGE_ROUTES.LOGIN)
      }, TOAST_TIMEOUT)
      toast.info('You need to be authorized!')
    }
  }
  return (
    <Grid container spacing={4}>
      {meetups.length > 0 ? (
        meetups.map((item) => (
          <Grid item key={item.id_meetup} xs={12} sm={6} md={4}>
            <MeetupItem {...item} />
          </Grid>
        ))
      ) : (
        <Typography> No meetups yet...</Typography>
      )}
      <Grid item xs={12} sm={6} md={4}>
        <Button
          variant='contained'
          sx={{
            backgroundColor: 'lightgray',
            width: '100%',
            height: '100%',
            '&:hover': { background: 'darkgrey' },
          }}
          onClick={handleClick}
        >
          Create new meetup
        </Button>
      </Grid>
      <ToastContainer />
    </Grid>
  )
}

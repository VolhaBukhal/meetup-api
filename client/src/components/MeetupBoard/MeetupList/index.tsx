import { Grid, Button } from '@mui/material'
import { MeetupItem } from '@components/MeetupBoard/MeetupItem'
import { MeetupListProps } from '@components/MeetupBoard/interfaces'

export const MeetupList = ({ meetups, closeModal }: MeetupListProps) => {
  return (
    <Grid container spacing={4}>
      {meetups.map((item) => (
        <Grid item key={item.id} xs={12} sm={6} md={4}>
          <MeetupItem {...item} />
        </Grid>
      ))}
      <Grid item xs={12} sm={6} md={4}>
        <Button
          variant='contained'
          sx={{
            backgroundColor: 'lightgray',
            width: '100%',
            height: '100%',
            '&:hover': { background: 'darkgrey' },
          }}
          onClick={closeModal}
        >
          Create new meetup
        </Button>
      </Grid>
    </Grid>
  )
}

import { useState } from 'react'
import Box from '@mui/material/Box'
import Tooltip from '@mui/material/Tooltip'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Chip from '@mui/material/Chip'
import Stack from '@mui/material/Stack'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import EditIcon from '@mui/icons-material/Edit'
import { IMeetup } from '@interfaces/index'
import { ModalWindow } from '@components/ModalWindow'
import { ConfirmDialog } from '@components/MeetupBoard/CofirmDialog'
import { CreateMeetupForm } from '@components/MeetupBoard/CreateMeetupForm'
import { meetupApi } from '@services/MeetupService'
import { useAppSelector } from '@hooks/redux.hooks'

export const MeetupItem = ({
  id_meetup,
  title,
  description,
  place,
  time,
  tags,
  userId,
}: IMeetup) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const { isAuthorized } = useAppSelector((store) => store.authReducer)

  const [deleteMeetup] = meetupApi.useDeleteMeetupMutation()

  const handleOpenDelete = () => {
    setIsDeleteModalOpen(true)
  }
  const handleCloseDelete = () => {
    setIsDeleteModalOpen(false)
  }
  const handleOpenEdit = () => {
    setIsEditModalOpen(true)
  }
  const handleCloseEdit = () => {
    setIsEditModalOpen(false)
  }

  const handleConfirmDeleteMeetup = async (needToDelete: boolean) => {
    if (needToDelete) {
      await deleteMeetup(id_meetup)
    }
    setIsDeleteModalOpen(false)
  }

  const localTime = new Date(time).toLocaleTimeString()
  const localDate = new Date(time).toLocaleDateString()
  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        px: 2,
        '&:hover': {
          '& .MuiCardActions-root': {
            transform: 'translate(0px)',
          },
        },
      }}
    >
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color='text.secondary' gutterBottom>
          <Box
            component='span'
            sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
          >
            •
          </Box>
          {place}
        </Typography>
        <Typography variant='h5' component='div'>
          {title}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color='text.secondary'>
          {description}
        </Typography>
        <Typography variant='body2'>
          {localDate} - {localTime}{' '}
        </Typography>
      </CardContent>
      <Stack direction='row' spacing={1} mb={2}>
        {tags.map((item) => (
          <Chip key={item} label={item} />
        ))}
      </Stack>
      {isAuthorized && (
        <CardActions
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            opacity: 1,
            transform: 'translateX(200px)',
            transition: '0.4s',
          }}
        >
          <Tooltip title='Edit meetup'>
            <Button onClick={handleOpenEdit}>
              <EditIcon />
            </Button>
          </Tooltip>

          <Tooltip title='Delete meetup'>
            <Button onClick={handleOpenDelete}>
              <DeleteForeverIcon />
            </Button>
          </Tooltip>

          <ModalWindow isOpen={isDeleteModalOpen} closeModal={handleCloseDelete}>
            <ConfirmDialog
              handleConfirmModal={(needToDelete) => handleConfirmDeleteMeetup(needToDelete)}
            />
          </ModalWindow>

          <ModalWindow isOpen={isEditModalOpen} closeModal={handleCloseEdit}>
            <CreateMeetupForm
              closeModal={handleCloseEdit}
              isEdited={true}
              item={{ id_meetup, title, description, place, time, tags, userId }}
            />
          </ModalWindow>
        </CardActions>
      )}
    </Card>
  )
}

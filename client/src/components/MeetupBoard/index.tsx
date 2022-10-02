import { useState } from 'react'
import { Container, Typography, Button, Grid } from '@mui/material'
import { MeetupList } from './MeetupList'
import { ModalWindow } from '@components/ModalWindow'
import { CreateMeetupForm } from '@components/MeetupBoard/CreateMeetupForm'
import { meetupApi } from '@services/MeetupService'
import { useAppSelector } from 'hooks/redux.hooks'

export const MeetupBoard = () => {
  const { search } = useAppSelector((state) => state.searchReducer)
  const {
    data: meetups,
    isError,
    isLoading,
  } = meetupApi.useGetAllMeetupsQuery({ limit: 1000, search })

  // console.log('meetupApiReturned: ', meetupApiReturned)

  const [isModalOpen, setIsModalOpen] = useState(false)
  const handleCloseModal = () => {
    setIsModalOpen(false)
  }
  const handleOpenModal = () => {
    setIsModalOpen(true)
  }
  return (
    <Container sx={{ py: 4 }}>
      <Typography
        variant='h6'
        noWrap
        sx={{
          mr: 2,
          mb: 4,
          display: { xs: 'none', md: 'flex' },
          fontFamily: 'monospace',
          fontWeight: 400,
          letterSpacing: '.3rem',
          color: 'grey',
          textDecoration: 'none',
        }}
      >
        Upcoming events:
      </Typography>
      {isLoading && <p>Loading...</p>}
      {isError && <p>Error happened! </p>}
      {!isLoading && !isError && meetups ? (
        <MeetupList meetups={meetups} closeModal={handleOpenModal} />
      ) : null}
      {/* // <MeetupList meetups={data} closeModal={handleOpenModal} /> */}

      <ModalWindow isOpen={isModalOpen} closeModal={handleCloseModal}>
        <CreateMeetupForm closeModal={handleCloseModal} isEdited={false} />
      </ModalWindow>
    </Container>
  )
}

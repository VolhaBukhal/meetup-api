import { useState } from 'react'
import { Container, Typography, Button, Grid } from '@mui/material'
import { MeetupList } from './MeetupList'
import { ModalWindow } from '@components/ModalWindow'
import { meetups } from './mockMeetups'
import { CreateMeetupForm } from '@components/MeetupBoard/CreateMeetupForm'

export const MeetupBoard = () => {
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
      <MeetupList meetups={meetups} closeModal={handleOpenModal} />

      <ModalWindow isOpen={isModalOpen} closeModal={handleCloseModal}>
        <CreateMeetupForm closeModal={handleCloseModal} isEdited={false} />
      </ModalWindow>
    </Container>
  )
}

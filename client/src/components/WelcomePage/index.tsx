import { Container, Grid, Typography, CardMedia, Button } from '@mui/material'
import { Link } from 'react-router-dom'
import { PAGE_ROUTES } from '@constants/routes'

export const WelcomePage = () => {
  return (
    <Container>
      <Grid container flexDirection='column'>
        <Grid
          container
          item
          justifyContent='space-between'
          alignItems='center'
          maxWidth='lg'
          sx={{
            height: '95vh',
            '@media only screen and (max-width: 900px)': {
              height: 'auto',
            },
          }}
        >
          <Grid item sm={12} md={5}>
            <Typography
              variant='h3'
              component='h1'
              sx={{
                fontWeight: '700',
                marginBlock: '2rem',
                '@media only screen and (max-width: 900px)': {
                  textAlign: 'center',
                },
                '@media only screen and (max-width: 600px)': {
                  fontSize: '2rem',
                },
              }}
            >
              Welcome to meetups application!
            </Typography>
            <Typography variant='h6' component='div'>
              Here you can create whatever meetup you want!
              <Typography>Everyone can see the upcoming events! </Typography>
              <Typography>Only authorized user can create a meetup!</Typography>
            </Typography>
            <Button variant='contained' component={Link} to={PAGE_ROUTES.MEETUPS}>
              Start now
            </Button>
          </Grid>
          <Grid item sm={12} md={7} mt={1} sx={{ borderRadius: '20px' }}>
            <CardMedia
              component='img'
              height='100%'
              image={process.env.PUBLIC_URL + 'bg.png'}
              alt='main page bg'
              sx={{ borderRadius: '20px' }}
            />
          </Grid>
        </Grid>
      </Grid>
    </Container>
  )
}

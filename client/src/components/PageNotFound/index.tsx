import { Link } from 'react-router-dom'
import { Container, Typography, Button } from '@mui/material'

export const PageNotFound = () => (
  <Container>
    <Typography>Page Not Found</Typography>
    <Button variant='contained' component={Link} to='/'>
      Back to home
    </Button>
  </Container>
)

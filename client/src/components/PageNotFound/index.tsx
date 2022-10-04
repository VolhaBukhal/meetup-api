import { Link } from 'react-router-dom'
import { Container, Typography, Button } from '@mui/material'
import { PAGE_ROUTES } from '@constants/routes'

export const PageNotFound = () => (
  <Container>
    <Typography>Page Not Found</Typography>
    <Button variant='contained' component={Link} to={PAGE_ROUTES.HOME}>
      Back to home
    </Button>
  </Container>
)

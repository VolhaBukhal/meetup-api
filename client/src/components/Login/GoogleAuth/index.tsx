import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

export const GoogleAuth = ({ label }: { label: string }) => {
  const googleAuth = () => {
    window.open('http://localhost:5000/auth/google', '_self')
  }
  return (
    <Grid container justifyContent='flex-start'>
      <Grid item sx={{ width: '100%' }}>
        <Button onClick={googleAuth} variant='outlined' fullWidth>
          <Typography>{label} with </Typography>
          <img src={process.env.PUBLIC_URL + 'google.svg'} />
        </Button>
      </Grid>
    </Grid>
  )
}

import { Routes, Route } from 'react-router-dom'
import { Layout } from '@components/Layout'
import { Login } from '@components/Login/Login'
import { Signup } from '@components/Login/Signup'
import { MeetupBoard } from '@components/MeetupBoard'
import { PAGE_ROUTES } from '@constants/routes'
import { PageNotFound } from '@components/PageNotFound'
import {useSelector} from 'react-redux'
import {meetupApi} from '@services/MeetupService'

function App() {
  const meetupApiReturned = meetupApi.useGetAllMeetupsQuery('')
  console.log('meetupApiReturned: ', meetupApiReturned)
  return (
    <div className='App'>
      <Routes>
        <Route path={PAGE_ROUTES.HOME} element={<Layout />}>
          <Route path={PAGE_ROUTES.LOGIN} element={<Login />} />
          <Route path={PAGE_ROUTES.SIGNUP} element={<Signup />} />
          <Route path={PAGE_ROUTES.MEETUPS} element={<MeetupBoard />} />
          <Route path='*' element={<PageNotFound />} />
        </Route>
      </Routes>
    </div>
  )
}
export default App

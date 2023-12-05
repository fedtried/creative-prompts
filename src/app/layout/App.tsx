import { Container } from 'semantic-ui-react'
import NavBar from '../../features/nav/NavBar'
import './styles.css'
import { Outlet, useLocation } from 'react-router-dom'
import Home from '../../features/home/Home'
import ModalManager from '../common/modals/ModalManager'
import { useEffect } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { useAppDispatch } from '../store/store'
import { logout, signIn } from '../../features/auth/authSlice'
import { auth } from '../config/firebase'

function App() {
  const location = useLocation()
  const dispatch = useAppDispatch()

  useEffect(() => {
    onAuthStateChanged(auth, {
      next: user => {
        if(user){
          dispatch(signIn(user))
        } else {
          dispatch(logout())
        }
      },
      error: error => console.log(error),
      complete: () => {}
    })
  }, [dispatch])

  return (
    <>
      <ModalManager/>
      <NavBar/>
      <Container className='main'>
        {location.pathname === '/' ? <Home/> :  <Outlet/>}
      </Container>
    </>
  )
}

export default App

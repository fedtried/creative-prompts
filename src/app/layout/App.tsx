import { Container } from 'semantic-ui-react'
import NavBar from '../../features/nav/NavBar'
import './styles.css'
import { Outlet, useLocation } from 'react-router-dom'
import Home from '../../features/home/Home'

function App() {
  const location = useLocation()

  return (
    <>
      <NavBar/>
      <Container className='main'>
        {location.pathname === '/' ? <Home/> :  <Outlet/>}
      </Container>
    </>
  )
}

export default App

import { NavLink } from 'react-router-dom'
import { Container, Menu, MenuItem } from 'semantic-ui-react'
import SignedOutButtons from './SignedOutButtons'
import SignedInMenu from './SignedInMenu'
import { useAppSelector } from '../../app/store/store'

const NavBar = () => {
  const {authenticated} = useAppSelector(state => state.auth)

  return (
    <Menu fixed='top'>
      <Container>
        <MenuItem header as={NavLink} to={authenticated ? '/daily' : '/'}>
          Fabula
        </MenuItem>

        {authenticated ?
        <SignedInMenu/>
        :
        <SignedOutButtons/>
        }

      </Container>
    </Menu>
  )
}

export default NavBar
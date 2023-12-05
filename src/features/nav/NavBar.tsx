import { NavLink } from 'react-router-dom'
import { Container, Menu, MenuItem } from 'semantic-ui-react'
import SignedOutButtons from './SignedOutButtons'
import SignedInMenu from './SignedInMenu'
import { useAppSelector } from '../../app/store/store'

const NavBar = () => {
  const {authenticated} = useAppSelector(state => state.auth)

  return (
    <Menu inverted={true} fixed='top'>
      <Container>
        <MenuItem header as={NavLink} to='/daily'>
          Creative Prompts
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
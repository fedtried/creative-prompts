import { NavLink } from 'react-router-dom'
import { Container, Menu, MenuItem } from 'semantic-ui-react'
import SignedOutButtons from './SignedOutButtons'
import SignedInMenu from './SignedInMenu'
import { useState } from 'react'

const NavBar = () => {
  const [auth, setAuth] = useState(true)

  return (
    <Menu inverted={true} fixed='top'>
      <Container>
        <MenuItem header as={NavLink} to='/daily'>
          Creative Prompts
        </MenuItem>

        {auth ?
        <SignedInMenu setAuth={setAuth}/>
        :
        <SignedOutButtons setAuth={setAuth}/>
        }

      </Container>
    </Menu>
  )
}

export default NavBar
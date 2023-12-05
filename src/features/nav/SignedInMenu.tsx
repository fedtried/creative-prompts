import React from 'react'
import { useNavigate } from 'react-router-dom';
import {Dropdown, DropdownItem, DropdownMenu, Image, MenuItem } from 'semantic-ui-react'

type Props = {
    setAuth: (value: boolean) => void;
}

const SignedInMenu = ({setAuth}: Props) => {
    const navigate = useNavigate()

    function handSignOut() {
        setAuth(false)
        navigate('/')
    }

  return (
    <MenuItem position='right'>
        <Image avatar spaced='right' src=''/>
        <Dropdown pointing='top left' text='Name'>
            <DropdownMenu>
                <DropdownItem onClick={handSignOut} text='Sign Out' icon='log out'/>
            </DropdownMenu>
        </Dropdown>
    </MenuItem>
  )
}

export default SignedInMenu
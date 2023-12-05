import React from 'react'
import { useNavigate } from 'react-router-dom';
import {Dropdown, DropdownItem, DropdownMenu, Image, MenuItem } from 'semantic-ui-react'
import {  useAppSelector } from '../../app/store/store';
import { signOut } from 'firebase/auth';
import { auth } from '../../app/config/firebase';


const SignedInMenu = () => {
    const navigate = useNavigate()
    const {currentUser} = useAppSelector(state => state.auth)

    async function handlogout() {
        await signOut(auth)
        navigate('/')
    }

  return (
    <MenuItem position='right'>
        <Image avatar spaced='right' src=''/>
        <Dropdown pointing='top left' text={currentUser?.email as string}>
            <DropdownMenu>
                <DropdownItem onClick={handlogout} text='Sign Out' icon='log out'/>
            </DropdownMenu>
        </Dropdown>
    </MenuItem>
  )
}

export default SignedInMenu
import React from 'react'
import { MenuItem, Button } from 'semantic-ui-react'
import { useAppDispatch } from '../../app/store/store'
import { openModal } from '../../app/common/modals/modalSlice'

const SignedOutButtons = () => {
    const dispatch = useAppDispatch()

  return (
    <MenuItem position='right'>
        <Button onClick={() => dispatch(openModal({type:'LoginForm'}))} basic inverted content='Login'/>
        <Button basic inverted content='Register' style={{marginLeft:'0.5rem'}}/>
    </MenuItem>
  )
}

export default SignedOutButtons
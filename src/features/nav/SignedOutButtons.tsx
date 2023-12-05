import React from 'react'
import { MenuItem, Button } from 'semantic-ui-react'

type Props = {
    setAuth: (value: boolean) => void;
}

const SignedOutButtons = ({setAuth}: Props) => {
  return (
    <MenuItem position='right'>
        <Button onClick={() => setAuth(true)} basic inverted content='Login'/>
        <Button basic inverted content='Register' style={{marginLeft:'0.5rem'}}/>
    </MenuItem>
  )
}

export default SignedOutButtons
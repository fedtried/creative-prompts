import React, { useEffect, useState } from 'react'
import Prompt from './Prompt'
import WritingArea from './WritingArea'
import prompts from '../../../prompt.json'
import { useAppDispatch, useAppSelector } from '../../../app/store/store'
import { auth } from '../../../app/config/firebase'
import { Button } from 'semantic-ui-react'
import { openModal } from '../../../app/common/modals/modalSlice'

const PromptDashboard = () => {
  const {authenticated} = useAppSelector(state => state.auth)
  const dispatch = useAppDispatch()

  function getDate() {
    const today = new Date();
    const date = today.toDateString();
    return date
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [currentDate, setCurrentDate] = useState(getDate());
  const [quote, setQuote] = useState('')

  useEffect(() => {
    const quote = prompts[1]
    setQuote(quote)
  }, )

  return (
    <>
      <Prompt quote={quote} date={currentDate}></Prompt>
      {authenticated &&
        <WritingArea quote={quote} date={currentDate}></WritingArea>
      }
      {!authenticated &&
        <Button onClick={() => dispatch(openModal({type:'LoginForm'}))} >Get Writing</Button>
      }


    </>


  )
}

export default PromptDashboard
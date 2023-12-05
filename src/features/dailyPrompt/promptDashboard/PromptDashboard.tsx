import React, { useEffect, useState } from 'react'
import Prompt from './Prompt'
import WritingArea from './WritingArea'
import prompts from '../../../prompt.json'

const PromptDashboard = () => {

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

      
      <WritingArea quote={quote} date={currentDate}></WritingArea>
    </>


  )
}

export default PromptDashboard
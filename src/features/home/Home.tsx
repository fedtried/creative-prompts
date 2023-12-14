/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react'
import Prompt from '../dailyPrompt/promptDashboard/Prompt';
import { Button } from 'semantic-ui-react';
import { useAppDispatch } from '../../app/store/store';
import { openModal } from '../../app/common/modals/modalSlice';

const Home = () => {
  const dispatch = useAppDispatch()

    function getDate() {
        const today = new Date();
        const date = today.toDateString();
        return date
      }

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const [currentDate, setCurrentDate] = useState(getDate());
      const [quote, setQuote] = useState('')

      return (
        <>
          <h1>Unleash your creativity with daily writing prompts, fueling your imagination on a literary adventure.</h1>
          <Prompt quote={quote} date={currentDate}></Prompt>
          <Button onClick={() => dispatch(openModal({type:'LoginForm'}))}>Get Writing</Button>
         </>

      )
}

export default Home
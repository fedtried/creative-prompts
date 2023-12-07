import React, { useEffect, useState } from 'react'
import Prompt from '../dailyPrompt/promptDashboard/Prompt';
import prompts from '../../prompt.json'
import { Button } from 'semantic-ui-react';

const Home = () => {

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
          <Prompt quote={quote} date={currentDate}></Prompt>
          <Button>Get Writing</Button>
         </>

      )
}

export default Home
import React, { ChangeEvent, useState } from 'react'
import { Button, Form, TextArea } from 'semantic-ui-react'
import { Writing } from '../../../app/types/writing'
import { createId } from '@paralleldrive/cuid2'

const WritingArea = (props: { date: string; quote: string}) => {
  const [writing, setWriting] = useState('')
  const [dailyWriting, setDailyWriting] = useState<Writing>()

  function onSubmit(){
    setDailyWriting({
        id: dailyWriting ? dailyWriting.id : createId(),
        date: props.date,
        quote: props.quote,
        piece: writing
    })
    console.log(dailyWriting)
  }

  function handleInputChange(e: ChangeEvent<HTMLTextAreaElement>){
    const {value} = e.target
    setWriting(value)
  }

  return (
    <Form>
        <TextArea rows={20} placeholder='Write your story' onChange={e => handleInputChange(e)} />
        <Button style={{marginTop:'1rem'}} type='submit' onClick={onSubmit}>Save</Button>
    </Form>
  )
}

export default WritingArea
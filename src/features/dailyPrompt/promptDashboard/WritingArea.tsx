import React, { ChangeEvent, useState } from 'react'
import { Button, Form, TextArea } from 'semantic-ui-react'
import { Writing } from '../../../app/types/writing'
import { createId } from '@paralleldrive/cuid2'
import { doc, setDoc, updateDoc } from 'firebase/firestore'
import { db } from '../../../app/config/firebase'
import { useAppSelector } from '../../../app/store/store'

const WritingArea = (props: { date: string; quote: string}) => {
  const {currentUser} = useAppSelector(state => state.auth)
  const [writing, setWriting] = useState('')
  const [loading, setLoading] = useState(false)
  const [wordCount, setWordCount] = useState(0)
  const [dailyWriting, setDailyWriting] = useState<Writing>()

  async function onSubmit(){
    setLoading(true)
    const user_id = currentUser?.uid ? currentUser?.uid : 'nulls'
    setDailyWriting({
        id: dailyWriting ? dailyWriting.id : createId(),
        user_id: currentUser?.uid,
        date: props.date,
        quote: props.quote,
        piece: writing,
        state: dailyWriting ? "update" : "new"
    })
    if (dailyWriting?.state === "new"){
      await setDoc(doc(db, "writing", user_id), dailyWriting);
      setLoading(false)
    } else {
      await updateDoc(doc(db, "writing", user_id), {
        piece: writing
      });
      setLoading(false)
    }
  }

  function handleInputChange(e: ChangeEvent<HTMLTextAreaElement>){
    const {value} = e.target
    setWordCount(value.split(' ').length)
    setWriting(value)
  }

  return (
    <Form>
        <TextArea rows={20} placeholder='Write your story' onChange={e => handleInputChange(e)} />
        <p>{wordCount} words</p>
        <Button loading={loading} style={{marginTop:'1rem'}} type='submit' onClick={onSubmit}>Save</Button>
    </Form>
  )
}

export default WritingArea
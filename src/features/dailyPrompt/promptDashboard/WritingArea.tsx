import React, { ChangeEvent, useState } from 'react'
import { Button, Form, TextArea } from 'semantic-ui-react'
import { addDoc, collection, doc, updateDoc } from 'firebase/firestore'
import { db } from '../../../app/config/firebase'
import { useAppSelector } from '../../../app/store/store'

const WritingArea = (props: { date: string; quote: string}) => {
  const {currentUser} = useAppSelector(state => state.auth)
  const [writing, setWriting] = useState('')
  const [loading, setLoading] = useState(false)
  const [wordCount, setWordCount] = useState(0)
  const [docId, setDocId] = useState('')
  const writingCollectionRef = collection(db, "writing")

  async function onSubmit(){
    setLoading(true)
    try {
      if(!docId){
        const docRef = await addDoc(writingCollectionRef, {
          user_id: currentUser?.uid,
          date: props.date,
          quote: props.quote,
          piece: writing
        });
        setDocId(docRef.id)
      } else {
        await updateDoc(doc(db, "writing", docId), {
          piece: writing
        })
      }
    } catch (error) {
      setLoading(false)
    }
    setLoading(false)
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
        <Button disabled={wordCount < 5} loading={loading} style={{marginTop:'1rem'}} type='submit' onClick={onSubmit} content={docId ? "Save" : "Publish"}></Button>
    </Form>
  )
}

export default WritingArea
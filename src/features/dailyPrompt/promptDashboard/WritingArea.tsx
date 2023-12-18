import React, { ChangeEvent, useEffect, useState } from 'react'
import { Button, Form, TextArea } from 'semantic-ui-react'
import { collection, doc, getDoc, getDocs, query, setDoc, updateDoc, where } from 'firebase/firestore'
import { db } from '../../../app/config/firebase'
import { useAppSelector } from '../../../app/store/store'

const WritingArea = (props: { date: string; quote: string}) => {
  const {currentUser} = useAppSelector(state => state.auth)
  const [writing, setWriting] = useState('')
  const [loading, setLoading] = useState(false)
  const [wordCount, setWordCount] = useState(0)

  const fetchData = async () => {
    if(currentUser?.uid){
      const nameRef = doc(db, 'users', currentUser.uid, "stories", props.date)
      const docSnap = await getDoc(nameRef)
      if(docSnap.exists()){
        setWriting(docSnap.data().piece)
      }
    }
  }

  useEffect(() => {
    try {
      fetchData()
    } catch (error) {
      console.log(error)
    }
  }, [])

  async function onSubmit(){
    setLoading(true)
    try {
      if(currentUser?.uid){
        const q = query(
          collection(db, 'users', currentUser.uid, 'stories'),
          where('date', '==', props.date)
        );
        const querySnapshot = await getDocs(q);

        const addStoryRef = collection(db, 'users', currentUser.uid, 'stories');
        const updateStoryRef = query(
          collection(db, 'users', currentUser.uid, 'stories'),
          where('date', '==', props.date)
        );

        const snapshot = await getDocs(updateStoryRef);

        if (querySnapshot.empty) {
          await setDoc(doc(addStoryRef, props.date), {
            date: props.date,
            quote: props.quote,
            piece: writing
          });
      } else {
          snapshot.forEach((doc) => {
              updateDoc(doc.ref, {
                  piece: writing
              });
          });
      }
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
        <TextArea rows={20} placeholder='Write your story' onChange={e => handleInputChange(e)} value={writing}/>
        <p>{wordCount} words</p>
        <Button disabled={wordCount < 5} loading={loading} style={{marginTop:'1rem'}} type='submit' onClick={onSubmit} content="Save"></Button>
    </Form>
  )
}

export default WritingArea
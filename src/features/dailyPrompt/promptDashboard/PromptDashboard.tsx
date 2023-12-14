import React, { useEffect, useState } from 'react'
import Prompt from './Prompt'
import WritingArea from './WritingArea'
import { useAppDispatch, useAppSelector } from '../../../app/store/store'
import { Button } from 'semantic-ui-react'
import { openModal } from '../../../app/common/modals/modalSlice'
import { doc, getDoc, collection, setDoc } from 'firebase/firestore'
import { db } from '../../../app/config/firebase'


const PromptDashboard = () => {
  const {authenticated} = useAppSelector(state => state.auth)
  const dispatch = useAppDispatch()

  function getDate() {
    const today = new Date();
    const date = today.toDateString();
    return date
  }

  //TO-DO: Figure out a nicer way of doing this
  const fetchQuote = async () => {

    const docRef = doc(db, "prompts", "dailyPrompts");
    const docSnap = await getDoc(docRef);
    const dateRef = doc(db, "prompts", "date");
    const dateSnap = await getDoc(dateRef);
    const datesRef = collection(db, "prompts");

    if (docSnap.exists() && dateSnap.exists()) {
      const array: { [x: string]: string; }[] = [];

      Object.keys(docSnap.data()).forEach((key) => {
        array.push({[key]: docSnap.data()[key]});
      });

      const today = new Date();
      const date = today.getDate()
      const count = dateSnap.data().count

      if(date === dateSnap.data().day){
        setQuote(Object.values(array[count])[0])
      } else {
        await setDoc(doc(datesRef, "date"), {
          day: date,
          count: count + 1
        })
        setQuote(Object.values(array[count+1])[0])
      }

    } else {
      console.log("No such document!");
    }
  }

  useEffect(()=>{
      fetchQuote();
  }, [])

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [currentDate, setCurrentDate] = useState(getDate());
  const [quote, setQuote] = useState('')


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
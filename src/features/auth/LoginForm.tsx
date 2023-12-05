/* eslint-disable no-useless-escape */
import React from 'react'
import ModalWrapper from '../../app/common/modals/ModalWrapper'
import { Button, Form } from 'semantic-ui-react'
import {useForm, FieldValues} from 'react-hook-form'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../app/config/firebase'
import { useAppDispatch } from '../../app/store/store'
import { closeModal } from '../../app/common/modals/modalSlice'

const LoginForm = () => {
    const {register, handleSubmit, formState: {isSubmitting, isValid, isDirty}} = useForm()
    const dispatch = useAppDispatch()


    async function onSubmit(data: FieldValues){
        try {
            console.log(data)
            const result = await signInWithEmailAndPassword(auth, data.email, data.password)
            dispatch(closeModal())
            console.log(result)
        } catch (error) {
            console.log(error)
        }
    }

  return (
    <ModalWrapper header='Sign In'>
        <Form onSubmit={handleSubmit(onSubmit)}>

            <Form.Field>
                <input
                    defaultValue='email'
                    placeholder='Email'
                    {...(register('email', { required: true, pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/ }))}
                    />
            </Form.Field>
            <Form.Field>
                <input
                    defaultValue='password'
                    type='password'
                    placeholder='Password'
                    {...(register('password', { required: true }))} />
            </Form.Field>

            <Button
                loading={isSubmitting}
                disabled={!isValid || !isDirty || isSubmitting}
                type='submit'
                fluid
                size='large'
                content='login'
            />
        </Form>
    </ModalWrapper>
  )
}

export default LoginForm
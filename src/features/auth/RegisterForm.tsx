/* eslint-disable no-useless-escape */
import ModalWrapper from '../../app/common/modals/ModalWrapper'
import { Button, Form, Message } from 'semantic-ui-react'
import {useForm, FieldValues} from 'react-hook-form'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { auth } from '../../app/config/firebase'
import { useAppDispatch } from '../../app/store/store'
import { closeModal } from '../../app/common/modals/modalSlice'
import { signIn } from './authSlice'

const RegisterForm = () => {
    const {register, handleSubmit, setError, formState: {isSubmitting, isValid, isDirty, errors}} = useForm(
        {mode: 'all'}
    )
    const dispatch = useAppDispatch()


    async function onSubmit(data: FieldValues){
        try {
            console.log(data)
            const userCreds = await createUserWithEmailAndPassword(auth, data.email, data.password)
            await updateProfile(userCreds.user, {
                displayName: data.displayName
            })
            dispatch(signIn(userCreds.user))
            dispatch(closeModal())
        } catch (error: any) {
            setError('root.serverError', {
                type:'400',
                message:error.message
            })
        }
    }

  return (
    <ModalWrapper header='Register'>
        <Form onSubmit={handleSubmit(onSubmit)}>
            {errors.root && (
                <Message negative>
                    <p>{errors.root.serverError.message}</p>
                </Message>
            )}
            <Form.Field>
                <input
                    defaultValue=''
                    placeholder='Display Name'
                    {...(register('name', { required: true, minLength: 5 }))}
                    />
                {errors.name && <p>Please enter a display name</p>}
            </Form.Field>

            <Form.Field>
                <input
                    defaultValue=''
                    placeholder='Email Address'
                    {...(register('email', { required: true, pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/ }))}
                    />
                {errors.email && <p>Please enter a valid email</p>}
            </Form.Field>

            <Form.Field>
                <input
                    defaultValue=''
                    type='password'
                    placeholder='Password'
                    {...(register('password', { required: true }))} />
                {errors.password && <p>Please enter a password</p>}
            </Form.Field>

            <Button
                loading={isSubmitting}
                disabled={!isValid || !isDirty || isSubmitting}
                type='submit'
                fluid
                size='large'
                content='Register'
                color='pink'
            />
        </Form>
    </ModalWrapper>
  )
}

export default RegisterForm
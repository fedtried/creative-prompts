/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-useless-escape */
import ModalWrapper from '../../app/common/modals/ModalWrapper'
import { Button, Form, Message } from 'semantic-ui-react'
import {useForm, FieldValues} from 'react-hook-form'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../app/config/firebase'
import { useAppDispatch } from '../../app/store/store'
import { closeModal } from '../../app/common/modals/modalSlice'

const LoginForm = () => {
    const {register, handleSubmit, setError, formState: {isSubmitting, isValid, isDirty, errors}} = useForm(
        {mode: 'all'}
    )
    const dispatch = useAppDispatch()


    async function onSubmit(data: FieldValues){
        try {
            const result = await signInWithEmailAndPassword(auth, data.email, data.password)
            dispatch(closeModal())
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            setError('root.serverError', {
                type:'400',
                message:error.message
            })
        }
    }

  return (
    <ModalWrapper header='Sign In'>
        <Form onSubmit={handleSubmit(onSubmit)}>
            {errors.root && (
                <Message negative>
                    <p>{errors.root.serverError.message}</p>
                </Message>
            )}
            <Form.Field>
                <input
                    defaultValue='email'
                    placeholder='Email'
                    {...(register('email', { required: true, pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/ }))}
                    />
                {errors.email && <p>Please enter a valid email</p>}
            </Form.Field>

            <Form.Field>
                <input
                    defaultValue='password'
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
                content='Login'
                color='pink'
            />
        </Form>
    </ModalWrapper>
  )
}

export default LoginForm
import React, { ReactNode } from 'react'
import { Modal, ModalContent, ModalHeader, ModalProps } from 'semantic-ui-react'
import { useAppDispatch, useAppSelector } from '../../store/store'
import { closeModal } from './modalSlice'

type Props = {
    children: ReactNode
    header?: string
} & ModalProps

const ModalWrapper = ({children, header, ...props}: Props) => {
  const {open} = useAppSelector(state => state.modals);
  const dispatch = useAppDispatch();

    return (
        <Modal open={open} onClose={() => dispatch(closeModal())} size={props.size}>
            {header &&
                <ModalHeader>{header}</ModalHeader>
            }
            <ModalContent>
                {children}
            </ModalContent>
        </Modal>
  )
}

export default ModalWrapper
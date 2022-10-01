import { ReactNode } from 'react'

export interface ModalWindowProps {
  isOpen: boolean
  closeModal: () => void
  children: ReactNode
}

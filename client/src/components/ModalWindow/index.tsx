import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import CloseIcon from '@mui/icons-material/Close'
import Modal from '@mui/material/Modal'
import { ModalWindowProps } from './interfaces'

const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  borderRadius: 5,
  boxShadow: 24,
  p: 4,
}

export const ModalWindow = ({ isOpen, closeModal, children }: ModalWindowProps) => {
  return (
    <div>
      <Modal
        open={isOpen}
        onClose={closeModal}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
          <Button onClick={closeModal} sx={{ position: 'absolute', top: 10, right: 10 }}>
            <CloseIcon />
          </Button>
          {children}
        </Box>
      </Modal>
    </div>
  )
}

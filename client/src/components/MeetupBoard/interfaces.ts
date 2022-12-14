import { IMeetup } from '@interfaces/index'

export interface MeetupListProps {
  meetups: IMeetup[]
  closeModal: () => void
}

export interface CreateMeetupFormProps {
  item?: IMeetup
  isEdited: boolean
  closeModal: () => void
}

export interface ConfirmDialogProps {
  handleConfirmModal: (needToDelete: boolean) => void
}

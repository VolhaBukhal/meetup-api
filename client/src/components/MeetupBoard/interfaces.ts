import { IMeetup, IEditedMeetup } from '@interfaces/index'

export interface MeetupListProps {
  meetups: IMeetup[]
  closeModal: () => void
}

export interface CreateMeetupFormProps {
  item?: IEditedMeetup
  isEdited: boolean
  closeModal: () => void
}

export interface ConfirmDialogProps {
  handleConfirmModal: (needToDelete: boolean) => void
}

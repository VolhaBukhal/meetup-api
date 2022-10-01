export interface IMeetup {
  id: string
  title: string
  description: string
  time: string
  place: string
  tags: string[]
  userId: string
}

export type IEditedMeetup = Omit<IMeetup, 'userId'>

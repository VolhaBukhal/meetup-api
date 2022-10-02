export interface IMeetup {
  id_meetup: string
  title: string
  description: string
  time: string
  place: string
  tags: string[]
  userId: string
}

export type IEditedMeetup = Omit<IMeetup, 'userId' | 'id_meetup'>

export interface ISearchInitialState {
  search: string
}

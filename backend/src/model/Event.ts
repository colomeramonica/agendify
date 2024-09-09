import { MeetingRoom } from "./MeetingRoom"
import { User } from "./User"

export class Event {
  id: number
  title: string
  owner: User
  date: Date
  location: MeetingRoom
  hour: TimeRanges
  guests: User[]
  tags: string[]
}
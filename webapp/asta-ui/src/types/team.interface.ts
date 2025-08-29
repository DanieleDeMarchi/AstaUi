export interface Team {
  id: number
  name: string
  coachName: string
  coachPhotoUrl: string
  totalCredits: number
  roster: TeamPlayer[]
}

export interface TeamPlayer {
  id: number
  name: string
  nbaTeam: string
  role: PlayerRole
  price: number
  isReserve: boolean
}

export type PlayerRole = 'G' | 'F' | 'C'

export interface RosterSlot {
  role: PlayerRole
  isReserve: boolean
  player?: TeamPlayer
}
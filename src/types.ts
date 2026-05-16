export type Theme = 'dark' | 'light'
export type ProjectStatus = 'live' | 'active' | 'planned'
export type EventStatus = 'upcoming' | 'past' | 'placeholder'
export type EventType = 'flagship' | 'workshop' | 'panel' | 'social' | 'lab'

export interface BpEvent {
  id: number; title: string; date: string; time: string
  loc: string; type: EventType; desc: string; cap: number; status: EventStatus
}

export interface Member {
  id: number; name: string; role: string; program: string
  year: string; initials: string; isExec: boolean
}
export type Permission = 'OWNER' | 'ADMINISTRATOR' | 'MEMBER'

export interface Group {
  id: number
  name: string
  permission: Permission
}

export interface Friend {
  id: number
  nickname: string
  remark: string
}

export interface GroupMember {
  id: number
  memberName: string
  specialTitle: string
  permission: Permission
  joinTimestamp: number
  lastSpeakTimestamp: number
  muteTimeRemaining: number
  group: Group
}

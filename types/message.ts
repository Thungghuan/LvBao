import * as User from './user'

export type SingleMessageType =
  | 'Source'
  | 'Quote'
  | 'At'
  | 'AtAll'
  | 'Face'
  | 'Plain'
  | 'Image'
  | 'FlashImage'
  | 'Voice'
  | 'Xml'
  | 'Json'
  | 'App'
  | 'Poke'
  | 'Dice'
  | 'MusicShare'
  | 'ForwardMessage'
  | 'File'
  | 'MiraiCode'

export interface BasicSingleMessage {
  type: SingleMessageType
}

export interface SourceMessage extends BasicSingleMessage {
  type: 'Source'
  id: number
  time: number
}

export interface QuoteMessage extends BasicSingleMessage {
  type: 'Quote'
  id: number
  groupId: number
  senderId: number
  targetId: number
  origin: MessageChain
}

export interface AtMessage extends BasicSingleMessage {
  type: 'At'
  target: number
  display: string
}

export interface AtAllMessage extends BasicSingleMessage {
  type: 'AtAll'
}

export interface FaceMessage extends BasicSingleMessage {
  type: 'Face'
  faceId: number
  name: string
}

export interface PlainMessage extends BasicSingleMessage {
  type: 'Plain'
  text: string
}

interface SingleMessageMap {
  Source: SourceMessage
  Quote: QuoteMessage
  At: AtMessage
  AtAll: AtAllMessage
  Face: FaceMessage
  Plain: PlainMessage
}

export type SingleMessage = SingleMessageMap[keyof SingleMessageMap]

export type MessageChain = SingleMessage[]

export type MessageType = 'FriendMessage' | 'GroupMessage'

export interface BasicMessage {
  type: MessageType
  messageChain: MessageChain & {
    0: SourceMessage
  }
  sender: User.Friend | User.GroupMember
}

export interface FriendMessage extends BasicMessage {
  type: 'FriendMessage'
  sender: User.Friend
}

export interface GroupMessage extends BasicMessage {
  type: 'GroupMessage'
  sender: User.GroupMember
}

export type Message = FriendMessage | GroupMessage

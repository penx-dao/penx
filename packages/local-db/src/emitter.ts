import mitt from 'mitt'
import { INode } from '@penx/types'

export type DBEvents = {
  REF_NODE_UPDATED: INode
}

export const emitter = mitt<DBEvents>()

import { decryptString } from '@penx/encryption'
import { db } from '@penx/local-db'
import { getPassword } from '@penx/master-password'
import { ISpace } from '@penx/model-types'
import { SyncServerClient } from '@penx/sync-server-client'

export async function syncFromCloud(space: ISpace) {
  const password = await getPassword()
  const oldNodes = await db.listNodesBySpaceId(space.id)

  console.log('===========oldNodes:', oldNodes)

  const localLastModifiedTime = Math.max(
    ...oldNodes.map((n) => new Date(n.updatedAt).getTime()),
    0,
  )

  console.log('======localLastModifiedTime:', localLastModifiedTime)

  const client = new SyncServerClient(space)
  const newRemoteNodes = await client.getPullableNodes(localLastModifiedTime)

  console.log('======newRemoteNodes:', newRemoteNodes)

  // console.log('=========newRemoteNodes:', newRemoteNodes)

  if (!newRemoteNodes.length) return

  const toRaw = (value: any, password: string) => {
    return typeof value === 'object'
      ? value
      : JSON.parse(decryptString(value as string, password))
  }

  for (const item of newRemoteNodes) {
    const existedNode = oldNodes.find((n) => n.id === item.id)

    if (existedNode) {
      await db.updateNode(item.id, item as any)
    } else {
      await db.createNode(item as any)
    }
  }

  const localLastUpdatedAt = await db.getLastUpdatedAt(space.id)

  await db.updateSpace(space.id, {
    nodesLastUpdatedAt: new Date(localLastUpdatedAt),
  })

  return
}

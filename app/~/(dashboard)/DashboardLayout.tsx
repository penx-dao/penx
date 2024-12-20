'use client'

import { ReactNode, useEffect, useState } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { CreationDialog } from '@/components/CreationDialog/CreationDialog'
import { LoadingDots } from '@/components/icons/loading-dots'
import { SIDEBAR_WIDTH } from '@/lib/constants'
import { useQueryEthBalance } from '@/lib/hooks/useEthBalance'
import { useQueryEthPrice } from '@/lib/hooks/useEthPrice'
import useSession from '@/lib/useSession'
import { cn } from '@/lib/utils'
import { Sidebar } from './Sidebar/Sidebar'

export function DashboardLayout({ children }: { children: ReactNode }) {
  const { push } = useRouter()
  const [sidebarOpen, setSideBarOpen] = useState(true)
  useQueryEthPrice()
  useQueryEthBalance()
  const { status, data: session } = useSession()
  const pathname = usePathname()
  const isNode = pathname?.includes('/~/objects')
  const isPost = pathname?.includes('/~/post/')
  const isAssets = pathname?.includes('/~/assets')
  const params = useSearchParams()
  const isFullWidth = isNode || isPost || isAssets || !!params.get('id')

  useEffect(() => {
    if (status === 'loading') return
    if (status == 'unauthenticated') {
      push('/')
    }
  }, [status, push])

  if (status === 'loading' || !session)
    return (
      <div className="h-screen flex items-center justify-center">
        <LoadingDots className="bg-foreground/60"></LoadingDots>
      </div>
    )

  return (
    <div className="h-screen flex fixed top-0 left-0 bottom-0 right-0">
      <div
        className={cn('h-screen sticky top-0 hidden md:flex')}
        style={{ width: SIDEBAR_WIDTH }}
      >
        <Sidebar />
      </div>
      <div className="flex-1 h-screen overflow-auto">
        <CreationDialog />
        <div
          className={cn(
            !isFullWidth && 'mx-auto md:max-w-2xl pt-16 pb-20',
            isNode,
          )}
        >
          {children}
        </div>
      </div>
    </div>
  )
}

import { Box, FowerHTMLProps } from '@fower/react'
import { useAccount, useDisconnect } from 'wagmi'
import { Button } from 'uikit'
import { IconDisconnect } from '@penx/icons'

interface DisconnectButtonProps extends FowerHTMLProps<'button'> {}

export function DisconnectButton(props: DisconnectButtonProps) {
  const { isConnected } = useAccount()
  const { disconnect } = useDisconnect()
  if (!isConnected) return null
  return (
    <Button
      colorScheme="gray500"
      variant="light"
      onClick={async () => {
        disconnect()
      }}
      roundedFull
      {...props}
    >
      <Box inlineFlex>
        <IconDisconnect size={20} />
      </Box>
      <Box>Disconnect</Box>
    </Button>
  )
}

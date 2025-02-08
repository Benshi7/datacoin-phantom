interface Window {
  solana?: {
    removeAllListeners(arg0: string): unknown
    isPhantom?: boolean
    connect: () => Promise<{ publicKey: any }>
    disconnect: () => Promise<void>
    on: (event: string, callback: (args: any) => void) => void
    isConnected: boolean
    publicKey: any
  }
}

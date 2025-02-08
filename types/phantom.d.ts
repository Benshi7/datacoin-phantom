import { PublicKey } from '@solana/web3.js'

interface PhantomProvider {
  isPhantom?: boolean
  publicKey: PublicKey | null
  isConnected: boolean
  connect: () => Promise<{ publicKey: PublicKey }>
  disconnect: () => Promise<void>
  on: (event: string, callback: any) => void
  request: (method: any, params: any) => Promise<any>
}

interface Window {
  solana?: PhantomProvider
}

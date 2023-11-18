import { ConnectButton } from '@mysten/dapp-kit'

export default function Header() {
  return (
    <header className='flex justify-between items-center h-20 bg-slate-200 px-6'>
      <div>Sui Demo</div>
      <ConnectButton />
    </header>
  )
}

import { ConnectButton } from '@mysten/dapp-kit'
import { useTheme } from 'next-themes'
export default function Header() {
  const { theme, setTheme } = useTheme()
  return (
    <header className='flex justify-between items-center h-20 px-6 border-b-1'>
      <div>Sui Dapp</div>
      <div>
        <ConnectButton />

        <button
          onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
          className='ml-5'
        >
          {theme === 'light' ? 'dark' : 'light'}
        </button>
      </div>
    </header>
  )
}

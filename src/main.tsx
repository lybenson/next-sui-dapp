import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import '@mysten/dapp-kit/dist/index.css'
import {
  SuiClientProvider,
  WalletProvider,
  createNetworkConfig
} from '@mysten/dapp-kit'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { getFullnodeUrl } from '@mysten/sui.js/client'
import { NextUIProvider } from '@nextui-org/react'
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { HashRouter } from 'react-router-dom'

const queryClient = new QueryClient()

const { networkConfig } = createNetworkConfig({
  localnet: { url: getFullnodeUrl('localnet') },
  testnet: { url: getFullnodeUrl('testnet') },
  mainnet: { url: getFullnodeUrl('mainnet') }
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <SuiClientProvider
      networks={networkConfig}
      network='testnet'
    >
      <WalletProvider autoConnect>
        <NextUIProvider>
          <NextThemesProvider
            attribute='class'
            defaultTheme='dark'
          >
            <HashRouter>
              <App />
            </HashRouter>
          </NextThemesProvider>
        </NextUIProvider>
      </WalletProvider>
    </SuiClientProvider>
  </QueryClientProvider>
)

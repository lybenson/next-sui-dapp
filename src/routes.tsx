import Faucet from './components/Faucet'
import NFT from './components/NFT'
import Token from './components/Token'

const routes = [
  // {
  //   pathname: 'faucet',
  //   title: 'Faucet',
  //   element: <Faucet />
  // },
  {
    pathname: 'token',
    title: 'Token',
    element: <Token />
  },
  {
    pathname: 'nft',
    title: 'NFT',
    element: <NFT />
  }
]
export default routes

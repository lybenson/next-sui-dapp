import NFT from './components/NFT'
import Token from './components/Token'

const routes = [
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

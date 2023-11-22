import { useCurrentAccount } from '@mysten/dapp-kit'
import { Button } from '@nextui-org/react'
import { useEffect, useState } from 'react'
import { NetWorkType } from '../../types'
import toast from 'react-hot-toast'

export default function Faucet() {
  const [requesting, setRequesting] = useState(false)
  const account = useCurrentAccount()

  const [network, setNetWork] = useState<NetWorkType | undefined>()
  useEffect(() => {
    if (account && account.chains && account.chains.length > 0) {
      const currentnet = account.chains[0]
      if (currentnet === 'sui:testnet') setNetWork(NetWorkType.TestNet)
      else if (currentnet === 'sui:devnet') setNetWork(NetWorkType.DevNet)
      else setNetWork(NetWorkType.NotSupport)
    }
  }, [account])

  const onSend = async () => {
    setRequesting(true)
    await fetch(`https://faucet.${network}.sui.io/gas`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify({
        FixedAmountRequest: {
          recipient: account?.address
        }
      })
    })

    toast('Success')
    setRequesting(false)
  }

  return (
    <div>
      <div>Only Support DevNet</div>
      <Button
        color='primary'
        onClick={onSend}
        isLoading={requesting}
        className='mt-2'
      >
        Send me 10 sui
      </Button>
    </div>
  )
}

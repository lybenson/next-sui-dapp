import {
  useCurrentAccount,
  useSignAndExecuteTransactionBlock,
  useSuiClient,
  useSuiClientQuery
} from '@mysten/dapp-kit'
import { TransactionBlock } from '@mysten/sui.js/transactions'
import { Button, Input, Spinner } from '@nextui-org/react'
import { useEffect, useState } from 'react'

export default function Token() {
  const client = useSuiClient()
  const account = useCurrentAccount()
  const packageId =
    '0xdb71f4f1dbc3d6761538fe88e46b8093d43a2a1774e6a9901f3227bd26dfe9bf'

  const {
    data: coins,
    isPending,
    isError,
    error,
    refetch: refetchGetCoins
  } = useSuiClientQuery(
    'getCoins',
    {
      owner: account?.address || '',
      coinType: `${packageId}::coin::COIN`
    },
    {
      enabled: !!account
    }
  )

  const { data: coinMetadata } = useSuiClientQuery('getCoinMetadata', {
    coinType: `${packageId}::coin::COIN`
  })

  console.log(coinMetadata)

  const { mutate: signAndExecuteTransactionBlock } =
    useSignAndExecuteTransactionBlock()

  const [minting, setMinting] = useState(false)
  const onMint = async () => {
    setMinting(true)
    const txBlock = new TransactionBlock()

    const moduleName = 'coin'
    const functionName = 'mint'
    txBlock.moveCall({
      arguments: [
        txBlock.object(
          '0x5c07ee587fdc3aa2c279e57f00de84df920ecfe53e3a71c34d90965c97255f0f'
        ),
        txBlock.pure.u64(
          BigInt(mintAmount) * BigInt(Math.pow(10, coinMetadata?.decimals || 0))
        ),
        txBlock.pure.address(account!.address)
      ],
      target: `${packageId}::${moduleName}::${functionName}`
    })
    txBlock.setGasBudget(10000000)
    signAndExecuteTransactionBlock(
      {
        transactionBlock: txBlock,
        chain: 'sui::testnet'
      },
      {
        onSuccess: async (tx) => {
          await client.waitForTransactionBlock({
            digest: tx.digest
          })
          setMinting(false)
          refetchGetCoins()
        },
        onError: (error) => {
          console.log(error)
          setMinting(false)
        }
      }
    )
  }

  const [mintAmount, setMintAmount] = useState('')
  const [coinBalance, setCoinBalance] = useState(0n)
  useEffect(() => {
    if (coins && coins.data) {
      const res = coins.data.reduce((prev, coin) => {
        return (prev += BigInt(coin.balance))
      }, 0n)

      setCoinBalance(res)
    }
  }, [coins])

  if (isPending) {
    return (
      <div className='p-10'>
        <Spinner />
      </div>
    )
  }

  if (isError) {
    return (
      <div className='p-10'>
        <div>Error: {error.message}</div>
      </div>
    )
  }

  return (
    <div className='p-10 text-2xl'>
      <div className='text-[red]'>only support testnet</div>
      <div>current network: {account?.chains}</div>
      <div className='flex items-center justify-center mt-3'>
        <Input
          label='Input Mint amount'
          color='primary'
          className='max-w-[200px] mr-4'
          onValueChange={setMintAmount}
        />
        <Button
          color='primary'
          onClick={onMint}
          isLoading={minting}
        >
          Mint {coinMetadata?.symbol}
        </Button>
      </div>

      <div className='flex justify-center items-center text-xl mt-3'>
        <img
          src={coinMetadata?.description}
          className='w-6'
        />
        <span className='ml-2'>{coinMetadata?.symbol}</span>
        <span className='ml-2'>
          余额:
          {(
            coinBalance / BigInt(Math.pow(10, coinMetadata?.decimals || 1))
          ).toLocaleString()}
        </span>
      </div>
    </div>
  )
}

'use client'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Coins, Lock, TrendingUp } from 'lucide-react'
import { useState } from 'react'

export default function StakingPage () {
  const [stakeAmount, setStakeAmount] = useState('')

  return (
    <div className='flex-1 space-y-8'>
      <div className='flex items-center justify-between'>
        <div>
          <h2 className='text-2xl font-bold tracking-tight'>Staking</h2>
          <p className='text-muted-foreground'>
            Stake your DHT tokens to earn rewards
          </p>
        </div>
      </div>

      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Total Staked</CardTitle>
            <Lock className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>12,450 DHT</div>
            <p className='text-xs text-muted-foreground'>≈ $24,900 USD</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>APY</CardTitle>
            <TrendingUp className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>12.5%</div>
            <p className='text-xs text-muted-foreground'>Variable rate</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>
              Rewards Earned
            </CardTitle>
            <Coins className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>1,245 DHT</div>
            <p className='text-xs text-muted-foreground'>This month</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Stake Your Tokens</CardTitle>
          <CardDescription>
            Lock your DHT tokens to earn staking rewards. Minimum stake is 100
            DHT.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className='space-y-4'>
            <div className='space-y-2'>
              <div className='flex items-center justify-between'>
                <label className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
                  Amount to Stake
                </label>
                <span className='text-sm text-muted-foreground'>
                  Balance: 2,547.63 DHT
                </span>
              </div>
              <div className='flex space-x-2'>
                <Input
                  type='number'
                  placeholder='Enter amount'
                  value={stakeAmount}
                  onChange={e => setStakeAmount(e.target.value)}
                />
                <Button
                  variant='outline'
                  onClick={() => setStakeAmount('2547.63')}
                >
                  Max
                </Button>
              </div>
            </div>
            <div className='space-y-4'>
              <div className='flex items-center justify-between text-sm'>
                <span className='text-muted-foreground'>Staking Period</span>
                <span>30 days (minimum)</span>
              </div>
              <div className='flex items-center justify-between text-sm'>
                <span className='text-muted-foreground'>Expected Returns</span>
                <span>
                  ≈{' '}
                  {stakeAmount
                    ? ((Number.parseFloat(stakeAmount) * 0.125) / 12).toFixed(2)
                    : '0.00'}{' '}
                  DHT/month
                </span>
              </div>
              <Button className='w-full' size='lg'>
                Stake DHT
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Active Stakes</CardTitle>
          <CardDescription>Your current staking positions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className='space-y-4'>
            <div className='flex items-center justify-between border-b pb-4'>
              <div>
                <p className='font-medium'>Stake #1</p>
                <p className='text-sm text-muted-foreground'>
                  Locked until Apr 15, 2024
                </p>
              </div>
              <div className='text-right'>
                <p className='font-medium'>5,000 DHT</p>
                <p className='text-sm text-muted-foreground'>
                  +52.08 DHT earned
                </p>
              </div>
            </div>
            <div className='flex items-center justify-between border-b pb-4'>
              <div>
                <p className='font-medium'>Stake #2</p>
                <p className='text-sm text-muted-foreground'>
                  Locked until May 1, 2024
                </p>
              </div>
              <div className='text-right'>
                <p className='font-medium'>7,450 DHT</p>
                <p className='text-sm text-muted-foreground'>
                  +77.60 DHT earned
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

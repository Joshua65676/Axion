import React from 'react'
import { Button } from '../ui/Button'

const ConnectButton: React.FC = () => {
  return (
    <>
      <main className=''>
        <Button className='rounded-lg bg-BgBlue w-[325px] hover:bg-blue-500'>
          <span className='text-[14px] font-medium leading-[15px] tracking-[-0.5%] text-White'>Connect Account</span>
        </Button>
      </main>
    </>
  )
}

export default ConnectButton

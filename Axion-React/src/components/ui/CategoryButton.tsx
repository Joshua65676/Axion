import React from 'react'
import { Cross } from '../../assets'
import { Button } from './Button'

const CategoryButton: React.FC = () => {
  return (
    <main>
      <Button className='flex flex-row gap-3 bg-BgBlue hover:bg-ViewButton w-[173px] h-[50px]'>
        <img src={Cross} alt="cross icon" />
        <span className='text-[14px] tracking-[-0.5%] leading-[125%] font-normal text-White'>Create Category</span>
      </Button>
    </main>
  )
}

export default CategoryButton
import React from 'react'
import { CheckMark } from '../../assets'
import { Button } from './Button'

const MarkBookmark2: React.FC = () => {
  return (
    <>
      <section className="">
        <Button className="bg-BgBlue flex flex-row gap-5 h-[60px] w-[500px] hover:bg-BlueHover">
          <span className="text-[12px] text-WhiteGray font-medium leading-[15px] tracking-[0px]">Mark as Read</span>
          <img src={CheckMark} alt='MarkIcon' />
        </Button>
      </section>
    </>
  )
}

export default MarkBookmark2
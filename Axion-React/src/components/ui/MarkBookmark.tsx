import React from 'react'
import { Button } from './Button'
import { CheckMark } from '../../assets'

const MarkBookmark: React.FC = () => {
  return (
    <>
      <section className="">
        <Button className="bg-WhiteGray flex flex-row gap-5 w-[158px] h-[40px] border border-ParagraphGray">
          <img src={CheckMark} alt='MarkIcon' />
          <span className="text-[12px] text-ParagraphGray font-medium leading-[15px] tracking-[0px]">Mark as Read</span>
        </Button>
      </section>
    </>
  )
}

export default MarkBookmark

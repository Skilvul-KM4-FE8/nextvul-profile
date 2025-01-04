import { ArrowRightIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const FeedbackSection = () => {
  return (
    <div className='py-5 mx-auto dark:bg-[#222222]'>
      <div className='w-10/12 md:max-w-5xl mx-auto flex gap-5 flex-col-reverse md:flex-row items-center justify-center md:justify-between '>
        <div className='p-3 grid gap-5'>
          <h2 className='font-bold text-slate-200 text-3xl'>Like what you see?</h2>
          <p className='text-slate-200'>Your feedback is our priority</p>
          <Link href={"/"} className='font-bold mt-2 py-3 px-4 w-fit border border-slate-100 rounded inline-block'>
            Lets Talk <ArrowRightIcon size={24} className='inline-block' />
          </Link>
        </div>
        <Image 
          src={"/paper_plane.svg"} 
          height={300} 
          width={300} 
          alt='Paper Plane Nextvul' 
          className=''
        />
      </div>
    </div>
  )
}

export default FeedbackSection
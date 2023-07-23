import React from 'react'
import moment from 'moment'

type Props = {
  className: string
}

export default function CurrentDate({className}: Props) {
    const currentDate = moment()
  return (
    <div className={`flex gap-2 ${className}`}>
        <p className='font-bold text-4xl'>
        {currentDate.date()}
        </p>
        <div className='flex flex-col justify-center items-center'>
            <p className='text-xs'>{currentDate.format('dddd')}</p>
            <p className='text-xs'>{currentDate.format('MMMM yyyy')}</p>
        </div>
        </div>
  )
}
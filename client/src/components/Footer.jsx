import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div className='flex items-center justify-between  px-4 gap-4 lg:px-44  py-3 '>
        <img width={140} src={assets.logo} alt="" />|
        <p className='flex-1  border-gray-400 text-sm pl-4 max-sm:hidden'>bg-removal All Rights Reserved | {new Date().getFullYear()} </p>
        <div className='flex gap-1'>
            <img width={40} src={assets.facebook_icon} alt="" />
            <img width={40} src={assets.twitter_icon} alt="" />
            <img width={40} src={assets.google_plus_icon} alt="" />
        </div>
    </div>
  )
}

export default Footer
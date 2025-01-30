import React, { useContext, useEffect } from 'react'
import { assets } from '../assets/assets'
import { Link } from 'react-router-dom'
import { useClerk, UserButton, useUser } from '@clerk/clerk-react'
import { AppContext } from '../context/AppContext'

const Navbar = () => {
  const {openSignIn } = useClerk()
  const { isSignedIn, user } = useUser()
  const {credit,loadCredit} = useContext(AppContext)

  useEffect(()=>{
   if(isSignedIn){
    loadCredit();
   }
  },[isSignedIn])
 return (
 
    <div className='flex justify-between items-center mx-4 py-3 lg:mx-44'>
        <Link to='/'> <img src={assets.logo} alt="" className='w-32 sm:w-40' /></Link>
       {
        isSignedIn ? <div>
        <UserButton/>
        </div>:
         <button onClick={() => openSignIn({})} className='bg-zinc-800 text-white flex items-center gap-4 px-2 py-1 sm:px-8 sm:py-3 text-sm rounded-full' >
         Get Started <img className='w-3 sm:w-4' src={assets.arrow_icon} alt="" />
     </button>
       }
       
    </div>
  )
}

export default Navbar
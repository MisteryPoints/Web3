import { HiMenuAlt4 } from 'react-icons/hi'
import { AiOutlineClose } from 'react-icons/ai'

import logo from './../images/logo.png'
import { useState } from 'react'

const NavbarItem = ({ title, className }) => {
  return (
    <li className={`mx-4 cursor-pointer ${className}`}>
      {title}
    </li>
  )
}

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false)

  return <nav className='w-full flex md:justify-center justify-between items-center p-4'>
    <div className='md:flex-[0.5] flex-initial justify-center items-center'>
      <img src={logo} alt='logo' className='w-32 cursor-pointer'/>
    </div>
    <ul className='text-white md:flex hidden list-none flex-row justify-between items-center flex-initial'>
      {['Market', 'Exchange', 'Tutorials', 'Wallets'].map((item, index) => (
        <NavbarItem key={item + index} title={item} />
      ))}
      <li className='bg-[#2952E3] py-2 px-7 mx-4 rounded-full cursor-pointer hover:bg-[#2546BD] transition-colors duration-200'>
        Login
      </li>
    </ul>
    <div className='flex relative'>
        {toggleMenu 
          ? <AiOutlineClose fontsize={28} width={60} className='text-white md:hidden cursor-pointer min-h-[30px] min-w-[30px]' onClick={() => setToggleMenu(false)}/> 
          : <HiMenuAlt4 fontsize={260} className='text-white md:hidden cursor-pointer min-h-[30px] min-w-[30px]' onClick={() => setToggleMenu(true)}/>
        }
        {toggleMenu && (
          <ul className='z-10 fixed top-0 -right-2 sm:p-3 sm:w-[40vw] xs:w-[50vw] w-[60vw] h-screen shadow-2xl md:hidden list-none flex flex-col justify-start items-end rounded-[1.5%] blue-glassmorphism text-white animate-slide-in'>
            <li className='text-xl w-full my-2 pl-4'>
              <AiOutlineClose onClick={() => setToggleMenu(false)} className='cursor-pointer min-h-[25px] min-w-[25px] hover:text-blue-300 transition-all duration-200'/> 
            </li> 
            {['Market', 'Exchange', 'Tutorials', 'Wallets'].map((item, index) => (
              <NavbarItem key={item + index} title={item} className='my-2 text-lg hover:text-blue-300 transition-all duration-200' />
            ))}
          </ul>
        )}
    </div>
  </nav>;
};

export default Navbar;

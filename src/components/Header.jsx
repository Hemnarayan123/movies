import React from 'react'
import PostAddIcon from '@mui/icons-material/PostAdd';
import { Button } from '@mui/material';
import {Link} from 'react-router-dom';

function Header() {
  return (
    <>
    <div className='header sticky top-0 z-10 text-3xl flex justify-between items-center text-red-500 font-bold p-3 border-b-2 border-gray-500'>
     <Link to={'/'}><span> Filmy <span className='text-white'>Verse</span></span></Link>
     <Link to={'/addmovie'}><h1 className='text-lg cursor-pointer flex items-center'>
      <Button> <PostAddIcon className='mr-1' color='secondary'/> <span className='text-white'>Add New</span></Button>
     </h1>
     </Link>
    </div>
  </>
  )
}

export default Header
import { Typography } from '@mui/material'
import React from 'react'

export default function ErrorALert({error} : {error :string | undefined}) {
  return (
    <Typography variant='body2'  className='text-red-700'>{ error }</Typography>
  )
}

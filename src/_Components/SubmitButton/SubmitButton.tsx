import { Button } from '@mui/material'
import React from 'react'
import SendIcon from '@mui/icons-material/Send';
export default function SubmitButton({loading} : {loading : boolean}) {
  return (
    <Button
        type='submit'
          endIcon={<SendIcon />}
          loading={loading}
          loadingPosition="end"
        variant="contained"
        className='w-full'
        >
          Submit
      </Button>
  )
}

'use client'
import React from 'react'
import {FormControl,IconButton,InputAdornment,InputLabel,TextField,Input,Box, Alert} from '@mui/material'
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Controller } from "react-hook-form"
import SubmitButton from '../SubmitButton/SubmitButton';        
import ErrorALert from '../ErrorAlert/ErrorALert';
import useShowPassword from '../RegisterForm/useShowPassword';
import useLogin from './useLogin';
export default function LoginForm() {
  const {showPassword,handleClickShowPassword} = useShowPassword()
  const {loading,handleSubmit,control,errors,handleLogin,iserror} = useLogin()
  return (
    <Box component='form' onSubmit={handleSubmit(handleLogin)}>
      {iserror && <Alert severity="error" className='mb-3'>{ iserror }</Alert>}
    <Controller
        control={control}
              name='email'
              rules={{required:'required',pattern:{value:/^[^\s@]+@[^\s@]+\.[^\s@]+$/,message:'invalid email'}}}
              render={({field : {onChange}}) => (
                <TextField type="email" className="w-full" id="filled-basic" label="Email" variant="standard" sx={{ mb: '10px' }}
                  onChange={onChange}
                />
       )}
    />
    <ErrorALert error={ errors.email?.message } />
      
      <Controller
        control={control}
        name='password'
        rules={{required:'required',minLength:{value:6,message:'minmum length is 6 char'},maxLength:{value:12,message:'maxmum lenght is 12 char'}}}
        render={({field : {onChange}}) => (
          <FormControl
            sx={{ mb: '10px' }} className="w-full" variant="standard">
            <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
            <Input 
              onChange={onChange}
            id="standard-adornment-password"
            type={showPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label={
                    showPassword ? 'hide the password' : 'display the password'
                  }
                  onClick={handleClickShowPassword}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
        )}
      />
      <ErrorALert error={ errors.password?.message } />
      
      <SubmitButton loading={ loading } />
      </Box>
  )
}

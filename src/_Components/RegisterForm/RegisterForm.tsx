'use client'
import React from 'react'
import {FormControl,IconButton,InputAdornment,InputLabel,TextField,Input,Box, Alert} from '@mui/material'
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Controller } from "react-hook-form"
import SubmitButton from '../SubmitButton/SubmitButton';
import useRegister from './useRegister';
import useShowPassword from './useShowPassword';
import ErrorALert from '../ErrorAlert/ErrorALert';
export default function RegisterForm() {
  const {showPassword,handleClickShowPassword} = useShowPassword()
  const {loading,handleSubmit,control,errors,handleRegister,iserror} = useRegister()
  return (
    <Box component='form' onSubmit={handleSubmit(handleRegister)}>
      {iserror && <Alert severity="error" className='mb-3'>{ iserror }</Alert>}
      <Controller
        control={control}
        name='name'
        rules={{ required: 'required',minLength:{value:2,message:'the name must be 2 char or more'} }}
        render={({field : {onChange}}) => (
          <TextField type="text" className="w-full" id="filled-basic" label="Name" variant="standard" sx={{ mb: '10px' }}
            onChange={onChange}
            />
        )}
      />
      <ErrorALert error={ errors.name?.message! } />
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
      <ErrorALert error={ errors.email?.message! } />
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
      <ErrorALert error={ errors.password?.message! } />
      <Controller
        control={control}
        name='age'
        rules={{required:'required',min:{value:18,message:'minmum age is 18 years'},max:{value:80,message:'maxmum age is 80 years'}}}
        render={({field : {onChange}}) => (
          <TextField type="number" className="w-full mb-4" id="filled-basic" label="age" variant="standard" sx={{ mb: '10px' }}
            onChange={onChange}
          />
        )}
      />
      <ErrorALert error={ errors.age?.message! } />
      <Controller
        control={control}
        name='phone'
        rules={{required:'required'}}
        render={({field : {onChange}}) => (
          <TextField type="tel" className="w-full mb-4" id="filled-basic" label="Phone" variant="standard" sx={{ mb: '10px' }}
            onChange={onChange}
          />
        )}
      />
      <ErrorALert error={ errors.phone?.message! } /> 
      
      <SubmitButton loading={ loading } />
      </Box>
  )
}

import React, { useCallback } from 'react'

export default function useShowPassword() {
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = useCallback(()=> {
    setShowPassword((show) => !show)
  },[])
     
    return {showPassword,handleClickShowPassword,}
}

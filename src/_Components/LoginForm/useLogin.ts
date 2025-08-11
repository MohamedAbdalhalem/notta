import axios from 'axios'
import { useRouter } from 'next/navigation'
import  { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { loginFormType } from './LoginForm.type';
import myCookies from 'js-cookie'
import { useDispatch } from 'react-redux'
import { setToken } from '_/lib/redux/authSlice';
export default function useLogin() {
 const [loading, setLoading] = useState(false);
 const [iserror,setIsError] = useState<null | string>(null)   
  const router = useRouter()
  
  const { handleSubmit, control, formState: { errors } } = useForm<loginFormType>()
  
  const dispatch = useDispatch()
 const handleLogin = useCallback((data: loginFormType) => {
  setLoading(true);
  axios.post<{token : string}>('https://note-sigma-black.vercel.app/api/v1/users/signIn', data)
    .then((res) => {
      router.push('/')
      myCookies.set('tkn', res.data.token, { expires: 30 })
      dispatch(setToken(res.data.token))
    })
      .catch((err) => {
          setIsError(err.response.data.msg)
          setTimeout(() => {
             setIsError(null) 
          },3000)
    })
    .finally(() => {
      setLoading(false);
    });
 }, [router]);
    return {loading,handleSubmit,control,errors,handleLogin,iserror}
}

import { registerFormType } from './RegisterForm.type';
import axios from 'axios'
import { useRouter } from 'next/navigation'
import  { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
export default function useRegister() {
 const [loading, setLoading] = useState(false);
 const [iserror,setIsError] = useState<null | string>(null)   
  const router = useRouter()
  const { handleSubmit, control,formState : {errors} } = useForm<registerFormType>()
 const handleRegister = useCallback((data: registerFormType) => {
  setLoading(true);
  axios.post('https://note-sigma-black.vercel.app/api/v1/users/signUp', data)
    .then((res) => {
      router.push('/login');
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
    return {loading,handleSubmit,control,errors,handleRegister,iserror}
}

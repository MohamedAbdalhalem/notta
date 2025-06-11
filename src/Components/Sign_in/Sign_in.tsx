import { useForm } from "react-hook-form"
import { signIn } from "../../types"
import axios from "axios"
import { useContext, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { notescontext } from "../../Context/NotesContext"

export default function Sign_in() {
  const [isLouding, setIsLouding] = useState(false)
  const [isExist,setIsExist] = useState<string | null>(null)
  const [isCreated, setIsCreated] = useState(false)
  const navgatieToHome = useNavigate()
  const {setToken} = useContext(notescontext)
  const { register, handleSubmit, formState: { errors }, } = useForm<signIn>()
  function handleSignINn(data: signIn) {
    setIsLouding(true)
    axios.post('https://note-sigma-black.vercel.app/api/v1/users/signIn',
      data
    ).then(data => {
      localStorage.setItem('tkn',data.data.token)
      setIsCreated(true)
      setToken(data.data.token)
      setTimeout(() => {
        setIsCreated(false)
        navgatieToHome('/')
      }, 3000);
    }).catch(err => {
      console.log(err)
      setIsExist(err.response.data.msg)
      setTimeout(() => {
        setIsExist(null)
      }, 3000);
    }).finally(()=>{
      setIsLouding(false)
    })
  }
  return (
    <div className="p-5">
      <form className="max-w-lg mx-auto" onSubmit={handleSubmit(handleSignINn)} >
        <h3 className="text-gray-800 text-center text-3xl mb-4 font-bold dark:text-white">Sign-up</h3>
        {isCreated && <div className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400" role="alert">
          Welcome 
</div>}
        {isExist && <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
            {isExist}
</div>}

  <div className="relative mb-5">
          <input
            {...register('email',{
              required: 'required',
              pattern:{value:/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,message:'invalid email'}
            })}
            type="email" id="email" className="block py-2.5 ps-6 pe-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-yellow-500 focus:outline-none focus:ring-0 focus:border-yellow-500 peer" placeholder=" " />
                    {errors.email && <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
            {errors.email.message}
</div>}
    <label htmlFor="email" className="absolute text-gray-800 duration-300 transform -translate-y-6 scale-75 top-3 t z-10 origin-[0] peer-placeholder-shown:start-6 peer-focus:start-0 peer-focus:text-yellow-600 peer-focus:dark:text-yellow-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 dark:text-white peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">Email</label>
  </div>
         <div className="relative mb-5">
          <input
            {...register('password',{required: 'required',maxLength:{value:12,message:'the max is 12 char'},minLength:{value:6,message:'the min is 6 char'}})}
            type="password" id="password" className="block py-2.5 ps-6 pe-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-yellow-500 focus:outline-none focus:ring-0 focus:border-yellow-500 peer" placeholder=" " />
                    {errors.password && <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
            {errors.password.message}
</div>}
    <label htmlFor="password" className="absolute text-gray-800 duration-300 transform -translate-y-6 scale-75 top-3 t z-10 origin-[0] peer-placeholder-shown:start-6 peer-focus:start-0 peer-focus:text-yellow-600 peer-focus:dark:text-yellow-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 dark:text-white peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">Password</label>
        </div>
        <button type="submit" className="text-white cursor-pointer bg-yellow-500 hover:bg-yellow-600 focus:outline-none rounded-lg focus:ring-4 focus:ring-yellow-400  font-bold px-5 py-2.5 text-center me-2 mb-2 dark:focus:ring-yellow-900">{ isLouding ? <>
        <svg aria-hidden="true" role="status" className="inline w-4 h-4 me-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
<path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
</svg>
Loading...
        </> : 'Submit'}</button>
        <p className="text-gray-800 mt-2 dark:text-white font-medium  text-center">Don't have any account ?<Link to='/sign-up' className="text-yellow-600"> Sign-up</Link></p>
</form>
    </div>
  )
}


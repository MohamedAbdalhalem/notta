import { useEffect, useState } from "react"
import { Link, NavLink, useNavigate } from "react-router-dom"
import logo from '../../../public/7235470.png'
export default function Navbar() {
  const token = localStorage.getItem('tkn')
  const [isDark, setIsDark] = useState('Dark-mode')
  const navigateToSignIn = useNavigate()
    function darkMode() {
      if (localStorage.getItem('mode') === 'Dark-mode') {
      localStorage.setItem('mode','Light-mode')
      document.documentElement.classList.remove('dark')
      setIsDark('Light-mode')
    } else {
      localStorage.setItem('mode','Dark-mode')
      document.documentElement.classList.add('dark')
      setIsDark('Dark-mode')
    }
    }
    useEffect(() => {
      if (localStorage.getItem('mode') === 'Dark-mode') {
        document.documentElement.classList.add('dark')
        setIsDark('Dark-mode')
      } else {
        document.documentElement.classList.remove('dark')
        setIsDark('Light-mode')
      }
      
    }, [])
  function handleSignOut() {
    localStorage.removeItem('tkn')
    navigateToSignIn('/sign-in')
  }
  return (
    <div>
      <nav className="bg-white border-gray-200 dark:bg-gray-900 shadow-md">
  <div className=" flex flex-wrap items-center justify-between mx-auto p-5">
    <Link to='/' className="flex items-center space-x-1 rtl:space-x-reverse">
      <img src={logo} className="h-8" alt="Flowbite Logo" />
      <span className="self-center  text-2xl font-semibold whitespace-nowrap text-yellow-600">Noota</span>
    </Link>
    <button data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
      <span className="sr-only">Open main menu</span>
      <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h15M1 7h15M1 13h15" />
      </svg>
    </button>
    <div className="hidden w-full md:block md:w-auto" id="navbar-default">
            <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg justify-baseline bg-gray-50 md:flex-row md:space-x-6 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              {token ? <>
                <li>
                  <NavLink to='/' className="block py-2 px-3 text-gray-900 rounded-sm md:bg-transparent  md:p-0 hover:text-yellow-600 dark:text-white" aria-current="page">Home</NavLink>
                </li>
                <li>
                  <p onClick={handleSignOut} className="block py-2 px-3 cursor-pointer text-gray-900  rounded-sm md:bg-transparent hover:text-yellow-600  md:p-0 dark:text-white" aria-current="page">Sign-out</p>
                </li>
              </> : <li>
          <NavLink to='/sign-in' className="block py-2 px-3 text-gray-900 rounded-sm md:bg-transparent hover:text-yellow-600 md:p-0 dark:text-white" aria-current="page">Sign-in</NavLink>
        </li>}
        

        <li>
          <p className="block py-2   rounded-sm md:bg-transparent md:p-0 " aria-current="page"><i onClick={darkMode}  className={isDark  === 'Dark-mode'? 'cursor-pointer fa-solid fa-moon text-gray-900 dark:text-white' : 'cursor-pointer fa-solid fa-sun text-gray-900 dark:text-white' }></i></p>
        </li>
      </ul>
    </div>
  </div>
</nav>
    </div>
  )
}

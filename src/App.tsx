import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Layout from "./Components/Layout/Layout"
import Home from "./Components/Home/Home"
import Sign_in from "./Components/Sign_in/Sign_in"
import Sign_up from "./Components/Sign_up/Sign_up"
import AuthRoute from "./Components/AuthRoute/AuthRoute"
import UnAuthRoute from "./Components/UnAuthRoute/UnAuthRoute"
import NotesContextProvider from "./Context/NotesContext"
import NotFoundPage from "./Components/NotFoundPage/NotFoundPage"

const router = createBrowserRouter([{
  path:'', element: <Layout />, children: [
    {path:'',element:<AuthRoute><Home/></AuthRoute>},
    {path:'sign-in',element:<UnAuthRoute><Sign_in/></UnAuthRoute>},
    { path: 'sign-up', element: <UnAuthRoute><Sign_up /></UnAuthRoute> },
    {path: '*',element:<NotFoundPage/>}
  ]
}])

export default function App() {
  return (
    <NotesContextProvider>
      <RouterProvider router={router} />
    </NotesContextProvider>

  )
}

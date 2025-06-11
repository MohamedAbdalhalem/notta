import { Navigate } from "react-router-dom";
import { childrenProps } from "../../types";



export default function AuthRoute({children} : childrenProps) {
    if (localStorage.getItem('tkn')) {
      return children
    }
    return <Navigate to='/sign-in'/>
}

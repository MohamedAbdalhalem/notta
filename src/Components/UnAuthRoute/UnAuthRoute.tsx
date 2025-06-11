import { Navigate } from "react-router-dom";
import { childrenProps } from "../../types";


export default function UnAuthRoute({children} : childrenProps) {
    if (localStorage.getItem('tkn') === null) {
    return children
    }
    return <Navigate to='/' />
}

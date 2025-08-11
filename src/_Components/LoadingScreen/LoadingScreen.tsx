import { Skeleton } from "@mui/material";


export default function LoadingScreen() {
  return (
    <div className="gird gap-3 px-6 py-3">
    <Skeleton animation="wave"  className="py-4"/>
    <Skeleton animation="wave"  className="py-4"/>
    <Skeleton animation="wave"  className="py-4"/>
    <Skeleton animation="wave"  className="py-4"/>
    <Skeleton animation="wave" className="py-4" />
    <Skeleton animation="wave" className="py-4" />
    <Skeleton animation="wave" className="py-4" />
  </div>
  )
}

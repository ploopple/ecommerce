import { FC, useEffect, useState } from "react"
import SignUpPage from "./pages/SignUpPage"
import { gql, useQuery } from "@apollo/client"
import Cookies from "universal-cookie"
import Loading from "./components/Loading"
import { Navigate } from "react-router-dom"

interface IPrivateRoutes {
    children: JSX.Element
}
const GET_USER_INFO = gql`
 {
   GetUserInfo {
    id
    username
    email
    createdAt
    createdAt
    updatedAt
  }
}`


const PrivateRoutes: FC<IPrivateRoutes> = ({children}) => {
    const cookie = new Cookies
    // const [isAuth, setIsAuth] = useState<boolean>(false)
    const { data, loading, error } = useQuery(GET_USER_INFO, {
        context: {
          headers: {
            Authorization: `Bearer ${cookie.get("token")}`,
          },
        },
      });
      if(loading) {
        return <Loading/>
      }

      console.log(data)
    if(!loading && !error && data.GetUserInfo.username) {
        return children
    }

        return <Navigate to={"/signUp"} />
}

export default PrivateRoutes
import { FC } from "react"
import { gql, useQuery } from "@apollo/client"
import Cookies from "universal-cookie"
import Loading from "./components/Loading"
import { Navigate } from "react-router-dom"

interface IPrivateRoutes {
    isPrivate: boolean
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


const cookie = new Cookies
const PrivateRoutes: FC<IPrivateRoutes> = ({ isPrivate, children }) => {
    const token = cookie.get("token")
    const { data, loading, error } = useQuery(GET_USER_INFO, {
        context: {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        },
        fetchPolicy: "no-cache"
    });

    console.log(data)
    if (loading) {
        return <Loading />
    }

    if (isPrivate) {
        if (!loading && !error && data.GetUserInfo) {
            return children
        }

        return <Navigate to={"/signUp"} />
    }else{
        if (!loading && !error && data.GetUserInfo) {
            return <Navigate to={"/cart"} />
        }
            return children
    }
}

export default PrivateRoutes
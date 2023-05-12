import { FC } from "react"
import { gql, useQuery } from "@apollo/client"
import Cookies from "universal-cookie"
import Loading from "./components/Loading"
import { Navigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { setUser } from "./features/dataSlice"

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
    const dispatch = useDispatch()
    const token = cookie.get("token")
    if (!token && !isPrivate) {
        return children
    }
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

    if (error) {
        cookie.remove("token")
        dispatch(setUser(""))
    }

    const isLoggedIn = data?.GetUserInfo;
    if (isPrivate) {
        return isLoggedIn ? children : <Navigate to="/signUp" />;
    } else {
        return isLoggedIn ? <Navigate to="/cart" /> : children;
    }
}

export default PrivateRoutes
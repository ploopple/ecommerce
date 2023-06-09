import { useState } from "react"
import { isValidEmail } from "../components/isValidEmail"
import { gql, useMutation, useQuery } from "@apollo/client";
import Loading from "../components/Loading";
import Cookies from 'universal-cookie';
import { Navigate, useNavigate } from 'react-router-dom';
import Navbar from "../components/Navbar";
import { SIGNUP_MUTATION } from "../graphql/mutations";
import { ISignUpData } from "../types";
import { setUser } from "../features/dataSlice";
import { useDispatch } from "react-redux";

const SignUpPage = () => {
  const dispatch = useDispatch()
  const cookies = new Cookies();
  const [signUpMutation, { data, loading, error }] = useMutation(SIGNUP_MUTATION);

  const [signUpData, setSignUpData] = useState<ISignUpData>({
    username: { value: "", errMsg: "" },
    email: { value: "", errMsg: "" },
    password: { value: "", errMsg: "" }
  })

  const handleOnInputChange = (e: any, target: string) => {

    let errMsg = ""
    if (target === "username") {
      errMsg = e.target.value.length >= 3 ? "" : target + " must be 3 characters or longer"
    } else if (target === "email") {
      errMsg = e.target.value.length >= 8 ? "" : target + " must be 8 characters or longer"
      if (!errMsg) {
        errMsg = isValidEmail(e.target.value) ? "" : target + " must be email"
      }
    } else if (target === "password") {
      errMsg = e.target.value.length >= 8 ? "" : target + " must be 8 characters or longer"
    }
    setSignUpData({
      ...signUpData,
      [target]: {
        value: e.target.value,
        errMsg
      }
    })
  }

  const isValidData = () => {
    if (signUpData.username.value && !signUpData.username.errMsg &&
      signUpData.email.value && !signUpData.email.errMsg &&
      signUpData.password.value && !signUpData.password.errMsg) {

    return false
    }
  return true
  }

  const handleOnClickSignUp = () => {
    signUpMutation({
      variables: {
        req: {
          username: signUpData.username.value,
          email: signUpData.email.value,
          password: signUpData.password.value,
        },
      },
    });
    }
  if(!loading && !error && data && data.SignUp) {
      cookies.set("token",data.SignUp)
      dispatch(setUser(data.SignUp))
    return <Navigate to="/"/>
  }
  return (
<>
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      {loading && <Loading/>}
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign in to your account</h2>
      </div>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <div className="space-y-6" >
          <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">Username</label>
          <div className="mt-2">
            <input onChange={e => handleOnInputChange(e, "username")} value={signUpData.username.value} id="username" name="username" type="text" autoComplete="username" required className="pl-2  mb-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
            <p className="text-red-400 text-sm">{signUpData.username.errMsg}</p>
          </div>
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
          <div className="mt-2">
            <input onChange={e => handleOnInputChange(e, "email")} value={signUpData.email.value} id="email" name="email" type="email" autoComplete="email" required className="pl-2  mb-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
            <p className="text-red-400 text-sm">{signUpData.email.errMsg}</p>
          </div>
        </div>
        <div>
          <div className="flex items-center justify-between">
            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
          </div>
          <div className="mt-2">
            <input onChange={e => handleOnInputChange(e, "password")} value={signUpData.password.value} id="password" name="password" type="password" autoComplete="current-password" required className="pl-2 mb-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
            <p className="text-red-400 text-sm">{signUpData.password.errMsg}</p>
          </div>
        </div>
        <div>
          <button 
            onClick={handleOnClickSignUp}
            disabled={isValidData()} 
            className={`mt-4 flex w-full justify-center rounded-md ${isValidData() ? "bg-indigo-300 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-500"}  px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}>Sign up</button>
        </div>
      </div>
    </div>
</>
  )
}

export default SignUpPage
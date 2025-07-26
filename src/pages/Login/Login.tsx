import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'; 
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import useLogin from "./useLogin";
import { Link, Navigate } from 'react-router';
import Input from '../../ui/Input';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

function Login(){
    const {
        form,
        isValid,
        isLoading, 
        handleEmailChange, 
        handlePasswordChange, 
        handleLogin
    } = useLogin();

    const {user} = useContext(AuthContext);     
    if(user) return <Navigate to="/" /> 
  
    
  return (
    <div className="h-full flex flex-col">

        <form 
        onSubmit={handleLogin}
        className="flex flex-col items-center w-[40%] gap-1 p-2 mx-auto my-auto">
            <h2 className="max-md:text-2xl text-4xl whitespace-nowrap text-zinc-700 my-8 font-semibold">
                Welcome <span className="font-extrabold">
                    Back!
                </span>
            </h2>
            <>
                <Input
                label='Email' 
                value={form.email}
                onChange={handleEmailChange}
                id="email"
                type="text"
                placeholder="email@example.com" 
            />
                <div className={`${isValid.email && 'opacity-0'} select-none text-red-400 text-sm py-0.5 mx-auto px-2 italic whitespace-nowrap`}>
                    enter a valid email.
                </div>
            </>
            
        <>
            <Input
                label='Password' 
                value={form.password}
                onChange={handlePasswordChange}
                id="password"
                type="password"
                placeholder="xxxxxxxx" 
            />
            <div className={`${isValid.password && 'opacity-0'} select-none text-red-400 text-sm py-0.5 mx-auto px-2 italic whitespace-nowrap`}>
                enter a valid password
            </div>
        </>

            <button className="cursor-pointer bg-pink-600 p-2 text-white rounded-3xl w-80 mt-4">
                {isLoading ? <FontAwesomeIcon className="animate-spin" icon={faSpinner}/> : 'Login'}
            </button>
            <div className="text-center text-lg w-full my-1"> or </div>
            <div className='whitespace-nowrap'>
                <Link to="/signup" className="cursor-pointer font-bold underline">Sign Up</Link> if you don't have an account
            </div>
        </form>
    </div>
  )
}

export default Login
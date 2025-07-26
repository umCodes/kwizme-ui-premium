import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'; 
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import useSignup from './useSignup';
import { Link, Navigate } from 'react-router';
import Input from '../../ui/Input';
import { AuthContext } from '../../context/AuthContext';
import { useContext } from 'react';

export const inputStyle = "outline-0 bg-[var(--secondary-color)] text-gray-300 rounded py-3 p-4  w-full "

function Signup(){
    const {
        form,
        isValid,
        isMatching,
        isLoading, 
        handleNameChange,
        handleEmailChange, 
        handlePasswordChange, 
        handleConfirmPassChange, 
        handleSignup
    } = useSignup();
    
    const {user} = useContext(AuthContext);     
    console.log(user);
    if(user) return <Navigate to="/" /> 
  
  return (
    <div className="h-full flex flex-col">

        <form 
        onSubmit={handleSignup}
        className="flex flex-col items-center w-[40%] gap-1 p-2 mx-auto my-auto">
            <h2 className="text-4xl max-md:text-2xl  text-zinc-700 my-8 font-semibold min-md:whitespace-nowrap mx-auto">
                Welcome to <span className="font-extrabold">
                    KwizMe AI!
                </span>
            </h2>

            <>
                <Input
                label='Name' 
                value={form.name}
                onChange={handleNameChange}
                id="name"
                type="text"
                className={inputStyle}
                placeholder="John Doe" 
            />
                <div className={`${isValid.name && 'opacity-0'} select-none text-red-400 text-sm py-0.5 mx-auto px-2 italic whitespace-nowrap`}>
                    enter a valid name.
                </div>
            </>            

           
            <>
                <Input
                label='Email' 
                value={form.email}
                onChange={handleEmailChange}
                id="email"
                type="text"
                className={inputStyle}
                placeholder="email@example.com" 
            />
                <div className={`${isValid.email && 'opacity-0'} select-none text-red-400 text-sm py-0.5 mx-auto px-2 italic whitespace-nowrap`}>
                    enter a valid email.
                </div>
            </>            

            <>
                <Input
                    label="Password" 
                    value={form.password}
                    onChange={handlePasswordChange}
                    id="password"
                    type="password"
                    className={inputStyle}
                    placeholder="xxxxxxxx" 
                />
                <div className={`${isValid.password && 'opacity-0'} select-none text-red-400 text-sm py-0.5 mx-auto px-2 italic whitespace-nowrap`}>
                    enter a valid password
                </div>
            </>
            
            <>
                <Input 
                    label='Confirm password'
                    value={form.confirmPass}
                    onChange={handleConfirmPassChange}
                    id="password"
                    type="password"
                    className={inputStyle}
                    placeholder="xxxxxxxx" 
                />
                <div className={`${isMatching && 'opacity-0'} select-none text-red-400 text-sm py-0.5 mx-auto px-2 italic whitespace-nowrap`}>
                    passwords doesn't match
                </div>
            </>

            <button className="cursor-pointer bg-pink-600 p-2 rounded-3xl text-white w-80 mt-4">
                {isLoading ? <FontAwesomeIcon className="animate-spin" icon={faSpinner}/> : 'Sign Up'}
            </button>
            <div className="text-center text-lg w-full my-1"> or </div>
            <div className='whitespace-nowrap'>
                <Link to="/login" className="cursor-pointer font-bold underline">Log In</Link> if you don't have an account
            </div>
        </form>
    </div>
  )
}

export default Signup
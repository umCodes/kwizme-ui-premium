import { useContext } from 'react';
import { Link, useLocation } from 'react-router';
import { LabContext } from '../../context/LabContext';

const NavBtn = ({to, text, ...rest}: {to: string; text: string;}) => {
      const location = useLocation();
      const {isLoading} = useContext(LabContext)
      console.log(isLoading, location.pathname);
      

  return (
    <Link
        className={`text-center font-semibold border border-gray-300 px-3 py-0.5 rounded-xl bg-gray-100 text-gray-700
           shadow-[inset_2px_2px_4px_rgba(255,255,255,0.8),inset_-1px_-1px_2px_rgba(0,0,0,0.05)]
             hover:shadow-[2px_2px_4px_rgba(255,255,255,0.8),-1px_-1px_2px_rgba(0,0,0,0.05)] ${location.pathname === to && "border-zinc-300 bg-white"}
             
             `}
        to={to} 
        {...rest}
    >  {text}
    </Link>)
}

export default NavBtn
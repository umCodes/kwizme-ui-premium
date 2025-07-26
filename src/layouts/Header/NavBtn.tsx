import { useContext } from 'react';
import { Link, useLocation } from 'react-router';
import { LabContext } from '../../context/LabContext';
import { motion } from 'framer-motion';

const NavBtn = ({to, text, ...rest}: {to: string; text: string;}) => {
      const location = useLocation();
      const {isLoading} = useContext(LabContext)
      console.log(isLoading, location.pathname);
      

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Link
        className={`text-center font-semibold px-3 py-2 rounded-xl transition-all duration-200 ${
          location.pathname === to 
            ? "bg-white/30 text-white border border-white/40 backdrop-blur-sm" 
            : "bg-white/10 text-white/80 border border-white/20 hover:bg-white/20 hover:text-white backdrop-blur-sm"
        }
             
             `}
        to={to} 
        {...rest}
      >  
        {text}
      </Link>
    </motion.div>
  )
}

export default NavBtn
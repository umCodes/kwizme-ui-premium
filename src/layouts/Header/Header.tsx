import { Link } from 'react-router';
import Logo from './Logo';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import Nav from './Nav';
import { logout } from '../../services/auth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDoorOpen, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { motion } from 'framer-motion';

/**
 * Header: the uppermost section/componet of the layout topping every other component
 * @layoutcomponenet 
 *  
 */

const Header = () => {
    const {user, setUser} = useContext(AuthContext);

    async function handleLogout(){
      try {
        await logout();
        setUser(null);
        return
      } catch (error) {
        console.error(error);
        
      }
    }

  return (
    <motion.header 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className='h-full grid grid-cols-[1fr_5fr_1fr] justify-center items-center px-4 text-white'
    >
      <Logo/>
      <Nav/>
      {
        !user 
        ?
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link
          className='ml-auto font-semibold text-white py-2 px-4 rounded-lg bg-white/20 hover:bg-white/30 transition-all duration-200 backdrop-blur-sm'
          to="/signup"
          title='signup'
        >
          <FontAwesomeIcon icon={faDoorOpen}/>
        </Link>
        </motion.div>
        :
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          title='logout'
          className='ml-auto font-semibold text-white py-2 px-4 rounded-lg bg-red-500/20 hover:bg-red-500/30 transition-all duration-200 backdrop-blur-sm'
          onClick={handleLogout}
        >
          <FontAwesomeIcon icon={faRightFromBracket}/> 
        </motion.button>
      }       
    </motion.header>
  )
}

export default Header
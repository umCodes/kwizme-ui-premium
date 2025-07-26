import { Link } from 'react-router';
import Logo from './Logo';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import Nav from './Nav';
import { logout } from '../../services/auth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDoorOpen, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';

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
    <header className='h-full grid grid-cols-[1fr_5fr_1fr] justify-center items-center px-2'>
      <Logo/>
      <Nav/>
      {
        !user 
        ?
        <Link
          className='ml-auto font-semibold text-green-600 py-1 px-4 hover:bg-green-300'
          to="/signup"
          title='signup'
        >
          <FontAwesomeIcon icon={faDoorOpen}/>
        </Link>
        :
        <button 
          title='logout'
          className='ml-auto font-semibold text-red-700 py-1 px-4  hover:bg-red-300'
          onClick={handleLogout}
        >
          <FontAwesomeIcon icon={faRightFromBracket}/> 
        </button>
      }       
    </header>
  )
}

export default Header
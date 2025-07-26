import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faCoins, faUser } from '@fortawesome/free-solid-svg-icons';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { Link } from 'react-router';





const UserCard = () => {
    const {user} = useContext(AuthContext);
    

  return (
    <div className="flex flex-row-reverse items-center gap-2 bg-zinc-50 my-1 px-2">
        <div className="flex h-12 w-12 m-2 rounded-full bg-zinc-100 shadow">
            <FontAwesomeIcon className='m-auto text-xl text-zinc-600' icon={faUser}/>
        </div>
        <div>
            <h3 className="font-bold text-zinc-700">
                {user?.name || <Link className='underline text-red-500' to='/signup'>Register</Link>}
            </h3>
            <p className="text-zinc-500 text-sm">
                {user?.email}
            </p>
        </div>
        <div className='ml-auto text-sm font-semibold flex items-center gap-2'>
            <FontAwesomeIcon className='text-yellow-500 text-lg' icon={faCoins}/> <span>{user?.credits ?? 0}</span>
        </div>
    </div>
  )
}

export default UserCard
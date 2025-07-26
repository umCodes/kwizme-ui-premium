import logo from '../../assets/kwizme-logo.png';
import { motion } from 'framer-motion';

const Logo = () => {
  return (
    <motion.div 
      whileHover={{ rotate: 360 }}
      transition={{ duration: 0.5 }}
      className='flex gap-2 items-center'
    >
        <div className='rounded-full bg-white/20 w-fit p-1 m-1 border border-white/30 backdrop-blur-sm'>
            <img
                className='w-10 rounded-full p-1 bg-white/90'
                src={logo} 
                alt="logo"
            />
        </div>
    </motion.div>
  )
}

export default Logo
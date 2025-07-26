import logo from '../../assets/kwizme-logo.png';

const Logo = () => {
  return (
    <div className='flex gap-2 items-center'>
        <div className='rounded-full bg-pink-200 w-fit p-1 m-1 border border-zinc-100'>
            <img
                className='w-10 rounded-full p-1 bg-pink-300'
                src={logo} 
                alt="logo"
            />
        </div>
    </div>
  )
}

export default Logo
import { useContext } from "react"
import { MessageContext } from "../context/MessageContext"

const Message = () => {
    const {message} = useContext(MessageContext); 
  return (
    <div className={`z-1000 flex gap-1 items-center h-10 absolute top-1 right-4`}>
        <p className={`font-semibold text-end transition-all duration-500 ${message?.text ? 'opacity-100' : 'opacity-0'} `}>
            <p className="text-start bg-zinc-50 border border-zinc-400 p-1 rounded-lg">
                {message?.text}
            </p>
        </p>
        <div className={`
        border p-1 ${message ?? 'bg-none' }
         ${message?.status === 'success' && 'bg-green-600'}  
         ${message?.status === 'failure' && 'bg-red-600'}  
         rounded-2xl`}/>

    </div>
  )
}

export default Message
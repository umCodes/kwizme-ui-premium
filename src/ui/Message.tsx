import { useContext } from "react"
import { MessageContext } from "../context/MessageContext"
import { motion, AnimatePresence } from "framer-motion"
import { CheckCircle, XCircle } from "lucide-react"

const Message = () => {
    const {message} = useContext(MessageContext); 
  return (
    <div className="z-[1000] fixed top-4 right-4">
      <AnimatePresence>
        {message && (
          <motion.div
            initial={{ opacity: 0, x: 100, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 100, scale: 0.8 }}
            transition={{ type: "spring", duration: 0.4 }}
            className={`flex items-center gap-3 p-4 rounded-xl shadow-lg backdrop-blur-sm border ${
              message.status === 'success' 
                ? 'bg-green-50/90 border-green-200 text-green-800' 
                : 'bg-red-50/90 border-red-200 text-red-800'
            }`}
          >
            {message.status === 'success' ? (
              <CheckCircle className="w-5 h-5 text-green-600" />
            ) : (
              <XCircle className="w-5 h-5 text-red-600" />
            )}
            <p className="font-medium">{message.text}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Message
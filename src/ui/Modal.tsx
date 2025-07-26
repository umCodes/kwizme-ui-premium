
import { useContext } from "react"
import { MessageContext } from "../context/MessageContext"
import { motion, AnimatePresence } from "framer-motion"



const Modal = () => {
    const {modal, setModal} = useContext(MessageContext)


    return (
        <AnimatePresence>
          {modal && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute top-0 left-0 flex items-center justify-center z-[1000] h-full w-full bg-black/20 backdrop-blur-sm"
            >
              <motion.div 
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ type: "spring", duration: 0.3 }}
                className="bg-white rounded-2xl shadow-2xl min-w-80 max-w-md mx-4 overflow-hidden"
              >
                
                <div className="p-6">
                  <h1 className="text-lg font-semibold text-slate-800 mb-4">{modal?.text}</h1>
                </div>
                
                <div className="bg-slate-50 px-6 py-4 flex justify-end gap-3">
                    <motion.button 
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-4 py-2 bg-slate-200 text-slate-700 rounded-lg font-medium hover:bg-slate-300 transition-colors"
                      onClick={() => setModal(null)}
                    >
                        {modal?.options.cancel}
                    </motion.button>
                    <motion.button 
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-4 py-2 bg-gradient-to-r from-pink-500 to-red-500 text-white rounded-lg font-medium hover:from-pink-600 hover:to-red-600 transition-all"
                      onClick={modal?.options.ok.action}
                    >
                        {modal?.options.ok.text}
                    </motion.button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
    )
}

export default Modal
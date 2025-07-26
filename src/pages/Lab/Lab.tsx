import Form from "./Form"
import useDrag from "./useDrag";
import Heading from "../../layouts/Heading";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoins } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import { Coins } from "lucide-react";

function Lab() {
    const {
        isDragging,
        handleDragEnter,
        handleDragLeave,
        handleDragOver,
        handleDrop
     } = useDrag();
     const {user} = useContext(AuthContext);
    
  return (
    <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className={`h-full grid grid-rows-[auto_1fr] justify-center transition-all duration-300 ${
          isDragging && 'bg-blue-50/50 backdrop-blur-sm'
        }`}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
    >
      <div>
        <Heading text="Generate Your Quiz" />
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="text-center mb-4"
        >
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-100 to-yellow-100 px-4 py-2 rounded-full border border-amber-200">
            <Coins className="w-5 h-5 text-amber-600" />
            <span className="font-semibold text-amber-800">
              {user?.credits || 0} credits
            </span>
          </div>
        </motion.div>
      </div>
        
        <Form />
    </motion.div>
  )
}

export default Lab
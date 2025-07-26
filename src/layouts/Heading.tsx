import { motion } from "framer-motion";

const Heading = ({text}: {text: string}) => {
  return (
    <motion.h1 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="text-3xl p-4 text-center font-bold gradient-text"
    >
      {text}
    </motion.h1>
  )
}

export default Heading
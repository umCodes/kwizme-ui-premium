import { motion } from "framer-motion";

type Props = {
    text: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;
  return (
    <button
    <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`px-6 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-blue-500 to-purple-600 
                   hover:from-blue-600 hover:to-purple-700 shadow-lg hover:shadow-xl 
                   transition-all duration-200 ${className}`}
    >
        {text}
    </button>
    </motion.button>
}

const Button = ({text, className = "", ...rest}: Props) => {
export default Button
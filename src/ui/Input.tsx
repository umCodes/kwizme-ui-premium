import type { JSX} from "react";
import { motion } from "framer-motion";

type Props = {
    label: string;
} & JSX.IntrinsicElements['input'];

const Input = ({label, ...rest}: Props) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="w-80 m-2 flex flex-col gap-2"
    >
      <label className="text-sm text-slate-700 font-semibold">{label}</label>
      <motion.input 
        whileFocus={{ scale: 1.02 }}
        className="border-2 border-slate-200 px-4 py-3 rounded-xl bg-white text-slate-700
           shadow-lg focus:outline-none focus:border-blue-400 focus:shadow-xl
           transition-all duration-200 placeholder-slate-400"
            {...rest}
        />
    </motion.div>
  )
}

export default Input
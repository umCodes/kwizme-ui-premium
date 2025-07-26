import { faChevronDown } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

type DropDownProp<T> = {
    options: T[] | null;
    value: T;
    label?: string;
    setter: (value: T) => void;
     
};



const DropDown = <T,>({label, options, value, setter}: DropDownProp<T>) => {

    const [expand, setExpand] = useState(false);
    const toggleExpand = () => setExpand(!expand);
    
    return (
<motion.div 
  initial={{ opacity: 0, y: 10 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.3 }}
  className="flex flex-col gap-2 relative z-100 m-2"
>
        
    {label && <div className="text-sm text-slate-700 font-semibold">{label}</div>}

    <div className="min-w-40 relative w-fit text-slate-800 cursor-pointer z-10">    

    <motion.div 
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="flex items-center justify-between gap-3 px-4 py-3 border-2 border-slate-200 rounded-xl bg-white text-slate-700
           shadow-lg hover:border-blue-300 hover:shadow-xl transition-all duration-200"
        onClick={toggleExpand}
    >
        
        <p className="capitalize max-w-40 outline-0 cursor-pointer font-medium">{String(value)}</p>

        <motion.div
          animate={{ rotate: expand ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <FontAwesomeIcon className="text-sm text-slate-500" icon={faChevronDown}/>
        </motion.div>
    </motion.div>




    <AnimatePresence>
      {expand && (
        <motion.div 
          initial={{ opacity: 0, y: -10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className='absolute mt-2 rounded-xl bg-white shadow-xl border border-slate-200 flex flex-col overflow-hidden w-full z-50'
          style={{ maxHeight: '280px' }}
        >
          <div className="overflow-y-auto">
            {options && options.map((option, index) => {
                return (
                  <motion.button 
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className={`capitalize cursor-pointer px-4 py-3 text-left transition-all hover:bg-slate-50 ${
                      value && (option === value) 
                        ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white' 
                        : 'text-slate-700'
                    }`}
                    key={String(option)}
                    onClick={(e) => {
                        e.preventDefault()
                        setter(option);
                        toggleExpand();
                    }}
                  >
                    {String(option)}
                  </motion.button>
                )
            })}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
    </div>
</motion.div>
  )
}

export default DropDown
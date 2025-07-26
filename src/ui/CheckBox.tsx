import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef, type ChangeEventHandler } from "react";
import { motion } from "framer-motion";

type Props= {
    onChange: ChangeEventHandler;
    checked: boolean
    name: string; 
    text: string;
    value: string | number | undefined;
    id: string;
}

const CheckBox = ({checked, value, name, onChange, text, id}: Props) => {
    const inputElement = useRef(null)
    return (    
    <motion.div 
        whileHover={{ scale: 1.02 }}
        className="flex items-center m-1 gap-3 select-none p-2 rounded-lg hover:bg-slate-50 transition-colors"
    >
            <input 
                ref={inputElement}
                checked={checked}
                type="checkbox" 
                name={name} 
                value={value} 
                onChange={onChange}
                className="peer sr-only"
                id={id}
            />
            <motion.div 
              whileTap={{ scale: 0.9 }}
              onClick={() => inputElement.current && (inputElement.current as HTMLInputElement)?.click()}
              className={`flex items-center justify-center rounded-lg w-6 h-6 text-center cursor-pointer border-2 transition-all ${
                checked 
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 border-blue-500' 
                  : 'bg-slate-100 border-slate-300 hover:border-slate-400'
              }`}
            >
                {
                    checked &&
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", duration: 0.3 }}
                    >
                      <FontAwesomeIcon className="text-white text-sm" icon={faCheck}/>
                    </motion.div>
                }
            </motion.div>
            <label htmlFor={id} className="text-sm select-none font-medium text-slate-700 cursor-pointer">{text}</label>
    </motion.div>
  )
}

export default CheckBox
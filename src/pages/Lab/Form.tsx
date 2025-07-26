import CheckBox from "../../ui/CheckBox"
import DropDown from "../../ui/DropDown"
import Input from "../../ui/Input"
import useLabForm from "./useLabForm"
import { difficultyLevels } from "../../types/quiz"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faClose, faCoins, faFilePdf, faPaperclip, faPaperPlane, faSpinner } from "@fortawesome/free-solid-svg-icons"
import RadioBtn from "../../ui/RadioBtn"
import { creditsPerPage, creditsPerQuestion } from "../../credits/credits"
import { useEffect, useState } from "react"
import { getPages } from "../../services/file"
import { motion } from "framer-motion"
import { Upload, FileText, Send, Loader2 } from "lucide-react"

const Form = () => {
    const {
        isLoading,
        form,  
        totalCredits,
        setTotalCredits,
        handleSubjectChange, 
        handleNumberChange, 
        handleQTypesChange, 
        handleDifficultyChange,
        fileInputRef,
        handleFileUpload,
        handleFileUploadBtn,
        handleFileType,
        handleFileRemoval, 
        handleSubmit
    } = useLabForm();

    const [pages, setPages] = useState(0);
    const [loadingPages, setLoadingPages] = useState(false);

    
    useEffect(() => {

        const calc = (pages ?? 0) * (creditsPerPage[form.file_type + 'PDF' as 'textPDF' | 'imagePDF'] ?? 0) + Number((form.number * creditsPerQuestion).toFixed(2))

        setTotalCredits(calc);

    }, [pages, form.file_type, form.number, setTotalCredits])

    useEffect(() =>{

        async function fetchPages() {
            console.log(form.file);
            if(!form.file) return setPages(0);
            setLoadingPages(true)
            const pages = await getPages(form.file);
            setPages(pages.pages); 
            setLoadingPages(false)

        }
        
        if(form.file){
            fetchPages()

        }
    }, [form.file])
    
  return (
    <motion.form 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="w-100 my-4"
        onSubmit={handleSubmit}
    >
        <div className="space-y-6">        
            {
                !form.file
                && 
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4 }}
                >                
                    <Input 
                        label="Topic"
                        type="text"
                        placeholder="Computer Architecture"
                        max={60}
                        value={form.subject}
                        onChange={handleSubjectChange}
                    />

                    <motion.button 
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`flex items-center gap-2 text-blue-600 mx-6 px-4 py-2 rounded-lg border-2 border-dashed border-blue-300 hover:border-blue-400 hover:bg-blue-50 transition-all ${form.file && 'hidden'}`}
                        onClick={handleFileUploadBtn}
                    >
                        <Upload className="w-4 h-4" />
                        Upload PDF
                    </motion.button> 
                </motion.div>

            }
                
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: form.file ? 1 : 0, height: form.file ? 'auto' : 0 }}
              transition={{ duration: 0.4 }}
              className={`overflow-hidden ${!form.file && 'hidden'}`}
            >            
            <div className="flex items-center justify-between bg-slate-50 p-4 rounded-xl border border-slate-200">
                <div>                    
                    <Input 
                        className="hidden"
                        ref={fileInputRef}
                        id="fileUploadInput"
                        label="File"
                        type="file"
                        placeholder="Computer Architecture"
                        accept='.pdf'
                        onChange={handleFileUpload}
                    />
                    <div className="text-slate-700 flex items-center gap-3">
                        <FileText className="w-6 h-6 text-red-500" />
                        <span className="font-medium">{form.file?.name}</span>
                    </div>
                </div>
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 text-red-600 px-3 py-2 rounded-lg bg-red-50 hover:bg-red-100 transition-colors"
                    onClick={handleFileRemoval}
                >
                    <FontAwesomeIcon icon={faClose}/>
                    Remove
                </motion.button>

            </div>
            <p className="text-sm text-slate-600 pb-4 pl-4 flex items-center gap-2">
                <span>Pages:</span> 
                {loadingPages ? <Loader2 className="w-4 h-4 animate-spin"/>: <span className="font-semibold">{pages}</span> }
            </p>

            <div className="mx-2 bg-white p-4 rounded-xl border border-slate-200">
                <h3 className="text-slate-700 font-semibold mb-3">PDF Type:</h3>
                <div className="flex items-center gap-4">
                    <div className="flex items-baseline-last">
                        <RadioBtn 
                            id={"text"} 
                            name="pdf-type"
                            text="Text"
                            value={String(form.file_type)}
                            onClick={handleFileType}        
                        />

                        <span className="text-sm word-spacing text-slate-600 bg-amber-50 px-2 py-1 rounded-lg">
                            <FontAwesomeIcon className="text-amber-400" icon={faCoins}/> 
                            <p>{creditsPerPage.textPDF.toFixed(2) }/page</p>
                        </span>
                    </div>
                    <div className="flex items-baseline-last">
                        <RadioBtn 
                            id={"image"} 
                            name="pdf-type"
                            text="Image"
                            value={String(form.file_type)}
                            onClick={handleFileType}        
                        />

                        <span className="text-sm word-spacing text-slate-600 bg-amber-50 px-2 py-1 rounded-lg">
                            <FontAwesomeIcon className="text-amber-400" icon={faCoins}/> 
                            <p>{creditsPerPage.imagePDF.toFixed(2)}/page</p>
                        </span>
                    </div>
                </div>
            </div>
            </motion.div>


                


        </div>

        <div className="flex flex-wrap items-baseline-last bg-white p-4 rounded-xl border border-slate-200">
            <Input 
                label="Questions"
                type="number"
                placeholder="5"
                max={20}
                min={5}
                value={form.number}
                onChange={handleNumberChange}
            />
            <span className="word-spacing text-slate-600 bg-amber-50 px-3 py-2 rounded-lg">
                <FontAwesomeIcon className="text-amber-400" icon={faCoins}/> 
                <p>{(form.number * creditsPerQuestion).toFixed(2)}</p>
            </span>
        </div>
        
        <DropDown
            label="Difficulty"
            options={difficultyLevels}
            setter={handleDifficultyChange}
            value={form.difficulty}
        />

        <div className="flex flex-col gap-3 m-2 bg-white p-4 rounded-xl border border-slate-200">
            <div className="text-sm text-slate-700 font-semibold">Question Types</div>
            <CheckBox 
                text="MCQ"
                value="MCQ"
                id="MCQ"
                name="qTypes"
                checked={form.qTypes.includes('MCQ')}
                onChange={handleQTypesChange}
            />
            <CheckBox 
                text="True / False"
                value="T/F"
                id="T/F"
                name="qTypes"
                checked={form.qTypes.includes('T/F')}
                onChange={handleQTypesChange}
            />
        </div>


        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.4 }}
          className="flex items-center justify-end bg-gradient-to-r from-slate-50 to-blue-50 p-4 rounded-xl border border-slate-200"
        >

            <span className="mx-3 flex items-center gap-2 bg-amber-100 px-4 py-2 rounded-lg border border-amber-200">
                <FontAwesomeIcon className="text-amber-400 mx-1" icon={faCoins}/>
                <span className="font-bold text-amber-800">{totalCredits}</span>
            </span>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isLoading}
            >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Generate
                  </>
                )}
                </> }
                
            </motion.button>
        </motion.div>
    </motion.form>
  )
}

export default Form
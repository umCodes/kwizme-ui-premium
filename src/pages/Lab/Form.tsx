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
    <form 
        className="w-100 my-4"
        onSubmit={handleSubmit}
    >
        <div>        
            {
                !form.file
                && 
                <>                
                    <Input 
                        label="Topic"
                        type="text"
                        placeholder="Computer Architecture"
                        max={60}
                        value={form.subject}
                        onChange={handleSubjectChange}
                    />

                    <button 
                        className={`text-zinc-600 mx-6 ${form.file && 'hidden'}`}
                        onClick={handleFileUploadBtn}
                    >
                        <FontAwesomeIcon icon={faPaperclip}/> Upload PDF
                    </button> 
                </>

            }
                
            <div className={`${!form.file && 'hidden'}`}>            
            <div className="flex items-baseline-last">
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
                    <div className="text-gray-600 p-2 mx-4 flex items-center gap-3">
                        <FontAwesomeIcon size="xl" icon={faFilePdf}/>{form.file?.name}
                    </div>
                </div>
                <button
                    className="flex items-center gap-1 text-red-600 px-2 py-1 rounded-lg"
                    onClick={handleFileRemoval}
                >
                    <FontAwesomeIcon icon={faClose}/>
                    Remove
                </button>

            </div>
            <p className="text-sm text-gray-600 pb-4 pl-4">
                pages: {loadingPages ? <FontAwesomeIcon spin icon={faSpinner}/>: pages }
            </p>

            <div className="mx-2">
                <h3 className="text-zinc-700 text-sm">PDF Type: </h3>
                <div className="flex items-center">
                    <div className="flex items-baseline-last">
                        <RadioBtn 
                            id={"text"} 
                            name="pdf-type"
                            text="Text"
                            value={String(form.file_type)}
                            onClick={handleFileType}        
                        />

                        <span className="text-sm word-spacing text-zinc-700">
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

                        <span className="text-sm word-spacing text-zinc-700">
                            <FontAwesomeIcon className="text-amber-400" icon={faCoins}/> 
                            <p>{creditsPerPage.imagePDF.toFixed(2)}/page</p>
                        </span>
                    </div>
                </div>
            </div>
            </div>


                


        </div>

        <div className="flex flex-wrap items-baseline-last">
            <Input 
                label="Questions"
                type="number"
                placeholder="5"
                max={20}
                min={5}
                value={form.number}
                onChange={handleNumberChange}
            />
            <span className="word-spacing text-zinc-700">
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

        <div className="flex flex-col gap-1 m-2">
            <div className="text-sm text-zinc-600 font-semibold">Question Types</div>
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


        <div className="flex items-center justify-end">

            <span className="mx-3">
                <FontAwesomeIcon className="text-amber-400 mx-1" icon={faCoins}/>
                {totalCredits}
            </span>
            <button 
            className="p-2 bg-pink-500 text-zinc-50 rounded-lg px-4 m-1 "
            disabled={isLoading}>
                {isLoading ? <><FontAwesomeIcon className="animate-spin" icon={faSpinner}/> Generating...</>: <>
                    <FontAwesomeIcon icon={faPaperPlane}/> Generate
                </> }
                
            </button>
        </div>
    </form>
  )
}

export default Form
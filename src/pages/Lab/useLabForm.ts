import { useContext, useRef, useState, type ChangeEvent, type FormEvent, type MouseEvent } from "react"
import { difficultyLevels, quizTypes, type DifficultyLevels, type QuizTypes } from '../../types/quiz.ts';
import { LabContext } from "../../context/LabContext";
import { createQuiz } from "../../services/quiz.ts";
import { useNavigate } from "react-router";
import { AuthContext } from "../../context/AuthContext.ts";
import { MessageContext } from "../../context/MessageContext.ts";

const useLabForm = () => {
    const {form, setForm, isLoading, setIsLoading} = useContext(LabContext);
    const {sendMessage} = useContext(MessageContext);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const {user} = useContext(AuthContext); //Change later
    const navigateTo = useNavigate();    
    const [totalCredits, setTotalCredits] = useState(0);


    function handleSubjectChange(e: ChangeEvent<HTMLInputElement>){
      setForm({...form, subject: e.target.value})
    }

    function handleNumberChange(e: ChangeEvent<HTMLInputElement>){

      setForm({...form, number: Math.round(Number(e.target.value))})
    }

    function handleDifficultyChange(difficulty: DifficultyLevels){

      if(difficultyLevels.includes(difficulty))
        setForm({...form, difficulty
          })
    }

    function handleQTypesChange(e: ChangeEvent<HTMLInputElement>){

      const type = e.target.value as QuizTypes;
      
      if(!form.qTypes.includes(type) && quizTypes.includes(type))
        setForm({...form, qTypes: [...form.qTypes, type]
          })
      else if(form.qTypes.length > 1) setForm({...form, qTypes: [...form.qTypes.filter(t => t !== type)]
        })
    }

        
    function handleFileUpload(e: ChangeEvent<HTMLInputElement>){

        const selectedFile = e.target.files?.[0] ?? null;
            setForm({
              ...form, file: selectedFile,
              file_type: 'text'
            })
      }

      
      const handleFileType = (e: ChangeEvent<HTMLInputElement>) => {
             setForm({
              ...form,
              file_type: (e.target as HTMLElement).id as "text" |"image"
             })
        }


      
    function handleFileUploadBtn(e: MouseEvent<HTMLButtonElement>){
        e.preventDefault()
        fileInputRef.current?.click()
    }


    
    function handleFileRemoval(e: MouseEvent<HTMLButtonElement>){
        e.preventDefault();
        setForm({
              ...form, 
              file: null, 
              file_type: 'prompt'
            })
        if(fileInputRef.current)
            fileInputRef.current.value = "";
    }


    async function handleSubmit(e: FormEvent){
        e.preventDefault();
        if(!user){
          navigateTo('/signup')
          return;
        }

        if(!form.subject && !form.file){
           return sendMessage('please provide a file or a prompt.', 'failure')
        }

        if(user.credits <  totalCredits){
           return sendMessage('Insufficient Credits.', 'failure')
          
        }
        
        setIsLoading(true);
        


        //if user not logged in reroute to signup page         
        const {file, ...body} = form; 
        const content = new FormData();
        content.append('body', JSON.stringify(body))
        content.append('file', file ?? '')
        
        try {
            const quiz = await createQuiz(content);
            setIsLoading(false)
            sendMessage('Quiz Generated!', 'success')
            navigateTo(`/${quiz.id}`)
            console.log(quiz);
        } catch (error) {
            sendMessage('A problem occured generating your quiz, please try again', 'failure')
            setIsLoading(false)
            console.error(error)
        }          
    }
               

  return {
    isLoading, 
    setIsLoading,
    fileInputRef,
    form,
    setForm,
    totalCredits,
    setTotalCredits,
    handleDifficultyChange,
    handleSubjectChange,
    handleNumberChange,
    handleQTypesChange,
    handleFileUpload,
    handleFileType,
    handleFileUploadBtn,
    handleFileRemoval,
    handleSubmit
  }
}

export default useLabForm
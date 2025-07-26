import { useContext, useState, type ChangeEvent } from "react"
import { difficultyLevels, type DifficultyLevels, type Quizes, type QuizTypes, type Sorts } from "../../types/quiz";
import { deleteQuiz } from "../../services/quiz";
import { QuizesContext } from "../../context/QuizesContext";
import { MessageContext } from "../../context/MessageContext";


export const sorts = {
    'default': (a: Quizes, b:Quizes) => a.credits * b.credits * 0,
    'credits': (a: Quizes, b: Quizes) => b.credits - a.credits,
    'topic': (a: Quizes, b: Quizes) => a.topic.localeCompare(b.topic),
    'questions': (a: Quizes, b:Quizes) => b.question.length - a.question.length,
    'difficulty': (a: Quizes, b:Quizes) => { 
        return difficultyLevels.indexOf(b.difficulty.toLowerCase() as DifficultyLevels) - difficultyLevels.indexOf(a.difficulty.toLowerCase()as DifficultyLevels)
    },


}


export const levelColors = {
  basic: "text-green-500",
  regular: "text-blue-500",
  intermediate: "text-yellow-600",
  advanced: "text-orange-600",
  expert: "text-red-600",
};

const useQuizHistory = () => {
    const {sendModal} = useContext(MessageContext) 
    const {quizes, isLoading, setIsLoading, setPage, page, quizesLength: fullLength} = useContext(QuizesContext)
    const [isDeleting, setIsDeleting] = useState(false);
    const {sendMessage} = useContext(MessageContext)

    const [sortedBy, setSortedBy] = useState<Sorts>('default');
    const [order, setOrder] = useState<1 | -1>(1);
    const [qTypes, setQTypes] = useState<QuizTypes[]>([]);


    function handleQTypes(e: ChangeEvent<HTMLInputElement>){
        const value  = e.target.value as QuizTypes;

        console.log(e.target.checked);
        
        if(qTypes.includes(value)){
            console.log(qTypes);
            
            setQTypes([...qTypes.filter(quiz => quiz !== value)])
        }
        else setQTypes([...qTypes, value])
    }

    async function handleDelete(id: string){
        sendModal('Delete Quiz?', 'Cancel', 'Delete', async ()=>{
                setIsDeleting(true);

            try {
                await deleteQuiz(id);  
                setIsDeleting(false);
                sendMessage(
                    '✅ Delete successfull!',
                    'success'
                )
                setIsLoading(true);
            } catch (error) {
                console.error(error);
                setIsDeleting(false);            
            }
        })

    }

    function nextPage(){
        if(quizes && fullLength > (page * 10) + quizes.length) setPage(prev => prev + 1)
    }
    function prevPage(){
        if(quizes && quizes.length > 0) setPage(prev => Math.max(prev - 1, 0))
    }



    return {
        isLoading,
        handleDelete,
        quizes,
        sortedBy,
        setSortedBy,
        setOrder,
        order,
        qTypes,
        handleQTypes,
        isDeleting,
        nextPage,
        prevPage,
        fullLength,
        page
    }
}

export default useQuizHistory
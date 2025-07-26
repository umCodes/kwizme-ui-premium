import { useEffect, useState } from "react"
import { useParams } from "react-router"
import type { MCQ, Quizes, TF } from "../../types/quiz";
import type { Choice } from "./Option";
import { getQuiz } from "../../services/quiz";

const useQuiz = () => {
    const {id} = useParams();
    const [points, setPoints] = useState(0);
    const [quiz, setQuiz] = useState<Quizes | null>(null);
    const [question, setQuestion] = useState<MCQ | TF | null>(null)
    const [answered, setAnswered] = useState<number[]>([])
    const [index, setIndex] = useState(0)
    const [opted, setOpted] = useState(false);


    function handleNext(){
        
        if(!quiz)return;

        if(index === quiz.question.length - 1){
            setAnswered([])
            setPoints(0)
            setIndex(0);
            return
        }

        setIndex(prev => prev + 1 < quiz.question.length ? prev + 1 : prev);
        setOpted(false);

    }

    function handleBack(){
        setIndex(prev => prev > 0 ? prev - 1 : prev)
        setOpted(false);                    
    }
    
    function handleOpted(opt: Choice){
        setOpted(prev => !prev)
        setAnswered(prev => [...prev, index])
        if(!answered.includes(index) && opt.correct) {
            setPoints(prev => prev + 1)                                }
    }

    useEffect(() =>{
        if(quiz) setQuestion(quiz.question[index])
    }, [index, quiz])

    useEffect(() =>{
        async function handleQuiz(){
            if(!id) return;
            
            try {
                const response = await getQuiz(id);
                setQuiz(response)
                return;
            } catch (error) {
                console.error(error);
                return;
            }
        }
        handleQuiz();
    },[id]);

    return {
        quiz,
        points,
        question,
        index,
        setIndex,
        opted, 
        setOpted,
        setPoints,
        answered, 
        setAnswered,
        handleNext,
        handleBack,
        handleOpted
    }

}

export default useQuiz
import { faArrowLeft, faArrowRight, faRotate } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router";
import useQuiz from "./useQuiz";
import { levelColors } from "../QuizHistory/useQuizHistory";
import type { DifficultyLevels } from "../../types/quiz";
import Option from "./Option";



const Quiz = () => {
    const {quiz, question, index, opted, points, handleNext, handleBack, handleOpted} = useQuiz();

    
    if(!quiz || !question)return;

    

    return (

    <div className="h-full flex flex-col max-w-[480px] mx-auto">
        <header className="flex items-center my-6">
            <Link to='/quizHistory' className="p-2 text-2xl text-pink-600 cursor-pointer">
                <FontAwesomeIcon icon={faArrowLeft}/>
            </Link>
                
            <h1 className="text-gray-800 font-semibold px-4">
                <span className="text-gray-400">Quiz / </span>{quiz.topic}
            </h1>

            <span className={`${levelColors[quiz.difficulty.toLowerCase() as DifficultyLevels]} bg-gray-50 rounded px-2 py-0.5 shadow`}>{quiz.difficulty}</span>

        </header>

               

        <div className="h-[70%] w-full p-2  mx-auto my-auto flex flex-col justify-center">
            <div className="flex items-center justify-between py-2">
                <div className="text-lg font-bold my-2">
                    Question {index + 1} of {quiz.question.length}
                </div>
                
                <div className="text-sm text-zinc-400 font-semibold">
                    Score: {points} / {quiz.question.length}
                </div>
            </div>
            <h3 className="px-1">{question.question}
            </h3>

            
            <div className="mx-4 my-auto">
                {question.options.map(opt =>{
                      const style = {
                        regular: "border-2 border-gray-200",
                        opted: opt.correct ? "border-3 border-green-200" : "border-3 border-red-200"
                    }
                    
                return <Option 
                            onClick={() => handleOpted(opt)}
                            style={opted ? style.opted : style.regular}        
                            choice={opt}
                        />
                    
                })}

            </div>

            <div className={`${(!opted || !question.explanation) && "hidden"}`}>
                <span className="font-bold mx-1">Explanation: </span>
                {question.explanation}
            </div>

            <div className="flex items-center justify-between px-1 py-2">
                <button 
                onClick={handleBack}
                className="py-2 px-3 m-2 flex items-center gap-2 bg-white text-gray-600 rounded-md shadow cursor-pointer hover:bg-zinc-200">
                    <FontAwesomeIcon icon={faArrowLeft}/>
                    Back
                </button>

                <button 
                onClick={handleNext}
                className="py-2 px-3 flex items-center gap-2 bg-green-600 text-zinc-50 rounded-md shadow cursor-pointer hover:bg-green-700">
                    {
                    index + 1 < quiz.question.length ?
                    <>
                    Next
                    <FontAwesomeIcon icon={faArrowRight}/>
                    </>
                    :
                    <>
                    <FontAwesomeIcon icon={faRotate}/>
                        Retry
                    </>
                    }
                </button>
            </div>
        </div>
    </div>
  )
}

export default Quiz;
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import type { DifficultyLevels, Quizes } from "../../types/quiz"
import { faChevronDown, faCoins, faPlay, faSpinner, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router";
import { levelColors } from "./useQuizHistory";
import { type Dispatch, type SetStateAction } from "react";



const Quiz = ({quiz, expand, setExpand, isDeleting, handleDelete}: {quiz: Quizes, expand: string, setExpand: Dispatch<SetStateAction<string>>, isDeleting: boolean, handleDelete: (id: string) => void}) => {


  return (
    <div
    onClick={() => setExpand(prev => prev === quiz._id ? '' : quiz._id)}    
    className={`m-1 cursor-pointer border border-gray-300 px-4 py-2 rounded-xl bg-gray-50 text-gray-700
           
           hover:shadow-[2px_2px_4px_rgba(255,255,255,0.8),-1px_-1px_2px_rgba(0,0,0,0.2)] w-[100%] ${expand === quiz._id ? 'shadow-[2px_2px_4px_rgba(255,255,255,0.8),-1px_-1px_2px_rgba(0,0,0,0.2)]' : 'shadow-[inset_2px_2px_4px_rgba(255,255,255,0.8),inset_-1px_-1px_2px_rgba(0,0,0,0.05)]'}`}>


        <div className="flex items-center min-md:rounded-lg font-semibold text-lg truncate px-4 py-0.5
        ">        
            <h2 className="truncate">
                {quiz.topic}
            </h2>
            <button className="ml-auto">
                <FontAwesomeIcon className={`transition-all ${expand === quiz._id && 'rotate-180'}`} icon={faChevronDown}/>
            </button>
        </div>

        <div className={`flex flex-col gap-2 text-sm max-md:bg-zinc-50 max-md:rounded-lg text-zinc-500 h-0 overflow-hidden transition-all  px-4 ${expand === quiz._id && 'h-16'}`}>
            <div className="flex flex-col ">                
                <div className="flex items-center gap-2 mt-2">
                    <p  className={`capitalize ${levelColors[(quiz.difficulty).toLowerCase() as DifficultyLevels]}`}>
                        {quiz.difficulty}  
                    </p>

                    <p>
                        {quiz.question.length} questions  
                    </p>
                                
                    <p className="font-semibold">
                        ({quiz.question_types.join(', ')})
                    </p>

                </div>
            <div className="flex items-center gap-2">
                            
            <span className="flex items-center gap-1">
                <p  className="font-semibold">from:</p>
                {quiz.generated_from}
            </span>
            <span className="flex items-center gap-1">
                <p  className="font-semibold">
                <FontAwesomeIcon className="text-amber-400" icon={faCoins}/> credits: 
                </p>{quiz.credits}
            </span>  

            <button onClick={() => handleDelete(quiz._id)} className="text-red-600 cursor-pointer word-spacing  bg-zinc-200 m-1 px-2 py-1 rounded-md border-2 border-zinc-300 hover:border-red-500 ml-auto">
                {
                    isDeleting 
                    ?                 
                    <FontAwesomeIcon className="animate-spin" icon={faSpinner}/>
                    :
                    <FontAwesomeIcon icon={faTrash}/>
                }
                Delete
            </button>

                <Link to={'/quiz/' + quiz._id}
                className=" text-green-600 p-1 cursor-pointer font-semibold word-spacing bg-zinc-200 m-1 px-2 py-1 rounded-md border-2 border-zinc-300 hover:border-green-500">
                    <FontAwesomeIcon icon={faPlay}/>
                    Start
                </Link>
            </div>
            </div>
        </div>
    </div>
  )
}

export default Quiz



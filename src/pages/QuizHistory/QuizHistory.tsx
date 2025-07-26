import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Quiz from "./Quiz";
import useQuizHistory, { sorts } from "./useQuizHistory"
import { faCaretLeft, faCaretRight, faSortAmountDown, faSortAmountUp, faSpinner } from "@fortawesome/free-solid-svg-icons";
import DropDown from "../../ui/DropDown";
import CheckBox from "../../ui/CheckBox";
import Heading from "../../layouts/Heading";
import { useState } from "react";


const QuizHistory = () => {
    const {quizes, isLoading, isDeleting, sortedBy, setSortedBy, setOrder, order, qTypes, handleQTypes, handleDelete, page, fullLength, prevPage, nextPage} = useQuizHistory();
    const [expand, setExpand] = useState('');

  return (
    <div className="h-full flex flex-col no-scroll">
        <div className="relative z-100 h-[20%]">
            
        <Heading text="Quiz History" />

        <div className="flex items-center text-end gap-4">
            
            <div className="w-fit flex items-center px-4 gap-2">
                <DropDown 
                    options={['default', 'topic', 'credits', 'questions', 'difficulty']}
                    value={sortedBy}
                    setter={setSortedBy}
                />
                <button className="cursor-pointer" onClick={() => setOrder((prev)=> -prev as  1 | -1 )}>
                        {order === 1 ? <FontAwesomeIcon icon={faSortAmountDown}/> : <FontAwesomeIcon icon={faSortAmountUp}/>}
                </button>

            </div>

            <div className="flex min-md:items-center max-md:flex-col max-md:my-2">

                <CheckBox
                    text="MCQ"
                    value="MCQ"
                    id="MCQ"
                    name="question-types"
                    checked={qTypes.includes("MCQ")}
                    onChange={handleQTypes}       
                />
                <CheckBox
                    text="True or False"
                    value="T/F"
                    id="T/F"
                    name="question-types"
                    checked={qTypes.includes("T/F")}
                    onChange={handleQTypes}       

                />
            </div>

        </div>

        <div className="flex items-center justify-between px-2 text-gray-600">
            <span className="flex gap-2">
                <button className="bg-gray-600 text-white text-sm px-2 rounded-md" onClick={prevPage}>
                    <FontAwesomeIcon icon={faCaretLeft}/>
                </button>
                <button className="bg-gray-600 text-white text-sm px-2 rounded-md" onClick={nextPage}>
                    <FontAwesomeIcon icon={faCaretRight}/>
                </button>
            </span>

            <span>
                page {page + 1} of {(fullLength > 10 ?  Math.floor(fullLength / 10): 0) + 1} 
            </span>
        </div>

        </div>
        <div className="flex flex-col  px-3 mb-2 h-[75%] overflow-x-hidden overflow-y-scroll no-scroll mx-auto w-[100%]">
            {
                quizes 
                ? 
                    sortedBy === 'default'
                    ?quizes.map(quiz =>{ 

                        if(qTypes.every(type => quiz.question_types.includes(type)) || !qTypes.length)
                        return(<Quiz
                            expand={expand}
                            setExpand={setExpand} 
                            isDeleting={isDeleting} 
                            handleDelete={handleDelete}
                            key={quiz._id} quiz={quiz}/>)})              
                    :
                    [...quizes].sort((a,b) => order * sorts[sortedBy](a, b)).map(quiz =>{ 
                        
                        if(qTypes.every(type => quiz.question_types.includes(type)) || !qTypes.length)    
                        return(
                        <Quiz 
                        
                        expand={expand}
                        setExpand={setExpand}
                        isDeleting={isDeleting} 
                        handleDelete={handleDelete}
                        key={quiz._id} quiz={quiz}/>)
                    })           
                : 
                <div className="my-auto text-center">
                    {
                    isLoading ? <div>
                    <FontAwesomeIcon className="animate-spin"  icon={faSpinner}/>
                </div>
                : <p className="font-bold text-gray-500 text-lg text-center">
                    Could not find quiz history
                 </p>
                    }
                </div>                

            }
        </div>
    </div>
  )
}

export default QuizHistory
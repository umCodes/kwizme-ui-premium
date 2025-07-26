import Form from "./Form"
import useDrag from "./useDrag";
import Heading from "../../layouts/Heading";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoins } from "@fortawesome/free-solid-svg-icons";

function Lab() {
    const {
        isDragging,
        handleDragEnter,
        handleDragLeave,
        handleDragOver,
        handleDrop
     } = useDrag();
     const {user} = useContext(AuthContext);
    
  return (
    <div
        className={`h-full grid grid-rows-[auto_1fr] justify-center ${isDragging && 'bg-zinc-200'}`}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
    >
      <div>
        <Heading text="Generate Your Quiz" />
      <p className="border-zinc-300 text-center text-gray-500">
        credits: <FontAwesomeIcon className="text-sm text-amber-400 mx-0.5" icon={faCoins}/> {user?.credits}
      </p>
      </div>
        
        <Form />
    </div>
  )
}

export default Lab
import { useState, type ReactNode } from "react";
import AsideContext from "../context/AsideContext"



const AsideProvider = ({children}: {children: ReactNode}) => {
    const [expand, setExpand] = useState(false);

    return (
    <AsideContext.Provider value={{expand, setExpand}} >
        {children}
    </AsideContext.Provider>
  )
}

export default AsideProvider
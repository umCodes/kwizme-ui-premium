import { createContext, type Dispatch, type SetStateAction } from "react";

interface AsideContextType {
    expand: boolean;
    setExpand: Dispatch<SetStateAction<boolean>>;
}

const AsideContext = createContext<AsideContextType>({
    expand: false,
    setExpand: () => {}
});


export default AsideContext;

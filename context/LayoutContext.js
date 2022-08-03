import {useState, createContext} from "react";

export const LayoutContext = createContext();

export const LayoutProvider = ({children})=>{

    const [focusMode, setFocusMode] = useState(false);

    return(
        <>
        <LayoutContext.Provider value={{focusMode, setFocusMode}}>
            {children}
        </LayoutContext.Provider>
        
        </>
    )


}
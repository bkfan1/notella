import {useContext} from "react";
import { NotesContext } from "../context/NotesContext";
import axios from "axios";

export default function MainActionsMenu(){
    const {userNotes, userTrashedNotes, addNewNote, viewTrashedNotes, setViewTrashedNotes} = useContext(NotesContext);
    
    return(
        <>
        <menu className="mainActionsMenu flex gap-4 items-center w-64 h-12 px-4">
            <button onClick={addNewNote} className="text-gray-800">
                <i className="bi bi-journal-plus text-2xl"/>
            </button>

            <button onClick={()=>setViewTrashedNotes(!viewTrashedNotes)} className="text-gray-800" title={"Trashed notes"}>
                <i className={`bi bi-trash3${userTrashedNotes.length > 0 ? "-fill" : ""} text-2xl`}/>
            </button>

            <button className="text-gray-800">
                <i className="bi bi-gear text-2xl"/>
            </button>
            
        </menu>
        </>
    )
}
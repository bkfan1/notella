import {useContext} from "react";
import { NotesContext } from "../context/NotesContext"


export default function NoteInRecipient({id, title}){
    const {handleClickNoteInRecipient} = useContext(NotesContext);

    return(
        <>
        <figure onClick={()=>handleClickNoteInRecipient(id)} className="noteInRecipient flex flex-col p-2 ease-in-out duration-100 hover:bg-gray-300">
            <h1 className="font-bold">{title ? title : "Title"}</h1>
            <p className="text-sm text-gray-500">Click edit or preview...</p>
        </figure>
        </>
    )
}
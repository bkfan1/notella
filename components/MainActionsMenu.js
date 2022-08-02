import {useContext} from "react";
import { NotesContext } from "../context/NotesContext";
import axios from "axios";

export default function MainActionsMenu(){
    const {userNotes, userTrashedNotes, addNewNote, viewTrashedNotes, setViewTrashedNotes} = useContext(NotesContext);
    const updateNotes = async()=>{
        const data = {notes: userNotes, trashedNotes: userTrashedNotes};
        const res = await axios.post('/api/notes', data);
        res.status === 200 ? console.log("notas actualizadas con exito") : console.warn("no se pudo actualizar notas de usuario")

    }
    return(
        <>
        <menu className="mainActionsMenu flex gap-4 items-center w-64 h-12 px-4">
            <button onClick={addNewNote} className="text-gray-800">
                <i className="bi bi-journal-plus text-2xl"/>
            </button>

            <button onClick={()=>setViewTrashedNotes(!viewTrashedNotes)} className="text-gray-800">
                <i className="bi bi-trash text-2xl"/>
            </button>

            <button className="text-gray-800">
                <i className="bi bi-gear text-2xl"/>
            </button>

            <button onClick={updateNotes} className="text-gray-800">
                <i className="bi bi-check text-2xl"/>
            </button>
            

        </menu>
        </>
    )
}
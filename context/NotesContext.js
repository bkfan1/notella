import { nanoid } from "nanoid";
import {createContext, useEffect, useContext, useState} from "react";
import { LayoutContext } from "./LayoutContext";
import axios from "axios";

export const NotesContext = createContext();


export const NotesProvider = ({children, notes, trashedNotes})=>{

    const {focusMode,setFocusMode} = useContext(LayoutContext);

    const [userNotes, setUserNotes] = useState(notes);
    const [userTrashedNotes, setUserTrashedNotes] = useState(trashedNotes);

    const [currentEditingNote, setCurrentEditingNote] = useState(null);

    const [viewTrashedNotes, setViewTrashedNotes] = useState(false);

    useEffect(()=>{

        const updateNotes = async ()=>{
            const data = {notes: userNotes, trashedNotes: userTrashedNotes}
            const res = await axios.post('/api/notes',data);

            res.status === 200 ? console.log("notas actualizadas exitosamente") : console.log("ha ocurrido un error al intentar actualizar las notas")
        }

        const timer = setTimeout(()=>{
            updateNotes();
        }, 8000);


        return ()=> clearInterval(timer);




    }, [userNotes, userTrashedNotes])

    useEffect(()=>{

        setCurrentEditingNote(null);


    }, [viewTrashedNotes])

    useEffect(()=>{
        if(userTrashedNotes.length === 0){
            setViewTrashedNotes(false);
        }

    }, [userTrashedNotes])

    const addNewNote = ()=>{
        if(viewTrashedNotes){setViewTrashedNotes(false);}

        const newNote = {
            id: nanoid(),
            title: 'Untitled note',
            body: "Content goes here"
        }

        setUserNotes([...userNotes, newNote]);
    }

    const deleteNote = (id)=>{

        const index = userNotes.findIndex((note)=>note.id === id);
        const newUserNotes = [...userNotes];
        newUserNotes.splice(index, 1);

        setUserNotes(newUserNotes);

    }

    const handleClickNoteInRecipient = (id)=>{
        let clickedNote;

        if(viewTrashedNotes){
            clickedNote = userTrashedNotes.find((note)=>note.id === id);
            setCurrentEditingNote(clickedNote);
            return;
        }
        clickedNote = userNotes.find((note)=>note.id === id);
        setCurrentEditingNote(clickedNote);
        return;
    }

    const handleOnChangeCurrentEditingNote = (e, id)=>{
        const {target} = e;
        const {name, value} = target;
        //console.log(id);

        const index = userNotes.findIndex((note)=>note.id === id);
        let copiedNote = Object.assign({}, userNotes[index]);
        copiedNote[name] = value;

        const copiedNotes = [...userNotes];
        copiedNotes.splice(index, 1, copiedNote);

        setCurrentEditingNote(copiedNote);
        setUserNotes(copiedNotes);

    }

    const handleDeleteCurrentEditingNote = ()=>{

        const copiedCurrentEditingNote = {...currentEditingNote};
        setCurrentEditingNote(null);

        if(focusMode){setFocusMode(false);}

        const index = userNotes.findIndex((note)=>note.id === copiedCurrentEditingNote.id);
        console.log(index);

        const updatedUserNotes = [...userNotes];
        const [removed] = updatedUserNotes.splice(index, 1);

        const newTrashedNotes = [...userTrashedNotes]
        newTrashedNotes.push(removed);

        setUserNotes(updatedUserNotes);
        setUserTrashedNotes(newTrashedNotes);
    }

    const handleRemoveNoteFromTrash = (id)=>{

        setCurrentEditingNote(null);
        const index = userTrashedNotes.findIndex((note)=>note.id === id);

        const newTrashedNotes = [...userTrashedNotes];
        const [removed] = newTrashedNotes.splice(index, 1);

        setUserTrashedNotes(newTrashedNotes);
        setUserNotes([...userNotes, removed]);
    }

    const handleDeleteNoteFromTrash = ()=>{
        const copiedCurrentEditingNote = {...currentEditingNote};
        setCurrentEditingNote(null);
        const index = userTrashedNotes.findIndex((note)=>note.id === copiedCurrentEditingNote.id);
        const updatedTrashedNotes = [...userTrashedNotes];
        updatedTrashedNotes.splice(index, 1);
        setUserTrashedNotes(updatedTrashedNotes);
    }


    return(
        <>
        <NotesContext.Provider value={{userNotes, userTrashedNotes, addNewNote, deleteNote, viewTrashedNotes, setViewTrashedNotes, handleClickNoteInRecipient, currentEditingNote, handleOnChangeCurrentEditingNote, handleDeleteCurrentEditingNote, handleRemoveNoteFromTrash, handleDeleteNoteFromTrash}}>
            {children}
        </NotesContext.Provider>
        </>
    )

}
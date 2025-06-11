import { createContext, useEffect, useState } from 'react'
import { childrenProps, note, notesContext } from '../types'
import axios from 'axios'


const defaultValue: notesContext ={
    setToken: () => null,
    notes: null,
    deleteNotes: () => null,
    addNote: () => null,
    updateNote: ()=> null
}

export const notescontext = createContext<notesContext>(defaultValue)
export default function NotesContextProvider({ children }: childrenProps) {
    const [token, setToken] = useState<string | null>(null)
    const [notes,setNotes] = useState<note[] | null | undefined >(null)
    function getNotes() {
        axios.get('https://note-sigma-black.vercel.app/api/v1/notes', {
            headers: {
                token:`3b8ny__${localStorage.getItem('tkn')}`
            }
        }).then(data => {
            setNotes(data.data.notes)
        }).catch(err=>{
            console.log(err)
            setNotes(undefined)
        })
    }
    async function deleteNotes(noteId : string) {
      await  axios.delete(`https://note-sigma-black.vercel.app/api/v1/notes/${noteId}`, {
            headers:{token:`3b8ny__${localStorage.getItem('tkn')}`}
      }).then(_ => {
            getNotes()
      }).catch(err =>{
          console.log(err)
        })
    }
    async function addNote(data: note) {
        await axios.post('https://note-sigma-black.vercel.app/api/v1/notes', data, {
            headers: {
                token:`3b8ny__${localStorage.getItem('tkn')}`
            }
        }).then(_ => {
            getNotes()
        }).catch(_ => {
            
        })
    }
    async function updateNote(notedId: string,data: note) {
        axios.put(`https://note-sigma-black.vercel.app/api/v1/notes/${notedId}`, data, {
            headers:{token:`3b8ny__${localStorage.getItem('tkn')}`}
        }).then(_ => {
            getNotes()
        }).catch(err => {
            console.log(err)
        })
    }
    useEffect(() => {
        if(localStorage.getItem('tkn'))
        getNotes()
    },[token])
  return (
      <notescontext.Provider value={{
          setToken,
          notes,
          deleteNotes,
          addNote,
          updateNote
    }}>
            {children}
    </notescontext.Provider>
  )
}

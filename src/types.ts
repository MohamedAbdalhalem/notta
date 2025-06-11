import React, { SetStateAction } from "react"

export type signUp = {
    "name":string,
    "email":string,
    "password":string,
    "age":number,
    "phone":string
}
export type signIn = {
    email:string,
    password:string
}
export type childrenProps = {
    children: React.ReactNode
}
export type notesContext = {
    setToken: React.Dispatch<SetStateAction<string | null>>,
    notes: note[] | null | undefined,
    deleteNotes: (noteId: string) => void,
    addNote: (data: note) => void,
    updateNote: (notedId: string,data: note)=> void
}
export type note = {
    title: string,
    content: string,
    _id:string
}
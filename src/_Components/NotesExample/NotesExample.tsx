import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../lib/redux/store'
import { getNotes, createNote, clearError } from '../../lib/redux/notesSlice'

const NotesExample: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>()
    const { notes, isLoading, isError } = useSelector((state: RootState) => state.notesSlice)
    const { Token } = useSelector((state: RootState) => state.authSlice)

    useEffect(() => {
        if (Token) {
            dispatch(getNotes())
        }
    }, [dispatch, Token])

    const handleCreateNote = async () => {
        const noteData = {
            title: 'Test Note',
            content: 'This is a test note created with authentication'
        }

        try {
            await dispatch(createNote(noteData)).unwrap()
            // Refresh notes after creating
            dispatch(getNotes())
        } catch (error) {
            console.error('Failed to create note:', error)
        }
    }

    const handleClearError = () => {
        dispatch(clearError())
    }

    if (!Token) {
        return <div>Please log in to view notes</div>
    }

    if (isLoading) {
        return <div>Loading notes...</div>
    }

    if (isError) {
        return (
            <div>
                <p>Error loading notes</p>
                <button onClick={handleClearError}>Clear Error</button>
            </div>
        )
    }

    return (
        <div>
            <h2>Notes</h2>
            <button onClick={handleCreateNote}>Create Test Note</button>

            {notes && notes.length > 0 ? (
                <div>
                    {notes.map((note, index) => (
                        <div key={index} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
                            <h3>{note.title}</h3>
                            <p>{note.content}</p>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No notes found</p>
            )}
        </div>
    )
}

export default NotesExample

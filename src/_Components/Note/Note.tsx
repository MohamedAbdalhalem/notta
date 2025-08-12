import { Button, Paper, Stack, TextareaAutosize, TextField } from '@mui/material';
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SendIcon from '@mui/icons-material/Send';
import React, { useRef, useState } from 'react'
type note = {
  title: string;
  content: string
  _id:string
};

export default function Note(
    { noteData, handleDelete, handleUpdate }
        : {
            noteData: note
            , handleDelete: (id: string) => void,
            handleUpdate: (id :string,newTitle : string | undefined, newContent : string | undefined) => void
        }) {
  const titleRef = useRef<HTMLTextAreaElement>(null)
  const contentRef = useRef<HTMLTextAreaElement>(null)
  const [switchButton, setSwithButton] = useState(false) 
  function handleSwitch() {
        setSwithButton(true)
    }
  return (
    <Paper
          key={noteData._id}
          elevation={2}
          sx={{ p: 1.5, borderRadius: 2 }}
          
        >
          <Stack
            sx={{display : 'flex', alignItems:'center', flexDirection:'row',justifyContent:'space-between',flexWrap:'wrap',gap:'10px'}}
          >
              <TextareaAutosize
                  defaultValue={noteData.title} 
                  ref={titleRef}
                  disabled={switchButton ? false : true}
      aria-label="empty textarea"
      placeholder="add title"
                  style={{  marginBottom: '10px', outline: '1px solid black', padding: '10px' }}
                  className="w-full md:w-[14%] text-wrap"
    />
            <TextareaAutosize
                  defaultValue={noteData.content} 
                  ref={contentRef}
                  disabled={switchButton ? false : true}
      aria-label="empty textarea"
      placeholder="add title"
                  style={{  marginBottom: '10px', outline: '1px solid black', padding: '10px' }}
                  className="w-full md:w-[60%] text-wrap"
    />
           
            {switchButton ? <Button
              variant="contained"
              size="small"
              color="primary"
              endIcon={<SendIcon />}
              onClick={() => handleUpdate(noteData._id,titleRef.current?.value,contentRef.current?.value)}
              className="w-[48%] md:w-[11%]"
            >
              Save
            </Button> : <Button
              variant="contained"
              size="small"
              color="primary"
              startIcon={<EditIcon />}
              onClick={ handleSwitch }
              className="w-[48%] md:w-[11%]"
            >
              Update
            </Button>}
            
            
            <Button
              variant="outlined"
              size="small"
              color="error"
              startIcon={<DeleteIcon />}
              onClick={() => handleDelete(noteData._id)}
              className="w-[48%] md:w-[11%]"
            >
              Delete
            </Button>
          </Stack>
        </Paper>
  )
}

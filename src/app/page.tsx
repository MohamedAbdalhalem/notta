'use client';
import { RootState } from "_/lib/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "_/lib/redux/store";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { getNotes } from "_/lib/redux/notesSlice";
import {  Box, Button, Modal, Stack, TextareaAutosize, TextField, Typography} from "@mui/material";
import LoadingScreen from "_/_Components/LoadingScreen/LoadingScreen";
import NoDataFound from "_/_Components/NoDataFound/NoDataFound";
import AddIcon from '@mui/icons-material/Add';
import axios from "axios";
import Note from "_/_Components/Note/Note";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
export default function Home() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { Token } = useSelector((state: RootState) => state.authSlice);
  const { isError,isLoading,notes } = useSelector((state: RootState) => state.notesSlice);
  const dispatch = useDispatch<AppDispatch>()
  const router = useRouter()
    const titleRef = useRef<HTMLTextAreaElement>(null)
    const contentRef = useRef<HTMLTextAreaElement>(null)
  useEffect(() => {
    
    if (!Token) {
      router.push("/login");
    }
  }, [Token, router]);

  useEffect(() => {
    if (Token) {
      dispatch(getNotes(Token));
    }
  }, [Token, dispatch]);
  function addNote(){
    if(titleRef.current?.value != '' && contentRef.current?.value != ''){
      axios.post('https://note-sigma-black.vercel.app/api/v1/notes', {
        title: titleRef.current?.value,
        content: contentRef.current?.value
      }, {
        headers: {
         token: `3b8ny__${Token!}`
      }
      }).then(() => {
        dispatch(getNotes(Token!))
        handleClose()
      }).catch(err => {
      console.log(err)
    })
    }
  }
  const handleDelete = async (id: string) => {
  
    await axios.delete(
      `https://note-sigma-black.vercel.app/api/v1/notes/${id}`,
      {
        headers: {
          token: `3b8ny__${Token!}`
        }
      }
    ).then(() => {
       dispatch(getNotes(Token!));
    }).catch(err => {
      console.log(err)
    });
    
  
};
  async function update(id :string, newTitle : string , newContent : string ) {
        await axios.put(`https://note-sigma-black.vercel.app/api/v1/notes/${id}`, {
          "title": newTitle,
          "content": newContent
        }, {
          headers: {
            token: `3b8ny__${Token!}`
          }
        }).then(() => {
          dispatch(getNotes(Token!))
        }).catch(err => {
          console.log(err)
        })
      }
  const  handleSaveChange =  (id: string, newTitle : string | undefined, newContent : string | undefined) => {
    if (newTitle === '' || newContent === '') {
      handleDelete(id)
    } else {
      
      update(id,newTitle!,newContent!)
    }
  }
  if (isError) {
    return <NoDataFound/>
  }
  if (isLoading) {
    return <LoadingScreen/>
  }
  return   <Stack spacing={2} sx={{ px: '24px', py:'12px' }}>
      {notes?.map((note) => (
        <Note handleUpdate={handleSaveChange} noteData={note} handleDelete={handleDelete} key={note._id}/>
      ))}
    <Button
      variant="contained"
      className="w-fit"
      sx={{ marginLeft: 'auto !important', width: 'fit-content' }}
      onClick={handleOpen}
      startIcon={<AddIcon/>}
    >Add Note</Button>
<Modal
  open={open}
  onClose={handleClose}
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description"
>
      <Box sx={style}>
        <Typography sx={{textAlign:'center',marginBottom: '5px'}} id="modal-modal-title" variant="h5" component="h2">
      Add a note
    </Typography>
        <TextareaAutosize
          ref={titleRef}
      aria-label="empty textarea"
      placeholder="add title"
          style={{ width: '100%',marginBottom:'10px',outline:'1px solid black', padding:'10px' }}
    />
        <TextareaAutosize
          ref={contentRef}
      aria-label="empty textarea"
      placeholder="add content"
          style={{ width: '100%',marginBottom:'10px',outline:'1px solid black', padding:'10px' }}
    />
        <Button onClick={addNote} sx={{marginRight:'15px'}}  variant="outlined">Add</Button>
        <Button onClick={handleClose}  variant="outlined">close</Button>
  </Box>
</Modal>
    </Stack>;
}

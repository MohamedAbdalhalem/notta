import { Typography, Box, Button, Modal, TextareaAutosize } from "@mui/material";
import { RootState } from "_/lib/redux/store";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "_/lib/redux/store";
import { getNotes } from "_/lib/redux/notesSlice";
import axios from "axios";
import AddIcon from '@mui/icons-material/Add';
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
export default function NoDataFound() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { Token } = useSelector((state: RootState) => state.authSlice);
  const titleRef = useRef<HTMLTextAreaElement>(null)
  const contentRef = useRef<HTMLTextAreaElement>(null)
  const dispatch = useDispatch<AppDispatch>()
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
  return (
    <Box
      position='relative'
      height="60vh"
    >
      <Typography variant="h5"
      sx={{translate:'-50% -50%'}}
        className="absolute top-1/2 w-fit left-1/2" color="textSecondary">
        No Data Found
      </Typography>
      <Button
      className='absolute top-full w-fit left-full '
      variant="contained"
      sx={{  width: 'fit-content',translate:'-105% -100%' }}
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
    </Box>
  );
}

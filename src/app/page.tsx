'use client';
import { RootState } from "_/lib/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "_/lib/redux/store";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { getNotes } from "_/lib/redux/notesSlice";
import { TextField, Button, Stack, Paper} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SendIcon from '@mui/icons-material/Send';
import LoadingScreen from "_/_Components/LoadingScreen/LoadingScreen";
import NoDataFound from "_/_Components/NoDataFound/NoDataFound";
import axios from "axios";
export default function Home() {
  const { Token } = useSelector((state: RootState) => state.authSlice);
  const { isError,isLoading,notes } = useSelector((state: RootState) => state.notesSlice);
  const dispatch = useDispatch<AppDispatch>()
  const router = useRouter()
  const [currentID, setCurrentId] = useState<null | string>(null)
  const titleRef = useRef<HTMLInputElement>(null)
  const contentRef = useRef<HTMLInputElement>(null)
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
  const handleDelete = async (id: string) => {
  
    await axios.delete(
      `https://note-sigma-black.vercel.app/api/v1/notes/${id}`,
      {
        headers: {
          token: `3b8ny__${Token!}`
        }
      }
    ).then(_ => {
       dispatch(getNotes(Token!));
    }).catch(err => {
      console.log(err)
    });
    
  
};

  const handleUpdate = (id: string) => {
    setCurrentId(id)
  };
  const  handleSaveChange =  (id: string) => {
    if (titleRef.current?.value === '' || contentRef.current?.value === '') {
      handleDelete(id)
    } else {
      async function update() {
        await axios.put(`https://note-sigma-black.vercel.app/api/v1/notes/${id}`, {
          "title": titleRef.current?.value,
          "content": contentRef.current?.value
        }, {
          headers: {
            token: `3b8ny__${Token!}`
          }
        }).then(_ => {
          dispatch(getNotes(Token!))
          setCurrentId(null)
        }).catch(err => {
          console.log(err)
        })
      }
      update()
    }
  }
  if (isError) {
    return <NoDataFound/>
  }
  if (isLoading) {
    return <LoadingScreen/>
  }
  return   <Stack spacing={2} sx={{ px: '24px', py:'12px  ' }}>
      {notes?.map((note) => (
        <Paper
          key={note._id}
          elevation={2}
          sx={{ p: 1.5, borderRadius: 2 }}
          
        >
          <Stack
            sx={{display : 'flex', alignItems:'center', flexDirection:'row',justifyContent:'space-between',flexWrap:'wrap',gap:'10px'}}
          >
            <TextField
              // value={note.title}
              defaultValue={note.title}
              variant="outlined"
              size="small"
              inputRef={titleRef}
              disabled={note._id === currentID ? false : true}
              className="w-full md:w-[14%] text-wrap"
            />
            <TextField
              // value={note.content}
              defaultValue={note.content}
              variant="outlined"
              size="small"
              inputRef={contentRef}
              disabled={note._id === currentID ? false : true}
              className="w-full md:w-[60%]"
            />
            {note._id === currentID ? <Button
              variant="contained"
              size="small"
              color="primary"
              endIcon={<SendIcon />}
              onClick={()=> handleSaveChange(note._id)}
              className="w-[48%] md:w-[11%]"
            >
              Save
            </Button> : <Button
              variant="contained"
              size="small"
              color="primary"
              startIcon={<EditIcon />}
              onClick={() => handleUpdate(note._id)}
              className="w-[48%] md:w-[11%]"
            >
              Update
            </Button>}
            
            
            <Button
              variant="outlined"
              size="small"
              color="error"
              startIcon={<DeleteIcon />}
              onClick={() => handleDelete(note._id)}
              className="w-[48%] md:w-[11%]"
            >
              Delete
            </Button>
          </Stack>
        </Paper>
      ))}
    </Stack>;
}

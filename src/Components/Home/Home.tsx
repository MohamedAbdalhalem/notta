import { useContext, useState } from "react"
import { notescontext } from "../../Context/NotesContext"
import Note from "../Note/Note"
import img from '../../assets/noDataFound-removebg-preview.png'
import {  useForm } from "react-hook-form"
import { note } from "../../types"
export default function Home() {
  const { notes,addNote } = useContext(notescontext)
  const [isOpen, setIsOpen] = useState(false)
  const [isAdd,setIsAdd] = useState(false)
  const { register, handleSubmit, formState: { errors },reset } = useForm<note>()
  async function handleAddNote(data: note) {
    setIsAdd(true)
    setIsOpen(true)
    await addNote(data)
    setIsOpen(false)
    setIsAdd(false)
    reset()
  }
  if (notes === null ) {
    return <div className="p-5 h-[70vh]">
      <div role="status" className=" w-full animate-pulse">
  <div className="h-12 bg-gray-200 rounded-full dark:bg-gray-700  mb-4" />
  <div className="h-12 bg-gray-200 rounded-full dark:bg-gray-700  mb-4" />
  <div className="h-12 bg-gray-200 rounded-full dark:bg-gray-700 mb-4" />
  <div className="h-12 bg-gray-200 rounded-full dark:bg-gray-700 " />

</div>
    </div>
  }
  return (
    <div className="p-5 relative min-h-[70vh]">
      {notes === undefined && <img src={img} className="mx-auto" alt="" />}
      {notes?.map(note => <Note key={note._id} {...note} />)}

      <button onClick={()=> setIsOpen(true)} className="block absolute cursor-pointer bottom-2 right-2 text-white bg-yellow-600 hover:bg-yellow-500 focus:ring-4 focus:outline-none focus:ring-yellow-500 font-medium rounded-lg text-2xl px-5 py-2.5 text-center dark:bg-yellow-600 dark:hover:bg-yellow-500 dark:focus:ring-yellow-500" type="button">
  +
      </button>
      
      { isOpen && <div  className=" block fixed top-18 left-1/2 -translate-middle-x w-full z-50 justify-center h-full items-center -translate-x-1/2">
  <div className="relative">
    {/* Modal content */}
    <div className="relative bg-gray-200 sm:max-w-md  -translate-x-1/2 left-1/2   shadow-sm dark:bg-gray-700">
      {/* Modal header */}
      <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
          Add note
        </h3>
        <button onClick={()=> setIsOpen(false)} type="button" className="end-2.5 text-gray-400 cursor-pointer bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="authentication-modal">
          <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
          </svg>
          <span className="sr-only">Close modal</span>
        </button>
      </div>
      {/* Modal body */}
      <div className="p-4 md:p-5">
        <form className="space-y-4" onSubmit={handleSubmit(handleAddNote)} >
          <div>
            <label htmlFor="title" className="block mb-2 font-medium text-gray-900 dark:text-white">Title</label>
                  <input type="text" {...register('title', { required: 'required' })} name="title" id="title" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" />
                  {errors.title && <p className="text-red-600">{ errors.title.message }</p>}
          </div>
          <div>
            <label htmlFor="content"  className="block mb-2  font-medium text-gray-900 dark:text-white">Content</label>
                  <textarea {...register('content', { required: 'required' })} name="content" id="content" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"></textarea>
                                    {errors.content && <p className="text-red-600">{ errors.content.message }</p>}
          </div>
          
                <button type="submit" className="w-full cursor-pointer text-white bg-yellow-600 hover:bg-yellow-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-bold rounded-lg px-5 py-2.5 text-center dark:bg-yellow-600 dark:hover:bg-yellow-500 dark:focus:ring-yellow-500">
                  {isAdd ? <>
        <svg aria-hidden="true" role="status" className="inline w-4 h-4 me-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
<path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
</svg>
Loading...
        </> : 'Add'}
          </button>
        </form>
      </div>
    </div>
  </div>
</div>}


    </div>
  )
}

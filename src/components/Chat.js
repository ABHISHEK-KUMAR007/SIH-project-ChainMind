import React, { useCallback, useEffect, useReducer, useState } from 'react'
import Navbar from './Navbar'
import { useLocation } from 'react-router-dom'
import "./Chat.css"
import clip from "../images/clip.png"
import { addDoc, collection, doc, getDocs } from 'firebase/firestore'
import { auth, database } from '../firebase/setup'
import send from "../images/send.png"
import { List, ListItem, ListItemText, Paper } from '@mui/material'
//incript and decript
function Chat() {
  
  const fileRef = useReducer(null)

  const [message,setMessage] = useState("")
  const [messageData,setMessageData] = useState([])
  const [file,setFile] = useState("")

  const location = useLocation()

  const addMessage = async()=>{
    const userDoc = doc(database,"Users",`${auth.currentUser?.uid}`)
    const messageDoc = doc(userDoc,"Message",`${auth.currentUser?.uid}`)
    const messageRef = collection(messageDoc,`Message-${location.state.id}`)
    try{
      await addDoc(messageRef,{
         message:message,
         file:file
      })
    }catch(err){
      console.error(err)
    }
  }

  const sendMessage = async()=>{
    const userDoc = doc(database,"Users",`${location.state.id}`)
    const messageDoc = doc(userDoc,"Message",`${location.state.id}`)
    const messageRef = collection(messageDoc,`Message-${auth.currentUser?.uid}`)
    try{
      await addDoc(messageRef,{
         message:message,
         file:file,
         name:auth.currentUser?.displayName
      })
      addMessage()
      showMessage()
      setFile("")
      setMessage("")
    }catch(err){
      console.error(err)
    }
  }

  const showMessage = useCallback( async()=>{
    const userDoc = doc(database,"Users",`${auth.currentUser?.uid}`)
    const messageDoc = doc(userDoc,"Message",`${auth.currentUser?.uid}`)
    const messageRef = collection(messageDoc,`Message-${location.state.id}`)
    // setTimeout(async()=>{
      try{
        const data = await getDocs(messageRef)
        console.log("data\n"+data);
        
        const filteredData = data.docs.map((doc)=>({
          ...doc.data(),
          id:doc.id
        }))
        console.log("filter\n"+filteredData);
        
        setMessageData(filteredData)
       }catch(err){
         console.error(err)
       }
    // },1000)
   
  },[messageData])
  // useEffect(()=>{
  //   showMessage()
  // },[])

  useEffect(()=>{
    showMessage()
  },[messageData])


  return (
    <div className='chat'>
      <div className='chat-top'>
      <Navbar recieverUsername={location.state.username} 
      recieverProImg = {location.state.profile_image}/>
      </div>
      <div className='chat-middle'>
        {messageData.map((data,index)=>{
          return <>
          <div key={index}>
          <h5 style={{fontWeight:"200"}}>{data.name}</h5>
           <Paper sx={{marginTop:"10px",width:"max-content"}}>
            <List>
              <ListItem>
                <ListItemText primary={data.message}/>
                {data.file !== "" && <img style={{width:"200px"}} src={data.file}/>}
              </ListItem>
            </List>
           </Paper>
           </div>
          </>
        })}
      </div>
      <div className='chat-bottom'>
        <img onClick={()=> fileRef.current.click()} className='chat-bottom-icon' src={clip}/>
        <input accept='image/*' onChange={(e)=> setFile(URL.createObjectURL(e.target.files[0]))} ref={fileRef} type='file' className='file'/>
        <input value={message} onChange={(e)=> setMessage(e.target.value)} className='chat-text' placeholder='Type a message'/>
        {file && <Paper>
          <img style={{width:"70px",padding:"3px"}} src={file}/>
        </Paper>}
        <img onClick={sendMessage} src={send} className='send-icon'/>
      </div>
    </div>
  )
}

export default Chat

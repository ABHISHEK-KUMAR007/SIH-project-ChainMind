// import React, { useEffect, useState, useRef } from 'react';
// import Navbar from './Navbar';
// import { useLocation } from 'react-router-dom';
// import "./Chat.css";
// import clip from "../images/clip.png";
// import send from "../images/send.png";
// import { List, ListItem, ListItemText, Paper } from '@mui/material';
// import { addDoc, collection, doc, getDocs } from 'firebase/firestore';
// import { auth, database } from '../firebase/setup';
// import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
// import { storage } from '../firebase/setup'; // Import Firebase storage

// // Chat component
// function Chat() {
//   const fileRef = useRef(null); // Use ref to handle file input
//   const [message, setMessage] = useState("");
//   const [messageData, setMessageData] = useState([]);
//   const [file, setFile] = useState(null); // Store file object
//   const [loading, setLoading] = useState(true); // Loading state to handle async data fetching
//   const location = useLocation();

//   const terminalEndRef = useRef(null);



//   // Upload file to Firebase Storage and return its URL
//   const uploadFile = async (file) => {
//     const fileRef = ref(storage, `uploads/${file.name}`);
//     try {
//       await uploadBytes(fileRef, file);
//       const fileURL = await getDownloadURL(fileRef);
//       return fileURL;
//     } catch (err) {
//       console.error(err);
//       return null;
//     }
//   };

//   // Add a message for the current user
//   const addMessage = async (fileURL) => {
//     const userDoc = doc(database, "Users", `${auth.currentUser?.uid}`);
//     const messageDoc = doc(userDoc, "Message", `${auth.currentUser?.uid}`);
//     const messageRef = collection(messageDoc, `Message-${location.state.id}`);
//     try {
//       await addDoc(messageRef, {
//         message: message,
//         file: fileURL, // Store the file URL
//         name: auth.currentUser?.displayName
//       });
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   // Send a message to the recipient and also store it for the current user
//   const sendMessage = async () => {
//     let fileURL = "";
//     if (file) {
//       fileURL = await uploadFile(file); // Upload file and get its URL
//     }
//     const userDoc = doc(database, "Users", `${location.state.id}`);
//     const messageDoc = doc(userDoc, "Message", `${location.state.id}`);
//     const messageRef = collection(messageDoc, `Message-${auth.currentUser?.uid}`);
//     try {
//       await addDoc(messageRef, {
//         message: message,
//         file: fileURL, // Store the file URL
//         name: auth.currentUser?.displayName
//       });
//       await addMessage(fileURL); // Add the message for the current user
//       await showMessage(); // Fetch the updated messages
//       setFile(null); // Clear the file
//       setMessage(""); // Clear the input field
//       await showMessage();
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   useEffect(() => {
//     terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//   }, [messageData,sendMessage]); 


//   // Fetch and display messages between users
//   const showMessage = async () => {
//     setLoading(true); // Set loading state while fetching data
//     const userDoc = doc(database, "Users", `${auth.currentUser?.uid}`);
//     const messageDoc = doc(userDoc, "Message", `${auth.currentUser?.uid}`);
//     const messageRef = collection(messageDoc, `Message-${location.state.id}`);
//     try {
//       const data = await getDocs(messageRef); // Fetch messages
//       const filteredData = data.docs.map((doc) => ({
//         ...doc.data(),
//         id: doc.id,
//         time: doc._document.createTime.timestamp.seconds
//       }));
//       filteredData.sort((a, b) => a.time - b.time); // Sort messages by time
//       setMessageData(filteredData); // Update state with fetched messages
//       setLoading(false); // Set loading to false after fetching data
//     } catch (err) {
//       console.error(err);
//       setLoading(false); // Ensure loading is stopped in case of error
//     }
//   };

//   // Fetch messages when the component mounts
//   useEffect(() => {
//     showMessage(); // Call showMessage to load messages
//   }, []); // Empty dependency array ensures it runs only on mount



//   return (
//     <div className='chat'>
//       <div className='chat-top'>
//         <Navbar
//           recieverUsername={location.state.username}
//           recieverProImg={location.state.profile_image}
//         />
//       </div>

//       {/* Chat message display */}
//       <div className='chat-middle'>
//         {loading ? (
//           <p>Loading messages...</p> // Loading indicator while messages are being fetched
//         ) : (
//           messageData.length > 0 ? (
//             messageData.map((data, index) => (
//               <div key={index}>
//                 <h5 style={{ fontWeight: "200" }}>{data.name}</h5>
//                 <Paper sx={{ marginTop: "10px", width: "max-content" }}>
//                   <List>
//                     <ListItem>
//                       <ListItemText primary={data.message} />
//                       {data.file !== "" && <img style={{ width: "200px" }} src={data.file} alt="Attachment" />}
//                     </ListItem>
//                   </List>
//                 </Paper>
//               </div>
//             ))
//           ) : (
//             <p>No messages yet.</p> // Message if no messages are available
//           )
//         )}
//       <div ref={terminalEndRef} />
//       </div>
//       {/* Chat message input */}
//       <div className='chat-bottom'>
//         <img
//           onClick={() => fileRef.current.click()}
//           alt='Attach file'
//           className='chat-bottom-icon'
//           src={clip}
//         />
//         <input
//           accept='image/*'
//           onChange={(e) => setFile(e.target.files[0])} // Set the file object
//           ref={fileRef}
//           type='file'
//           className='file'
//           hidden
//         />
//         <input
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//           onKeyDown={(e) => e.key === 'Enter' && message !="" && sendMessage()} // Trigger sendMessage on Enter key press
//           className='chat-text'
//           placeholder='Type a message'
//         />
//         {file && (
//           <Paper>
//             <img style={{ width: "70px", padding: "3px" }} src={URL.createObjectURL(file)} alt="File preview" />
//           </Paper>
//         )}
//         <img
//           onClick={sendMessage}
//           src={send}
//           className='send-icon'
//           alt="Send message"
//         />
//       </div>
      
//     </div>
//   )
// }

// export default Chat;


import React, { useEffect, useState, useRef } from 'react';
import Navbar from './Navbar';
import { useLocation } from 'react-router-dom';
import "./Chat.css";
import clip from "../images/clip.png";
import send from "../images/send.png";
import { List, ListItem, ListItemText, Paper } from '@mui/material';
import { addDoc, collection, doc, getDocs } from 'firebase/firestore';
import { auth, database } from '../firebase/setup';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../firebase/setup';
import CryptoJS from 'crypto-js'; // Import CryptoJS

// Encryption and decryption key (use a strong key in production)


const SECRET_KEY = '6e7a4b0c3e2d7f8a0c6d9b2f5e9d7c0a4b1f6e7d9c0a1b2c3d4e5f6g7h8i9j0k';



// Chat component
function Chat() {
  const fileRef = useRef(null);
  const [message, setMessage] = useState("");
  const [messageData, setMessageData] = useState([]);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const terminalEndRef = useRef(null);

  // Encrypt the message
  const encryptMessage = (message) => {
    return CryptoJS.AES.encrypt(message, SECRET_KEY).toString();
  };

  // Decrypt the message
  const decryptMessage = (ciphertext) => {
    const bytes = CryptoJS.AES.decrypt(ciphertext, SECRET_KEY);
    return bytes.toString(CryptoJS.enc.Utf8);
  };

  const uploadFile = async (file) => {
    const fileRef = ref(storage, `uploads/${file.name}`);
    try {
      await uploadBytes(fileRef, file);
      const fileURL = await getDownloadURL(fileRef);
      return fileURL;
    } catch (err) {
      console.error(err);
      return null;
    }
  };

  const addMessage = async (fileURL) => {
    const encryptedMessage = encryptMessage(message); // Encrypt message
    const userDoc = doc(database, "Users", `${auth.currentUser?.uid}`);
    const messageDoc = doc(userDoc, "Message", `${auth.currentUser?.uid}`);
    const messageRef = collection(messageDoc, `Message-${location.state.id}`);
    try {
      await addDoc(messageRef, {
        message: encryptedMessage, // Store encrypted message
        file: fileURL,
        name: auth.currentUser?.displayName
      });
    } catch (err) {
      console.error(err);
    }
  };

  const sendMessage = async () => {
    let fileURL = "";
    if (file) {
      fileURL = await uploadFile(file);
    }
    const encryptedMessage = encryptMessage(message); // Encrypt message
    const userDoc = doc(database, "Users", `${location.state.id}`);
    const messageDoc = doc(userDoc, "Message", `${location.state.id}`);
    const messageRef = collection(messageDoc, `Message-${auth.currentUser?.uid}`);
    try {
      await addDoc(messageRef, {
        message: encryptedMessage, // Store encrypted message
        file: fileURL,
        name: auth.currentUser?.displayName
      });
      await addMessage(fileURL);
      await showMessage();
      setFile(null);
      setMessage("");
      await showMessage();
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messageData]);

  const showMessage = async () => {
    setLoading(true);
    setInterval(async()=>{
    const userDoc = doc(database, "Users", `${auth.currentUser?.uid}`);
    const messageDoc = doc(userDoc, "Message", `${auth.currentUser?.uid}`);
    const messageRef = collection(messageDoc, `Message-${location.state.id}`);
    try {
      const data = await getDocs(messageRef);
      const filteredData = data.docs.map((doc) => {
        const decryptedMessage = decryptMessage(doc.data().message); // Decrypt message
        return {
          ...doc.data(),
          message: decryptedMessage, // Use decrypted message
          id: doc.id,
          time: doc._document.createTime.timestamp.seconds
        };
      });
      filteredData.sort((a, b) => a.time - b.time);
      setMessageData(filteredData);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  },1000)
  };

  useEffect(() => {
    showMessage();
  }, []); 

  return (
    <div className='chat'>
      <div className='chat-top'>
        <Navbar
          recieverUsername={location.state.username}
          recieverProImg={location.state.profile_image}
        />
      </div>

      <div className='chat-middle'>
        {loading ? (
          <p>Loading messages...</p>
        ) : (
          messageData.length > 0 ? (
            messageData.map((data, index) => (
              <div key={index}>
                <h5 style={{ fontWeight: "200" }}>{data.name}</h5>
                <Paper sx={{ marginTop: "10px", width: "max-content" }}>
                  <List>
                    <ListItem>
                      <ListItemText primary={data.message} />
                      {data.file !== "" && <img style={{ width: "200px" }} src={data.file} alt="Attachment" />}
                    </ListItem>
                  </List>
                </Paper>
              </div>
            ))
          ) : (
            <p>No messages yet.</p>
          )
        )}
      <div ref={terminalEndRef} />
      </div>

      <div className='chat-bottom'>
        <img
          onClick={() => fileRef.current.click()}
          alt='Attach file'
          className='chat-bottom-icon'
          src={clip}
        />
        <input
          accept='image/*'
          onChange={(e) => setFile(e.target.files[0])}
          ref={fileRef}
          type='file'
          className='file'
          hidden
        />
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && message !== "" && sendMessage()}
          className='chat-text'
          placeholder='Type a message'
        />
        {file && (
          <Paper>
            <img style={{ width: "70px", padding: "3px" }} src={URL.createObjectURL(file)} alt="File preview" />
          </Paper>
        )}
        <img
          onClick={sendMessage}
          src={send}
          className='send-icon'
          alt="Send message"
        />
      </div>
    </div>
  )
}

export default Chat;

// import { Avatar, List, ListItem, ListItemText, Paper } from '@mui/material'
// import { collection, getDocs } from 'firebase/firestore'
// import React, { useEffect, useState } from 'react'
// import { auth, database } from '../firebase/setup'
// import lens from "../images/lens.png"
// import "./Sidebar.css"
// import { Link } from 'react-router-dom'

// function Sidebar() {

//     const [users, setUsers] = useState([])


//     const getUser = async () => {
//         const userRef = collection(database, "Users")
//         try {
//             const data = await getDocs(userRef)
//             const filteredData = data.docs.map((doc) => ({
//                 ...doc.data(),
//                 id: doc.id
//             }))
//             setUsers(filteredData)
//         } catch (err) {
//             console.error(err)
//         }
//     }

//     useEffect(() => {
//         getUser()
//     }, [users])


//     return (
//         <div>
//             <div className='search'>
//             <img alt='image' className='search-icon' src={lens}/>
//             <input placeholder='Search for new chat' className='search-text'/>
//             </div>
//             {users.filter(user => user.id !== auth.currentUser?.uid).map((user,index) => {
//                 return <div key={index}>
//                 <div key={index}>
//                 <Link key={index} to="/chat" className='chat-link' state={{id:user.id,username:user.username,profile_image:user.profile_image}}>
//                     <Paper elevation={0} sx={{ border: "1px solid #D4D4D4" }}>
//                         <List>
//                             <ListItem>
//                                 <Avatar sx={{marginLeft:"10px"}} src={user.profile_image}/>
//                                 <ListItemText  sx={{marginLeft:"10px"}} primary={user.username}/>
//                             </ListItem>
//                         </List>
//                     </Paper>
//                 </Link>
//                 </div>
//                 </div>
//             })}
//         </div>
//     )
// }

// export default Sidebar

import { Avatar, List, ListItem, ListItemText, Paper } from '@mui/material';
import { collection, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { auth, database } from '../firebase/setup';
import lens from "../images/lens.png";
import "./Sidebar.css";
import { Link } from 'react-router-dom';

function Sidebar() {
  const [users, setUsers] = useState([]);
  const [searchText, setSearchText] = useState(''); // State for search input

  const getUser = async () => {
    const userRef = collection(database, "Users");
    try {
      const data = await getDocs(userRef);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id
      }));
      setUsers(filteredData);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  // Filter users based on searchText
  const filteredUsers = users.filter(user =>
    user.username.toLowerCase().includes(searchText.toLowerCase()) &&
    user.id !== auth.currentUser?.uid
  );

  return (
    <div>
      <div className='search'>
        <img alt='image' className='search-icon' src={lens}/>
        <input
          placeholder='Search for new chat'
          className='search-text'
          value={searchText} // Bind input to state
          onChange={(e) => setSearchText(e.target.value)} // Update state on input change
        />
      </div>
      {filteredUsers.map((user, index) => (
        <div key={index}>
          <Link key={index} to="/chat" className='chat-link' state={{id:user.id, username:user.username, profile_image:user.profile_image}}>
            <Paper elevation={0} sx={{ border: "1px solid #D4D4D4" }}>
              <List>
                <ListItem>
                  <Avatar sx={{marginLeft:"10px"}} src={user.profile_image}/>
                  <ListItemText sx={{marginLeft:"10px",color:"black"}} primary={user.username}/>
                </ListItem>
              </List>
            </Paper>
            
          </Link>
        </div>
      ))}
    </div>
  );
}

export default Sidebar;


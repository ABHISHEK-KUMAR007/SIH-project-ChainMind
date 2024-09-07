import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import "./Signin.css"
import whatsapp from "../images/mychatt.png"
import { Button, Card, CardContent } from '@mui/material';
import google from "../images/google.png"
import {signInWithPopup} from "firebase/auth"
import {auth,database,googleProvider} from "../firebase/setup"
import { doc, setDoc } from 'firebase/firestore';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';


export default function Signin() {

   const navigate = useNavigate()



   const addUser = async (ipAddress) => {
    const userDoc = doc(database, "Users", `${auth.currentUser?.uid}`);
    try {
        console.log("ip\n"+ipAddress);
        
      await setDoc(userDoc, {
        id: auth.currentUser?.uid,
        username: auth.currentUser?.displayName,
        profile_image: auth.currentUser?.photoURL,
        ip_address: ipAddress,
      });
    } catch (err) {
      console.error(err);
    }
  };
  

    // const addUser = async ()=>{
    //     const userDoc = doc(database,"Users",`${auth.currentUser?.uid}`)
    //     try{
    //         await setDoc(userDoc,{
    //             id:auth.currentUser?.uid,
    //             username:auth.currentUser?.displayName,
    //             profile_image:auth.currentUser?.photoURL
    //         })
    //     }catch(err){
    //         console.error(err)
    //     }
    // }

    // const googleSignin = async()=>{
    //     try{
    //         await signInWithPopup(auth,googleProvider)
    //         addUser()
    //         navigate("/main")
    //     }catch(err){
    //         console.error(err)
    //     }
    // }

    const googleSignin = async () => {
        try {
          await signInWithPopup(auth, googleProvider);
          const ipResponse = await axios.get('https://api.ipify.org?format=json');
          const ipAddress = ipResponse.data.ip;
          addUser(ipAddress);
          navigate("/main");
        } catch (err) {
          console.error(err);
        }
      };
      

    return (
      <Box sx={{ flexGrow: 1, height:"100vh", backgroundColor: "#d4c7b0"}}>
            <AppBar position="static" sx={{ height: "230px", backgroundColor: "#84a98c", }}>
                <Toolbar>
                    <div className='nav-content'>
                        <img className='logo' src={whatsapp} />
                        <h3 className='title'>MYCHAT WEB</h3>
                    </div>
                    <Card className='box'>
                        <CardContent className='signin-card'>
                            <div>
                                <h2 className='description'>Use Mychat on your computer</h2>
                                <h5 className='step'>1. Open Mychat on your computer</h5>
                                <h5 className='step'>2. Signin using google account</h5>
                                <h5 className='step'>3. Signin using phone number</h5>
                            </div>
                            <div onClick={googleSignin} className='signin-btn'>
                                <img alt='image' className='google' src={google}/>
                            </div>
                        </CardContent>
                        <Link className='custom-button'  to="/phone" style={{textDecoration:"none"}} ><Button color='success' >Signin with phone number</Button></Link>
                    </Card>
                </Toolbar>
            </AppBar>
        </Box>
    );
    
}





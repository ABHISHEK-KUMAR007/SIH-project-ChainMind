// import React, { useState } from 'react'
// import PhoneInput from 'react-phone-input-2'
// import 'react-phone-input-2/lib/style.css'
// import "./Phone.css"
// import { Button, TextField } from '@mui/material'
// import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth'
// import { auth } from '../firebase/setup.js'
// import { useNavigate } from 'react-router-dom'
// import axios from 'axios'
// import firebase from 'firebase/compat/app'

// function PhoneSignin() {


//     const navigate = useNavigate()

//     const [phone,setPhone] = useState("")
//     const [user,setUser] = useState(null)
//     const [otp,setOtp] = useState("")

//     const sendOtp = async () => {
//       try {
//         console.log("phone no 1"+phone);
        
//         const recaptcha = new RecaptchaVerifier(auth,'recaptcha', {});
//         //const token = await recaptcha.verify();
//        // const recaptcha = window.recaptchaVerifier;
//         console.log(phone);
        
//         const confirmation = await signInWithPhoneNumber(auth,phone,recaptcha);
  
//           //recaptcha.render();
  
//           setUser(confirmation);
//       } catch (err) {
//           console.log("error with send otp");
//           console.error(err);
//       }
//   };

//   // const sendOtp = async () => {
//   //   try {
//   //     const recaptcha = new RecaptchaVerifier("recaptcha", {
//   //       size: "invisible",
//   //       callback: (response) => {
//   //         console.log('reCAPTCHA solved');
//   //       }
//   //     }, auth);
//   //     //recaptcha.render();
//   //     const confirmation = await signInWithPhoneNumber(auth, phone, recaptcha);
//   //     setUser(confirmation);
//   //   } catch (err) {
//   //     console.log("error with send otp");
//   //     console.error(err);
//   //   }
//   // };



// //   const sendOtp = async () => {
// //     try {
// //         // Initialize reCAPTCHA verifier with correct parameters
// //         const recaptcha = new RecaptchaVerifier("recaptcha", {
// //             'size': 'invisible', // 'invisible' or 'normal'
// //             'callback': (response) => {
// //                 // reCAPTCHA solved - will automatically trigger on successful verification
// //                 console.log('reCAPTCHA solved');
// //             }
// //         }, auth);

// //         // Render the reCAPTCHA widget
// //         recaptcha.render();

// //         // Now you can use signInWithPhoneNumber
// //         const confirmation = await signInWithPhoneNumber(auth, phone, recaptcha);

// //         setUser(confirmation);
// //     } catch (err) {
// //         console.log("Error with sending OTP");
// //         console.error(err);
// //     }
// // };

//     const verifyOtp = async () => {
//       try {
//         const response = await axios.post('http://localhost:3000/verify-otp', { phone: `+${phone}`, code: otp });
//         if (response.data.success) {
//           console.log('OTP verified successfully');
          
//           // Save user data in Firebase
//           const userData = { phoneNumber: `+${phone}` };
//           await firebase.firestore().collection('users').add(userData);
          
//           navigate('/main');
//         } else {
//           console.log('OTP verification failed');
//         }
//       } catch (err) {
//         console.error('Error verifying OTP:', err);
//       }
//     };
    

//   return (
//     <div className='phone-signin'>
//         <h2 style={{fontWeight:"200",textAlign:"center"}}>Enter your phone number</h2>
//         <h5 style={{fontWeight:"500",textAlign:"center",color:"grey"}}>Select a country and enter phone number</h5>
//         <div className='phone-content'>
//         <PhoneInput 
//       country={"us"}
//       value={phone}
//       onChange={(phone)=>setPhone("+" + phone)} 
//       />
//       <Button onClick={sendOtp} sx={{marginTop:"10px"}} variant='contained'>Send Otp</Button>
//       <div style={{marginTop:"10px"}} id="recaptcha"></div>
//       <br/>
//       <TextField onChange={(e)=> setOtp(e.target.value)} sx={{marginTop:"10px",width:"300px"}} variant='outlined' size='small' label="Enter Otp"/>
//       <br/>
//       <Button onClick={verifyOtp} sx={{marginTop:"10px"}} variant='contained' color='success'>Verify otp</Button>
//         </div>
        
//     </div>
//   )
// }

// export default PhoneSignin




import React, { useState } from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { Button, TextField } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import firebase from 'firebase/compat/app';

function PhoneSignin() {
  const navigate = useNavigate();

  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);

  const sendOtp = async () => {
    try {
      const response = await axios.post('http://localhost:5000/send-otp', { phone: `+${phone}` });
      if (response.data.success) {
        setOtpSent(true);
        console.log('OTP sent successfully');
      }
    } catch (err) {
      console.error('Error sending OTP:', err);
    }
  };

  // const verifyOtp = async () => {
  //   try {
  //     const response = await axios.post('http://localhost:5000/verify-otp', { phone: `+${phone}`, code: otp });
  //     if (response.data.success) {
  //       console.log('OTP verified successfully');
  //       navigate('/main');
  //     } else {
  //       console.log('OTP verification failed');
  //     }
  //   } catch (err) {
  //     console.error('Error verifying OTP:', err);
  //   }
  // };
  const verifyOtp = async () => {
    try {
      const response = await axios.post('http://localhost:3000/verify-otp', { phone: `+${phone}`, code: otp });
      if (response.data.success) {
        console.log('OTP verified successfully');
        
        // Save user data in Firebase
        const userData = { phoneNumber: `+${phone}` };
        await firebase.firestore().collection('users').add(userData);
        
        navigate('/main');
      } else {
        console.log('OTP verification failed');
      }
    } catch (err) {
      console.error('Error verifying OTP:', err);
    }
  };

  return (
    <div className='phone-signin'>
      <h2 style={{ fontWeight: '200', textAlign: 'center' }}>Enter your phone number</h2>
      <h5 style={{ fontWeight: '500', textAlign: 'center', color: 'grey' }}>Select a country and enter phone number</h5>
      <div className='phone-content'>
        <PhoneInput
          country={'us'}
          value={phone}
          onChange={(phone) => setPhone(phone)}
        />
        <Button onClick={sendOtp} sx={{ marginTop: '10px' }} variant='contained'>Send Otp</Button>
        {otpSent && (
          <>
            <TextField onChange={(e) => setOtp(e.target.value)} sx={{ marginTop: '10px', width: '300px' }} variant='outlined' size='small' label='Enter Otp' />
            <Button onClick={verifyOtp} sx={{ marginTop: '10px' }} variant='contained' color='success'>Verify otp</Button>
          </>
        )}
      </div>
    </div>
  );
}

export default PhoneSignin;



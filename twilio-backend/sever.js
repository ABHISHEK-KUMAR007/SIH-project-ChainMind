const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const twilio = require('twilio');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const accountSid = 'AC025cfdd19da6b89c3c0ed26370b7f208';
const authToken = '11180eb8196fa1e5d626f4de530fc462';
const client = new twilio(accountSid, authToken);

// app.post('/send-otp', (req, res) => {
//   const { phone } = req.body;

//   client.verify.services('MG0a487d6b4e44bbb1451bf44b1cfb28e3')
//     .verifications.create({ to: phone, channel: 'sms' })
//     .then(verification => res.send({ success: true, sid: verification.sid }))
//     .catch(err => res.status(500).send({ error: err.message }));
// });

app.post('/send-otp', (req, res) => {
    const { phone } = req.body;
  
    client.verify.services('MG0a487d6b4e44bbb1451bf44b1cfb28e3')
      .verifications.create({ to: phone, channel: 'sms' })
      .then(verification => res.send({ success: true, sid: verification.sid }))
      .catch(err => {
        console.error('Twilio error:', err);
        res.status(500).send({ error: err.message });
      });
  });
  


// app.post('/verify-otp', (req, res) => {
//   const { phone, code } = req.body;

//   client.verify.services('your_service_sid')
//     .verificationChecks.create({ to: phone, code: code })
//     .then(verification_check => {
//       if (verification_check.status === 'approved') {
//         res.send({ success: true });
//       } else {
//         res.status(400).send({ error: 'Invalid code' });
//       }
//     })
//     .catch(err => res.status(500).send({ error: err.message }));
// });

app.post('/verify-otp', (req, res) => {
    const { phone, code } = req.body;
  
    client.verify.services('MG0a487d6b4e44bbb1451bf44b1cfb28e3')
      .verificationChecks.create({ to: phone, code: code })
      .then(verification_check => {
        if (verification_check.status === 'approved') {
          res.send({ success: true });
        } else {
          res.status(400).send({ error: 'Invalid code' });
        }
      })
      .catch(err => {
        console.error('Twilio error:', err);
        res.status(500).send({ error: err.message });
      });
  });
  

app.listen(5000, () => console.log('Server is running on port 5000'));

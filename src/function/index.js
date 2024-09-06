const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();
const db = admin.firestore();

exports.addUserWithIP = functions.https.onRequest(async (req, res) => {
    const ipAddress = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

    const userId = req.query.userId; // Assume you pass the user ID as a query parameter
    const username = req.query.username; // Assume you pass the username as a query parameter
    const profileImage = req.query.profileImage; // Assume you pass the profile image URL as a query parameter

    try {
        await db.collection('Users').doc(userId).set({
            id: userId,
            username: username,
            profile_image: profileImage,
            ip_address: ipAddress
        });
        res.status(200).send('User added successfully with IP address.');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error adding user.');
    }
});

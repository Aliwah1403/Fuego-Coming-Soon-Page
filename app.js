const express = require('express');
const admin = require('firebase-admin')
const path = require('path')

// firebase admin
let serviceAccount = require("./fuego-form-firebase-adminsdk-wctyv-23f2a09372.json");
// let serviceAccount = process.env.FIREBASE_CONFIG;

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

let db = admin.firestore();

const app = express()
let staticPath = path.join(__dirname, 'public');

const dotenv = require('dotenv')
dotenv.config()


// middlewares
app.use(express.static(staticPath));
app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile(path.join(staticPath, "index.html"));
})

app.post('/', (req, res) => {
    let { email } = req.body;

    if (!email.length) {
        return res.json({ 'alert': 'Please enter an email address' })
    }

    db.collection('waitList').doc(email).get()
        .then(user => {
            if (user.exists) {
                return res.json({ 'alert': 'email already added' })
            } else {
                db.collection('waitList').doc(email).set(req.body)
                    .then(data => {
                        res.json({
                            email: req.body.email
                        })
                    })
            }
        })
})

const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log(`App running on port ${port}`);
})
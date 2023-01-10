const functions = require("firebase-functions");
const admin=require("firebase-admin")

admin.initializeApp();
const db=admin.firestore();

// // // Create and Deploy Your First Cloud Functions
// // // https://firebase.google.com/docs/functions/write-firebase-functions
// //
// // exports.helloWorld = functions.https.onRequest((request, response) => {
// //   functions.logger.info("Hello logs!", {structuredData: true});
// //   response.send("Hello from Firebase!");
// // });

// exports.randomNumber=functions.https.onRequest((req,res)=>{
//     const number=Math.round(Math.random()*100);
//     res.send(number.toString());
// })

exports.ScheduleIncome = functions.pubsub.schedule('0 0 * * 0').onRun((context) => { //Todos los domingos a las 00:00 
        db.doc("incomes/week").update({
            "resetDay": admin.firestore.Timestamp.now(), 
            "income":0,
            "sells":0
        });
    return console.log('successful timer update');
});
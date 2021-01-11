import * as functions from 'firebase-functions';
import * as admin  from 'firebase-admin';

const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: ''
});

const db = admin.firestore();

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
export const helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello logs!", {structuredData: true});
  response.json({
      mensaje: "Hola Mundo desde Fuctions de Firebase!"
    });
});

export const encuesta = functions.https.onRequest( async (request, response) => {
  functions.logger.info("getEncuesta", {structuredData: true});

  const encuestaRef = db.collection('encuesta');
  const docsSnap = await encuestaRef.get();
  const resultadoEncuesta = docsSnap.docs.map( doc => doc.data() );

  response.json( resultadoEncuesta );
});
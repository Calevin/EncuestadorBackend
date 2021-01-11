import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as express from 'express';
import * as cors from 'cors';

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

export const encuestaFunctions = functions.https.onRequest( async (request, response) => {
  functions.logger.info("getEncuesta", {structuredData: true});

  const encuestaRef = db.collection('encuesta');
  const docsSnap = await encuestaRef.get();
  const resultadoEncuesta = docsSnap.docs.map( doc => doc.data() );

  response.json( resultadoEncuesta );
});

// Express
const app = express();
app.use( cors({ origin: true }) );

// Servicio get /encuesta hecho con express
app.get('/encuesta', async (req, res)  => {
  const encuestaRef = db.collection('encuesta');
  const docsSnap = await encuestaRef.get();
  const resultadoEncuesta = docsSnap.docs.map( doc => doc.data() );

  res.json( resultadoEncuesta );
});

export const api = functions.https.onRequest( app );
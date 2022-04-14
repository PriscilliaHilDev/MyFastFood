// The Cloud Functions for Firebase SDK to create Cloud Functions and set up triggers.
const functions = require('firebase-functions');

// The Firebase Admin SDK to access Firestore.
const admin = require('firebase-admin');
admin.initializeApp();
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
exports.createCheckoutRequest = functions.https.onRequest(async (req, res) => {
 
  // Je configure stripe en lui fournissant ma clé secrète
    const stripe = require('stripe')(functions.config().stripe.secret_key, {
        apiVersion: '2020-08-27',
    });

    // Je récupère les données posté coté front end
    const { amount, currency, methodPayment, email} = req.body;

    //const publicStripe = require('stripe')("pk_test_51JQD8gLp7IQnYLFLHiL4vIgMq1L7DpoNIYq8VCjm2RamvwCZeDzeh8mgUVixckyB2L8PcURGLLQMVeH43Z7s6pNK00kh09qRZm");
    
    // Je fournit l'adresse email de l'utilisateur au client Stripe relié à l'intention de paiement
    const customer = await stripe.customers.create({email:email});
  
    // Creaction de la clé éphemère pour accéder temporairement à l'object customer
    const ephemeralKey = await stripe.ephemeralKeys.create(
      {customer: customer.id},
      {apiVersion: '2020-08-27'}
    );
  
    //payment_method_types: ['bancontact', 'card', 'ideal', 'sepa_debit', 'sofort'],
    
  // je creer une instance de paiement via l'api de stripe
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: currency,
      customer: customer.id,
      payment_method_types: methodPayment,
    });
  
    // Je renvoie coté client la réponse de l'api pour afficher le modale de paiement
    res.status(200).json({
      paymentIntent: paymentIntent.client_secret,
      ephemeralKey: ephemeralKey.secret,
      customer: customer.id,
    })
  
  });

  exports.readFireStoreData = functions.firestore.document('message/{messageId}').onCreate((snap, context) => {

    /* init const result */
    const data = snap._fieldsProto;
    const id = context.params.messageId;
    const token = data.token.stringValue

    /* log */
    functions.logger.log('msg id:', id);
    functions.logger.log('new msg data:', data );
    functions.logger.log('new msg:', data.msg.stringValue);

    const message = {
      notification: {
        title: data.msg.stringValue,
        body: `Envoi de notif par jeremy`
      },
      token: token
    };

    /* send notif */
    const response =  admin.messaging().send(message);

})

// const sending = () => {
        
//   if (text != ""){

//       setInSending(true)
//       const sending = text
//       settext('')
  
//       Firebase.messaging().getToken().then(token => {
     
//           Firebase.addMessage(sending, token).then(() => {

//               console.log('message add ok');
//               setInSending(false)
//           });
//       });
//   }
// }

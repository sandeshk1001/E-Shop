import React from 'react';
import Router from './Router';
// import CheckoutForm from './pages/CheckoutForm'
// import {loadStripe} from '@stripe/stripe-js';
// import {Elements} from '@stripe/react-stripe-js';


// const stripePromise = loadStripe('pk_test_51Kl5pmSAl4SpCTxSo1F4mXpJI0wPfNIQCCzZj81KnTnalVaPsuDpZtTIyIXnyEMovPR86a8b2NN0nyshFVBylp2u00HvpmFsvV');
function App() {
  return (
    <Router/>
    // <CheckoutForm/>
  //   <Elements stripe={stripePromise}>
  //   <CheckoutForm />
  // </Elements>
  )
}

export default App;

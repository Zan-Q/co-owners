import { useState } from 'react';

import { LoaderFunction, json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';

// Stripe services
import { Elements, useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

//API Services
import { transactionAPI } from "../../api/transactionAPI.js"; 

//Toast
import { ToastContainer, toast as showToast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//Navigation
import { useNavigate } from 'react-router-dom';

export const loader: LoaderFunction = async ({ request }) => {
  
    const url = new URL(request.url);
    const businessId = url.searchParams.get('businessId');
    const amount = url.searchParams.get('amount');
    const balance = url.searchParams.get('balance');
    const token = url.searchParams.get('token');
    const redirect = url.searchParams.get('redirect');
    const type = url.searchParams.get('type') ? url.searchParams.get('type') : null;
    const stripeKey = process.env.STRIPE_PUBLIC_KEY

    return json({ businessId, amount, balance, token, redirect, stripeKey, type });
};


interface CheckoutFormProps {
    amount: number;
    balance: number;
    token: string;
    redirectURL: string;
    type: string;
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({ amount, balance, token, redirectURL, type }) => {
  const [amountState, setAmountState] = useState(Number(amount).toFixed(2)); // Pre-suggested value in cents (e.g., $10.00)
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    if (!stripe || !elements) {
      return;
    }

    if (type === 'withdraw') {

      if (balance < Number(amountState)) { 

        showToast.error("Not enough funds to withdraw.");

        setLoading(false);
        return;
      }
      
      try {
        const response = await transactionAPI.withdrawFunds(amountState, token, redirectURL);
        if (response.status === 200) {
          showToast.success("Your funds have been withdrawn successfully.");

          //Redirect to the redirectURL
          navigate(redirectURL);
        }
      } catch (error) {
        console.error('Error creating Checkout Session:', error); 
      } finally {
        setLoading(false);
      }
    }
    else {
      try {
          const response = await transactionAPI.sendPayment(amountState, token, redirectURL);

          if (response.status === 200) {
              const session = response.data;

              // Redirect to Stripe Checkout
              const { error } = await stripe.redirectToCheckout({ 
                  sessionId: session.id 
              });
          } 
      } catch (error) {
          console.error('Error creating Checkout Session:', error);
      } finally {
          setLoading(false);
      }
    }
  };

  const calculateProcessingAmount = (amount:number) => {
    return amount * 0.029 + 0.3;
  };

  const calculateFinalAmount = (amount: number) => {
    return amount - calculateProcessingAmount(amount);
  };


  const processingAmount = calculateProcessingAmount(Number(amountState));
  const finalAmount = calculateFinalAmount(Number(amountState));


  return (
      <div className="w-full max-w-md mx-auto mt-8 shadow-2xl rounded-xl">
        <div className="bg-blue-100 text-blue-800 p-4 rounded-t-lg text-center flex items-center justify-center space-x-2">
          <img src="https://stripe.com/img/v3/home/twitter.png" alt="Stripe Logo" className="h-6" />
          <span>Payment processing powered by Stripe</span>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col items-center space-y-4 bg-white p-6 rounded-b-lg shadow-md">
          {/* Display balance if it is not null */}
          {balance !== null && (
            <>
              <label htmlFor="balance" className="mt-5 text-md font-semibold">Account Balance</label>
              <p className="text-lg">${balance.toFixed(2)}</p>
            </>
          )}
          <label htmlFor="amount" className="mt-5 text-xl font-semibold">{ (type === null || type === 'deposit') ? 'Deposit' : 'Withdraw'} Amount</label>
          <div className="flex items-center space-x-2">
            <span className="text-xl">$</span>
            <input
              value={amountState}
              onChange={(e) => setAmountState(e.target.value)}
              id="amount"
              type="number"
              placeholder="Enter amount"
              className="py-2 px-4 rounded-xl text-xl"
              step="0.01"
              min="1"
            />
          </div>
          <div className="mt-4">
            <p className="text-md text-red-500">Stripe Fee: ${processingAmount.toFixed(2)}</p>
            <p className="text-xl">Final { (type === null || type === 'deposit') ? 'Deposit' : 'Withdraw'} Amount: ${finalAmount.toFixed(2)}</p>
          </div>
          <button
            type="submit"
            className={`bg-blue-500 text-white py-4 px-10 rounded-xl text-2xl mb-5 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={!stripe || loading}
          >
            {loading ? 'Processing...' : (type === null || type === 'deposit') ? 'Deposit' : 'Withdraw' }
          </button>
        </form>
      </div>
  );
};

export default function DepositPage() {

    //Load the data from the loader
    const { businessId, amount, balance, token, redirect, stripeKey, type }  = useLoaderData<{ businessId: string, amount: string, balance: string, token: string, redirect: string, stripeKey: string, type: string }>();

    // Load Toast Message if businessId is provided
    //if (businessId) {
    //    showToast.error('Not enough funds to purchase stock, please make a deposit.');
    //}

    // Load your public key from Stripe
    const stripePromise = loadStripe(stripeKey);

    return (
      <div>
          <ToastContainer position='top-center' />
          {businessId && (
            <div className="bg-red-500 text-white text-center p-4 mb-4">
              Not enough funds to purchase stock, please make a deposit.
            </div>
          )}
          <Elements stripe={stripePromise}>
              <div className="p-4 w-3/4 mx-auto flex justify-center">
                  <CheckoutForm amount={Number(amount)} balance={Number(balance)} token={token} redirectURL={redirect} type={type}/>
              </div>
          </Elements>
      </div>
        
    );
}
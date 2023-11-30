import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useDate from "../../hooks/useDate";
import { AuthContext } from "../../Providers/AuthProvider";


const CheckOutForm = () => {
    const [error, setError] = useState('');
    const [clientSecret, setClientSecret] = useState();
    const [transactionId, setTransactionId] = useState();
    const currentDateTime = useDate()
    const stripe = useStripe();
    const elements = useElements();
    const axiosSecure = useAxiosSecure();
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const totalPrice = 10;

    useEffect(() => {
        if(totalPrice > 0){
         axiosSecure.post('/create-payment-intent', { price: totalPrice })
         .then(res => {
             console.log('api hitting');
             console.log(res);
             setClientSecret(res.data.clientSecret)
         })
        }
     }, [axiosSecure, totalPrice]);
 

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);
        if (card === null) {
            return;
        }
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: "card",
            card
        })

        if (error) {
            console.log('Payment error', error);
            setError(error.message)
        } else {
            console.log('payment method: ', paymentMethod);
            setError('')
        }

        //  confirm payment
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email || 'anonymous',
                    name: user?.displayName || 'anonymuos'
                }
            }
        });

        if (confirmError) {
            console.log(confirmError);
        }
        else {
            console.log('payment intent', paymentIntent);
            if(paymentIntent.status === "succeeded"){
                console.log('transaction id: ', paymentIntent.id);
                setTransactionId(paymentIntent.id);

                // now save the payment in the database
                const paymentInfo = {
                    name: user?.displayName,
                    email: user?.email,
                    amount: 10,
                    transactionId: paymentIntent.id,
                    date: currentDateTime,
                    status: 'member',
                }
                const res = await axiosSecure.post('/payments', paymentInfo);
                console.log('payment save', res.data);
                if(res?.data?._id){
                   const res = await axiosSecure.patch(`/users/${user.email}`);
                   console.log(res.data);
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Your membership successfull",
                        showConfirmButton: false,
                        timer: 1500
                      });
                      navigate('/')
                }
            }
        }
    }

    return (
        <form onSubmit={handleSubmit} className="max-w-md w-full bg-white shadow-md rounded-lg p-8">
          <p>Enrter card number</p>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#424770',
                '::placeholder': {
                  color: '#aab7c4',
                },
              },
              invalid: {
                color: '#9e2146',
              },
            },
          }}
        ></CardElement>
      <div className=" flex justify-center">
      <button
          disabled = {!stripe || !clientSecret}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline transition duration-300 mt-4"
          type="submit"
        >
          Pay
        </button>
      </div>
        <p className="text-red-600">{error}</p>
        {transactionId && (
          <p className="text-green-600">
            Your transaction id : <span className="text-black">{transactionId}</span>
          </p>
        )}
      </form>
    );
};

export default CheckOutForm;
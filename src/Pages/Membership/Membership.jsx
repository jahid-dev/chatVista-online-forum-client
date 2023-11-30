import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import { FaMedal } from 'react-icons/fa';
import CheckOutForm from "./CheckOutForm";
import useMember from "../../hooks/useMember";

const Membership = () => {
    const isMember = useMember();
    const stripePromise = loadStripe(import.meta.env.VITE__PAYMENT_GATEWAY_PK);
    const handleError = (error) => {
        console.log('Failed to load Stripe : ', error);
    }
    return (

        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            {
                isMember ? (
                    <div className="text-center">
                        <div className="flex items-center justify-center bg-yellow-500 text-white font-bold text-xl rounded-full h-16 w-16 mb-4">
                            <FaMedal className="h-8 w-8" />
                        </div>
                        <p className="text-lg font-semibold"> {"You're already a member!"}</p>
                        <p className="text-gray-600 mt-4">
                            As a member, enjoy access to exclusive features and the ability to create unlimited posts.
                        </p>
                    </div>
                )
                    : (
                        <div className="max-w-md w-full bg-white shadow-md rounded-lg p-8">
                            <h1 className="text-3xl font-bold mb-6 text-center">Become a Member</h1>

                            <div className="flex items-center justify-center mb-8">
                                <div className="flex items-center justify-center bg-yellow-500 text-white font-bold text-xl rounded-full h-16 w-16 mr-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        {/* Gold badge icon (replace with your preferred icon) */}
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                    </svg>
                                </div>
                                <p className="text-xl font-semibold">Gold Member</p>
                            </div>

                            <p className="text-center text-gray-600 mb-8">Unlock exclusive features including the ability to make more than 5 posts!</p>

                            <div className="flex flex-col items-center justify-center">
                                <p className="text-2xl mb-4 font-bold">Pay $10 dollar</p>
                                <Elements stripe={stripePromise} onError={handleError} >
                                    <CheckOutForm>

                                    </CheckOutForm>
                                </Elements>

                                <p className="text-gray-500 text-sm mt-3">Secure Payment Gateway</p>
                            </div>
                        </div>
                    )


            }

        </div>

    );
};

export default Membership;




import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import PropTypes from "prop-types";
import { backendApi } from "../../config/Axios.config";
import { toast } from "react-toastify";
import { useContext } from "react";
import { UserContext } from "../../context/user.context";

const PaymentModal = ({ isOpen, setIsOpen, price }) => {
  const { user } = useContext(UserContext);

  const handlePayment = async (paymentData) => {
    setIsOpen(false);
    toast.success("Payment Successful");

    const { razorpay_payment_id, razorpay_order_id, razorpay_signature } =
      paymentData;

    const response = await backendApi.post("/payment/verify", {
      razorpay_payment_id,
      razorpay_order_id,
      razorpay_signature,
    });

    if (response.data.success) {
      console.log("Payment verified. Receipt details:", response.data.receipt);
    } else {
      console.error("Payment verification failed:", response.data.message);
    }
  };

  const launchRazorPay = async () => {
    try {
      const response = await backendApi.post("/payment/create-order", {
        amount: price,
        currency: "INR",
      });

      const { order_id, amount, currency } = await response.data;

      let options = {
        key: import.meta.env.VITE_RAZORPAY_API_KEY_ID,
        amount: amount,
        currency: currency,
        name: "Book My Show Clone",
        description: "Movie Purchase or Rental",
        image:
          "https://i.ibb.co/zPBYW3H/imgbin-bookmyshow-office-android-ticket-png.png",
        order_id: order_id,
        handler: handlePayment,
        prefill: {
          name: user.name,
          email: user.email,
          // contact: user.phone,
        },
        modal: {
          // Failure or user dismissal handler
          ondismiss: () => {
            setIsOpen(false);
            toast.error("Payment Unsuccessful!", {
              autoClose: 2000,
            });
            console.log(response);
          },
        },
        theme: { color: "#c4242d" },
      };

      let razorPay = new window.Razorpay(options);
      razorPay.open();
    } catch (error) {
      console.error("Error launching Razorpay:", error);
    }
  };

  return (
    <>
      <Transition show={isOpen}>
        <TransitionChild>
          <div
            className="fixed inset-0 bg-gray-500 z-50 bg-opacity-75 transition-opacity duration-300 data-[closed]:opacity-0"
            onClick={() => setIsOpen(false)}
          />
        </TransitionChild>

        <TransitionChild>
          <Dialog
            open={isOpen}
            onClose={() => setIsOpen(false)}
            className="relative z-50"
          >
            <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
              <DialogPanel className="max-w-lg space-y-4 p-12">
                <TransitionChild>
                  <div className=" scale-100 data-[closed]:scale-0 duration-300 inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                    <DialogTitle
                      as="h3"
                      className="text-lg font-medium leading-6 text-gray-900"
                    >
                      Please make a payment
                    </DialogTitle>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Hello Please click on the below button to make a
                        payment.
                      </p>
                    </div>

                    <div className="w-full mt-4">
                      <button
                        type="button"
                        className="w-full inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md hover:bg-red-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-red-500"
                        onClick={launchRazorPay}
                      >
                        Pay ₹{price}
                      </button>
                      <button
                        type="button"
                        className="mt-3 w-full inline-flex justify-center px-4 py-2 text-sm font-medium text-red-700 hover:bg-red-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-red-500"
                        onClick={() => setIsOpen(false)}
                      >
                        Cancel Payment
                      </button>
                    </div>
                  </div>
                </TransitionChild>
              </DialogPanel>
            </div>
          </Dialog>
        </TransitionChild>
      </Transition>
    </>
  );
};

PaymentModal.propTypes = {
  price: PropTypes.number,
  isOpen: PropTypes.bool,
  setIsOpen: PropTypes.func,
  setIsReceiptModalOpen: PropTypes.func,
};

export default PaymentModal;

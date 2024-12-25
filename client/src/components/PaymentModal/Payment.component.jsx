import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import PropTypes from "prop-types"

const PaymentModal = ({
  isOpen,
  setIsOpen,
  price,
}) => {
  const launchRazorPay = () => {
    let options = {
      key_id: import.meta.env.VITE_RAZORPAY_API_KEY_ID,
      key: import.meta.env.VITE_RAZORPAY_API_KEY_ID,
      amount: price * 100,
      currency: "INR",
      name: "Book My Show Clone",
      description: "Movie Purchase or Rental",
      image:
        "https://i.ibb.co/zPBYW3H/imgbin-bookmyshow-office-android-ticket-png.png",
      handler: () => {
        setIsOpen(false);
        alert("Payment Done");
      },
      theme: { color: "#c4242d" },
    };

    let razorPay = new window.Razorpay(options);
    razorPay.open();
  };
  // const launchRazorPay = async () => {
  //   const response = await fetch("http://localhost:3001/api/create-order", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({
  //       amount: price * 100,
  //       currency: "INR",
  //       receipt: "receipt",
  //       notes: {},
  //     }),
  //   });
  //   const order = await response.json();
  //   const options = {
  //     key_id: import.meta.env.VITE_RAZORPAY_API_KEY_ID,
  //     amount: order.amount,
  //     currency: order.currency,
  //     name: "Book My Show Clone",
  //     description: "Movie Purchase or Rental",
  //     image:
  //       "https://i.ibb.co/zPBYW3H/imgbin-bookmyshow-office-android-ticket-png.png",
  //     callback_url: "http://localhost:3001/payment-success",

  //     handler: () => {
  //       setIsOpen(false);
  //       alert("Payment Done");
  //     },
  //     theme: { color: "#c4242d" },
  //   };
  //   const rzp = new (window.Razorpay as any)(options);
  //   rzp.open();
  // };

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
      {/* <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          <DialogPanel className="max-w-lg space-y-4 border bg-white p-12">
            <DialogTitle className="font-bold">Deactivate account</DialogTitle>
            <Description>
              This will permanently deactivate your account
            </Description>
            <p>
              Are you sure you want to deactivate your account? All of your data
              will be permanently removed.
            </p>
            <div className="flex gap-4">
              <button onClick={() => setIsOpen(false)}>Cancel</button>
              <button onClick={() => setIsOpen(false)}>Deactivate</button>
            </div>
          </DialogPanel>
        </div>
      </Dialog> */}
    </>
  );
};

PaymentModal.propTypes ={
  price: PropTypes.number,
  isOpen: PropTypes.bool,
  setIsOpen: PropTypes.func
}

export default PaymentModal;

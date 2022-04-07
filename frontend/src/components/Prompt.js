// /* This example requires Tailwind CSS v2.0+ */
// import { Fragment, useRef, useState } from "react";
// import { Dialog, Transition } from "@headlessui/react";
// import { FaHandHoldingUsd, FaCheckCircle, FaUnlockAlt } from "react-icons/fa";

// const Prompt = ({
//   message1,
//   message2,
//   heading,
//   onChange,
//   onClose,
//   onSubmit,
//   button,
//   placeholder,
//   name,
//   handleOpenClose,
//   type,
//   input2,
//   onChangeAmount,
// }) => {
//   const cancelButtonRef = useRef(null);

//   return (
//     <Transition.Root show={handleOpenClose} as={Fragment}>
//       <Dialog
//         as="div"
//         className="fixed z-10 inset-0 overflow-y-auto"
//         initialFocus={cancelButtonRef}
//         onClose={close}
//       >
//         <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
//           <Transition.Child
//             as={Fragment}
//             enter="ease-out duration-300"
//             enterFrom="opacity-0"
//             enterTo="opacity-100"
//             leave="ease-in duration-200"
//             leaveFrom="opacity-100"
//             leaveTo="opacity-0"
//           >
//             <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
//           </Transition.Child>

//           {/* This element is to trick the browser into centering the modal contents. */}
//           <span
//             className="hidden sm:inline-block sm:align-middle sm:h-screen"
//             aria-hidden="true"
//           >
//             &#8203;
//           </span>
//           <Transition.Child
//             as={Fragment}
//             enter="ease-out duration-300"
//             enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
//             enterTo="opacity-100 translate-y-0 sm:scale-100"
//             leave="ease-in duration-200"
//             leaveFrom="opacity-100 translate-y-0 sm:scale-100"
//             leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
//           >
//             <div className="relative inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
//               <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
//                 <div className="sm:flex sm:items-start">
//                   <div className="mx-auto flex-shrink-0 flex items-center justify-center align-middle h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
//                     {name === "unstake" ? (
//                       <FaUnlockAlt className="h-6 w-6 text-gray-600" />
//                     ) : name === "buy" ? (
//                       <FaHandHoldingUsd className="h-6 w-6 text-gray-600" />
//                     ) : (
//                       <FaCheckCircle className="h-6 w-6 text-gray-600" />
//                     )}{" "}
//                   </div>
//                   <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
//                     <Dialog.Title
//                       as="h3"
//                       className="text-lg leading-6 font-medium text-gray-900"
//                     >
//                       {heading}
//                     </Dialog.Title>
//                     <div className="mt-2">
//                       <p className="text-sm text-gray-500">{message1}</p>
//                     </div>
//                     <div className="mt-1">
//                       <p className="text-sm text-gray-500">{message2}</p>
//                     </div>
//                     <form
//                       className="mt-8 w-full space-y-6"
//                       action="#"
//                       method="POST"
//                     >
//                       <input
//                         type="hidden"
//                         name="remember"
//                         defaultValue="true"
//                       />
//                       <div className="rounded-md shadow-sm -space-y-px">
//                         <div className="mb-1">
//                           <label htmlFor="wallet-address" className="sr-only">
//                             {placeholder}
//                           </label>
//                           <input
//                             id="address"
//                             name={name}
//                             type={type}
//                             required
//                             onChange={onChange}
//                             className="appearance-none relative block w-full px-2 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
//                             placeholder={placeholder}
//                           />
//                         </div>
//                         {input2 && (
//                           <div className="mt-1">
//                             <label htmlFor="amount" className="sr-only">
//                               Amount
//                             </label>
//                             <input
//                               id="amount"
//                               name="amount"
//                               type="number"
//                               required
//                               onChange={onChangeAmount}
//                               className="appearance-none relative block w-full px-2 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
//                               placeholder="Amount in ETH"
//                             />
//                           </div>
//                         )}
//                       </div>
//                     </form>
//                   </div>
//                 </div>
//               </div>
//               <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
//                 <button
//                   type="button"
//                   className="mt-3 outline-none w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
//                   onClick={onClose}
//                   ref={cancelButtonRef}
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="button"
//                   className="w-full outline-none inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
//                   onClick={onSubmit}
//                 >
//                   {button}
//                 </button>
//               </div>
//             </div>
//           </Transition.Child>
//         </div>
//       </Dialog>
//     </Transition.Root>
//   );
// };
// export default Prompt;

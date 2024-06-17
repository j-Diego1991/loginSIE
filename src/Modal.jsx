import React, { useRef, useEffect, useState, Fragment } from "react";

//NOTA: Instalar las dependencias de la libreria tailwindUI
//con el comando: npm install @headlessui/react @heroicons/react
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";

const Modal = ({ isOpen, hasCloseBtn = true, onClose, errorMessage, message, title }) => {
  const [isModalOpen, setModalOpen] = useState(isOpen);
  const modalRef = useRef(null);

  const handleCloseModal = () => {
    if (onClose) {
      onClose();
    }
    setErrorMessage("")
    setTitle("")
    setMessage("")
    setModalOpen(false);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Escape") {
      handleCloseModal();
    }
  };

  useEffect(() => {
    setModalOpen(isOpen);
  }, [isOpen]);

  useEffect(() => {
    const modalElement = modalRef.current;

    if (modalElement) {
      if (isModalOpen) {
        modalElement.showModal();
      } else {
        modalElement.close();
      }
    }
  }, [isModalOpen]);

  return (
    <>
      <Transition show={isModalOpen} as={Fragment}>
        <Dialog
          className="relative z-10"
          onClose={handleCloseModal}
          onKeyDown={handleKeyDown}
        >
          <TransitionChild
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
          </TransitionChild>

          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <TransitionChild
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <DialogPanel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                  <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4 md:p-4 md:pb-6">
                    <div className="sm:flex sm:items-start">
                      <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                        <DialogTitle
                          as="h3"
                          className="text-lg font-bold leading-6 text-gray-900 pb-2"
                        >
                          {title}
                        </DialogTitle>
                        <div className="mt-2">
                          {errorMessage && (
                            <p className="text-sm text-gray-500">
                              {errorMessage}
                            </p>
                          )}
                          {message && (
                            <p className="text-sm text-gray-500">
                              {message}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 md:pb-4 sm:pb-6">
                    {hasCloseBtn && (
                      <button
                        type="button-dialog"
                        className="button-dialog flex flex-auto w-full justify-center rounded-md px-3 py-2 text-sm font-semibold text-white bg-[#18171c] shadow-sm sm:w-auto"
                        onClick={handleCloseModal}
                      >
                        Aceptar
                      </button>
                    )}
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default Modal;

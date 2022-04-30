import React from "react";
import { useGlobalContext } from "../context";

const Modal = () => {
  const { modalMessage, modalType, closeModal } = useGlobalContext();
  React.useEffect(() => {
    const showModal = setInterval(() => {
      closeModal(false, "", "");
    }, 3000);
    return () => clearInterval(showModal);
  });
  return <div className={`alert alert-${modalType}`}>{modalMessage}</div>;
};

export default Modal;

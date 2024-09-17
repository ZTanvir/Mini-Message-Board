import { useEffect, useId, useRef } from "react";

const Dialog = ({ isOpen, onClose, name, children }) => {
  const id = useId();
  const diaLogEl = useRef();
  useEffect(() => {
    if (isOpen) {
      diaLogEl.current.showModal();
    } else {
      diaLogEl.current.close();
    }
  }, [isOpen]);

  return (
    <dialog ref={diaLogEl} id={`${id}-${name}`} onCancel={onClose}>
      {children}
    </dialog>
  );
};
export default Dialog;

import { forwardRef, useState } from "react";

const ToggleElement = forwardRef(({ children, btnText }, ref) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggleElement = (e) => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <button ref={ref} onClick={handleToggleElement}>
        {isOpen ? "close" : btnText}
      </button>
      {isOpen ? children : null}
    </div>
  );
});
export default ToggleElement;

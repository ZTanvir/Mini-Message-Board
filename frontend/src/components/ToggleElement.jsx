import { useState } from "react";

const ToggleElement = ({ children, btnText }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggleElement = (e) => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <button onClick={handleToggleElement}>
        {isOpen ? "close" : btnText}
      </button>
      {children}
    </div>
  );
};
export default ToggleElement;

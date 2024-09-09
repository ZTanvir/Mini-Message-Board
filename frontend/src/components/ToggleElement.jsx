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
      {isOpen ? children : null}
    </div>
  );
};
export default ToggleElement;
